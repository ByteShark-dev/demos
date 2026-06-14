import { CTAButton } from './CTAButton.jsx';
import { siteConfig, getDemoWhatsAppUrl } from '../config/site.js';

export function DemoLayout({ demo, children }) {
  const accentStyle = {
    '--accent-from': demo.accent.from,
    '--accent-to': demo.accent.to,
    '--accent-halo': demo.accent.halo,
    '--accent-surface': demo.accent.surface,
  };

  return (
    <div className="page-surface min-h-screen" style={accentStyle}>
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
                Catalogo de demos
              </p>
            </div>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <CTAButton href="/">Volver al catalogo</CTAButton>
            <CTAButton href={getDemoWhatsAppUrl(demo.name)} variant="secondary">
              Quiero esta base
            </CTAButton>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-14 sm:pt-20">
          <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-[0.18]" />
          <div aria-hidden="true" className="absolute left-1/2 top-8 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full radial-ring blur-3xl" />
          <div className="section-shell relative grid gap-12 pb-16 pt-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
            <div className="space-y-7">
              <span className="eyebrow">{demo.hero.eyebrow}</span>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-headline text-[clamp(2.8rem,9vw,4.9rem)] font-bold leading-[0.95] tracking-tight text-on-surface">
                  {demo.hero.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">
                  {demo.hero.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <CTAButton href={getDemoWhatsAppUrl(demo.name)}>
                  Adaptar para mi negocio
                </CTAButton>
                <CTAButton href="/" variant="secondary">
                  Ver mas demos
                </CTAButton>
              </div>
              <div className="flex flex-wrap gap-3">
                {demo.highlights.map((item) => (
                  <span key={item} className="signal-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="glass-panel rounded-[28px] border border-outline-variant/30 p-6 shadow-panel">
              <div
                aria-hidden="true"
                className="mb-6 h-1 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${demo.accent.from}, ${demo.accent.to})`,
                }}
              />
              <p className="font-label text-xs uppercase tracking-[0.22em] text-secondary">Demo adaptable</p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">{demo.name}</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                Ejemplo conceptual conectado a la estetica de ByteShark, pero enfocado como
                negocio independiente.
              </p>
              <div className="mt-8 grid gap-4">
                {demo.hero.metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-on-surface">{metric.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {children}
      </main>

      <footer className="border-t border-outline-variant/20 bg-surface-container-lowest/80 py-12">
        <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-headline text-xl font-bold text-on-surface">{siteConfig.brand.name}</p>
            <p className="mt-2 text-sm text-on-surface-variant">{siteConfig.brand.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={siteConfig.links.mainSite}>Ir a ByteShark</CTAButton>
            <CTAButton href={siteConfig.links.catalog} variant="secondary">
              Catalogo completo
            </CTAButton>
          </div>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={getDemoWhatsAppUrl(demo.name)}
        rel="noreferrer"
        target="_blank"
      >
        WhatsApp
      </a>
    </div>
  );
}

