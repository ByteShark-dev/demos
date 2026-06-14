export function TestimonialGrid({ items }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <article key={`${item.author}-${item.quote}`} className="surface-card">
          {item.label ? <span className="signal-chip">{item.label}</span> : null}
          <p className={`text-base leading-8 text-on-surface ${item.label ? 'mt-4' : ''}`.trim()}>
            "{item.quote}"
          </p>
          <p className="mt-6 font-label text-xs uppercase tracking-[0.2em] text-secondary">
            {item.author}
          </p>
        </article>
      ))}
    </div>
  );
}
