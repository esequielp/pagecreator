import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic',
    description: '',
    services: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Simulate payment delay
        setTimeout(() => {
          navigate(`/dashboard/${data.tenantId}`);
        }, 1500);
      } else {
        alert('Error creating account');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to server');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-display font-bold text-slate-900">
          Crea tu cuenta en ONEIA
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Y obtén tu página web generada con IA en segundos.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4">
                  <label htmlFor="plan" className="block text-sm font-medium text-slate-700">Plan Seleccionado</label>
                  <select 
                    id="plan" 
                    name="plan" 
                    value={formData.plan} 
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md border"
                  >
                    <option value="free">Gratis (Prueba)</option>
                    <option value="basic">Básico ($499)</option>
                    <option value="corporate">Corporativo ($999)</option>
                    <option value="premium">Premium ($1,899)</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nombre de tu Empresa</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo Electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" 
                  />
                </div>

                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                >
                  Siguiente
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">Descripción de tu negocio</label>
                  <textarea 
                    name="description" 
                    id="description" 
                    rows={3} 
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ej. Somos una consultora financiera especializada en startups..."
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="services" className="block text-sm font-medium text-slate-700">Servicios (separados por coma)</label>
                  <input 
                    type="text" 
                    name="services" 
                    id="services" 
                    required 
                    value={formData.services}
                    onChange={handleChange}
                    placeholder="Ej. Auditoría, Contabilidad, Asesoría Fiscal"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" 
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-md mb-6 border border-slate-200">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Resumen de Pago</h4>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Plan {formData.plan === 'free' ? 'Gratis' : formData.plan === 'basic' ? 'Básico' : formData.plan === 'corporate' ? 'Corporativo' : 'Premium'}</span>
                    <span className="font-medium text-slate-900">
                      {formData.plan === 'free' ? '$0' : formData.plan === 'basic' ? '$499' : formData.plan === 'corporate' ? '$999' : '$1,899'}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Generando tu sitio con IA...
                    </>
                  ) : (
                    'Pagar y Generar Sitio'
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-full mt-2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
                >
                  Atrás
                </button>
              </motion.div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
