# Demos ByteShark

Catalogo de demos web de ByteShark para distintos tipos de negocio, publicado en GitHub Pages bajo `https://byteshark-dev.github.io/demos/`.

## Stack

- Vite
- React
- React Router
- Tailwind CSS

## Instalar dependencias

```bash
npm install
```

## Ejecutar localmente

```bash
npm run dev
```

Vite abrira el proyecto en desarrollo y las rutas internas del catalogo seguiran funcionando dentro del router.

## Compilar

```bash
npm run build
```

El resultado queda en `dist/`.

## Publicar en GitHub Pages

Este repo esta preparado para desplegarse con GitHub Actions usando `.github/workflows/deploy.yml`.

Flujo recomendado:

1. Sube el repo a GitHub en la organizacion o cuenta `byteshark-dev`.
2. Usa la rama `main` como rama principal.
3. En GitHub, deja GitHub Pages configurado para usar GitHub Actions.
4. Haz push a `main`.
5. El workflow instalara dependencias, construira el sitio y publicara `dist/`.

## Notas de ruteo

- `vite.config.js` usa `base: "/demos/"`.
- El router usa `BrowserRouter` con `basename="/demos"`.
- `public/404.html` agrega el fallback necesario para acceso directo y refresh en rutas de GitHub Pages.

## Rutas incluidas

- `/demos/`
- `/demos/barberia/`
- `/demos/cafe-restaurante/`
- `/demos/salud-profesional/`
- `/demos/despacho-contable/`

## Configuracion editable

- `src/config/site.js`: marca, enlaces y CTA principal.
- `src/config/demos.js`: catalogo, datos de cada demo y contenido editable.
