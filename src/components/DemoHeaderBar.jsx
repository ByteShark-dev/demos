import { CTAButton } from './CTAButton.jsx';
import { siteConfig } from '../config/site.js';

export function DemoHeaderBar({
  primaryAction,
  secondaryAction,
  tone = 'default',
  logoTone,
  className = '',
}) {
  const resolvedPrimaryAction = primaryAction ?? {
    label: 'Adaptar para mi negocio',
    href: siteConfig.links.catalog,
  };
  const resolvedSecondaryAction = secondaryAction ?? {
    label: 'Volver al catalogo',
    href: '/',
  };
  const resolvedLogoTone = logoTone ?? (tone === 'warm' ? 'dark' : 'light');
  const logoUrl =
    resolvedLogoTone === 'dark' ? siteConfig.brand.logoDarkUrl : siteConfig.brand.logoUrl;

  return (
    <header className={`demo-header-bar demo-header-bar--${tone} sticky top-0 z-50 ${className}`.trim()}>
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <a
          className="demo-header-bar__brand flex min-w-0 items-center gap-3"
          href={siteConfig.links.mainSite}
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="ByteShark"
            className="h-10 w-10 object-contain"
            height="40"
            src={logoUrl}
            width="40"
          />
          <div className="min-w-0">
            <p className="demo-header-bar__title font-headline text-lg font-bold tracking-tight">
              {siteConfig.brand.name}
            </p>
            <p className="demo-header-bar__subtitle text-xs uppercase tracking-[0.18em]">
              Catalogo de demos
            </p>
          </div>
        </a>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <CTAButton
            external={resolvedSecondaryAction.external}
            href={resolvedSecondaryAction.href}
          >
            {resolvedSecondaryAction.label}
          </CTAButton>
          <CTAButton
            className={resolvedPrimaryAction.className ?? ''}
            external={resolvedPrimaryAction.external}
            href={resolvedPrimaryAction.href}
            variant={resolvedPrimaryAction.variant ?? 'secondary'}
          >
            {resolvedPrimaryAction.label}
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
