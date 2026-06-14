import { CTAButton } from './CTAButton.jsx';

export function DemoCard({ demo }) {
  return (
    <article className="catalog-card h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="signal-chip">{demo.category}</span>
          <h3 className="mt-5 text-2xl font-bold text-on-surface">{demo.name}</h3>
        </div>
        <div
          aria-hidden="true"
          className="h-16 w-16 rounded-3xl border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${demo.accent.from}, ${demo.accent.to})`,
            boxShadow: `0 12px 36px ${demo.accent.halo}`,
          }}
        />
      </div>
      <p className="mt-4 text-sm leading-7 text-on-surface-variant">{demo.problem}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {demo.highlights.map((item) => (
          <span key={item} className="signal-chip">
            {item}
          </span>
        ))}
      </div>
      <CTAButton className="mt-8 w-full" href={demo.path}>
        {demo.ctaLabel}
      </CTAButton>
    </article>
  );
}

