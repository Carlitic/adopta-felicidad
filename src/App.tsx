import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingPage from '@/pages/LandingPage';
import CatalogPage from '@/pages/CatalogPage';
import AnimalDetail from '@/pages/AnimalDetail';
import AdminDashboard from '@/pages/AdminDashboard';
import LoginPage from '@/pages/LoginPage';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import RegisterShelterPage from '@/pages/RegisterShelterPage';
import { ShelterProvider } from '@/context/ShelterContext';
import { AnimalProvider } from '@/context/AnimalContext';
import AboutPage from '@/pages/AboutPage';

/**
 * Componente raíz de la aplicación.
 * Configura los proveedores de contexto (ShelterProvider, AnimalProvider)
 * y define las rutas principales usando React Router.
 */
function App() {
  return (
    <ShelterProvider>
      <AnimalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="catalogo" element={<CatalogPage />} />
              <Route path="animal/:id" element={<AnimalDetail />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro-protectora" element={<RegisterShelterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
          </Routes>
        </Router>
      </AnimalProvider>
    </ShelterProvider>
  );
}

export default App;
