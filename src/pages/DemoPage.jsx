import { CTAButton } from '../components/CTAButton.jsx';
import { DemoLayout } from '../components/DemoLayout.jsx';
import { FAQList } from '../components/FAQList.jsx';
import { FeatureGrid } from '../components/FeatureGrid.jsx';
import { GalleryStrip } from '../components/GalleryStrip.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { TestimonialGrid } from '../components/TestimonialGrid.jsx';
import { getDemoWhatsAppUrl } from '../config/site.js';

function DemoSection({ section, component: Component, muted = false }) {
  return (
    <section className={`${muted ? 'bg-surface-container-lowest/45' : ''} py-24 sm:py-28`}>
      <div className="section-shell">
        <SectionTitle
          description={section.description}
          eyebrow={section.eyebrow}
          title={section.title}
        />
        <div className="mt-12">
          <Component items={section.items} />
        </div>
      </div>
    </section>
  );
}

export function DemoPage({ demo }) {
  return (
    <DemoLayout demo={demo}>
      <DemoSection component={FeatureGrid} section={demo.sections.overview} />
      <DemoSection component={FeatureGrid} muted section={demo.sections.offerings} />
      <DemoSection component={FeatureGrid} section={demo.sections.features} />
      <DemoSection component={GalleryStrip} muted section={demo.sections.gallery} />
      <DemoSection component={TestimonialGrid} section={demo.sections.testimonials} />
      <DemoSection component={FeatureGrid} muted section={demo.sections.trust} />
      <DemoSection component={FAQList} section={demo.sections.faq} />

      <section className="pb-24 pt-8 sm:pb-28">
        <div className="section-shell">
          <div className="glass-panel rounded-[32px] border border-outline-variant/30 p-8 shadow-panel sm:p-10">
            <SectionTitle
              description={demo.sections.closing.description}
              eyebrow="Siguiente paso"
              title={demo.sections.closing.title}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href={getDemoWhatsAppUrl(demo.name)}>Hablar con ByteShark</CTAButton>
              <CTAButton href="/" variant="secondary">
                Volver al catalogo
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}

