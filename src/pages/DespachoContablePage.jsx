import { DemoPage } from './DemoPage.jsx';
import { getDemoBySlug } from '../config/demos.js';

export function DespachoContablePage() {
  return <DemoPage demo={getDemoBySlug('despacho-contable')} />;
}

