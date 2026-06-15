import { useEffect, useState } from 'react';

import { DemoHeaderBar } from '../components/DemoHeaderBar.jsx';
import { getDemoBySlug } from '../config/demos.js';
import { buildWhatsAppUrl, getDemoWhatsAppUrl } from '../config/site.js';
import '../styles/barberia.css';

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

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const logoSrc = `${import.meta.env.BASE_URL}brand/g-g-barber-studio-logo.png`;
const navItems = [
  { label: 'Services', href: '#servicios' },
  { label: 'Team', href: '#equipo' },
  { label: 'Booking', href: '#booking' },
];
const serviceTones = ['classic', 'premium', 'beard', 'combo', 'detail', 'complete'];
const productKinds = ['jar', 'dropper', 'bottle', 'tin'];
const socialIcons = {
  Instagram: 'IG',
  Facebook: 'FB',
  TikTok: 'TT',
  WhatsApp: 'WA',
};

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
  const [isNavCondensed, setIsNavCondensed] = useState(false);
  const bookingHref = buildWhatsAppUrl({
    phone: demo.contact.whatsapp.phone,
    message: buildBookingMessage(demo, formData),
  });
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.sections.location.zone)}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsNavCondensed(window.scrollY > 72);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.barber-demo [data-reveal]'));

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

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
        primaryAction={{ label: 'Adaptar esta demo', href: whatsappHref, external: true }}
        secondaryAction={{ label: 'Volver al catalogo', href: '/' }}
        tone="dark"
      />

      <div className="barber-demo__landing">
        <nav className={`barber-demo__nav ${isNavCondensed ? 'is-condensed' : ''}`}>
          <div className="barber-demo__container barber-demo__nav-inner">
            <a className="barber-demo__brand" href="#inicio">
              <img alt="Logo de G&G Barber Studio" src={logoSrc} />
              <div>
                <p className="barber-demo__brand-title">{demo.businessName}</p>
                <p className="barber-demo__brand-subtitle">Modern heritage</p>
              </div>
            </a>

            <div className="barber-demo__nav-links" aria-label="Secciones de la landing">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="barber-demo__nav-cta">
              <a className="barber-demo__ghost-link" href={whatsappHref} rel="noreferrer" target="_blank">
                WhatsApp
              </a>
              <a className="barber-demo__button barber-demo__button--primary" href="#booking">
                Agendar cita
              </a>
            </div>
          </div>
        </nav>

        <main>
          <header id="inicio" className="barber-demo__hero">
            <div aria-hidden="true" className="barber-demo__hero-backdrop" />
            <div className="barber-demo__container barber-demo__hero-inner">
              <div className="barber-demo__hero-copy" data-reveal>
                <div className="barber-demo__badge-row">
                  {demo.hero.badges.map((badge) => (
                    <span key={badge} className="barber-demo__badge">
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="barber-demo__eyebrow">
                  Tu proximo corte
                  <br />
                  empieza con una
                  <br />
                  <span className="barber-demo__eyebrow-accent">experiencia premium</span>
                </h1>

                <p className="barber-demo__lead">{demo.hero.description}</p>

                <div className="barber-demo__hero-actions">
                  <a className="barber-demo__button barber-demo__button--primary" href="#booking">
                    Agendar cita
                  </a>
                  <a
                    className="barber-demo__button barber-demo__button--secondary"
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Agendar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </header>

          <section id="servicios" className="barber-demo__section">
            <div className="barber-demo__container">
              <div className="barber-demo__section-head barber-demo__section-head--center" data-reveal>
                <p className="barber-demo__section-label">Nuestros servicios</p>
                <h2 className="barber-demo__title">Nuestros Servicios</h2>
                <div className="barber-demo__divider barber-demo__divider--center" />
                <p className="barber-demo__copy">Excelencia en cada detalle</p>
              </div>

              <div className="barber-demo__services-grid">
                {demo.sections.services.items.map((service, index) => (
                  <article key={service.title} className="barber-demo__service-card" data-reveal>
                    <div className="barber-demo__visual barber-demo__service-visual" data-tone={serviceTones[index]}>
                      <div className="barber-demo__visual-copy">
                        <strong>{service.title}</strong>
                        <span>{service.price.replace('$', '')}</span>
                      </div>
                    </div>

                    <div className="barber-demo__service-header">
                      <h3 className="barber-demo__card-title">{service.title}</h3>
                      <p className="barber-demo__price">{service.price}</p>
                    </div>

                    <p className="barber-demo__meta">{service.duration}</p>
                    <p className="barber-demo__copy barber-demo__service-summary">{service.description}</p>
                    <a
                      className="barber-demo__service-link"
                      href={buildWhatsAppUrl({
                        phone: demo.contact.whatsapp.phone,
                        message: `Hola, quiero agendar ${service.title} en ${demo.businessName}.`,
                      })}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Agendar
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="booking" className="barber-demo__section barber-demo__section--strong">
            <div className="barber-demo__container">
              <div className="barber-demo__booking-panel" data-reveal>
                <div className="barber-demo__section-head barber-demo__section-head--center">
                  <p className="barber-demo__section-label">Agenda de cita</p>
                  <h2 className="barber-demo__title">Agenda tu cita</h2>
                  <p className="barber-demo__copy">Reserva tu espacio y evita esperas innecesarias</p>
                </div>

                <form className="barber-demo__booking-form" onSubmit={handleSubmit}>
                  <div className="barber-demo__field">
                    <label className="barber-demo__meta" htmlFor="booking-name">
                      Nombre
                    </label>
                    <input
                      className="barber-demo__input"
                      id="booking-name"
                      name="name"
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      type="text"
                      value={formData.name}
                    />
                  </div>

                  <div className="barber-demo__field">
                    <label className="barber-demo__meta" htmlFor="booking-phone">
                      Telefono
                    </label>
                    <input
                      className="barber-demo__input"
                      id="booking-phone"
                      name="phone"
                      onChange={handleChange}
                      placeholder="+52"
                      type="tel"
                      value={formData.phone}
                    />
                  </div>

                  <div className="barber-demo__field">
                    <label className="barber-demo__meta" htmlFor="booking-service">
                      Servicio
                    </label>
                    <select
                      className="barber-demo__input"
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

                  <div className="barber-demo__field-row">
                    <div className="barber-demo__field">
                      <label className="barber-demo__meta" htmlFor="booking-date">
                        Fecha
                      </label>
                      <input
                        className="barber-demo__input"
                        id="booking-date"
                        name="date"
                        onChange={handleChange}
                        type="date"
                        value={formData.date}
                      />
                    </div>

                    <div className="barber-demo__field">
                      <label className="barber-demo__meta" htmlFor="booking-time">
                        Hora
                      </label>
                      <input
                        className="barber-demo__input"
                        id="booking-time"
                        name="time"
                        onChange={handleChange}
                        type="time"
                        value={formData.time}
                      />
                    </div>
                  </div>

                  <div className="barber-demo__field barber-demo__field--full">
                    <label className="barber-demo__meta" htmlFor="booking-comments">
                      Comentarios
                    </label>
                    <textarea
                      className="barber-demo__input"
                      id="booking-comments"
                      name="comments"
                      onChange={handleChange}
                      placeholder="Preferencias de estilo, detalle de barba o comentario adicional."
                      rows="2"
                      value={formData.comments}
                    />
                  </div>

                  <div className="barber-demo__booking-actions">
                    <button className="barber-demo__button barber-demo__button--primary w-full" type="submit">
                      Solicitar cita
                    </button>
                    <p className="barber-demo__booking-note">{demo.sections.booking.note}</p>
                    {confirmation ? (
                      <p className="barber-demo__booking-confirmation">{confirmation}</p>
                    ) : null}
                  </div>
                </form>

                <div className="barber-demo__booking-whatsapp">
                  <p className="barber-demo__copy">Tambien puedes agendar directamente por WhatsApp.</p>
                  <a
                    className="barber-demo__button barber-demo__button--secondary"
                    href={bookingHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Agendar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="equipo" className="barber-demo__section">
            <div className="barber-demo__container">
              <div className="barber-demo__section-head barber-demo__section-head--split" data-reveal>
                <div className="barber-demo__split-copy">
                  <p className="barber-demo__section-label">Conoce al equipo</p>
                  <h2 className="barber-demo__title">Conoce al equipo</h2>
                  <p className="barber-demo__copy">Maestros del detalle y la precision</p>
                </div>
                <div className="barber-demo__split-accent">
                  <span className="barber-demo__section-label">Artesanos del estilo</span>
                </div>
              </div>

              <div className="barber-demo__team-grid">
                {demo.sections.team.items.map((member) => (
                  <article key={member.title} className="barber-demo__team-card" data-reveal>
                    <div className="barber-demo__visual barber-demo__portrait">
                      <span className="barber-demo__portrait-mark">{getInitials(member.title)}</span>
                    </div>
                    <div>
                      <p className="barber-demo__meta">{member.badge}</p>
                      <h3 className="barber-demo__card-title">{member.title}</h3>
                      <p className="barber-demo__copy">{member.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="barber-demo__section barber-demo__section--muted">
            <div className="barber-demo__container">
              <div className="barber-demo__section-head barber-demo__section-head--center" data-reveal>
                <p className="barber-demo__section-label">Productos</p>
                <h2 className="barber-demo__title">Grooming Essentials</h2>
                <p className="barber-demo__copy">
                  Manten el estilo de barberia en casa con una seleccion demo alineada al look de Stitch.
                </p>
              </div>

              <div className="barber-demo__product-grid">
                {demo.sections.products.items.map((product, index) => (
                  <article key={product.title} className="barber-demo__product-card" data-reveal>
                    <div className="barber-demo__product-visual">
                      <span
                        className={`barber-demo__product-form barber-demo__product-form--${productKinds[index]}`}
                      />
                    </div>
                    <h3 className="barber-demo__card-title">{product.title}</h3>
                    <p className="barber-demo__price">{product.price}</p>
                    <a
                      className="barber-demo__button barber-demo__button--secondary"
                      href={buildWhatsAppUrl({
                        phone: demo.contact.whatsapp.phone,
                        message: `Hola, quiero informacion sobre ${product.title} en ${demo.businessName}.`,
                      })}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Consultar
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="barber-demo__section">
            <div className="barber-demo__container">
              <div className="barber-demo__section-head barber-demo__section-head--center" data-reveal>
                <p className="barber-demo__section-label">Galeria</p>
                <h2 className="barber-demo__title">Trabajos y ambiente</h2>
                <p className="barber-demo__copy">
                  La composicion replica el bento del export original usando placeholders propios.
                </p>
              </div>

              <div className="barber-demo__gallery">
                {demo.sections.gallery.items.map((item, index) => (
                  <article
                    key={item.title}
                    className={`barber-demo__visual barber-demo__gallery-item barber-demo__gallery-item--${item.tone} ${index === 0 ? 'barber-demo__gallery-item--feature' : ''}`.trim()}
                    data-reveal
                  >
                    <div className="barber-demo__gallery-overlay">
                      <p className="barber-demo__meta">Placeholder visual</p>
                      <h3 className="barber-demo__card-title">{item.title}</h3>
                      <p className="barber-demo__copy">{item.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="barber-demo__section barber-demo__section--muted">
            <div className="barber-demo__container">
              <div className="barber-demo__section-head barber-demo__section-head--center" data-reveal>
                <p className="barber-demo__section-label">Resenas simuladas</p>
                <h2 className="barber-demo__title">Lo que dicen de nosotros</h2>
              </div>

              <div className="barber-demo__review-grid">
                {demo.sections.testimonials.items.map((item) => (
                  <article key={item.author} className="barber-demo__review-card" data-reveal>
                    <p className="barber-demo__quote">"{item.quote}"</p>
                    <p className="barber-demo__meta">{item.author}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="barber-demo__section">
            <div className="barber-demo__container barber-demo__location">
              <div data-reveal>
                <p className="barber-demo__section-label">Ubicacion y horarios</p>
                <h2 className="barber-demo__title">Visitanos</h2>
                <p className="barber-demo__copy">{demo.sections.location.zone}</p>

                <div className="barber-demo__hours">
                  {demo.sections.location.hours.map((item) => (
                    <div key={item.label} className="barber-demo__hours-row">
                      <span className="barber-demo__meta">{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    className="barber-demo__button barber-demo__button--secondary"
                    href={mapHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Abrir ubicacion
                  </a>
                </div>
              </div>

              <div className="barber-demo__map" data-reveal>
                <span className="barber-demo__map-pin">+</span>
                <div className="barber-demo__map-copy">
                  <p className="barber-demo__meta">Interactive map placeholder</p>
                  <p className="barber-demo__copy">Zona Centro, Celaya, Gto. Mexico</p>
                </div>
              </div>
            </div>
          </section>

          <section className="barber-demo__section">
            <div className="barber-demo__container">
              <div className="barber-demo__cta-panel" data-reveal>
                <p className="barber-demo__section-label">CTA final</p>
                <h2 className="barber-demo__cta-title">{demo.sections.closing.title}</h2>
                <p className="barber-demo__copy">{demo.sections.closing.description}</p>
                <div className="barber-demo__cta-actions">
                  <a className="barber-demo__button barber-demo__button--primary" href="#booking">
                    Agendar ahora
                  </a>
                  <a
                    className="barber-demo__button barber-demo__button--secondary"
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="barber-demo__section pt-0">
            <div className="barber-demo__container text-center" data-reveal>
              <p className="barber-demo__section-label">Sigue nuestro trabajo</p>
              <div className="barber-demo__socials">
                {demo.sections.socials.items.map((item) => {
                  const isWhatsApp = item.label === 'WhatsApp';

                  return (
                    <a
                      key={item.label}
                      className="barber-demo__social-link"
                      href={isWhatsApp ? whatsappHref : item.href}
                      rel={isWhatsApp ? 'noreferrer' : undefined}
                      target={isWhatsApp ? '_blank' : undefined}
                    >
                      <span className="barber-demo__social-icon">{socialIcons[item.label]}</span>
                      <span className="barber-demo__meta">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="barber-demo__footer">
          <div className="barber-demo__container">
            <div className="barber-demo__footer-inner">
              <div className="barber-demo__footer-brand">
                <div className="barber-demo__footer-brand-head">
                  <img alt="Logo de G&G Barber Studio" src={logoSrc} />
                  <div>
                    <p className="barber-demo__footer-title">{demo.businessName}</p>
                    <p className="barber-demo__meta">Barber Studio</p>
                  </div>
                </div>
                <p className="barber-demo__footer-copy">
                  Elevamos el concepto de barberia a una experiencia de lujo y precision para el
                  caballero moderno.
                </p>
                <p className="barber-demo__footer-note">{demo.footer.note}</p>
              </div>

              <div>
                <p className="barber-demo__section-label barber-demo__footer-label">Navegacion</p>
                <div className="barber-demo__footer-links">
                  <a className="barber-demo__footer-link" href="#servicios">
                    Services
                  </a>
                  <a className="barber-demo__footer-link" href="#equipo">
                    Team
                  </a>
                  <a className="barber-demo__footer-link" href="#booking">
                    Booking
                  </a>
                </div>
              </div>

              <div>
                <p className="barber-demo__section-label barber-demo__footer-label">Contacto</p>
                <div className="barber-demo__footer-links">
                  <p className="barber-demo__footer-link">Calle demo 123, Zona Centro</p>
                  <p className="barber-demo__footer-link">Celaya, Gto. Mexico</p>
                  <a className="barber-demo__footer-link" href={whatsappHref} rel="noreferrer" target="_blank">
                    +52 (000) 000 0001
                  </a>
                </div>
              </div>
            </div>

            <div className="barber-demo__footer-bottom">
              Demo conceptual creada por ByteShark. No representa una barberia real.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
