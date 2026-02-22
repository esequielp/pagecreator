# 🧩 ONEIA — MVP SaaS Generador de Webs Corporativas (Multi-Tenant)

## 🎯 Visión del Producto

**ONEIA** es una plataforma SaaS diseñada para democratizar la presencia digital profesional. Permite a cualquier empresa, independientemente de su tamaño o conocimientos técnicos, generar una página web corporativa completa, estética y funcional en minutos gracias a la Inteligencia Artificial.

La plataforma opera bajo un modelo **multi-tenant**, donde cada cliente (tenant) dispone de un entorno aislado con su propio sitio web, panel de administración, sistema de chat con IA y gestión de leads, todo centralizado en una única infraestructura robusta.

---

## 🎨 1. Estilos Visuales (Themes)

Para el MVP, ONEIA ofrecerá 3 estilos visuales distintivos que cubren la mayoría de las necesidades del mercado.

### 1️⃣ Estilo Corporativo (Trust & Professional)
**Target:** Consultoras, bufetes de abogados, clínicas, empresas B2B tradicionales.

*   **Paleta de Colores:** Tonos sobrios y confiables. Azul marino (`#1e3a8a`), Gris pizarra (`#475569`), Blanco puro (`#ffffff`). Acentos en dorado o plata sutil.
*   **Tipografía:** Combinación clásica. Títulos en **Serif** (ej. *Merriweather* o *Playfair Display*) para autoridad, cuerpo en **Sans-serif** (ej. *Inter* o *Lato*) para legibilidad.
*   **Layout:** Estructura de rejilla (grid) muy ordenada, márgenes amplios, uso de líneas divisorias finas.
*   **Sensación:** Solidez, experiencia, confianza, seriedad.

### 2️⃣ Estilo Moderno / Startup (Tech & Growth)
**Target:** Startups SaaS, apps móviles, empresas de tecnología, fintech.

*   **Paleta de Colores:** Vibrante y enérgica. Degradados (Gradients) suaves (ej. Azul a Violeta), Blanco roto (`#f8fafc`), Negro profundo (`#0f172a`).
*   **Tipografía:** **Sans-serif** geométrica y moderna (ej. *Outfit*, *Plus Jakarta Sans* o *Space Grotesk*).
*   **Layout:** Uso intensivo de "Cards" (tarjetas) con sombras suaves (drop-shadows), bordes redondeados (border-radius amplio), mucho espacio en blanco (whitespace).
*   **Sensación:** Innovación, velocidad, futuro, amigable.

### 3️⃣ Estilo Creativo / Marca Personal (Bold & Unique)
**Target:** Diseñadores, agencias de marketing, fotógrafos, coaches, marcas personales.

*   **Paleta de Colores:** Alto contraste. Fondos oscuros o colores pastel saturados. Acentos neón o colores complementarios fuertes.
*   **Tipografía:** Títulos **Display** con mucha personalidad (ej. *Syne*, *Clash Display*), cuerpo monoespaciado o minimalista.
*   **Layout:** Asimétrico, superposición de elementos, imágenes grandes a sangre (full-bleed), ruptura de la rejilla tradicional.
*   **Sensación:** Creatividad, disrupción, autenticidad, impacto visual.

---

## 🧱 2. Estructura Base del Sitio Web (Cliente)

Independientemente del estilo, todos los sitios generados compartirán una estructura semántica sólida y modular.

### Secciones Obligatorias (Core)
1.  **Hero Section:** Título H1 impactante, subtítulo de propuesta de valor, imagen/video principal y CTA (Call to Action) primario.
2.  **Servicios / Productos:** Grid o lista destacando qué ofrece la empresa.
3.  **Sobre Nosotros:** Breve historia, misión o perfil de la empresa.
4.  **Contacto:** Formulario funcional, datos de contacto (email, teléfono, dirección) y mapa opcional.
5.  **Footer:** Enlaces legales (Privacidad, Términos), redes sociales, copyright y resumen de navegación.

### Secciones Opcionales (Modules)
*   **Portafolio / Casos de Éxito:** Galería de proyectos realizados.
*   **Equipo:** Fichas de los miembros clave con foto y cargo.
*   **Testimonios:** Carrusel o grid de reseñas de clientes (Social Proof).
*   **Preguntas Frecuentes (FAQ):** Acordeón con dudas comunes.
*   **Página Personalizada:** Lienzo libre para contenido específico (ej. "Precios", "Manifiesto").

📌 **Capacidad de Expansión:** El sistema permite al usuario crear nuevas páginas desde el admin, que se añaden automáticamente al menú de navegación.

---

## 👤 3. Admin del Cliente (Tenant Dashboard)

El panel de control del cliente está diseñado bajo el principio de **"Simplicidad Radical"**. No es un CMS complejo como WordPress; es un editor enfocado en resultados.

### Estructura del Menú Lateral
1.  **🏠 Dashboard:** Vista general, métricas rápidas (visitas, mensajes).
2.  **✏️ Editor de Contenido:** El núcleo de la edición.
3.  **🎨 Diseño y Estilo:** Personalización visual.
4.  **📄 Páginas:** Gestión de la estructura del sitio.
5.  **🌐 Redes Sociales:** Conexión de perfiles externos.
6.  **💬 Chat IA:** Configuración y logs del asistente virtual.
7.  **📥 Mensajes:** CRM ligero para leads.
8.  **⚙️ Configuración:** Dominio, SEO básico, datos de cuenta.

### Detalle de Funcionalidades Clave

#### ✏️ Editor de Contenido
*   **Edición por Bloques:** El usuario selecciona una sección (ej. "Hero") y ve campos claros: "Título", "Subtítulo", "Texto Botón".
*   **Gestión de Imágenes:** Subida de imágenes propias o selección de banco de imágenes (integración Unsplash/Pexels sugerida).
*   **Acciones:** "Guardar Borrador" y "Publicar Cambios" (deploy instantáneo).

#### 🎨 Diseño y Estilo
*   **Selector de Tema:** Switch simple entre Corporativo, Moderno y Creativo.
*   **Personalización:**
    *   Color Primario (afecta botones, enlaces, iconos).
    *   Tipografía (selector de pares de fuentes pre-aprobados).
*   **Preview:** Vista previa en tiempo real (Desktop/Mobile) antes de aplicar.

#### 📄 Páginas
*   Listado de páginas activas.
*   Botón "Nueva Página": Genera una estructura vacía o basada en plantilla.
*   Opciones: Editar, Eliminar, Ocultar del menú, Cambiar orden.

#### 🌐 Redes Sociales
*   Campos de entrada (URL) para: Facebook, Instagram, LinkedIn, WhatsApp, X.
*   Lógica: Si el campo está vacío, el icono desaparece del sitio público.

#### 💬 Chat Web con IA
*   **Configuración:** Nombre del bot, mensaje de bienvenida, tono de voz.
*   **Historial:** Ver transcripciones de conversaciones pasadas.
*   **Leads:** Extracción automática de datos (si el usuario los da en el chat).
*   **Switch:** Activar/Desactivar widget en la web.

#### 📥 Mensajes (Contactos)
*   Bandeja de entrada simple para los envíos del formulario de contacto.
*   Tabla con: Nombre, Email, Asunto, Fecha, Estado (Leído/No leído).
*   Exportación básica (CSV).

---

## 🧑💼 4. Admin General (ONEIA Super Admin)

Panel de control interno para la gestión del negocio SaaS.

### Funcionalidades
*   **Gestión de Tenants:**
    *   Listado completo de empresas registradas.
    *   Buscador por nombre, email o dominio.
    *   Acciones: Suspender servicio (impago/abuso), Reactivar, Borrar, Loguearse como usuario (impersonation).
*   **Monitorización de Webs:**
    *   Estado de generación (Éxito/Error).
    *   URLs activas.
*   **Finanzas (Básico):**
    *   Plan activo por tenant (Básico/Pro/Premium).
    *   Estado de suscripción (Activa/Cancelada/Past Due).
*   **Métricas Globales:**
    *   Total webs creadas.
    *   Total mensajes procesados.
    *   Ingresos recurrentes mensuales (MRR estimado).
*   **Gestión de Producto:**
    *   Activar/Desactivar estilos disponibles.
    *   Ajustar límites de los planes (ej. número de páginas).

---

## 🏗 5. Arquitectura Conceptual (MVP)

El sistema se basa en una arquitectura **Multi-Tenant Lógica** sobre una base de datos compartida.

1.  **Identificación del Tenant:**
    *   Cada empresa tiene un `tenant_id` único.
    *   Todas las consultas a base de datos filtran obligatoriamente por `WHERE tenant_id = ?`.
2.  **Base de Datos (Relacional):**
    *   Tablas centrales: `tenants`, `users`, `websites`, `pages`, `sections`, `messages`, `chat_logs`.
3.  **Backend (API REST):**
    *   Sirve tanto al Admin del Cliente como al Sitio Público.
    *   El Sitio Público carga su contenido dinámicamente consultando la API basada en el subdominio o dominio personalizado.
4.  **Frontend:**
    *   **App Admin:** SPA (Single Page Application) para el panel de control.
    *   **Renderizador de Sitios:** Motor que toma el JSON de configuración del sitio y renderiza los componentes React correspondientes según el tema elegido.

---

## 🤖 6. Uso de IA (Gemini)

La IA es el motor de generación y asistencia de ONEIA.

### Casos de Uso en MVP
1.  **Generación "Zero-Touch":**
    *   Al registrarse, el usuario da el nombre y una descripción de su empresa.
    *   La IA genera: Estructura de navegación, Textos (Copywriting) para todas las secciones, Sugerencia de servicios y Paleta de colores inicial.
2.  **Asistente de Redacción (Magic Copy):**
    *   En el editor, botón "Mejorar con IA" en los campos de texto para reescribir, resumir o cambiar el tono.
3.  **Chatbot Inteligente:**
    *   RAG (Retrieval-Augmented Generation) ligero: El bot conoce el contenido de la web (servicios, horarios, "sobre nosotros") y responde preguntas de los visitantes basándose únicamente en esa información.

---

## 📦 7. Alcance del MVP

Para garantizar un lanzamiento rápido y robusto, definimos estrictamente qué entra y qué no.

### ✅ INCLUIDO (Scope)
*   Registro y Onboarding con generación automática de sitio.
*   3 Estilos Visuales (Themes) funcionales.
*   Panel de administración completo para el cliente.
*   Publicación en subdominio (ej. `empresa.oneia.com`).
*   Edición de textos, imágenes y colores.
*   Chatbot IA básico (entrenado con el contenido del sitio).
*   Formulario de contacto y bandeja de mensajes.
*   Admin General para gestión de usuarios.

### ❌ NO INCLUIDO (Out of Scope)
*   Editor "Drag & Drop" libre (el layout es rígido por diseño para asegurar calidad).
*   E-commerce / Carrito de compras.
*   Blog complejo con categorías y comentarios.
*   Sitios multi-idioma.
*   Integraciones nativas (Zapier, Mailchimp, etc.) - *Post-MVP*.
*   Marketplace de plantillas de terceros.
*   Gestión avanzada de DNS desde el panel (se hará manual o por soporte en MVP).

---
