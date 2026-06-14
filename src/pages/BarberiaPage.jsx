import { useState } from 'react';

import { CTAButton } from '../components/CTAButton.jsx';
import { DemoHeaderBar } from '../components/DemoHeaderBar.jsx';
import { getDemoBySlug } from '../config/demos.js';
import { buildWhatsAppUrl, getDemoWhatsAppUrl } from '../config/site.js';

function buildBookingMessage(demo, formData) {
  return [
    `Hola, quiero solicitar una cita en ${demo.businessName}.`,
    `Nombre: ${formData.name || 'Pendiente'}`,
    `Telefono: ${formData.phone || 'Pendiente'}`,
    `Servicio: ${formData.service || 'Pendiente'}`,
    `Fecha: ${formData.date || 'Pendiente'}`,
    `Hora: ${formData.time || 'Pendiente'}`,
    `Comentarios: ${formData.comments || 'Sin comentarios adicionales.'}`,
  ].join('\n');
}

function buildServiceMessage(demo, serviceTitle) {
  return `Hola, quiero agendar ${serviceTitle} en ${demo.businessName}.`;
}

function buildProductMessage(demo, productTitle) {
  return `Hola, quiero informacion sobre ${productTitle} en ${demo.businessName}.`;
}

function renderHeroTitle(title) {
  const accentText = 'experiencia premium';

  if (!title.includes(accentText)) {
    return title;
  }

  const [before, after] = title.split(accentText);

  return (
    <>
      {before}
      <span className="barber-accent-text">{accentText}</span>
      {after}
    </>
  );
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function BarberiaPage() {
  const demo = getDemoBySlug('barberia');
  const whatsappHref = getDemoWhatsAppUrl(demo);
  const bookingDefaults = {
    name: '',
    phone: '',
    service: demo.sections.services.items[1]?.title ?? demo.sections.services.items[0]?.title ?? '',
    date: '',
    time: '',
    comments: '',
  };
  const [formData, setFormData] = useState(bookingDefaults);
  const [confirmation, setConfirmation] = useState('');
  const bookingHref = buildWhatsAppUrl({
    phone: demo.contact.whatsapp.phone,
    message: buildBookingMessage(demo, formData),
  });
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.sections.location.zone)}`;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.open(bookingHref, '_blank', 'noopener,noreferrer');
    setConfirmation(
      'Solicitud demo preparada. Se abrira WhatsApp con los datos de la cita para continuar el flujo.',
    );
  }

  return (
    <div className="barber-demo min-h-screen">
      <DemoHeaderBar
        primaryAction={{ label: 'Agendar por WhatsApp', href: whatsappHref, external: true }}
        secondaryAction={{ label: 'Volver al catalogo', href: '/' }}
        tone="dark"
      />

      <main>
        <section className="barber-hero relative overflow-hidden">
          <div aria-hidden="true" className="barber-hero__backdrop absolute inset-0" />
          <div className="section-shell relative grid gap-14 py-16 sm:py-20 lg:min-h-[calc(100vh-88px)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center lg:py-24">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-4">
                <p className="barber-kicker">{demo.businessName}</p>
                <div className="flex flex-wrap gap-3">
                  {demo.hero.badges.map((badge) => (
                    <span key={badge} className="barber-chip">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="barber-display">{renderHeroTitle(demo.hero.title)}</h1>
                <p className="barber-lead max-w-2xl">{demo.hero.description}</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <CTAButton href="#agenda">Agendar cita</CTAButton>
                <CTAButton external href={whatsappHref} variant="secondary">
                  Agendar por WhatsApp
                </CTAButton>
              </div>
            </div>

            <aside className="barber-hero-stage">
              <div className="barber-hero-stage__crest">
                <div className="barber-hero-stage__crest-ring">
                  <div className="barber-hero-stage__crest-core">
                    <p className="barber-hero-stage__crest-mark">G&amp;G</p>
                    <p className="barber-hero-stage__crest-copy">Barber Studio</p>
                  </div>
                </div>
              </div>

              <div className="barber-hero-stage__copy">
                <p className="barber-kicker text-[11px]">Modern heritage</p>
                <p className="barber-stage-copy">
                  Una landing premium pensada para mostrar servicios, vender productos, presentar
                  al equipo y facilitar citas desde una experiencia mas seria y cuidada.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {demo.hero.metrics.map((metric) => (
                  <article key={metric.label} className="barber-metric-card">
                    <p className="barber-metric-card__label">{metric.label}</p>
                    <p className="barber-metric-card__value">{metric.value}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="servicios" className="barber-section">
          <div className="section-shell">
            <div className="barber-section-heading text-center">
              <p className="barber-kicker">{demo.sections.services.eyebrow}</p>
              <h2 className="barber-heading mt-4">{demo.sections.services.title}</h2>
              <div className="barber-divider mx-auto mt-6" />
              <p className="barber-subheading mx-auto mt-6 max-w-3xl">
                {demo.sections.services.description}
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {demo.sections.services.items.map((service) => (
                <article key={service.title} className="barber-menu-card">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="barber-card-title">{service.title}</h3>
                    <span className="barber-price">{service.price}</span>
                  </div>
                  <p className="barber-meta mt-2">{service.duration}</p>
                  <p className="barber-copy mt-5">{service.description}</p>
                  <div className="mt-8">
                    <CTAButton
                      external
                      href={buildWhatsAppUrl({
                        phone: demo.contact.whatsapp.phone,
                        message: buildServiceMessage(demo, service.title),
                      })}
                      variant="secondary"
                    >
                      Agendar
                    </CTAButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agenda" className="barber-section barber-section--alt">
          <div className="section-shell">
            <div className="barber-booking-panel mx-auto max-w-5xl">
              <div className="barber-section-heading text-center">
                <p className="barber-kicker">{demo.sections.booking.eyebrow}</p>
                <h2 className="barber-heading mt-4">{demo.sections.booking.title}</h2>
                <p className="barber-subheading mx-auto mt-6 max-w-3xl">
                  {demo.sections.booking.description}
                </p>
              </div>

              <form className="mt-12 grid gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="barber-label" htmlFor="booking-name">
                    Nombre
                  </label>
                  <input
                    className="barber-input"
                    id="booking-name"
                    name="name"
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    type="text"
                    value={formData.name}
                  />
                </div>

                <div className="space-y-2">
                  <label className="barber-label" htmlFor="booking-phone">
                    Telefono
                  </label>
                  <input
                    className="barber-input"
                    id="booking-phone"
                    name="phone"
                    onChange={handleChange}
                    placeholder="+52"
                    type="tel"
                    value={formData.phone}
                  />
                </div>

                <div className="space-y-2">
                  <label className="barber-label" htmlFor="booking-service">
                    Servicio
                  </label>
                  <select
                    className="barber-input"
                    id="booking-service"
                    name="service"
                    onChange={handleChange}
                    value={formData.service}
                  >
                    {demo.sections.services.items.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="barber-label" htmlFor="booking-date">
                      Fecha
                    </label>
                    <input
                      className="barber-input"
                      id="booking-date"
                      name="date"
                      onChange={handleChange}
                      type="date"
                      value={formData.date}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="barber-label" htmlFor="booking-time">
                      Hora
                    </label>
                    <input
                      className="barber-input"
                      id="booking-time"
                      name="time"
                      onChange={handleChange}
                      type="time"
                      value={formData.time}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="barber-label" htmlFor="booking-comments">
                    Comentarios
                  </label>
                  <textarea
                    className="barber-input min-h-[112px] resize-none"
                    id="booking-comments"
                    name="comments"
                    onChange={handleChange}
                    placeholder="Preferencias de estilo, detalle de barba o comentario adicional."
                    value={formData.comments}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button className="cta-primary w-full justify-center sm:w-auto" type="submit">
                      {demo.sections.booking.submitLabel}
                    </button>
                    <CTAButton external href={bookingHref} variant="secondary">
                      {demo.sections.booking.whatsappLabel}
                    </CTAButton>
                  </div>
                  <p className="barber-subheading mt-5 max-w-2xl">{demo.sections.booking.note}</p>
                  {confirmation ? (
                    <p className="mt-4 text-sm font-medium text-[#dec29f]">{confirmation}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="equipo" className="barber-section">
          <div className="section-shell">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="barber-kicker">{demo.sections.team.eyebrow}</p>
                <h2 className="barber-heading mt-4">{demo.sections.team.title}</h2>
                <p className="barber-subheading mt-6">{demo.sections.team.description}</p>
              </div>
              <div className="barber-kicker text-left md:text-right">Artesanos del estilo</div>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {demo.sections.team.items.map((member) => (
                <article key={member.title} className="barber-profile-card">
                  <div className="barber-portrait-shell">
                    <div className="barber-portrait">
                      <span>{getInitials(member.title)}</span>
                    </div>
                  </div>
                  <p className="barber-kicker mt-6 text-[11px]">{member.badge}</p>
                  <h3 className="barber-card-title mt-3">{member.title}</h3>
                  <p className="barber-meta mt-2">{member.role}</p>
                  <p className="barber-copy mt-4">{member.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="barber-section barber-section--alt">
          <div className="section-shell">
            <div className="barber-section-heading text-center">
              <p className="barber-kicker">{demo.sections.products.eyebrow}</p>
              <h2 className="barber-heading mt-4">{demo.sections.products.title}</h2>
              <p className="barber-subheading mx-auto mt-6 max-w-3xl">
                {demo.sections.products.description}
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {demo.sections.products.items.map((product, index) => (
                <article key={product.title} className="barber-product-card">
                  <div className="barber-product-visual">
                    <span>{`P0${index + 1}`.slice(-3)}</span>
                  </div>
                  <h3 className="barber-card-title mt-6">{product.title}</h3>
                  <p className="barber-price mt-2">{product.price}</p>
                  <p className="barber-copy mt-4">{product.description}</p>
                  <div className="mt-8">
                    <CTAButton
                      external
                      href={buildWhatsAppUrl({
                        phone: demo.contact.whatsapp.phone,
                        message: buildProductMessage(demo, product.title),
                      })}
                      variant="secondary"
                    >
                      Consultar
                    </CTAButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="barber-section">
          <div className="section-shell">
            <div className="barber-section-heading text-center">
              <p className="barber-kicker">{demo.sections.gallery.eyebrow}</p>
              <h2 className="barber-heading mt-4">{demo.sections.gallery.title}</h2>
              <p className="barber-subheading mx-auto mt-6 max-w-3xl">
                {demo.sections.gallery.description}
              </p>
            </div>

            <div className="barber-gallery-grid mt-16">
              {demo.sections.gallery.items.map((item, index) => (
                <article
                  key={item.title}
                  className={`barber-gallery-card barber-gallery-card--${item.tone} ${index === 0 ? 'barber-gallery-card--feature' : ''}`.trim()}
                >
                  <div className="barber-gallery-card__overlay">
                    <p className="barber-kicker text-[11px]">Placeholder visual</p>
                    <h3 className="barber-card-title mt-3">{item.title}</h3>
                    <p className="barber-copy mt-4 max-w-sm">{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="barber-section barber-section--soft">
          <div className="section-shell">
            <div className="barber-section-heading text-center">
              <p className="barber-kicker">{demo.sections.socials.eyebrow}</p>
              <h2 className="barber-heading mt-4">{demo.sections.socials.title}</h2>
              <p className="barber-subheading mx-auto mt-6 max-w-3xl">
                {demo.sections.socials.description}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {demo.sections.socials.items.map((item) => {
                const isWhatsApp = item.label === 'WhatsApp';

                return (
                  <CTAButton
                    key={item.label}
                    external={isWhatsApp}
                    href={isWhatsApp ? whatsappHref : item.href}
                    variant="secondary"
                  >
                    {item.label}
                  </CTAButton>
                );
              })}
            </div>
          </div>
        </section>

        <section className="barber-section barber-section--alt">
          <div className="section-shell text-center">
            <p className="barber-kicker">{demo.sections.testimonials.eyebrow}</p>
            <h2 className="barber-heading mt-4">{demo.sections.testimonials.title}</h2>
            <p className="barber-subheading mx-auto mt-6 max-w-3xl">
              {demo.sections.testimonials.description}
            </p>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {demo.sections.testimonials.items.map((item) => (
                <article key={item.author} className="barber-quote-card">
                  <span className="barber-chip">{item.label}</span>
                  <p className="barber-quote mt-6">"{item.quote}"</p>
                  <p className="barber-meta mt-6">{item.author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="barber-section">
          <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="space-y-8">
              <div>
                <p className="barber-kicker">{demo.sections.location.eyebrow}</p>
                <h2 className="barber-heading mt-4">{demo.sections.location.title}</h2>
                <p className="barber-subheading mt-6 max-w-2xl">
                  {demo.sections.location.description}
                </p>
              </div>

              <div>
                <p className="barber-card-title">{demo.sections.location.zone}</p>
              </div>

              <div className="barber-hours-panel">
                {demo.sections.location.hours.map((item) => (
                  <div key={item.label} className="barber-hours-row">
                    <span className="barber-meta">{item.label}</span>
                    <span className="barber-copy text-right text-[#f9f7f2]">{item.value}</span>
                  </div>
                ))}
              </div>

              <CTAButton external href={mapHref} variant="secondary">
                {demo.sections.location.ctaLabel}
              </CTAButton>
            </div>

            <div className="barber-map-card">
              <div className="barber-map-card__pin">+</div>
              <p className="barber-kicker text-[11px]">Mapa demo</p>
              <p className="barber-card-title mt-4">{demo.sections.location.mapLabel}</p>
              <p className="barber-subheading mt-4">
                Espacio para integrar Google Maps, referencias de zona y CTA de como llegar.
              </p>
            </div>
          </div>
        </section>

        <section className="barber-section pt-0">
          <div className="section-shell">
            <div className="barber-final-cta">
              <p className="barber-kicker">CTA final</p>
              <h2 className="barber-heading mt-4">{demo.sections.closing.title}</h2>
              <p className="barber-subheading mx-auto mt-6 max-w-2xl">
                {demo.sections.closing.description}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <CTAButton href="#agenda">{demo.sections.closing.primaryLabel}</CTAButton>
                <CTAButton external href={whatsappHref} variant="secondary">
                  {demo.sections.closing.secondaryLabel}
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="barber-footer">
        <div className="section-shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.7fr)]">
          <div className="space-y-5">
            <p className="barber-kicker">{demo.footer.creatorLabel}</p>
            <h2 className="barber-card-title text-[2rem]">{demo.footer.brandName}</h2>
            <p className="barber-subheading max-w-md">{demo.footer.summary}</p>
            <p className="text-sm leading-7 text-[rgba(217,193,193,0.82)]">{demo.footer.note}</p>
          </div>

          <div className="space-y-5">
            <p className="barber-kicker">Servicios principales</p>
            <ul className="space-y-3">
              {demo.sections.services.items.slice(0, 4).map((service) => (
                <li key={service.title} className="barber-copy text-[rgba(249,247,242,0.84)]">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <p className="barber-kicker">Redes sociales</p>
            <ul className="space-y-3">
              {demo.sections.socials.items.map((item) => (
                <li key={item.label}>
                  <a
                    className="barber-copy text-[rgba(249,247,242,0.84)] transition-colors hover:text-[#dec29f]"
                    href={item.label === 'WhatsApp' ? whatsappHref : item.href}
                    rel={item.label === 'WhatsApp' ? 'noreferrer' : undefined}
                    target={item.label === 'WhatsApp' ? '_blank' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
