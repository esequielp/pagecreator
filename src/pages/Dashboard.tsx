import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Save, Eye, Layout, Settings, LogOut, Loader2, Check, Palette, Type, Inbox, MessageSquare, Mail, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function Dashboard() {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [activeView, setActiveView] = useState<'editor' | 'design' | 'settings' | 'inbox'>('editor');
  const [messages, setMessages] = useState<any[]>([]);
  const [socialConfig, setSocialConfig] = useState<any>({ facebook: '', linkedin: '', instagram: '', twitter: '' });

  // Design State
  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [selectedTheme, setSelectedTheme] = useState('modern'); // corporate, modern, creative

  useEffect(() => {
    fetch(`/api/dashboard/${tenantId}`)
      .then(res => res.json())
      .then(data => {
        setTenant(data.tenant);
        setWebsite(data.website);
        const parsedContent = JSON.parse(data.website.content_json);
        setContent(parsedContent);
        setThemeColor(data.website.theme_color || '#3b82f6');
        setFontFamily(data.website.font_family || 'Inter');
        setSelectedTheme(parsedContent.theme || 'modern');
        if (data.tenant.social_config) {
            setSocialConfig(JSON.parse(data.tenant.social_config));
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [tenantId]);

  useEffect(() => {
    if (activeView === 'inbox' && tenantId) {
      fetch(`/api/dashboard/messages/${tenantId}`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error(err));
    }
  }, [activeView, tenantId]);

  const handleContentChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSeoChange = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setSocialConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Ensure seo object exists
      const updatedContent = {
        ...content,
        theme: selectedTheme,
        seo: content.seo || { title: content.hero.title, description: content.hero.subtitle }
      };

      await fetch(`/api/website/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_json: updatedContent,
          theme_color: themeColor,
          font_family: fontFamily
        })
      });

      await fetch(`/api/tenant/${tenant.id}/social`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social_config: socialConfig })
      });

      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const themes = [
    { id: 'corporate', name: 'Corporativo', desc: 'Sobrio y profesional', color: '#1e3a8a', font: 'Merriweather' },
    { id: 'modern', name: 'Moderno', desc: 'Limpio y tecnológico', color: '#3b82f6', font: 'Inter' },
    { id: 'creative', name: 'Creativo', desc: 'Atrevido y visual', color: '#8b5cf6', font: 'Space Grotesk' }
  ];

  const applyThemePreset = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setSelectedTheme(themeId);
      setThemeColor(theme.color);
      setFontFamily(theme.font);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-brand-600" /></div>;

  // Calculate trial days remaining
  const trialDays = 7;
  const createdAt = new Date(tenant.created_at);
  const now = new Date();
  const diffTime = now.getTime() - createdAt.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Use floor to count full days passed
  const daysRemaining = Math.max(0, trialDays - diffDays);
  const isExpired = daysRemaining === 0;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-display font-bold">ONEIA Panel</h1>
          <p className="text-xs text-slate-400 mt-1">{tenant.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveView('editor')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeView === 'editor' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Edit className="h-5 w-5 mr-3" />
            Editor de Contenido
          </button>
          <button 
            onClick={() => setActiveView('design')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeView === 'design' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Layout className="h-5 w-5 mr-3" />
            Diseño y Estilo
          </button>
          <button 
            onClick={() => setActiveView('inbox')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeView === 'inbox' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Inbox className="h-5 w-5 mr-3" />
            Bandeja de Entrada
          </button>
          <button 
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeView === 'settings' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Configuración
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="w-full flex items-center px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        
        {/* Trial Banner */}
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between shadow-sm ${isExpired ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}`}>
          <div className="flex items-center">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full mr-3 ${isExpired ? 'bg-red-100' : 'bg-indigo-100'}`}>
              {isExpired ? <LogOut className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            </span>
            <div>
              <p className="font-bold text-sm">{isExpired ? 'Periodo de prueba finalizado' : 'Periodo de prueba activo'}</p>
              <p className="text-xs opacity-90">{isExpired ? 'Actualiza tu plan para continuar usando ONEIA.' : `Te quedan ${daysRemaining} días de prueba gratis.`}</p>
            </div>
          </div>
          <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isExpired ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            Actualizar Plan
          </button>
        </div>

        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {activeView === 'editor' && 'Editor de Contenido'}
              {activeView === 'design' && 'Diseño y Estilo'}
              {activeView === 'inbox' && 'Bandeja de Entrada'}
              {activeView === 'settings' && 'Configuración'}
            </h2>
            <p className="text-slate-500">
              {activeView === 'editor' && 'Personaliza los textos e imágenes de tu sitio.'}
              {activeView === 'design' && 'Define la apariencia visual de tu marca.'}
              {activeView === 'inbox' && 'Gestiona los mensajes de contacto y chat.'}
              {activeView === 'settings' && 'Gestiona los ajustes generales y SEO.'}
            </p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to={`/site/${tenant.slug}`} 
              target="_blank"
              className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Sitio Público
            </Link>
            {activeView !== 'inbox' && (
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Guardar Cambios
              </button>
            )}
          </div>
        </header>

        {activeView === 'inbox' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Inbox className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No tienes mensajes aún</p>
                <p className="text-sm">Los mensajes del formulario de contacto y chat aparecerán aquí.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {messages.map((msg) => {
                  const data = JSON.parse(msg.data);
                  return (
                    <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {msg.type === 'contact' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Mail className="w-3 h-3 mr-1" /> Contacto
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <MessageSquare className="w-3 h-3 mr-1" /> Chat
                            </span>
                          )}
                          <span className="text-xs text-slate-400">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>
                        {!msg.is_read && (
                          <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
                        )}
                      </div>
                      
                      {msg.type === 'contact' ? (
                        <div>
                          <h4 className="font-bold text-slate-900">{data.name} <span className="font-normal text-slate-500 text-sm">&lt;{data.email}&gt;</span></h4>
                          <p className="mt-2 text-slate-700">{data.message}</p>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-slate-900">{data.sender === 'user' ? 'Usuario' : 'Bot'}</h4>
                          <p className="mt-2 text-slate-700">{data.message}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Controls */}
            <div className="space-y-6">
              
              {/* EDITOR VIEW */}
              {activeView === 'editor' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                  {/* Hero Section Edit */}
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                      Sección Hero
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Título Principal</label>
                        <input 
                          type="text" 
                          value={content.hero.title} 
                          onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Subtítulo</label>
                        <textarea 
                          rows={3}
                          value={content.hero.subtitle} 
                          onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Texto del Botón (CTA)</label>
                        <input 
                          type="text" 
                          value={content.hero.cta} 
                          onChange={(e) => handleContentChange('hero', 'cta', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Section Edit */}
                  <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                      Sobre Nosotros
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                        <input 
                          type="text" 
                          value={content.about.title} 
                          onChange={(e) => handleContentChange('about', 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                        <textarea 
                          rows={4}
                          value={content.about.desc} 
                          onChange={(e) => handleContentChange('about', 'desc', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                   {/* Contact Section Edit */}
                   <div className="border-b border-slate-100 pb-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                      Contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email de Contacto</label>
                        <input 
                          type="email" 
                          value={content.contact.email} 
                          onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                        <input 
                          type="text" 
                          value={content.contact.phone} 
                          onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media Edit */}
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-3 text-sm font-bold">4</span>
                      Redes Sociales
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Facebook className="text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="URL de Facebook"
                          value={socialConfig.facebook} 
                          onChange={(e) => handleSocialChange('facebook', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin className="text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="URL de LinkedIn"
                          value={socialConfig.linkedin} 
                          onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Instagram className="text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="URL de Instagram"
                          value={socialConfig.instagram} 
                          onChange={(e) => handleSocialChange('instagram', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Twitter className="text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="URL de Twitter (X)"
                          value={socialConfig.twitter} 
                          onChange={(e) => handleSocialChange('twitter', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* DESIGN VIEW */}
            {activeView === 'design' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-8">
                
                {/* Theme Selector */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-brand-600" />
                    Tema Visual
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => applyThemePreset(t.id)}
                        className={`flex items-center p-4 border rounded-xl transition-all ${selectedTheme === t.id ? 'border-brand-500 ring-2 ring-brand-500 ring-opacity-20 bg-brand-50' : 'border-slate-200 hover:border-brand-300'}`}
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4`} style={{ backgroundColor: t.color }}>
                          Aa
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-slate-900">{t.name}</h4>
                          <p className="text-sm text-slate-500">{t.desc}</p>
                        </div>
                        {selectedTheme === t.id && <CheckCircle2 className="ml-auto text-brand-600 h-6 w-6" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Picker */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-brand-600" />
                    Color Principal
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['#1e3a8a', '#3b82f6', '#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#111827'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setThemeColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === color ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input 
                      type="color" 
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                    />
                  </div>
                </div>

                {/* Font Selector */}
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                    <Type className="w-5 h-5 mr-2 text-brand-600" />
                    Tipografía
                  </h3>
                  <select 
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="Inter">Inter (Moderno, Sans-serif)</option>
                    <option value="Merriweather">Merriweather (Clásico, Serif)</option>
                    <option value="Space Grotesk">Space Grotesk (Tech, Display)</option>
                    <option value="Roboto">Roboto (Neutral)</option>
                    <option value="Playfair Display">Playfair Display (Elegante)</option>
                  </select>
                </div>

              </div>
            )}

            {/* SETTINGS VIEW */}
            {activeView === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Información General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Tenant</label>
                      <input 
                        type="text" 
                        value={tenant.name} 
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-slate-400 mt-1">Contacta a soporte para cambiar el nombre.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Slug (Subdominio)</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                          https://
                        </span>
                        <input 
                          type="text" 
                          value={tenant.slug} 
                          disabled
                          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed"
                        />
                        <span className="inline-flex items-center px-3 border border-l-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                          .oneia.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">SEO (Optimización para Buscadores)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Título del Sitio (Meta Title)</label>
                      <input 
                        type="text" 
                        value={content.seo?.title || content.hero.title} 
                        onChange={(e) => handleSeoChange('title', e.target.value)}
                        placeholder="Ej. Consultora Financiera en Madrid | MiEmpresa"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (Meta Description)</label>
                      <textarea 
                        rows={3}
                        value={content.seo?.description || content.hero.subtitle} 
                        onChange={(e) => handleSeoChange('description', e.target.value)}
                        placeholder="Breve descripción que aparecerá en Google..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Live Preview */}
          <div className="sticky top-8">
            <div className="bg-slate-800 rounded-xl p-2 shadow-2xl border border-slate-700">
              <div className="flex items-center justify-between px-2 py-2 mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 flex-1 text-center mx-4 truncate">
                  {tenant.slug}.oneia.com
                </div>
              </div>
              
              {/* PREVIEW IFRAME SIMULATION */}
              <div 
                className="bg-white rounded-lg overflow-hidden h-[600px] overflow-y-auto relative transition-all duration-300"
                style={{ fontFamily: fontFamily }}
              >
                {/* Dynamic Styles based on Theme */}
                <style>{`
                  .theme-btn { background-color: ${themeColor}; }
                  .theme-text { color: ${themeColor}; }
                  .theme-border { border-color: ${themeColor}; }
                  .theme-bg-light { background-color: ${themeColor}10; } /* 10% opacity */
                `}</style>

                {/* Hero Preview */}
                <div className={`py-16 px-8 text-center ${selectedTheme === 'corporate' ? 'bg-slate-50 text-slate-900 border-b-4 theme-border' : selectedTheme === 'creative' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                  {selectedTheme === 'modern' && <div className="w-20 h-1 theme-btn mx-auto mb-8 rounded-full"></div>}
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${selectedTheme === 'creative' ? 'uppercase tracking-tighter text-5xl' : ''}`}>
                    {content.hero.title}
                  </h1>
                  <p className={`mb-8 max-w-lg mx-auto ${selectedTheme === 'creative' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {content.hero.subtitle}
                  </p>
                  <button className={`theme-btn text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition-opacity ${selectedTheme === 'corporate' ? 'rounded-md uppercase tracking-wide' : ''}`}>
                    {content.hero.cta}
                  </button>
                </div>

                {/* About Preview */}
                <div className="py-12 px-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.about.title}</h2>
                    <div className="w-12 h-1 theme-btn mx-auto mb-6"></div>
                    <p className="text-slate-600 leading-relaxed">{content.about.desc}</p>
                  </div>
                </div>

                {/* Services Preview */}
                <div className="theme-bg-light py-12 px-8">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Nuestros Servicios</h2>
                    <div className={`grid gap-4 ${selectedTheme === 'creative' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {content.services.map((s: any, i: number) => (
                        <div key={i} className={`bg-white p-6 shadow-sm ${selectedTheme === 'modern' ? 'rounded-xl' : selectedTheme === 'corporate' ? 'border border-slate-200' : 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                          <h3 className="font-bold text-slate-900 mb-2 theme-text">{s.title}</h3>
                          <p className="text-sm text-slate-500">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Preview */}
                 <div className="bg-slate-900 text-white py-12 px-8 text-center text-sm">
                  <h3 className="text-xl font-bold mb-6">Contáctanos</h3>
                  <p className="mb-2">{content.contact.email}</p>
                  <p className="mb-8">{content.contact.phone}</p>
                  <div className="border-t border-slate-800 pt-8 text-slate-500">
                    © {new Date().getFullYear()} {tenant.name}. {content.seo?.title ? content.seo.title : ''}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
