import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
// import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const db = new Database("oneia.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    social_config TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS websites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    content_json TEXT NOT NULL,
    theme_color TEXT DEFAULT '#3b82f6',
    font_family TEXT DEFAULT 'Inter',
    published BOOLEAN DEFAULT 0,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'contact' or 'chat'
    data TEXT NOT NULL, -- JSON
    is_read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id)
  );
`);

try {
  db.exec("ALTER TABLE tenants ADD COLUMN social_config TEXT DEFAULT '{}'");
} catch (e) {
  // Column likely exists or table created with it
}

app.use(express.json());

// API Routes

// Register Tenant & Generate Site
app.post("/api/register", async (req, res) => {
  const { name, email, plan, description, services } = req.body;
  
  try {
    // 1. Create Tenant
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4);
    const stmt = db.prepare("INSERT INTO tenants (name, email, plan, slug) VALUES (?, ?, ?, ?)");
    const info = stmt.run(name, email, plan, slug);
    const tenantId = info.lastInsertRowid;

    // 2. Generate Content with AI
    let contentJson = JSON.stringify({
      hero: { title: name, subtitle: description, cta: "Contact Us" },
      services: services.split(",").map((s: string) => ({ title: s.trim(), desc: "Professional service provided by us." })),
      about: { title: "About Us", desc: `We are ${name}, dedicated to providing excellent services.` },
      contact: { email: email, phone: "+1234567890" }
    });

    /*
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const prompt = `
          Generate a JSON structure for a corporate website landing page for a company named "${name}".
          Description: "${description}".
          Services: "${services}".
          
          Return ONLY valid JSON with this structure:
          {
            "hero": { "title": "string", "subtitle": "string", "cta": "string" },
            "services": [{ "title": "string", "desc": "string", "icon": "string (lucide icon name)" }],
            "about": { "title": "string", "desc": "string" },
            "contact": { "email": "string", "phone": "string", "address": "string" },
            "colors": { "primary": "hex code", "secondary": "hex code" }
          }
        `;
        
        const result = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt
        });
        
        const text = result.text || "";
        // Extract JSON from markdown code block if present
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            contentJson = jsonMatch[1];
        } else {
            contentJson = text; // Fallback if no code block
        }
      } catch (aiError) {
        console.error("AI Generation failed, using fallback content", aiError);
      }
    }
    */

    // 3. Save Website
    const siteStmt = db.prepare("INSERT INTO websites (tenant_id, content_json) VALUES (?, ?)");
    siteStmt.run(tenantId, contentJson);

    res.json({ success: true, tenantId, slug });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get Tenant Dashboard Data
app.get("/api/dashboard/:tenantId", (req, res) => {
  const tenant = db.prepare("SELECT * FROM tenants WHERE id = ?").get(req.params.tenantId);
  const website = db.prepare("SELECT * FROM websites WHERE tenant_id = ?").get(req.params.tenantId);
  
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });
  
  res.json({ tenant, website });
});

// Update Website Content
app.put("/api/website/:id", (req, res) => {
  const { content_json, theme_color, font_family } = req.body;
  const stmt = db.prepare("UPDATE websites SET content_json = ?, theme_color = ?, font_family = ? WHERE id = ?");
  stmt.run(JSON.stringify(content_json), theme_color, font_family, req.params.id);
  res.json({ success: true });
});

// Update Tenant Social Config
app.put("/api/tenant/:id/social", (req, res) => {
  const { social_config } = req.body;
  const stmt = db.prepare("UPDATE tenants SET social_config = ? WHERE id = ?");
  stmt.run(JSON.stringify(social_config), req.params.id);
  res.json({ success: true });
});

// Get Public Site Data
app.get("/api/site/:slug", (req, res) => {
  const tenant = db.prepare("SELECT id, name, social_config FROM tenants WHERE slug = ?").get(req.params.slug) as any;
  if (!tenant) return res.status(404).json({ error: "Site not found" });
  
  const website = db.prepare("SELECT * FROM websites WHERE tenant_id = ?").get(tenant.id);
  res.json({ tenant, website });
});

// Public: Submit Contact Form
app.post("/api/public/contact", (req, res) => {
  const { tenantId, data } = req.body;
  const stmt = db.prepare("INSERT INTO messages (tenant_id, type, data) VALUES (?, 'contact', ?)");
  stmt.run(tenantId, JSON.stringify(data));
  res.json({ success: true });
});

// Public: Submit Chat Message
app.post("/api/public/chat", (req, res) => {
  const { tenantId, message, sender } = req.body; // sender: 'user' or 'bot'
  const stmt = db.prepare("INSERT INTO messages (tenant_id, type, data) VALUES (?, 'chat', ?)");
  stmt.run(tenantId, JSON.stringify({ message, sender, timestamp: new Date() }));
  res.json({ success: true });
});

// Dashboard: Get Messages
app.get("/api/dashboard/messages/:tenantId", (req, res) => {
  const messages = db.prepare("SELECT * FROM messages WHERE tenant_id = ? ORDER BY created_at DESC").all(req.params.tenantId);
  res.json(messages);
});

// Admin: List Tenants
app.get("/api/admin/tenants", (req, res) => {
  const tenants = db.prepare(`
    SELECT t.*, w.published 
    FROM tenants t 
    LEFT JOIN websites w ON t.id = w.tenant_id
    ORDER BY t.created_at DESC
  `).all();
  res.json(tenants);
});


// Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production (simplified for this environment)
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
