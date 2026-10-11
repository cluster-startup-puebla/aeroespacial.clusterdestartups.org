<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Clúster Aeroespacial — aeroespacial.clusterdestartups.org

Proyecto derivado de `clusterdestartups.org` (base: `/Users/alvarocastillo/dev/cluster/clusterdestartups.org`).
Alcance actual: **landing, blog y calendario**. El design system (paleta, modo oscuro, fuentes) **aún no se importa**.

## Stack

- Next.js **16** (App Router, root layout dentro de `src/app/[locale]/layout.tsx`, proxy en `src/proxy.ts` — ya no existe `middleware.ts`).
- **next-intl**: locales `es` (default) y `en`, `localePrefix: "always"`. Routing en `src/modules/cores/i18n/src/config/routing.ts`; config de mensajes en `src/modules/cores/i18n/src/services/request.ts`.
- Tailwind CSS **v4** (CSS-first en `src/app/globals.css`, sin `tailwind.config.js`).
- Contenido en markdown: `content/blog/` y `content/eventos/`, archivos `slug.{locale}.md`.

## Estructura de módulos

```
src/
  app/[locale]/          rutas (page.tsx) + layout raíz
  modules/
    cores/i18n/          routing, request config, mensajes, locale-switcher
    cores/site/          SITE_URL, helpers de metadata
    features/site/       header, footer, navigation
    features/blog/       servicios markdown + componentes de blog
    features/events/     servicios de eventos + componentes de calendario
    features/pages/      secciones de páginas (landing, etc.)
    shared/ui/           componentes atómicos (atoms / molecules)
content/                 markdown (blog, eventos)
```

Regla: las páginas en `app/` solo componen; la lógica vive en `modules/` y el UI reutilizable en `shared/ui`.

## Reglas al escribir UI (obligatorias)

1. **Nunca hex directo en el markup.** Solo utilities semánticas definidas en `globals.css`:
   - Fondos: `bg-surface`, `bg-surface-subtle`, `bg-elevated`
   - Bordes: `border-line`
   - Texto: `text-ink`, `text-ink-secondary`, `text-ink-muted`, `text-on-brand`, `text-link`
   - Marca/acento (hoy neutros): `bg-brand`, `text-brand`, `bg-accent`, `text-accent`, `text-on-accent`
   - Los hex solo están permitidos en `globals.css`.
2. **Tipografía:** headings con `font-display` + escala `text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-small`, `text-micro`. No inventar tamaños fuera de la escala.
3. **Todo es Tailwind.** No existen clases de componente (`btn`, `card`, …): el estilo se escribe con utilities Tailwind en el markup. Las dos extensiones permitidas son `@utility container-site` (contenedor 1280px) y `@utility article-body` (markdown), ambas en `globals.css`. Cualquier otra extención debe justificarse y crearse con `@utility`, nunca con `@layer components`.
4. **Layout:** contenedor `container-site`; espaciado base 4px; secciones `py-16` mobile / `py-24 lg:py-32` desktop; radios `rounded-sm|md|lg|full`.
5. **Componentes atómicos:** UI compartida en `src/modules/shared/ui/src/components/{atoms,molecules}` y exportada desde `index.ts`. No duplicar markup entre páginas.
6. **i18n:** todo texto visible pasa por `getTranslations`/`useTranslations`; agregar la clave en `messages/es/*.json` **y** `messages/en/*.json`.
7. **CTAs:** español mexicano, acción concreta; nunca "Click aquí".
8. **Pendiente (no implementar hasta traer el design system):** paleta de marca, modo oscuro (`data-theme`), fuentes Archivo/Raleway, GTM/analytics, cookie banner.

## Checklist antes de terminar una tarea

- [ ] Cero hex/rgb hardcodeados en componentes (solo en `globals.css`)
- [ ] Textos i18n en `es` y `en`
- [ ] `npm run lint` y `npm run build` pasan
