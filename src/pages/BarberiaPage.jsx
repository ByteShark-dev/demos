import { DemoPage } from './DemoPage.jsx';
import { getDemoBySlug } from '../config/demos.js';

export function BarberiaPage() {
  return <DemoPage demo={getDemoBySlug('barberia')} />;
}

