export function GalleryStrip({ items }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.title} className="surface-card overflow-hidden p-0">
          <div className="visual-stage">
            <span className="signal-chip">Visual {index + 1}</span>
            <div className="visual-stage__frame" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-on-surface">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.caption}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

