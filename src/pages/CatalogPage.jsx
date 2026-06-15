import { CTAButton } from '../components/CTAButton.jsx';
import { DemoCard } from '../components/DemoCard.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { demos } from '../config/demos.js';
import { siteConfig } from '../config/site.js';

export function CatalogPage() {
  return (
    <div
      className="page-surface min-h-screen"
      style={{
        '--accent-from': '#1E5AA8',
        '--accent-to': '#7FDBFF',
        '--accent-halo': 'rgba(30, 90, 168, 0.28)',
        '--accent-surface': 'rgba(30, 90, 168, 0.12)',
      }}
    >
      <header className="site-navbar sticky top-0 z-50">
        <div className="section-shell flex items-center justify-between gap-4 py-4">
          <a
            className="flex min-w-0 items-center gap-3 text-on-surface"
            href={siteConfig.links.mainSite}
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="ByteShark"
              className="h-10 w-10 object-contain"
              height="40"
              src={siteConfig.brand.logoUrl}
              width="40"
            />
            <div className="min-w-0">
              <p className="font-headline text-lg font-bold tracking-tight">{siteConfig.brand.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                Union de demos comerciales
              </p>
            </div>
          </a>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={siteConfig.links.mainSite}>Ir a ByteShark</CTAButton>
            <CTAButton href={siteConfig.contact.whatsappUrl} variant="secondary">
              Contactar
            </CTAButton>
          </div>
        </div>
      </header>

      <main>
        <section className="catalog-gallery-shell pt-12 sm:pt-14">
          <div className="section-shell">
            <div className="catalog-gallery-intro">
              <div>
                <span className="eyebrow">Galeria de demos</span>
                <h1 className="mt-5 max-w-3xl font-headline text-[clamp(2.7rem,8vw,4.5rem)] font-bold leading-[0.94] tracking-tight text-on-surface">
                  Demos listas para explorar, sin rodeos.
                </h1>
              </div>
              <div className="catalog-gallery-intro__aside">
                <p className="section-copy max-w-xl">
                  Cada tarjeta refleja mejor la identidad visual de su demo. Entra directo a la
                  propuesta que quieras revisar.
                </p>
                <CTAButton href={siteConfig.contact.whatsappUrl} variant="secondary">
                  Hablar con ByteShark
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="scroll-mt-28 py-14 sm:py-16">
          <div className="section-shell">
            <div className="catalog-gallery-grid">
              {demos.map((demo) => (
                <DemoCard key={demo.slug} demo={demo} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="section-shell">
            <div className="catalog-note-panel text-sm leading-7 text-on-surface-variant">
              {siteConfig.catalog.ethicalNote}
            </div>
          </div>
        </section>
      </main>

      <a
        aria-label="Abrir WhatsApp de ByteShark"
        className="floating-whatsapp"
        href={siteConfig.contact.whatsappUrl}
        rel="noreferrer"
        target="_blank"
        title="Abrir WhatsApp de ByteShark"
      >
        <span className="floating-whatsapp__icon" aria-hidden="true">
          <svg
            className="h-5 w-5"
            fill="none"
            focusable="false"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.22a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
        <span className="floating-whatsapp__label">WhatsApp</span>
      </a>
    </div>
  );
}
