import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { siteConfig } from './config/site.js';
import { BarberiaPage } from './pages/BarberiaPage.jsx';
import { CafeRestaurantePage } from './pages/CafeRestaurantePage.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';
import { DespachoContablePage } from './pages/DespachoContablePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { SaludProfesionalPage } from './pages/SaludProfesionalPage.jsx';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function RouterContent() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/barberia/" element={<BarberiaPage />} />
        <Route path="/cafe-restaurante/" element={<CafeRestaurantePage />} />
        <Route path="/salud-profesional/" element={<SaludProfesionalPage />} />
        <Route path="/despacho-contable/" element={<DespachoContablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter basename={siteConfig.routerBase}>
      <RouterContent />
    </BrowserRouter>
  );
}

