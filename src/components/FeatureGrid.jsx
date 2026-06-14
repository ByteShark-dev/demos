export function FeatureGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="surface-card">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-on-surface">{item.title}</h3>
            {item.meta ? <span className="signal-chip">{item.meta}</span> : null}
          </div>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

