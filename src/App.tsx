import { useState } from 'react';
import { 
  Menu, X, ChevronRight, CheckCircle2, 
  MonitorSmartphone, Rocket, ShieldCheck, 
  BarChart3, ArrowRight, Quote, Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
                ONEIA<span className="text-brand-600">.</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Beneficios</a>
              <a href="#planes" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Planes</a>
              <a href="#proceso" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Proceso</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">FAQ</a>
              <a href="#contacto" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all hover:shadow-md">
                Solicitar Presupuesto
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <a href="#beneficios" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg">Beneficios</a>
                <a href="#planes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg">Planes</a>
                <a href="#proceso" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg">Proceso</a>
                <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg">FAQ</a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center mt-4 px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-700">
                  Solicitar Presupuesto
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50 via-white to-white -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-8 border border-brand-100"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-600 mr-2"></span>
              Agencia especializada en diseño web corporativo
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Tu página web no debe ser un gasto, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">debe ser tu mejor vendedor.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              En ONEIA creamos sitios web corporativos modernos, rápidos y optimizados para convertir visitantes en clientes reales para tu negocio.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#contacto" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                Quiero mi web profesional
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#planes" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                Ver planes y precios
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center"><CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" /> Diseño a medida</div>
              <div className="flex items-center"><CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" /> Optimizado para SEO</div>
              <div className="flex items-center"><CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" /> Soporte técnico</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="beneficios" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              ¿Por qué elegir a ONEIA para tu proyecto?
            </h2>
            <p className="text-lg text-slate-600">
              No hacemos simples "plantillas". Construimos herramientas digitales diseñadas específicamente para alcanzar tus objetivos comerciales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-brand-600" />,
                title: "Enfoque en Conversión",
                desc: "Cada botón, texto y sección está estratégicamente ubicado para guiar al usuario hacia la compra o contacto."
              },
              {
                icon: <MonitorSmartphone className="h-8 w-8 text-brand-600" />,
                title: "Diseño 100% Responsivo",
                desc: "Tu web se verá y funcionará perfectamente en móviles, tablets y computadoras de escritorio."
              },
              {
                icon: <Rocket className="h-8 w-8 text-brand-600" />,
                title: "Velocidad Extrema",
                desc: "Optimizamos el código y las imágenes para que tu sitio cargue en milisegundos, mejorando el SEO y la experiencia."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-brand-600" />,
                title: "Seguridad Garantizada",
                desc: "Implementamos certificados SSL y las mejores prácticas de seguridad para proteger tu negocio y a tus clientes."
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-brand-600" />,
                title: "Autogestionable",
                desc: "Te entregamos un panel de control intuitivo para que puedas actualizar textos e imágenes sin depender de nosotros."
              },
              {
                icon: <ArrowRight className="h-8 w-8 text-brand-600" />,
                title: "Soporte Continuo",
                desc: "No desaparecemos tras la entrega. Ofrecemos planes de mantenimiento para que tu web siempre esté actualizada."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                Un proceso claro, sin sorpresas ni retrasos.
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Hemos perfeccionado nuestra metodología para garantizar que tu proyecto se entregue a tiempo, dentro del presupuesto y superando tus expectativas.
              </p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Brief y Estrategia", desc: "Nos reunimos para entender tu negocio, tu cliente ideal y tus objetivos comerciales." },
                  { step: "02", title: "Diseño UI/UX", desc: "Creamos prototipos visuales para que apruebes el diseño antes de escribir una sola línea de código." },
                  { step: "03", title: "Desarrollo y Programación", desc: "Construimos tu web con tecnologías modernas, asegurando velocidad y adaptabilidad." },
                  { step: "04", title: "Lanzamiento y Capacitación", desc: "Publicamos tu sitio, lo optimizamos para Google y te enseñamos a usarlo." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold font-display text-sm">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/agency/800/1000?blur=2" 
                  alt="Equipo trabajando en diseño web" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                    <p className="font-medium text-lg mb-2">"El proceso fue increíblemente fluido. En 3 semanas teníamos nuestra nueva web corporativa generando leads."</p>
                    <p className="text-sm text-white/70">— Director de Marketing, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planes" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Planes transparentes para cada etapa de tu negocio
            </h2>
            <p className="text-lg text-slate-400">
              Elige el paquete que mejor se adapte a tus necesidades actuales. Todos nuestros planes incluyen diseño profesional y optimización móvil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
              <h3 className="text-xl font-medium text-slate-300 mb-2">Básico</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold">$499</span>
                <span className="text-slate-400 ml-2">USD</span>
              </div>
              <p className="text-slate-400 text-sm mb-8">Ideal para profesionales independientes y pequeños negocios que necesitan presencia online.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Landing Page (One-page)</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Diseño Responsivo</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Formulario de Contacto</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Integración con WhatsApp</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Optimización SEO Básica</span></li>
              </ul>
              
              <a href="#contacto" className="w-full block text-center py-3 px-6 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                Elegir Básico
              </a>
            </div>

            {/* Intermediate Plan */}
            <div className="bg-brand-600 rounded-3xl p-8 border border-brand-500 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-brand-900/50">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Más Popular
              </div>
              <h3 className="text-xl font-medium text-brand-100 mb-2">Corporativo</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">$999</span>
                <span className="text-brand-200 ml-2">USD</span>
              </div>
              <p className="text-brand-100 text-sm mb-8">Para empresas establecidas que buscan generar confianza y captar leads de calidad.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">Sitio Web hasta 5 páginas</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">Diseño UI/UX Personalizado</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">Panel Autogestionable (CMS)</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">Blog de Noticias</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">Integración con Google Analytics</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-white mr-3 shrink-0" /> <span className="text-white text-sm">1 Mes de Soporte Gratuito</span></li>
              </ul>
              
              <a href="#contacto" className="w-full block text-center py-3 px-6 rounded-xl font-medium bg-white text-brand-900 hover:bg-slate-50 transition-colors">
                Elegir Corporativo
              </a>
            </div>

            {/* Premium Plan */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
              <h3 className="text-xl font-medium text-slate-300 mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold">$1,899</span>
                <span className="text-slate-400 ml-2">USD</span>
              </div>
              <p className="text-slate-400 text-sm mb-8">Solución completa para empresas que necesitan funcionalidades avanzadas o e-commerce.</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Páginas Ilimitadas / E-commerce</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Diseño Premium Exclusivo</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Integración de Pasarela de Pagos</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">Automatización de Emails</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">SEO Avanzado On-Page</span></li>
                <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-brand-500 mr-3 shrink-0" /> <span className="text-slate-300 text-sm">3 Meses de Soporte Gratuito</span></li>
              </ul>
              
              <a href="#contacto" className="w-full block text-center py-3 px-6 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                Elegir Premium
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-slate-600">
              No confíes solo en nuestra palabra. Descubre cómo hemos ayudado a otras empresas a escalar sus ventas a través del diseño web.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Desde que lanzamos la nueva web con ONEIA, nuestras solicitudes de presupuesto aumentaron un 150%. El diseño transmite exactamente la profesionalidad que buscábamos.",
                name: "Carlos Mendoza",
                role: "CEO, Constructora Horizonte",
                img: "https://picsum.photos/seed/face1/100/100"
              },
              {
                quote: "El equipo entendió perfectamente nuestra visión. El proceso fue rápido, transparente y el resultado final superó con creces nuestras expectativas. Totalmente recomendados.",
                name: "Laura Gómez",
                role: "Directora, Clínica Vitality",
                img: "https://picsum.photos/seed/face2/100/100"
              },
              {
                quote: "Teníamos una web obsoleta que no generaba confianza. ONEIA la transformó por completo. Ahora es nuestra principal herramienta de captación de clientes internacionales.",
                name: "Andrés Silva",
                role: "Fundador, Silva Logistics",
                img: "https://picsum.photos/seed/face3/100/100"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-100" />
                <p className="text-slate-600 mb-8 relative z-10 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-slate-600">
              Resolvemos tus dudas antes de empezar.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Cuánto tiempo tarda el desarrollo de mi página web?",
                a: "El tiempo varía según la complejidad del proyecto. Una Landing Page (Plan Básico) suele estar lista en 1-2 semanas. Un sitio corporativo (Plan Intermedio) toma entre 3 y 4 semanas, mientras que un proyecto Premium puede llevar de 6 a 8 semanas."
              },
              {
                q: "¿Tendré que pagar mensualidades?",
                a: "No cobramos mensualidades por el diseño de la web. El pago es único por el desarrollo. Sin embargo, necesitarás un dominio y hosting (alojamiento web) que se renuevan anualmente. Si lo deseas, ofrecemos planes de mantenimiento opcionales."
              },
              {
                q: "¿Podré modificar el contenido yo mismo?",
                a: "¡Sí! En los planes Corporativo y Premium entregamos la web con un gestor de contenidos (CMS) muy fácil de usar. Te daremos una capacitación para que puedas cambiar textos, imágenes o publicar artículos en el blog sin depender de nosotros."
              },
              {
                q: "¿La web estará optimizada para Google (SEO)?",
                a: "Absolutamente. Todas nuestras webs se construyen siguiendo las mejores prácticas de SEO técnico: carga rápida, estructura de etiquetas correcta, URLs amigables y diseño adaptado a móviles, lo que facilita que Google indexe y posicione tu sitio."
              },
              {
                q: "¿Cuáles son las formas de pago?",
                a: "Trabajamos con un anticipo del 50% para iniciar el proyecto y el 50% restante contra entrega, una vez que la web esté aprobada y lista para publicarse. Aceptamos transferencias bancarias y tarjetas de crédito."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <Minus className="h-5 w-5 text-brand-600 flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Footer */}
      <section id="contacto" className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-900/50 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  ¿Listo para llevar tu negocio al siguiente nivel?
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  Déjanos tus datos y un especialista de ONEIA se pondrá en contacto contigo en menos de 24 horas para analizar tu proyecto sin compromiso.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-slate-300">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                      <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span>hola@oneia.com</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mr-4 border border-slate-700">
                      <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <span>+34 900 123 456</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Solicitar Presupuesto</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="juan@empresa.com" />
                  </div>
                  <div>
                    <label htmlFor="plan" className="block text-sm font-medium text-slate-700 mb-1">Plan de interés</label>
                    <select id="plan" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white">
                      <option>Plan Básico ($499)</option>
                      <option>Plan Corporativo ($999)</option>
                      <option>Plan Premium ($1,899)</option>
                      <option>Aún no lo sé, necesito asesoría</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Cuéntanos sobre tu proyecto</label>
                    <textarea id="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none" placeholder="¿A qué se dedica tu empresa? ¿Qué objetivos buscas con la web?"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 px-6 rounded-xl font-medium text-white bg-brand-600 hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all">
                    Enviar Solicitud
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Al enviar este formulario aceptas nuestra política de privacidad.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              ONEIA<span className="text-brand-500">.</span>
            </span>
            <p className="text-slate-500 text-sm mt-2">© {new Date().getFullYear()} ONEIA Agencia Digital. Todos los derechos reservados.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
