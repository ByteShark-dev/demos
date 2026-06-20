import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { businessManagerDemoData, businessManagerModules } from '../data/businessManagerDemo.js';
import '../styles/business-manager.css';

const currentDate = new Date('2026-06-20T09:00:00');

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const compactNumberFormatter = new Intl.NumberFormat('es-MX', {
  notation: 'compact',
  maximumFractionDigits: 1,
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

const moduleMeta = {
  dashboard: {
    description: 'Operacion general, pipeline y seguimiento diario.',
    icon: 'dashboard',
  },
  clientes: {
    description: 'Base de clientes, estados y proximas acciones.',
    icon: 'users',
  },
  ventas: {
    description: 'Facturacion, estados de cobro y ticket promedio.',
    icon: 'sales',
  },
  citas: {
    description: 'Agenda comercial y operativa con acciones rapidas.',
    icon: 'calendar',
  },
  cobranza: {
    description: 'Cobros pendientes, prioridades y recordatorios.',
    icon: 'collections',
  },
  reportes: {
    description: 'Metricas, tendencia de ventas y conversion.',
    icon: 'reports',
  },
  configuracion: {
    description: 'Ajustes visuales, modulos e integraciones.',
    icon: 'settings',
  },
};

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function formatCompactNumber(value) {
  return compactNumberFormatter.format(value);
}

function formatNumber(value) {
  return numberFormatter.format(value);
}

function formatDate(value) {
  return dateFormatter.format(new Date(`${value}T12:00:00`));
}

function formatDateTime(value) {
  return dateTimeFormatter.format(new Date(value));
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

  return businessManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getStatusTone(status) {
  const normalizedStatus = normalizeText(status);

  if (
    ['activo', 'pagado', 'confirmada', 'completada', 'vip', 'activa', 'alta'].includes(
      normalizedStatus,
    )
  ) {
    return normalizedStatus === 'alta' ? 'danger' : 'success';
  }

  if (['nuevo'].includes(normalizedStatus)) {
    return 'info';
  }

  if (['pendiente', 'media', 'simulada'].includes(normalizedStatus)) {
    return 'warning';
  }

  if (['perdido', 'vencido', 'cancelada'].includes(normalizedStatus)) {
    return 'danger';
  }

  return 'neutral';
}

function getActivityIcon(type) {
  if (type === 'venta') {
    return 'sales';
  }

  if (type === 'cita') {
    return 'calendar';
  }

  if (type === 'cobranza') {
    return 'collections';
  }

  if (type === 'reporte') {
    return 'reports';
  }

  return 'users';
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

  if (name === 'sales') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h10" />
        <rect x="3" y="4" width="18" height="16" rx="3" />
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

  if (name === 'collections') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M9.5 9a2.5 2.5 0 1 1 5 0c0 1.7-2.5 2.1-2.5 4" />
        <path d="M12 17h.01" />
        <path d="M5 19h14l-1-11a6 6 0 1 0-12 0Z" />
      </svg>
    );
  }

  if (name === 'reports') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 19V5" />
        <path d="M9 19V9" />
        <path d="M14 19v-5" />
        <path d="M19 19v-9" />
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

  if (name === 'menu') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h12" />
      </svg>
    );
  }

  if (name === 'close') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
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

  return <span className={`business-manager-badge business-manager-badge--${tone}`}>{children}</span>;
}

function MetricCard({ label, value, note, trend, icon, tone = 'neutral' }) {
  return (
    <article className={`business-manager-metric-card business-manager-metric-card--${tone}`}>
      <div className="business-manager-metric-card__icon">
        <Icon name={icon} />
      </div>
      <div>
        <p className="business-manager-metric-card__label">{label}</p>
        <h3 className="business-manager-metric-card__value">{value}</h3>
        <div className="business-manager-metric-card__footer">
          <span>{note}</span>
          {trend ? <span className="business-manager-trend">{trend}</span> : null}
        </div>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`business-manager-panel ${className}`.trim()}>
      <header className="business-manager-panel__header">
        <div>
          <h2 className="business-manager-panel__title">{title}</h2>
          {subtitle ? <p className="business-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="business-manager-empty-state">
      <div className="business-manager-empty-state__icon">
        <Icon name="search" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function LineChart({ data, chartId, formatValue }) {
  const width = 420;
  const height = 200;
  const padding = 24;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const steps = Math.max(data.length - 1, 1);
  const points = data.map((item, index) => {
    const x = padding + ((width - padding * 2) * index) / steps;
    const y = height - padding - ((height - padding * 2) * item.value) / maxValue;

    return {
      ...item,
      x,
      y,
    };
  });
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = [
    `M ${points[0].x} ${height - padding}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1].x} ${height - padding}`,
    'Z',
  ].join(' ');

  return (
    <div className="business-manager-line-chart">
      <svg
        aria-hidden="true"
        className="business-manager-line-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id={`${chartId}-stroke`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0.48)" />
            <stop offset="100%" stopColor="rgba(8, 145, 178, 0.96)" />
          </linearGradient>
          <linearGradient id={`${chartId}-fill`} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0.28)" />
            <stop offset="100%" stopColor="rgba(15, 118, 110, 0.02)" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((step) => {
          const y = height - padding - (height - padding * 2) * step;

          return (
            <line
              key={step}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="rgba(148, 163, 184, 0.16)"
              strokeDasharray="4 6"
            />
          );
        })}

        <path d={areaPath} fill={`url(#${chartId}-fill)`} />
        <path d={linePath} fill="none" stroke={`url(#${chartId}-stroke)`} strokeWidth="3" />

        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} fill="#ffffff" r="5.5" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx={point.x} cy={point.y} fill="#14b8a6" r="2" />
          </g>
        ))}
      </svg>

      <div className="business-manager-line-chart__footer">
        {points.map((point) => (
          <div key={point.label} className="business-manager-line-chart__item">
            <span>{point.label}</span>
            <strong>{formatValue(point.value)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBarChart({ data, formatValue }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="business-manager-bar-chart">
      {data.map((item) => {
        const height = Math.max((item.value / maxValue) * 100, 8);

        return (
          <div key={item.label} className="business-manager-bar-chart__item">
            <div className="business-manager-bar-chart__track">
              <div className="business-manager-bar-chart__bar" style={{ height: `${height}%` }} />
            </div>
            <div className="business-manager-bar-chart__meta">
              <span>{item.label}</span>
              <strong>{formatValue(item.value)}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressList({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="business-manager-progress-list">
      {data.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 12);

        return (
          <div key={item.label} className="business-manager-progress-list__item">
            <div className="business-manager-progress-list__header">
              <strong>{item.label}</strong>
              <span>{formatNumber(item.value)} ventas</span>
            </div>
            <div className="business-manager-progress-list__track">
              <div className="business-manager-progress-list__bar" style={{ width: `${width}%` }} />
            </div>
            <p className="business-manager-progress-list__note">
              Ingreso estimado: {formatCurrency(item.revenue)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function BusinessManagerPage() {
  const demo = businessManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi negocio.`,
  );

  const salesThisMonth = sumBy(demo.sales, 'amount');
  const activeCustomers = demo.customers.filter((item) => ['activo', 'vip'].includes(item.status)).length;
  const newLeads = demo.customers.filter((item) => item.status === 'nuevo').length;
  const upcomingAppointments = demo.appointments.filter((item) => {
    const appointmentDate = new Date(item.dateTime);

    return appointmentDate >= currentDate && ['pendiente', 'confirmada'].includes(item.status);
  }).length;
  const pendingCollections = sumBy(demo.collections, 'pendingAmount');
  const paidSales = demo.sales.filter((item) => item.status === 'pagado');
  const paidSalesTotal = sumBy(paidSales, 'amount');
  const pendingSales = demo.sales.filter((item) => ['pendiente', 'vencido'].includes(item.status));
  const pendingSalesTotal = sumBy(pendingSales, 'amount');
  const averageTicket = Math.round(salesThisMonth / demo.sales.length);
  const conversionRate = demo.reports.conversionRate;
  const monthlyGoalProgress = Math.round((salesThisMonth / demo.business.monthlyGoal) * 100);
  const criticalCollections = demo.collections.filter((item) => item.priority === 'alta').length;
  const averageOverdueDays = Math.round(sumBy(demo.collections, 'daysOverdue') / demo.collections.length);
  const confirmedAppointments = demo.appointments.filter((item) => item.status === 'confirmada').length;
  const pendingAppointments = demo.appointments.filter((item) => item.status === 'pendiente').length;
  const completedAppointments = demo.appointments.filter((item) => item.status === 'completada').length;
  const cancelledAppointments = demo.appointments.filter((item) => item.status === 'cancelada').length;
  const activeModulesCount = demo.settings.modulesActive.filter((item) => item.enabled).length;
  const activeIntegrationsCount = demo.settings.integrations.filter((item) => item.status === 'activa').length;
  const topService = demo.reports.topServices[0];

  const filteredCustomers = demo.customers.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.phone,
      item.customerType,
      item.status,
      item.owner,
      item.nextAction,
      item.notes,
    ]),
  );

  const filteredSales = demo.sales.filter((item) =>
    matchesQuery(query, [
      item.customer,
      item.product,
      item.status,
      item.date,
      item.paymentMethod,
      item.id,
    ]),
  );

  const filteredAppointments = demo.appointments.filter((item) =>
    matchesQuery(query, [item.customer, item.service, item.status, item.dateTime, item.owner, item.id]),
  );

  const filteredCollections = demo.collections.filter((item) =>
    matchesQuery(query, [item.customer, item.invoice, item.priority, item.channel, item.dueDate]),
  );

  const filteredAlerts = demo.dashboard.alertCustomers.filter((item) =>
    matchesQuery(query, [item.customer, item.reason, item.level]),
  );

  const filteredActions = demo.dashboard.upcomingActions.filter((item) =>
    matchesQuery(query, [item.title, item.owner, item.dueDate, item.note]),
  );

  const filteredActivity = demo.dashboard.recentActivity.filter((item) =>
    matchesQuery(query, [item.title, item.description, item.timestamp, item.type]),
  );

  function setModule(moduleId) {
    setActiveModule(moduleId);
    setSidebarOpen(false);
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

  const visibleModule = businessManagerModules.find((item) => item.id === activeModule) ?? businessManagerModules[0];
  const visibleModuleMeta = moduleMeta[visibleModule.id];
  const moduleCounters = {
    dashboard: 'Live',
    clientes: formatNumber(demo.customers.length),
    ventas: formatNumber(pendingSales.length),
    citas: formatNumber(upcomingAppointments),
    cobranza: formatNumber(demo.collections.length),
    reportes: '6M',
    configuracion: `${activeModulesCount}`,
  };

  function renderDashboard() {
    return (
      <>
        <section className="business-manager-metrics-grid">
          <MetricCard
            icon="sales"
            label="Ventas del mes"
            note="Acumulado junio 2026"
            tone="success"
            trend={`${monthlyGoalProgress}% de la meta`}
            value={formatCurrency(salesThisMonth)}
          />
          <MetricCard
            icon="users"
            label="Clientes activos"
            note="Activos + VIP"
            tone="neutral"
            trend={`${formatNumber(demo.customers.length)} en base`}
            value={formatNumber(activeCustomers)}
          />
          <MetricCard
            icon="calendar"
            label="Citas proximas"
            note="Siguientes 7 dias"
            tone="info"
            trend={`${confirmedAppointments} confirmadas`}
            value={formatNumber(upcomingAppointments)}
          />
          <MetricCard
            icon="collections"
            label="Pagos pendientes"
            note="Cobranza abierta"
            tone="warning"
            trend={`${criticalCollections} cuentas criticas`}
            value={formatCurrency(pendingCollections)}
          />
          <MetricCard
            icon="spark"
            label="Leads nuevos"
            note="Captados este mes"
            tone="info"
            trend="4 con seguimiento hoy"
            value={formatNumber(newLeads)}
          />
          <MetricCard
            icon="reports"
            label="Conversion de clientes"
            note="Lead a venta"
            tone="success"
            trend="+6 pts vs marzo"
            value={`${conversionRate}%`}
          />
        </section>

        <section className="business-manager-dashboard-grid">
          <Panel
            className="business-manager-panel--span-2"
            subtitle="Tendencia comercial del primer semestre."
            title="Grafica de ventas por mes"
          >
            <LineChart
              chartId="business-manager-sales"
              data={demo.dashboard.salesByMonth}
              formatValue={formatCurrency}
            />
          </Panel>

          <Panel subtitle="Cuentas que requieren intervencion inmediata." title="Clientes con alerta">
            {filteredAlerts.length ? (
              <div className="business-manager-stack">
                {filteredAlerts.map((item) => (
                  <article key={item.customer} className="business-manager-alert-card">
                    <div className="business-manager-alert-card__header">
                      <strong>{item.customer}</strong>
                      <StatusBadge>{item.level}</StatusBadge>
                    </div>
                    <p>{item.reason}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="Prueba con otro nombre o limpia la busqueda."
                title="No hay alertas para este filtro"
              />
            )}
          </Panel>

          <Panel
            className="business-manager-panel--span-2"
            subtitle="Actividades priorizadas por impacto comercial."
            title="Proximas acciones comerciales"
          >
            {filteredActions.length ? (
              <div className="business-manager-stack">
                {filteredActions.map((item) => (
                  <article key={item.title} className="business-manager-task-card">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.note}</p>
                    </div>
                    <div className="business-manager-task-card__meta">
                      <span>{item.owner}</span>
                      <span>{formatDate(item.dueDate)}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No se encontraron acciones relacionadas con la busqueda."
                title="Sin acciones visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Vista rapida del equipo de cobro." title="Resumen de cobranza">
            <div className="business-manager-summary-list">
              {demo.dashboard.collectionSummary.map((item) => (
                <div key={item.label} className="business-manager-summary-list__item">
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.note}</p>
                  </div>
                  <span>{typeof item.value === 'number' && item.value > 9 ? formatCurrency(item.value) : item.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            className="business-manager-panel--span-3"
            subtitle="Registro visual del ritmo operativo del negocio."
            title="Actividad reciente"
          >
            {filteredActivity.length ? (
              <div className="business-manager-activity-list">
                {filteredActivity.map((item) => (
                  <article key={item.title} className="business-manager-activity-list__item">
                    <div className="business-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="business-manager-activity-list__body">
                      <div className="business-manager-activity-list__head">
                        <strong>{item.title}</strong>
                        <span>{item.timestamp}</span>
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay actividad que coincida con el filtro actual."
                title="Actividad no encontrada"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderClientes() {
    const vipCount = demo.customers.filter((item) => item.status === 'vip').length;

    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="users"
            label="Base de clientes"
            note="Registros visibles"
            tone="neutral"
            trend={`${formatNumber(filteredCustomers.length)} filtrados`}
            value={formatNumber(demo.customers.length)}
          />
          <MetricCard
            icon="spark"
            label="Leads nuevos"
            note="A la espera de contacto"
            tone="info"
            trend="Alta prioridad comercial"
            value={formatNumber(newLeads)}
          />
          <MetricCard
            icon="reports"
            label="Clientes VIP"
            note="Mayor potencial de recompra"
            tone="success"
            trend="Renovacion activa"
            value={formatNumber(vipCount)}
          />
        </section>

        <Panel subtitle="Tabla CRM con estados y acciones simuladas." title="Clientes">
          {filteredCustomers.length ? (
            <div className="business-manager-table-shell">
              <table className="business-manager-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Tipo de cliente</th>
                    <th>Estado</th>
                    <th>Ultimo contacto</th>
                    <th>Proxima accion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="business-manager-table__primary">
                          <strong>{item.name}</strong>
                          <span>{item.owner}</span>
                        </div>
                      </td>
                      <td>{item.phone}</td>
                      <td>{item.customerType}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{formatDate(item.lastContact)}</td>
                      <td>
                        <div className="business-manager-table__primary">
                          <strong>{item.nextAction}</strong>
                          <span>{formatDate(item.nextActionDate)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="business-manager-table__actions">
                          <button
                            className="business-manager-inline-button"
                            onClick={() =>
                              showNotice(`Accion simulada: se abriria WhatsApp con ${item.name}.`)
                            }
                            type="button"
                          >
                            <Icon name="message" />
                            WhatsApp
                          </button>
                          <button
                            className="business-manager-inline-button business-manager-inline-button--ghost"
                            onClick={() =>
                              showNotice(`Vista demo: se mostraria el expediente de ${item.name}.`)
                            }
                            type="button"
                          >
                            <Icon name="eye" />
                            Ver detalles
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
              description="Busca por nombre, estado, telefono o siguiente accion."
              title="No hay clientes para este filtro"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderVentas() {
    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="sales"
            label="Facturado"
            note="Total del mes"
            tone="success"
            trend={`${formatNumber(filteredSales.length)} ventas`}
            value={formatCurrency(salesThisMonth)}
          />
          <MetricCard
            icon="reports"
            label="Cobrado"
            note="Ingresos cerrados"
            tone="success"
            trend={`${Math.round((paidSalesTotal / salesThisMonth) * 100)}% del total`}
            value={formatCurrency(paidSalesTotal)}
          />
          <MetricCard
            icon="collections"
            label="Pendiente o vencido"
            note="Requiere seguimiento"
            tone="warning"
            trend={`${pendingSales.length} operaciones`}
            value={formatCurrency(pendingSalesTotal)}
          />
          <MetricCard
            icon="spark"
            label="Ticket promedio"
            note="Valor por venta"
            tone="info"
            trend="Servicios + membresias"
            value={formatCurrency(averageTicket)}
          />
        </section>

        <Panel subtitle="Ventas del periodo con estados y metodo de pago." title="Ventas">
          {filteredSales.length ? (
            <div className="business-manager-table-shell">
              <table className="business-manager-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Servicio / producto</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Metodo de pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((item) => (
                    <tr key={item.id}>
                      <td>{item.customer}</td>
                      <td>{item.product}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Intenta buscar por cliente, servicio, metodo de pago o estado."
              title="No hay ventas para este filtro"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderCitas() {
    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="calendar"
            label="Pendientes"
            note="Por confirmar o reagendar"
            tone="warning"
            trend="Agenda operativa"
            value={formatNumber(pendingAppointments)}
          />
          <MetricCard
            icon="reports"
            label="Confirmadas"
            note="Listas para atencion"
            tone="success"
            trend="Sincronizadas"
            value={formatNumber(confirmedAppointments)}
          />
          <MetricCard
            icon="spark"
            label="Completadas"
            note="Cerradas en la semana"
            tone="info"
            trend="Seguimiento en CRM"
            value={formatNumber(completedAppointments)}
          />
          <MetricCard
            icon="collections"
            label="Canceladas"
            note="Requieren rescate"
            tone="danger"
            trend="1 por reactivar"
            value={formatNumber(cancelledAppointments)}
          />
        </section>

        <Panel subtitle="Agenda tipo lista con acciones operativas simuladas." title="Citas">
          {filteredAppointments.length ? (
            <div className="business-manager-appointment-list">
              {filteredAppointments.map((item) => (
                <article key={item.id} className="business-manager-appointment-card">
                  <div className="business-manager-appointment-card__time">
                    <span>{formatDateTime(item.dateTime)}</span>
                  </div>

                  <div className="business-manager-appointment-card__body">
                    <div className="business-manager-appointment-card__header">
                      <div>
                        <strong>{item.customer}</strong>
                        <p>{item.service}</p>
                      </div>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>

                    <div className="business-manager-appointment-card__meta">
                      <span>Responsable: {item.owner}</span>
                      <span>ID: {item.id}</span>
                    </div>

                    <div className="business-manager-table__actions">
                      <button
                        className="business-manager-inline-button"
                        onClick={() =>
                          showNotice(`Accion simulada: cita de ${item.customer} marcada como confirmada.`)
                        }
                        type="button"
                      >
                        Confirmar
                      </button>
                      <button
                        className="business-manager-inline-button business-manager-inline-button--ghost"
                        onClick={() =>
                          showNotice(`Accion simulada: se abriria flujo para reagendar a ${item.customer}.`)
                        }
                        type="button"
                      >
                        Reagendar
                      </button>
                      <button
                        className="business-manager-inline-button business-manager-inline-button--danger"
                        onClick={() =>
                          showNotice(`Accion simulada: se cancelaria la cita de ${item.customer}.`)
                        }
                        type="button"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Busca por cliente, servicio, estado o responsable."
              title="No hay citas visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderCobranza() {
    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="collections"
            label="Pendiente total"
            note="Cobranza abierta"
            tone="warning"
            trend={`${demo.collections.length} cuentas`}
            value={formatCurrency(pendingCollections)}
          />
          <MetricCard
            icon="reports"
            label="Clientes vencidos"
            note="Prioridad alta"
            tone="danger"
            trend="Requieren contacto hoy"
            value={formatNumber(criticalCollections)}
          />
          <MetricCard
            icon="clock"
            label="Atraso promedio"
            note="Dias de mora"
            tone="neutral"
            trend="Por arriba de objetivo"
            value={`${averageOverdueDays} dias`}
          />
          <MetricCard
            icon="message"
            label="Canal principal"
            note="Recordatorios operativos"
            tone="info"
            trend="WhatsApp lidera"
            value="WhatsApp"
          />
        </section>

        <Panel subtitle="Clientes con pagos vencidos y accion de recordatorio." title="Cobranza">
          {filteredCollections.length ? (
            <div className="business-manager-table-shell">
              <table className="business-manager-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Monto pendiente</th>
                    <th>Dias de atraso</th>
                    <th>Prioridad</th>
                    <th>Factura</th>
                    <th>Canal sugerido</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollections.map((item) => (
                    <tr key={item.id}>
                      <td>{item.customer}</td>
                      <td>{formatCurrency(item.pendingAmount)}</td>
                      <td>{item.daysOverdue}</td>
                      <td>
                        <StatusBadge>{item.priority}</StatusBadge>
                      </td>
                      <td>
                        <div className="business-manager-table__primary">
                          <strong>{item.invoice}</strong>
                          <span>Vence: {formatDate(item.dueDate)}</span>
                        </div>
                      </td>
                      <td>{item.channel}</td>
                      <td>
                        <button
                          className="business-manager-inline-button"
                          onClick={() =>
                            showNotice(`Accion simulada: recordatorio enviado a ${item.customer}.`)
                          }
                          type="button"
                        >
                          Enviar recordatorio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por cliente, factura, prioridad o canal."
              title="No hay cuentas de cobranza para este filtro"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderReportes() {
    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="reports"
            label="Tasa de conversion"
            note="Lead a venta"
            tone="success"
            trend="+6 pts trimestral"
            value={`${conversionRate}%`}
          />
          <MetricCard
            icon="sales"
            label="Meta mensual"
            note="Avance actual"
            tone="info"
            trend={`${monthlyGoalProgress}% cumplido`}
            value={formatCurrency(demo.business.monthlyGoal)}
          />
          <MetricCard
            icon="collections"
            label="Cobranza recuperada"
            note="Junio 2026"
            tone="success"
            trend="Maximo del semestre"
            value={formatCurrency(demo.reports.collectionRecoveredByMonth.at(-1).value)}
          />
          <MetricCard
            icon="spark"
            label="Servicio estrella"
            note="Mayor ingreso"
            tone="neutral"
            trend={`${topService.value} ventas`}
            value={topService.label}
          />
        </section>

        <section className="business-manager-dashboard-grid">
          <Panel
            className="business-manager-panel--span-2"
            subtitle="Comparativo simple para direccion."
            title="Ventas por mes"
          >
            <LineChart
              chartId="business-manager-report-sales"
              data={demo.dashboard.salesByMonth}
              formatValue={formatCurrency}
            />
          </Panel>

          <Panel subtitle="Captacion comercial por mes." title="Clientes nuevos por mes">
            <MiniBarChart data={demo.reports.newCustomersByMonth} formatValue={formatNumber} />
          </Panel>

          <Panel
            className="business-manager-panel--span-2"
            subtitle="Ranking compacto de servicios mas vendidos."
            title="Servicios mas vendidos"
          >
            <ProgressList data={demo.reports.topServices} />
          </Panel>

          <Panel subtitle="Recuperacion de cartera." title="Cobranza recuperada">
            <LineChart
              chartId="business-manager-report-collections"
              data={demo.reports.collectionRecoveredByMonth}
              formatValue={formatCurrency}
            />
          </Panel>
        </section>
      </>
    );
  }

  function renderConfiguracion() {
    return (
      <>
        <section className="business-manager-metrics-grid business-manager-metrics-grid--compact">
          <MetricCard
            icon="settings"
            label="Modulos activos"
            note="Configuracion actual"
            tone="neutral"
            trend="Escalable por giro"
            value={formatNumber(activeModulesCount)}
          />
          <MetricCard
            icon="spark"
            label="Integraciones listas"
            note="Conectadas o simuladas"
            tone="info"
            trend={`${activeIntegrationsCount} activas`}
            value={formatNumber(demo.settings.integrations.length)}
          />
        </section>

        <section className="business-manager-dashboard-grid business-manager-dashboard-grid--config">
          <Panel
            className="business-manager-panel--span-2"
            subtitle="Pantalla visual, sin backend real."
            title="Identidad del negocio"
          >
            <div className="business-manager-settings-grid">
              <div className="business-manager-brand-card">
                <div className="business-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.businessName}</strong>
                  <p>Logo placeholder editable para cada cliente.</p>
                </div>
              </div>

              <div className="business-manager-field-grid">
                <div className="business-manager-field-card">
                  <span>Nombre del negocio</span>
                  <strong>{demo.settings.businessName}</strong>
                </div>
                <div className="business-manager-field-card">
                  <span>Color principal</span>
                  <div className="business-manager-color-preview">
                    <span
                      className="business-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.settings.primaryColor }}
                    />
                    <strong>{demo.settings.primaryColor}</strong>
                  </div>
                </div>
                <div className="business-manager-field-card">
                  <span>Plan sugerido</span>
                  <strong>{demo.business.plan}</strong>
                </div>
                <div className="business-manager-field-card">
                  <span>Soporte operativo</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Encendido visual por area del sistema." title="Modulos activos">
            <div className="business-manager-toggle-list">
              {demo.settings.modulesActive.map((item) => (
                <div key={item.name} className="business-manager-toggle-list__item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.enabled ? 'Visible para el negocio demo.' : 'Disponible para fases futuras.'}</p>
                  </div>
                  <button
                    aria-label={item.enabled ? `${item.name} activo` : `${item.name} inactivo`}
                    className={`business-manager-switch ${item.enabled ? 'is-on' : ''}`}
                    type="button"
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            className="business-manager-panel--span-3"
            subtitle="Conectores sugeridos para una version real."
            title="Integraciones simuladas"
          >
            <div className="business-manager-integrations-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="business-manager-integration-card">
                  <div className="business-manager-integration-card__head">
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
    if (activeModule === 'clientes') {
      return renderClientes();
    }

    if (activeModule === 'ventas') {
      return renderVentas();
    }

    if (activeModule === 'citas') {
      return renderCitas();
    }

    if (activeModule === 'cobranza') {
      return renderCobranza();
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
      className="business-manager-demo"
      style={{
        '--business-manager-primary': demo.business.primaryColor,
      }}
    >
      <div className="business-manager-app-shell">
        <div
          aria-hidden={!sidebarOpen}
          className={`business-manager-overlay ${sidebarOpen ? 'is-visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside className={`business-manager-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
          <div className="business-manager-sidebar__header">
            <span className="business-manager-pill">Demo ERP / CRM</span>
            <h2>{demo.appName}</h2>
            <p>Propuesta navegable para mostrar un sistema administrativo personalizado.</p>
          </div>

          <div className="business-manager-sidebar__business">
            <div className="business-manager-sidebar__brand-mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} · {demo.business.plan}
              </span>
            </div>
          </div>

          <nav className="business-manager-sidebar__nav" aria-label="Modulos de negocio">
            {businessManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`business-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="business-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="business-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="business-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="business-manager-sidebar__footer">
            <div className="business-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Tiempo de respuesta demo: {demo.business.responseTime}</span>
            </div>

            <div className="business-manager-sidebar__actions">
              <Link className="business-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a
                className="business-manager-primary-link"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="business-manager-main">
          <header className="business-manager-topbar">
            <div className="business-manager-topbar__identity">
              <button
                aria-label={sidebarOpen ? 'Cerrar menu' : 'Abrir menu'}
                className="business-manager-topbar__menu"
                onClick={() => setSidebarOpen((current) => !current)}
                type="button"
              >
                <Icon name={sidebarOpen ? 'close' : 'menu'} />
              </button>

              <div>
                <p className="business-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleModuleMeta.description}</p>
              </div>
            </div>

            <label className="business-manager-search">
              <span className="business-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar cliente, venta, cita o accion..."
                type="search"
                value={query}
              />
            </label>

            <div className="business-manager-topbar__actions">
              <button
                className="business-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'ventas',
                    'Accion simulada: se abriria el formulario para registrar una nueva venta.',
                  )
                }
                type="button"
              >
                Nueva venta
              </button>
              <button
                className="business-manager-topbar__button business-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'citas',
                    'Accion simulada: se abriria el flujo para agendar una cita.',
                  )
                }
                type="button"
              >
                Agendar cita
              </button>
              <a
                className="business-manager-topbar__button business-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="business-manager-banner">
            <div>
              <span className="business-manager-pill">Demo visual con datos simulados</span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="business-manager-banner__aside">
              <div className="business-manager-banner__stat">
                <span>Meta mensual</span>
                <strong>{formatCurrency(demo.business.monthlyGoal)}</strong>
              </div>
              <div className="business-manager-banner__stat">
                <span>Ventas acumuladas</span>
                <strong>{formatCurrency(salesThisMonth)}</strong>
              </div>
            </div>
          </section>

          <section className="business-manager-module-intro">
            <div>
              <span className="business-manager-pill business-manager-pill--subtle">
                {visibleModule.label}
              </span>
              <h2>{demo.business.name}</h2>
              <p>
                Negocio demo con foco en administracion, seguimiento comercial, agenda y cobranza
                para operaciones locales.
              </p>
            </div>

            <div className="business-manager-module-intro__stats">
              <div>
                <span>Busqueda activa</span>
                <strong>{query.trim() ? query : 'Sin filtro'}</strong>
              </div>
              <div>
                <span>Objetivo del mes</span>
                <strong>{monthlyGoalProgress}% completado</strong>
              </div>
            </div>
          </section>

          <div className="business-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="business-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
