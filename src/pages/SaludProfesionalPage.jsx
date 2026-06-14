import { DemoPage } from './DemoPage.jsx';
import { getDemoBySlug } from '../config/demos.js';

export function SaludProfesionalPage() {
  return <DemoPage demo={getDemoBySlug('salud-profesional')} />;
}

