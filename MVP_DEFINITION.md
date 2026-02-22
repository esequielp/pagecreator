# ONEIA MVP Definition

## 1. Architecture & Core Logic
**Multi-tenancy:**
- **Identifier:** Subdomain/Slug (e.g., `client.oneia.com`).
- **Data Isolation:** `tenant_id` foreign key in all relevant tables.
- **Trial System:**
  - **Logic:** 7-day automatic trial upon registration.
  - **Enforcement:** Check `created_at` + 7 days vs Current Date on Dashboard login.
  - **States:** `trial_active`, `trial_expired`, `paid`.

## 2. User Roles & Functionality

### A. End User (Visitor of Client Site)
*What they see:*
1.  **Public Website:**
    - Dynamic rendering based on Tenant configuration.
    - **Sections:** Hero, Services, About, Contact.
    - **Social Media Links:** Footer icons linking to client profiles.
2.  **Interaction:**
    - **Contact Form:** Functional form that saves messages to the Tenant's inbox.
    - **AI Chat Widget (Tenant specific):**
      - Context-aware: Answers based *only* on the specific Tenant's content (Services, About).
      - Independent instance per tenant.

### B. Client (Tenant)
*What they see (Dashboard):*
1.  **Onboarding:**
    - AI-driven generation of initial content.
    - Account creation triggers 7-day trial start.
2.  **Content Editor:**
    - **Sections:** Edit text/images for Hero, Services, About.
    - **Social Media:** Input fields for Facebook, LinkedIn, Instagram, Twitter.
3.  **Design & Style:**
    - Theme Selector (Corporate, Modern, Creative).
    - Color Palette & Font Picker.
4.  **Inbox (Messages):**
    - **Contact Form:** List of messages received via the website form.
    - **Chat Logs:** View history of AI chat interactions on their site.
5.  **Configuration:**
    - SEO Settings (Title, Description).
    - **Trial Status:** Persistent banner showing days remaining / "Upgrade" button.

### C. ONEIA Admin (Super Admin)
*What they see:*
1.  **Tenant List:**
    - Name, Email, Plan, Status (Trial/Active/Expired).
    - Quick actions: View Site, Delete.
2.  **Global Metrics:**
    - Total Tenants, Active Trials, Estimated MRR.

## 3. Technical Gaps to Close (Immediate Implementation)

### Database Schema Updates
1.  **Table `tenants`:**
    - Add `social_config` (JSON) for social media links.
2.  **New Table `messages`:**
    - Columns: `id`, `tenant_id`, `type` (ENUM: 'contact', 'chat'), `data` (JSON), `created_at`, `is_read` (Boolean).

### Backend Logic
1.  **Public API:**
    - `POST /api/public/contact`: Handle form submissions from `PublicSite`.
    - `POST /api/public/chat`: Handle tenant-specific AI chat requests.
2.  **Private API:**
    - `GET /api/dashboard/messages`: Fetch messages for the Inbox view.
    - `PUT /api/website/social`: Update social links.

### Frontend Components
1.  **`TenantChatWidget`:**
    - A new component for `PublicSite.tsx`.
    - Must inject tenant context (Business Name, Services) into the system prompt.
2.  **Dashboard/Inbox:**
    - New tab in `Dashboard.tsx` to display table of messages.
3.  **Social Media Inputs:**
    - Add fields to `Dashboard.tsx` (Settings or Editor tab).
