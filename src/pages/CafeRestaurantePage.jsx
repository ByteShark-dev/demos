import { DemoPage } from './DemoPage.jsx';
import { getDemoBySlug } from '../config/demos.js';

export function CafeRestaurantePage() {
  return <DemoPage demo={getDemoBySlug('cafe-restaurante')} />;
}

