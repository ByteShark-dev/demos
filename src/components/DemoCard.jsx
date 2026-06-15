import { CTAButton } from './CTAButton.jsx';

function renderPreview(demo) {
  if (demo.slug === 'barberia') {
    return (
      <div className="catalog-preview__barber">
        <div className="catalog-preview__barber-mark">G&G</div>
        <p className="catalog-preview__barber-copy">Barber Studio</p>
      </div>
    );
  }

  if (demo.slug === 'cafe-restaurante') {
    return (
      <div className="catalog-preview__cafe">
        <p className="catalog-preview__cafe-wordmark">Bruma</p>
        <p className="catalog-preview__cafe-copy">Cafe & Cocina</p>
      </div>
    );
  }

  if (demo.slug === 'salud-profesional') {
    return (
      <div className="catalog-preview__health">
        <div className="catalog-preview__health-mark">CBI</div>
        <p className="catalog-preview__health-copy">Bienestar Integral</p>
      </div>
    );
  }

  return (
    <div className="catalog-preview__accounting">
      <div className="catalog-preview__accounting-bars" />
      <p className="catalog-preview__accounting-copy">Despacho Fiscal</p>
    </div>
  );
}

export function DemoCard({ demo }) {
  return (
    <article
      className={`catalog-card catalog-card--poster catalog-card--${demo.slug} h-full`}
      style={{
        '--demo-from': demo.accent.from,
        '--demo-to': demo.accent.to,
        '--demo-halo': demo.accent.halo,
      }}
    >
      <div className="catalog-card__preview">{renderPreview(demo)}</div>

      <div className="catalog-card__body">
        <div className="catalog-card__header">
          <span className="catalog-card__category">{demo.category}</span>
          <h3 className="catalog-card__title">{demo.name}</h3>
        </div>

        <p className="catalog-card__problem">{demo.problem}</p>

        <div className="catalog-card__tags">
          {demo.highlights.slice(0, 3).map((item) => (
            <span key={item} className="catalog-card__tag">
              {item}
            </span>
          ))}
        </div>

        <CTAButton className="mt-auto w-full" href={demo.path}>
          Abrir demo
        </CTAButton>
      </div>
    </article>
  );
}
