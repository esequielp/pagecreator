# 🧩 ONEIA — Product Requirement Document (MVP v2)

**Versión:** 2.0  
**Estado:** Listo para Implementación  
**Enfoque:** SaaS Multi-Tenant B2B  

---

## 1️⃣ Visión del Producto

**ONEIA** es una plataforma SaaS "No-Code / Low-Touch" diseñada para que pequeñas empresas y profesionales independientes generen su presencia digital corporativa en cuestión de minutos, asistidos por Inteligencia Artificial.

### 🎯 Problema que resuelve
Las PYMES y freelancers a menudo no tienen presupuesto para una agencia ($1k+) ni tiempo/habilidad para usar constructores complejos como WordPress o Wix. Terminan sin web o con resultados poco profesionales.

### 💡 Solución
Un generador de webs que **hace el trabajo por ti**. El usuario introduce datos básicos y la IA construye estructura, textos y diseño. El usuario solo "afina", no "construye".

### 🚫 Qué NO es ONEIA
*   No es un competidor de Webflow (no busca libertad total de diseño).
*   No es un CMS tradicional (no hay plugins ni mantenimiento técnico).
*   No es un E-commerce complejo (no maneja inventarios ni carritos en el MVP).

---

## 2️⃣ Principios del Producto

Para garantizar el éxito del MVP y la calidad del resultado final, nos regimos por:

1.  **Curación sobre Personalización:** Limitamos intencionalmente las opciones de diseño (márgenes, paddings, layouts) para evitar que el usuario "rompa" la estética. La calidad visual está garantizada por el sistema.
2.  **Contenido Primero:** La IA genera el 90% del contenido inicial. El usuario actúa como editor, no como redactor.
3.  **Simplicidad Radical:** Si una funcionalidad requiere un tutorial de más de 1 minuto, es demasiado compleja para el MVP.
4.  **IA como Copiloto:** La IA sugiere y redacta, pero el humano siempre tiene el botón final de "Publicar".

---

## 3️⃣ Estilos Visuales (Themes)

El sistema renderiza el contenido basándose en "Temas". El contenido (JSON) está separado de la presentación (CSS/Componentes).

### 🏛️ Estilo Corporativo (Trust)
*   **Arquetipo:** El Abogado, El Consultor, La Clínica.
*   **Sensación:** Solidez, experiencia, calma.
*   **Visual:**
    *   Fondos claros (blanco, gris perla).
    *   Tipografía Serif para títulos (autoridad) y Sans para cuerpo.
    *   Botones rectangulares o con radio pequeño.
    *   Acentos en Azul Marino, Gris Oscuro o Verde Bosque.

### 🚀 Estilo Moderno (Tech)
*   **Arquetipo:** La Startup, La App, El SaaS.
*   **Sensación:** Innovación, velocidad, futuro.
*   **Visual:**
    *   Uso de degradados sutiles.
    *   Tipografías Sans-serif geométricas.
    *   Tarjetas (Cards) con sombras suaves y bordes redondeados amplios.
    *   Acentos en Azul Eléctrico, Violeta o Naranja.

### 🎨 Estilo Creativo (Bold)
*   **Arquetipo:** El Diseñador, La Agencia, El Coach.
*   **Sensación:** Personalidad, impacto, diferencia.
*   **Visual:**
    *   Tipografías Display grandes y negritas.
    *   Colores de alto contraste (Negro/Amarillo, Rosa/Rojo).
    *   Layouts asimétricos o brutalistas.
    *   Bordes negros marcados o ausencia total de bordes.

---

## 4️⃣ Flujo de Onboarding del Cliente

El objetivo es reducir la fricción al mínimo absoluto ("Time-to-Value" < 5 min).

1.  **Landing & Registro:** Usuario ingresa email/password o Social Login.
2.  **Input de Negocio (El "Brief"):**
    *   Formulario simple: Nombre de Empresa, Industria, Descripción corta (ej. "Venta de seguros para mascotas"), Servicios principales (lista).
3.  **Selección de Estilo:**
    *   El usuario elige entre los 3 estilos visuales (con preview genérica).
4.  **Generación (La Magia):**
    *   **Backend + IA:** Procesa el input.
    *   Genera estructura JSON del sitio.
    *   Redacta textos (Hero, Nosotros, Servicios) basados en la descripción.
    *   Selecciona íconos y placeholders de imágenes.
5.  **Preview & Personalización:**
    *   El usuario ve su sitio generado. Puede regenerar textos específicos o cambiar el estilo visual al vuelo.
6.  **Pago & Publicación:**
    *   Selecciona plan.
    *   Pasarela de pago (Stripe).
    *   El sitio se publica en `empresa.oneia.site` (o dominio propio si aplica).

---

## 5️⃣ Estructura Base del Sitio Web

Cada sitio se compone de páginas, y cada página de secciones.

### Páginas Core (Generadas por defecto)
1.  **Inicio (Home):** Hero, Resumen Servicios, Social Proof, CTA.
2.  **Servicios:** Lista detallada o Grid de servicios.
3.  **Nosotros:** Historia, Misión, Equipo (opcional).
4.  **Contacto:** Formulario, Mapa, Datos.

### Secciones Disponibles (Bloques)
El usuario puede añadir/quitar estas secciones en cualquier página:
*   Hero (varios layouts)
*   Texto + Imagen (izquierda/derecha)
*   Grid de Features/Servicios
*   Testimonios (Carrusel/Grid)
*   FAQ (Acordeón)
*   CTA Banner
*   Galería de Imágenes
*   Formulario de Contacto

---

## 6️⃣ Admin del Cliente (Tenant Dashboard)

Interfaz limpia, sin distracciones técnicas.

### Estructura de Navegación
*   **Escritorio:** Resumen de visitas, últimos mensajes, estado del plan.
*   **Editor Web:**
    *   Navegación por páginas.
    *   Edición "Click-to-Edit" en campos de texto e imágenes (o panel lateral de propiedades).
    *   Gestión de secciones (Añadir, Mover, Eliminar).
*   **Apariencia:**
    *   Cambiar Tema (Estilo).
    *   Paleta de Colores (Presets o Personalizado).
    *   Tipografías (Pares predefinidos).
*   **Páginas:**
    *   Crear nueva página (Título, Slug, SEO básico).
    *   Editar menú de navegación.
*   **Chat IA:** Configuración del asistente.
*   **Mensajes:** CRM simple (Bandeja de entrada de formularios y chat).
*   **Configuración:** Dominio, Datos de facturación, Usuarios.

---

## 7️⃣ Chat Web con IA (Detalle)

Un widget flotante en la esquina inferior derecha del sitio público.

### Funcionalidad
*   **Entrenamiento Automático:** La IA lee el contenido publicado en el sitio (JSON) para responder. No requiere configuración manual compleja.
*   **Objetivo:** Responder dudas sobre servicios, horarios y precios (si están públicos).
*   **Captura de Leads:** Si la IA detecta intención de compra o no sabe la respuesta, solicita: "Para ayudarte mejor, ¿podrías dejarme tu email/teléfono?".
*   **Guardado:** La conversación y los datos capturados van a la sección "Mensajes" del admin.

### Límites
*   No inventa información (Alucinación controlada).
*   Si no sabe, deriva al formulario de contacto.

---

## 8️⃣ Roles y Permisos (Tenant Level)

Para el MVP, mantenemos la gestión de equipos simple.

1.  **Propietario (Owner):**
    *   Acceso total.
    *   Gestión de facturación y plan.
    *   Puede eliminar el sitio.
2.  **Editor:**
    *   Puede editar contenido y diseño.
    *   Puede responder mensajes.
    *   NO puede acceder a facturación ni eliminar el sitio.

---

## 9️⃣ Admin General (Super Admin ONEIA)

Panel interno para el equipo de ONEIA.

*   **Dashboard Global:** MRR, Nuevos Tenants, Webs Activas.
*   **Gestión de Tenants:**
    *   Lista con filtros (Plan, Estado, Fecha).
    *   Acción: "Login as Tenant" (Impersonation para soporte).
    *   Acción: Suspender/Reactivar.
*   **Gestión de Planes:** Definir límites (páginas, mensajes chat) por plan.

---

## 🔟 Arquitectura Conceptual

*   **Modelo:** Multi-Tenant Lógico (Single Database, Row-Level Security conceptual).
*   **Base de Datos:**
    *   `tenants`: id, name, plan, status.
    *   `websites`: id, tenant_id, theme_config (JSON), pages (JSON o Relacional).
    *   `leads`: id, tenant_id, source (chat/form), data (JSON).
*   **Frontend Público:**
    *   Renderizado dinámico basado en la URL (subdominio o dominio custom).
    *   Carga el `website_config` del tenant y aplica el Theme seleccionado.
*   **Backend:**
    *   API REST para el Dashboard.
    *   Endpoints públicos para el sitio (GET content, POST form/chat).

---

## 1️⃣1️⃣ Planes y Límites

| Característica | Plan Básico | Plan Pro | Plan Premium |
| :--- | :--- | :--- | :--- |
| **Páginas** | 1 (Landing) | Hasta 5 | Ilimitadas |
| **Dominio** | Subdominio `.oneia.site` | Dominio Propio | Dominio Propio |
| **Chat IA** | No incluido | 50 conv/mes | Ilimitado |
| **Marca** | "Powered by ONEIA" | Marca blanca | Marca blanca |
| **Soporte** | Email | Email Prioritario | Dedicado |

---

## 1️⃣2️⃣ Uso de IA en el MVP

La IA se utiliza en puntos estratégicos, no en todo.

1.  **Generación Inicial (Batch):** Crea el borrador del sitio.
2.  **Reescritura (On-Demand):** En el editor, opción "Reescribir texto" (Más formal, Más corto, Más vendedor).
3.  **Chatbot (Runtime):** Atiende a los visitantes del sitio.
4.  **SEO (Batch):** Sugiere Meta Títulos y Descripciones basados en el contenido.

---

## 1️⃣3️⃣ Alcance del MVP

### ✅ INCLUIDO
*   Generador automático (Onboarding).
*   Editor de contenido (Texto/Imagen).
*   3 Temas visuales.
*   Gestión de páginas (CRUD).
*   Chatbot IA básico.
*   CRM de mensajes básico.
*   Conexión de dominio propio (manual/soporte).

### ❌ NO INCLUIDO (Post-MVP)
*   E-commerce (Pasarela de pagos para el cliente final).
*   Blog (CMS de artículos).
*   Editor Drag & Drop libre.
*   Integraciones (Zapier, Mailchimp).
*   Multi-idioma.
*   Área de miembros para usuarios finales.

---

## 1️⃣4️⃣ Roadmap Post-MVP

1.  **Q2:** Módulo de Blog (SEO Content Marketing).
2.  **Q3:** Integraciones (Webhook, Zapier) para exportar leads.
3.  **Q4:** E-commerce Lite (Botón de pago Stripe/PayPal).
4.  **Q4:** Analytics nativo (Visitas, Conversión).

---
