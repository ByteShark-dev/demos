import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { stockManagerDemoData, stockManagerModules } from '../data/stockManagerDemo.js';
import '../styles/stock-manager.css';

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

const moduleMeta = {
  dashboard: {
    description: 'Resumen operativo de ventas, inventario, alertas y reposicion.',
    icon: 'dashboard',
  },
  inventario: {
    description: 'Control visual de stock, costos, margen y alertas por producto.',
    icon: 'inventory',
  },
  ventas: {
    description: 'Listado del dia, tickets simulados y metodos de pago visibles.',
    icon: 'sales',
  },
  productos: {
    description: 'Catalogo comercial con SKU, margen, estado y productos destacados.',
    icon: 'products',
  },
  proveedores: {
    description: 'Seguimiento de proveedores, compras sugeridas y contacto rapido.',
    icon: 'suppliers',
  },
  'stock-bajo': {
    description: 'Alertas de reposicion con prioridad, unidades sugeridas y proveedor.',
    icon: 'low',
  },
  movimientos: {
    description: 'Historial de entradas, salidas, ajustes y devoluciones recientes.',
    icon: 'moves',
  },
  reportes: {
    description: 'Metricas visuales para categoria, margen y rotacion de inventario.',
    icon: 'reports',
  },
  configuracion: {
    description: 'Pantalla visual para categorias, pagos, impuestos e integraciones.',
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

  return stockManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getBadgeTone(value) {
  const normalizedValue = normalizeText(value);

  if (
    [
      'pagado',
      'activo',
      'disponible',
      'entrada',
      'destacado',
    ].includes(normalizedValue)
  ) {
    return 'success';
  }

  if (
    [
      'pendiente',
      'bajo',
      'media',
      'simulada',
      'revisar',
      'ajuste',
    ].includes(normalizedValue)
  ) {
    return 'warning';
  }

  if (
    [
      'agotado',
      'cancelado',
      'alta',
      'inactivo',
      'salida',
    ].includes(normalizedValue)
  ) {
    return 'danger';
  }

  if (['devolucion'].includes(normalizedValue)) {
    return 'info';
  }

  return 'neutral';
}

function getActivityIcon(type) {
  if (type === 'venta') {
    return 'sales';
  }

  if (type === 'proveedor') {
    return 'suppliers';
  }

  if (type === 'movimiento') {
    return 'moves';
  }

  if (type === 'inventario') {
    return 'inventory';
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

  if (name === 'inventory') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 3 4 7v10l8 4 8-4V7Z" />
        <path d="m4 7 8 4 8-4" />
        <path d="M12 11v10" />
      </svg>
    );
  }

  if (name === 'sales') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (name === 'products') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 7h16" />
        <path d="M8 7V4h8v3" />
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8 12h8" />
      </svg>
    );
  }

  if (name === 'suppliers') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h3l4 4v1h-7z" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    );
  }

  if (name === 'low') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M12 4 3.5 19h17L12 4Z" />
        <path d="M12 10v4" />
        <circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'moves') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M7 7h11" />
        <path d="m14 4 4 3-4 3" />
        <path d="M17 17H6" />
        <path d="m10 14-4 3 4 3" />
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

  if (name === 'ticket') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M5 7h14v10H5z" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
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

  if (name === 'clock') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
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

  return <span className={`stock-manager-badge stock-manager-badge--${finalTone}`}>{children}</span>;
}

function MetricCard({ label, value, note, icon, tone = 'neutral', trend }) {
  return (
    <article className={`stock-manager-metric-card stock-manager-metric-card--${tone}`}>
      <div className="stock-manager-metric-card__header">
        <div className="stock-manager-metric-card__icon">
          <Icon name={icon} />
        </div>
        {trend ? <span className="stock-manager-pill stock-manager-pill--muted">{trend}</span> : null}
      </div>
      <div className="stock-manager-metric-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`stock-manager-panel ${className}`.trim()}>
      <header className="stock-manager-panel__header">
        <div>
          <h2 className="stock-manager-panel__title">{title}</h2>
          {subtitle ? <p className="stock-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="stock-manager-empty-state">
      <div className="stock-manager-empty-state__icon">
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

    if (mode === 'ratio') {
      return `${value}x`;
    }

    return formatCurrency(value);
  }

  return (
    <div className="stock-manager-progress-list">
      {items.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 12);

        return (
          <article key={item.label} className="stock-manager-progress-list__item">
            <div className="stock-manager-progress-list__header">
              <div>
                <strong>{item.label}</strong>
                {item.note ? <p>{item.note}</p> : null}
              </div>
              <span>{formatValue(item.value)}</span>
            </div>
            <div className="stock-manager-progress-list__track">
              <div className="stock-manager-progress-list__bar" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CategoryBars({ items }) {
  const maxValue = Math.max(...items.map((item) => item.sales), 1);

  return (
    <div className="stock-manager-category-bars">
      {items.map((item) => {
        const width = Math.max((item.sales / maxValue) * 100, 16);

        return (
          <article key={item.label} className="stock-manager-category-bars__item">
            <div className="stock-manager-category-bars__header">
              <strong>{item.label}</strong>
              <span>{formatCurrency(item.sales)}</span>
            </div>
            <div className="stock-manager-category-bars__meta">
              <span>{item.units} unidades</span>
              <span>Margen {item.margin}%</span>
            </div>
            <div className="stock-manager-category-bars__track">
              <div className="stock-manager-category-bars__bar" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MonthlyChart({ items }) {
  const maxValue = Math.max(...items.map((item) => item.sales), 1);

  return (
    <div className="stock-manager-monthly-chart">
      {items.map((item) => {
        const height = Math.max((item.sales / maxValue) * 100, 18);

        return (
          <article key={item.month} className="stock-manager-monthly-chart__item">
            <div className="stock-manager-monthly-chart__canvas">
              <div className="stock-manager-monthly-chart__bar" style={{ height: `${height}%` }} />
            </div>
            <div className="stock-manager-monthly-chart__meta">
              <strong>{item.month}</strong>
              <span>{formatCurrency(item.sales)}</span>
              <small>Profit {formatCurrency(item.profit)}</small>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function StockManagerPage() {
  const demo = stockManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi negocio.`,
  );

  const productByName = Object.fromEntries(demo.products.map((item) => [item.name, item]));
  const salesSorted = [...demo.sales].sort((left, right) => new Date(right.dateTime) - new Date(left.dateTime));
  const movementSorted = [...demo.movements].sort(
    (left, right) => new Date(right.dateTime) - new Date(left.dateTime),
  );

  const activeProducts = demo.products.filter((item) => item.active === 'activo');
  const lowStockItems = demo.lowStock;
  const pendingSuppliers = demo.suppliers.filter((item) => ['pendiente', 'revisar'].includes(item.status));
  const availableProducts = demo.products.filter((item) => item.status === 'disponible');
  const outOfStockProducts = demo.products.filter((item) => item.status === 'agotado');
  const productsTodaySales = salesSorted.filter(
    (item) => item.dateTime.startsWith('2026-06-20') && item.status !== 'cancelado',
  );
  const paidTodaySales = productsTodaySales.filter((item) => item.status === 'pagado');
  const salesTodayTotal = sumBy(productsTodaySales, (item) => item.total);
  const estimatedProfitToday = sumBy(
    productsTodaySales,
    (sale) =>
      sale.products.reduce((total, productName) => {
        const product = productByName[productName];

        return total + (product ? product.price - product.cost : 0);
      }, 0),
  );
  const inventoryValued = sumBy(demo.products, (item) => item.stockCurrent * item.cost);
  const inventoryPotentialMargin = sumBy(
    demo.products,
    (item) => item.stockCurrent * Math.max(item.price - item.cost, 0),
  );
  const averageTicket = Math.round(
    salesTodayTotal / Math.max(productsTodaySales.length, 1),
  );
  const reorderOrders = lowStockItems.filter((item) => ['alta', 'media'].includes(item.priority)).length;
  const monthlyProfitEstimate = demo.reports.monthlySeries.at(-1)?.profit ?? 0;
  const activeFeaturedProducts = demo.products.filter((item) => item.featured && item.active === 'activo');

  const topProducts = [...demo.products]
    .sort((left, right) => right.monthlyUnitsSold - left.monthlyUnitsSold)
    .map((item) => ({
      label: item.name,
      value: item.monthlyUnitsSold,
      note: `${item.category} - ${formatCurrency(item.price)}`,
    }));

  const marginProducts = [...demo.products]
    .map((item) => ({
      label: item.name,
      value: item.price - item.cost,
      note: `${item.sku} - ${item.category}`,
    }))
    .sort((left, right) => right.value - left.value);

  const rotationItems = demo.reports.rotation.map((item) => ({
    label: item.label,
    value: item.value,
    note: 'Movimientos por nivel de stock',
  }));

  const filteredInventory = demo.products.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.sku,
      item.category,
      item.status,
      item.active,
      item.supplier,
      `${item.stockCurrent}`,
      `${item.stockMin}`,
    ]),
  );

  const filteredSales = salesSorted.filter((item) =>
    matchesQuery(query, [
      item.folio,
      item.customer,
      item.paymentMethod,
      item.status,
      item.dateTime,
      item.products.join(' '),
    ]),
  );

  const filteredProducts = demo.products.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.sku,
      item.category,
      item.status,
      item.active,
      item.supplier,
      item.featured ? 'destacado' : 'regular',
    ]),
  );

  const filteredSuppliers = demo.suppliers.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.contact,
      item.phone,
      item.category,
      item.status,
      item.note,
    ]),
  );

  const filteredLowStock = demo.lowStock.filter((item) =>
    matchesQuery(query, [
      item.product,
      item.priority,
      item.status,
      item.supplier,
      `${item.stockCurrent}`,
      `${item.stockMin}`,
      `${item.suggestedUnits}`,
    ]),
  );

  const filteredMovements = movementSorted.filter((item) =>
    matchesQuery(query, [
      item.product,
      item.type,
      item.responsible,
      item.note,
      item.dateTime,
      `${item.quantity}`,
    ]),
  );

  const filteredDashboardAlerts = demo.dashboard.alerts.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.level]),
  );

  const filteredRecentActivity = demo.dashboard.recentActivity.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.timestamp, item.type]),
  );

  const filteredCategorySales = demo.dashboard.salesByCategory.filter((item) =>
    matchesQuery(query, [item.label, `${item.sales}`, `${item.units}`, `${item.margin}`]),
  );

  const filteredProviderPending = demo.dashboard.providerPending.filter((item) =>
    matchesQuery(query, [item.supplier, item.note, item.due, item.status]),
  );

  const filteredTopProducts = topProducts.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredMarginProducts = marginProducts.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredImmobilized = demo.reports.immobilizedStock.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.units}`, `${item.days}`]),
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

  const visibleModule = stockManagerModules.find((item) => item.id === activeModule) ?? stockManagerModules[0];
  const visibleMeta = moduleMeta[visibleModule.id];
  const moduleCounters = {
    dashboard: 'Live',
    inventario: formatNumber(demo.products.length),
    ventas: formatNumber(productsTodaySales.length),
    productos: formatNumber(activeFeaturedProducts.length),
    proveedores: formatNumber(demo.suppliers.length),
    'stock-bajo': formatNumber(lowStockItems.length),
    movimientos: formatNumber(demo.movements.length),
    reportes: formatNumber(demo.dashboard.salesByCategory.length),
    configuracion: formatNumber(demo.settings.integrations.length),
  };

  function renderDashboard() {
    return (
      <>
        <section className="stock-manager-metrics-grid">
          <MetricCard
            icon="sales"
            label="Ventas del dia"
            note="Tickets vigentes del 20 de junio"
            tone="success"
            trend={`${productsTodaySales.length} tickets`}
            value={formatCurrency(salesTodayTotal)}
          />
          <MetricCard
            icon="products"
            label="Productos activos"
            note="Listos para venta"
            tone="info"
            trend={`${activeProducts.length} activos`}
            value={formatNumber(activeProducts.length)}
          />
          <MetricCard
            icon="low"
            label="Productos con stock bajo"
            note="Foco de reposicion"
            tone="warning"
            trend={`${outOfStockProducts.length} agotados`}
            value={formatNumber(lowStockItems.length)}
          />
          <MetricCard
            icon="inventory"
            label="Inventario valorizado"
            note="Costo estimado en piso"
            tone="neutral"
            trend={`${availableProducts.length} disponibles`}
            value={formatCurrency(inventoryValued)}
          />
          <MetricCard
            icon="spark"
            label="Ganancia estimada"
            note="Margen potencial del dia"
            tone="success"
            trend="Solo simulacion"
            value={formatCurrency(estimatedProfitToday)}
          />
          <MetricCard
            icon="suppliers"
            label="Ordenes de reposicion"
            note="Sugeridas por stock bajo"
            tone="warning"
            trend={`${pendingSuppliers.length} proveedores pendientes`}
            value={formatNumber(reorderOrders)}
          />
        </section>

        <section className="stock-manager-grid">
          <Panel
            className="stock-manager-panel--span-2"
            subtitle="Rotacion mensual por producto con foco comercial."
            title="Productos mas vendidos"
          >
            {filteredTopProducts.length ? (
              <ProgressList
                items={filteredTopProducts.slice(0, 5)}
                mode="number"
              />
            ) : (
              <EmptyState
                description="No hay productos coincidentes con el filtro actual."
                title="Sin productos visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Alertas criticas para no perder venta." title="Alertas de stock bajo">
            {filteredLowStock.length ? (
              <div className="stock-manager-stack">
                {filteredLowStock.slice(0, 4).map((item) => (
                  <article key={item.id} className="stock-manager-alert-card">
                    <div className="stock-manager-alert-card__header">
                      <div>
                        <strong>{item.product}</strong>
                        <p>
                          Stock {item.stockCurrent} / minimo {item.stockMin}
                        </p>
                      </div>
                      <StatusBadge>{item.priority}</StatusBadge>
                    </div>
                    <div className="stock-manager-alert-card__meta">
                      <span>{item.suggestedUnits} sugeridas</span>
                      <span>{item.supplier}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay alertas visibles con la busqueda actual."
                title="Sin alertas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Entradas, salidas y ajustes mas recientes." title="Movimientos recientes">
            {filteredMovements.length ? (
              <div className="stock-manager-stack">
                {filteredMovements.slice(0, 5).map((item) => (
                  <article key={item.id} className="stock-manager-list-card">
                    <div className="stock-manager-list-card__header">
                      <div>
                        <strong>{item.product}</strong>
                        <p>{item.note}</p>
                      </div>
                      <StatusBadge>{item.type}</StatusBadge>
                    </div>
                    <div className="stock-manager-list-card__meta">
                      <span>{formatDateTime(item.dateTime)}</span>
                      <span>{item.responsible}</span>
                      <span>{item.quantity > 0 ? `+${item.quantity}` : item.quantity}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay movimientos relacionados con el filtro."
                title="Sin movimientos visibles"
              />
            )}
          </Panel>

          <Panel
            className="stock-manager-panel--span-2"
            subtitle="Participacion por categoria y nivel de margen."
            title="Resumen de ventas por categoria"
          >
            {filteredCategorySales.length ? (
              <CategoryBars items={filteredCategorySales} />
            ) : (
              <EmptyState
                description="No se encontraron categorias para el filtro actual."
                title="Sin categorias visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Compras o seguimiento por confirmar." title="Proveedores pendientes">
            {filteredProviderPending.length ? (
              <div className="stock-manager-stack">
                {filteredProviderPending.map((item) => (
                  <article key={item.supplier} className="stock-manager-provider-card">
                    <div className="stock-manager-provider-card__header">
                      <strong>{item.supplier}</strong>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                    <p>{item.note}</p>
                    <div className="stock-manager-provider-card__meta">
                      <span>{item.due}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay proveedores coincidentes con la busqueda."
                title="Sin proveedores visibles"
              />
            )}
          </Panel>

          <Panel
            className="stock-manager-panel--span-3"
            subtitle="Bitacora rapida de eventos operativos del negocio."
            title="Actividad reciente"
          >
            {filteredRecentActivity.length ? (
              <div className="stock-manager-activity-list">
                {filteredRecentActivity.map((item) => (
                  <article key={item.title} className="stock-manager-activity-list__item">
                    <div className="stock-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="stock-manager-activity-list__body">
                      <div className="stock-manager-activity-list__head">
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
                description="No hay actividad visible con este filtro."
                title="Actividad no encontrada"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderInventario() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="inventory"
            label="Inventario valorizado"
            note="Costo acumulado"
            tone="neutral"
            trend="Stock actual"
            value={formatCurrency(inventoryValued)}
          />
          <MetricCard
            icon="spark"
            label="Ganancia potencial"
            note="Margen sobre stock disponible"
            tone="success"
            trend="Proyeccion"
            value={formatCurrency(inventoryPotentialMargin)}
          />
          <MetricCard
            icon="low"
            label="Lineas criticas"
            note="Bajo o agotado"
            tone="warning"
            trend="Revisar hoy"
            value={formatNumber(lowStockItems.length)}
          />
          <MetricCard
            icon="products"
            label="Productos agotados"
            note="Sin venta inmediata"
            tone="danger"
            trend="Reponer"
            value={formatNumber(outOfStockProducts.length)}
          />
        </section>

        <Panel subtitle="Stock actual, minimo, costo y margen por producto." title="Inventario">
          {filteredInventory.length ? (
            <div className="stock-manager-table-shell">
              <table className="stock-manager-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoria</th>
                    <th>Stock actual</th>
                    <th>Stock minimo</th>
                    <th>Precio</th>
                    <th>Costo</th>
                    <th>Ganancia estimada</th>
                    <th>Estado</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const unitMargin = item.price - item.cost;

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="stock-manager-table__primary">
                            <strong>{item.name}</strong>
                            <span>{item.sku}</span>
                          </div>
                        </td>
                        <td>{item.category}</td>
                        <td>{formatNumber(item.stockCurrent)}</td>
                        <td>{formatNumber(item.stockMin)}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{formatCurrency(item.cost)}</td>
                        <td>{formatCurrency(unitMargin)}</td>
                        <td>
                          <StatusBadge>{item.status}</StatusBadge>
                        </td>
                        <td>
                          <button
                            className="stock-manager-inline-button"
                            onClick={() =>
                              showNotice(`Accion simulada: ajuste de stock abierto para ${item.name}.`)
                            }
                            type="button"
                          >
                            Ajustar stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por nombre, SKU, estado, proveedor o categoria."
              title="No hay inventario visible"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderVentas() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="sales"
            label="Ventas del dia"
            note="Tickets activos"
            tone="success"
            trend={`${productsTodaySales.length} tickets`}
            value={formatCurrency(salesTodayTotal)}
          />
          <MetricCard
            icon="ticket"
            label="Tickets cobrados"
            note="Pagados hoy"
            tone="info"
            trend="Caja viva"
            value={formatNumber(paidTodaySales.length)}
          />
          <MetricCard
            icon="clock"
            label="Ticket promedio"
            note="Promedio del dia"
            tone="neutral"
            trend="Venta mostrador"
            value={formatCurrency(averageTicket)}
          />
          <MetricCard
            icon="low"
            label="Ventas pendientes"
            note="Cobro por cerrar"
            tone="warning"
            trend="Revisar"
            value={formatNumber(productsTodaySales.filter((item) => item.status === 'pendiente').length)}
          />
        </section>

        <Panel subtitle="Folio, productos, total y metodo de pago." title="Ventas">
          {filteredSales.length ? (
            <div className="stock-manager-table-shell">
              <table className="stock-manager-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Metodo de pago</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((item) => (
                    <tr key={item.id}>
                      <td>{item.folio}</td>
                      <td>{item.customer}</td>
                      <td>
                        <div className="stock-manager-table__primary">
                          <strong>{item.products[0]}</strong>
                          <span>
                            {item.products.length > 1
                              ? `${item.products.length} productos en total`
                              : '1 producto'}
                          </span>
                        </div>
                      </td>
                      <td>{formatCurrency(item.total)}</td>
                      <td>{item.paymentMethod}</td>
                      <td>
                        <StatusBadge>{item.status}</StatusBadge>
                      </td>
                      <td>{formatDateTime(item.dateTime)}</td>
                      <td>
                        <button
                          className="stock-manager-inline-button stock-manager-inline-button--ghost"
                          onClick={() =>
                            showNotice(`Vista demo: ticket ${item.folio} abierto en modo simulacion.`)
                          }
                          type="button"
                        >
                          <Icon name="ticket" />
                          Ver ticket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por folio, cliente, producto o metodo de pago."
              title="No hay ventas visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderProductos() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="products"
            label="Productos activos"
            note="Catalogo para venta"
            tone="success"
            trend="Listos"
            value={formatNumber(activeProducts.length)}
          />
          <MetricCard
            icon="spark"
            label="Destacados"
            note="Con prioridad comercial"
            tone="info"
            trend="Exhibicion"
            value={formatNumber(activeFeaturedProducts.length)}
          />
          <MetricCard
            icon="inventory"
            label="Margen promedio"
            note="Sobre productos activos"
            tone="neutral"
            trend="Comercial"
            value={formatCurrency(
              Math.round(
                sumBy(activeProducts, (item) => item.price - item.cost) / Math.max(activeProducts.length, 1),
              ),
            )}
          />
        </section>

        <Panel subtitle="Catalogo visual con precio, costo, margen y estado." title="Productos">
          {filteredProducts.length ? (
            <div className="stock-manager-product-grid">
              {filteredProducts.map((item) => {
                const margin = item.price - item.cost;
                const marginPercent = Math.round((margin / item.price) * 100);

                return (
                  <article key={item.id} className="stock-manager-product-card">
                    <div className="stock-manager-product-card__header">
                      <div>
                        <strong>{item.name}</strong>
                        <p>
                          {item.sku} - {item.category}
                        </p>
                      </div>
                      <div className="stock-manager-product-card__badges">
                        <StatusBadge>{item.active}</StatusBadge>
                        {item.featured ? <StatusBadge tone="info">destacado</StatusBadge> : null}
                      </div>
                    </div>

                    <div className="stock-manager-product-card__stats">
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
                        <span>% margen</span>
                        <strong>{marginPercent}%</strong>
                      </div>
                    </div>

                    <div className="stock-manager-product-card__footer">
                      <span>Proveedor: {item.supplier}</span>
                      <StatusBadge>{item.status}</StatusBadge>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              description="Busca por nombre, SKU, categoria o proveedor."
              title="No hay productos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderProveedores() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="suppliers"
            label="Proveedores activos"
            note="Relacion operativa"
            tone="success"
            trend="Base actual"
            value={formatNumber(demo.suppliers.filter((item) => item.status === 'activo').length)}
          />
          <MetricCard
            icon="clock"
            label="Pendientes"
            note="Seguimiento o compra"
            tone="warning"
            trend="Accion sugerida"
            value={formatNumber(pendingSuppliers.length)}
          />
          <MetricCard
            icon="products"
            label="Categorias cubiertas"
            note="Surtido por rubro"
            tone="neutral"
            trend="Diversificado"
            value={formatNumber(demo.categories.length)}
          />
        </section>

        <Panel subtitle="Contacto, categoria, ultimo pedido y seguimiento sugerido." title="Proveedores">
          {filteredSuppliers.length ? (
            <div className="stock-manager-stack">
              {filteredSuppliers.map((item) => (
                <article key={item.id} className="stock-manager-supplier-card">
                  <div className="stock-manager-supplier-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        {item.contact} - {item.category}
                      </p>
                    </div>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>

                  <div className="stock-manager-supplier-card__meta">
                    <span>Ultimo pedido: {formatDate(item.lastOrder)}</span>
                    <span>Proximo sugerido: {formatDate(item.nextSuggestedOrder)}</span>
                  </div>

                  <p>{item.note}</p>

                  <div className="stock-manager-inline-actions">
                    <button
                      className="stock-manager-inline-button"
                      onClick={() =>
                        showNotice(`Accion simulada: WhatsApp abierto con ${item.name}.`)
                      }
                      type="button"
                    >
                      <Icon name="message" />
                      WhatsApp
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Busca por nombre, contacto, categoria o estado."
              title="No hay proveedores visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderStockBajo() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="low"
            label="Productos criticos"
            note="Alta prioridad"
            tone="danger"
            trend="No perder venta"
            value={formatNumber(lowStockItems.filter((item) => item.priority === 'alta').length)}
          />
          <MetricCard
            icon="suppliers"
            label="Reposiciones sugeridas"
            note="Ordenes por generar"
            tone="warning"
            trend="Compra operativa"
            value={formatNumber(reorderOrders)}
          />
          <MetricCard
            icon="inventory"
            label="Unidades por comprar"
            note="Suma sugerida"
            tone="info"
            trend="Planeacion"
            value={formatNumber(sumBy(lowStockItems, (item) => item.suggestedUnits))}
          />
        </section>

        <Panel subtitle="Productos con reposicion sugerida y prioridad operativa." title="Stock bajo">
          {filteredLowStock.length ? (
            <div className="stock-manager-stock-grid">
              {filteredLowStock.map((item) => (
                <article key={item.id} className="stock-manager-stock-card">
                  <div className="stock-manager-stock-card__header">
                    <div>
                      <strong>{item.product}</strong>
                      <p>{item.supplier}</p>
                    </div>
                    <div className="stock-manager-stock-card__badges">
                      <StatusBadge>{item.status}</StatusBadge>
                      <StatusBadge>{item.priority}</StatusBadge>
                    </div>
                  </div>

                  <div className="stock-manager-stock-card__stats">
                    <div>
                      <span>Stock actual</span>
                      <strong>{item.stockCurrent}</strong>
                    </div>
                    <div>
                      <span>Stock minimo</span>
                      <strong>{item.stockMin}</strong>
                    </div>
                    <div>
                      <span>Sugeridas</span>
                      <strong>{item.suggestedUnits}</strong>
                    </div>
                  </div>

                  <button
                    className="stock-manager-inline-button"
                    onClick={() =>
                      showNotice(`Accion simulada: orden de reposicion creada para ${item.product}.`)
                    }
                    type="button"
                  >
                    Crear orden de reposicion
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay alertas de stock bajo que coincidan con la busqueda."
              title="Sin alertas visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderMovimientos() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="moves"
            label="Movimientos del dia"
            note="Entradas, salidas y ajustes"
            tone="info"
            trend="Operacion"
            value={formatNumber(movementSorted.filter((item) => item.dateTime.startsWith('2026-06-20')).length)}
          />
          <MetricCard
            icon="sales"
            label="Salidas"
            note="Relacionadas a venta"
            tone="warning"
            trend="Caja"
            value={formatNumber(movementSorted.filter((item) => item.type === 'salida').length)}
          />
          <MetricCard
            icon="inventory"
            label="Entradas"
            note="Mercancia repuesta"
            tone="success"
            trend="Abastecimiento"
            value={formatNumber(movementSorted.filter((item) => item.type === 'entrada').length)}
          />
        </section>

        <Panel subtitle="Bitacora de cambios y responsables." title="Movimientos">
          {filteredMovements.length ? (
            <div className="stock-manager-table-shell">
              <table className="stock-manager-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Responsable</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDateTime(item.dateTime)}</td>
                      <td>{item.product}</td>
                      <td>
                        <StatusBadge>{item.type}</StatusBadge>
                      </td>
                      <td>{item.quantity > 0 ? `+${item.quantity}` : item.quantity}</td>
                      <td>{item.responsible}</td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por producto, tipo, responsable o nota."
              title="No hay movimientos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderReportes() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="reports"
            label="Ganancia mensual"
            note="Mes actual"
            tone="success"
            trend="Estimacion"
            value={formatCurrency(monthlyProfitEstimate)}
          />
          <MetricCard
            icon="inventory"
            label="Stock inmovilizado"
            note="Productos lentos"
            tone="warning"
            trend="Reactivar"
            value={formatNumber(filteredImmobilized.length)}
          />
          <MetricCard
            icon="spark"
            label="Rotacion promedio"
            note="Semana actual"
            tone="info"
            trend="Salud del inventario"
            value={`${demo.reports.rotation.at(-1)?.value ?? 0}x`}
          />
        </section>

        <section className="stock-manager-grid">
          <Panel
            className="stock-manager-panel--span-2"
            subtitle="Comparativo de ventas y ganancia estimada."
            title="Ganancia estimada mensual"
          >
            <MonthlyChart items={demo.reports.monthlySeries} />
          </Panel>

          <Panel subtitle="Participacion por categoria." title="Ventas por categoria">
            <CategoryBars items={filteredCategorySales} />
          </Panel>

          <Panel subtitle="Top por rotacion mensual." title="Productos mas vendidos">
            {filteredTopProducts.length ? (
              <ProgressList items={filteredTopProducts.slice(0, 4)} mode="number" />
            ) : (
              <EmptyState
                description="No se encontraron productos para el filtro actual."
                title="Sin productos visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Mejor contribucion por unidad." title="Productos con mayor margen">
            {filteredMarginProducts.length ? (
              <ProgressList items={filteredMarginProducts.slice(0, 4)} />
            ) : (
              <EmptyState
                description="No hay margenes visibles con la busqueda actual."
                title="Sin margenes visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Productos con salida lenta." title="Stock inmovilizado">
            {filteredImmobilized.length ? (
              <div className="stock-manager-stack">
                {filteredImmobilized.map((item) => (
                  <article key={item.label} className="stock-manager-list-card">
                    <div className="stock-manager-list-card__header">
                      <div>
                        <strong>{item.label}</strong>
                        <p>{item.note}</p>
                      </div>
                      <span className="stock-manager-pill stock-manager-pill--muted">
                        {item.days} dias
                      </span>
                    </div>
                    <div className="stock-manager-list-card__meta">
                      <span>{item.units} unidades</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay productos inmovilizados para este filtro."
                title="Sin inmovilizados visibles"
              />
            )}
          </Panel>

          <Panel
            className="stock-manager-panel--span-3"
            subtitle="Velocidad operativa por semana."
            title="Rotacion de inventario"
          >
            <ProgressList items={rotationItems} mode="ratio" />
          </Panel>
        </section>
      </>
    );
  }

  function renderConfiguracion() {
    return (
      <>
        <section className="stock-manager-metrics-grid stock-manager-metrics-grid--compact">
          <MetricCard
            icon="products"
            label="Categorias activas"
            note="Configuradas"
            tone="success"
            trend="Catalogo"
            value={formatNumber(demo.settings.activeCategories.length)}
          />
          <MetricCard
            icon="sales"
            label="Metodos de pago"
            note="Disponibles"
            tone="info"
            trend="Caja"
            value={formatNumber(demo.settings.paymentMethods.length)}
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

        <section className="stock-manager-grid stock-manager-grid--config">
          <Panel
            className="stock-manager-panel--span-2"
            subtitle="Pantalla visual no funcional."
            title="Identidad del negocio"
          >
            <div className="stock-manager-settings-grid">
              <div className="stock-manager-brand-card">
                <div className="stock-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.businessName}</strong>
                  <p>Tienda demo enfocada en stock, ventas, reportes y reposicion comercial.</p>
                </div>
              </div>

              <div className="stock-manager-field-grid">
                <div className="stock-manager-field-card">
                  <span>Nombre del negocio</span>
                  <strong>{demo.settings.businessName}</strong>
                </div>
                <div className="stock-manager-field-card">
                  <span>Sucursal</span>
                  <strong>{demo.business.branch}</strong>
                </div>
                <div className="stock-manager-field-card">
                  <span>Color principal</span>
                  <div className="stock-manager-color-preview">
                    <span
                      className="stock-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.business.primaryColor }}
                    />
                    <strong>{demo.business.primaryColor}</strong>
                  </div>
                </div>
                <div className="stock-manager-field-card">
                  <span>Soporte</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Categorias activas del catalogo." title="Categorias">
            <div className="stock-manager-chip-list">
              {demo.settings.activeCategories.map((item) => (
                <span key={item} className="stock-manager-chip">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Metodos visibles para cobro." title="Metodos de pago">
            <div className="stock-manager-chip-list">
              {demo.settings.paymentMethods.map((item) => (
                <span key={item} className="stock-manager-chip stock-manager-chip--soft">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Ajustes fiscales simulados." title="Impuestos">
            <div className="stock-manager-stack">
              {demo.settings.taxes.map((item) => (
                <article key={item} className="stock-manager-list-card">
                  <div className="stock-manager-list-card__header">
                    <strong>{item}</strong>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel
            className="stock-manager-panel--span-3"
            subtitle="Integraciones simuladas para una version real del sistema."
            title="Integraciones"
          >
            <div className="stock-manager-integration-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="stock-manager-integration-card">
                  <div className="stock-manager-integration-card__header">
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
    if (activeModule === 'inventario') {
      return renderInventario();
    }

    if (activeModule === 'ventas') {
      return renderVentas();
    }

    if (activeModule === 'productos') {
      return renderProductos();
    }

    if (activeModule === 'proveedores') {
      return renderProveedores();
    }

    if (activeModule === 'stock-bajo') {
      return renderStockBajo();
    }

    if (activeModule === 'movimientos') {
      return renderMovimientos();
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
      className="stock-manager-demo"
      style={{
        '--stock-primary': demo.business.primaryColor,
        '--stock-accent': demo.business.accentColor,
      }}
    >
      <div className="stock-manager-app-shell">
        <aside className="stock-manager-sidebar">
          <div className="stock-manager-sidebar__header">
            <span className="stock-manager-pill">Demo inventario / retail</span>
            <h2>{demo.appName}</h2>
            <p>Propuesta visual para controlar stock, ventas, compras y reportes operativos.</p>
          </div>

          <div className="stock-manager-sidebar__business">
            <div className="stock-manager-sidebar__mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} - {demo.business.plan}
              </span>
            </div>
          </div>

          <div className="stock-manager-sidebar__summary">
            <article className="stock-manager-sidebar__summary-card">
              <span>Meta diaria</span>
              <strong>{formatCurrency(demo.business.dailyGoal)}</strong>
            </article>
            <article className="stock-manager-sidebar__summary-card">
              <span>Stock bajo</span>
              <strong>{formatNumber(lowStockItems.length)} alertas</strong>
            </article>
          </div>

          <nav className="stock-manager-sidebar__nav" aria-label="Modulos del sistema de inventario">
            {stockManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`stock-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="stock-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="stock-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="stock-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="stock-manager-sidebar__footer">
            <div className="stock-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Respuesta demo estimada: {demo.business.responseTime}</span>
            </div>

            <div className="stock-manager-sidebar__actions">
              <Link className="stock-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a
                className="stock-manager-primary-link"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="stock-manager-main">
          <header className="stock-manager-topbar">
            <div className="stock-manager-topbar__identity">
              <div>
                <p className="stock-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleMeta.description}</p>
              </div>
            </div>

            <label className="stock-manager-search">
              <span className="stock-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar producto, venta, proveedor o SKU..."
                type="search"
                value={query}
              />
            </label>

            <div className="stock-manager-topbar__actions">
              <button
                className="stock-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'ventas',
                    'Accion simulada: se abriria el flujo para registrar una nueva venta.',
                  )
                }
                type="button"
              >
                Nueva venta
              </button>
              <button
                className="stock-manager-topbar__button stock-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'productos',
                    'Accion simulada: se abriria el formulario para agregar un producto.',
                  )
                }
                type="button"
              >
                Agregar producto
              </button>
              <a
                className="stock-manager-topbar__button stock-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="stock-manager-banner">
            <div className="stock-manager-banner__content">
              <span className="stock-manager-pill stock-manager-pill--soft">
                Demo visual con datos simulados
              </span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="stock-manager-banner__stats">
              <div className="stock-manager-banner__stat">
                <span>Meta del mes</span>
                <strong>{formatCurrency(demo.business.monthlyGoal)}</strong>
              </div>
              <div className="stock-manager-banner__stat">
                <span>Ganancia mensual estimada</span>
                <strong>{formatCurrency(monthlyProfitEstimate)}</strong>
              </div>
            </div>
          </section>

          <section className="stock-manager-module-intro">
            <div>
              <span className="stock-manager-pill stock-manager-pill--muted">{visibleModule.label}</span>
              <h2>{demo.business.name}</h2>
              <p>
                Tienda demo enfocada en inventario, ventas, proveedores y reposicion operativa.
              </p>
            </div>

            <div className="stock-manager-module-intro__stats">
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

          <div className="stock-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="stock-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
