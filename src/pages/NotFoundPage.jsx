import { CTAButton } from '../components/CTAButton.jsx';
import { siteConfig } from '../config/site.js';

export function NotFoundPage() {
  return (
    <div
      className="page-surface flex min-h-screen items-center justify-center px-5"
      style={{
        '--accent-from': '#1E5AA8',
        '--accent-to': '#7FDBFF',
        '--accent-halo': 'rgba(30, 90, 168, 0.28)',
        '--accent-surface': 'rgba(30, 90, 168, 0.12)',
      }}
    >
      <div className="glass-panel w-full max-w-2xl rounded-[32px] border border-outline-variant/30 p-8 text-center shadow-panel sm:p-10">
        <span className="eyebrow">Ruta no encontrada</span>
        <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">
          Esa demo no existe o fue movida.
        </h1>
        <p className="mt-5 text-lg leading-8 text-on-surface-variant">
          Regresa al catalogo principal para explorar las demos disponibles o hablar con
          ByteShark sobre una version personalizada.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton href="/">Volver al catalogo</CTAButton>
          <CTAButton href={siteConfig.contact.whatsappUrl} variant="secondary">
            Contactar a ByteShark
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

