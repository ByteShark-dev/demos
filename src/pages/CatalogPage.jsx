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
        <section className="relative overflow-hidden pt-14 sm:pt-20">
          <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-[0.18]" />
          <div aria-hidden="true" className="absolute left-1/2 top-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full radial-ring blur-3xl" />
          <div className="section-shell relative grid gap-12 pb-20 pt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
            <div className="space-y-7">
              <span className="eyebrow">Catalogo de ejemplos adaptables</span>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-headline text-[clamp(3rem,10vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-on-surface">
                  {siteConfig.catalog.title}
                </h1>
                <p className="text-lg font-semibold text-primary-container">{siteConfig.catalog.subtitle}</p>
                <p className="max-w-2xl text-lg leading-8 text-on-surface-variant">
                  {siteConfig.catalog.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="#catalogo">Explorar demos</CTAButton>
                <CTAButton href={siteConfig.contact.whatsappUrl} variant="secondary">
                  Hablar con ByteShark
                </CTAButton>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="metric-card">
                  <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary">Formato</p>
                  <p className="mt-2 text-lg font-semibold text-on-surface">Catalogo + rutas internas</p>
                </div>
                <div className="metric-card">
                  <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary">Objetivo</p>
                  <p className="mt-2 text-lg font-semibold text-on-surface">Mostrar ideas listas para adaptar</p>
                </div>
                <div className="metric-card">
                  <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary">Canal</p>
                  <p className="mt-2 text-lg font-semibold text-on-surface">Contacto por WhatsApp</p>
                </div>
              </div>
            </div>

            <aside className="glass-panel rounded-[28px] border border-outline-variant/30 p-6 shadow-panel">
              <p className="font-label text-xs uppercase tracking-[0.22em] text-secondary">
                Demos iniciales
              </p>
              <div className="mt-5 grid gap-4">
                {demos.map((demo) => (
                  <div key={demo.slug} className="surface-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{demo.name}</p>
                        <p className="mt-2 text-sm text-on-surface-variant">{demo.category}</p>
                      </div>
                      <div
                        aria-hidden="true"
                        className="h-12 w-12 rounded-2xl border border-white/10"
                        style={{
                          background: `linear-gradient(135deg, ${demo.accent.from}, ${demo.accent.to})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="catalogo" className="scroll-mt-28 py-24 sm:py-28">
          <div className="section-shell">
            <SectionTitle
              description="Cada tarjeta resume el tipo de negocio, el problema comercial que aborda y las funciones que ya incluye la base."
              eyebrow="Grid de demos"
              title="Explora rutas listas para presentar a clientes"
            />
            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              {demos.map((demo) => (
                <DemoCard key={demo.slug} demo={demo} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-10">
          <div className="section-shell">
            <div className="rounded-[28px] border border-outline-variant/30 bg-surface-container-low/70 p-6 text-sm leading-7 text-on-surface-variant shadow-panel">
              {siteConfig.catalog.ethicalNote}
            </div>
          </div>
        </section>

        <section className="pb-24 pt-10 sm:pb-28">
          <div className="section-shell">
            <div className="glass-panel rounded-[32px] border border-outline-variant/30 p-8 shadow-panel sm:p-10">
              <SectionTitle
                align="center"
                className="max-w-3xl"
                description="Podemos usar una de estas bases como punto de partida y personalizarla para el giro, tono y objetivos de tu negocio."
                eyebrow="CTA final"
                title={siteConfig.catalog.finalTitle}
              />
              <div className="mt-8 flex justify-center">
                <CTAButton href={siteConfig.contact.whatsappUrl}>
                  {siteConfig.catalog.finalCta}
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href={siteConfig.contact.whatsappUrl} rel="noreferrer" target="_blank">
        WhatsApp
      </a>
    </div>
  );
}

