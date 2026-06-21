import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { eventManagerDemoData, eventManagerModules } from '../data/eventManagerDemo.js';
import '../styles/event-manager.css';

const currentDate = new Date('2026-08-15T11:10:00');

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('es-MX');

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
});

const dateTimeFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat('es-MX', {
  hour: 'numeric',
  minute: '2-digit',
});

const moduleMeta = {
  dashboard: {
    description: 'Resumen operativo de registros, pagos, agenda, aliados y evidencias.',
    icon: 'dashboard',
  },
  eventos: {
    description: 'Eventos activos con sede, modalidad, aforo y estado general.',
    icon: 'events',
  },
  inscripciones: {
    description: 'Control de responsables, documentos y validacion de registros.',
    icon: 'registrations',
  },
  equipos: {
    description: 'Equipos, categoria, plantilla, pago y grupo o llave asignada.',
    icon: 'teams',
  },
  pagos: {
    description: 'Seguimiento de montos, metodos, estados y recordatorios de cobro.',
    icon: 'payments',
  },
  calendario: {
    description: 'Agenda operativa de partidos, talleres, ceremonias y activaciones.',
    icon: 'calendar',
  },
  patrocinadores: {
    description: 'Aliados por tipo de apoyo, estatus, contacto y beneficios acordados.',
    icon: 'sponsors',
  },
  evidencias: {
    description: 'Lotes visuales para documentar entregas, partidos y cierre de campana.',
    icon: 'evidence',
  },
  reportes: {
    description: 'Metricas visuales para recaudacion, estados, avance y cierre ejecutivo.',
    icon: 'reports',
  },
  configuracion: {
    description: 'Pantalla visual del evento, costos, categorias e integraciones simuladas.',
    icon: 'settings',
  },
};

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function formatNumber(value) {
  return numberFormatter.format(value);
}

function formatDate(value) {
  return dateFormatter.format(new Date(value));
}

function formatDateTime(value) {
  return dateTimeFormatter.format(new Date(value));
}

function formatTime(value) {
  return timeFormatter.format(new Date(value));
}

function normalizeText(value = '') {
  return value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matchesQuery(query, values) {
  if (!query.trim()) {
    return true;
  }

  const normalizedQuery = normalizeText(query);

  return values.some((value) => normalizeText(value).includes(normalizedQuery));
}

function sumBy(items, getValue) {
  return items.reduce((total, item) => total + getValue(item), 0);
}

function getModuleFromHash(hash) {
  const id = hash.replace('#', '').trim();

  return eventManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getBadgeTone(value) {
  const normalizedValue = normalizeText(value);

  if (
    [
      'confirmado',
      'completo',
      'confirmados',
      'confirmada',
      'publicada',
      'aprobada',
      'entregado',
      'activo',
      'activa',
      'en curso',
      'validado',
      'pagado',
      'finalizado',
    ].includes(normalizedValue)
  ) {
    return 'success';
  }

  if (
    [
      'planeacion',
      'pendiente',
      'pendiente de pago',
      'parcial',
      'nuevo',
      'nueva',
      'programado',
      'prospecto',
      'en revision',
      'inscripciones abiertas',
    ].includes(normalizedValue)
  ) {
    return 'warning';
  }

  if (
    [
      'rechazado',
      'cancelado',
      'vencido',
      'incompleto',
      'cancelada',
      'no asistio',
    ].includes(normalizedValue)
  ) {
    return 'danger';
  }

  if (
    [
      'actividad',
      'partido',
      'presencial',
      'hibrido',
      'evento publico',
      'difusion',
      'logistica',
      'economico',
      'especie',
    ].includes(normalizedValue)
  ) {
    return 'info';
  }

  return 'neutral';
}

function getPriorityTone(value) {
  if (value === 'alta') {
    return 'danger';
  }

  if (value === 'media') {
    return 'warning';
  }

  return 'neutral';
}

function getActivityIcon(type) {
  if (type === 'inscripciones') {
    return 'registrations';
  }

  if (type === 'patrocinadores') {
    return 'sponsors';
  }

  if (type === 'evidencias') {
    return 'evidence';
  }

  if (type === 'calendario') {
    return 'calendar';
  }

  if (type === 'pagos') {
    return 'payments';
  }

  return 'spark';
}

function getEntryLabel(item) {
  if (item.participantA && item.participantB) {
    return `${item.participantA} vs ${item.participantB}`;
  }

  if (item.participantA) {
    return item.participantA;
  }

  return item.title;
}

function groupScheduleByDay(items) {
  const map = new Map();

  items.forEach((item) => {
    const key = item.dateTime.slice(0, 10);

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(item);
  });

  return Array.from(map.entries()).map(([date, entries]) => ({
    date,
    entries: entries.sort((left, right) => new Date(left.dateTime) - new Date(right.dateTime)),
  }));
}

function Icon({ name }) {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.9',
    viewBox: '0 0 24 24',
  };

  if (name === 'dashboard') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="11" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="18" width="7" height="3" rx="1.5" />
      </svg>
    );
  }

  if (name === 'events') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="m9.5 13 1.8 1.8 3.7-4.1" />
      </svg>
    );
  }

  if (name === 'registrations') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
        <path d="M18 7h4" />
        <path d="M20 5v4" />
      </svg>
    );
  }

  if (name === 'teams') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M16 19a4 4 0 0 0-8 0" />
        <circle cx="12" cy="10" r="3" />
        <path d="M20 18a3 3 0 0 0-2.5-2.96" />
        <path d="M4 18a3 3 0 0 1 2.5-2.96" />
      </svg>
    );
  }

  if (name === 'payments') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="M3 10h18" />
        <path d="M8 15h3" />
        <path d="M14 15h2" />
      </svg>
    );
  }

  if (name === 'calendar') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="M10 14h4" />
      </svg>
    );
  }

  if (name === 'sponsors') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M8 5h9a2 2 0 0 1 2 2v4H8Z" />
        <path d="M8 5v14" />
        <path d="M8 11H5a2 2 0 0 0 0 4h3" />
      </svg>
    );
  }

  if (name === 'evidence') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m21 15-4.5-4.5L9 18" />
      </svg>
    );
  }

  if (name === 'reports') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-7" />
      </svg>
    );
  }

  if (name === 'settings') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1 .2l-.2.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1l-.1-.2a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1-.2l.2-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  }

  if (name === 'message') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
      </svg>
    );
  }

  if (name === 'eye') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === 'spark') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M4.9 4.9 7.7 7.7" />
        <path d="m16.3 16.3 2.8 2.8" />
        <path d="M3 12h4" />
        <path d="M17 12h4" />
        <path d="m4.9 19.1 2.8-2.8" />
        <path d="m16.3 7.7 2.8-2.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" {...commonProps}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function StatusBadge({ children, tone }) {
  const finalTone = tone ?? getBadgeTone(children);

  return <span className={`event-manager-badge event-manager-badge--${finalTone}`}>{children}</span>;
}

function MetricCard({ label, value, note, icon, tone = 'neutral', trend }) {
  return (
    <article className={`event-manager-metric-card event-manager-metric-card--${tone}`}>
      <div className="event-manager-metric-card__header">
        <div className="event-manager-metric-card__icon">
          <Icon name={icon} />
        </div>
        {trend ? <span className="event-manager-pill event-manager-pill--muted">{trend}</span> : null}
      </div>
      <div className="event-manager-metric-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`event-manager-panel ${className}`.trim()}>
      <header className="event-manager-panel__header">
        <div>
          <h2 className="event-manager-panel__title">{title}</h2>
          {subtitle ? <p className="event-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="event-manager-empty-state">
      <div className="event-manager-empty-state__icon">
        <Icon name="search" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProgressList({ items, mode = 'currency' }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  function formatValue(value) {
    if (mode === 'number') {
      return formatNumber(value);
    }

    if (mode === 'percent') {
      return `${value}%`;
    }

    return formatCurrency(value);
  }

  return (
    <div className="event-manager-progress-list">
      {items.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 10);

        return (
          <article key={item.label} className="event-manager-progress-list__item">
            <div className="event-manager-progress-list__header">
              <div>
                <strong>{item.label}</strong>
                {item.note ? <p>{item.note}</p> : null}
              </div>
              <span>{formatValue(item.value)}</span>
            </div>
            <div className="event-manager-progress-list__track">
              <div className="event-manager-progress-list__bar" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function BarChart({ items, mode = 'currency' }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  function formatValue(value) {
    if (mode === 'number') {
      return formatNumber(value);
    }

    if (mode === 'percent') {
      return `${value}%`;
    }

    return formatCurrency(value);
  }

  return (
    <div className="event-manager-chart">
      {items.map((item) => {
        const height = Math.max((item.value / maxValue) * 100, 18);

        return (
          <article key={item.label} className="event-manager-chart__item">
            <div className="event-manager-chart__canvas">
              <div className="event-manager-chart__bar" style={{ height: `${height}%` }} />
            </div>
            <div className="event-manager-chart__meta">
              <strong>{item.label}</strong>
              <span>{formatValue(item.value)}</span>
              {item.note ? <small>{item.note}</small> : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function EventManagerPage() {
  const demo = eventManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi evento o campana.`,
  );

  const eventsSorted = [...demo.events].sort((left, right) => new Date(left.dateTime) - new Date(right.dateTime));
  const registrationsSorted = [...demo.registrations].sort(
    (left, right) => new Date(right.date) - new Date(left.date),
  );
  const teamsSorted = [...demo.teams].sort((left, right) => right.members - left.members);
  const paymentsSorted = [...demo.payments].sort((left, right) => new Date(right.date) - new Date(left.date));
  const scheduleSorted = [...demo.schedule].sort((left, right) => new Date(left.dateTime) - new Date(right.dateTime));
  const sponsorsSorted = [...demo.sponsors].sort((left, right) => right.amount - left.amount);
  const evidencesSorted = [...demo.evidences].sort((left, right) => new Date(right.date) - new Date(left.date));

  const primaryEvent = eventsSorted[0];
  const registeredTeamsCount = demo.teams.length;
  const availableSlots = Math.max(primaryEvent.capacity - primaryEvent.currentRegistrations, 0);
  const confirmedPayments = demo.payments.filter((item) => item.status === 'confirmado');
  const pendingPayments = demo.payments.filter((item) =>
    ['pendiente', 'parcial', 'vencido'].includes(item.status),
  );
  const fundsRaised = sumBy(demo.payments, (item) => item.receivedAmount) + sumBy(
    demo.sponsors.filter((item) => ['confirmado', 'entregado'].includes(item.status)),
    (item) => item.amount,
  );
  const activeSponsors = demo.sponsors.filter((item) => ['confirmado', 'entregado'].includes(item.status));
  const upcomingEntries = demo.schedule.filter(
    (item) => ['programado', 'en curso'].includes(item.status) && new Date(item.dateTime) >= currentDate,
  );
  const loadedEvidence = demo.evidences.length;
  const openRegistrations = demo.registrations.filter((item) =>
    ['nuevo', 'pendiente de pago'].includes(item.status),
  );
  const validatedRegistrations = demo.registrations.filter((item) => item.status === 'validado');
  const completeTeams = demo.teams.filter((item) => item.status === 'completo');
  const reviewTeams = demo.teams.filter((item) => item.status === 'en revision');
  const pendingTeamPayments = demo.teams.filter((item) => item.payment !== 'pagado');
  const overduePayments = demo.payments.filter((item) => item.status === 'vencido');
  const publishedEvidence = demo.evidences.filter((item) => item.status === 'publicada');
  const pendingEvidence = demo.evidences.filter((item) => item.status === 'pendiente');
  const eventProgressAverage = Math.round(
    sumBy(demo.reports.eventProgress, (item) => item.value) / Math.max(demo.reports.eventProgress.length, 1),
  );
  const sponsorshipPipelineValue = sumBy(demo.sponsors, (item) => item.amount);

  const filteredEvents = eventsSorted.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.venue,
      item.modality,
      item.status,
      item.category,
      `${item.capacity}`,
      `${item.currentRegistrations}`,
    ]),
  );

  const filteredRegistrations = registrationsSorted.filter((item) =>
    matchesQuery(query, [
      item.owner,
      item.teamName,
      item.phone,
      item.status,
      item.documents,
      item.eventName,
    ]),
  );

  const filteredTeams = teamsSorted.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.captain,
      item.category,
      item.status,
      item.payment,
      item.bracket,
      item.eventName,
      `${item.members}`,
    ]),
  );

  const filteredPayments = paymentsSorted.filter((item) =>
    matchesQuery(query, [
      item.teamName,
      item.concept,
      item.method,
      item.status,
      `${item.amount}`,
      `${item.receivedAmount}`,
    ]),
  );

  const filteredSchedule = scheduleSorted.filter((item) =>
    matchesQuery(query, [
      item.title,
      item.participantA,
      item.participantB,
      item.location,
      item.status,
      item.result,
      item.type,
    ]),
  );

  const filteredSponsors = sponsorsSorted.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.supportType,
      item.status,
      item.contact,
      item.benefits,
      `${item.amount}`,
    ]),
  );

  const filteredEvidences = evidencesSorted.filter((item) =>
    matchesQuery(query, [
      item.title,
      item.type,
      item.status,
      item.responsible,
      item.date,
    ]),
  );

  const filteredAlerts = demo.dashboard.alerts.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.level]),
  );

  const filteredActivity = demo.dashboard.activity.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.timestamp, item.type]),
  );

  const filteredTasks = demo.dashboard.tasks.filter((item) =>
    matchesQuery(query, [item.title, item.owner, item.due, item.priority]),
  );

  const filteredFundraising = demo.dashboard.fundraising.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredStatusCards = demo.dashboard.statusCards.filter((item) =>
    matchesQuery(query, [item.label, item.value, item.note]),
  );

  const filteredReportTeams = demo.reports.teamsByState.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredReportPayments = demo.reports.paymentsByState.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredReportSponsors = demo.reports.sponsorsByType.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredReportParticipation = demo.reports.participationByCategory.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredReportProgress = demo.reports.eventProgress.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const visibleModule = eventManagerModules.find((item) => item.id === activeModule) ?? eventManagerModules[0];
  const visibleMeta = moduleMeta[visibleModule.id];

  const moduleCounters = {
    dashboard: demo.dashboard.alerts.length + demo.dashboard.tasks.length,
    eventos: demo.events.length,
    inscripciones: demo.registrations.length,
    equipos: demo.teams.length,
    pagos: pendingPayments.length,
    calendario: upcomingEntries.length,
    patrocinadores: activeSponsors.length,
    evidencias: demo.evidences.length,
    reportes: demo.reports.eventProgress.length,
    configuracion: demo.settings.integrations.length,
  };

  useEffect(() => {
    function handleHashChange() {
      setActiveModule(getModuleFromHash(window.location.hash));
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!actionNotice) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActionNotice('');
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [actionNotice]);

  function setModule(moduleId) {
    setActiveModule(moduleId);

    if (typeof window !== 'undefined') {
      window.location.hash = moduleId;
    }
  }

  function showNotice(message) {
    setActionNotice(message);
  }

  function simulateQuickAction(moduleId, message) {
    setModule(moduleId);
    showNotice(message);
  }

  function renderDashboard() {
    return (
      <>
        <section className="event-manager-metrics-grid">
          <MetricCard
            icon="teams"
            label="Equipos inscritos"
            note="Plantillas activas en el sistema"
            tone="info"
            trend="Registro"
            value={formatNumber(registeredTeamsCount)}
          />
          <MetricCard
            icon="events"
            label="Cupos disponibles"
            note="Restantes en evento principal"
            tone="warning"
            trend="Capacidad"
            value={formatNumber(availableSlots)}
          />
          <MetricCard
            icon="payments"
            label="Pagos confirmados"
            note="Registros conciliados"
            tone="success"
            trend="Cobro"
            value={formatNumber(confirmedPayments.length)}
          />
          <MetricCard
            icon="payments"
            label="Pagos pendientes"
            note="Incluye parciales y vencidos"
            tone="danger"
            trend="Seguimiento"
            value={formatNumber(pendingPayments.length)}
          />
          <MetricCard
            icon="reports"
            label="Fondos recaudados"
            note="Pagos recibidos + sponsors cerrados"
            tone="success"
            trend="Caja"
            value={formatCurrency(fundsRaised)}
          />
          <MetricCard
            icon="sponsors"
            label="Patrocinadores activos"
            note="Confirmados o entregados"
            tone="neutral"
            trend="Alianzas"
            value={formatNumber(activeSponsors.length)}
          />
          <MetricCard
            icon="calendar"
            label="Proximos partidos / eventos"
            note="Agenda viva de operaciones"
            tone="info"
            trend="Agenda"
            value={formatNumber(upcomingEntries.length)}
          />
          <MetricCard
            icon="evidence"
            label="Evidencias cargadas"
            note="Lotes de seguimiento visual"
            tone="neutral"
            trend="Media"
            value={formatNumber(loadedEvidence)}
          />
        </section>

        <section className="event-manager-grid">
          <Panel
            className="event-manager-panel--span-2"
            subtitle="Vista rapida de aforo y captacion por frentes operativos."
            title="Progreso de inscripcion"
          >
            {demo.dashboard.registrationProgress.length ? (
              <div className="event-manager-summary-grid">
                {demo.dashboard.registrationProgress.map((item) => {
                  const progress = Math.round((item.value / item.target) * 100);

                  return (
                    <article key={item.label} className="event-manager-summary-card">
                      <div className="event-manager-summary-card__header">
                        <div>
                          <span>{item.label}</span>
                          <strong>
                            {formatNumber(item.value)} / {formatNumber(item.target)}
                          </strong>
                        </div>
                        <StatusBadge tone={progress >= 80 ? 'success' : progress >= 60 ? 'warning' : 'neutral'}>
                          {progress}%
                        </StatusBadge>
                      </div>
                      <p>{item.note}</p>
                      <div className="event-manager-summary-card__track">
                        <div className="event-manager-summary-card__bar" style={{ width: `${progress}%` }} />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                description="No hay progreso visible con la busqueda actual."
                title="Sin progreso visible"
              />
            )}
          </Panel>

          <Panel subtitle="Pendientes que pueden afectar cobro, montaje o validacion." title="Alertas importantes">
            {filteredAlerts.length ? (
              <div className="event-manager-stack">
                {filteredAlerts.map((item) => (
                  <article key={item.title} className="event-manager-alert-card">
                    <div className="event-manager-alert-card__header">
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                      <StatusBadge tone={getPriorityTone(item.level)}>{item.level}</StatusBadge>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="Prueba con nombre de sponsor, nivel o detalle."
                title="No hay alertas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Siguientes acciones para registro, staff, media y aliados." title="Proximas tareas">
            {filteredTasks.length ? (
              <div className="event-manager-stack">
                {filteredTasks.map((item) => (
                  <article key={item.title} className="event-manager-task-card">
                    <div className="event-manager-list-card__header">
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.owner}</p>
                      </div>
                      <StatusBadge tone={getPriorityTone(item.priority)}>{item.priority}</StatusBadge>
                    </div>
                    <div className="event-manager-list-card__meta">
                      <span>Vencimiento</span>
                      <strong>{item.due}</strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState description="No hay tareas visibles con este filtro." title="Sin tareas visibles" />
            )}
          </Panel>

          <Panel subtitle="Fuentes activas de ingreso y apoyo para esta demo." title="Resumen de recaudacion">
            {filteredFundraising.length ? (
              <ProgressList items={filteredFundraising} />
            ) : (
              <EmptyState
                description="Busca por monto, fuente o nota del resumen."
                title="No hay recaudacion visible"
              />
            )}
          </Panel>

          <Panel subtitle="Indicadores sinteticos del avance del evento." title="Estado general del evento">
            {filteredStatusCards.length ? (
              <div className="event-manager-summary-grid">
                {filteredStatusCards.map((item) => (
                  <article key={item.label} className="event-manager-summary-card">
                    <div className="event-manager-summary-card__header">
                      <div>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState description="No hay indicadores visibles con la busqueda." title="Sin estado visible" />
            )}
          </Panel>

          <Panel
            className="event-manager-panel--span-2"
            subtitle="Movimientos recientes de pagos, registros, evidencia y agenda."
            title="Actividad reciente"
          >
            {filteredActivity.length ? (
              <div className="event-manager-activity-list">
                {filteredActivity.map((item) => (
                  <article key={`${item.title}-${item.timestamp}`} className="event-manager-activity-list__item">
                    <div className="event-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="event-manager-activity-list__body">
                      <div className="event-manager-activity-list__head">
                        <strong>{item.title}</strong>
                        <span>{item.timestamp}</span>
                      </div>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="Busca por modulo, detalle o marca de tiempo."
                title="No hay actividad visible"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderEventos() {
    const openEvents = demo.events.filter((item) => item.status === 'inscripciones abiertas');
    const liveEvents = demo.events.filter((item) => item.status === 'en curso');
    const planningEvents = demo.events.filter((item) => item.status === 'planeacion');

    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="events"
            label="Eventos visibles"
            note="Pipeline total"
            tone="neutral"
            trend="Agenda"
            value={formatNumber(demo.events.length)}
          />
          <MetricCard
            icon="registrations"
            label="Inscripciones abiertas"
            note="Captacion activa"
            tone="success"
            trend="Top funnel"
            value={formatNumber(openEvents.length)}
          />
          <MetricCard
            icon="spark"
            label="Eventos en curso"
            note="Operacion actual"
            tone="warning"
            trend="Live"
            value={formatNumber(liveEvents.length)}
          />
          <MetricCard
            icon="settings"
            label="En planeacion"
            note="Proximos lanzamientos"
            tone="info"
            trend="Backlog"
            value={formatNumber(planningEvents.length)}
          />
        </section>

        <Panel subtitle="Vista compacta de torneos, clinics y cierres de campana." title="Eventos activos">
          {filteredEvents.length ? (
            <div className="event-manager-event-grid">
              {filteredEvents.map((item) => (
                <article key={item.id} className="event-manager-event-card">
                  <div className="event-manager-event-card__header">
                    <div>
                      <span>{item.category}</span>
                      <strong>{item.name}</strong>
                      <p>
                        {formatDateTime(item.dateTime)} · {item.venue}
                      </p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="event-manager-event-card__stats">
                    <div>
                      <span>Modalidad</span>
                      <strong>{item.modality}</strong>
                    </div>
                    <div>
                      <span>Cupo maximo</span>
                      <strong>{formatNumber(item.capacity)}</strong>
                    </div>
                    <div>
                      <span>Inscritos</span>
                      <strong>{formatNumber(item.currentRegistrations)}</strong>
                    </div>
                  </div>

                  <div className="event-manager-summary-card__track">
                    <div
                      className="event-manager-summary-card__bar"
                      style={{ width: `${Math.round((item.currentRegistrations / item.capacity) * 100)}%` }}
                    />
                  </div>

                  <button
                    className="event-manager-inline-button"
                    onClick={() =>
                      showNotice(`Accion simulada: vista detallada del evento "${item.name}".`)
                    }
                    type="button"
                  >
                    Ver detalles
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState description="Busca por sede, estado o modalidad." title="No hay eventos visibles" />
          )}
        </Panel>
      </>
    );
  }

  function renderInscripciones() {
    const pendingPayment = demo.registrations.filter((item) => item.status === 'pendiente de pago');
    const rejected = demo.registrations.filter((item) => item.status === 'rechazado');

    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="registrations"
            label="Registros nuevos"
            note="Entradas por validar"
            tone="warning"
            trend="Inbox"
            value={formatNumber(openRegistrations.length)}
          />
          <MetricCard
            icon="events"
            label="Validados"
            note="Expediente listo"
            tone="success"
            trend="Checklist"
            value={formatNumber(validatedRegistrations.length)}
          />
          <MetricCard
            icon="payments"
            label="Pendientes de pago"
            note="No deben pasar a llaves"
            tone="danger"
            trend="Cobro"
            value={formatNumber(pendingPayment.length)}
          />
          <MetricCard
            icon="spark"
            label="Rechazados"
            note="Requieren correccion"
            tone="neutral"
            trend="QA"
            value={formatNumber(rejected.length)}
          />
        </section>

        <Panel subtitle="Responsables, documentos y accion simulada de validacion." title="Inscripciones">
          {filteredRegistrations.length ? (
            <div className="event-manager-table-shell">
              <table className="event-manager-table">
                <thead>
                  <tr>
                    <th>Responsable</th>
                    <th>Equipo / participante</th>
                    <th>Telefono</th>
                    <th>Fecha registro</th>
                    <th>Estado</th>
                    <th>Documentos</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="event-manager-table__primary">
                          <strong>{item.owner}</strong>
                          <span>{item.eventName}</span>
                        </div>
                      </td>
                      <td>{item.teamName}</td>
                      <td>{item.phone}</td>
                      <td>{formatDateTime(item.date)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{item.documents}</td>
                      <td>
                        <div className="event-manager-inline-actions">
                          <button
                            className="event-manager-inline-button"
                            onClick={() =>
                              showNotice(`Accion simulada: validar inscripcion de "${item.teamName}".`)
                            }
                            type="button"
                          >
                            Validar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por responsable, estado, telefono o evento."
              title="No hay inscripciones visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderEquipos() {
    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="teams"
            label="Equipos completos"
            note="Listos para competir"
            tone="success"
            trend="Roster"
            value={formatNumber(completeTeams.length)}
          />
          <MetricCard
            icon="registrations"
            label="En revision"
            note="Pendientes de validar"
            tone="warning"
            trend="QA"
            value={formatNumber(reviewTeams.length)}
          />
          <MetricCard
            icon="payments"
            label="Pago pendiente"
            note="No conciliados"
            tone="danger"
            trend="Cobro"
            value={formatNumber(pendingTeamPayments.length)}
          />
          <MetricCard
            icon="calendar"
            label="Categorias"
            note="Visibles en la demo"
            tone="info"
            trend="Segmentacion"
            value={formatNumber(demo.settings.categories.length)}
          />
        </section>

        <Panel subtitle="Tarjetas compactas con plantilla, categoria, pago y llave." title="Equipos y participantes">
          {filteredTeams.length ? (
            <div className="event-manager-team-grid">
              {filteredTeams.map((item) => (
                <article key={item.id} className="event-manager-team-card">
                  <div className="event-manager-list-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.eventName}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="event-manager-team-card__stats">
                    <div>
                      <span>Capitan</span>
                      <strong>{item.captain}</strong>
                    </div>
                    <div>
                      <span>Integrantes</span>
                      <strong>{formatNumber(item.members)}</strong>
                    </div>
                    <div>
                      <span>Categoria</span>
                      <strong>{item.category}</strong>
                    </div>
                    <div>
                      <span>Grupo / llave</span>
                      <strong>{item.bracket}</strong>
                    </div>
                  </div>

                  <div className="event-manager-inline-actions">
                    <StatusBadge>{item.payment}</StatusBadge>
                    <button
                      className="event-manager-inline-button event-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: ver plantilla del equipo "${item.name}".`)
                      }
                      type="button"
                    >
                      Ver plantilla
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState description="Busca por capitan, categoria, llave o pago." title="No hay equipos visibles" />
          )}
        </Panel>
      </>
    );
  }

  function renderPagos() {
    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="payments"
            label="Confirmado"
            note="Ingreso conciliado"
            tone="success"
            trend="Caja"
            value={formatCurrency(sumBy(confirmedPayments, (item) => item.receivedAmount))}
          />
          <MetricCard
            icon="payments"
            label="Pendiente"
            note="Monto por cobrar"
            tone="warning"
            trend="Follow-up"
            value={formatCurrency(sumBy(demo.payments.filter((item) => item.status === 'pendiente'), (item) => item.amount))}
          />
          <MetricCard
            icon="payments"
            label="Vencido"
            note="Requiere recordatorio"
            tone="danger"
            trend="Riesgo"
            value={formatCurrency(sumBy(overduePayments, (item) => item.amount))}
          />
          <MetricCard
            icon="reports"
            label="Parcial recibido"
            note="Anticipos registrados"
            tone="info"
            trend="Liquidez"
            value={formatCurrency(sumBy(demo.payments.filter((item) => item.status === 'parcial'), (item) => item.receivedAmount))}
          />
        </section>

        <Panel subtitle="Conciliacion simulada por equipo, concepto, metodo y estado." title="Pagos">
          {filteredPayments.length ? (
            <div className="event-manager-table-shell">
              <table className="event-manager-table">
                <thead>
                  <tr>
                    <th>Equipo / participante</th>
                    <th>Concepto</th>
                    <th>Monto</th>
                    <th>Metodo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="event-manager-table__primary">
                          <strong>{item.teamName}</strong>
                          <span>Recibido: {formatCurrency(item.receivedAmount)}</span>
                        </div>
                      </td>
                      <td>{item.concept}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.method}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{formatDateTime(item.date)}</td>
                      <td>
                        <div className="event-manager-inline-actions">
                          <button
                            className="event-manager-inline-button"
                            onClick={() =>
                              showNotice(`Accion simulada: confirmar pago de "${item.teamName}".`)
                            }
                            type="button"
                          >
                            Confirmar pago
                          </button>
                          <button
                            className="event-manager-inline-button event-manager-inline-button--ghost"
                            onClick={() =>
                              showNotice(`Accion simulada: enviar recordatorio a "${item.teamName}".`)
                            }
                            type="button"
                          >
                            Recordatorio
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por equipo, metodo de pago o estado."
              title="No hay pagos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderCalendario() {
    const groupedSchedule = groupScheduleByDay(filteredSchedule);
    const liveEntries = demo.schedule.filter((item) => item.status === 'en curso');
    const finishedEntries = demo.schedule.filter((item) => item.status === 'finalizado');

    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="calendar"
            label="Programados"
            note="Agenda lista para operar"
            tone="info"
            trend="Run of show"
            value={formatNumber(upcomingEntries.length)}
          />
          <MetricCard
            icon="spark"
            label="En curso"
            note="Entradas activas"
            tone="warning"
            trend="Live"
            value={formatNumber(liveEntries.length)}
          />
          <MetricCard
            icon="reports"
            label="Finalizados"
            note="Checklist cerrado"
            tone="success"
            trend="Historial"
            value={formatNumber(finishedEntries.length)}
          />
          <MetricCard
            icon="events"
            label="Ubicaciones"
            note="Canchas y areas"
            tone="neutral"
            trend="Sedes"
            value={formatNumber(new Set(demo.schedule.map((item) => item.location)).size)}
          />
        </section>

        <Panel subtitle="Agenda simple por dia para partidos, talleres y ceremonias." title="Calendario operativo">
          {groupedSchedule.length ? (
            <div className="event-manager-calendar-stack">
              {groupedSchedule.map((group) => (
                <section key={group.date} className="event-manager-calendar-day">
                  <header className="event-manager-calendar-day__header">
                    <strong>{formatDate(group.date)}</strong>
                    <span>{formatNumber(group.entries.length)} actividades</span>
                  </header>

                  <div className="event-manager-stack">
                    {group.entries.map((item) => (
                      <article key={item.id} className="event-manager-calendar-card">
                        <div className="event-manager-calendar-card__time">
                          <span>{formatTime(item.dateTime)}</span>
                          <small>{item.location}</small>
                        </div>
                        <div className="event-manager-calendar-card__body">
                          <div className="event-manager-list-card__header">
                            <div>
                              <strong>{item.title}</strong>
                              <p>{getEntryLabel(item)}</p>
                            </div>
                            <StatusBadge>{item.status}</StatusBadge>
                          </div>
                          <div className="event-manager-list-card__meta">
                            <span>{item.type}</span>
                            <strong>{item.result}</strong>
                          </div>
                        </div>
                        <button
                          className="event-manager-inline-button"
                          onClick={() =>
                            showNotice(`Accion simulada: actualizar marcador de "${item.title}".`)
                          }
                          type="button"
                        >
                          Actualizar marcador
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Busca por equipo, actividad, sede o estado."
              title="No hay calendario visible"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderPatrocinadores() {
    const prospects = demo.sponsors.filter((item) => item.status === 'prospecto');
    const delivered = demo.sponsors.filter((item) => item.status === 'entregado');

    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="sponsors"
            label="Activos"
            note="Confirmados o entregados"
            tone="success"
            trend="Pipeline"
            value={formatNumber(activeSponsors.length)}
          />
          <MetricCard
            icon="sponsors"
            label="Prospectos"
            note="Seguimiento comercial"
            tone="warning"
            trend="Prospeccion"
            value={formatNumber(prospects.length)}
          />
          <MetricCard
            icon="reports"
            label="Valor total"
            note="Potencial de patrocinio"
            tone="info"
            trend="Commercial"
            value={formatCurrency(sponsorshipPipelineValue)}
          />
          <MetricCard
            icon="spark"
            label="Entregados"
            note="Aliados ya ejecutados"
            tone="neutral"
            trend="Fulfillment"
            value={formatNumber(delivered.length)}
          />
        </section>

        <Panel subtitle="Cards visuales para apoyo, valor, beneficios y contacto." title="Patrocinadores">
          {filteredSponsors.length ? (
            <div className="event-manager-sponsor-grid">
              {filteredSponsors.map((item) => (
                <article key={item.id} className="event-manager-sponsor-card">
                  <div className="event-manager-list-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.contact}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="event-manager-team-card__stats">
                    <div>
                      <span>Tipo de apoyo</span>
                      <strong>{item.supportType}</strong>
                    </div>
                    <div>
                      <span>Monto estimado</span>
                      <strong>{formatCurrency(item.amount)}</strong>
                    </div>
                  </div>

                  <p>{item.benefits}</p>

                  <button
                    className="event-manager-inline-button"
                    onClick={() =>
                      showNotice(`Accion simulada: registrar apoyo de "${item.name}".`)
                    }
                    type="button"
                  >
                    Registrar apoyo
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Busca por sponsor, tipo, contacto o beneficio."
              title="No hay patrocinadores visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderEvidencias() {
    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="evidence"
            label="Pendientes"
            note="Lotes por revisar"
            tone="warning"
            trend="Review"
            value={formatNumber(pendingEvidence.length)}
          />
          <MetricCard
            icon="evidence"
            label="Aprobadas"
            note="Listas para publicar"
            tone="success"
            trend="Media"
            value={formatNumber(demo.evidences.filter((item) => item.status === 'aprobada').length)}
          />
          <MetricCard
            icon="reports"
            label="Publicadas"
            note="Visibles en reporte"
            tone="info"
            trend="Output"
            value={formatNumber(publishedEvidence.length)}
          />
          <MetricCard
            icon="calendar"
            label="Cobertura total"
            note="Entradas con fecha y responsable"
            tone="neutral"
            trend="Archivo"
            value={formatNumber(demo.evidences.length)}
          />
        </section>

        <Panel subtitle="Galeria simulada con placeholders, estado y responsable." title="Evidencias">
          {filteredEvidences.length ? (
            <div className="event-manager-media-grid">
              {filteredEvidences.map((item) => (
                <article key={item.id} className="event-manager-media-card">
                  <div className={`event-manager-media-card__cover event-manager-media-card__cover--${item.tone}`}>
                    <span>{item.type}</span>
                  </div>
                  <div className="event-manager-media-card__body">
                    <div className="event-manager-list-card__header">
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.responsible}</p>
                      </div>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                    <div className="event-manager-list-card__meta">
                      <span>{formatDateTime(item.date)}</span>
                      <strong>{item.type}</strong>
                    </div>
                    <button
                      className="event-manager-inline-button event-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: revisar evidencia "${item.title}".`)
                      }
                      type="button"
                    >
                      Revisar evidencia
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState description="Busca por tipo, responsable o estado." title="No hay evidencias visibles" />
          )}
        </Panel>
      </>
    );
  }

  function renderReportes() {
    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="reports"
            label="Recaudacion total"
            note="Pagos y sponsors cerrados"
            tone="success"
            trend="Finance"
            value={formatCurrency(fundsRaised)}
          />
          <MetricCard
            icon="teams"
            label="Categorias activas"
            note="Participacion segmentada"
            tone="info"
            trend="Mix"
            value={formatNumber(demo.reports.participationByCategory.length)}
          />
          <MetricCard
            icon="spark"
            label="Avance promedio"
            note="Operacion general del evento"
            tone="warning"
            trend="Progress"
            value={`${eventProgressAverage}%`}
          />
          <MetricCard
            icon="settings"
            label="Reporte final"
            note="Estado del resumen ejecutivo"
            tone="neutral"
            trend="Closeout"
            value={demo.reports.finalReport.status}
          />
        </section>

        <section className="event-manager-grid">
          <Panel
            className="event-manager-panel--span-2"
            subtitle="Serie simple de ingresos por semana."
            title="Recaudacion total"
          >
            <BarChart items={demo.reports.fundraisingByWeek} />
          </Panel>

          <Panel subtitle="Distribucion actual de equipos por estado." title="Equipos por estado">
            {filteredReportTeams.length ? (
              <ProgressList items={filteredReportTeams} mode="number" />
            ) : (
              <EmptyState description="No hay estados visibles para este filtro." title="Sin equipos visibles" />
            )}
          </Panel>

          <Panel subtitle="Montos visibles por estatus de cobro." title="Pagos por estado">
            {filteredReportPayments.length ? (
              <ProgressList items={filteredReportPayments} />
            ) : (
              <EmptyState description="No hay pagos visibles para este filtro." title="Sin pagos visibles" />
            )}
          </Panel>

          <Panel subtitle="Valor estimado por tipo de apoyo." title="Patrocinadores por tipo">
            {filteredReportSponsors.length ? (
              <ProgressList items={filteredReportSponsors} />
            ) : (
              <EmptyState description="No hay sponsors visibles con este filtro." title="Sin sponsors visibles" />
            )}
          </Panel>

          <Panel subtitle="Participacion total por categoria de evento." title="Participacion por categoria">
            {filteredReportParticipation.length ? (
              <ProgressList items={filteredReportParticipation} mode="number" />
            ) : (
              <EmptyState description="No hay categorias visibles para este filtro." title="Sin categorias visibles" />
            )}
          </Panel>

          <Panel className="event-manager-panel--span-2" subtitle="Seguimiento porcentual por area clave." title="Avance general del evento">
            {filteredReportProgress.length ? (
              <ProgressList items={filteredReportProgress} mode="percent" />
            ) : (
              <EmptyState description="No hay avances visibles con esta busqueda." title="Sin avance visible" />
            )}
          </Panel>

          <Panel subtitle="Cierre ejecutivo simulado para una version real del sistema." title="Reporte final simulado">
            <div className="event-manager-report-card">
              <div className="event-manager-list-card__header">
                <div>
                  <strong>{demo.reports.finalReport.status}</strong>
                  <p>{demo.reports.finalReport.updatedAt}</p>
                </div>
                <StatusBadge>{demo.reports.finalReport.status}</StatusBadge>
              </div>
              <p>{demo.reports.finalReport.summary}</p>
              <div className="event-manager-stack">
                {demo.reports.finalReport.bullets.map((item) => (
                  <article key={item} className="event-manager-list-card">
                    <div className="event-manager-list-card__header">
                      <strong>{item}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderConfiguracion() {
    return (
      <>
        <section className="event-manager-metrics-grid event-manager-metrics-grid--compact">
          <MetricCard
            icon="events"
            label="Categorias"
            note="Activas en esta demo"
            tone="success"
            trend="Setup"
            value={formatNumber(demo.settings.categories.length)}
          />
          <MetricCard
            icon="payments"
            label="Costos configurados"
            note="Esquemas visibles"
            tone="info"
            trend="Pricing"
            value={formatNumber(demo.settings.registrationCosts.length)}
          />
          <MetricCard
            icon="settings"
            label="Estados del evento"
            note="Flujo principal"
            tone="neutral"
            trend="Workflow"
            value={formatNumber(demo.settings.eventStates.length)}
          />
          <MetricCard
            icon="spark"
            label="Integraciones"
            note="Activas o simuladas"
            tone="warning"
            trend="Extendable"
            value={formatNumber(demo.settings.integrations.length)}
          />
        </section>

        <section className="event-manager-grid event-manager-grid--config">
          <Panel className="event-manager-panel--span-2" subtitle="Pantalla visual no funcional." title="Identidad del evento">
            <div className="event-manager-settings-grid">
              <div className="event-manager-brand-card">
                <div className="event-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.eventName}</strong>
                  <p>Operacion demo para torneos, inscripciones, pagos, aliados y evidencias.</p>
                </div>
              </div>

              <div className="event-manager-field-grid">
                <div className="event-manager-field-card">
                  <span>Nombre del evento</span>
                  <strong>{demo.settings.eventName}</strong>
                </div>
                <div className="event-manager-field-card">
                  <span>Sede principal</span>
                  <strong>{demo.settings.venue}</strong>
                </div>
                <div className="event-manager-field-card">
                  <span>Color principal</span>
                  <div className="event-manager-color-preview">
                    <span
                      className="event-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.business.primaryColor }}
                    />
                    <strong>{demo.business.primaryColor}</strong>
                  </div>
                </div>
                <div className="event-manager-field-card">
                  <span>Contacto operativo</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Categorias visibles para organizar inscripciones y llaves." title="Categorias">
            <div className="event-manager-chip-list">
              {demo.settings.categories.map((item) => (
                <span key={item} className="event-manager-chip">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Costos de referencia en una version real del sistema." title="Costos de inscripcion">
            <div className="event-manager-stack">
              {demo.settings.registrationCosts.map((item) => (
                <article key={item} className="event-manager-list-card">
                  <div className="event-manager-list-card__header">
                    <strong>{item}</strong>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Flujo principal para etapas del evento." title="Estados del evento">
            <div className="event-manager-chip-list">
              {demo.settings.eventStates.map((item) => (
                <span key={item} className="event-manager-chip event-manager-chip--soft">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel
            className="event-manager-panel--span-2"
            subtitle="Conexiones simuladas para una version real del sistema."
            title="Integraciones"
          >
            <div className="event-manager-integration-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="event-manager-integration-card">
                  <div className="event-manager-list-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderModuleContent() {
    if (activeModule === 'eventos') {
      return renderEventos();
    }

    if (activeModule === 'inscripciones') {
      return renderInscripciones();
    }

    if (activeModule === 'equipos') {
      return renderEquipos();
    }

    if (activeModule === 'pagos') {
      return renderPagos();
    }

    if (activeModule === 'calendario') {
      return renderCalendario();
    }

    if (activeModule === 'patrocinadores') {
      return renderPatrocinadores();
    }

    if (activeModule === 'evidencias') {
      return renderEvidencias();
    }

    if (activeModule === 'reportes') {
      return renderReportes();
    }

    if (activeModule === 'configuracion') {
      return renderConfiguracion();
    }

    return renderDashboard();
  }

  return (
    <div
      className="event-manager-demo"
      style={{
        '--event-primary': demo.business.primaryColor,
        '--event-accent': demo.business.accentColor,
        '--event-support': demo.business.supportColor,
      }}
    >
      <div className="event-manager-app-shell">
        <aside className="event-manager-sidebar">
          <div className="event-manager-sidebar__header">
            <span className="event-manager-pill event-manager-pill--dark">Demo eventos / torneos</span>
            <h2>{demo.appName}</h2>
            <p>Panel interno para coordinar registros, equipos, pagos, agenda, aliados y evidencia.</p>
          </div>

          <div className="event-manager-sidebar__business">
            <div className="event-manager-sidebar__mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} · {demo.business.plan}
              </span>
            </div>
          </div>

          <div className="event-manager-sidebar__summary">
            <article className="event-manager-sidebar__summary-card">
              <span>Meta de registros</span>
              <strong>{formatNumber(demo.business.registrationTarget)}</strong>
            </article>
            <article className="event-manager-sidebar__summary-card">
              <span>Fondos captados</span>
              <strong>{formatCurrency(fundsRaised)}</strong>
            </article>
          </div>

          <nav className="event-manager-sidebar__nav" aria-label="Modulos del sistema de eventos">
            {eventManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`event-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="event-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="event-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="event-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="event-manager-sidebar__footer">
            <div className="event-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Respuesta demo estimada: {demo.business.responseTime}</span>
            </div>

            <div className="event-manager-sidebar__actions">
              <Link className="event-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a className="event-manager-primary-link" href={requestSystemHref} rel="noreferrer" target="_blank">
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="event-manager-main">
          <header className="event-manager-topbar">
            <div className="event-manager-topbar__identity">
              <div>
                <p className="event-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleMeta.description}</p>
              </div>
            </div>

            <label className="event-manager-search">
              <span className="event-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar evento, equipo, sponsor, pago o evidencia..."
                type="search"
                value={query}
              />
            </label>

            <div className="event-manager-topbar__actions">
              <button
                className="event-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'eventos',
                    'Accion simulada: se abriria el flujo para crear un nuevo evento.',
                  )
                }
                type="button"
              >
                Nuevo evento
              </button>
              <button
                className="event-manager-topbar__button event-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'equipos',
                    'Accion simulada: se abriria el registro de un nuevo equipo.',
                  )
                }
                type="button"
              >
                Registrar equipo
              </button>
              <button
                className="event-manager-topbar__button event-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'pagos',
                    'Accion simulada: se abriria la conciliacion de un pago.',
                  )
                }
                type="button"
              >
                Confirmar pago
              </button>
              <a
                className="event-manager-topbar__button event-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="event-manager-banner">
            <div className="event-manager-banner__content">
              <span className="event-manager-pill event-manager-pill--soft">Demo visual con datos simulados</span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="event-manager-banner__stats">
              <div className="event-manager-banner__stat">
                <span>Evento principal</span>
                <strong>{primaryEvent.name}</strong>
              </div>
              <div className="event-manager-banner__stat">
                <span>Recaudacion visible</span>
                <strong>{formatCurrency(fundsRaised)}</strong>
              </div>
            </div>
          </section>

          <section className="event-manager-module-intro">
            <div>
              <span className="event-manager-pill event-manager-pill--muted">{visibleModule.label}</span>
              <h2>{demo.business.name}</h2>
              <p>Sistema demo para centralizar operacion, calendario, recaudacion y cierre de un evento.</p>
            </div>

            <div className="event-manager-module-intro__stats">
              <div>
                <span>Busqueda activa</span>
                <strong>{query.trim() ? query : 'Sin filtro'}</strong>
              </div>
              <div>
                <span>Sede base</span>
                <strong>{demo.business.venue}</strong>
              </div>
            </div>
          </section>

          <div className="event-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="event-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
