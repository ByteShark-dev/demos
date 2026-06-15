export const demos = [
  {
    slug: 'barberia',
    path: 'barberia/',
    name: 'G&G Barber Studio',
    businessName: 'G&G Barber Studio',
    category: 'Barberia premium, grooming y estilo masculino',
    problem:
      'Muestra como una barberia puede agendar citas, presentar servicios, vender productos y generar confianza con una presencia digital premium.',
    ctaLabel: 'Ver demo',
    accent: {
      from: '#d4b996',
      to: '#58181f',
      halo: 'rgba(88, 24, 31, 0.3)',
      surface: 'rgba(212, 185, 150, 0.12)',
    },
    contact: {
      whatsapp: {
        phone: '520000000001',
        message: 'Hola, quiero agendar una cita en G&G Barber Studio.',
      },
    },
    hero: {
      eyebrow: 'Demo conceptual de barberia premium',
      title: 'Tu proximo corte empieza con una experiencia premium',
      description:
        'Agenda tu cita, conoce nuestros servicios y descubre una barberia pensada para estilo, precision y confianza.',
      badges: ['Cortes premium', 'Barba', 'Estilo', 'Productos'],
      metrics: [
        { label: 'Servicios', value: '6 opciones premium' },
        { label: 'Agenda', value: 'Sitio web + WhatsApp' },
        { label: 'Presencia', value: 'Equipo, productos y galeria' },
      ],
    },
    highlights: [
      'Servicios y precios',
      'Agenda de cita',
      'Boton de WhatsApp',
      'Equipo',
      'Productos',
      'Galeria de estilos',
      'Horarios claros',
      'Resenas simuladas',
    ],
    sections: {
      services: {
        eyebrow: 'Nuestros servicios',
        title: 'Excelencia en cada detalle',
        description:
          'Una carta premium para mostrar servicios, precios y tiempos con claridad desde el primer vistazo.',
        items: [
          {
            title: 'Corte clasico',
            price: '$180',
            duration: '40 min',
            description: 'Corte tradicional con lineas limpias, acabado preciso y estilo facil de mantener.',
          },
          {
            title: 'Corte premium',
            price: '$250',
            duration: '50 min',
            description: 'Incluye asesoria de estilo, detalles de precision y acabado premium.',
          },
          {
            title: 'Arreglo de barba',
            price: '$150',
            duration: '30 min',
            description: 'Perfilado, limpieza y forma definida para un look pulcro y profesional.',
          },
          {
            title: 'Corte + barba',
            price: '$320',
            duration: '70 min',
            description: 'Servicio completo para renovar tu imagen en una sola visita.',
          },
          {
            title: 'Perfilado',
            price: '$80',
            duration: '20 min',
            description: 'Retoque rapido de contornos para mantener el estilo entre citas.',
          },
          {
            title: 'Paquete completo',
            price: '$420',
            duration: '90 min',
            description: 'Corte, barba, detalles premium y una experiencia de cuidado mas completa.',
          },
        ],
      },
      booking: {
        eyebrow: 'Agenda de cita',
        title: 'Reserva tu espacio con una experiencia simple y directa',
        description:
          'Este formulario demo muestra como una barberia puede recibir solicitudes desde la web sin depender solo de mensajes improvisados.',
        note: 'Tambien puedes agendar directamente por WhatsApp si prefieres atencion rapida.',
        submitLabel: 'Solicitar cita',
        whatsappLabel: 'Agendar por WhatsApp',
      },
      team: {
        eyebrow: 'Conoce al equipo',
        title: 'Barberos con especialidad, criterio y presencia',
        description:
          'La pagina puede presentar al equipo para generar confianza, diferenciar estilos y mostrar un servicio mas profesional.',
        items: [
          {
            title: 'Gento',
            role: 'Especialista en degradados y cortes modernos',
            description:
              'Trabaja fades limpios, texturas urbanas y acabados pensados para destacar desde la primera visita.',
            badge: 'Fade / moderno',
          },
          {
            title: 'Galo',
            role: 'Barba, perfilado y estilo clasico',
            description:
              'Se enfoca en lineas precisas, barbas definidas y un look tradicional con presencia elegante.',
            badge: 'Barba / clasico',
          },
          {
            title: 'Dante',
            role: 'Cortes urbanos y disenos personalizados',
            description:
              'Ideal para clientes que buscan un estilo con caracter, detalles visuales y propuestas mas atrevidas.',
            badge: 'Urbano / detalle',
          },
          {
            title: 'Mauro',
            role: 'Corte ejecutivo y atencion premium',
            description:
              'Atiende perfiles ejecutivos con cortes pulcros, atencion cuidada y una experiencia premium.',
            badge: 'Ejecutivo / premium',
          },
        ],
      },
      products: {
        eyebrow: 'Productos',
        title: 'Grooming essentials para mantener el estilo en casa',
        description:
          'Una seccion de retail ayuda a vender mas, reforzar marca y mostrar que la experiencia va mas alla del corte.',
        items: [
          {
            title: 'Pomada mate',
            price: '$180',
            description: 'Textura firme con acabado natural para peinados que duran sin verse rigidos.',
          },
          {
            title: 'Aceite para barba',
            price: '$220',
            description: 'Suaviza, aporta brillo controlado y ayuda a mantener una barba mejor cuidada.',
          },
          {
            title: 'Shampoo fortalecedor',
            price: '$160',
            description: 'Limpieza suave para rutina diaria con sensacion fresca y una imagen mas cuidada.',
          },
          {
            title: 'Cera de peinado',
            price: '$150',
            description: 'Control flexible para definir textura, volumen y acabado en segundos.',
          },
        ],
      },
      gallery: {
        eyebrow: 'Galeria / estilos',
        title: 'Trabajos y ambiente que venden experiencia',
        description:
          'Aunque aqui son placeholders, esta composicion esta pensada para lucir como una galeria real de resultados y estilo.',
        items: [
          {
            title: 'Degradado',
            caption: 'Precision en nuca, laterales y volumen superior.',
            tone: 'fade',
          },
          {
            title: 'Corte clasico',
            caption: 'Lineas sobrias y textura con acabado editorial.',
            tone: 'classic',
          },
          {
            title: 'Barba perfilada',
            caption: 'Contornos definidos para una imagen mas pulida.',
            tone: 'beard',
          },
          {
            title: 'Estilo moderno',
            caption: 'Composicion visual para cortes actuales y presencia premium.',
            tone: 'modern',
          },
        ],
      },
      socials: {
        eyebrow: 'Sigue nuestro trabajo',
        title: 'Conecta sitio web, redes y WhatsApp desde una misma presencia digital',
        description:
          'La demo muestra como una barberia puede centralizar canales para verse mejor y facilitar contacto.',
        items: [
          { label: 'Instagram', href: '#' },
          { label: 'Facebook', href: '#' },
          { label: 'TikTok', href: '#' },
          { label: 'WhatsApp', href: '#' },
        ],
      },
      testimonials: {
        eyebrow: 'Resenas simuladas',
        title: 'Ejemplos ilustrativos de como podria verse la prueba social',
        description:
          'Estas resenas son ficticias y se muestran solo para ilustrar como una barberia puede comunicar confianza desde su pagina.',
        items: [
          {
            label: 'Ejemplo ilustrativo',
            quote: 'Agende por WhatsApp y me atendieron sin esperar.',
            author: 'Cliente de ejemplo 01',
          },
          {
            label: 'Ejemplo ilustrativo',
            quote: 'El corte quedo justo como lo pedi.',
            author: 'Cliente de ejemplo 02',
          },
          {
            label: 'Ejemplo ilustrativo',
            quote: 'La barberia se ve profesional desde la pagina.',
            author: 'Cliente de ejemplo 03',
          },
        ],
      },
      location: {
        eyebrow: 'Ubicacion y horarios',
        title: 'Visitanos o agenda antes de llegar',
        description:
          'Una pagina como esta ayuda a mostrar zona, horario y ubicacion sin obligar al cliente a preguntar todo por chat.',
        zone: 'Zona Centro, Celaya, Gto.',
        hours: [
          { label: 'Lunes a viernes', value: '10:00 AM - 8:00 PM' },
          { label: 'Sabado', value: '10:00 AM - 6:00 PM' },
          { label: 'Domingo', value: 'Cerrado' },
        ],
        ctaLabel: 'Abrir ubicacion',
        mapLabel: 'Placeholder de ubicacion interactiva',
      },
      closing: {
        title: 'Agenda tu proximo corte',
        description:
          'Evita esperas, elige tu servicio y asegura tu horario desde la web o WhatsApp.',
        primaryLabel: 'Agendar cita',
        secondaryLabel: 'WhatsApp',
      },
    },
    footer: {
      brandName: 'G&G Barber Studio',
      summary:
        'Landing demo para mostrar como una barberia premium puede presentar servicios, equipo, productos y agenda digital desde una identidad propia.',
      creatorLabel: 'Creado por ByteShark',
      note: 'Demo conceptual creada por ByteShark. No representa una barberia real.',
    },
  },
  {
    slug: 'cafe-restaurante',
    path: 'cafe-restaurante/',
    name: 'Bruma Café & Cocina',
    businessName: 'Bruma Café & Cocina',
    category: 'Cafe, restaurante, snacks y bebidas',
    problem:
      'Ayuda a presentar menu, promociones, pedidos y ubicacion con una experiencia clara desde movil.',
    ctaLabel: 'Ver demo',
    accent: {
      from: '#efb26a',
      to: '#934922',
      halo: 'rgba(239, 178, 106, 0.32)',
      surface: 'rgba(239, 178, 106, 0.12)',
    },
    contact: {
      whatsapp: {
        phone: '520000000002',
        message:
          'Hola, quiero pedir informacion sobre Bruma Café & Cocina y conocer el menu o reservar una mesa.',
      },
    },
    hero: {
      eyebrow: 'Demo comercial para cafe y restaurante',
      title: 'Cafe, cocina y momentos para quedarse',
      description:
        'Consulta el menu, descubre promociones y reserva tu mesa o pide por WhatsApp en segundos.',
      badges: ['Cafe de especialidad', 'Desayunos', 'Postres', 'Reservas'],
      metrics: [
        { label: 'Menu digital', value: 'Secciones por categoria' },
        { label: 'Canales', value: 'Reservas o pedidos directos' },
        { label: 'Visibilidad', value: 'Promos y fotos destacadas' },
      ],
    },
    highlights: [
      'Menu digital',
      'Promociones',
      'Ubicacion',
      'Boton de WhatsApp',
      'Reservas o pedidos',
      'Galeria visual',
    ],
    sections: {
      overview: {
        eyebrow: 'Que resuelve',
        title: 'Menos friccion entre el antojo y la accion',
        description:
          'La demo ordena menu, promos y contacto para captar mejor desde redes o busquedas locales.',
        items: [
          {
            title: 'Menu entendible',
            description: 'El visitante encuentra rapido bebidas, alimentos y combos destacados.',
          },
          {
            title: 'Pedidos o reservas',
            description: 'Los CTA empujan acciones directas sin esconder el canal principal.',
          },
          {
            title: 'Mejor presencia local',
            description: 'Ubicacion, horarios y ambiente ayudan a decidir la visita.',
          },
        ],
      },
      offerings: {
        eyebrow: 'Menu editable',
        title: 'Bloques listos para menu y especiales',
        description: 'Todo el contenido puede adaptarse a restaurante, cafe, brunch o snack bar.',
        items: [
          {
            title: 'Bebidas de firma',
            meta: 'Categoria destacada',
            description: 'Espacio para bebidas premium, estacionales o mas vendidas.',
          },
          {
            title: 'Combos del dia',
            meta: 'Promocion recurrente',
            description: 'Ideal para lunch, desayuno ejecutivo o paquetes por horario.',
          },
          {
            title: 'Reservacion rapida',
            meta: 'CTA directo',
            description: 'Boton para apartar mesa o pedir al instante desde WhatsApp.',
          },
        ],
      },
      features: {
        eyebrow: 'Funciones destacadas',
        title: 'La base ya contempla el flujo comercial del giro',
        description: 'Especialmente util para negocios que hoy dependen demasiado de redes sociales.',
        items: [
          {
            title: 'Carta por categorias',
            description: 'Entradas, platos fuertes, bebidas y postres con orden mas claro.',
          },
          {
            title: 'Promos visibles',
            description: 'Seccion para happy hour, combos o especiales de la semana.',
          },
          {
            title: 'Pedido o reserva por WhatsApp',
            description: 'Mensaje precargado segun objetivo del negocio.',
          },
          {
            title: 'Galeria inmersiva',
            description: 'Ambiente, platillos y presentacion para disparar interes.',
          },
        ],
      },
      gallery: {
        eyebrow: 'Visual',
        title: 'Espacios para vender ambiente y producto',
        description: 'El objetivo es que la pagina de antojo y facilite una decision rapida.',
        items: [
          {
            title: 'Platillos estrella',
            caption: 'Lugar para hero shots, bebidas frias, desayunos o reposteria.',
          },
          {
            title: 'Ambiente del local',
            caption: 'Terraza, interior, barra o rincones instagrameables.',
          },
          {
            title: 'Promociones por horario',
            caption: 'Visuales para happy hour, menu ejecutivo o brunch del fin.',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Comentarios simulados',
        title: 'Prueba social util para ventas locales',
        description: 'Pensado para confianza, servicio y experiencia del lugar.',
        items: [
          {
            quote: 'Vi el menu en el celular, apartamos mesa y llegamos sin vueltas.',
            author: 'Pareja visitante',
          },
          {
            quote: 'Las promos estan claras y la pagina si da ganas de ir.',
            author: 'Cliente recurrente',
          },
          {
            quote: 'Es mucho mas facil pedir por WhatsApp cuando ya se ve todo ordenado.',
            author: 'Pedido a domicilio',
          },
        ],
      },
      trust: {
        eyebrow: 'Operacion visible',
        title: 'Informacion practica para negocio de comida',
        description: 'Secciones listas para horarios, cobertura, reservas y reglas del servicio.',
        items: [
          {
            title: 'Horario y dias clave',
            description: 'Bloque preparado para apertura, cocina, brunch o servicio nocturno.',
          },
          {
            title: 'Ubicacion y mapa',
            description: 'Direccion, referencias y estacionamiento o delivery por zona.',
          },
          {
            title: 'CTA por objetivo',
            description: 'Puede orientarse a reservar mesa, pedir para llevar o pedir domicilio.',
          },
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Preguntas frecuentes editables',
        description: 'Sirven para evitar aclaraciones repetidas por mensaje privado.',
        items: [
          {
            question: 'Se puede usar para pedidos y reservaciones al mismo tiempo?',
            answer: 'Si. El flujo puede separar ambos objetivos con botones y mensajes distintos.',
          },
          {
            question: 'El menu puede actualizarse seguido?',
            answer: 'Si. La estructura esta pensada para editar platillos, precios y promos con facilidad.',
          },
          {
            question: 'Funciona bien en movil?',
            answer: 'Si. La demo esta planteada primero para usuarios que llegan desde celular.',
          },
        ],
      },
      closing: {
        title: 'Ideal para negocios que necesitan dar antojo y hacer mas facil la conversion.',
        description:
          'ByteShark puede ajustar esta base a cafe, restaurante, bar sin alcohol o concepto gastronomico.',
      },
    },
  },
  {
    slug: 'salud-profesional',
    path: 'salud-profesional/',
    name: 'Centro Sereno Salud Integral',
    businessName: 'Centro Sereno Salud Integral',
    category: 'Psicologia clinica, salud emocional y consultorio privado',
    problem:
      'Presenta credenciales, servicios, proceso de atencion y agenda de consulta con un tono etico, sobrio y profesional.',
    ctaLabel: 'Ver demo',
    accent: {
      from: '#c9ebd0',
      to: '#476550',
      halo: 'rgba(125, 157, 133, 0.24)',
      surface: 'rgba(239, 238, 235, 0.86)',
    },
    contact: {
      whatsapp: {
        phone: '520000000003',
        message:
          'Hola, me interesa agendar una consulta en Centro Sereno Salud Integral y conocer las modalidades disponibles.',
      },
    },
    hero: {
      eyebrow: 'Demo conceptual para salud emocional y consultorio privado',
      title: 'Atencion profesional para tu bienestar emocional',
      description:
        'Agenda una consulta presencial u online en un espacio etico, seguro y orientado a tu proceso personal.',
      metrics: [
        { label: 'Credenciales', value: 'Cedula visible y responsable del servicio' },
        { label: 'Agenda', value: 'Formulario demo + WhatsApp' },
        { label: 'Modalidad', value: 'Presencial y online' },
      ],
    },
    highlights: [
      'Atencion profesional',
      'Consulta online',
      'Privacidad',
      'Cedula visible',
      'Agenda por WhatsApp',
      'Preguntas frecuentes',
      'Seguimiento personalizado',
    ],
    footer: {
      brandName: 'Centro Sereno Salud Integral',
      summary:
        'Landing demostrativa inspirada directamente en Stitch para mostrar credenciales, servicios y agenda de consulta con tono profesional.',
      creatorLabel: 'Creado por ByteShark',
      note: 'Demo conceptual creada por ByteShark. No representa un consultorio real.',
    },
  },
  {
    slug: 'despacho-contable',
    path: '/despacho-contable/',
    name: 'Despacho Contable',
    category: 'Contabilidad, fiscal, administrativo y consultoria',
    problem:
      'Ayuda a comunicar servicios fiscales y confianza profesional con una estructura clara para captar leads.',
    ctaLabel: 'Ver demo',
    accent: {
      from: '#8fc0ff',
      to: '#275786',
      halo: 'rgba(143, 192, 255, 0.3)',
      surface: 'rgba(143, 192, 255, 0.12)',
    },
    hero: {
      eyebrow: 'Demo comercial para servicios financieros y administrativos',
      title: 'Un despacho que se siente ordenado, confiable y facil de contactar.',
      description:
        'La base presenta servicios fiscales, beneficios y preguntas frecuentes con un tono profesional y serio.',
      metrics: [
        { label: 'Servicios', value: 'Fiscal + contable + asesoria' },
        { label: 'Contacto', value: 'CTA directo a ByteShark o WhatsApp' },
        { label: 'Confianza', value: 'Beneficios + FAQ + respaldo' },
      ],
    },
    highlights: [
      'Servicios fiscales',
      'Asesoria',
      'Boton de contacto',
      'Beneficios',
      'Preguntas frecuentes',
      'Seccion de confianza',
    ],
    sections: {
      overview: {
        eyebrow: 'Que resuelve',
        title: 'Una oferta seria y entendible para clientes que buscan orden',
        description:
          'La pagina ayuda a explicar el valor del despacho sin caer en texto excesivo o percepcion improvisada.',
        items: [
          {
            title: 'Confianza profesional',
            description: 'La identidad visual transmite metodo, orden y respaldo.',
          },
          {
            title: 'Servicios bien definidos',
            description: 'Las personas distinguen rapido lo fiscal, contable y administrativo.',
          },
          {
            title: 'Contacto mas calificado',
            description: 'El CTA dirige a una conversacion con mejor contexto inicial.',
          },
        ],
      },
      offerings: {
        eyebrow: 'Servicios',
        title: 'Bloques para servicios clave del despacho',
        description: 'La estructura puede ampliarse segun regimenes, nichos o paquetes.',
        items: [
          {
            title: 'Cumplimiento fiscal',
            meta: 'Mensual o anual',
            description: 'Espacio para declaraciones, obligaciones y seguimiento de cumplimiento.',
          },
          {
            title: 'Asesoria administrativa',
            meta: 'Negocios y profesionales',
            description: 'Bloque para orden financiero, procesos y decisiones operativas.',
          },
          {
            title: 'Acompanamiento recurrente',
            meta: 'Retainer o paquete',
            description: 'Ideal para clientes que necesitan supervision y soporte continuo.',
          },
        ],
      },
      features: {
        eyebrow: 'Funciones destacadas',
        title: 'Pensado para captar confianza y aclarar alcance',
        description: 'Util para despachos pequenos, firmas boutique o asesores independientes.',
        items: [
          {
            title: 'Beneficios visibles',
            description: 'Ahorro de tiempo, orden documental y mejor toma de decisiones.',
          },
          {
            title: 'Seccion de confianza',
            description: 'Bloque para trayectoria, metodologia o sectores atendidos.',
          },
          {
            title: 'FAQ practica',
            description: 'Resuelve dudas iniciales antes de cotizar o agendar llamada.',
          },
          {
            title: 'CTA a contacto directo',
            description: 'Canal configurable para WhatsApp, correo o formulario.',
          },
        ],
      },
      gallery: {
        eyebrow: 'Visual',
        title: 'Placeholder para respaldos visuales sobrios',
        description: 'No busca verse flashy, sino ordenado y confiable.',
        items: [
          {
            title: 'Paneles y reportes',
            caption: 'Espacio para dashboards, reportes ejecutivos o entregables.',
          },
          {
            title: 'Proceso de trabajo',
            caption: 'Visuales para onboarding, seguimiento y control documental.',
          },
          {
            title: 'Industria atendida',
            caption: 'Bloques para retail, servicios, profesionistas o pymes.',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Comentarios simulados',
        title: 'Prueba social con tono corporativo',
        description: 'Los testimonios estan pensados para transmitir orden y tranquilidad.',
        items: [
          {
            quote: 'Por fin entendimos que servicio contratar y como iniciar sin confusiones.',
            author: 'Pyme en crecimiento',
          },
          {
            quote: 'La pagina comunica seriedad y hace facil dar el siguiente paso.',
            author: 'Profesional independiente',
          },
          {
            quote: 'El contenido se siente claro y orientado a resolver problemas reales.',
            author: 'Negocio local',
          },
        ],
      },
      trust: {
        eyebrow: 'Respaldo',
        title: 'Elementos de confianza editables',
        description: 'Sirven para diferenciar el despacho frente a opciones genericas.',
        items: [
          {
            title: 'Metodologia clara',
            description: 'Describe proceso de incorporacion, revision y seguimiento.',
          },
          {
            title: 'Enfoque por perfil',
            description: 'Puede adaptarse a pymes, personas fisicas o servicios especializados.',
          },
          {
            title: 'Canal de contacto',
            description: 'La pagina puede empujar correo, formulario o WhatsApp segun preferencia.',
          },
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Preguntas frecuentes para precalificar mejor',
        description: 'Especialmente util en negocios donde el cliente llega con dudas abiertas.',
        items: [
          {
            question: 'Se puede adaptar a un despacho boutique o consultor individual?',
            answer: 'Si. La estructura no depende de un tamano fijo de equipo o de marca corporativa.',
          },
          {
            question: 'El CTA puede ir a un formulario en vez de WhatsApp?',
            answer: 'Si. El contacto principal esta centralizado y puede sustituirse sin rehacer la pagina.',
          },
          {
            question: 'Sirve para nichos especificos?',
            answer: 'Si. Se pueden cambiar textos, beneficios y FAQs para sectores muy concretos.',
          },
        ],
      },
      closing: {
        title: 'Ideal para despachos que quieren verse confiables y vender mejor su claridad.',
        description:
          'ByteShark puede adaptar esta base a contabilidad, asesoria fiscal o consultoria administrativa.',
      },
    },
  },
];

export const demosBySlug = Object.fromEntries(demos.map((demo) => [demo.slug, demo]));

export function getDemoBySlug(slug) {
  return demosBySlug[slug];
}
