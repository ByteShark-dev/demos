import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { buildWhatsAppUrl } from '../config/site.js';
import { realEstateManagerDemoData, realEstateManagerModules } from '../data/realEstateManagerDemo.js';
import '../styles/real-estate-manager.css';

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
    description: 'Vista general de pipeline, tareas, alertas y finanzas operativas.',
    icon: 'dashboard',
  },
  propiedades: {
    description: 'Portafolio de propiedades con oportunidad, inversion y valor potencial.',
    icon: 'properties',
  },
  prospectos: {
    description: 'Seguimiento de propietarios, causas de salida y proxima accion.',
    icon: 'prospects',
  },
  evaluacion: {
    description: 'Analisis tecnico, legal y financiero para decidir viabilidad.',
    icon: 'evaluation',
  },
  remodelacion: {
    description: 'Control visual de avance, presupuesto y tareas de obra.',
    icon: 'remodel',
  },
  documentos: {
    description: 'Checklist documental por expediente y estatus de recepcion.',
    icon: 'documents',
  },
  finanzas: {
    description: 'Capex, adeudos, precio objetivo, ROI y movimientos simulados.',
    icon: 'finance',
  },
  reportes: {
    description: 'Metricas de estados, oportunidades, zonas y utilidad proyectada.',
    icon: 'reports',
  },
  configuracion: {
    description: 'Pantalla visual para zonas, tipos de propiedad e integraciones.',
    icon: 'settings',
  },
};

const documentLabels = {
  identification: 'Identificacion propietario',
  deeds: 'Escrituras',
  propertyTax: 'Predial',
  water: 'Agua',
  electricity: 'Luz',
  bank: 'Infonavit / banco',
  lienRelease: 'Libertad de gravamen',
  allianceContract: 'Contrato de alianza',
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

  return realEstateManagerModules.some((item) => item.id === id) ? id : 'dashboard';
}

function getStageTone(value) {
  if (['venta', 'cerrado'].includes(value)) {
    return 'success';
  }

  if (['prospecto', 'evaluacion'].includes(value)) {
    return 'info';
  }

  if (['negociacion', 'remodelacion'].includes(value)) {
    return 'warning';
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

function getContactTone(value) {
  if (['interesado', 'contactado'].includes(value)) {
    return 'success';
  }

  if (value === 'nuevo') {
    return 'info';
  }

  if (value === 'no responde') {
    return 'warning';
  }

  return 'danger';
}

function getRiskTone(value) {
  if (value === 'alto') {
    return 'danger';
  }

  if (value === 'medio') {
    return 'warning';
  }

  return 'success';
}

function getViabilityTone(value) {
  if (value === 'alta') {
    return 'success';
  }

  if (value === 'media') {
    return 'warning';
  }

  return 'danger';
}

function getRemodelTone(value) {
  if (['en tiempo', 'terminado'].includes(value)) {
    return 'success';
  }

  if (value === 'retrasado') {
    return 'warning';
  }

  return 'danger';
}

function getDocumentTone(value) {
  if (value === 'recibido') {
    return 'success';
  }

  if (value === 'revisar') {
    return 'warning';
  }

  if (value === 'vencido') {
    return 'danger';
  }

  return 'neutral';
}

function getFinanceTone(value) {
  if (value === 'ingreso-proyectado') {
    return 'success';
  }

  if (value === 'adeudo') {
    return 'danger';
  }

  if (value === 'comision') {
    return 'warning';
  }

  return 'info';
}

function getActivityIcon(type) {
  if (type === 'prospecto') {
    return 'prospects';
  }

  if (type === 'remodelacion') {
    return 'remodel';
  }

  if (type === 'finanzas') {
    return 'finance';
  }

  if (type === 'evaluacion') {
    return 'evaluation';
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

  if (name === 'properties') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    );
  }

  if (name === 'prospects') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M16 19a4 4 0 0 0-8 0" />
        <circle cx="12" cy="10" r="3" />
        <path d="M19 19a3.5 3.5 0 0 0-3-3.46" />
        <path d="M8 15.54A3.5 3.5 0 0 0 5 19" />
      </svg>
    );
  }

  if (name === 'evaluation') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect x="5" y="4" width="11" height="16" rx="2" />
        <path d="M8 8h5" />
        <path d="M8 12h5" />
        <path d="M8 16h3" />
        <path d="m18 18 3 3" />
        <circle cx="17" cy="17" r="3" />
      </svg>
    );
  }

  if (name === 'remodel') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="m14 4 6 6" />
        <path d="m10 8 6 6" />
        <path d="m6 12 6 6" />
        <path d="M3 21h6" />
      </svg>
    );
  }

  if (name === 'documents') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h8" />
        <path d="M9 17h6" />
      </svg>
    );
  }

  if (name === 'finance') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M4 19h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-7" />
      </svg>
    );
  }

  if (name === 'reports') {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M3 18 8 12l4 3 6-8 3 2" />
        <path d="M3 21h18" />
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
  return <span className={`real-estate-manager-badge real-estate-manager-badge--${tone}`}>{children}</span>;
}

function MetricCard({ label, value, note, icon, tone = 'neutral', trend }) {
  return (
    <article className={`real-estate-manager-metric-card real-estate-manager-metric-card--${tone}`}>
      <div className="real-estate-manager-metric-card__header">
        <div className="real-estate-manager-metric-card__icon">
          <Icon name={icon} />
        </div>
        {trend ? <span className="real-estate-manager-pill real-estate-manager-pill--ghost">{trend}</span> : null}
      </div>
      <div className="real-estate-manager-metric-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </article>
  );
}

function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`real-estate-manager-panel ${className}`.trim()}>
      <header className="real-estate-manager-panel__header">
        <div>
          <h2 className="real-estate-manager-panel__title">{title}</h2>
          {subtitle ? <p className="real-estate-manager-panel__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="real-estate-manager-empty-state">
      <div className="real-estate-manager-empty-state__icon">
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

    if (mode === 'days') {
      return `${value} dias`;
    }

    return formatCurrency(value);
  }

  return (
    <div className="real-estate-manager-progress-list">
      {items.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 12);

        return (
          <article key={item.label} className="real-estate-manager-progress-list__item">
            <div className="real-estate-manager-progress-list__header">
              <div>
                <strong>{item.label}</strong>
                {item.note ? <p>{item.note}</p> : null}
              </div>
              <span>{formatValue(item.value)}</span>
            </div>
            <div className="real-estate-manager-progress-list__track">
              <div className="real-estate-manager-progress-list__bar" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function StageMix({ items }) {
  const maxValue = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="real-estate-manager-stage-grid">
      {items.map((item) => {
        const width = Math.max((item.count / maxValue) * 100, 18);

        return (
          <article key={item.label} className="real-estate-manager-stage-card">
            <div className="real-estate-manager-stage-card__header">
              <strong>{item.label}</strong>
              <span>{item.count}</span>
            </div>
            {'value' in item ? <p>{formatCurrency(item.value)}</p> : null}
            <div className="real-estate-manager-stage-card__track">
              <div className="real-estate-manager-stage-card__bar" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function RealEstateManagerPage() {
  const demo = realEstateManagerDemoData;
  const initialModule = typeof window === 'undefined' ? 'dashboard' : getModuleFromHash(window.location.hash);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [query, setQuery] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const requestSystemHref = buildWhatsAppUrl(
    `Hola ByteShark, vi la demo ${demo.appName} y quiero solicitar un sistema similar para mi negocio.`,
  );

  const liveProperties = demo.properties.filter((item) => item.stage !== 'cerrado');
  const prospectsNew = demo.prospects.filter((item) => item.contactStatus === 'nuevo');
  const propertiesInEvaluation = demo.properties.filter((item) => item.stage === 'evaluacion');
  const remodelingInCourse = demo.remodelingProjects.filter((item) => item.status !== 'terminado');
  const investmentEstimated = sumBy(liveProperties, (item) => item.investmentRequired);
  const potentialSaleValue = sumBy(liveProperties, (item) => item.afterRemodelValue);
  const estimatedUtility = sumBy(liveProperties, (item) => item.potentialProfit);
  const pendingDocuments = sumBy(demo.documents, (record) =>
    Object.entries(record).reduce((count, [key, value]) => {
      if (key === 'property') {
        return count;
      }

      return ['pendiente', 'revisar', 'vencido'].includes(value) ? count + 1 : count;
    }, 0),
  );
  const financeDebt = sumBy(demo.evaluations, (item) => item.debtsEstimated);
  const financeRemodelSpend = sumBy(demo.remodelingProjects, (item) => item.currentSpend);
  const commissionsEstimated = sumBy(
    demo.financeMovements.filter((item) => item.type === 'comision'),
    (item) => item.amount,
  );
  const targetSalePrice = sumBy(liveProperties, (item) => item.afterRemodelValue);
  const roiEstimated = Math.round((estimatedUtility / Math.max(investmentEstimated + financeDebt, 1)) * 100);

  const opportunityProperties = [...liveProperties]
    .filter((item) =>
      matchesQuery(query, [
        item.name,
        item.zone,
        item.type,
        item.stage,
        item.priority,
        item.owner,
        `${item.opportunityScore}`,
        `${item.potentialProfit}`,
      ]),
    )
    .sort((left, right) => right.opportunityScore - left.opportunityScore)
    .map((item) => ({
      label: item.name,
      value: item.potentialProfit,
      note: `${item.zone} - score ${item.opportunityScore}`,
    }));

  const zoneOpportunities = demo.reports.zones
    .filter((item) => matchesQuery(query, [item.label, `${item.opportunities}`, `${item.value}`]))
    .map((item) => ({
      label: item.label,
      value: item.value,
      note: `${item.opportunities} oportunidades activas`,
    }));

  const leadSources = demo.reports.leadSources
    .filter((item) => matchesQuery(query, [item.label, `${item.value}`]))
    .map((item) => ({
      label: item.label,
      value: item.value,
      note: 'Prospectos registrados',
    }));

  const averageCloseDays = demo.reports.averageCloseDays
    .filter((item) => matchesQuery(query, [item.label, `${item.value}`]))
    .map((item) => ({
      label: item.label,
      value: item.value,
      note: 'Promedio de cierre',
    }));

  const filteredProperties = demo.properties.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.zone,
      item.type,
      item.stage,
      item.priority,
      item.owner,
      item.source,
      item.notes,
      `${item.currentValue}`,
      `${item.afterRemodelValue}`,
      `${item.investmentRequired}`,
      `${item.potentialProfit}`,
    ]),
  );

  const filteredProspects = demo.prospects.filter((item) =>
    matchesQuery(query, [
      item.name,
      item.phone,
      item.propertyType,
      item.zone,
      item.reason,
      item.contactStatus,
      item.nextAction,
      item.source,
    ]),
  );

  const filteredEvaluations = demo.evaluations.filter((item) =>
    matchesQuery(query, [
      item.property,
      item.physicalState,
      item.legalRisk,
      item.financialRisk,
      item.resalePotential,
      item.viability,
      item.repairsNeeded.join(' '),
      ...item.checklist.map((check) => check.label),
    ]),
  );

  const filteredRemodeling = demo.remodelingProjects.filter((item) =>
    matchesQuery(query, [
      item.property,
      item.status,
      item.manager,
      `${item.progress}`,
      `${item.estimatedBudget}`,
      `${item.currentSpend}`,
      `${item.pendingTasks}`,
      item.estimatedDelivery,
    ]),
  );

  const filteredDocuments = demo.documents.filter((item) =>
    matchesQuery(query, [
      item.property,
      ...Object.values(item),
    ]),
  );

  const filteredFinanceMovements = [...demo.financeMovements]
    .sort((left, right) => new Date(right.dateTime) - new Date(left.dateTime))
    .filter((item) =>
      matchesQuery(query, [
        item.property,
        item.type,
        item.category,
        item.note,
        item.dateTime,
        `${item.amount}`,
      ]),
    );

  const filteredAlerts = demo.dashboard.alerts.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.level]),
  );

  const filteredActivity = demo.dashboard.activity.filter((item) =>
    matchesQuery(query, [item.title, item.detail, item.timestamp, item.type]),
  );

  const filteredTasks = demo.dashboard.nextTasks.filter((item) =>
    matchesQuery(query, [item.title, item.due, item.owner, item.priority]),
  );

  const filteredFinancialSummary = demo.dashboard.financialSummary.filter((item) =>
    matchesQuery(query, [item.label, item.note, `${item.value}`]),
  );

  const filteredPipeline = demo.dashboard.pipeline.filter((item) =>
    matchesQuery(query, [item.label, `${item.count}`, `${item.value}`]),
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

  const visibleModule = realEstateManagerModules.find((item) => item.id === activeModule) ?? realEstateManagerModules[0];
  const visibleMeta = moduleMeta[visibleModule.id];
  const moduleCounters = {
    dashboard: 'Live',
    propiedades: formatNumber(demo.properties.length),
    prospectos: formatNumber(demo.prospects.length),
    evaluacion: formatNumber(demo.evaluations.length),
    remodelacion: formatNumber(demo.remodelingProjects.length),
    documentos: formatNumber(demo.documents.length),
    finanzas: formatNumber(demo.financeMovements.length),
    reportes: formatNumber(demo.reports.stageMix.length),
    configuracion: formatNumber(demo.settings.integrations.length),
  };

  function renderDashboard() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid">
          <MetricCard
            icon="properties"
            label="Propiedades activas"
            note="Pipeline vivo"
            tone="success"
            trend={`${liveProperties.length} vigentes`}
            value={formatNumber(liveProperties.length)}
          />
          <MetricCard
            icon="prospects"
            label="Prospectos nuevos"
            note="Contacto inicial"
            tone="info"
            trend="Entrada semanal"
            value={formatNumber(prospectsNew.length)}
          />
          <MetricCard
            icon="evaluation"
            label="En evaluacion"
            note="Analisis tecnico y legal"
            tone="warning"
            trend="Revision"
            value={formatNumber(propertiesInEvaluation.length)}
          />
          <MetricCard
            icon="remodel"
            label="Remodelaciones en curso"
            note="Obras abiertas"
            tone="warning"
            trend={`${remodelingInCourse.length} activas`}
            value={formatNumber(remodelingInCourse.length)}
          />
          <MetricCard
            icon="finance"
            label="Inversion estimada"
            note="Capex proyectado"
            tone="neutral"
            trend="Pipeline vivo"
            value={formatCurrency(investmentEstimated)}
          />
          <MetricCard
            icon="reports"
            label="Valor potencial de venta"
            note="Despues de remodelacion"
            tone="success"
            trend="Escenario objetivo"
            value={formatCurrency(potentialSaleValue)}
          />
          <MetricCard
            icon="spark"
            label="Utilidad estimada"
            note="Antes de impuestos"
            tone="success"
            trend="Proyeccion"
            value={formatCurrency(estimatedUtility)}
          />
          <MetricCard
            icon="documents"
            label="Documentos pendientes"
            note="Pendiente / revisar / vencido"
            tone="danger"
            trend="Expedientes"
            value={formatNumber(pendingDocuments)}
          />
        </section>

        <section className="real-estate-manager-grid">
          <Panel
            className="real-estate-manager-panel--span-2"
            subtitle="Etapas del flujo inmobiliario con valor estimado."
            title="Pipeline inmobiliario"
          >
            {filteredPipeline.length ? (
              <StageMix items={filteredPipeline} />
            ) : (
              <EmptyState
                description="No hay etapas visibles con el filtro actual."
                title="Sin pipeline visible"
              />
            )}
          </Panel>

          <Panel subtitle="Propiedades con mejor score de oportunidad." title="Mayor oportunidad">
            {opportunityProperties.length ? (
              <ProgressList items={opportunityProperties.slice(0, 4)} />
            ) : (
              <EmptyState
                description="No hay propiedades visibles para el filtro actual."
                title="Sin oportunidades visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Focos operativos que afectan cierre o margen." title="Alertas importantes">
            {filteredAlerts.length ? (
              <div className="real-estate-manager-stack">
                {filteredAlerts.map((item) => (
                  <article key={item.title} className="real-estate-manager-alert-card">
                    <div className="real-estate-manager-alert-card__header">
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
                description="No hay alertas asociadas al filtro actual."
                title="Sin alertas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Bitacora de decisiones y avances recientes." title="Actividad reciente">
            {filteredActivity.length ? (
              <div className="real-estate-manager-activity-list">
                {filteredActivity.map((item) => (
                  <article key={item.title} className="real-estate-manager-activity-list__item">
                    <div className="real-estate-manager-activity-list__icon">
                      <Icon name={getActivityIcon(item.type)} />
                    </div>
                    <div className="real-estate-manager-activity-list__body">
                      <div className="real-estate-manager-activity-list__head">
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

          <Panel subtitle="Proximas acciones para no frenar el pipeline." title="Proximas tareas">
            {filteredTasks.length ? (
              <div className="real-estate-manager-stack">
                {filteredTasks.map((item) => (
                  <article key={item.title} className="real-estate-manager-task-card">
                    <div className="real-estate-manager-task-card__header">
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.owner}</p>
                      </div>
                      <StatusBadge tone={getPriorityTone(item.priority)}>{item.priority}</StatusBadge>
                    </div>
                    <div className="real-estate-manager-task-card__meta">
                      <span>{item.due}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay tareas coincidentes con la busqueda."
                title="Sin tareas visibles"
              />
            )}
          </Panel>

          <Panel
            className="real-estate-manager-panel--span-2"
            subtitle="Lectura rapida de capital, precio objetivo y margen."
            title="Resumen financiero"
          >
            {filteredFinancialSummary.length ? (
              <div className="real-estate-manager-summary-grid">
                {filteredFinancialSummary.map((item) => (
                  <article key={item.label} className="real-estate-manager-summary-card">
                    <span>{item.label}</span>
                    <strong>{formatCurrency(item.value)}</strong>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                description="No hay resumen financiero relacionado con este filtro."
                title="Sin resumen visible"
              />
            )}
          </Panel>
        </section>
      </>
    );
  }

  function renderPropiedades() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="properties"
            label="Activas"
            note="No cerradas"
            tone="success"
            trend="Pipeline"
            value={formatNumber(liveProperties.length)}
          />
          <MetricCard
            icon="finance"
            label="Valor actual"
            note="Suma estimada"
            tone="neutral"
            trend="Base"
            value={formatCurrency(sumBy(filteredProperties, (item) => item.currentValue))}
          />
          <MetricCard
            icon="reports"
            label="Valor post remodelacion"
            note="Escenario objetivo"
            tone="success"
            trend="Salida"
            value={formatCurrency(sumBy(filteredProperties, (item) => item.afterRemodelValue))}
          />
          <MetricCard
            icon="spark"
            label="Utilidad potencial"
            note="Sobre seleccion visible"
            tone="success"
            trend="Margen"
            value={formatCurrency(sumBy(filteredProperties, (item) => item.potentialProfit))}
          />
        </section>

        <Panel subtitle="Direccion corta, valores, prioridad y accion simulada." title="Propiedades">
          {filteredProperties.length ? (
            <div className="real-estate-manager-table-shell">
              <table className="real-estate-manager-table">
                <thead>
                  <tr>
                    <th>Propiedad</th>
                    <th>Zona</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Valor actual</th>
                    <th>Valor post remodelacion</th>
                    <th>Inversion</th>
                    <th>Utilidad</th>
                    <th>Prioridad</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="real-estate-manager-table__primary">
                          <strong>{item.name}</strong>
                          <span>{item.owner}</span>
                        </div>
                      </td>
                      <td>{item.zone}</td>
                      <td>{item.type}</td>
                      <td>
                        <StatusBadge tone={getStageTone(item.stage)}>{item.stage}</StatusBadge>
                      </td>
                      <td>{formatCurrency(item.currentValue)}</td>
                      <td>{formatCurrency(item.afterRemodelValue)}</td>
                      <td>{formatCurrency(item.investmentRequired)}</td>
                      <td>{formatCurrency(item.potentialProfit)}</td>
                      <td>
                        <StatusBadge tone={getPriorityTone(item.priority)}>{item.priority}</StatusBadge>
                      </td>
                      <td>
                        <button
                          className="real-estate-manager-inline-button real-estate-manager-inline-button--ghost"
                          onClick={() =>
                            showNotice(`Vista demo: expediente abierto para ${item.name}.`)
                          }
                          type="button"
                        >
                          <Icon name="eye" />
                          Ver expediente
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por propiedad, zona, tipo, estado o propietario."
              title="No hay propiedades visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderProspectos() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="prospects"
            label="Prospectos nuevos"
            note="Entrada reciente"
            tone="info"
            trend="Top funnel"
            value={formatNumber(prospectsNew.length)}
          />
          <MetricCard
            icon="spark"
            label="Interesados"
            note="Contactos con avance"
            tone="success"
            trend="Seguimiento"
            value={formatNumber(demo.prospects.filter((item) => item.contactStatus === 'interesado').length)}
          />
          <MetricCard
            icon="clock"
            label="No responde"
            note="Requiere rescate"
            tone="warning"
            trend="Atencion"
            value={formatNumber(demo.prospects.filter((item) => item.contactStatus === 'no responde').length)}
          />
        </section>

        <Panel subtitle="Lista de propietarios o contactos con siguiente accion." title="Prospectos">
          {filteredProspects.length ? (
            <div className="real-estate-manager-stack">
              {filteredProspects.map((item) => (
                <article key={item.id} className="real-estate-manager-prospect-card">
                  <div className="real-estate-manager-prospect-card__header">
                    <div>
                      <strong>{item.name}</strong>
                      <p>
                        {item.propertyType} - {item.zone}
                      </p>
                    </div>
                    <StatusBadge tone={getContactTone(item.contactStatus)}>{item.contactStatus}</StatusBadge>
                  </div>

                  <div className="real-estate-manager-prospect-card__meta">
                    <span>{item.phone}</span>
                    <span>Motivo: {item.reason}</span>
                    <span>Fuente: {item.source}</span>
                  </div>

                  <p>{item.nextAction}</p>

                  <div className="real-estate-manager-inline-actions">
                    <button
                      className="real-estate-manager-inline-button"
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
              description="Busca por nombre, zona, motivo, fuente o estado."
              title="No hay prospectos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderEvaluacion() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="evaluation"
            label="Propiedades en revision"
            note="Evaluacion activa"
            tone="warning"
            trend="Pipeline tecnico"
            value={formatNumber(filteredEvaluations.length)}
          />
          <MetricCard
            icon="finance"
            label="Adeudos estimados"
            note="Seleccion visible"
            tone="danger"
            trend="Legal y fiscal"
            value={formatCurrency(sumBy(filteredEvaluations, (item) => item.debtsEstimated))}
          />
          <MetricCard
            icon="spark"
            label="Viabilidad alta"
            note="Listas para avanzar"
            tone="success"
            trend="Semaforo"
            value={formatNumber(filteredEvaluations.filter((item) => item.viability === 'alta').length)}
          />
        </section>

        <Panel subtitle="Analisis tecnico, riesgos y checklist de revision." title="Evaluacion">
          {filteredEvaluations.length ? (
            <div className="real-estate-manager-evaluation-grid">
              {filteredEvaluations.map((item) => (
                <article key={item.property} className="real-estate-manager-evaluation-card">
                  <div className="real-estate-manager-evaluation-card__header">
                    <div>
                      <strong>{item.property}</strong>
                      <p>Estado fisico: {item.physicalState}</p>
                    </div>
                    <StatusBadge tone={getViabilityTone(item.viability)}>{item.viability}</StatusBadge>
                  </div>

                  <div className="real-estate-manager-evaluation-card__stats">
                    <div>
                      <span>Adeudos</span>
                      <strong>{formatCurrency(item.debtsEstimated)}</strong>
                    </div>
                    <div>
                      <span>Riesgo legal</span>
                      <StatusBadge tone={getRiskTone(item.legalRisk)}>{item.legalRisk}</StatusBadge>
                    </div>
                    <div>
                      <span>Riesgo financiero</span>
                      <StatusBadge tone={getRiskTone(item.financialRisk)}>{item.financialRisk}</StatusBadge>
                    </div>
                    <div>
                      <span>Potencial de reventa</span>
                      <strong>{item.resalePotential}</strong>
                    </div>
                  </div>

                  <div className="real-estate-manager-evaluation-card__repairs">
                    <span>Reparaciones necesarias</span>
                    <div className="real-estate-manager-chip-list">
                      {item.repairsNeeded.map((repair) => (
                        <span key={repair} className="real-estate-manager-chip">
                          {repair}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="real-estate-manager-checklist">
                    {item.checklist.map((check) => (
                      <div key={check.label} className={`real-estate-manager-checklist__item ${check.done ? 'is-done' : ''}`}>
                        <span className="real-estate-manager-checklist__dot" />
                        <span>{check.label}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay evaluaciones relacionadas con la busqueda."
              title="Sin evaluaciones visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderRemodelacion() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="remodel"
            label="Obras activas"
            note="Sin considerar terminadas"
            tone="warning"
            trend="Ejecucion"
            value={formatNumber(remodelingInCourse.length)}
          />
          <MetricCard
            icon="finance"
            label="Presupuesto total"
            note="Seleccion visible"
            tone="neutral"
            trend="Capex"
            value={formatCurrency(sumBy(filteredRemodeling, (item) => item.estimatedBudget))}
          />
          <MetricCard
            icon="spark"
            label="Gasto actual"
            note="Comprometido"
            tone="info"
            trend="Avance"
            value={formatCurrency(sumBy(filteredRemodeling, (item) => item.currentSpend))}
          />
        </section>

        <Panel subtitle="Proyectos de obra, avance y tareas pendientes." title="Remodelacion">
          {filteredRemodeling.length ? (
            <div className="real-estate-manager-remodel-grid">
              {filteredRemodeling.map((item) => (
                <article key={item.property} className="real-estate-manager-remodel-card">
                  <div className="real-estate-manager-remodel-card__header">
                    <div>
                      <strong>{item.property}</strong>
                      <p>{item.manager}</p>
                    </div>
                    <StatusBadge tone={getRemodelTone(item.status)}>{item.status}</StatusBadge>
                  </div>

                  <div className="real-estate-manager-remodel-card__progress">
                    <div className="real-estate-manager-remodel-card__progress-head">
                      <span>Avance</span>
                      <strong>{item.progress}%</strong>
                    </div>
                    <div className="real-estate-manager-remodel-card__track">
                      <div
                        className="real-estate-manager-remodel-card__bar"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="real-estate-manager-remodel-card__stats">
                    <div>
                      <span>Presupuesto</span>
                      <strong>{formatCurrency(item.estimatedBudget)}</strong>
                    </div>
                    <div>
                      <span>Gasto actual</span>
                      <strong>{formatCurrency(item.currentSpend)}</strong>
                    </div>
                    <div>
                      <span>Entrega estimada</span>
                      <strong>{formatDate(item.estimatedDelivery)}</strong>
                    </div>
                    <div>
                      <span>Tareas pendientes</span>
                      <strong>{item.pendingTasks}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay proyectos de remodelacion visibles con este filtro."
              title="Sin proyectos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderDocumentos() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="documents"
            label="Expedientes visibles"
            note="Checklist documental"
            tone="info"
            trend="Control"
            value={formatNumber(filteredDocuments.length)}
          />
          <MetricCard
            icon="clock"
            label="Pendientes"
            note="Recepcion pendiente"
            tone="warning"
            trend="Seguimiento"
            value={formatNumber(
              sumBy(filteredDocuments, (item) =>
                Object.values(item).filter((value) => value === 'pendiente').length,
              ),
            )}
          />
          <MetricCard
            icon="spark"
            label="Vencidos"
            note="Riesgo documental"
            tone="danger"
            trend="Urgente"
            value={formatNumber(
              sumBy(filteredDocuments, (item) =>
                Object.values(item).filter((value) => value === 'vencido').length,
              ),
            )}
          />
        </section>

        <Panel subtitle="Checklist documental por propiedad." title="Documentos">
          {filteredDocuments.length ? (
            <div className="real-estate-manager-document-grid">
              {filteredDocuments.map((item) => (
                <article key={item.property} className="real-estate-manager-document-card">
                  <div className="real-estate-manager-document-card__header">
                    <strong>{item.property}</strong>
                  </div>
                  <div className="real-estate-manager-document-card__list">
                    {Object.entries(documentLabels).map(([key, label]) => (
                      <div key={key} className="real-estate-manager-document-card__row">
                        <span>{label}</span>
                        <StatusBadge tone={getDocumentTone(item[key])}>{item[key]}</StatusBadge>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              description="No hay expedientes documentales relacionados con el filtro."
              title="Sin documentos visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderFinanzas() {
    return (
      <>
        <section className="real-estate-manager-metrics-grid">
          <MetricCard
            icon="finance"
            label="Inversion total estimada"
            note="Capex general"
            tone="neutral"
            trend="Pipeline vivo"
            value={formatCurrency(investmentEstimated)}
          />
          <MetricCard
            icon="remodel"
            label="Gastos de remodelacion"
            note="Comprometidos"
            tone="warning"
            trend="Ejecucion"
            value={formatCurrency(financeRemodelSpend)}
          />
          <MetricCard
            icon="evaluation"
            label="Adeudos estimados"
            note="Pasivos detectados"
            tone="danger"
            trend="Riesgo"
            value={formatCurrency(financeDebt)}
          />
          <MetricCard
            icon="reports"
            label="Comisiones"
            note="Movimiento comercial"
            tone="warning"
            trend="Salida"
            value={formatCurrency(commissionsEstimated)}
          />
          <MetricCard
            icon="spark"
            label="Precio objetivo de venta"
            note="Consolidado del pipeline"
            tone="success"
            trend="Escenario"
            value={formatCurrency(targetSalePrice)}
          />
          <MetricCard
            icon="dashboard"
            label="Utilidad proyectada"
            note="Antes de impuestos"
            tone="success"
            trend={`ROI ${roiEstimated}%`}
            value={formatCurrency(estimatedUtility)}
          />
        </section>

        <Panel subtitle="Movimientos financieros simulados del negocio." title="Finanzas">
          {filteredFinanceMovements.length ? (
            <div className="real-estate-manager-table-shell">
              <table className="real-estate-manager-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Propiedad</th>
                    <th>Monto</th>
                    <th>Categoria</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFinanceMovements.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDateTime(item.dateTime)}</td>
                      <td>
                        <StatusBadge tone={getFinanceTone(item.type)}>{item.type}</StatusBadge>
                      </td>
                      <td>{item.property}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.category}</td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              description="Busca por propiedad, tipo, categoria o monto."
              title="No hay movimientos financieros visibles"
            />
          )}
        </Panel>
      </>
    );
  }

  function renderReportes() {
    const projectedByProperty = filteredProperties
      .map((item) => ({
        label: item.name,
        value: item.potentialProfit,
        note: `${item.zone} - ${item.type}`,
      }))
      .sort((left, right) => right.value - left.value);

    const stageMix = demo.reports.stageMix.filter((item) =>
      matchesQuery(query, [item.label, `${item.value}`]),
    );

    return (
      <>
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="reports"
            label="Tiempo promedio de cierre"
            note="Media general"
            tone="info"
            trend="Pipeline"
            value={`${Math.round(sumBy(demo.reports.averageCloseDays, (item) => item.value) / demo.reports.averageCloseDays.length)} dias`}
          />
          <MetricCard
            icon="spark"
            label="Utilidad proyectada"
            note="Seleccion visible"
            tone="success"
            trend="Margen"
            value={formatCurrency(sumBy(filteredProperties, (item) => item.potentialProfit))}
          />
          <MetricCard
            icon="finance"
            label="Inversion vs valor"
            note="Propiedades visibles"
            tone="neutral"
            trend="Comparativo"
            value={`${Math.round((sumBy(filteredProperties, (item) => item.investmentRequired) / Math.max(sumBy(filteredProperties, (item) => item.afterRemodelValue), 1)) * 100)}%`}
          />
        </section>

        <section className="real-estate-manager-grid">
          <Panel className="real-estate-manager-panel--span-2" subtitle="Propiedades por etapa del pipeline." title="Propiedades por estado">
            {stageMix.length ? (
              <StageMix items={stageMix.map((item) => ({ label: item.label, count: item.value }))} />
            ) : (
              <EmptyState
                description="No hay mezcla de estados con este filtro."
                title="Sin estados visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Utilidad proyectada por propiedad." title="Utilidad proyectada">
            {projectedByProperty.length ? (
              <ProgressList items={projectedByProperty.slice(0, 5)} />
            ) : (
              <EmptyState
                description="No hay propiedades visibles con este filtro."
                title="Sin utilidad visible"
              />
            )}
          </Panel>

          <Panel subtitle="Zonas con mayor concentracion de oportunidades." title="Zonas fuertes">
            {zoneOpportunities.length ? (
              <ProgressList items={zoneOpportunities.slice(0, 4)} />
            ) : (
              <EmptyState
                description="No hay zonas visibles para este filtro."
                title="Sin zonas visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Prospectos por origen de entrada." title="Prospectos por fuente">
            {leadSources.length ? (
              <ProgressList items={leadSources} mode="number" />
            ) : (
              <EmptyState
                description="No hay fuentes visibles con este filtro."
                title="Sin fuentes visibles"
              />
            )}
          </Panel>

          <Panel subtitle="Tiempo promedio de cierre por tipo." title="Tiempo promedio de cierre">
            {averageCloseDays.length ? (
              <ProgressList items={averageCloseDays} mode="days" />
            ) : (
              <EmptyState
                description="No hay tiempos de cierre visibles con este filtro."
                title="Sin tiempos visibles"
              />
            )}
          </Panel>

          <Panel className="real-estate-manager-panel--span-3" subtitle="Comparativo entre inversion requerida y valor estimado de salida." title="Inversion vs valor estimado">
            {filteredProperties.length ? (
              <div className="real-estate-manager-investment-grid">
                {filteredProperties.map((item) => {
                  const ratio = Math.round((item.investmentRequired / item.afterRemodelValue) * 100);

                  return (
                    <article key={item.id} className="real-estate-manager-investment-card">
                      <div className="real-estate-manager-investment-card__header">
                        <strong>{item.name}</strong>
                        <span>{ratio}%</span>
                      </div>
                      <p>{item.zone}</p>
                      <div className="real-estate-manager-investment-card__track">
                        <div
                          className="real-estate-manager-investment-card__bar"
                          style={{ width: `${Math.max(ratio, 12)}%` }}
                        />
                      </div>
                      <div className="real-estate-manager-investment-card__meta">
                        <span>Inversion {formatCurrency(item.investmentRequired)}</span>
                        <span>Valor {formatCurrency(item.afterRemodelValue)}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                description="No hay propiedades visibles para este filtro."
                title="Sin comparativo visible"
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
        <section className="real-estate-manager-metrics-grid real-estate-manager-metrics-grid--compact">
          <MetricCard
            icon="properties"
            label="Zonas operativas"
            note="Configuradas"
            tone="success"
            trend="Cobertura"
            value={formatNumber(demo.settings.operationZones.length)}
          />
          <MetricCard
            icon="evaluation"
            label="Tipos de propiedad"
            note="Plantillas activas"
            tone="info"
            trend="Portafolio"
            value={formatNumber(demo.settings.propertyTypes.length)}
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

        <section className="real-estate-manager-grid real-estate-manager-grid--config">
          <Panel className="real-estate-manager-panel--span-2" subtitle="Pantalla visual no funcional." title="Identidad del negocio">
            <div className="real-estate-manager-settings-grid">
              <div className="real-estate-manager-brand-card">
                <div className="real-estate-manager-brand-card__mark">{demo.settings.logoPlaceholder}</div>
                <div>
                  <strong>{demo.settings.businessName}</strong>
                  <p>Sistema demo para administrar oportunidades, evaluacion y cierres inmobiliarios.</p>
                </div>
              </div>

              <div className="real-estate-manager-field-grid">
                <div className="real-estate-manager-field-card">
                  <span>Nombre del negocio</span>
                  <strong>{demo.settings.businessName}</strong>
                </div>
                <div className="real-estate-manager-field-card">
                  <span>Operacion</span>
                  <strong>{demo.business.branch}</strong>
                </div>
                <div className="real-estate-manager-field-card">
                  <span>Color principal</span>
                  <div className="real-estate-manager-color-preview">
                    <span
                      className="real-estate-manager-color-preview__swatch"
                      style={{ backgroundColor: demo.business.primaryColor }}
                    />
                    <strong>{demo.business.primaryColor}</strong>
                  </div>
                </div>
                <div className="real-estate-manager-field-card">
                  <span>Soporte</span>
                  <strong>{demo.business.supportEmail}</strong>
                </div>
              </div>
            </div>
          </Panel>

          <Panel subtitle="Zonas actuales de operacion." title="Zonas">
            <div className="real-estate-manager-chip-list">
              {demo.settings.operationZones.map((item) => (
                <span key={item} className="real-estate-manager-chip">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Tipos de propiedad configurados." title="Tipos de propiedad">
            <div className="real-estate-manager-chip-list">
              {demo.settings.propertyTypes.map((item) => (
                <span key={item} className="real-estate-manager-chip real-estate-manager-chip--soft">
                  {item}
                </span>
              ))}
            </div>
          </Panel>

          <Panel subtitle="Estados del pipeline visibles en el sistema." title="Pipeline">
            <div className="real-estate-manager-stack">
              {demo.settings.pipelineStates.map((item) => (
                <article key={item} className="real-estate-manager-list-card">
                  <div className="real-estate-manager-list-card__header">
                    <strong>{item}</strong>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel className="real-estate-manager-panel--span-3" subtitle="Integraciones simuladas para una version real." title="Integraciones">
            <div className="real-estate-manager-integration-grid">
              {demo.settings.integrations.map((item) => (
                <article key={item.name} className="real-estate-manager-integration-card">
                  <div className="real-estate-manager-integration-card__header">
                    <strong>{item.name}</strong>
                    <StatusBadge tone={item.status === 'activo' ? 'success' : 'warning'}>{item.status}</StatusBadge>
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
    if (activeModule === 'propiedades') {
      return renderPropiedades();
    }

    if (activeModule === 'prospectos') {
      return renderProspectos();
    }

    if (activeModule === 'evaluacion') {
      return renderEvaluacion();
    }

    if (activeModule === 'remodelacion') {
      return renderRemodelacion();
    }

    if (activeModule === 'documentos') {
      return renderDocumentos();
    }

    if (activeModule === 'finanzas') {
      return renderFinanzas();
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
      className="real-estate-manager-demo"
      style={{
        '--real-estate-primary': demo.business.primaryColor,
        '--real-estate-accent': demo.business.accentColor,
      }}
    >
      <div className="real-estate-manager-app-shell">
        <aside className="real-estate-manager-sidebar">
          <div className="real-estate-manager-sidebar__header">
            <span className="real-estate-manager-pill">Demo inmobiliario / CRM</span>
            <h2>{demo.appName}</h2>
            <p>Propuesta visual para administrar oportunidades, propiedades, obra y cierre.</p>
          </div>

          <div className="real-estate-manager-sidebar__business">
            <div className="real-estate-manager-sidebar__mark">{demo.business.logoMark}</div>
            <div>
              <strong>{demo.business.name}</strong>
              <span>
                {demo.business.city} - {demo.business.plan}
              </span>
            </div>
          </div>

          <div className="real-estate-manager-sidebar__summary">
            <article className="real-estate-manager-sidebar__summary-card">
              <span>Meta mensual</span>
              <strong>{formatCurrency(demo.business.monthlyGoal)}</strong>
            </article>
            <article className="real-estate-manager-sidebar__summary-card">
              <span>Docs pendientes</span>
              <strong>{pendingDocuments}</strong>
            </article>
          </div>

          <nav className="real-estate-manager-sidebar__nav" aria-label="Modulos del sistema inmobiliario">
            {realEstateManagerModules.map((item) => {
              const isActive = item.id === activeModule;
              const details = moduleMeta[item.id];

              return (
                <button
                  key={item.id}
                  className={`real-estate-manager-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setModule(item.id)}
                  type="button"
                >
                  <span className="real-estate-manager-nav-item__icon">
                    <Icon name={details.icon} />
                  </span>
                  <span className="real-estate-manager-nav-item__content">
                    <strong>{item.label}</strong>
                    <small>{details.description}</small>
                  </span>
                  <span className="real-estate-manager-nav-item__counter">{moduleCounters[item.id]}</span>
                </button>
              );
            })}
          </nav>

          <div className="real-estate-manager-sidebar__footer">
            <div className="real-estate-manager-sidebar__footnote">
              <strong>{demo.business.owner}</strong>
              <span>Respuesta demo estimada: {demo.business.responseTime}</span>
            </div>

            <div className="real-estate-manager-sidebar__actions">
              <Link className="real-estate-manager-ghost-link" to="/">
                Volver al catalogo
              </Link>
              <a
                className="real-estate-manager-primary-link"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </div>
        </aside>

        <main className="real-estate-manager-main">
          <header className="real-estate-manager-topbar">
            <div className="real-estate-manager-topbar__identity">
              <div>
                <p className="real-estate-manager-topbar__eyebrow">{demo.business.name}</p>
                <h1>{visibleModule.label}</h1>
                <p>{visibleMeta.description}</p>
              </div>
            </div>

            <label className="real-estate-manager-search">
              <span className="real-estate-manager-search__icon">
                <Icon name="search" />
              </span>
              <input
                aria-label="Buscar dentro de la demo"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar propiedad, zona, prospecto o documento..."
                type="search"
                value={query}
              />
            </label>

            <div className="real-estate-manager-topbar__actions">
              <button
                className="real-estate-manager-topbar__button"
                onClick={() =>
                  simulateQuickAction(
                    'propiedades',
                    'Accion simulada: se abriria el formulario para nueva propiedad.',
                  )
                }
                type="button"
              >
                Nueva propiedad
              </button>
              <button
                className="real-estate-manager-topbar__button real-estate-manager-topbar__button--ghost"
                onClick={() =>
                  simulateQuickAction(
                    'prospectos',
                    'Accion simulada: se abriria el formulario para nuevo prospecto.',
                  )
                }
                type="button"
              >
                Nuevo prospecto
              </button>
              <a
                className="real-estate-manager-topbar__button real-estate-manager-topbar__button--primary"
                href={requestSystemHref}
                rel="noreferrer"
                target="_blank"
              >
                Solicitar sistema similar
              </a>
            </div>
          </header>

          <section className="real-estate-manager-banner">
            <div className="real-estate-manager-banner__content">
              <span className="real-estate-manager-pill real-estate-manager-pill--soft">
                Demo visual con datos simulados
              </span>
              <h2>{demo.appName}</h2>
              <p>{demo.bannerMessage}</p>
            </div>

            <div className="real-estate-manager-banner__stats">
              <div className="real-estate-manager-banner__stat">
                <span>Operacion</span>
                <strong>{demo.business.branch}</strong>
              </div>
              <div className="real-estate-manager-banner__stat">
                <span>Valor potencial de salida</span>
                <strong>{formatCurrency(potentialSaleValue)}</strong>
              </div>
            </div>
          </section>

          <section className="real-estate-manager-module-intro">
            <div>
              <span className="real-estate-manager-pill real-estate-manager-pill--muted">{visibleModule.label}</span>
              <h2>{demo.business.name}</h2>
              <p>
                Sistema demo para administrar oportunidades, evaluacion, remodelacion y cierre inmobiliario.
              </p>
            </div>

            <div className="real-estate-manager-module-intro__stats">
              <div>
                <span>Busqueda activa</span>
                <strong>{query.trim() ? query : 'Sin filtro'}</strong>
              </div>
              <div>
                <span>Zona de operacion</span>
                <strong>{demo.business.branch}</strong>
              </div>
            </div>
          </section>

          <div className="real-estate-manager-content">{renderModuleContent()}</div>
        </main>
      </div>

      {actionNotice ? (
        <div aria-live="polite" className="real-estate-manager-toast" role="status">
          {actionNotice}
        </div>
      ) : null}
    </div>
  );
}
