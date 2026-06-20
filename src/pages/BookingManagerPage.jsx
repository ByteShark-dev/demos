import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { bookingManagerDemoData, bookingManagerModules } from '../data/bookingManagerDemo.js';
import '../styles/booking-manager.css';

const currentDate = new Date('2026-06-20T08:00:00');

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

const dayFormatter = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
});

const moduleMeta = {
  dashboard: {
    description: 'Vista general de citas, alertas y ritmo operativo semanal.',
    icon: 'dashboard',
  },
  agenda: {
    description: 'Agenda semanal con estados, profesionales y acciones rapidas.',
    icon: 'calendar',
  },
  clientes: {
    description: 'Base de clientes, proximas citas y seguimiento por WhatsApp.',
    icon: 'users',
  },
  servicios: {
    description: 'Catalogo de servicios, precios y volumen mensual.',
    icon: 'services',
  },
  disponibilidad: {
    description: 'Horarios de trabajo, descansos y bloques ocupados.',
    icon: 'availability',
  },
  recordatorios: {
    description: 'Confirmaciones, reenvios y seguimiento de no respuesta.',
    icon: 'bell',
  },
  historial: {
    description: 'Historial de citas, pagos y observaciones breves.',
    icon: 'history',
  },
  configuracion: {
    description: 'Ajustes visuales, profesionales e integraciones simuladas.',
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
  if (!value) {
    return 'Sin registro';
  }

  return dateFormatter.format(new Date(value));
}

function formatDateTime(value) {
  return dateTimeFormatter.format(new Date(value));
}

function formatTime(value) {
  return timeFormatter.format(new Date(value));
}

function formatDayLabel(value) {
  return dayFormatter.format(new Date(value));
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

function sumBy(items, key) {
  return items.reduce((total, item) => total + item[key], 0);
}

function getModuleFromHash(hash) {
  const id = hash.replace('#', '').trim();

  return bookingManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getStatusTone(status) {
  const normalizedStatus = normalizeText(status);

  if (
    [
      'confirmada',
      'completada',
      'activo',
      'recurrente',
      'activa',
      'enviado',
      'pagado',
    ].includes(normalizedStatus)
  ) {
    return 'success';
  }

  if (['nuevo', 'programado', 'reagendada'].includes(normalizedStatus)) {
    return 'info';
  }

  if (['pendiente', 'media', 'simulada'].includes(normalizedStatus)) {
    return 'warning';
  }

  if (['cancelada', 'inactivo', 'no-respondio', 'falto', 'no-asistio', 'alta'].includes(normalizedStatus)) {
    return 'danger';
  }

  return 'neutral';
}

function getActivityIcon(type) {
  if (type === 'agenda') {
    return 'calendar';
  }

  if (type === 'cliente') {
    return 'users';
  }

  if (type === 'recordatorio') {
    return 'bell';
  }

  if (type === 'servicio') {
    return 'services';
  }

  if (type === 'historial') {
    return 'history';
  }

  return 'spark';
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

  if (name === 'calendar') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 10h18" />
      </svg>
    );
  }

  if (name === 'users') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M16 19a4 4 0 0 0-8 0" />
        <circle cx="12" cy="10" r="3" />
        <path d="M19 19a3.5 3.5 0 0 0-3-3.46" />
        <path d="M8 15.54A3.5 3.5 0 0 0 5 19" />
      </svg>
    );
  }

  if (name === 'services') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h10" />
        <rect x="3" y="4" width="18" height="16" rx="3" />
      </svg>
    );
  }

  if (name === 'availability') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 12h16" />
        <path d="M8 8h8" />
        <path d="M7 16h10" />
        <rect x="3" y="5" width="18" height="14" rx="3" />
      </svg>
    );
  }

  if (name === 'bell') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M15 17H5a1 1 0 0 1-.8-1.6l1.2-1.6V10a5.6 5.6 0 1 1 11.2 0v3.8l1.2 1.6A1 1 0 0 1 17 17h-2" />
        <path d="M9.5 20a2.5 2.5 0 0 0 5 0" />
      </svg>
    );
  }

  if (name === 'history') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
        <path d="M12 7v5l3 2" />
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

function StatusBadge({ children }) {
  const tone = getStatusTone(children);

  return <span className={`booking-manager-badge booking-manager-badge--${tone}`}>{children}</span>;
}

function MetricCard({ label, value, note, trend, icon, tone = 'neutral' }) {
  return (
    <article className={`booking-manager-metric-card booking-manager-metric-card--${tone}`}>
      <div className="booking-manager-metric-card__icon">
        <Icon name={icon} />
      </div>
      <div className="booking-manager-metric-card__body">
        <p className="booking-manager-metric-card__label">{label}</p>
        <h3 className="booking-manager-metric-card__value">{value}</h3>
        <div className="booking-manager-metric-card__footer">
          <span>{note}</span>
          {trend ? <span className="booking-manager-trend">{trend}</span> : null}
        </div>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`booking-manager-panel ${className}`.trim()}>
      <header className="booking-manager-panel__header">
        <div>
          <h2 className="booking-manager-panel__title">{title}</h2>
          {subtitle ? <p className="booking-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="booking-manager-empty-state">
      <div className="booking-manager-empty-state__icon">
        <Icon name="search" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProgressList({ items, formatValue }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="booking-manager-progress-list">
      {items.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 14);

        return (
          <div key={item.label} className="booking-manager-progress-list__item">
            <div className="booking-manager-progress-list__header">
              <strong>{item.label}</strong>
              <span>{formatValue(item.value)}</span>
            </div>
            <div className="booking-manager-progress-list__track">
              <div className="booking-manager-progress-list__bar" style={{ width: `${width}%` }} />
            </div>
            {item.note ? <p className="booking-manager-progress-list__note">{item.note}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function WorkloadChart({ items }) {
  const maxValue = Math.max(...items.map((item) => item.occupiedBlocks), 1);

  return (
    <div className="booking-manager-week-load">
      {items.map((item) => {
        const height = Math.max((item.occupiedBlocks / maxValue) * 100, 12);

        return (
          <div key={item.day} className="booking-manager-week-load__item">
            <div className="booking-manager-week-load__track">
              <div className="booking-manager-week-load__bar" style={{ height: `${height}%` }} />
            </div>
            <div className="booking-manager-week-load__meta">
              <strong>{item.day.slice(0, 3)}</strong>
              <span>{item.occupiedBlocks} ocupados</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function BookingManagerPage() {
  const demo = bookingManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi negocio.`,
  );

  const servicePriceMap = Object.fromEntries(
    demo.services.map((service) => [service.name, service.price]),
  );

  const appointmentsSorted = [...demo.appointments].sort(
    (left, right) => new Date(left.dateTime) - new Date(right.dateTime),
  );

  const appointmentsToday = appointmentsSorted.filter((item) =>
    item.dateTime.startsWith('2026-06-20'),
  );
  const confirmedAppointments = demo.appointments.filter((item) => item.status === 'confirmada');
  const pendingAppointments = demo.appointments.filter((item) => item.status === 'pendiente');
  const cancelledAppointments = demo.appointments.filter((item) => item.status === 'cancelada');
  const newClients = demo.clients.filter((item) => item.status === 'nuevo');
  const activeClients = demo.clients.filter((item) => ['activo', 'recurrente'].includes(item.status));
  const activeServices = demo.services.filter((item) => item.status === 'activo');
  const availabilityOpenSlots = sumBy(demo.availability.workdays, 'openSlots');
  const availabilityBusyBlocks = sumBy(demo.availability.workdays, 'occupiedBlocks');
  const historyCompleted = demo.history.filter((item) => item.status === 'completada');
  const historyCancelled = demo.history.filter((item) => item.status === 'cancelada');
  const historyNoShow = demo.history.filter((item) => item.status === 'no-asistio');
  const attendanceRate = Math.round(
    (historyCompleted.length / (historyCompleted.length + historyCancelled.length + historyNoShow.length)) *
      100,
  );
  const revenueThisMonth = historyCompleted.reduce(
    (total, item) => total + (servicePriceMap[item.service] ?? 0),
    0,
  );
  const upcomingAppointments = appointmentsSorted.filter((item) => {
    const appointmentDate = new Date(item.dateTime);

    return appointmentDate >= currentDate && ['confirmada', 'pendiente'].includes(item.status);
  });
  const weekGroups = demo.availability.workdays.map((workday) => {
    const matchingDay = appointmentsSorted.filter((item) =>
      formatDayLabel(item.dateTime).startsWith(workday.day.toLowerCase()),
    );

    return {
      ...workday,
      label: workday.day,
      appointments: matchingDay,
    };
  });

  const reminderPending = demo.reminders.filter((item) => item.status === 'pendiente').length;
  const reminderSent = demo.reminders.filter((item) => ['enviado', 'programado'].includes(item.status)).length;
  const reminderNoResponse = demo.reminders.filter((item) => item.status === 'no-respondio').length;
  const reminderMissed = demo.reminders.filter((item) => item.status === 'falto').length;

  const servicesDemand = [...demo.services]
    .sort((left, right) => right.monthlyAppointments - left.monthlyAppointments)
    .map((item) => ({
      label: item.name,
      value: item.monthlyAppointments,
      note: `${item.professional} · ${formatCurrency(item.price)}`,
    }));

  const filteredUpcomingAppointments = upcomingAppointments.filter((item) =>
    matchesQuery(query, [item.client, item.service, item.professional, item.status, item.dateTime]),
  );
  const filteredAlerts = demo.dashboard.alerts.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.level]),
  );
  const filteredServicesDemand = servicesDemand.filter((item) =>
    matchesQuery(query, [item.label, item.note]),
  );
  const filteredActivity = demo.dashboard.recentActivity.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.timestamp, item.type]),
  );
  const filteredClients = demo.clients.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.phone,
      item.status,
      item.notes,
      item.professional,
      item.lastAppointment,
      item.nextAppointment,
    ]),
  );
  const filteredServices = demo.services.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.professional,
      item.status,
      item.category,
      `${item.durationMinutes}`,
      `${item.price}`,
    ]),
  );
  const filteredReminders = demo.reminders.filter((item) =>
    matchesQuery(query, [
      item.client,
      item.type,
      item.status,
      item.note,
      item.professional,
      item.priority,
    ]),
  );
  const filteredHistory = demo.history.filter((item) =>
    matchesQuery(query, [item.client, item.service, item.status, item.payment, item.notes, item.dateTime]),
  );

  const filteredWeekGroups = weekGroups.map((day) => ({
    ...day,
    appointments: day.appointments.filter((item) =>
      matchesQuery(query, [item.client, item.service, item.professional, item.status, item.dateTime]),
    ),
  }));

  function setModule(moduleId) {
    setActiveModule(moduleId);
  }

  function showNotice(message) {
    setActionNotice(message);
  }

  function simulateQuickAction(moduleId, message) {
    setModule(moduleId);
    showNotice(message);
  }

  useEffect(() => {
    const nextHash = `#${activeModule}`;
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;

    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [activeModule]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveModule(getModuleFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!actionNotice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActionNotice('');
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [actionNotice]);

  const visibleModule = bookingManagerModules.find((item) => item.id === activeModule) ?? bookingManagerModules[0];
  const visibleModuleMeta = moduleMeta[visibleModule.id];
  const moduleCounters = {
    dashboard: 'Live',
    agenda: formatNumber(upcomingAppointments.length),
    clientes: formatNumber(demo.clients.length),
    servicios: formatNumber(activeServices.length),
    disponibilidad: formatNumber(demo.availability.workdays.length),
    recordatorios: formatNumber(demo.reminders.length),
    historial: formatNumber(demo.history.length),
    configuracion: formatNumber(demo.settings.integrations.length),
  };

  function renderDashboard() {
    return (
      <>
        <section className="booking-manager-metrics-grid">
          <MetricCard
            icon="calendar"
            label="Citas de hoy"
            note="Agenda del sabado"
            tone="info"
            trend={`${appointmentsToday.length} espacios`}
            value={formatNumber(appointmentsToday.length)}
          />
          <MetricCard
            icon="spark"
            label="Citas confirmadas"
            note="En agenda visible"
            tone="success"
            trend={`${confirmedAppointments.length} confirmadas`}
            value={formatNumber(confirmedAppointments.length)}
          />
          <MetricCard
            icon="clock"
            label="Citas pendientes"
            note="Faltan por confirmar"
            tone="warning"
            trend="Seguimiento activo"
            value={formatNumber(pendingAppointments.length)}
          />
          <MetricCard
            icon="history"
            label="Cancelaciones"
            note="Semana actual"
            tone="danger"
            trend={`${cancelledAppointments.length} canceladas`}
            value={formatNumber(cancelledAppointments.length)}
          />
          <MetricCard
            icon="users"
            label="Clientes nuevos"
            note="Captados este mes"
            tone="info"
            trend="Bienvenida automatizable"
            value={formatNumber(newClients.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Tasa de asistencia"
            note="Completadas vs incidencias"
            tone="success"
            trend={`${historyCompleted.length} citas completadas`}
            value={`${attendanceRate}%`}
          />
        </section>

        <section className="booking-manager-grid">
          <Panel
            className="booking-manager-panel--span-2"
            subtitle="Siguientes citas con prioridad operativa."
            title="Proximas citas"
          >
            {filteredUpcomingAppointments.length ? (
              <div className="booking-manager-stack">
                {filteredUpcomingAppointments.slice(0, 5).map((item) => (
                  <article key={item.id} className="booking-manager-list-card">
                    <div className="booking-manager-list-card__header">
                      <div>
                        <strong>{item.client}</strong>
                        <p>
                          {item.service} · {item.professional}
                        </p>
                      </div>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                    <div className="booking-manager-list-card__meta">
                      <span>{formatDateTime(item.dateTime)}</span>
                      <span>{item.durationMinutes} min</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="Prueba con otro cliente, servicio o profesional."
                title="No hay citas visibles para este filtro"
              />
            )}
          </Panel>

          <Panel subtitle="Seguimiento critico para no perder asistencia." title="Alertas importantes">
            {filteredAlerts.length ? (
              <div className="booking-manager-stack">
                {filteredAlerts.map((item) => (
                  <article key={item.title} className="booking-manager-alert-card">
                    <div className="booking-manager-alert-card__header">
                      <strong>{item.title}</strong>
                      <StatusBadge>{item.level}</StatusBadge>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay alertas asociadas al filtro actual."
                title="Sin alertas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Servicios con mayor demanda este mes." title="Servicios mas solicitados">
            {filteredServicesDemand.length ? (
              <ProgressList items={filteredServicesDemand.slice(0, 4)} formatValue={formatNumber} />
            ) : (
              <EmptyState
                description="No se encontraron servicios relacionados con la busqueda."
                title="Sin servicios visibles"
              />
            )}
          </Panel>

          <Panel
            className="booking-manager-panel--span-2"
            subtitle="Ocupacion, tiempos y carga semanal del equipo."
            title="Resumen semanal"
          >
            <div className="booking-manager-summary-grid">
              {demo.dashboard.weeklySummary.map((item) => (
                <article key={item.label} className="booking-manager-summary-tile">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>

            <WorkloadChart items={demo.availability.workdays} />
          </Panel>

          <Panel
            className="booking-manager-panel--span-3"
            subtitle="Bitacora de cambios y movimientos recientes."
            title="Actividad reciente"
          >
            {filteredActivity.length ? (
              <div className="booking-manager-activity-list">
                {filteredActivity.map((item) => (
                  <article key={item.title} className="booking-manager-activity-list__item">
                    <div className="booking-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="booking-manager-activity-list__body">
                      <div className="booking-manager-activity-list__head">
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
                description="No hay actividad coincidente con la busqueda."
                title="Actividad no encontrada"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderAgenda() {
    const freeToday = demo.professionals.reduce((total, item) => total + item.freeSlotsToday, 0);

    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="calendar"
            label="Agenda de hoy"
            note="Citas registradas"
            tone="info"
            trend={`${appointmentsToday.length} bloques`}
            value={formatNumber(appointmentsToday.length)}
          />
          <MetricCard
            icon="users"
            label="Profesionales activos"
            note="En turno esta semana"
            tone="neutral"
            trend={`${demo.professionals.length} perfiles`}
            value={formatNumber(demo.professionals.length)}
          />
          <MetricCard
            icon="availability"
            label="Espacios libres"
            note="Capacidad de hoy"
            tone="success"
            trend="Slots reacomodables"
            value={formatNumber(freeToday)}
          />
          <MetricCard
            icon="clock"
            label="Duracion promedio"
            note="Tiempo por cita"
            tone="warning"
            trend="Entre 30 y 75 min"
            value="53 min"
          />
        </section>

        <section className="booking-manager-grid">
          <Panel
            className="booking-manager-panel--span-3"
            subtitle="Vista semanal adaptable por negocio, profesional y tipo de servicio."
            title="Agenda semanal"
          >
            <div className="booking-manager-schedule-grid">
              {filteredWeekGroups.map((day) => (
                <article key={day.day} className="booking-manager-day-card">
                  <header className="booking-manager-day-card__header">
                    <div>
                      <strong>{day.label}</strong>
                      <p>
                        {day.hours} · Descanso {day.breaks}
                      </p>
                    </div>
                    <span className="booking-manager-day-card__count">
                      {day.appointments.length}
                    </span>
                  </header>

                  {day.appointments.length ? (
                    <div className="booking-manager-day-card__list">
                      {day.appointments.map((item) => (
                        <article key={item.id} className="booking-manager-appointment-card">
                          <div className="booking-manager-appointment-card__header">
                            <div className="booking-manager-appointment-card__heading">
                              <span className="booking-manager-appointment-card__time">
                                {formatTime(item.dateTime)}
                              </span>
                              <strong>{item.client}</strong>
                            </div>
                            <StatusBadge>{item.status}</StatusBadge>
                          </div>
                          <div className="booking-manager-appointment-card__meta">
                            <span>{item.service}</span>
                            <span>{item.professional}</span>
                            <span>{item.durationMinutes} min</span>
                          </div>
                          <div className="booking-manager-inline-actions">
                            <button
                              className="booking-manager-inline-button"
                              onClick={() =>
                                showNotice(`Accion simulada: cita de ${item.client} marcada como confirmada.`)
                              }
                              type="button"
                            >
                              Confirmar
                            </button>
                            <button
                              className="booking-manager-inline-button booking-manager-inline-button--ghost"
                              onClick={() =>
                                showNotice(`Accion simulada: se reagendaria la cita de ${item.client}.`)
                              }
                              type="button"
                            >
                              Reagendar
                            </button>
                            <button
                              className="booking-manager-inline-button booking-manager-inline-button--ghost"
                              onClick={() =>
                                showNotice(`Accion simulada: cita de ${item.client} marcada como completada.`)
                              }
                              type="button"
                            >
                              Completar
                            </button>
                            <button
                              className="booking-manager-inline-button booking-manager-inline-button--danger"
                              onClick={() =>
                                showNotice(`Accion simulada: cita de ${item.client} cancelada.`)
                              }
                              type="button"
                            >
                              Cancelar
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="booking-manager-day-empty">
                      <p>No hay citas visibles para este dia.</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderClientes() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="users"
            label="Clientes activos"
            note="Activos y recurrentes"
            tone="success"
            trend={`${activeClients.length} vigentes`}
            value={formatNumber(activeClients.length)}
          />
          <MetricCard
            icon="spark"
            label="Clientes nuevos"
            note="Primera cita pendiente"
            tone="info"
            trend="Proceso de bienvenida"
            value={formatNumber(newClients.length)}
          />
          <MetricCard
            icon="history"
            label="Clientes inactivos"
            note="Oportunidad de rescate"
            tone="warning"
            trend="Seguimiento recomendado"
            value={formatNumber(demo.clients.filter((item) => item.status === 'inactivo').length)}
          />
        </section>

        <Panel subtitle="CRM simple para agenda, notas y seguimiento de clientes." title="Clientes">
          {filteredClients.length ? (
            <div className="booking-manager-table-shell">
              <table className="booking-manager-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Ultima cita</th>
                    <th>Proxima cita</th>
                    <th>Estado</th>
                    <th>Notas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="booking-manager-table__primary">
                          <strong>{item.name}</strong>
                          <span>{item.professional}</span>
                        </div>
                      </td>
                      <td>{item.phone}</td>
                      <td>{formatDate(item.lastAppointment)}</td>
                      <td>{formatDate(item.nextAppointment)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{item.notes}</td>
                      <td>
                        <div className="booking-manager-inline-actions">
                          <button
                            className="booking-manager-inline-button"
                            onClick={() =>
                              showNotice(`Accion simulada: se abriria WhatsApp con ${item.name}.`)
                            }
                            type="button"
                          >
                            <Icon name="message" />
                            WhatsApp
                          </button>
                          <button
                            className="booking-manager-inline-button booking-manager-inline-button--ghost"
                            onClick={() =>
                              showNotice(`Vista demo: se mostraria el historial de ${item.name}.`)
                            }
                            type="button"
                          >
                            <Icon name="eye" />
                            Ver historial
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
              description="Busca por nombre, telefono, estado o notas."
              title="No hay clientes para este filtro"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderServicios() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="services"
            label="Servicios activos"
            note="Disponibles para agenda"
            tone="success"
            trend={`${activeServices.length} activos`}
            value={formatNumber(activeServices.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Citas del mes"
            note="Volumen total"
            tone="info"
            trend="Demanda visible"
            value={formatNumber(sumBy(demo.services, 'monthlyAppointments'))}
          />
          <MetricCard
            icon="clock"
            label="Duracion media"
            note="Promedio del catalogo"
            tone="neutral"
            trend="Agenda estable"
            value="53 min"
          />
        </section>

        <Panel subtitle="Catalogo de servicios con precio, duracion y asignacion." title="Servicios">
          {filteredServices.length ? (
            <div className="booking-manager-service-grid">
              {filteredServices.map((item) => (
                <article key={item.id} className="booking-manager-service-card">
                  <div className="booking-manager-service-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.category}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>
                  <div className="booking-manager-service-card__stats">
                    <div>
                      <span>Duracion</span>
                      <strong>{item.durationMinutes} min</strong>
                    </div>
                    <div>
                      <span>Precio</span>
                      <strong>{formatCurrency(item.price)}</strong>
                    </div>
                    <div>
                      <span>Profesional</span>
                      <strong>{item.professional}</strong>
                    </div>
                    <div>
                      <span>Citas este mes</span>
                      <strong>{formatNumber(item.monthlyAppointments)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay servicios visibles con este filtro."
              title="Servicios no encontrados"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderDisponibilidad() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="availability"
            label="Dias laborales"
            note="Configurados para agenda"
            tone="info"
            trend="Semana operativa"
            value={formatNumber(demo.availability.workdays.length)}
          />
          <MetricCard
            icon="calendar"
            label="Bloques ocupados"
            note="Semana visible"
            tone="warning"
            trend="Carga actual"
            value={formatNumber(availabilityBusyBlocks)}
          />
          <MetricCard
            icon="spark"
            label="Espacios disponibles"
            note="Capacidad semanal"
            tone="success"
            trend="Aun se puede vender"
            value={formatNumber(availabilityOpenSlots)}
          />
          <MetricCard
            icon="users"
            label="Profesionales disponibles"
            note="Con horario activo"
            tone="neutral"
            trend="Cobertura completa"
            value={formatNumber(demo.professionals.length)}
          />
        </section>

        <section className="booking-manager-grid">
          <Panel
            className="booking-manager-panel--span-2"
            subtitle="Dias laborales, descansos y capacidad por jornada."
            title="Horarios disponibles"
          >
            <div className="booking-manager-availability-grid">
              {demo.availability.workdays.map((item) => (
                <article key={item.day} className="booking-manager-availability-card">
                  <div className="booking-manager-availability-card__header">
                    <strong>{item.day}</strong>
                    <span>{item.hours}</span>
                  </div>
                  <div className="booking-manager-availability-card__rows">
                    <div>
                      <span>Descanso</span>
                      <strong>{item.breaks}</strong>
                    </div>
                    <div>
                      <span>Bloques ocupados</span>
                      <strong>{item.occupiedBlocks}</strong>
                    </div>
                    <div>
                      <span>Espacios libres</span>
                      <strong>{item.openSlots}</strong>
                    </div>
                  </div>
                  <p>{item.professionals.join(', ')}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Equipo disponible y turnos configurados." title="Profesionales disponibles">
            <div className="booking-manager-stack">
              {demo.professionals.map((item) => (
                <article key={item.id} className="booking-manager-list-card">
                  <div className="booking-manager-list-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.role}</p>
                    </div>
                    <span className="booking-manager-pill booking-manager-pill--soft">
                      {item.freeSlotsToday} libres hoy
                    </span>
                  </div>
                  <div className="booking-manager-list-card__meta">
                    <span>{item.shift}</span>
                    <span>Break {item.breakWindow}</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel
            className="booking-manager-panel--span-3"
            subtitle="Bloques ocupados, descansos y referencias de agenda."
            title="Bloques ocupados"
          >
            <div className="booking-manager-block-grid">
              {demo.availability.blockedBlocks.map((item) => (
                <article key={`${item.day}-${item.time}-${item.professional}`} className="booking-manager-block-card">
                  <strong>{item.day}</strong>
                  <p>{item.time}</p>
                  <span>{item.reason}</span>
                  <small>{item.professional}</small>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderRecordatorios() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="bell"
            label="WhatsApp pendiente"
            note="Por enviar"
            tone="warning"
            trend="Confirmaciones activas"
            value={formatNumber(reminderPending)}
          />
          <MetricCard
            icon="spark"
            label="Confirmaciones enviadas"
            note="Pendientes de respuesta"
            tone="info"
            trend="Automatizable"
            value={formatNumber(reminderSent)}
          />
          <MetricCard
            icon="history"
            label="Cliente no respondio"
            note="Seguimiento manual"
            tone="danger"
            trend="Atencion prioritaria"
            value={formatNumber(reminderNoResponse)}
          />
          <MetricCard
            icon="calendar"
            label="Cliente falto"
            note="Rescate post cita"
            tone="danger"
            trend="Reactivar agenda"
            value={formatNumber(reminderMissed)}
          />
        </section>

        <Panel
          className="booking-manager-panel--span-3"
          subtitle="Seguimiento simulado por WhatsApp, confirmacion y asistencia."
          title="Recordatorios"
        >
          {filteredReminders.length ? (
            <div className="booking-manager-reminder-list">
              {filteredReminders.map((item) => (
                <article key={item.id} className="booking-manager-reminder-card">
                  <div className="booking-manager-reminder-card__header">
                    <div>
                      <strong>{item.client}</strong>
                      <p>
                        {item.type} · {item.professional}
                      </p>
                    </div>
                    <div className="booking-manager-reminder-card__badges">
                      <StatusBadge>{item.status}</StatusBadge>
                      <StatusBadge>{item.priority}</StatusBadge>
                    </div>
                  </div>
                  <div className="booking-manager-reminder-card__meta">
                    <span>{formatDateTime(item.appointmentDateTime)}</span>
                    <span>{item.note}</span>
                  </div>
                  <div className="booking-manager-inline-actions">
                    <button
                      className="booking-manager-inline-button"
                      onClick={() =>
                        showNotice(`Accion simulada: recordatorio enviado a ${item.client}.`)
                      }
                      type="button"
                    >
                      Enviar recordatorio
                    </button>
                    <button
                      className="booking-manager-inline-button booking-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: confirmacion reenviada a ${item.client}.`)
                      }
                      type="button"
                    >
                      Reenviar confirmacion
                    </button>
                    <button
                      className="booking-manager-inline-button booking-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: ${item.client} marcado como contactado.`)
                      }
                      type="button"
                    >
                      Marcar como contactado
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay recordatorios relacionados con la busqueda."
              title="Sin recordatorios visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderHistorial() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="history"
            label="Citas completadas"
            note="Historial visible"
            tone="success"
            trend="Base operativa"
            value={formatNumber(historyCompleted.length)}
          />
          <MetricCard
            icon="calendar"
            label="Cancelaciones"
            note="En historial"
            tone="warning"
            trend="Requiere aprendizaje"
            value={formatNumber(historyCancelled.length)}
          />
          <MetricCard
            icon="users"
            label="No show"
            note="Clientes que faltaron"
            tone="danger"
            trend="Seguimiento sugerido"
            value={formatNumber(historyNoShow.length)}
          />
          <MetricCard
            icon="services"
            label="Ingreso estimado"
            note="Citas completadas"
            tone="success"
            trend="Solo simulacion"
            value={formatCurrency(revenueThisMonth)}
          />
        </section>

        <Panel subtitle="Historial de citas, pagos y observaciones del negocio." title="Historial">
          {filteredHistory.length ? (
            <div className="booking-manager-table-shell">
              <table className="booking-manager-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Pago</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.client}</td>
                      <td>{item.service}</td>
                      <td>{formatDateTime(item.dateTime)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{item.payment}</td>
                      <td>{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por cliente, servicio, estado o nota."
              title="No hay historial visible"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderConfiguracion() {
    return (
      <>
        <section className="booking-manager-metrics-grid booking-manager-metrics-grid--compact">
          <MetricCard
            icon="services"
            label="Servicios activos"
            note="Configurados"
            tone="success"
            trend="Listos para agenda"
            value={formatNumber(demo.settings.activeServices.length)}
          />
          <MetricCard
            icon="users"
            label="Profesionales"
            note="Equipo visible"
            tone="info"
            trend="Asignables por servicio"
            value={formatNumber(demo.professionals.length)}
          />
          <MetricCard
            icon="settings"
            label="Integraciones"
            note="Conectadas o simuladas"
            tone="neutral"
            trend="Escalable"
            value={formatNumber(demo.settings.integrations.length)}
          />
        </section>

        <section className="booking-manager-grid booking-manager-grid--config">
          <Panel
            className="booking-manager-panel--span-2"
            subtitle="Pantalla visual no funcional."
            title="Identidad del negocio"
          >
            <div className="booking-manager-settings-grid">
              <div className="booking-manager-brand-card">
                <div className="booking-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.businessName}</strong>
                  <p>Consultorio demo para mostrar agenda, clientes y automatizaciones.</p>
                </div>
              </div>

              <div className="booking-manager-field-grid">
                <div className="booking-manager-field-card">
                  <span>Nombre del negocio</span>
                  <strong>{demo.settings.businessName}</strong>
                </div>
                <div className="booking-manager-field-card">
                  <span>Color principal</span>
                  <div className="booking-manager-color-preview">
                    <span
                      className="booking-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.settings.primaryColor }}
                    />
                    <strong>{demo.settings.primaryColor}</strong>
                  </div>
                </div>
                <div className="booking-manager-field-card">
                  <span>Soporte</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
                <div className="booking-manager-field-card">
                  <span>Plan sugerido</span>
                  <strong>{demo.business.plan}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Servicios activos visibles en el sistema." title="Servicios activos">
            <div className="booking-manager-chip-list">
              {demo.settings.activeServices.map((item) => (
                <span key={item} className="booking-manager-chip">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Profesionales configurados para agenda y servicios." title="Profesionales">
            <div className="booking-manager-stack">
              {demo.professionals.map((item) => (
                <article key={item.id} className="booking-manager-list-card">
                  <div className="booking-manager-list-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.role}</p>
                    </div>
                    <span className="booking-manager-pill booking-manager-pill--soft">
                      {item.shift}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel
            className="booking-manager-panel--span-3"
            subtitle="Integraciones simuladas para una version real del sistema."
            title="Integraciones"
          >
            <div className="booking-manager-integrations-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="booking-manager-integration-card">
                  <div className="booking-manager-integration-card__head">
                    <strong>{item.name}</strong>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderModuleContent() {
    if (activeModule === 'agenda') {
      return renderAgenda();
    }

    if (activeModule === 'clientes') {
      return renderClientes();
    }

    if (activeModule === 'servicios') {
      return renderServicios();
    }

    if (activeModule === 'disponibilidad') {
      return renderDisponibilidad();
    }

    if (activeModule === 'recordatorios') {
      return renderRecordatorios();
    }

    if (activeModule === 'historial') {
      return renderHistorial();
    }

    if (activeModule === 'configuracion') {
      return renderConfiguracion();
    }

    return renderDashboard();
  }

  return (
    <div
      className="booking-manager-demo"
      style={{
        '--booking-manager-primary': demo.business.primaryColor,
        '--booking-manager-accent': demo.business.accentColor,
      }}
    >
      <div className="booking-manager-app-shell">
        <aside className="booking-manager-sidebar">
          <div className="booking-manager-sidebar__header">
            <span className="booking-manager-pill">Demo Booking / Agenda</span>
            <h2>{demo.appName}</h2>
            <p>Propuesta visual para administrar citas, clientes, disponibilidad y recordatorios.</p>
          </div>

          <div className="booking-manager-sidebar__business">
            <div className="booking-manager-sidebar__mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} · {demo.business.plan}
              </span>
            </div>
          </div>

          <nav className="booking-manager-sidebar__nav" aria-label="Modulos del sistema de agenda">
            {bookingManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`booking-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="booking-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="booking-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="booking-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="booking-manager-sidebar__footer">
            <div className="booking-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Respuesta demo estimada: {demo.business.responseTime}</span>
            </div>

            <div className="booking-manager-sidebar__actions">
              <Link className="booking-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a
                className="booking-manager-primary-link"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="booking-manager-main">
          <header className="booking-manager-topbar">
            <div className="booking-manager-topbar__identity">
              <div>
                <p className="booking-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleModuleMeta.description}</p>
              </div>
            </div>

            <label className="booking-manager-search">
              <span className="booking-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar cliente, cita, servicio o profesional..."
                type="search"
                value={query}
              />
            </label>

            <div className="booking-manager-topbar__actions">
              <button
                className="booking-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'agenda',
                    'Accion simulada: se abriria el formulario para crear una nueva cita.',
                  )
                }
                type="button"
              >
                Nueva cita
              </button>
              <button
                className="booking-manager-topbar__button booking-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'clientes',
                    'Accion simulada: se abriria el formulario para registrar un nuevo cliente.',
                  )
                }
                type="button"
              >
                Nuevo cliente
              </button>
              <a
                className="booking-manager-topbar__button booking-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="booking-manager-banner">
            <div>
              <span className="booking-manager-pill">Demo visual con datos simulados</span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="booking-manager-banner__aside">
              <div className="booking-manager-banner__stat">
                <span>Meta del mes</span>
                <strong>{formatCurrency(demo.business.monthlyGoal)}</strong>
              </div>
              <div className="booking-manager-banner__stat">
                <span>Ingreso estimado</span>
                <strong>{formatCurrency(revenueThisMonth)}</strong>
              </div>
            </div>
          </section>

          <section className="booking-manager-module-intro">
            <div>
              <span className="booking-manager-pill booking-manager-pill--soft">{visibleModule.label}</span>
              <h2>{demo.business.name}</h2>
              <p>
                Consultorio demo enfocado en agenda, disponibilidad, seguimiento de clientes y
                recordatorios operativos.
              </p>
            </div>

            <div className="booking-manager-module-intro__stats">
              <div>
                <span>Busqueda activa</span>
                <strong>{query.trim() ? query : 'Sin filtro'}</strong>
              </div>
              <div>
                <span>Equipo disponible</span>
                <strong>{formatNumber(demo.professionals.length)} profesionales</strong>
              </div>
            </div>
          </section>

          <div className="booking-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="booking-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
