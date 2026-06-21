import { CTAButton } from './CTAButton.jsx';

function renderPreview(demo) {
  if (demo.slug === 'event-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[92px_minmax(0,1fr)] gap-3 p-4 text-left text-white">
        <div className="flex flex-col gap-2 rounded-[1.05rem] border border-white/10 bg-slate-950/42 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.18)]">
          <div className="h-8 rounded-2xl bg-teal-300/22" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="mt-auto grid gap-2">
            <div className="h-5 rounded-full bg-rose-300/18" />
            <div className="h-5 rounded-full bg-cyan-300/12" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/36 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.16)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-cyan-100/72">
                  Event Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  Operacion de torneos
                </p>
              </div>
              <div className="rounded-full bg-rose-300/18 px-2.5 py-1 text-[0.68rem] font-semibold text-rose-100">
                Live
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Equipos', '18'],
                ['Pagos', '$65k'],
                ['Agenda', '7'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/6 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.08fr_0.92fr] gap-3">
            <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
              <div className="mb-3 h-20 rounded-[0.9rem] bg-gradient-to-br from-cyan-400/28 via-teal-300/18 to-transparent" />
              <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                <span>Calendario</span>
                <span>Agenda</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Sponsors</p>
                <p className="mt-1 text-sm font-semibold text-white">5</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Media</p>
                <p className="mt-1 text-sm font-semibold text-white">6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'restaurant-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[90px_minmax(0,1fr)] gap-3 p-4 text-left">
        <div className="flex flex-col gap-2 rounded-[1.08rem] border border-white/8 bg-[#2a1a16]/92 p-3 text-white shadow-[0_18px_30px_rgba(32,20,17,0.24)]">
          <div className="h-8 rounded-2xl bg-amber-300/18" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="mt-auto grid gap-2">
            <div className="h-5 rounded-full bg-emerald-300/14" />
            <div className="h-5 rounded-full bg-amber-300/14" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-[#4a2c24]/10 bg-[#fff7ef]/84 p-3 shadow-[0_18px_30px_rgba(71,52,41,0.1)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-[#8c5b26]">
                  Restaurant Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-[#241916]">
                  Cocina y servicio
                </p>
              </div>
              <div className="rounded-full bg-[#4a2c24]/10 px-2.5 py-1 text-[0.68rem] font-semibold text-[#5f402f]">
                Cafe
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Ventas', '$18k'],
                ['Pedidos', '8'],
                ['Mesas', '7'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#4a2c24]/6 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#8a796d]">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#241916]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.08fr_0.92fr] gap-3">
            <div className="rounded-[1rem] border border-[#4a2c24]/10 bg-white/74 p-3 shadow-[0_14px_24px_rgba(71,52,41,0.08)]">
              <div className="mb-3 grid gap-2">
                <div className="h-4 rounded-full bg-[#4a2c24]/8" />
                <div className="h-4 rounded-full bg-amber-400/24" />
                <div className="h-4 rounded-full bg-emerald-700/14" />
              </div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#77695f]">
                Cocina
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-[#4a2c24]/10 bg-white/74 p-3 shadow-[0_14px_24px_rgba(71,52,41,0.08)]">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#77695f]">Promos</p>
                <p className="mt-1 text-sm font-semibold text-[#241916]">2</p>
              </div>
              <div className="rounded-[1rem] border border-[#4a2c24]/10 bg-white/74 p-3 shadow-[0_14px_24px_rgba(71,52,41,0.08)]">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#77695f]">Ticket</p>
                <p className="mt-1 text-sm font-semibold text-[#241916]">$167</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'real-estate-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[92px_minmax(0,1fr)] gap-3 p-4 text-left text-white">
        <div className="flex flex-col gap-2 rounded-[1.05rem] border border-white/10 bg-slate-950/34 p-3 shadow-[0_18px_30px_rgba(15,23,42,0.18)]">
          <div className="h-8 rounded-2xl bg-emerald-400/16" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="mt-auto grid gap-2">
            <div className="h-5 rounded-full bg-amber-300/18" />
            <div className="h-5 rounded-full bg-emerald-300/12" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/36 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.16)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-emerald-100/72">
                  Real Estate Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  Pipeline inmobiliario
                </p>
              </div>
              <div className="rounded-full bg-amber-300/18 px-2.5 py-1 text-[0.68rem] font-semibold text-amber-100">
                Deals
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Props', '8'],
                ['Valor', '$12M'],
                ['ROI', '28%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/6 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.08fr_0.92fr] gap-3">
            <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
              <div className="mb-3 h-20 rounded-[0.9rem] bg-gradient-to-br from-emerald-400/28 via-amber-300/16 to-transparent" />
              <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                <span>Pipeline</span>
                <span>6 etapas</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Docs</p>
                <p className="mt-1 text-sm font-semibold text-white">17</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Obra</p>
                <p className="mt-1 text-sm font-semibold text-white">64%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'stock-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[92px_minmax(0,1fr)] gap-3 p-4 text-left">
        <div className="flex flex-col gap-2 rounded-[1.05rem] border border-amber-900/10 bg-white/60 p-3 shadow-[0_18px_30px_rgba(71,85,105,0.12)]">
          <div className="h-8 rounded-2xl bg-amber-500/16" />
          <div className="h-6 rounded-full bg-slate-900/6" />
          <div className="h-6 rounded-full bg-slate-900/6" />
          <div className="mt-auto grid gap-2">
            <div className="h-5 rounded-full bg-teal-600/14" />
            <div className="h-5 rounded-full bg-amber-500/14" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-amber-900/10 bg-slate-950/90 p-3 text-white shadow-[0_18px_30px_rgba(15,23,42,0.18)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-amber-100/70">
                  Stock Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  Inventario vivo
                </p>
              </div>
              <div className="rounded-full bg-teal-500/16 px-2.5 py-1 text-[0.68rem] font-semibold text-teal-100">
                Retail
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Ventas', '$12k'],
                ['Stock', '12'],
                ['Alertas', '6'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/7 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[1rem] border border-amber-900/10 bg-white/68 p-3 shadow-[0_16px_24px_rgba(71,85,105,0.08)]">
              <div className="mb-3 grid gap-2">
                <div className="h-4 rounded-full bg-slate-900/8" />
                <div className="h-4 rounded-full bg-amber-500/18" />
                <div className="h-4 rounded-full bg-teal-600/14" />
              </div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Inventario
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-amber-900/10 bg-white/68 p-3 shadow-[0_16px_24px_rgba(71,85,105,0.08)]">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-500">Margen</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">42%</p>
              </div>
              <div className="rounded-[1rem] border border-amber-900/10 bg-white/68 p-3 shadow-[0_16px_24px_rgba(71,85,105,0.08)]">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-500">Compras</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'booking-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[86px_minmax(0,1fr)] gap-3 p-4 text-left text-white">
        <div className="flex flex-col gap-2 rounded-[1.05rem] border border-white/10 bg-slate-950/42 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.16)]">
          <div className="h-8 rounded-2xl bg-teal-400/20" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="mt-auto grid gap-2">
            <div className="h-5 rounded-full bg-fuchsia-300/18" />
            <div className="h-5 rounded-full bg-cyan-300/12" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/36 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.14)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-emerald-100/72">
                  Booking Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  Agenda operativa
                </p>
              </div>
              <div className="rounded-full bg-fuchsia-300/18 px-2.5 py-1 text-[0.68rem] font-semibold text-fuchsia-100">
                Week
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Hoy', '5'],
                ['Conf.', '8'],
                ['Pend.', '4'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/6 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.05fr_0.95fr] gap-3">
            <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
              <div className="mb-3 grid gap-2">
                <div className="h-4 rounded-full bg-white/10" />
                <div className="h-4 rounded-full bg-teal-300/20" />
                <div className="h-4 rounded-full bg-white/10" />
              </div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Agenda semanal
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Alerts</p>
                <p className="mt-1 text-sm font-semibold text-white">3</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Clients</p>
                <p className="mt-1 text-sm font-semibold text-white">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'business-manager') {
    return (
      <div className="relative z-10 grid h-full grid-cols-[92px_minmax(0,1fr)] gap-3 p-4 text-left text-white">
        <div className="flex flex-col gap-2 rounded-[1.05rem] border border-white/10 bg-slate-950/45 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.18)]">
          <div className="h-6 rounded-full bg-emerald-400/25" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="h-6 rounded-full bg-white/8" />
          <div className="mt-auto h-10 rounded-2xl bg-cyan-400/18" />
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/38 p-3 shadow-[0_18px_30px_rgba(2,8,23,0.14)]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-cyan-100/72">
                  Business Manager
                </p>
                <p className="mt-1 text-lg font-semibold leading-none text-white">
                  Operacion central
                </p>
              </div>
              <div className="rounded-full bg-emerald-400/18 px-2.5 py-1 text-[0.68rem] font-semibold text-emerald-100">
                Live
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                ['Ventas', '$188k'],
                ['Clientes', '15'],
                ['Citas', '7'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/6 px-2.5 py-2">
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
            <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
              <div className="mb-3 h-20 rounded-[0.9rem] bg-gradient-to-br from-emerald-400/32 via-cyan-300/16 to-transparent" />
              <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                <span>Pipeline</span>
                <span>38%</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Cobranza</p>
                <p className="mt-1 text-sm font-semibold text-white">$68k</p>
              </div>
              <div className="rounded-[1rem] border border-white/8 bg-white/8 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">Leads</p>
                <p className="mt-1 text-sm font-semibold text-white">+4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demo.slug === 'barberia') {
    return (
      <div className="catalog-preview__barber">
        <div className="catalog-preview__barber-mark">G&G</div>
        <p className="catalog-preview__barber-copy">Barber Studio</p>
      </div>
    );
  }

  if (demo.slug === 'cafe-restaurante') {
    return (
      <div className="catalog-preview__cafe">
        <p className="catalog-preview__cafe-wordmark">Bruma</p>
        <p className="catalog-preview__cafe-copy">Cafe & Cocina</p>
      </div>
    );
  }

  if (demo.slug === 'salud-profesional') {
    return (
      <div className="catalog-preview__health">
        <div className="catalog-preview__health-mark">
          <span>Centro</span>
          <strong>Sereno</strong>
        </div>
        <p className="catalog-preview__health-copy">Salud Integral</p>
      </div>
    );
  }

  if (demo.slug === 'despacho-contable') {
    return (
      <div className="catalog-preview__accounting">
        <div className="catalog-preview__accounting-mark">
          <span>Nexo Fiscal</span>
          <strong>Consultores</strong>
        </div>
        <p className="catalog-preview__accounting-copy">Contabilidad & estrategia</p>
      </div>
    );
  }

  return (
    <div className="catalog-preview__accounting">
      <div className="catalog-preview__accounting-bars" />
      <p className="catalog-preview__accounting-copy">Despacho Fiscal</p>
    </div>
  );
}

export function DemoCard({ demo }) {
  return (
    <article
      className={`catalog-card catalog-card--poster catalog-card--${demo.slug} h-full`}
      style={{
        '--demo-from': demo.accent.from,
        '--demo-to': demo.accent.to,
        '--demo-halo': demo.accent.halo,
      }}
    >
      <div className="catalog-card__preview">{renderPreview(demo)}</div>

      <div className="catalog-card__body">
        <div className="catalog-card__header">
          <span className="catalog-card__category">{demo.category}</span>
          <h3 className="catalog-card__title">{demo.name}</h3>
        </div>

        <p className="catalog-card__problem">{demo.problem}</p>

        <div className="catalog-card__tags">
          {demo.highlights.slice(0, 3).map((item) => (
            <span key={item} className="catalog-card__tag">
              {item}
            </span>
          ))}
        </div>

        <CTAButton className="mt-auto w-full" href={demo.path}>
          Abrir demo
        </CTAButton>
      </div>
    </article>
  );
}
