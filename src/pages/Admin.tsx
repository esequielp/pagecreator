import { useState, useEffect } from 'react';
import { Loader2, Users, Layout, DollarSign, Activity } from 'lucide-react';

export default function Admin() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/tenants')
      .then(res => res.json())
      .then(data => {
        setTenants(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-brand-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-display font-bold">ONEIA Admin</h1>
          <p className="text-xs text-slate-400 mt-1">Super Admin</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-brand-600 rounded-lg text-white">
            <Users className="h-5 w-5 mr-3" />
            Clientes (Tenants)
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Layout className="h-5 w-5 mr-3" />
            Plantillas
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <DollarSign className="h-5 w-5 mr-3" />
            Finanzas
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Activity className="h-5 w-5 mr-3" />
            Métricas
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Gestión de Clientes</h2>
          <p className="text-slate-500">Vista general de todas las empresas registradas en la plataforma.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Clientes</p>
                <p className="text-3xl font-bold text-slate-900">{tenants.length}</p>
              </div>
              <div className="p-3 bg-brand-50 rounded-lg">
                <Users className="h-6 w-6 text-brand-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Ingresos Estimados</p>
                <p className="text-3xl font-bold text-slate-900">
                  ${tenants.reduce((acc, t) => acc + (t.plan === 'basic' ? 499 : t.plan === 'corporate' ? 999 : 1899), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Sitios Activos</p>
                <p className="text-3xl font-bold text-slate-900">{tenants.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Empresa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sitio Web</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha Registro</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {tenants.map((tenant) => (
                <tr key={tenant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                        {tenant.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{tenant.name}</div>
                        <div className="text-sm text-slate-500">{tenant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tenant.plan === 'premium' ? 'bg-purple-100 text-purple-800' : 
                      tenant.plan === 'corporate' ? 'bg-brand-100 text-brand-800' : 
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <a href={`/site/${tenant.slug}`} target="_blank" className="text-brand-600 hover:text-brand-900 hover:underline">
                      {tenant.slug}.oneia.com
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(tenant.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-brand-600 hover:text-brand-900">Editar</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
