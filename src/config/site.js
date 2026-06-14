const whatsappPhone = '524614220738';
const defaultCatalogMessage =
  'Hola ByteShark, vi las demos y me gustaria una propuesta para mi negocio.';

export function buildWhatsAppUrl(message = defaultCatalogMessage) {
  return `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(message)}`;
}

export function getDemoWhatsAppUrl(demoName) {
  return buildWhatsAppUrl(
    `Hola ByteShark, vi la demo de ${demoName} y me gustaria adaptarla a mi negocio.`,
  );
}

export const siteConfig = {
  routerBase: '/demos',
  brand: {
    name: 'ByteShark',
    tagline: 'Software para la siguiente era',
    logoUrl: 'https://byteshark-dev.github.io/assets/images/byteshark_graphic_logo_white.svg',
    logoDarkUrl: 'https://byteshark-dev.github.io/assets/images/byteshark_graphic_logo_dark_navy.svg',
  },
  links: {
    mainSite: 'https://byteshark-dev.github.io/',
    catalog: 'https://byteshark-dev.github.io/demos/',
    github: 'https://github.com/byteshark-dev',
    email: 'mailto:byteshark098@gmail.com',
  },
  contact: {
    whatsappPhone,
    whatsappMessage: defaultCatalogMessage,
    whatsappUrl: buildWhatsAppUrl(defaultCatalogMessage),
  },
  catalog: {
    title: 'Demos ByteShark',
    subtitle: 'Ejemplos interactivos de sitios web para distintos tipos de negocio.',
    description:
      'Explora propuestas de paginas web disenadas para mejorar presencia digital, captar clientes y facilitar contacto por WhatsApp.',
    ethicalNote:
      'Estas demos son ejemplos conceptuales creados por ByteShark. No representan clientes reales salvo que se indique lo contrario.',
    finalTitle: 'Quieres una pagina como estas para tu negocio?',
    finalCta: 'Contactar a ByteShark',
  },
};

