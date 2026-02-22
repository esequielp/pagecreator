import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Menu, X, ArrowRight, CheckCircle2, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TenantChatWidget from '../components/TenantChatWidget';

export default function PublicSite() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`/api/site/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Site not found');
        return res.json();
      })
      .then(data => {
        setData({
          ...data,
          content: JSON.parse(data.website.content_json),
          social: data.tenant.social_config ? JSON.parse(data.tenant.social_config) : {}
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: data.tenant.id,
          data: contactForm
        })
      });
      alert('Mensaje enviado correctamente');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-slate-400" /></div>;
  
  if (!data) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-slate-600">El sitio web que buscas no existe.</p>
    </div>
  );

  const { content, website, tenant, social } = data;
  const primaryColor = website.theme_color || '#3b82f6';
  const fontFamily = website.font_family || 'Inter';
  const theme = content.theme || 'modern'; // corporate, modern, creative

  // Dynamic styles helper
  const getThemeStyles = () => {
    switch(theme) {
      case 'corporate':
        return {
          heroClass: 'bg-slate-50 text-slate-900 border-b-4',
          heroTitleClass: 'text-5xl md:text-6xl font-bold tracking-tight',
          cardClass: 'bg-white p-8 border border-slate-200 shadow-sm',
          buttonClass: 'rounded-md uppercase tracking-wide',
          sectionClass: 'py-24'
        };
      case 'creative':
        return {
          heroClass: 'bg-slate-900 text-white',
          heroTitleClass: 'text-6xl md:text-8xl font-black uppercase tracking-tighter',
          cardClass: 'bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
          buttonClass: 'rounded-none border-2 border-white hover:bg-white hover:text-black',
          sectionClass: 'py-32'
        };
      case 'modern':
      default:
        return {
          heroClass: 'bg-white text-slate-900',
          heroTitleClass: 'text-5xl md:text-7xl font-bold tracking-tight',
          cardClass: 'bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow',
          buttonClass: 'rounded-full shadow-lg hover:shadow-xl',
          sectionClass: 'py-24'
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      <style>{`
        .theme-primary-bg { background-color: ${primaryColor}; }
        .theme-primary-text { color: ${primaryColor}; }
        .theme-primary-border { border-color: ${primaryColor}; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 backdrop-blur-md border-b ${theme === 'creative' ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/90 border-slate-100 text-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className={`font-bold text-2xl tracking-tight ${theme === 'creative' ? 'text-white' : 'text-slate-900'}`}>
                {content.hero.title}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className={`text-sm font-medium transition-colors ${theme === 'creative' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Servicios</a>
              <a href="#nosotros" className={`text-sm font-medium transition-colors ${theme === 'creative' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Nosotros</a>
              <a href="#contacto" className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-all text-white ${styles.buttonClass}`} style={{ backgroundColor: theme === 'creative' ? 'transparent' : primaryColor, borderColor: theme === 'creative' ? primaryColor : 'transparent' }}>
                {content.hero.cta}
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none ${theme === 'creative' ? 'text-white' : 'text-slate-600'}`}
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
              className={`md:hidden border-b overflow-hidden ${theme === 'creative' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <a href="#servicios" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-3 text-base font-medium rounded-lg ${theme === 'creative' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}>Servicios</a>
                <a href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-3 text-base font-medium rounded-lg ${theme === 'creative' ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}>Nosotros</a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className={`block w-full text-center mt-4 px-5 py-3 border border-transparent text-base font-medium text-white ${styles.buttonClass}`} style={{ backgroundColor: primaryColor }}>
                  {content.hero.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden ${styles.heroClass}`} style={{ borderColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          {theme === 'modern' && <div className="w-24 h-1 mx-auto mb-8 rounded-full theme-primary-bg"></div>}
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 ${styles.heroTitleClass}`}
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${theme === 'creative' ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {content.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="#contacto" className={`inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all ${styles.buttonClass}`} style={{ backgroundColor: primaryColor }}>
              {content.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className={`${styles.sectionClass} ${theme === 'creative' ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'creative' ? 'text-white' : 'text-slate-900'}`}>
              Nuestros Servicios
            </h2>
            <p className={`text-lg ${theme === 'creative' ? 'text-slate-400' : 'text-slate-600'}`}>
              Soluciones profesionales adaptadas a tus necesidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service: any, idx: number) => (
              <div key={idx} className={styles.cardClass}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white theme-primary-bg">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className={`${styles.sectionClass} ${theme === 'creative' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'creative' ? 'text-white' : 'text-slate-900'}`}>
                {content.about.title}
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${theme === 'creative' ? 'text-slate-400' : 'text-slate-600'}`}>
                {content.about.desc}
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-20 rounded-full theme-primary-bg"></div>
                <span className={`font-medium text-sm uppercase tracking-wider ${theme === 'creative' ? 'text-slate-500' : 'text-slate-500'}`}>Sobre Nosotros</span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className={`relative overflow-hidden aspect-video bg-slate-200 ${theme === 'modern' ? 'rounded-3xl shadow-2xl' : theme === 'creative' ? 'border-2 border-white' : 'rounded-none'}`}>
                 {/* Placeholder for about image */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                    <span className="text-lg font-medium">Imagen Corporativa</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className={`${styles.sectionClass} ${theme === 'creative' ? 'bg-black text-white' : 'bg-slate-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Contáctanos</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 text-slate-400" />
                  <span className="text-lg">{content.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 text-slate-400" />
                  <span className="text-lg">{content.contact.phone}</span>
                </div>
                {content.contact.address && (
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4 text-slate-400" />
                    <span className="text-lg">{content.contact.address}</span>
                  </div>
                )}
              </div>
              
              {/* Social Media Links */}
              {(social.facebook || social.linkedin || social.instagram || social.twitter) && (
                <div className="mt-12">
                  <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Síguenos</h4>
                  <div className="flex space-x-4">
                    {social.facebook && (
                      <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Facebook className="h-6 w-6" />
                      </a>
                    )}
                    {social.linkedin && (
                      <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                    {social.instagram && (
                      <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}
                    {social.twitter && (
                      <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`p-8 text-slate-900 ${theme === 'creative' ? 'bg-white border-4 border-primary' : 'bg-white rounded-2xl'}`}>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className={`w-full px-4 py-3 border border-slate-200 focus:ring-2 outline-none transition-all ${theme === 'modern' ? 'rounded-xl' : 'rounded-none'}`} 
                    style={{ borderColor: primaryColor }} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className={`w-full px-4 py-3 border border-slate-200 focus:ring-2 outline-none transition-all ${theme === 'modern' ? 'rounded-xl' : 'rounded-none'}`} 
                    style={{ borderColor: primaryColor }} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                  <textarea 
                    rows={4} 
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className={`w-full px-4 py-3 border border-slate-200 focus:ring-2 outline-none transition-all ${theme === 'modern' ? 'rounded-xl' : 'rounded-none'}`} 
                    style={{ borderColor: primaryColor }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={sending}
                  className={`w-full py-4 px-6 font-medium text-white shadow-lg transition-all disabled:opacity-70 ${styles.buttonClass}`} 
                  style={{ backgroundColor: primaryColor }}
                >
                  {sending ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} {content.hero.title}. {content.seo?.title || ''}</p>
        <p className="mt-2">Powered by ONEIA</p>
      </footer>

      <TenantChatWidget 
        tenantId={tenant.id} 
        tenantName={content.hero.title} 
        primaryColor={primaryColor} 
      />
    </div>
  );
}
