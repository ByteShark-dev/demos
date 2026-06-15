import { useState } from 'react';

import { DemoHeaderBar } from '../components/DemoHeaderBar.jsx';
import { buildWhatsAppUrl, getDemoWhatsAppUrl } from '../config/site.js';
import '../styles/despacho-contable.css';

const dashboardPhoto = `${import.meta.env.BASE_URL}accounting/dashboard.jpg`;
const meetingPhoto = `${import.meta.env.BASE_URL}accounting/executive-meeting.jpg`;

const serviceItems = [
  {
    title: 'Declaraciones mensuales',
    description: 'Calculo oportuno de obligaciones fiscales y presentacion puntual ante el SAT.',
    audience: 'Ambos',
    icon: 'calendar',
  },
  {
    title: 'Declaracion anual',
    description: 'Revision de informacion, deducciones y estrategia de cierre fiscal anual.',
    audience: 'Ambos',
    icon: 'checklist',
  },
  {
    title: 'Facturacion electronica',
    description: 'Gestion de CFDI, control documental y correcciones operativas con orden.',
    audience: 'Ambos',
    icon: 'invoice',
  },
  {
    title: 'Nomina',
    description: 'Administracion de sueldos, timbrado, IMSS e INFONAVIT para equipos en crecimiento.',
    audience: 'Empresas',
    icon: 'team',
  },
  {
    title: 'Asesoria fiscal',
    description: 'Orientacion clara para decisiones, cumplimiento y prevencion de riesgos fiscales.',
    audience: 'Ambos',
    icon: 'shield',
  },
  {
    title: 'Regularizacion contable',
    description: 'Orden de declaraciones atrasadas y reconstruccion de informacion contable pendiente.',
    audience: 'Ambos',
    icon: 'history',
  },
  {
    title: 'Constitucion de empresas',
    description: 'Acompanamiento inicial para nuevas operaciones y estructura administrativa.',
    audience: 'Empresas',
    icon: 'building',
  },
  {
    title: 'Planeacion financiera basica',
    description: 'Proyecciones iniciales para entender flujo, orden documental y decisiones futuras.',
    audience: 'Personas fisicas',
    icon: 'chart',
  },
];

const benefitItems = [
  {
    title: 'Evita errores fiscales',
    description: 'Reduce omisiones, recargos y revisiones innecesarias por falta de control.',
    icon: 'check',
  },
  {
    title: 'Ten tus documentos en orden',
    description: 'Centraliza informacion clave para responder con mayor rapidez y certeza.',
    icon: 'folder',
  },
  {
    title: 'Cumple a tiempo',
    description: 'Mantiene obligaciones visibles para no depender de recordatorios improvisados.',
    icon: 'clock',
  },
  {
    title: 'Recibe asesoria clara',
    description: 'Explicaciones puntuales para entender decisiones fiscales sin ruido innecesario.',
    icon: 'spark',
  },
  {
    title: 'Mejora el control de tu negocio',
    description: 'Da visibilidad sobre flujo, reportes y organizacion operativa.',
    icon: 'pulse',
  },
  {
    title: 'Ahorra tiempo administrativo',
    description: 'Libera tiempo interno y reduce tareas repetitivas en la operacion diaria.',
    icon: 'speed',
  },
];

const planItems = [
  {
    title: 'Plan Basico',
    subtitle: 'Para personas fisicas',
    audience: 'Profesionales independientes',
    features: [
      'Declaraciones mensuales',
      'Facturacion basica',
      'Soporte por WhatsApp',
    ],
    accent: 'outline',
  },
  {
    title: 'Plan Negocio',
    subtitle: 'Para pequenos negocios',
    audience: 'Operacion en crecimiento',
    features: [
      'Declaraciones mensuales',
      'Control de ingresos y gastos',
      'Facturacion',
      'Reporte mensual',
    ],
    accent: 'solid',
    badge: 'Mas popular',
  },
  {
    title: 'Plan Empresarial',
    subtitle: 'Para empresas',
    audience: 'Acompanamiento mas completo',
    features: [
      'Nomina',
      'Reportes',
      'Planeacion fiscal',
      'Seguimiento personalizado',
    ],
    accent: 'outline',
  },
];

const processSteps = [
  {
    title: 'Contacto inicial',
    description: 'Entendemos el contexto de tu operacion y el tipo de apoyo que necesitas.',
  },
  {
    title: 'Revision de situacion fiscal',
    description: 'Analizamos documentacion, obligaciones y puntos criticos del momento.',
  },
  {
    title: 'Propuesta de servicio',
    description: 'Definimos un esquema de trabajo con alcance claro y seguimiento esperado.',
  },
  {
    title: 'Seguimiento mensual o por proyecto',
    description: 'Se ejecuta el servicio con visibilidad, orden documental y continuidad.',
  },
];

const trustItems = [
  {
    title: 'Atencion profesional',
    description: 'La estructura visual comunica seriedad y experiencia desde el primer contacto.',
    icon: 'briefcase',
  },
  {
    title: 'Informacion clara',
    description: 'Servicios, alcances y procesos quedan visibles sin saturar la pagina.',
    icon: 'document',
  },
  {
    title: 'Canales de contacto',
    description: 'Formulario y WhatsApp reducen friccion para solicitar asesoria.',
    icon: 'chat',
  },
  {
    title: 'Documentos organizados',
    description: 'La percepcion de orden ayuda a generar confianza antes de la primera llamada.',
    icon: 'folder',
  },
  {
    title: 'Seguimiento',
    description: 'Muestra una operacion continua en lugar de una oferta improvisada.',
    icon: 'refresh',
  },
];

const faqItems = [
  {
    question: 'Atienden personas fisicas?',
    answer:
      'Si. La demo contempla personas fisicas, negocios pequenos y empresas con alcances distintos.',
  },
  {
    question: 'Pueden ayudarme si tengo declaraciones atrasadas?',
    answer:
      'Si. El servicio de regularizacion contable esta pensado para revisar periodos pendientes y ordenar la situacion.',
  },
  {
    question: 'Trabajan con negocios pequenos?',
    answer:
      'Si. La estructura incluye servicios y planes orientados a pequenos negocios y operaciones en crecimiento.',
  },
  {
    question: 'La asesoria puede ser online?',
    answer:
      'Si. La comunicacion y el seguimiento pueden organizarse a distancia segun la necesidad del cliente.',
  },
  {
    question: 'Que documentos necesito para empezar?',
    answer:
      'Generalmente se revisa constancia fiscal, informacion bancaria y documentacion operativa base, segun el servicio solicitado.',
  },
];

function AccountingIcon({ name }) {
  const className = 'accounting-demo__icon-svg';

  if (name === 'calendar') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="15" rx="2" width="16" x="4" y="5" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }

  if (name === 'checklist') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="m6 8 1.6 1.6L10 7" />
        <path d="m6 14 1.6 1.6L10 13" />
        <path d="M12.5 8H18M12.5 14H18" />
      </svg>
    );
  }

  if (name === 'invoice') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M7 3h8l3 3v15l-3-1.5L12 21l-3-1.5L6 21V5a2 2 0 0 1 2-2Z" />
        <path d="M9 9h6M9 13h6M9 17h4" />
      </svg>
    );
  }

  if (name === 'team') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M16.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M4.5 19a4 4 0 0 1 7 0" />
        <path d="M13 18a3.5 3.5 0 0 1 6 0" />
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

  if (name === 'history') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M4 12a8 8 0 1 0 2.3-5.7L4 8" />
        <path d="M4 4v4h4M12 8v4l3 2" />
      </svg>
    );
  }

  if (name === 'building') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M4 21V5l8-2 8 2v16" />
        <path d="M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4" />
      </svg>
    );
  }

  if (name === 'chart') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M4 19h16" />
        <path d="M7 16v-5M12 16V7M17 16v-8" />
      </svg>
    );
  }

  if (name === 'check') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="m5 12 4 4 10-10" />
      </svg>
    );
  }

  if (name === 'folder') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M3 8h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }

  if (name === 'spark') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        <path d="m6.5 6.5 4 4m3 3 4 4M17.5 6.5l-4 4m-3 3-4 4" />
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

  if (name === 'speed') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M5 16a7 7 0 1 1 14 0" />
        <path d="m12 12 4-3" />
        <path d="M12 16h.01" />
      </svg>
    );
  }

  if (name === 'briefcase') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <rect height="11" rx="2" width="18" x="3" y="8" />
        <path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }

  if (name === 'document') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M9 12h6M9 16h6" />
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

  if (name === 'pin') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" />
        <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </svg>
    );
  }

  if (name === 'arrow') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function AccountingButton({
  href,
  children,
  variant = 'primary',
  external = false,
  type = 'button',
  onClick,
}) {
  const className = `accounting-demo__button accounting-demo__button--${variant}`;
  const style = variant === 'primary' ? { color: '#ffffff' } : undefined;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        rel={external ? 'noreferrer' : undefined}
        style={style}
        target={external ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} style={style} type={type}>
      {children}
    </button>
  );
}

function buildRequestMessage(formData) {
  return [
    'Hola, quiero solicitar asesoria en Nexo Fiscal Consultores.',
    `Nombre: ${formData.name || 'Pendiente'}`,
    `Telefono: ${formData.phone || 'Pendiente'}`,
    `Tipo de cliente: ${formData.clientType || 'Pendiente'}`,
    `Servicio de interes: ${formData.service || 'Pendiente'}`,
    `Regimen fiscal: ${formData.taxRegime || 'No especificado'}`,
    `Comentarios: ${formData.comments || 'Sin comentarios adicionales.'}`,
  ].join('\n');
}

export function DespachoContablePage() {
  const whatsappHref = getDemoWhatsAppUrl({
    businessName: 'Nexo Fiscal Consultores',
    contact: {
      whatsapp: {
        phone: '520000000004',
        message:
          'Hola, quiero solicitar informacion sobre los servicios de Nexo Fiscal Consultores para mi negocio.',
      },
    },
  });
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Zona Centro, Celaya, Guanajuato',
  )}`;
  const [confirmation, setConfirmation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    clientType: 'Persona fisica',
    service: 'Declaraciones mensuales',
    taxRegime: '',
    comments: '',
  });

  const requestHref = buildWhatsAppUrl({
    phone: '520000000004',
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
      'Solicitud demo preparada. Puedes continuar por WhatsApp con la informacion capturada.',
    );
  }

  return (
    <div className="accounting-demo">
      <DemoHeaderBar
        primaryAction={{ label: 'Enviar WhatsApp', href: whatsappHref, external: true }}
        secondaryAction={{ label: 'Volver al catalogo', href: '/' }}
        tone="warm"
      />

      <div className="accounting-demo__topbar">
        <div className="accounting-demo__shell accounting-demo__topbar-inner">
          <a className="accounting-demo__brand-link" href="#inicio">
            Nexo Fiscal Consultores
          </a>

          <nav className="accounting-demo__nav" aria-label="Secciones">
            <a href="#servicios">Servicios</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#planes">Planes</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <AccountingButton href="#contacto">Consultoria</AccountingButton>
        </div>
      </div>

      <main className="accounting-demo__main" id="inicio">
        <section className="accounting-demo__hero">
          <div className="accounting-demo__shell accounting-demo__hero-grid">
            <div className="accounting-demo__hero-copy">
              <p className="accounting-demo__eyebrow">Nexo Fiscal Consultores</p>
              <h1 className="accounting-demo__title">
                Contabilidad clara para decisiones inteligentes
              </h1>
              <p className="accounting-demo__lead">
                Servicios contables, fiscales y administrativos para negocios que necesitan orden,
                cumplimiento y asesoria profesional.
              </p>

              <div className="accounting-demo__hero-actions">
                <AccountingButton href="#contacto">
                  Solicitar asesoria
                  <AccountingIcon name="arrow" />
                </AccountingButton>
                <AccountingButton external href={whatsappHref} variant="secondary">
                  <AccountingIcon name="chat" />
                  Enviar WhatsApp
                </AccountingButton>
              </div>
            </div>

            <div className="accounting-demo__hero-visual">
              <div className="accounting-demo__dashboard-card">
                <img
                  alt="Dashboard contable ilustrativo para firma fiscal."
                  className="accounting-demo__hero-image"
                  src={dashboardPhoto}
                />
                <div className="accounting-demo__stat-card">
                  <span>Crecimiento anual</span>
                  <strong>+24.8%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="accounting-demo__badge-strip">
          <div className="accounting-demo__shell accounting-demo__badge-row">
            <span className="accounting-demo__badge-item">
              <AccountingIcon name="document" />
              Declaraciones
            </span>
            <span className="accounting-demo__badge-item">
              <AccountingIcon name="invoice" />
              Facturacion
            </span>
            <span className="accounting-demo__badge-item">
              <AccountingIcon name="shield" />
              Asesoria fiscal
            </span>
            <span className="accounting-demo__badge-item">
              <AccountingIcon name="building" />
              Empresas y personas fisicas
            </span>
          </div>
        </section>

        <section className="accounting-demo__section" id="servicios">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__section-head accounting-demo__section-head--center">
              <p className="accounting-demo__section-kicker">Nuestra experiencia</p>
              <h2 className="accounting-demo__section-title">Soluciones contables integrales</h2>
            </div>

            <div className="accounting-demo__services-grid">
              {serviceItems.map((service) => (
                <article key={service.title} className="accounting-demo__service-card">
                  <span className="accounting-demo__service-icon" aria-hidden="true">
                    <AccountingIcon name={service.icon} />
                  </span>
                  <h3 className="accounting-demo__card-title">{service.title}</h3>
                  <p className="accounting-demo__card-copy">{service.description}</p>
                  <span className="accounting-demo__audience">{service.audience}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--soft" id="beneficios">
          <div className="accounting-demo__shell accounting-demo__benefits-grid">
            <div className="accounting-demo__benefits-copy">
              <h2 className="accounting-demo__section-title">
                Por que confiar su contabilidad a expertos
              </h2>
              <div className="accounting-demo__benefits-list">
                {benefitItems.map((item) => (
                  <article key={item.title} className="accounting-demo__benefit-item">
                    <span className="accounting-demo__benefit-icon" aria-hidden="true">
                      <AccountingIcon name={item.icon} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="accounting-demo__meeting-shell">
              <img
                alt="Reunion ejecutiva ilustrativa para asesoria contable."
                className="accounting-demo__meeting-image"
                src={meetingPhoto}
              />
            </div>
          </div>
        </section>

        <section className="accounting-demo__section" id="planes">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__section-head accounting-demo__section-head--center">
              <h2 className="accounting-demo__section-title">Planes o paquetes</h2>
              <p className="accounting-demo__section-copy">
                Cotizacion personalizada segun etapa de operacion, complejidad fiscal y necesidad de
                seguimiento.
              </p>
            </div>

            <div className="accounting-demo__plans-grid">
              {planItems.map((plan) => (
                <article
                  key={plan.title}
                  className={`accounting-demo__plan-card accounting-demo__plan-card--${plan.accent}`}
                >
                  {plan.badge ? <span className="accounting-demo__plan-badge">{plan.badge}</span> : null}
                  <div className="accounting-demo__plan-head">
                    <h3 className="accounting-demo__plan-title">{plan.title}</h3>
                    <p>{plan.subtitle}</p>
                    <span>{plan.audience}</span>
                  </div>
                  <strong className="accounting-demo__plan-price">Cotizacion personalizada</strong>
                  <ul className="accounting-demo__plan-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <AccountingIcon name="check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <AccountingButton external href={whatsappHref} variant={plan.accent === 'solid' ? 'primary' : 'outline'}>
                    Solicitar informacion
                  </AccountingButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--dark">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__section-head accounting-demo__section-head--center">
              <h2 className="accounting-demo__section-title accounting-demo__section-title--light">
                Proceso de trabajo
              </h2>
            </div>

            <div className="accounting-demo__steps">
              {processSteps.map((step, index) => (
                <article key={step.title} className="accounting-demo__step">
                  <span className="accounting-demo__step-index">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--soft">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__trust-panel">
              <div className="accounting-demo__trust-copy">
                <h2 className="accounting-demo__section-title">Confianza y documentos</h2>
                <p className="accounting-demo__section-copy">
                  Una pagina profesional ayuda a mostrar servicios, facilitar contacto y generar
                  confianza antes de la primera asesoria.
                </p>
              </div>
              <div className="accounting-demo__trust-grid">
                {trustItems.map((item) => (
                  <article key={item.title} className="accounting-demo__trust-card">
                    <span className="accounting-demo__trust-icon" aria-hidden="true">
                      <AccountingIcon name={item.icon} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--form" id="contacto">
          <div className="accounting-demo__shell accounting-demo__form-layout">
            <div className="accounting-demo__form-copy">
              <h2 className="accounting-demo__section-title">
                Solicitud de asesoria y orden fiscal
              </h2>
              <p className="accounting-demo__section-copy">
                Completa el formulario y un consultor senior se pondra en contacto para revisar tu
                caso y orientar una propuesta adecuada.
              </p>
              <div className="accounting-demo__contact-points">
                <article>
                  <span aria-hidden="true">
                    <AccountingIcon name="pin" />
                  </span>
                  <div>
                    <strong>Zona Centro, Celaya, Gto.</strong>
                    <p>Atencion presencial y coordinacion remota.</p>
                  </div>
                </article>
                <article>
                  <span aria-hidden="true">
                    <AccountingIcon name="clock" />
                  </span>
                  <div>
                    <strong>Horarios</strong>
                    <p>Lunes a viernes: 9:00 AM - 6:00 PM</p>
                    <p>Sabado: 9:00 AM - 2:00 PM</p>
                  </div>
                </article>
              </div>
            </div>

            <div className="accounting-demo__form-card">
              <form className="accounting-demo__form" onSubmit={handleSubmit}>
                <div className="accounting-demo__form-grid">
                  <label className="accounting-demo__field">
                    <span>Nombre</span>
                    <input
                      name="name"
                      onChange={handleChange}
                      placeholder="Ej. Juan Perez"
                      type="text"
                      value={formData.name}
                    />
                  </label>
                  <label className="accounting-demo__field">
                    <span>Telefono</span>
                    <input
                      name="phone"
                      onChange={handleChange}
                      placeholder="461 000 0000"
                      type="tel"
                      value={formData.phone}
                    />
                  </label>
                </div>

                <div className="accounting-demo__form-grid">
                  <label className="accounting-demo__field">
                    <span>Tipo de cliente</span>
                    <select name="clientType" onChange={handleChange} value={formData.clientType}>
                      <option>Persona fisica</option>
                      <option>Negocio</option>
                      <option>Empresa</option>
                    </select>
                  </label>
                  <label className="accounting-demo__field">
                    <span>Servicio de interes</span>
                    <select name="service" onChange={handleChange} value={formData.service}>
                      <option>Declaraciones mensuales</option>
                      <option>Declaracion anual</option>
                      <option>Asesoria fiscal</option>
                      <option>Regularizacion contable</option>
                      <option>Nomina</option>
                    </select>
                  </label>
                </div>

                <label className="accounting-demo__field">
                  <span>Regimen fiscal, si aplica</span>
                  <input
                    name="taxRegime"
                    onChange={handleChange}
                    placeholder="Ej. Actividad empresarial"
                    type="text"
                    value={formData.taxRegime}
                  />
                </label>

                <label className="accounting-demo__field">
                  <span>Comentarios</span>
                  <textarea
                    name="comments"
                    onChange={handleChange}
                    placeholder="Cuente brevemente en que necesita apoyo."
                    rows="4"
                    value={formData.comments}
                  />
                </label>

                <div className="accounting-demo__form-actions">
                  <AccountingButton type="submit">Solicitar asesoria</AccountingButton>
                  <AccountingButton external href={requestHref} variant="secondary">
                    <AccountingIcon name="chat" />
                    Enviar por WhatsApp
                  </AccountingButton>
                </div>

                {confirmation ? (
                  <p className="accounting-demo__confirmation">{confirmation}</p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section className="accounting-demo__section" id="faq">
          <div className="accounting-demo__shell accounting-demo__faq-shell">
            <div className="accounting-demo__section-head accounting-demo__section-head--center">
              <h2 className="accounting-demo__section-title">Preguntas frecuentes</h2>
            </div>

            <div className="accounting-demo__faq-list">
              {faqItems.map((item) => (
                <details key={item.question} className="accounting-demo__faq-item">
                  <summary>
                    <span>{item.question}</span>
                    <span className="accounting-demo__faq-arrow" aria-hidden="true">
                      <AccountingIcon name="arrow" />
                    </span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--compact">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__location-card">
              <div className="accounting-demo__location-copy">
                <h2 className="accounting-demo__section-title">Ubicacion y horarios</h2>
                <div className="accounting-demo__location-list">
                  <div className="accounting-demo__location-item">
                    <span aria-hidden="true">
                      <AccountingIcon name="pin" />
                    </span>
                    <div>
                      <strong>Zona Centro, Celaya, Gto.</strong>
                      <p>Atencion presencial con coordinacion tambien por medios digitales.</p>
                    </div>
                  </div>
                  <div className="accounting-demo__location-item">
                    <span aria-hidden="true">
                      <AccountingIcon name="clock" />
                    </span>
                    <div>
                      <strong>Horario</strong>
                      <p>Lunes a viernes: 9:00 AM - 6:00 PM</p>
                      <p>Sabado: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="accounting-demo__location-actions">
                  <AccountingButton external href={mapHref}>Abrir ubicacion</AccountingButton>
                  <AccountingButton external href={whatsappHref} variant="secondary">
                    Enviar WhatsApp
                  </AccountingButton>
                </div>
              </div>
              <div className="accounting-demo__location-placeholder">
                <div className="accounting-demo__map-frame">
                  <span>Mapa placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="accounting-demo__section accounting-demo__section--compact">
          <div className="accounting-demo__shell">
            <div className="accounting-demo__cta-panel">
              <h2 className="accounting-demo__cta-title">
                Pon en orden la parte contable de tu negocio
              </h2>
              <p className="accounting-demo__cta-copy">
                Una web clara permite que tus clientes entiendan tus servicios, confien en tu
                despacho y soliciten asesoria mas rapido.
              </p>
              <div className="accounting-demo__cta-actions">
                <AccountingButton href="#contacto">Solicitar asesoria</AccountingButton>
                <AccountingButton external href={whatsappHref} variant="outline">
                  WhatsApp
                </AccountingButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="accounting-demo__footer">
        <div className="accounting-demo__shell accounting-demo__footer-grid">
          <div className="accounting-demo__footer-block">
            <h3>Nexo Fiscal Consultores</h3>
            <p>Servicios contables, fiscales y administrativos para operaciones que necesitan orden.</p>
            <div className="accounting-demo__socials">
              <a href="#">LinkedIn</a>
              <a href="#">Correo</a>
            </div>
          </div>

          <div className="accounting-demo__footer-block">
            <h4>Servicios principales</h4>
            <ul>
              <li>Declaraciones mensuales</li>
              <li>Facturacion electronica</li>
              <li>Asesoria fiscal</li>
              <li>Regularizacion contable</li>
            </ul>
          </div>

          <div className="accounting-demo__footer-block">
            <h4>Horarios</h4>
            <p>Lunes a viernes: 9:00 AM - 6:00 PM</p>
            <p>Sabado: 9:00 AM - 2:00 PM</p>
            <p>Creado por ByteShark</p>
            <p>Demo conceptual creada por ByteShark. No representa un despacho real.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
