export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignmentClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`space-y-5 ${alignmentClass} ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}

