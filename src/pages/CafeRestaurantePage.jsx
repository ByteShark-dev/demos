import { useState } from 'react';

import { DemoHeaderBar } from '../components/DemoHeaderBar.jsx';
import { getDemoBySlug } from '../config/demos.js';
import { buildWhatsAppUrl, getDemoWhatsAppUrl } from '../config/site.js';
import '../styles/cafe-restaurante.css';

const tabs = [
  { id: 'menu', label: 'Menu' },
  { id: 'promos', label: 'Promos' },
  { id: 'reservar', label: 'Reservar' },
  { id: 'ubicacion', label: 'Ubicacion' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'redes', label: 'Redes' },
];

const categoryOrder = ['Todos', 'Cafes', 'Desayunos', 'Comida', 'Postres', 'Bebidas frias'];

const menuItems = [
  {
    name: 'Latte de vainilla',
    price: '$65',
    category: 'Cafes',
    tag: 'Popular',
    description: 'Cafe de especialidad con notas suaves y vainilla organica.',
    visual: 'latte',
  },
  {
    name: 'Croissant de jamon y queso',
    price: '$89',
    category: 'Desayunos',
    tag: 'Nuevo',
    description: 'Masa hojaldrada, mantequilla francesa y queso gratinado.',
    visual: 'croissant',
  },
  {
    name: 'Bowl de frutas',
    price: '$95',
    category: 'Desayunos',
    tag: 'Recomendado',
    description: 'Fruta de temporada con yogurt griego artesanal y granola.',
    visual: 'bowl',
  },
  {
    name: 'Pasta cremosa',
    price: '$145',
    category: 'Comida',
    tag: '',
    description: 'Pasta corta con salsa de la casa, hierbas frescas y parmesano.',
    visual: 'pasta',
  },
  {
    name: 'Cheesecake de frutos rojos',
    price: '$78',
    category: 'Postres',
    tag: 'Popular',
    description: 'Textura cremosa, base de mantequilla y frutos rojos macerados.',
    visual: 'cheesecake',
  },
  {
    name: 'Cold brew',
    price: '$70',
    category: 'Bebidas frias',
    tag: 'Recomendado',
    description: 'Extraccion lenta con hielo y perfil achocolatado.',
    visual: 'coldbrew',
  },
];

const promos = [
  {
    title: 'Combo desayuno',
    body: 'Cafe americano o latte + croissant de la casa por precio especial.',
    benefit: '$115',
    action: 'Consultar promocion',
    tone: 'primary',
  },
  {
    title: '2x1 en bebidas frias',
    body: 'Disponible todos los jueves durante el dia.',
    benefit: 'Jueves',
    action: 'Ver bebidas',
    tone: 'olive',
  },
  {
    title: 'Postre gratis en cumpleanos',
    body: 'Aplica en reservas celebradas con anticipacion.',
    benefit: 'Reserva',
    action: 'Reservar ahora',
    tone: 'rose',
  },
];

const galleryItems = [
  { label: 'Cafe', visual: 'cafe' },
  { label: 'Postres', visual: 'postres' },
  { label: 'Interior', visual: 'interior' },
  { label: 'Desayunos', visual: 'desayunos' },
  { label: 'Bebidas frias', visual: 'bebidas' },
  { label: 'Platillos', visual: 'platillos' },
];

const reviews = [
  'Reserve desde la pagina y fue muy rapido.',
  'El menu esta claro y dan ganas de pedir todo.',
  'Encontre la ubicacion y promociones sin tener que escribir primero.',
];

const socialItems = [
  { label: 'Instagram', short: 'IG', href: '#' },
  { label: 'Facebook', short: 'FB', href: '#' },
  { label: 'TikTok', short: 'TT', href: '#' },
  { label: 'WhatsApp', short: 'WA', href: '#' },
];

function buildRequestMessage(demo, formData) {
  return [
    `Hola, quiero hacer una solicitud en ${demo.businessName}.`,
    `Nombre: ${formData.name || 'Pendiente'}`,
    `Telefono: ${formData.phone || 'Pendiente'}`,
    `Tipo: ${formData.requestType || 'Pendiente'}`,
    `Fecha: ${formData.date || 'Pendiente'}`,
    `Hora: ${formData.time || 'Pendiente'}`,
    `Personas: ${formData.guests || 'Pendiente'}`,
    `Comentarios: ${formData.comments || 'Sin comentarios adicionales.'}`,
  ].join('\n');
}

function filterMenuItems(activeCategory) {
  if (activeCategory === 'Todos') {
    return menuItems;
  }

  return menuItems.filter((item) => item.category === activeCategory);
}

function renderTabPanel({
  activeTab,
  demo,
  menuCategory,
  onMenuCategoryChange,
  formData,
  onChange,
  onSubmit,
  requestHref,
  whatsappHref,
  confirmation,
  mapHref,
}) {
  if (activeTab === 'menu') {
    const filteredItems = filterMenuItems(menuCategory);

    return (
      <section className="cafe-demo__panel">
        <div className="cafe-demo__panel-head">
          <div>
            <p className="cafe-demo__eyebrow">Nuestra cocina</p>
            <h2 className="cafe-demo__panel-title">Menu compacto y claro</h2>
          </div>
          <p className="cafe-demo__panel-copy">
            Explora categorias sin dejar la pagina. La estructura sigue el tono editorial de
            Stitch, pero condensada en un micrositio mas agil.
          </p>
        </div>

        <div className="cafe-demo__chip-row" role="tablist" aria-label="Categorias del menu">
          {categoryOrder.map((category) => (
            <button
              key={category}
              className={`cafe-demo__chip ${menuCategory === category ? 'is-active' : ''}`}
              onClick={() => onMenuCategoryChange(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="cafe-demo__menu-grid">
          {filteredItems.map((item) => (
            <article key={item.name} className="cafe-demo__menu-card">
              <div className={`cafe-demo__menu-visual cafe-demo__menu-visual--${item.visual}`}>
                <span>{item.category}</span>
              </div>
              <div className="cafe-demo__menu-head">
                <h3 className="cafe-demo__card-title">{item.name}</h3>
                <p className="cafe-demo__price">{item.price}</p>
              </div>
              <p className="cafe-demo__copy">{item.description}</p>
              {item.tag ? <span className="cafe-demo__tag">{item.tag}</span> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === 'promos') {
    return (
      <section className="cafe-demo__panel">
        <div className="cafe-demo__panel-head">
          <div>
            <p className="cafe-demo__eyebrow">Promociones del mes</p>
            <h2 className="cafe-demo__panel-title">Ofertas visibles sin saturar la pagina</h2>
          </div>
          <p className="cafe-demo__panel-copy">
            Mantienen la composicion tipo bento del export de Stitch, pero convertida en un bloque
            compacto y navegable.
          </p>
        </div>

        <div className="cafe-demo__promo-grid">
          {promos.map((promo) => (
            <article key={promo.title} className={`cafe-demo__promo-card cafe-demo__promo-card--${promo.tone}`}>
              <div>
                <p className="cafe-demo__promo-benefit">{promo.benefit}</p>
                <h3 className="cafe-demo__card-title">{promo.title}</h3>
                <p className="cafe-demo__copy">{promo.body}</p>
              </div>
              <a className="cafe-demo__button cafe-demo__button--ghost" href={whatsappHref} rel="noreferrer" target="_blank">
                {promo.action}
              </a>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (activeTab === 'reservar') {
    return (
      <section className="cafe-demo__panel">
        <div className="cafe-demo__reservation-shell">
          <aside className="cafe-demo__reservation-aside">
            <div>
              <p className="cafe-demo__eyebrow">Reserva tu lugar</p>
              <h2 className="cafe-demo__panel-title">Planea tu visita o tu pedido</h2>
              <p className="cafe-demo__copy">
                Panel visual compacto para reservas de mesa o pedidos anticipados.
              </p>
            </div>
            <div className="cafe-demo__reservation-meta">
              <p>+52 (461) 000 0000</p>
              <p>Zona Centro, Celaya, Gto.</p>
            </div>
          </aside>

          <form className="cafe-demo__reservation-form" onSubmit={onSubmit}>
            <label className="cafe-demo__field">
              <span>Nombre</span>
              <input name="name" onChange={onChange} placeholder="Tu nombre" type="text" value={formData.name} />
            </label>
            <label className="cafe-demo__field">
              <span>Telefono</span>
              <input
                name="phone"
                onChange={onChange}
                placeholder="461 000 0000"
                type="tel"
                value={formData.phone}
              />
            </label>
            <label className="cafe-demo__field">
              <span>Tipo de solicitud</span>
              <select name="requestType" onChange={onChange} value={formData.requestType}>
                <option>Pedido</option>
                <option>Reserva</option>
              </select>
            </label>
            <div className="cafe-demo__field-row">
              <label className="cafe-demo__field">
                <span>Fecha</span>
                <input name="date" onChange={onChange} type="date" value={formData.date} />
              </label>
              <label className="cafe-demo__field">
                <span>Hora</span>
                <input name="time" onChange={onChange} type="time" value={formData.time} />
              </label>
            </div>
            <label className="cafe-demo__field">
              <span>Numero de personas</span>
              <input name="guests" onChange={onChange} placeholder="2" type="number" value={formData.guests} />
            </label>
            <label className="cafe-demo__field cafe-demo__field--full">
              <span>Comentarios</span>
              <textarea
                name="comments"
                onChange={onChange}
                placeholder="Notas sobre alergias o celebraciones"
                rows="2"
                value={formData.comments}
              />
            </label>
            <div className="cafe-demo__field-actions">
              <button className="cafe-demo__button cafe-demo__button--primary" type="submit">
                Enviar solicitud
              </button>
              <a className="cafe-demo__button cafe-demo__button--secondary" href={requestHref} rel="noreferrer" target="_blank">
                Pedir por WhatsApp
              </a>
            </div>
            {confirmation ? <p className="cafe-demo__confirmation">{confirmation}</p> : null}
          </form>
        </div>
      </section>
    );
  }

  if (activeTab === 'ubicacion') {
    return (
      <section className="cafe-demo__panel">
        <div className="cafe-demo__location-grid">
          <div className="cafe-demo__location-copy">
            <p className="cafe-demo__eyebrow">Visitanos hoy</p>
            <h2 className="cafe-demo__panel-title">Zona Centro, Celaya, Gto.</h2>
            <div className="cafe-demo__location-list">
              <div>
                <span>Ubicacion</span>
                <p>Zona Centro, Celaya, Gto.</p>
              </div>
              <div>
                <span>Horarios</span>
                <p>Lunes a sabado: 8:00 AM - 9:00 PM</p>
                <p>Domingo: 9:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div className="cafe-demo__location-actions">
              <a className="cafe-demo__button cafe-demo__button--primary" href={mapHref} rel="noreferrer" target="_blank">
                Abrir ubicacion
              </a>
              <a className="cafe-demo__button cafe-demo__button--secondary" href={whatsappHref} rel="noreferrer" target="_blank">
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="cafe-demo__map-placeholder">
            <div className="cafe-demo__map-card">
              <span>Mapa placeholder</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activeTab === 'galeria') {
    return (
      <section className="cafe-demo__panel">
        <div className="cafe-demo__panel-head">
          <div>
            <p className="cafe-demo__eyebrow">Nuestra esencia</p>
            <h2 className="cafe-demo__panel-title">Galeria compacta</h2>
          </div>
          <p className="cafe-demo__panel-copy">
            Placeholder propio con la composicion editorial del export: mosaico, tonos calidos y
            etiquetas claras.
          </p>
        </div>

        <div className="cafe-demo__gallery-grid">
          {galleryItems.map((item, index) => (
            <article
              key={item.label}
              className={`cafe-demo__gallery-card cafe-demo__gallery-card--${item.visual} ${index === 1 ? 'is-tall' : ''}`.trim()}
            >
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="cafe-demo__panel">
      <div className="cafe-demo__panel-head">
        <div>
          <p className="cafe-demo__eyebrow">Sigue nuestros sabores</p>
          <h2 className="cafe-demo__panel-title">Redes y prueba social compacta</h2>
        </div>
        <p className="cafe-demo__panel-copy">
          Botones directos para redes y reseñas simuladas presentadas como ejemplo de demo.
        </p>
      </div>

      <div className="cafe-demo__social-row">
        {socialItems.map((item) => {
          const isWhatsApp = item.label === 'WhatsApp';

          return (
            <a
              key={item.label}
              className="cafe-demo__social-pill"
              href={isWhatsApp ? whatsappHref : item.href}
              rel={isWhatsApp ? 'noreferrer' : undefined}
              target={isWhatsApp ? '_blank' : undefined}
            >
              <span>{item.short}</span>
              {item.label}
            </a>
          );
        })}
      </div>

      <div className="cafe-demo__review-row">
        {reviews.map((review) => (
          <article key={review} className="cafe-demo__review-card">
            <p>{review}</p>
            <span>Ejemplo ilustrativo</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CafeRestaurantePage() {
  const demo = getDemoBySlug('cafe-restaurante');
  const whatsappHref = getDemoWhatsAppUrl(demo);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Zona Centro, Celaya, Gto.')}`;
  const [activeTab, setActiveTab] = useState('menu');
  const [menuCategory, setMenuCategory] = useState('Todos');
  const [confirmation, setConfirmation] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requestType: 'Pedido',
    date: '',
    time: '',
    guests: '2',
    comments: '',
  });

  const requestHref = buildWhatsAppUrl({
    phone: demo.contact.whatsapp.phone,
    message: buildRequestMessage(demo, formData),
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation(
      'Solicitud demo preparada. Puedes continuar el flujo abriendo WhatsApp con los datos capturados.',
    );
  }

  return (
    <div className="cafe-demo min-h-screen">
      <DemoHeaderBar
        primaryAction={{ label: 'Pedir por WhatsApp', href: whatsappHref, external: true, variant: 'primary' }}
        secondaryAction={{ label: 'Volver al catalogo', href: '/' }}
        tone="warm"
      />

      <main className="cafe-demo__main">
        <section className="cafe-demo__hero">
          <div className="cafe-demo__shell cafe-demo__hero-layout">
            <div className="cafe-demo__hero-copy">
              <p className="cafe-demo__brand">{demo.businessName}</p>
              <div className="cafe-demo__badges">
                {demo.hero.badges.map((badge) => (
                  <span key={badge} className="cafe-demo__badge">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="cafe-demo__title">Cafe, cocina y momentos para quedarse</h1>
              <p className="cafe-demo__subtitle">
                Consulta el menu, descubre promociones y reserva tu mesa o pide por WhatsApp en
                segundos.
              </p>
              <div className="cafe-demo__hero-actions">
                <button className="cafe-demo__button cafe-demo__button--primary" onClick={() => setActiveTab('menu')} type="button">
                  Ver menu
                </button>
                <a className="cafe-demo__button cafe-demo__button--secondary" href={whatsappHref} rel="noreferrer" target="_blank">
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            <div className="cafe-demo__hero-gallery" aria-hidden="true">
              <div className="cafe-demo__hero-card cafe-demo__hero-card--latte">
                <span>Latte</span>
              </div>
              <div className="cafe-demo__hero-card cafe-demo__hero-card--interior">
                <span>Interior</span>
              </div>
              <div className="cafe-demo__hero-card cafe-demo__hero-card--croissant">
                <span>Croissant</span>
              </div>
              <div className="cafe-demo__hero-card cafe-demo__hero-card--cake">
                <span>Cheesecake</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cafe-demo__shell cafe-demo__tabs-wrap">
          <div className="cafe-demo__tabs" role="tablist" aria-label="Secciones principales">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                aria-selected={activeTab === tab.id}
                className={`cafe-demo__tab ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="cafe-demo__tab-panel">
            {renderTabPanel({
              activeTab,
              demo,
              menuCategory,
              onMenuCategoryChange: setMenuCategory,
              formData,
              onChange: handleChange,
              onSubmit: handleSubmit,
              requestHref,
              whatsappHref,
              confirmation,
              mapHref,
            })}
          </div>
        </section>

        <section className="cafe-demo__shell cafe-demo__closing">
          <div className="cafe-demo__closing-card">
            <p className="cafe-demo__eyebrow">CTA final</p>
            <h2 className="cafe-demo__panel-title">
              Haz que tus clientes encuentren tu menu y pidan mas facil
            </h2>
            <p className="cafe-demo__panel-copy">
              Esta demo muestra como una pagina puede ayudar a un cafe o restaurante a mejorar su
              presencia digital y convertir visitas en pedidos o reservas.
            </p>
            <div className="cafe-demo__hero-actions">
              <button className="cafe-demo__button cafe-demo__button--primary" onClick={() => setActiveTab('menu')} type="button">
                Ver menu
              </button>
              <a className="cafe-demo__button cafe-demo__button--secondary" href={whatsappHref} rel="noreferrer" target="_blank">
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="cafe-demo__footer">
        <div className="cafe-demo__shell cafe-demo__footer-grid">
          <div>
            <p className="cafe-demo__footer-brand">{demo.businessName}</p>
            <p className="cafe-demo__copy">
              Cocina artesanal y cafe de especialidad creado para una presencia digital mas clara y
              facil de convertir.
            </p>
          </div>

          <div>
            <p className="cafe-demo__footer-heading">Categorias principales</p>
            <div className="cafe-demo__footer-links">
              {categoryOrder.slice(1).map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="cafe-demo__footer-heading">Redes sociales</p>
            <div className="cafe-demo__footer-links">
              {socialItems.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
            <p className="cafe-demo__footer-note">Creado por ByteShark</p>
          </div>
        </div>

        <div className="cafe-demo__shell cafe-demo__footer-bottom">
          Demo conceptual creada por ByteShark. No representa un restaurante real.
        </div>
      </footer>
    </div>
  );
}
