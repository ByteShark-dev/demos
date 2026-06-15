import { useState } from 'react';

import { DemoHeaderBar } from '../components/DemoHeaderBar.jsx';
import { buildWhatsAppUrl, getDemoWhatsAppUrl } from '../config/site.js';
import '../styles/salud-profesional.css';

const doctorPhoto = `${import.meta.env.BASE_URL}health/elena-vargas.jpg`;
const clinicPhoto = `${import.meta.env.BASE_URL}health/clinic-interior.jpg`;

const services = [
  {
    title: 'Consulta psicologica individual',
    description:
      'Sesiones personalizadas para atender ansiedad, animo bajo, gestion emocional y procesos personales.',
    duration: '50 min',
    icon: 'person',
  },
  {
    title: 'Orientacion emocional',
    description:
      'Herramientas practicas para ordenar situaciones puntuales, reducir estres y recuperar claridad.',
    duration: '60 min',
    icon: 'leaf',
  },
  {
    title: 'Terapia online',
    description:
      'Atencion profesional a distancia con la misma estructura clinica y seguimiento del proceso.',
    duration: '50 min',
    icon: 'video',
  },
  {
    title: 'Acompanamiento familiar',
    description:
      'Espacio para revisar dinamicas, comunicacion y acuerdos dentro del entorno familiar cercano.',
    duration: '90 min',
    icon: 'group',
  },
  {
    title: 'Evaluacion inicial',
    description:
      'Primera entrevista para conocer tu contexto, identificar necesidades y orientar el plan de atencion.',
    duration: '75 min',
    icon: 'clipboard',
  },
  {
    title: 'Seguimiento terapeutico',
    description:
      'Revision periodica de avances, ajustes preventivos y continuidad de objetivos clinicos.',
    duration: '40 min',
    icon: 'refresh',
  },
];

const processSteps = [
  {
    title: 'Envia un mensaje o agenda',
    description: 'Comparte tu interes inicial y elige la forma mas comoda para comenzar.',
  },
  {
    title: 'Recibe informacion inicial',
    description: 'Obtienes datos generales sobre modalidad, tiempos y forma de coordinacion.',
  },
  {
    title: 'Elige modalidad y horario',
    description: 'Se define si tu consulta sera presencial u online segun tu disponibilidad.',
  },
  {
    title: 'Acude a tu consulta',
    description: 'Recibes atencion presencial u online en un espacio etico, claro y puntual.',
  },
];

const modalityItems = [
  {
    title: 'Consulta presencial',
    description: 'Atencion en Zona Centro, Celaya, Gto., en un espacio privado y tranquilo.',
    icon: 'pin',
  },
  {
    title: 'Consulta online',
    description: 'Sesiones por videollamada para pacientes que requieren flexibilidad o seguimiento remoto.',
    icon: 'video',
  },
  {
    title: 'Seguimiento periodico',
    description: 'Continuidad planificada para revisar avances, ajustes y objetivos del proceso.',
    icon: 'pulse',
  },
];

const faqItems = [
  {
    question: 'La primera consulta es de evaluacion?',
    answer:
      'Si. La primera sesion permite conocer tu motivo de consulta, antecedentes relevantes y objetivos iniciales del proceso.',
  },
  {
    question: 'Puedo tomar sesion online?',
    answer:
      'Si. La modalidad online esta disponible para quienes necesitan flexibilidad, continuidad o atencion a distancia.',
  },
  {
    question: 'La informacion es confidencial?',
    answer:
      'Si. La informacion compartida en consulta se trata con privacidad, respeto y bajo el marco de confidencialidad profesional.',
  },
  {
    question: 'Como agendo una cita?',
    answer:
      'Puedes llenar el formulario demo o escribir por WhatsApp para solicitar informacion inicial y coordinar horario.',
  },
  {
    question: 'Cuanto dura una consulta?',
    answer:
      'Depende del servicio. Las consultas individuales suelen durar 50 minutos y otras modalidades pueden extenderse segun el caso.',
  },
];

function HealthIcon({ name }) {
  const className = 'health-demo__icon-svg';

  if (name === 'person') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    );
  }

  if (name === 'leaf') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M6 13c0-5 4.5-8 11-8 0 6.5-3 11-8 11-1.7 0-3-.8-3-3Z" />
        <path d="M8 16c1.5-3 4.3-5.8 8-8" />
      </svg>
    );
  }

  if (name === 'video') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="12" rx="2" width="13" x="3" y="6" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    );
  }

  if (name === 'group') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M7.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M16.5 11A2.5 2.5 0 1 0 16.5 6a2.5 2.5 0 0 0 0 5Z" />
        <path d="M3.5 19a4 4 0 0 1 8 0" />
        <path d="M12.5 19a4 4 0 0 1 8 0" />
      </svg>
    );
  }

  if (name === 'clipboard') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="16" rx="2" width="14" x="5" y="5" />
        <path d="M9 5.5h6a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 5.5Z" />
        <path d="M9 11h6M9 15h4" />
      </svg>
    );
  }

  if (name === 'refresh') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M20 6v5h-5" />
        <path d="M4 18v-5h5" />
        <path d="M7 9a7 7 0 0 1 11-2.5L20 8" />
        <path d="M17 15a7 7 0 0 1-11 2.5L4 16" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 3 5 6v5c0 4.5 2.8 7.6 7 10 4.2-2.4 7-5.5 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.8 1.8 3.7-4" />
      </svg>
    );
  }

  if (name === 'lock') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="10" rx="2" width="12" x="6" y="11" />
        <path d="M8.5 11V8a3.5 3.5 0 1 1 7 0v3" />
      </svg>
    );
  }

  if (name === 'pulse') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M3 12h4l2-4 4 8 2-4h6" />
      </svg>
    );
  }

  if (name === 'pin') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" />
        <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }

  if (name === 'chat') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M5 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 2Z" />
      </svg>
    );
  }

  if (name === 'badge') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="14" rx="3" width="16" x="4" y="5" />
        <path d="M9 9h6M9 13h3" />
      </svg>
    );
  }

  if (name === 'chevron') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="m9 6 6 6-6 6" />
      </svg>
    );
  }

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function HealthButton({ href, children, variant = 'primary', external = false, type = 'button', onClick }) {
  const className = `health-demo__button health-demo__button--${variant}`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        rel={external ? 'noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function buildRequestMessage(formData) {
  return [
    'Hola, quiero solicitar una consulta en Centro Sereno Salud Integral.',
    `Nombre: ${formData.name || 'Pendiente'}`,
    `Telefono: ${formData.phone || 'Pendiente'}`,
    `Modalidad: ${formData.mode || 'Pendiente'}`,
    `Motivo general: ${formData.reason || 'Pendiente'}`,
    `Fecha preferida: ${formData.date || 'Pendiente'}`,
    `Horario preferido: ${formData.time || 'Pendiente'}`,
    `Comentarios: ${formData.comments || 'Sin comentarios adicionales.'}`,
  ].join('\n');
}

export function SaludProfesionalPage() {
  const whatsappHref = getDemoWhatsAppUrl({
    businessName: 'Centro Sereno Salud Integral',
    contact: {
      whatsapp: {
        phone: '520000000003',
        message:
          'Hola, me interesa agendar una consulta en Centro Sereno Salud Integral y conocer las modalidades disponibles.',
      },
    },
  });
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Calle de la Serenidad 123, Zona Centro, Celaya, Guanajuato',
  )}`;
  const [confirmation, setConfirmation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    mode: 'Presencial',
    reason: 'Ansiedad / Estres',
    date: '',
    time: '',
    comments: '',
  });

  const requestHref = buildWhatsAppUrl({
    phone: '520000000003',
    message: buildRequestMessage(formData),
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation(
      'Solicitud demo preparada. Puedes continuar el flujo por WhatsApp con los datos capturados.',
    );
  }

  return (
    <div className="health-demo">
      <DemoHeaderBar
        primaryAction={{ label: 'Agendar por WhatsApp', href: whatsappHref, external: true }}
        secondaryAction={{ label: 'Volver al catalogo', href: '/' }}
        tone="warm"
      />

      <div className="health-demo__topbar">
        <div className="health-demo__shell health-demo__topbar-inner">
          <a className="health-demo__brand-link" href="#inicio">
            Centro Sereno
          </a>

          <nav className="health-demo__nav" aria-label="Secciones">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#agenda">Agenda</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <HealthButton href="#agenda">Pedir cita</HealthButton>
        </div>
      </div>

      <main className="health-demo__main" id="inicio">
        <section className="health-demo__hero">
          <div className="health-demo__shell health-demo__hero-grid">
            <div className="health-demo__hero-copy">
              <p className="health-demo__clinic-name">Centro Sereno Salud Integral</p>

              <div className="health-demo__badge-row">
                <span className="health-demo__badge health-demo__badge--sage">
                  <HealthIcon name="shield" />
                  Atencion profesional
                </span>
                <span className="health-demo__badge health-demo__badge--blue">
                  <HealthIcon name="video" />
                  Consulta online
                </span>
                <span className="health-demo__badge health-demo__badge--neutral">
                  <HealthIcon name="lock" />
                  Privacidad
                </span>
                <span className="health-demo__badge health-demo__badge--neutral">
                  <HealthIcon name="pulse" />
                  Seguimiento personalizado
                </span>
              </div>

              <h1 className="health-demo__title">
                Atencion profesional para tu bienestar emocional
              </h1>
              <p className="health-demo__lead">
                Agenda una consulta presencial u online en un espacio etico, seguro y orientado a tu
                proceso personal.
              </p>

              <div className="health-demo__hero-actions">
                <HealthButton href="#agenda">Agendar consulta</HealthButton>
                <HealthButton external href={whatsappHref} variant="secondary">
                  <HealthIcon name="chat" />
                  Enviar mensaje por WhatsApp
                </HealthButton>
              </div>
            </div>

            <div className="health-demo__hero-visual">
              <div className="health-demo__hero-photo-card">
                <img
                  alt="Retrato profesional ilustrativo de la Dra. Elena Vargas en consultorio sereno."
                  className="health-demo__hero-photo"
                  src={doctorPhoto}
                />
              </div>
              <div className="health-demo__quote-card">
                <p>"Tu espacio de calma comienza aqui."</p>
              </div>
            </div>
          </div>
        </section>

        <section className="health-demo__credentials">
          <div className="health-demo__shell health-demo__credentials-inner">
            <span className="health-demo__credentials-icon" aria-hidden="true">
              <HealthIcon name="badge" />
            </span>
            <p className="health-demo__credentials-eyebrow">Credenciales profesionales</p>
            <h2 className="health-demo__section-title">Dra. Elena Vargas</h2>
            <p className="health-demo__credentials-role">Psicologa Clinica</p>
            <div className="health-demo__credentials-tags">
              <span>Cedula profesional: 0000000</span>
              <span>Atencion presencial y online</span>
              <span>Centro Sereno Salud Integral</span>
            </div>
            <p className="health-demo__credentials-copy">
              La informacion profesional y las cedulas ayudan a que los pacientes identifiquen al
              responsable del servicio y tomen decisiones con mayor confianza.
            </p>
            <p className="health-demo__credentials-note">
              Datos ficticios mostrados unicamente como parte de una demo conceptual.
            </p>
          </div>
        </section>

        <section className="health-demo__section" id="servicios">
          <div className="health-demo__shell">
            <div className="health-demo__section-head">
              <h2 className="health-demo__section-title">Servicios especializados</h2>
              <p className="health-demo__section-copy">
                Acompanamiento profesional disenado para transmitir claridad, legitimidad y un tono
                sobrio desde el primer vistazo.
              </p>
            </div>

            <div className="health-demo__services-grid">
              {services.map((service) => (
                <article key={service.title} className="health-demo__service-card">
                  <span className="health-demo__service-icon" aria-hidden="true">
                    <HealthIcon name={service.icon} />
                  </span>
                  <h3 className="health-demo__card-title">{service.title}</h3>
                  <p className="health-demo__card-copy">{service.description}</p>
                  <div className="health-demo__card-meta">
                    <span className="health-demo__duration">{service.duration}</span>
                    <span className="health-demo__link-label">
                      Saber mas
                      <HealthIcon name="chevron" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--tint" id="proceso">
          <div className="health-demo__shell">
            <div className="health-demo__section-head health-demo__section-head--center">
              <h2 className="health-demo__section-title">Tu camino hacia el bienestar</h2>
            </div>

            <div className="health-demo__steps">
              {processSteps.map((step, index) => (
                <article key={step.title} className="health-demo__step">
                  <span className="health-demo__step-index">{index + 1}</span>
                  <h3 className="health-demo__step-title">{step.title}</h3>
                  <p className="health-demo__step-copy">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--compact">
          <div className="health-demo__shell">
            <div className="health-demo__section-head">
              <h2 className="health-demo__section-title">Modalidades de atencion</h2>
              <p className="health-demo__section-copy">
                Consulta presencial, online y seguimiento periodico dentro de una estructura clara y
                profesional.
              </p>
            </div>

            <div className="health-demo__modalities-grid">
              {modalityItems.map((item) => (
                <article key={item.title} className="health-demo__modality-card">
                  <span className="health-demo__modality-icon" aria-hidden="true">
                    <HealthIcon name={item.icon} />
                  </span>
                  <h3 className="health-demo__card-title">{item.title}</h3>
                  <p className="health-demo__card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="health-demo__section" id="agenda">
          <div className="health-demo__shell health-demo__booking-grid">
            <div className="health-demo__booking-copy">
              <h2 className="health-demo__section-title">Comienza tu proceso hoy</h2>
              <p className="health-demo__section-copy">
                Completa el formulario y nos pondremos en contacto contigo para confirmar tu espacio.
              </p>

              <div className="health-demo__booking-info">
                <article className="health-demo__info-card">
                  <span className="health-demo__info-icon" aria-hidden="true">
                    <HealthIcon name="pin" />
                  </span>
                  <div>
                    <h3>Presencial</h3>
                    <p>Zona Centro, Celaya, Gto.</p>
                  </div>
                </article>
                <article className="health-demo__info-card">
                  <span className="health-demo__info-icon" aria-hidden="true">
                    <HealthIcon name="video" />
                  </span>
                  <div>
                    <h3>Online</h3>
                    <p>A traves de Google Meet o Zoom.</p>
                  </div>
                </article>
              </div>
            </div>

            <div className="health-demo__form-card">
              <form className="health-demo__form" onSubmit={handleSubmit}>
                <div className="health-demo__form-grid">
                  <label className="health-demo__field">
                    <span>Nombre</span>
                    <input
                      name="name"
                      onChange={handleChange}
                      placeholder="Ej. Juan Perez"
                      type="text"
                      value={formData.name}
                    />
                  </label>

                  <label className="health-demo__field">
                    <span>Telefono</span>
                    <input
                      name="phone"
                      onChange={handleChange}
                      placeholder="461 123 4567"
                      type="tel"
                      value={formData.phone}
                    />
                  </label>
                </div>

                <fieldset className="health-demo__field health-demo__fieldset">
                  <legend>Modalidad</legend>
                  <div className="health-demo__radio-row">
                    <label>
                      <input
                        checked={formData.mode === 'Presencial'}
                        name="mode"
                        onChange={handleChange}
                        type="radio"
                        value="Presencial"
                      />
                      <span>Presencial</span>
                    </label>
                    <label>
                      <input
                        checked={formData.mode === 'Online'}
                        name="mode"
                        onChange={handleChange}
                        type="radio"
                        value="Online"
                      />
                      <span>Online</span>
                    </label>
                  </div>
                </fieldset>

                <label className="health-demo__field">
                  <span>Motivo general de consulta</span>
                  <select name="reason" onChange={handleChange} value={formData.reason}>
                    <option>Ansiedad / Estres</option>
                    <option>Animo bajo</option>
                    <option>Relaciones personales</option>
                    <option>Crecimiento personal</option>
                    <option>Otro</option>
                  </select>
                </label>

                <div className="health-demo__form-grid">
                  <label className="health-demo__field">
                    <span>Fecha preferida</span>
                    <input name="date" onChange={handleChange} type="date" value={formData.date} />
                  </label>

                  <label className="health-demo__field">
                    <span>Horario preferido</span>
                    <input name="time" onChange={handleChange} type="time" value={formData.time} />
                  </label>
                </div>

                <label className="health-demo__field">
                  <span>Comentarios</span>
                  <textarea
                    name="comments"
                    onChange={handleChange}
                    placeholder="Comparte cualquier dato relevante para la solicitud."
                    rows="4"
                    value={formData.comments}
                  />
                </label>

                <div className="health-demo__form-actions">
                  <HealthButton type="submit">Solicitar consulta</HealthButton>
                  <HealthButton external href={requestHref} variant="whatsapp">
                    <HealthIcon name="chat" />
                    WhatsApp
                  </HealthButton>
                </div>

                {confirmation ? (
                  <p className="health-demo__confirmation">{confirmation}</p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--tint">
          <div className="health-demo__shell">
            <div className="health-demo__section-head">
              <h2 className="health-demo__section-title">Modalidad, horarios y seguimiento</h2>
              <p className="health-demo__section-copy">
                Informacion visible para que el paciente entienda como iniciar sin friccion ni mensajes
                improvisados.
              </p>
            </div>

            <div className="health-demo__trust-grid">
              <article className="health-demo__trust-card">
                <span className="health-demo__trust-icon" aria-hidden="true">
                  <HealthIcon name="video" />
                </span>
                <h3 className="health-demo__card-title">Consulta online</h3>
                <p className="health-demo__card-copy">
                  Sesiones por videollamada con la misma estructura de seguimiento del proceso.
                </p>
              </article>
              <article className="health-demo__trust-card">
                <span className="health-demo__trust-icon" aria-hidden="true">
                  <HealthIcon name="clock" />
                </span>
                <h3 className="health-demo__card-title">Horarios claros</h3>
                <p className="health-demo__card-copy">
                  Lunes a viernes de 9:00 AM a 7:00 PM y sabado de 9:00 AM a 2:00 PM.
                </p>
              </article>
              <article className="health-demo__trust-card">
                <span className="health-demo__trust-icon" aria-hidden="true">
                  <HealthIcon name="pulse" />
                </span>
                <h3 className="health-demo__card-title">Seguimiento periodico</h3>
                <p className="health-demo__card-copy">
                  Continuidad profesional para revisar avances, acuerdos y siguientes pasos.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--soft" id="faq">
          <div className="health-demo__shell health-demo__faq-shell">
            <div className="health-demo__section-head health-demo__section-head--center">
              <h2 className="health-demo__section-title">Preguntas frecuentes</h2>
            </div>

            <div className="health-demo__faq-list">
              {faqItems.map((item) => (
                <details key={item.question} className="health-demo__faq-item">
                  <summary>
                    <span>{item.question}</span>
                    <span className="health-demo__faq-arrow" aria-hidden="true">
                      <HealthIcon name="chevron" />
                    </span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="health-demo__section" id="contacto">
          <div className="health-demo__shell">
            <div className="health-demo__location-card">
              <div className="health-demo__location-copy">
                <h2 className="health-demo__section-title">Ubicacion y horarios</h2>
                <div className="health-demo__location-list">
                  <div className="health-demo__location-item">
                    <span aria-hidden="true">
                      <HealthIcon name="pin" />
                    </span>
                    <div>
                      <strong>Zona Centro, Celaya, Gto.</strong>
                      <p>Calle de la Serenidad #123, Zona Centro, Celaya, Gto.</p>
                    </div>
                  </div>
                  <div className="health-demo__location-item">
                    <span aria-hidden="true">
                      <HealthIcon name="clock" />
                    </span>
                    <div>
                      <strong>Horario de atencion</strong>
                      <p>Lunes a viernes: 9:00 AM - 7:00 PM</p>
                      <p>Sabado: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="health-demo__location-actions">
                  <HealthButton external href={mapHref}>
                    Abrir ubicacion
                  </HealthButton>
                  <HealthButton external href={whatsappHref} variant="secondary">
                    <HealthIcon name="chat" />
                    Agendar por WhatsApp
                  </HealthButton>
                </div>
              </div>

              <div className="health-demo__location-visual">
                <img
                  alt="Interior ilustrativo de consultorio sereno y profesional."
                  src={clinicPhoto}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--compact">
          <div className="health-demo__shell">
            <div className="health-demo__ethics-card">
              <h2 className="health-demo__section-title">Aviso de privacidad y etica</h2>
              <p className="health-demo__section-copy">
                La informacion compartida en consulta se trata con privacidad y respeto. Esta pagina
                es solo una demo conceptual y no representa servicios medicos reales.
              </p>
            </div>
          </div>
        </section>

        <section className="health-demo__section health-demo__section--compact">
          <div className="health-demo__shell">
            <div className="health-demo__cta-card">
              <h2 className="health-demo__cta-title">Agenda una consulta profesional</h2>
              <p className="health-demo__cta-copy">
                Una pagina clara permite que los pacientes conozcan tus servicios, credenciales y
                formas de contacto antes de agendar.
              </p>
              <div className="health-demo__cta-actions">
                <HealthButton href="#agenda" variant="light">
                  Agendar consulta
                </HealthButton>
                <HealthButton external href={whatsappHref} variant="dark">
                  Enviar WhatsApp
                </HealthButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="health-demo__footer">
        <div className="health-demo__shell health-demo__footer-grid">
          <div className="health-demo__footer-block">
            <h3>Centro Sereno Salud Integral</h3>
            <p>Dra. Elena Vargas</p>
            <p>Cedula profesional: 0000000</p>
            <p>Psicologia clinica y bienestar emocional.</p>
          </div>

          <div className="health-demo__footer-block">
            <h4>Servicios principales</h4>
            <ul>
              <li>Consulta psicologica individual</li>
              <li>Terapia online</li>
              <li>Evaluacion inicial</li>
              <li>Seguimiento terapeutico</li>
            </ul>
          </div>

          <div className="health-demo__footer-block">
            <h4>Demo</h4>
            <p>Creado por ByteShark</p>
            <p>Demo conceptual creada por ByteShark. No representa un consultorio real.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
