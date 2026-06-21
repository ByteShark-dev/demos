import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { siteConfig } from './config/site.js';
import { BarberiaPage } from './pages/BarberiaPage.jsx';
import { BookingManagerPage } from './pages/BookingManagerPage.jsx';
import { BusinessManagerPage } from './pages/BusinessManagerPage.jsx';
import { CafeRestaurantePage } from './pages/CafeRestaurantePage.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';
import { DespachoContablePage } from './pages/DespachoContablePage.jsx';
import { EventManagerPage } from './pages/EventManagerPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { RealEstateManagerPage } from './pages/RealEstateManagerPage.jsx';
import { RestaurantManagerPage } from './pages/RestaurantManagerPage.jsx';
import { SaludProfesionalPage } from './pages/SaludProfesionalPage.jsx';
import { StockManagerPage } from './pages/StockManagerPage.jsx';

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
        <Route path="/booking-manager/" element={<BookingManagerPage />} />
        <Route path="/business-manager/" element={<BusinessManagerPage />} />
        <Route path="/cafe-restaurante/" element={<CafeRestaurantePage />} />
        <Route path="/event-manager/" element={<EventManagerPage />} />
        <Route path="/real-estate-manager/" element={<RealEstateManagerPage />} />
        <Route path="/restaurant-manager/" element={<RestaurantManagerPage />} />
        <Route path="/salud-profesional/" element={<SaludProfesionalPage />} />
        <Route path="/stock-manager/" element={<StockManagerPage />} />
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
