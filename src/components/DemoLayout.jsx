import { CTAButton } from './CTAButton.jsx';
import { siteConfig, getDemoWhatsAppUrl } from '../config/site.js';

export function DemoLayout({
  demo,
  children,
  themeVariant = demo.themeVariant ?? 'default',
  heroActions,
  footerOverride,
}) {
  const isWarm = themeVariant === 'warm';
  const accentStyle = {
    '--accent-from': demo.accent.from,
    '--accent-to': demo.accent.to,
    '--accent-halo': demo.accent.halo,
    '--accent-surface': demo.accent.surface,
  };
  const defaultHeroActions = {
    primary: {
      label: 'Adaptar para mi negocio',
      href: getDemoWhatsAppUrl(demo),
    },
    secondary: {
      label: 'Ver mas demos',
      href: '/',
      variant: 'secondary',
    },
  };
  const resolvedHeroActions = {
    ...defaultHeroActions,
    ...heroActions,
    primary: {
      ...defaultHeroActions.primary,
      ...heroActions?.primary,
    },
    secondary: {
      ...defaultHeroActions.secondary,
      ...heroActions?.secondary,
    },
  };
  const resolvedFooter = footerOverride
    ? {
        actions: [
          { label: 'Ir a ByteShark', href: siteConfig.links.mainSite },
          { label: 'Volver al catalogo', href: '/', variant: 'secondary' },
        ],
        ...footerOverride,
      }
    : null;
  const heroCardTitle = demo.businessName ?? demo.name;
  const heroCardLabel = demo.hero.cardLabel ?? 'Demo adaptable';
  const heroCardCopy =
    demo.hero.cardCopy ??
    'Ejemplo conceptual conectado a la estetica de ByteShark, pero enfocado como negocio independiente.';
  const floatingWhatsAppLabel = `Abrir WhatsApp de ${heroCardTitle}`;

  return (
    <div
      className={`page-surface min-h-screen ${isWarm ? 'page-surface--warm' : ''}`.trim()}
      style={accentStyle}
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
                Catalogo de demos
              </p>
            </div>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <CTAButton href="/">Volver al catalogo</CTAButton>
            <CTAButton
              external={resolvedHeroActions.primary.external}
              href={resolvedHeroActions.primary.href}
              variant="secondary"
            >
              {resolvedHeroActions.primary.label}
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
                <CTAButton
                  external={resolvedHeroActions.primary.external}
                  href={resolvedHeroActions.primary.href}
                >
                  {resolvedHeroActions.primary.label}
                </CTAButton>
                <CTAButton
                  external={resolvedHeroActions.secondary.external}
                  href={resolvedHeroActions.secondary.href}
                  variant={resolvedHeroActions.secondary.variant ?? 'secondary'}
                >
                  {resolvedHeroActions.secondary.label}
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
              <p className="font-label text-xs uppercase tracking-[0.22em] text-secondary">
                {heroCardLabel}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-on-surface">{heroCardTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                {heroCardCopy}
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
          {resolvedFooter ? (
            <>
              <div>
                <p className="font-headline text-xl font-bold text-on-surface">
                  {resolvedFooter.brandName}
                </p>
                {resolvedFooter.summary ? (
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-on-surface-variant">
                    {resolvedFooter.summary}
                  </p>
                ) : null}
                {resolvedFooter.creatorLabel ? (
                  <p className="mt-3 text-sm font-semibold text-on-surface">
                    {resolvedFooter.creatorLabel}
                  </p>
                ) : null}
                {resolvedFooter.note ? (
                  <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                    {resolvedFooter.note}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {resolvedFooter.actions.map((action, index) => (
                  <CTAButton
                    key={`${action.label}-${index}`}
                    external={action.external}
                    href={action.href}
                    variant={action.variant ?? (index === 0 ? 'primary' : 'secondary')}
                  >
                    {action.label}
                  </CTAButton>
                ))}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </footer>

      <a
        aria-label={floatingWhatsAppLabel}
        className="floating-whatsapp"
        href={getDemoWhatsAppUrl(demo)}
        rel="noreferrer"
        target="_blank"
        title={floatingWhatsAppLabel}
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
