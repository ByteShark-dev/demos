import { CTAButton } from '../components/CTAButton.jsx';
import { DemoLayout } from '../components/DemoLayout.jsx';
import { FAQList } from '../components/FAQList.jsx';
import { FeatureGrid } from '../components/FeatureGrid.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { TestimonialGrid } from '../components/TestimonialGrid.jsx';
import { getDemoBySlug } from '../config/demos.js';
import { getDemoWhatsAppUrl, siteConfig } from '../config/site.js';

function BenefitsStrip({ section }) {
  return (
    <section className="warm-trust-strip py-8 sm:py-10">
      <div className="section-shell grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item, index) => (
          <article key={item.title} className="warm-trust-item">
            <span className="warm-trust-item__icon" aria-hidden="true">
              {`0${index + 1}`.slice(-2)}
            </span>
            <div>
              <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BookingStepsSection({ section, whatsappHref }) {
  return (
    <section className="py-24 sm:py-28">
      <div className="section-shell">
        <div className="warm-step-shell overflow-hidden rounded-[2rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/78">
              {section.eyebrow}
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {section.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-white/82 sm:text-lg">
              {section.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {section.steps.map((step, index) => (
              <article key={step.title} className="warm-step-card rounded-[1.75rem] px-5 py-6 text-center">
                <span className="warm-step-index mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/82">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-[1.75rem] border border-white/15 bg-white/8 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/68">
                Nota de agenda
              </p>
              <p className="mt-2 text-base leading-7 text-white/82">{section.note}</p>
            </div>
            <CTAButton className="border-white/24 bg-white text-[#814546] hover:bg-white/94" external href={whatsappHref} variant="secondary">
              Agendar por WhatsApp
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SaludProfesionalPage() {
  const demo = getDemoBySlug('salud-profesional');
  const whatsappHref = getDemoWhatsAppUrl(demo);
  const heroActions = {
    primary: {
      label: 'Agendar por WhatsApp',
      href: whatsappHref,
      external: true,
    },
    secondary: {
      label: 'Ver servicios',
      href: '#servicios',
      variant: 'secondary',
    },
  };
  const footerOverride = {
    ...demo.footer,
    actions: [
      { label: 'Ir a ByteShark', href: siteConfig.links.mainSite, external: true },
      { label: 'Volver al catalogo', href: '/', variant: 'secondary' },
    ],
  };

  return (
    <DemoLayout
      demo={demo}
      footerOverride={footerOverride}
      heroActions={heroActions}
      themeVariant="warm"
    >
      <section id="servicios" className="py-24 sm:py-28">
        <div className="section-shell">
          <SectionTitle
            description={demo.sections.services.description}
            eyebrow={demo.sections.services.eyebrow}
            title={demo.sections.services.title}
          />
          <div className="mt-12">
            <FeatureGrid items={demo.sections.services.items} />
          </div>
        </div>
      </section>

      <section className="bg-white/28 py-24 sm:py-28">
        <div className="section-shell">
          <SectionTitle
            description={demo.sections.benefits.description}
            eyebrow={demo.sections.benefits.eyebrow}
            title={demo.sections.benefits.title}
          />
        </div>
        <div className="mt-12">
          <BenefitsStrip section={demo.sections.benefits} />
        </div>
      </section>

      <BookingStepsSection section={demo.sections.booking} whatsappHref={whatsappHref} />

      <section className="bg-white/22 py-24 sm:py-28">
        <div className="section-shell">
          <SectionTitle
            description={demo.sections.testimonials.description}
            eyebrow={demo.sections.testimonials.eyebrow}
            title={demo.sections.testimonials.title}
          />
          <div className="mt-12">
            <TestimonialGrid items={demo.sections.testimonials.items} />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="section-shell">
          <SectionTitle
            description={demo.sections.faq.description}
            eyebrow={demo.sections.faq.eyebrow}
            title={demo.sections.faq.title}
          />
          <div className="mt-12">
            <FAQList items={demo.sections.faq.items} />
          </div>
        </div>
      </section>

      <section className="pb-24 pt-8 sm:pb-28">
        <div className="section-shell">
          <div className="glass-panel rounded-[2rem] border border-outline-variant/30 p-8 shadow-panel sm:p-10">
            <SectionTitle
              className="max-w-3xl"
              description={demo.sections.closing.description}
              eyebrow="CTA final"
              title={demo.sections.closing.title}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton external href={whatsappHref}>
                {demo.sections.closing.ctaLabel}
              </CTAButton>
              <CTAButton href="#servicios" variant="secondary">
                Ver servicios
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}
