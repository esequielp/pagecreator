import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import PublicSite from './pages/PublicSite';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard/:tenantId" element={<Dashboard />} />
        <Route path="/site/:slug" element={<PublicSite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
