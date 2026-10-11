# Clúster Aeroespacial

Sitio del Clúster Aeroespacial (`aeroespacial.clusterdestartups.org`).

Next.js 16 + next-intl (`es`/`en`) + Tailwind v4. Alcance actual: landing, blog y calendario.

## Desarrollo

```bash
pnpm install
pnpm dev
```

- Lint: `pnpm lint`
- Build: `pnpm build` (export estático: `STATIC_EXPORT=1 pnpm build`)

## Contenido

- Blog: `content/blog/slug.{es,en}.md`
- Eventos: `content/eventos/slug.{es,en}.md` (frontmatter `date`, `endDate?`, `location?`, `url?`)

Reglas de UI y estructura: ver `AGENTS.md`.
