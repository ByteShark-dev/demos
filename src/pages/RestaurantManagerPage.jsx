import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { restaurantManagerDemoData, restaurantManagerModules } from '../data/restaurantManagerDemo.js';
import '../styles/restaurant-manager.css';

const currentDate = new Date('2026-06-20T10:30:00');
const businessDay = '2026-06-20';

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
    description: 'Resumen operativo de ventas, mesas, cocina, promos y clientes recurrentes.',
    icon: 'dashboard',
  },
  pedidos: {
    description: 'Listado activo de pedidos por canal, estado, total y metodo de pago.',
    icon: 'orders',
  },
  menu: {
    description: 'Catalogo de productos con categoria, margen, etiqueta y disponibilidad.',
    icon: 'menu',
  },
  reservaciones: {
    description: 'Agenda simple para confirmar, reagendar y cuidar ocupacion de mesas.',
    icon: 'reservations',
  },
  cocina: {
    description: 'Tablero Kanban para barra y cocina con prioridad y tiempo transcurrido.',
    icon: 'kitchen',
  },
  clientes: {
    description: 'Base de clientes con visitas, preferencias, gasto y contacto rapido.',
    icon: 'clients',
  },
  promociones: {
    description: 'Promos activas, programadas o pausadas con ventas generadas.',
    icon: 'promos',
  },
  reportes: {
    description: 'Metricas visuales para ventas, ticket promedio, horas pico y categorias.',
    icon: 'reports',
  },
  configuracion: {
    description: 'Pantalla visual para horarios, mesas, categorias y conexiones del sistema.',
    icon: 'settings',
  },
};

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function formatNumber(value) {
  return numberFormatter.format(value);
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

  return restaurantManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getElapsedMinutes(value) {
  return Math.max(0, Math.round((currentDate.getTime() - new Date(value).getTime()) / 60000));
}

function formatElapsed(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  return `${hours} h ${minutes} min`;
}

function getBadgeTone(value) {
  const normalizedValue = normalizeText(value);

  if (
    [
      'disponible',
      'confirmada',
      'llego',
      'listo',
      'entregado',
      'activa',
      'vip',
      'recurrente',
      'libre',
      'activo',
    ].includes(normalizedValue)
  ) {
    return 'success';
  }

  if (
    [
      'nuevo',
      'pendiente',
      'preparando',
      'programada',
      'pausada',
      'reservada',
      'destacado',
      'promo',
      'por confirmar',
    ].includes(normalizedValue)
  ) {
    return 'warning';
  }

  if (
    [
      'cancelado',
      'agotado',
      'oculto',
      'vencida',
      'no asistio',
      'inactivo',
    ].includes(normalizedValue)
  ) {
    return 'danger';
  }

  if (['mesa', 'mostrador', 'domicilio', 'recoger', 'ocupada', 'nuevo'].includes(normalizedValue)) {
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
  if (type === 'cocina') {
    return 'kitchen';
  }

  if (type === 'promociones') {
    return 'promos';
  }

  if (type === 'reservaciones') {
    return 'reservations';
  }

  if (type === 'clientes') {
    return 'clients';
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

  if (name === 'orders') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="5" y="4" width="14" height="16" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (name === 'menu') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <path d="M7 7v12" />
        <path d="M12 7v12" />
        <path d="M17 7v12" />
      </svg>
    );
  }

  if (name === 'reservations') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
      </svg>
    );
  }

  if (name === 'kitchen') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M7 3v8" />
        <path d="M5 3v3" />
        <path d="M9 3v3" />
        <path d="M7 11v10" />
        <path d="M16 3c1.5 2 2 4 2 6s-.5 4-2 6" />
        <path d="M14 21V3" />
      </svg>
    );
  }

  if (name === 'clients') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M16 19a4 4 0 0 0-8 0" />
        <circle cx="12" cy="10" r="3" />
        <path d="M19 19a3.5 3.5 0 0 0-3-3.46" />
        <path d="M8 15.54A3.5 3.5 0 0 0 5 19" />
      </svg>
    );
  }

  if (name === 'promos') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 3 4 9v10h16V9Z" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
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

  return <span className={`restaurant-manager-badge restaurant-manager-badge--${finalTone}`}>{children}</span>;
}

function MetricCard({ label, value, note, icon, tone = 'neutral', trend }) {
  return (
    <article className={`restaurant-manager-metric-card restaurant-manager-metric-card--${tone}`}>
      <div className="restaurant-manager-metric-card__header">
        <div className="restaurant-manager-metric-card__icon">
          <Icon name={icon} />
        </div>
        {trend ? <span className="restaurant-manager-pill restaurant-manager-pill--muted">{trend}</span> : null}
      </div>
      <div className="restaurant-manager-metric-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`restaurant-manager-panel ${className}`.trim()}>
      <header className="restaurant-manager-panel__header">
        <div>
          <h2 className="restaurant-manager-panel__title">{title}</h2>
          {subtitle ? <p className="restaurant-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="restaurant-manager-empty-state">
      <div className="restaurant-manager-empty-state__icon">
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

    if (mode === 'time') {
      return `${value} min`;
    }

    return formatCurrency(value);
  }

  return (
    <div className="restaurant-manager-progress-list">
      {items.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 12);

        return (
          <article key={item.label} className="restaurant-manager-progress-list__item">
            <div className="restaurant-manager-progress-list__header">
              <div>
                <strong>{item.label}</strong>
                {item.note ? <p>{item.note}</p> : null}
              </div>
              <span>{formatValue(item.value)}</span>
            </div>
            <div className="restaurant-manager-progress-list__track">
              <div className="restaurant-manager-progress-list__bar" style={{ width: `${width}%` }} />
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

    return formatCurrency(value);
  }

  return (
    <div className="restaurant-manager-chart">
      {items.map((item) => {
        const height = Math.max((item.value / maxValue) * 100, 18);

        return (
          <article key={item.label} className="restaurant-manager-chart__item">
            <div className="restaurant-manager-chart__canvas">
              <div className="restaurant-manager-chart__bar" style={{ height: `${height}%` }} />
            </div>
            <div className="restaurant-manager-chart__meta">
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

export function RestaurantManagerPage() {
  const demo = restaurantManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi negocio.`,
  );

  const ordersSorted = [...demo.orders].sort((left, right) => new Date(right.dateTime) - new Date(left.dateTime));
  const reservationsSorted = [...demo.reservations].sort(
    (left, right) => new Date(left.dateTime) - new Date(right.dateTime),
  );
  const customersSorted = [...demo.customers].sort((left, right) => right.spend - left.spend);
  const promotionsSorted = [...demo.promotions].sort((left, right) => right.generatedSales - left.generatedSales);

  const todayOrders = ordersSorted.filter((item) => item.dateTime.startsWith(businessDay));
  const billableTodayOrders = todayOrders.filter((item) => item.status !== 'cancelado');
  const activeOrders = todayOrders.filter((item) => ['nuevo', 'preparando', 'listo'].includes(item.status));
  const kitchenPendingOrders = todayOrders.filter((item) => ['nuevo', 'preparando'].includes(item.status));
  const readyOrders = todayOrders.filter((item) => item.status === 'listo');
  const deliveredOrders = todayOrders.filter((item) => item.status === 'entregado');
  const todaySalesTotal = sumBy(billableTodayOrders, (item) => item.total);
  const averageTicket = Math.round(todaySalesTotal / Math.max(billableTodayOrders.length, 1));

  const todayReservations = demo.reservations.filter((item) => item.dateTime.startsWith(businessDay));
  const confirmedReservations = todayReservations.filter((item) => item.status === 'confirmada');
  const pendingReservations = todayReservations.filter((item) => item.status === 'pendiente');
  const missedReservations = todayReservations.filter((item) => ['cancelada', 'no asistio'].includes(item.status));

  const recurringCustomers = demo.customers.filter((item) => ['recurrente', 'vip'].includes(item.status));
  const vipCustomers = demo.customers.filter((item) => item.status === 'vip');
  const newCustomers = demo.customers.filter((item) => item.status === 'nuevo');
  const inactiveCustomers = demo.customers.filter((item) => item.status === 'inactivo');

  const availableMenuItems = demo.menuItems.filter((item) => item.status === 'disponible');
  const soldOutMenuItems = demo.menuItems.filter((item) => item.status === 'agotado');
  const hiddenMenuItems = demo.menuItems.filter((item) => item.status === 'oculto');
  const averageMargin = Math.round(
    sumBy(demo.menuItems, (item) => item.price - item.cost) / Math.max(demo.menuItems.length, 1),
  );

  const activePromotions = demo.promotions.filter((item) => item.status === 'activa');
  const scheduledPromotions = demo.promotions.filter((item) => item.status === 'programada');
  const pausedPromotions = demo.promotions.filter((item) => item.status === 'pausada');
  const totalPromotionSales = sumBy(demo.promotions, (item) => item.generatedSales);

  const topProduct = demo.reports.topProducts[0];
  const bestPeakHour = demo.reports.peakHours.reduce((best, item) => (item.value > best.value ? item : best));
  const tableStatusCount = {
    ocupada: demo.dashboard.tables.filter((item) => item.status === 'ocupada').length,
    reservada: demo.dashboard.tables.filter((item) => item.status === 'reservada').length,
    libre: demo.dashboard.tables.filter((item) => item.status === 'libre').length,
    'por confirmar': demo.dashboard.tables.filter((item) => item.status === 'por confirmar').length,
  };

  const kitchenAverageWait = Math.round(
    sumBy(kitchenPendingOrders, (item) => getElapsedMinutes(item.dateTime)) / Math.max(kitchenPendingOrders.length, 1),
  );

  const kitchenColumns = [
    {
      id: 'nuevo',
      label: 'Nuevos',
      actionLabel: 'Iniciar preparacion',
      items: ordersSorted.filter((item) => item.status === 'nuevo'),
    },
    {
      id: 'preparando',
      label: 'En preparacion',
      actionLabel: 'Marcar listo',
      items: ordersSorted.filter((item) => item.status === 'preparando'),
    },
    {
      id: 'listo',
      label: 'Listos',
      actionLabel: 'Entregar pedido',
      items: ordersSorted.filter((item) => item.status === 'listo'),
    },
    {
      id: 'entregado',
      label: 'Entregados',
      actionLabel: 'Ver detalle',
      items: ordersSorted.filter((item) => item.status === 'entregado'),
    },
  ];

  const filteredOrders = ordersSorted.filter((item) =>
    matchesQuery(query, [
      item.folio,
      item.customerLabel,
      item.type,
      item.products.join(' '),
      item.status,
      item.paymentMethod,
      item.priority,
      item.dateTime,
    ]),
  );

  const filteredMenuItems = demo.menuItems.filter((item) =>
    matchesQuery(query, [
      item.id,
      item.product,
      item.category,
      item.status,
      item.tag,
      `${item.price}`,
      `${item.cost}`,
      `${item.salesCount}`,
    ]),
  );

  const filteredReservations = reservationsSorted.filter((item) =>
    matchesQuery(query, [
      item.customer,
      item.table,
      item.status,
      item.notes,
      item.dateTime,
      `${item.people}`,
    ]),
  );

  const filteredKitchenColumns = kitchenColumns.map((column) => ({
    ...column,
    items: column.items.filter((item) =>
      matchesQuery(query, [
        item.folio,
        item.customerLabel,
        item.type,
        item.products.join(' '),
        item.status,
        item.priority,
      ]),
    ),
  }));

  const filteredCustomers = customersSorted.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.phone,
      item.preference,
      item.status,
      item.lastOrder,
      `${item.visits}`,
      `${item.spend}`,
    ]),
  );

  const filteredPromotions = promotionsSorted.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.discount,
      item.productsIncluded.join(' '),
      item.validity,
      item.status,
      `${item.generatedSales}`,
    ]),
  );

  const filteredAlerts = demo.dashboard.alerts.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.level]),
  );

  const filteredActivity = demo.dashboard.activity.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.timestamp, item.type]),
  );

  const filteredTables = demo.dashboard.tables.filter((item) =>
    matchesQuery(query, [item.label, item.status, item.turn]),
  );

  const filteredSalesByDay = demo.reports.salesByDay.filter((item) =>
    matchesQuery(query, [item.label, `${item.value}`]),
  );

  const filteredOrderTypes = demo.reports.ordersByType.filter((item) =>
    matchesQuery(query, [item.label, `${item.value}`]),
  );

  const filteredTopProducts = demo.reports.topProducts.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredCategorySales = demo.reports.categorySales.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredWeeklyAverageTicket = demo.reports.weeklyAverageTicket.filter((item) =>
    matchesQuery(query, [item.label, `${item.value}`]),
  );

  const filteredPeakHours = demo.reports.peakHours.filter((item) =>
    matchesQuery(query, [item.label, `${item.value}`]),
  );

  const filteredPromoPerformance = demo.reports.promoPerformance.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  function showNotice(message) {
    setActionNotice(message);
  }

  function setModule(moduleId) {
    setActiveModule(moduleId);
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

  const visibleModule = restaurantManagerModules.find((item) => item.id === activeModule) ?? restaurantManagerModules[0];
  const visibleMeta = moduleMeta[visibleModule.id];
  const moduleCounters = {
    dashboard: 'Live',
    pedidos: formatNumber(activeOrders.length),
    menu: formatNumber(demo.menuItems.length),
    reservaciones: formatNumber(todayReservations.length),
    cocina: formatNumber(kitchenPendingOrders.length),
    clientes: formatNumber(demo.customers.length),
    promociones: formatNumber(activePromotions.length),
    reportes: formatNumber(demo.reports.salesByDay.length),
    configuracion: formatNumber(demo.settings.integrations.length),
  };

  function renderDashboard() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid">
          <MetricCard
            icon="orders"
            label="Ventas del dia"
            note={`${formatNumber(billableTodayOrders.length)} pedidos cobrables`}
            tone="success"
            trend="Caja"
            value={formatCurrency(todaySalesTotal)}
          />
          <MetricCard
            icon="dashboard"
            label="Pedidos activos"
            note="Nuevos, preparando o listos"
            tone="warning"
            trend="Operacion"
            value={formatNumber(activeOrders.length)}
          />
          <MetricCard
            icon="reservations"
            label="Reservaciones de hoy"
            note={`${formatNumber(confirmedReservations.length)} confirmadas`}
            tone="info"
            trend="Agenda"
            value={formatNumber(todayReservations.length)}
          />
          <MetricCard
            icon="spark"
            label="Ticket promedio"
            note="Promedio del turno actual"
            tone="neutral"
            trend="Hoy"
            value={formatCurrency(averageTicket)}
          />
          <MetricCard
            icon="menu"
            label="Producto mas vendido"
            note={topProduct.label}
            tone="success"
            trend="Top"
            value={`${formatNumber(topProduct.value)} uds`}
          />
          <MetricCard
            icon="kitchen"
            label="Pendientes en cocina"
            note={`Espera media ${formatElapsed(kitchenAverageWait)}`}
            tone="danger"
            trend="Backlog"
            value={formatNumber(kitchenPendingOrders.length)}
          />
          <MetricCard
            icon="clients"
            label="Clientes recurrentes"
            note={`${formatNumber(vipCustomers.length)} VIP visibles`}
            tone="info"
            trend="Fidelidad"
            value={formatNumber(recurringCustomers.length)}
          />
          <MetricCard
            icon="promos"
            label="Promociones activas"
            note={formatCurrency(sumBy(activePromotions, (item) => item.generatedSales))}
            tone="warning"
            trend="Marketing"
            value={formatNumber(activePromotions.length)}
          />
        </section>

        <section className="restaurant-manager-grid">
          <Panel
            className="restaurant-manager-panel--span-2"
            subtitle="Pedidos recientes del turno con total, canal y estado."
            title="Pedidos recientes"
          >
            {filteredOrders.length ? (
              <div className="restaurant-manager-stack">
                {filteredOrders.slice(0, 5).map((item) => (
                  <article key={item.id} className="restaurant-manager-list-card">
                    <div className="restaurant-manager-list-card__header">
                      <div>
                        <strong>{item.folio}</strong>
                        <p>{item.customerLabel}</p>
                      </div>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                    <div className="restaurant-manager-list-card__meta">
                      <span>{item.type}</span>
                      <span>{formatCurrency(item.total)}</span>
                      <span>{formatTime(item.dateTime)}</span>
                    </div>
                    <p>{item.products.join(' - ')}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay pedidos que coincidan con la busqueda actual."
                title="Sin pedidos visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Backlog visible por etapa de barra y cocina." title="Estado de cocina">
            <div className="restaurant-manager-summary-grid">
              {filteredKitchenColumns.map((column) => {
                const maxValue = Math.max(...filteredKitchenColumns.map((item) => item.items.length), 1);
                const width = Math.max((column.items.length / maxValue) * 100, 16);

                return (
                  <article key={column.id} className="restaurant-manager-summary-card">
                    <div className="restaurant-manager-summary-card__header">
                      <strong>{column.label}</strong>
                      <span>{formatNumber(column.items.length)}</span>
                    </div>
                    <div className="restaurant-manager-summary-card__track">
                      <div className="restaurant-manager-summary-card__bar" style={{ width: `${width}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </Panel>

          <Panel subtitle="Rotacion mensual de productos." title="Productos mas vendidos">
            {filteredTopProducts.length ? (
              <ProgressList items={filteredTopProducts} mode="number" />
            ) : (
              <EmptyState
                description="No hay productos visibles con este filtro."
                title="Sin top visible"
              />
            )}
          </Panel>

          <Panel subtitle="Puntos que requieren atencion del equipo." title="Alertas operativas">
            {filteredAlerts.length ? (
              <div className="restaurant-manager-stack">
                {filteredAlerts.map((item) => (
                  <article key={item.title} className="restaurant-manager-alert-card">
                    <div className="restaurant-manager-alert-card__header">
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
                description="No se encontraron alertas para la busqueda actual."
                title="Sin alertas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Disponibilidad y bloqueos por mesa." title="Ocupacion de mesas">
            {filteredTables.length ? (
              <div className="restaurant-manager-table-grid">
                {filteredTables.map((item) => (
                  <article key={item.label} className="restaurant-manager-table-card">
                    <div className="restaurant-manager-table-card__header">
                      <strong>{item.label}</strong>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                    <p>{item.turn}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay mesas visibles con el filtro actual."
                title="Sin mesas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Eventos recientes del sistema demo." title="Actividad reciente">
            {filteredActivity.length ? (
              <div className="restaurant-manager-activity-list">
                {filteredActivity.map((item) => (
                  <article key={item.title} className="restaurant-manager-activity-list__item">
                    <div className="restaurant-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="restaurant-manager-activity-list__body">
                      <div className="restaurant-manager-activity-list__head">
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
                description="No hay actividad visible con la busqueda actual."
                title="Sin actividad visible"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderPedidos() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="orders"
            label="Pedidos nuevos"
            note="Pendientes de toma"
            tone="info"
            trend="Turno"
            value={formatNumber(todayOrders.filter((item) => item.status === 'nuevo').length)}
          />
          <MetricCard
            icon="kitchen"
            label="En preparacion"
            note="Barra y linea"
            tone="warning"
            trend="Produccion"
            value={formatNumber(todayOrders.filter((item) => item.status === 'preparando').length)}
          />
          <MetricCard
            icon="spark"
            label="Listos para entrega"
            note="Esperando pickup o mesa"
            tone="success"
            trend="Salida"
            value={formatNumber(readyOrders.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Entregados"
            note="Ciclo cerrado del turno"
            tone="neutral"
            trend="Hoy"
            value={formatNumber(deliveredOrders.length)}
          />
        </section>

        <Panel subtitle="Tabla operativa con scroll interno para desktop y tablet." title="Pedidos">
          {filteredOrders.length ? (
            <div className="restaurant-manager-table-shell">
              <table className="restaurant-manager-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Cliente o mesa</th>
                    <th>Tipo</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Pago</th>
                    <th>Hora</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((item) => (
                    <tr key={item.id}>
                      <td>{item.folio}</td>
                      <td>
                        <div className="restaurant-manager-table__primary">
                          <strong>{item.customerLabel}</strong>
                          <span>Prioridad {item.priority}</span>
                        </div>
                      </td>
                      <td>
                        <StatusBadge>{item.type}</StatusBadge>
                      </td>
                      <td>{item.products.join(' - ')}</td>
                      <td>{formatCurrency(item.total)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{item.paymentMethod}</td>
                      <td>{formatTime(item.dateTime)}</td>
                      <td>
                        <div className="restaurant-manager-inline-actions">
                          <button
                            className="restaurant-manager-inline-button restaurant-manager-inline-button--ghost"
                            onClick={() => showNotice(`Accion simulada: ver pedido ${item.folio}.`)}
                            type="button"
                          >
                            <Icon name="eye" />
                            Ver pedido
                          </button>
                          <button
                            className="restaurant-manager-inline-button"
                            onClick={() => showNotice(`Accion simulada: ${item.folio} marcado como listo.`)}
                            type="button"
                          >
                            <Icon name="spark" />
                            Marcar listo
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
              description="Busca por folio, cliente, tipo, producto o metodo de pago."
              title="No hay pedidos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderMenu() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="menu"
            label="Productos disponibles"
            note="Visibles para venta"
            tone="success"
            trend="Menu"
            value={formatNumber(availableMenuItems.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Productos agotados"
            note="Requieren actualizacion"
            tone="danger"
            trend="Stock"
            value={formatNumber(soldOutMenuItems.length)}
          />
          <MetricCard
            icon="spark"
            label="Margen promedio"
            note="Precio menos costo"
            tone="info"
            trend="Unidad"
            value={formatCurrency(averageMargin)}
          />
          <MetricCard
            icon="promos"
            label="Ocultos o en pausa"
            note="Fuera de circulacion"
            tone="warning"
            trend="Control"
            value={formatNumber(hiddenMenuItems.length)}
          />
        </section>

        <Panel subtitle="Vista comercial de productos, costos y desempeno mensual." title="Menu">
          {filteredMenuItems.length ? (
            <div className="restaurant-manager-product-grid">
              {filteredMenuItems.map((item) => {
                const margin = item.price - item.cost;

                return (
                  <article key={item.id} className="restaurant-manager-product-card">
                    <div className="restaurant-manager-product-card__header">
                      <div>
                        <strong>{item.product}</strong>
                        <p>{item.category}</p>
                      </div>
                      <div className="restaurant-manager-product-card__badges">
                        <StatusBadge>{item.status}</StatusBadge>
                        <StatusBadge>{item.tag}</StatusBadge>
                      </div>
                    </div>

                    <div className="restaurant-manager-product-card__stats">
                      <div>
                        <span>Precio</span>
                        <strong>{formatCurrency(item.price)}</strong>
                      </div>
                      <div>
                        <span>Costo</span>
                        <strong>{formatCurrency(item.cost)}</strong>
                      </div>
                      <div>
                        <span>Margen</span>
                        <strong>{formatCurrency(margin)}</strong>
                      </div>
                      <div>
                        <span>Ventas este mes</span>
                        <strong>{formatNumber(item.salesCount)}</strong>
                      </div>
                    </div>

                    <button
                      className="restaurant-manager-inline-button"
                      onClick={() =>
                        showNotice(`Accion simulada: editar producto ${item.product}.`)
                      }
                      type="button"
                    >
                      Editar producto
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              description="Busca por producto, categoria, estado o etiqueta."
              title="No hay productos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderReservaciones() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="reservations"
            label="Reservaciones de hoy"
            note="Turno actual"
            tone="info"
            trend="Agenda"
            value={formatNumber(todayReservations.length)}
          />
          <MetricCard
            icon="spark"
            label="Confirmadas"
            note="Mesas bloqueadas"
            tone="success"
            trend="Check"
            value={formatNumber(confirmedReservations.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Pendientes"
            note="Requieren seguimiento"
            tone="warning"
            trend="Follow-up"
            value={formatNumber(pendingReservations.length)}
          />
          <MetricCard
            icon="clients"
            label="No asistio o cayo"
            note="Riesgo del turno"
            tone="danger"
            trend="Ausencia"
            value={formatNumber(missedReservations.length)}
          />
        </section>

        <Panel subtitle="Lista visual para confirmar, reagendar o liberar mesas." title="Reservaciones">
          {filteredReservations.length ? (
            <div className="restaurant-manager-reservation-grid">
              {filteredReservations.map((item) => (
                <article key={item.id} className="restaurant-manager-reservation-card">
                  <div className="restaurant-manager-reservation-card__header">
                    <div>
                      <strong>{item.customer}</strong>
                      <p>{formatDateTime(item.dateTime)}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="restaurant-manager-reservation-card__meta">
                    <span>{item.table}</span>
                    <span>{item.people} personas</span>
                    <span>{formatTime(item.dateTime)}</span>
                  </div>

                  <p>{item.notes}</p>

                  <div className="restaurant-manager-inline-actions">
                    <button
                      className="restaurant-manager-inline-button"
                      onClick={() =>
                        showNotice(`Accion simulada: reservacion de ${item.customer} confirmada.`)
                      }
                      type="button"
                    >
                      Confirmar
                    </button>
                    <button
                      className="restaurant-manager-inline-button restaurant-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: reservacion de ${item.customer} reagendada.`)
                      }
                      type="button"
                    >
                      Reagendar
                    </button>
                    <button
                      className="restaurant-manager-inline-button restaurant-manager-inline-button--ghost"
                      onClick={() =>
                        showNotice(`Accion simulada: reservacion de ${item.customer} cancelada.`)
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
            <EmptyState
              description="Busca por cliente, mesa, estado o nota."
              title="No hay reservaciones visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderCocina() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="kitchen"
            label="Backlog cocina"
            note="Nuevos y preparando"
            tone="danger"
            trend="Flujo"
            value={formatNumber(kitchenPendingOrders.length)}
          />
          <MetricCard
            icon="clock"
            label="Espera media"
            note="Pedidos en cocina"
            tone="warning"
            trend="Tiempo"
            value={formatElapsed(kitchenAverageWait)}
          />
          <MetricCard
            icon="orders"
            label="Alta prioridad"
            note="Pedidos urgentes del turno"
            tone="info"
            trend="Urgente"
            value={formatNumber(todayOrders.filter((item) => item.priority === 'alta').length)}
          />
          <MetricCard
            icon="spark"
            label="Listos para salir"
            note="Mesa o recoger"
            tone="success"
            trend="Despacho"
            value={formatNumber(readyOrders.length)}
          />
        </section>

        <Panel
          className="restaurant-manager-panel--span-3"
          subtitle="Tablero visual para avanzar el estado operativo de cada pedido."
          title="Cocina"
        >
          <div className="restaurant-manager-board">
            {filteredKitchenColumns.map((column) => (
              <section key={column.id} className="restaurant-manager-board-column">
                <header className="restaurant-manager-board-column__header">
                  <div>
                    <strong>{column.label}</strong>
                    <p>{formatNumber(column.items.length)} pedidos</p>
                  </div>
                  <span>{column.actionLabel}</span>
                </header>

                <div className="restaurant-manager-board-column__stack">
                  {column.items.length ? (
                    column.items.map((item) => {
                      const elapsedMinutes = getElapsedMinutes(item.dateTime);

                      return (
                        <article key={item.id} className="restaurant-manager-kitchen-card">
                          <div className="restaurant-manager-kitchen-card__header">
                            <div>
                              <strong>{item.folio}</strong>
                              <p>{item.customerLabel}</p>
                            </div>
                            <StatusBadge tone={getPriorityTone(item.priority)}>{item.priority}</StatusBadge>
                          </div>

                          <p>{item.products.join(' - ')}</p>

                          <div className="restaurant-manager-kitchen-card__meta">
                            <span>{item.type}</span>
                            <span>{formatElapsed(elapsedMinutes)}</span>
                            <span>{formatCurrency(item.total)}</span>
                          </div>

                          <button
                            className={`restaurant-manager-inline-button ${
                              item.status === 'entregado' ? 'restaurant-manager-inline-button--ghost' : ''
                            }`}
                            onClick={() =>
                              showNotice(`Accion simulada: ${column.actionLabel.toLowerCase()} para ${item.folio}.`)
                            }
                            type="button"
                          >
                            {column.actionLabel}
                          </button>
                        </article>
                      );
                    })
                  ) : (
                    <div className="restaurant-manager-board-empty">Sin pedidos en esta etapa.</div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </Panel>
      </>
    );
  }

  function renderClientes() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="clients"
            label="Clientes nuevos"
            note="Alta reciente"
            tone="info"
            trend="Captacion"
            value={formatNumber(newCustomers.length)}
          />
          <MetricCard
            icon="spark"
            label="Clientes recurrentes"
            note="Vuelven con frecuencia"
            tone="success"
            trend="Retencion"
            value={formatNumber(recurringCustomers.length)}
          />
          <MetricCard
            icon="promos"
            label="Clientes VIP"
            note="Mayor gasto acumulado"
            tone="warning"
            trend="Premium"
            value={formatNumber(vipCustomers.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Inactivos"
            note="Conviene reactivar"
            tone="neutral"
            trend="Win-back"
            value={formatNumber(inactiveCustomers.length)}
          />
        </section>

        <Panel subtitle="Clientes con telefono, preferencia y gasto acumulado." title="Clientes">
          {filteredCustomers.length ? (
            <div className="restaurant-manager-table-shell">
              <table className="restaurant-manager-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Visitas</th>
                    <th>Ultimo pedido</th>
                    <th>Preferencia</th>
                    <th>Gasto acumulado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="restaurant-manager-table__primary">
                          <strong>{item.name}</strong>
                          <span>{item.preference}</span>
                        </div>
                      </td>
                      <td>{item.phone}</td>
                      <td>{formatNumber(item.visits)}</td>
                      <td>{formatDateTime(item.lastOrder)}</td>
                      <td>{item.preference}</td>
                      <td>{formatCurrency(item.spend)}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>
                        <div className="restaurant-manager-inline-actions">
                          <button
                            className="restaurant-manager-inline-button"
                            onClick={() => showNotice(`Accion simulada: WhatsApp a ${item.name}.`)}
                            type="button"
                          >
                            <Icon name="message" />
                            WhatsApp
                          </button>
                          <button
                            className="restaurant-manager-inline-button restaurant-manager-inline-button--ghost"
                            onClick={() =>
                              showNotice(`Accion simulada: abrir perfil de ${item.name}.`)
                            }
                            type="button"
                          >
                            <Icon name="eye" />
                            Ver perfil
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
              description="Busca por nombre, telefono, preferencia o estado."
              title="No hay clientes visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderPromociones() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="promos"
            label="Activas"
            note="Disponibles hoy"
            tone="success"
            trend="Live"
            value={formatNumber(activePromotions.length)}
          />
          <MetricCard
            icon="dashboard"
            label="Programadas"
            note="Esperando calendario"
            tone="info"
            trend="Plan"
            value={formatNumber(scheduledPromotions.length)}
          />
          <MetricCard
            icon="orders"
            label="Pausadas"
            note="Pendientes de revision"
            tone="warning"
            trend="Hold"
            value={formatNumber(pausedPromotions.length)}
          />
          <MetricCard
            icon="spark"
            label="Ventas generadas"
            note="Total historico demo"
            tone="neutral"
            trend="Impacto"
            value={formatCurrency(totalPromotionSales)}
          />
        </section>

        <Panel subtitle="Promociones de menu, brunch y consumo rapido." title="Promociones">
          {filteredPromotions.length ? (
            <div className="restaurant-manager-promo-grid">
              {filteredPromotions.map((item) => (
                <article key={item.id} className="restaurant-manager-promo-card">
                  <div className="restaurant-manager-promo-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.validity}</p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="restaurant-manager-promo-card__hero">
                    <span>Descuento</span>
                    <strong>{item.discount}</strong>
                  </div>

                  <div className="restaurant-manager-chip-list">
                    {item.productsIncluded.map((product) => (
                      <span key={product} className="restaurant-manager-chip">
                        {product}
                      </span>
                    ))}
                  </div>

                  <div className="restaurant-manager-promo-card__footer">
                    <span>Ventas generadas</span>
                    <strong>{formatCurrency(item.generatedSales)}</strong>
                  </div>

                  <button
                    className={`restaurant-manager-inline-button ${
                      item.status === 'activa' ? 'restaurant-manager-inline-button--ghost' : ''
                    }`}
                    onClick={() =>
                      showNotice(`Accion simulada: cambio de estado para promo "${item.name}".`)
                    }
                    type="button"
                  >
                    {item.status === 'activa' ? 'Pausar' : 'Activar'}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Busca por nombre, vigencia, descuento o estado."
              title="No hay promociones visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderReportes() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="reports"
            label="Ventas semanales"
            note="Suma visible en grafica"
            tone="success"
            trend="Semana"
            value={formatCurrency(sumBy(demo.reports.salesByDay, (item) => item.value))}
          />
          <MetricCard
            icon="spark"
            label="Ticket promedio actual"
            note="Serie semanal"
            tone="info"
            trend="Comparativo"
            value={formatCurrency(demo.reports.weeklyAverageTicket.at(-1)?.value ?? 0)}
          />
          <MetricCard
            icon="dashboard"
            label="Hora pico"
            note="Mayor demanda registrada"
            tone="warning"
            trend="Flujo"
            value={`${bestPeakHour.label} - ${formatNumber(bestPeakHour.value)}`}
          />
        </section>

        <section className="restaurant-manager-grid">
          <Panel
            className="restaurant-manager-panel--span-2"
            subtitle="Serie compacta de ventas por dia."
            title="Ventas por dia"
          >
            {filteredSalesByDay.length ? (
              <BarChart items={filteredSalesByDay} />
            ) : (
              <EmptyState
                description="No hay datos de ventas visibles con este filtro."
                title="Sin ventas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Participacion por canal de pedido." title="Pedidos por tipo">
            {filteredOrderTypes.length ? (
              <ProgressList items={filteredOrderTypes} mode="number" />
            ) : (
              <EmptyState
                description="No hay tipos visibles con la busqueda actual."
                title="Sin tipos visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Top de productos por rotacion." title="Productos mas vendidos">
            {filteredTopProducts.length ? (
              <ProgressList items={filteredTopProducts} mode="number" />
            ) : (
              <EmptyState
                description="No se encontraron productos visibles."
                title="Sin top visible"
              />
            )}
          </Panel>

          <Panel subtitle="Categorias con mejor desempeno comercial." title="Categorias con mayor venta">
            {filteredCategorySales.length ? (
              <ProgressList items={filteredCategorySales} />
            ) : (
              <EmptyState
                description="No hay categorias visibles con este filtro."
                title="Sin categorias visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Comparativo del ticket promedio por semana." title="Ticket promedio semanal">
            {filteredWeeklyAverageTicket.length ? (
              <BarChart items={filteredWeeklyAverageTicket} />
            ) : (
              <EmptyState
                description="No hay serie semanal visible."
                title="Sin ticket visible"
              />
            )}
          </Panel>

          <Panel subtitle="Momentos del dia con mayor volumen." title="Horas pico">
            {filteredPeakHours.length ? (
              <ProgressList
                items={filteredPeakHours.map((item) => ({
                  label: item.label,
                  value: item.value,
                  note: 'Pedidos registrados',
                }))}
                mode="number"
              />
            ) : (
              <EmptyState
                description="No hay horas pico visibles con este filtro."
                title="Sin horas pico visibles"
              />
            )}
          </Panel>

          <Panel
            className="restaurant-manager-panel--span-3"
            subtitle="Promociones con mejor aporte a ventas."
            title="Promociones con mejor rendimiento"
          >
            {filteredPromoPerformance.length ? (
              <ProgressList items={filteredPromoPerformance} />
            ) : (
              <EmptyState
                description="No hay promociones visibles para este filtro."
                title="Sin promos visibles"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderConfiguracion() {
    return (
      <>
        <section className="restaurant-manager-metrics-grid restaurant-manager-metrics-grid--compact">
          <MetricCard
            icon="reservations"
            label="Mesas"
            note="Configuradas en el sistema"
            tone="success"
            trend="Salon"
            value={formatNumber(demo.settings.tables.length)}
          />
          <MetricCard
            icon="menu"
            label="Categorias de menu"
            note="Activas"
            tone="info"
            trend="Carta"
            value={formatNumber(demo.settings.menuCategories.length)}
          />
          <MetricCard
            icon="settings"
            label="Integraciones"
            note="Activas o simuladas"
            tone="neutral"
            trend="Escalable"
            value={formatNumber(demo.settings.integrations.length)}
          />
        </section>

        <section className="restaurant-manager-grid restaurant-manager-grid--config">
          <Panel className="restaurant-manager-panel--span-2" subtitle="Pantalla visual no funcional." title="Identidad del negocio">
            <div className="restaurant-manager-settings-grid">
              <div className="restaurant-manager-brand-card">
                <div className="restaurant-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.businessName}</strong>
                  <p>Operacion demo para pedidos, cocina, reservaciones y menu digital.</p>
                </div>
              </div>

              <div className="restaurant-manager-field-grid">
                <div className="restaurant-manager-field-card">
                  <span>Nombre del negocio</span>
                  <strong>{demo.settings.businessName}</strong>
                </div>
                <div className="restaurant-manager-field-card">
                  <span>Sucursal</span>
                  <strong>{demo.business.branch}</strong>
                </div>
                <div className="restaurant-manager-field-card">
                  <span>Color principal</span>
                  <div className="restaurant-manager-color-preview">
                    <span
                      className="restaurant-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.business.primaryColor }}
                    />
                    <strong>{demo.business.primaryColor}</strong>
                  </div>
                </div>
                <div className="restaurant-manager-field-card">
                  <span>Soporte</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Horarios del negocio demo." title="Horarios">
            <div className="restaurant-manager-stack">
              {demo.settings.schedules.map((item) => (
                <article key={item} className="restaurant-manager-list-card">
                  <div className="restaurant-manager-list-card__header">
                    <strong>{item}</strong>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Mesas disponibles para reservacion o servicio." title="Mesas">
            <div className="restaurant-manager-chip-list">
              {demo.settings.tables.map((item) => (
                <span key={item} className="restaurant-manager-chip">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Categorias editables del menu." title="Categorias">
            <div className="restaurant-manager-chip-list">
              {demo.settings.menuCategories.map((item) => (
                <span key={item} className="restaurant-manager-chip restaurant-manager-chip--soft">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Medios de cobro visibles en pedidos." title="Metodos de pago">
            <div className="restaurant-manager-chip-list">
              {demo.settings.paymentMethods.map((item) => (
                <span key={item} className="restaurant-manager-chip restaurant-manager-chip--soft">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel
            className="restaurant-manager-panel--span-3"
            subtitle="Integraciones simuladas para una version real del sistema."
            title="Integraciones"
          >
            <div className="restaurant-manager-integration-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="restaurant-manager-integration-card">
                  <div className="restaurant-manager-integration-card__header">
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
    if (activeModule === 'pedidos') {
      return renderPedidos();
    }

    if (activeModule === 'menu') {
      return renderMenu();
    }

    if (activeModule === 'reservaciones') {
      return renderReservaciones();
    }

    if (activeModule === 'cocina') {
      return renderCocina();
    }

    if (activeModule === 'clientes') {
      return renderClientes();
    }

    if (activeModule === 'promociones') {
      return renderPromociones();
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
      className="restaurant-manager-demo"
      style={{
        '--restaurant-primary': demo.business.primaryColor,
        '--restaurant-accent': demo.business.accentColor,
        '--restaurant-support': demo.business.supportColor,
      }}
    >
      <div className="restaurant-manager-app-shell">
        <aside className="restaurant-manager-sidebar">
          <div className="restaurant-manager-sidebar__header">
            <span className="restaurant-manager-pill restaurant-manager-pill--dark">Demo restaurante / cafe</span>
            <h2>{demo.appName}</h2>
            <p>Panel interno para operar pedidos, cocina, reservaciones, clientes y promociones.</p>
          </div>

          <div className="restaurant-manager-sidebar__business">
            <div className="restaurant-manager-sidebar__mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} - {demo.business.plan}
              </span>
            </div>
          </div>

          <div className="restaurant-manager-sidebar__summary">
            <article className="restaurant-manager-sidebar__summary-card">
              <span>Meta diaria</span>
              <strong>{formatCurrency(demo.business.dailyGoal)}</strong>
            </article>
            <article className="restaurant-manager-sidebar__summary-card">
              <span>Mesas activas</span>
              <strong>{formatNumber(tableStatusCount.ocupada + tableStatusCount.reservada)}</strong>
            </article>
          </div>

          <nav className="restaurant-manager-sidebar__nav" aria-label="Modulos del sistema restaurantero">
            {restaurantManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`restaurant-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="restaurant-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="restaurant-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="restaurant-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="restaurant-manager-sidebar__footer">
            <div className="restaurant-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Respuesta demo estimada: {demo.business.responseTime}</span>
            </div>

            <div className="restaurant-manager-sidebar__actions">
              <Link className="restaurant-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a
                className="restaurant-manager-primary-link"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="restaurant-manager-main">
          <header className="restaurant-manager-topbar">
            <div className="restaurant-manager-topbar__identity">
              <div>
                <p className="restaurant-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleMeta.description}</p>
              </div>
            </div>

            <label className="restaurant-manager-search">
              <span className="restaurant-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar pedido, cliente, mesa, promo o producto..."
                type="search"
                value={query}
              />
            </label>

            <div className="restaurant-manager-topbar__actions">
              <button
                className="restaurant-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'pedidos',
                    'Accion simulada: se abriria el flujo para nuevo pedido.',
                  )
                }
                type="button"
              >
                Nuevo pedido
              </button>
              <button
                className="restaurant-manager-topbar__button restaurant-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'menu',
                    'Accion simulada: se abriria la edicion del menu.',
                  )
                }
                type="button"
              >
                Editar menu
              </button>
              <a
                className="restaurant-manager-topbar__button restaurant-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="restaurant-manager-banner">
            <div className="restaurant-manager-banner__content">
              <span className="restaurant-manager-pill restaurant-manager-pill--soft">
                Demo visual con datos simulados
              </span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="restaurant-manager-banner__stats">
              <div className="restaurant-manager-banner__stat">
                <span>Ventas del dia</span>
                <strong>{formatCurrency(todaySalesTotal)}</strong>
              </div>
              <div className="restaurant-manager-banner__stat">
                <span>Mesas ocupadas o reservadas</span>
                <strong>{formatNumber(tableStatusCount.ocupada + tableStatusCount.reservada)}</strong>
              </div>
            </div>
          </section>

          <section className="restaurant-manager-module-intro">
            <div>
              <span className="restaurant-manager-pill restaurant-manager-pill--muted">{visibleModule.label}</span>
              <h2>{demo.business.name}</h2>
              <p>Sistema demo para administrar servicio de piso, barra, cocina y relacion con clientes.</p>
            </div>

            <div className="restaurant-manager-module-intro__stats">
              <div>
                <span>Busqueda activa</span>
                <strong>{query.trim() ? query : 'Sin filtro'}</strong>
              </div>
              <div>
                <span>Sucursal</span>
                <strong>{demo.business.branch}</strong>
              </div>
            </div>
          </section>

          <div className="restaurant-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="restaurant-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
