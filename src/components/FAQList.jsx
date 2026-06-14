export function FAQList({ items }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.question} className="faq-item group">
          <summary className="cursor-pointer list-none text-lg font-semibold text-on-surface">
            {item.question}
          </summary>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

