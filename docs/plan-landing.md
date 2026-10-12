# Landing del Año Espacial — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la home de texto por la landing del Año Espacial 2026–2027: un vuelo de stills numerados, “Puebla” a escala de lugar, la fila de convocantes y una sola acción, sumarse al Pacto.

**Architecture:** La home compone secciones. El vuelo es un cliente con escenario sticky y centinelas observados por IntersectionObserver, sin listener de scroll. Los stills salen de `frames.ts` y hoy son SVG numerados. El copy vive en next-intl. Los tokens oscuros de `DESIGN.md` entran en `globals.css` y aplican a todo el sitio.

**Tech Stack:** Next.js 16 App Router, React 19, next-intl (`es` / `en`), Tailwind CSS v4, `next/font` (Schibsted Grotesk), Lucide solo para el menú que ya existe.

**Lee antes de tocar código:** `DESIGN.md`, `docs/estructura.md`, `docs/lectura-design.md`, `docs/skills.md`, `AGENTS.md`.

**Fuera de este plan:** clon de Luma, rediseño del artículo, video de scroll-world, logotipos oficiales, correo de adhesión inventado.

**Verificación:** el repo no tiene runner de tests. Cada tarea cierra con `pnpm lint`. La última también corre `pnpm build` y revisa la home en el navegador.

---

### Task 1: Tokens del vacío y Schibsted Grotesk

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/modules/shared/ui/src/components/atoms/button.tsx`

- [ ] **Step 1: Sustituir `:root` y la familia en `globals.css`**

En `:root`, reemplaza los hex de relleno por los de `DESIGN.md`:

```css
:root {
  --bg-base: #07080c;
  --bg-subtle: #10131a;
  --bg-elevated: #161b26;
  --border-default: #ffffff24;
  --text-primary: #f3f5f7;
  --text-secondary: #a7b0bd;
  --text-muted: #8b94a3;
  --text-on-brand: #07080c;
  --link: #f3f5f7;
  --accent: #2454e0;
  --on-accent: #ffffff;
  --ease-arrive: cubic-bezier(0.22, 1, 0.36, 1);
}
```

En `@theme inline`, apunta las fuentes al variable de next/font y agrega el escalón de lugar:

```css
--font-display: var(--font-schibsted), "Helvetica Neue", Helvetica, Arial, sans-serif;
--font-body: var(--font-schibsted), "Helvetica Neue", Helvetica, Arial, sans-serif;

--text-place: clamp(4.5rem, 14vw, 11rem);
--text-place--line-height: 0.9;
--text-place--font-weight: 500;
--text-place--letter-spacing: -0.045em;
```

Baja `--text-display--font-weight` y `--text-h1--font-weight` de 700 a 500.

Agrega estas utilities. `flight-track` no lleva altura fija: la altura la dan los centinelas.

```css
@utility flight-track {
  position: relative;
}

@utility flight-stage {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;
}

@utility flight-frame {
  transition:
    opacity 480ms var(--ease-arrive),
    transform 700ms var(--ease-arrive);
}

@media (prefers-reduced-motion: reduce) {
  .flight-stage {
    position: static;
    height: auto;
    overflow: visible;
  }

  .flight-frame {
    transition: none;
  }
}
```

Actualiza el comentario de cabecera: la paleta ya es la de `DESIGN.md`.

En `:root` agrega `--accent-hover: #1b43c2`. En `@theme inline` agrega `--color-accent-hover: var(--accent-hover)`.

En `src/modules/shared/ui/src/components/atoms/button.tsx`, `primary` usa `rounded-full bg-accent text-on-accent hover:bg-accent-hover`. `secondary` y `ghost` usan `rounded-full`. Quita `hover:opacity-90`. El hex del hover vive solo en `globals.css`.

- [ ] **Step 2: Cargar la fuente en el layout**

En `src/app/[locale]/layout.tsx`:

```tsx
import { Schibsted_Grotesk } from "next/font/google";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-schibsted",
  display: "swap",
});
```

En el `<html>`:

```tsx
<html lang={locale} className={`${schibsted.variable} h-full antialiased`}>
```

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: sin errores nuevos.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css "src/app/[locale]/layout.tsx" src/modules/shared/ui/src/components/atoms/button.tsx
git commit -m "feat: apply limb observatory tokens and Schibsted Grotesk"
```

---

### Task 2: Slots numerados

**Files:**
- Create: `public/landing/img-01.svg` through `public/landing/img-08.svg`
- Create: `src/modules/features/pages/src/config/frames.ts`

- [ ] **Step 1: Un SVG por slot**

Cada archivo es un rectángulo `#07080c` con el id del slot en `#f3f5f7`. No dibujes cohete ni logotipo. El número es el contenido, para que el layout se lea como placa final.

`public/landing/img-01.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="IMG-01">
  <rect width="1600" height="900" fill="#07080c"/>
  <text x="80" y="140" fill="#f3f5f7" font-family="Helvetica, Arial, sans-serif" font-size="72">IMG-01</text>
</svg>
```

Repite cambiando texto, `aria-label` y, donde se indica, el `viewBox`:

| Archivo | Texto | viewBox |
|---|---|---|
| `img-02.svg` | `IMG-02` | `0 0 1500 1000` |
| `img-03.svg` | `IMG-03` | `0 0 1600 900` |
| `img-04.svg` | `IMG-04` | `0 0 1600 900` |
| `img-05.svg` | `IMG-05` | `0 0 1600 900` |
| `img-06.svg` | `IMG-06` | `0 0 1600 900` |
| `img-07.svg` | `IMG-07` | `0 0 1600 900` |
| `img-08.svg` | `IMG-08` | `0 0 1200 630` |

En cada uno, `width` y `height` del `<rect>` coinciden con el viewBox.

- [ ] **Step 2: Índice**

`src/modules/features/pages/src/config/frames.ts`:

```ts
export interface LandingFrame {
  id: string;
  src: string;
  altKey:
    | "frames.img01"
    | "frames.img02"
    | "frames.img03"
    | "frames.img04"
    | "frames.img05"
    | "frames.img06"
    | "frames.img07"
    | "frames.img08";
}

export const HERO_PLATE: LandingFrame = {
  id: "IMG-01",
  src: "/landing/img-01.svg",
  altKey: "frames.img01",
};

export const HERO_OBJECT: LandingFrame = {
  id: "IMG-02",
  src: "/landing/img-02.svg",
  altKey: "frames.img02",
};

export const FLIGHT_FRAMES: LandingFrame[] = [
  { id: "IMG-03", src: "/landing/img-03.svg", altKey: "frames.img03" },
  { id: "IMG-04", src: "/landing/img-04.svg", altKey: "frames.img04" },
  { id: "IMG-05", src: "/landing/img-05.svg", altKey: "frames.img05" },
  { id: "IMG-06", src: "/landing/img-06.svg", altKey: "frames.img06" },
  { id: "IMG-07", src: "/landing/img-07.svg", altKey: "frames.img07" },
];

export const OG_FRAME: LandingFrame = {
  id: "IMG-08",
  src: "/landing/img-08.svg",
  altKey: "frames.img08",
};
```

Cuando llegue un WebP de `docs/prompts-imagenes.md`, se cambia `src` aquí y se borra el SVG de ese slot. Ningún componente hardcodea la ruta.

- [ ] **Step 3: Lint y commit**

```bash
pnpm lint
git add public/landing src/modules/features/pages/src/config/frames.ts
git commit -m "feat: add numbered landing frame slots"
```

---

### Task 3: Convocantes y destino de adhesión

**Files:**
- Create: `src/modules/features/pages/src/config/convocantes.ts`
- Modify: `src/modules/cores/site/src/config/site.ts`

- [ ] **Step 1: Lista en el orden del Manifiesto**

```ts
export interface Convocante {
  id: string;
  shortName: string;
}

/** Wordmarks only. Official logos require written permission (Manifiesto, Acuerdo Sexto). */
export const CONVOCANTES: Convocante[] = [
  { id: "upaep", shortName: "UPAEP" },
  { id: "secihti", shortName: "SECIHTI Puebla" },
  { id: "csi", shortName: "Clúster de Startups" },
  { id: "inaoe", shortName: "INAOE" },
  { id: "sme", shortName: "Semana Mundial del Espacio" },
  { id: "sedetra", shortName: "SEDETRA" },
  { id: "cts", shortName: "CTS" },
  { id: "automotriz", shortName: "Clúster Automotriz" },
  { id: "canacintra", shortName: "CANACINTRA Puebla" },
  { id: "sintonia", shortName: "Sintonía" },
  { id: "yankuilotl", shortName: "Yankuilotl" },
  { id: "regenia", shortName: "REGENIA" },
];
```

- [ ] **Step 2: Href de adhesión**

En `site.ts`, exporta:

```ts
/** Stays on the adhesion section until a real inbox exists. Do not invent an address. */
export const ADHESION_HREF = "#adhesion";
```

- [ ] **Step 3: Lint y commit**

```bash
pnpm lint
git add src/modules/features/pages/src/config/convocantes.ts src/modules/cores/site/src/config/site.ts
git commit -m "feat: list manifiesto conveners as wordmarks"
```

---

### Task 4: Copy en es y en

**Files:**
- Modify: `src/modules/cores/i18n/messages/es/home.json`
- Modify: `src/modules/cores/i18n/messages/en/home.json`

- [ ] **Step 1: Extiende `Home` sin borrar `posts`, `events` ni `closing`.**

Claves que se reemplazan: `metaTitle`, `metaDescription`, `hero`. Claves que se agregan: `frames`, `chapters`, `tagline`, `axes`, `route`, `adhesion`, `faq`.

Español de `hero` y de las secciones nuevas:

```json
{
  "metaTitle": "Año Espacial 2026–2027 en Puebla",
  "metaDescription": "El 10 de octubre empezó el Año Espacial en Puebla. El Manifiesto abre el camino al Pacto. La adhesión cierra el 13 de noviembre de 2026.",
  "hero": {
    "eyebrow": "Año Espacial 2026–2027",
    "title": "Puebla",
    "description": "El 10 de octubre, en la UPAEP, cerró la Semana Mundial del Espacio y empezó el año espacial. Se entregó el Cohete Antorcha.",
    "primaryCta": "Sumarme al Pacto",
    "scroll": "Desliza para entrar",
    "conveners": "Convocan"
  },
  "frames": {
    "img01": "Línea de la atmósfera terrestre vista de noche, desde órbita baja.",
    "img02": "Representación fotográfica del Cohete Antorcha, objeto ceremonial sobre el vacío.",
    "img03": "Sala oscura con el Cohete Antorcha sobre una mesa, el día del acto.",
    "img04": "Mesa larga vacía en una sala oscura, preparada para una declaración conjunta.",
    "img05": "Cinco objetos sobre una mesa negra: telescopio, pieza de taller, cubesat, banco óptico y globo terráqueo.",
    "img06": "Mesa de firma vacía, con tres carpetas cerradas, en una sala a oscuras.",
    "img07": "El valle de Puebla de noche, visto desde altitud, con la luz del amanecer en el horizonte.",
    "img08": "Limbo de la Tierra y un cohete ceremonial, imagen para compartir el Año Espacial."
  },
  "chapters": {
    "c1": {
      "index": "01",
      "eyebrow": "10 de octubre de 2026",
      "title": "El acto",
      "body": "En la UPAEP se cerró la Semana Mundial del Espacio, empezó el Año Espacial y se entregó el Cohete Antorcha."
    },
    "c2": {
      "index": "02",
      "eyebrow": "Manifiesto",
      "title": "Una alianza que abre el camino",
      "body": "Doce convocantes invitan a más voluntades. Ninguno es dueño del Pacto. Quien se suma participa en la redacción, en igualdad."
    },
    "c3": {
      "index": "03",
      "eyebrow": "Cinco ejes",
      "title": "Hacia dónde se trabaja",
      "body": "Divulgación, industria poblana, emprendimiento en space tech, talento alineado con la industria, y vinculación con el país y el mundo."
    },
    "c4": {
      "index": "04",
      "eyebrow": "Ruta",
      "title": "Tres fechas",
      "body": "El Manifiesto ya está emitido. La adhesión para quedar en la firma cierra el 13 de noviembre. El Pacto se firma el 30 de noviembre."
    },
    "c5": {
      "index": "05",
      "eyebrow": "Adhesión",
      "title": "Hace falta voluntad, no experiencia previa",
      "body": "Se escribe al Clúster de Startups e Innovación, con representante y aportación. El Manifiesto no obliga a poner recursos."
    }
  },
  "tagline": {
    "line1": "Puebla entra a la cadena de valor aeroespacial.",
    "line2": "Ninguna institución lo logra sola."
  },
  "axes": {
    "eyebrow": "Acuerdo tercero",
    "title": "Cinco ejes de trabajo",
    "items": {
      "a1": { "index": "01", "title": "Divulgación científica", "body": "Acercar la ciencia y la tecnología espaciales a la sociedad y despertar vocaciones." },
      "a2": { "index": "02", "title": "Industria en Puebla", "body": "Incorporar a la industria poblana a la cadena de valor aeroespacial." },
      "a3": { "index": "03", "title": "Emprendimiento en space tech", "body": "Convertir proyectos científicos y tecnológicos en startups con modelo de negocio." },
      "a4": { "index": "04", "title": "Talento y empresa", "body": "Alinear la formación y las capacidades académicas con la demanda de la industria." },
      "a5": { "index": "05", "title": "Vinculación", "body": "Conectar al ecosistema poblano con el sector aeroespacial del país y del mundo." }
    }
  },
  "route": {
    "eyebrow": "Ruta",
    "title": "Del Manifiesto a la firma",
    "d1": { "date": "10 de octubre de 2026", "body": "Emisión del Manifiesto y apertura de la convocatoria." },
    "d2": { "date": "13 de noviembre de 2026", "body": "Límite para adherirse y quedar en la firma." },
    "d3": { "date": "30 de noviembre de 2026", "body": "Firma del Pacto e instalación del Comité Coordinador." }
  },
  "adhesion": {
    "eyebrow": "Adhesión",
    "title": "Sumarme al Pacto",
    "body": "La adhesión es por escrito al Clúster de Startups e Innovación. Indica representante y aportación. No se pide experiencia aeroespacial previa. Para quedar en la firma del 30 de noviembre, la carta llega a más tardar el 13 de noviembre de 2026.",
    "note": "El Manifiesto es una declaración de voluntad. No genera obligaciones jurídicas, económicas ni presupuestales.",
    "cta": "Sumarme al Pacto"
  },
  "faq": {
    "title": "Preguntas",
    "q1": "¿El Manifiesto me obliga a poner dinero?",
    "a1": "No. No genera obligaciones económicas ni presupuestales. Si más adelante hay recursos, instalaciones o tecnología, eso se formaliza en un convenio aparte.",
    "q2": "¿Necesito experiencia aeroespacial para sumarme?",
    "a2": "No. Hace falta voluntad de aportar desde la educación, la investigación, la industria, una cámara, un clúster o una comunidad.",
    "q3": "¿Hasta cuándo puedo adherirme?",
    "a3": "Hasta el 13 de noviembre de 2026, si quieres quedar incluido en la firma del 30 de noviembre.",
    "q4": "¿Quién convoca?",
    "a4": "UPAEP, SECIHTI Puebla, el Clúster de Startups e Innovación, INAOE, la Coordinación Nacional de la Semana Mundial del Espacio, SEDETRA, CTS, el Clúster Automotriz Zona Centro, CANACINTRA Puebla, Sintonía, Yankuilotl y REGENIA.",
    "q5": "¿Qué pasa el 30 de noviembre?",
    "a5": "Se firma el Pacto por el Desarrollo del Sector Aeroespacial en Puebla y se instala el Comité Coordinador. Participan los convocantes y quienes se hayan adherido.",
    "q6": "¿Dónde veo las actividades del año?",
    "a6": "En la agenda de esta página y en el calendario del sitio. Las notas están en la bitácora."
  }
}
```

Inglés, mismas claves. El `h1` sigue siendo `Puebla`. Fechas: `October 10, 2026`, `November 13, 2026`, `November 30, 2026`. Botón: `Join the Pact`. Ceja: `Space Year 2026–2027`. `hero.scroll`: `Scroll to enter`. `hero.conveners`: `Convened by`. `tagline.line1`: `Puebla is joining the aerospace value chain.` `tagline.line2`: `No single institution can do this alone.` Los alt de `frames` están escritos en inglés en `docs/prompts-imagenes.md`. Traduce capítulos, ejes, ruta, adhesión y FAQ en ese mismo tono, sin inventar hechos.

- [ ] **Step 2: Lint y commit**

```bash
pnpm lint
git add src/modules/cores/i18n/messages/es/home.json src/modules/cores/i18n/messages/en/home.json
git commit -m "feat: write space year landing copy in es and en"
```

---

### Task 5: El vuelo

**Files:**
- Create: `src/modules/features/pages/src/sections/home/landing-flight.tsx`

- [ ] **Step 1: Estructura de scroll**

El track es `relative`. El primer hijo es `flight-stage` (`sticky`, `100dvh`). Los centinelas van después, en flujo, y son los que dan altura: el `00` mide `h-[180vh]`, los `01`–`05` miden `h-screen`. Así el cuadro 0 permanece más tiempo (linger de scroll-world, arquitectura A, sin video).

El índice activo sale de un `IntersectionObserver` sobre `[data-flight-sentinel]`, con `rootMargin: "-40% 0px -40% 0px"` y `threshold: [0.25, 0.5, 0.75]`. Gana la entrada con mayor `intersectionRatio`. No registres `scroll` en `window`.

Capas dentro del stage, de atrás hacia adelante:

1. Still activo de `[HERO_PLATE, ...FLIGHT_FRAMES]`, `object-cover`, `absolute inset-0`. Activo: `opacity-100 scale-100`. Inactivo: `opacity-0 scale-105`. Clase `flight-frame`.
2. `IMG-02`, solo si `active === 0`, visible desde `lg`, `absolute right-[-8%] top-[18%] w-[min(52vw,720px)]`. `alt=""`.
3. Copy, `pointer-events-auto`, abajo, dentro de `container-site`.
4. Riel `00`–`05`, `absolute right-7 top-1/2 hidden -translate-y-1/2 lg:flex`. Activo `text-ink`. Resto `text-ink-muted`. `text-micro tracking-[0.14em]`.

Copy del cuadro 0:

- ceja `hero.eyebrow`
- `h1` `hero.title` con `font-display text-place text-ink`
- párrafo `hero.description`, `max-w-xl text-body-lg text-ink-secondary`
- enlace a `ADHESION_HREF`, `inline-flex rounded-full bg-accent px-5 py-3.5 text-[0.9375rem] font-medium text-on-accent`, texto `hero.primaryCta`
- `hero.scroll`, `text-micro uppercase tracking-[0.14em] text-ink-muted`
- `hero.conveners` y los `shortName` de `CONVOCANTES` en la misma etiqueta, color `text-ink`, separados con un espacio de `gap-x-6`

Copy de los cuadros 1–5: `h2` (no otro `h1`) con `chapters.cN.title` en `text-h1`, ceja y cuerpo. Claves `c1`…`c5` en el mismo orden que `FLIGHT_FRAMES`.

`prefers-reduced-motion: reduce`: no uses el track. Renderiza en flujo `HeroPlate` (IMG-01, IMG-02 con su alt real, y el copy del cuadro 0) y después cada capítulo como imagen `relative` más su copy. El observer no se registra.

El `alt` de cada still es `t(frame.altKey)`. En el cuadro 0 del vuelo animado, IMG-02 lleva `alt=""` porque IMG-01 ya describe la escena y el `h1` es el nombre.

- [ ] **Step 2: Lint**

`pnpm lint`. Si `t()` rechaza una clave armada, declara un mapa `const chapterKey = ["c1","c2","c3","c4","c5"] as const` y llama `t(\`chapters.${chapterKey[i]}.title\`)` solo cuando `i` está tipado como índice de ese tuple.

- [ ] **Step 3: Commit**

```bash
git add src/modules/features/pages/src/sections/home/landing-flight.tsx
git commit -m "feat: add the scroll flight for the space year hero"
```

---

### Task 6: Frase, ejes, ruta, adhesión y preguntas

**Files:**
- Create: `src/modules/features/pages/src/sections/home/tagline-reveal.tsx`
- Create: `src/modules/features/pages/src/sections/home/axes.tsx`
- Create: `src/modules/features/pages/src/sections/home/route-dates.tsx`
- Create: `src/modules/features/pages/src/sections/home/adhesion.tsx`
- Create: `src/modules/features/pages/src/sections/home/faq.tsx`

- [ ] **Step 1: Frase**

Cliente. Parte `tagline.line1` y `tagline.line2` por espacios. Cada palabra es un `span`. Un `IntersectionObserver` con `rootMargin: "-10% 0px -40% 0px"` pone `data-on="true"` en la palabra que entra. Color de `text-ink-muted` a `text-ink`, `duration-700`, curva `ease-[cubic-bezier(0.22,1,0.36,1)]`. Contenedor `h2`, `text-balance`, `font-display text-h1`, `max-w-3xl`, sección `py-24 lg:py-32`.

- [ ] **Step 2: Ejes**

Servidor. `grid gap-6 md:grid-cols-2 lg:grid-cols-3`. Artículo: `rounded-lg border border-line bg-surface-subtle p-6`. Índice `text-micro uppercase tracking-[0.14em] text-ink-muted`. Título `font-display text-h4`. Cuerpo `text-body text-ink-secondary`. Claves `axes.items.a1` … `a5`. Sin iconos.

- [ ] **Step 3: Ruta**

Servidor. `grid gap-px bg-line md:grid-cols-3`. Celda `bg-surface p-6`. Fecha en `font-display text-h4`. Cuerpo `text-body text-ink-secondary`. Claves `route.d1`, `d2`, `d3`.

- [ ] **Step 4: Adhesión**

Servidor. `id="adhesion"`. Ceja, `h2` con `adhesion.title`, `adhesion.body`, `adhesion.note` en `text-ink-muted`, y:

```tsx
<a
  href={ADHESION_HREF}
  className="inline-flex rounded-full bg-accent px-5 py-3.5 text-[0.9375rem] font-medium text-on-accent"
>
  {t("adhesion.cta")}
</a>
```

No uses `mailto:`.

- [ ] **Step 5: Preguntas**

Servidor. Seis `details` con `border-b border-line py-4`. `summary` en `font-display text-title`. Respuesta en `text-body text-ink-secondary`. Pares `faq.q1` / `faq.a1` hasta `q6` / `a6`.

- [ ] **Step 6: Lint y commit**

```bash
pnpm lint
git add src/modules/features/pages/src/sections/home/tagline-reveal.tsx src/modules/features/pages/src/sections/home/axes.tsx src/modules/features/pages/src/sections/home/route-dates.tsx src/modules/features/pages/src/sections/home/adhesion.tsx src/modules/features/pages/src/sections/home/faq.tsx
git commit -m "feat: add manifesto sections below the flight"
```

---

### Task 7: Componer la home

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/modules/cores/site/src/services/page-metadata.ts` solo si hace falta para la imagen OG

- [ ] **Step 1: Orden**

Quita `Hero` y `ClosingCta` de la home. Conserva `listPosts(...).slice(0, 3)` y `listUpcomingEvents(...).slice(0, 3)`.

```tsx
<>
  <LandingFlight />
  <TaglineReveal />
  <Axes />
  <RouteDates />
  <UpcomingEvents
    eyebrow={t("events.eyebrow")}
    title={t("events.title")}
    description={t("events.description")}
    ctaLabel={t("events.cta")}
    emptyLabel={calendario("empty")}
    locale={locale}
    events={events}
    labels={{ location: calendario("location"), details: calendario("details") }}
  />
  <LatestPosts
    eyebrow={t("posts.eyebrow")}
    title={t("posts.title")}
    description={t("posts.description")}
    ctaLabel={t("posts.cta")}
    readMoreLabel={blog("readMore")}
    emptyLabel={blog("empty")}
    locale={locale}
    posts={posts}
  />
  <Adhesion />
  <Faq />
</>
```

`UpcomingEvents` y `LatestPosts` ya usan `Button` `variant="secondary"` (contorno, no azul). No les agregues otra prop. El azul queda en los dos enlaces `bg-accent` del vuelo y de `#adhesion`.

- [ ] **Step 2: FAQ schema e imagen social**

En la home, un `<script type="application/ld+json">` con `@type: FAQPage` y las seis preguntas ya traducidas.

En `generateMetadata`, la imagen es `OG_FRAME.src` y el alt es `t("frames.img08")`. Si `buildMetadata` no recibe imágenes, esparce su retorno y agrega `openGraph.images` encima.

- [ ] **Step 3: Lint y commit**

```bash
pnpm lint
git add "src/app/[locale]/page.tsx" src/modules/features/pages/src/sections/home src/modules/cores/site/src/services/page-metadata.ts
git commit -m "feat: compose the space year landing"
```

---

### Task 8: Navegación sobre el vuelo

**Files:**
- Modify: `src/modules/features/site/src/components/organisms/header.tsx`

- [ ] **Step 1: Transparente mientras el vuelo está en pantalla**

Observa `#vuelo`. Si `isIntersecting` y `intersectionRatio > 0.15`, el header usa `border-transparent bg-transparent`. Si no, `border-b border-line bg-surface/90 backdrop-blur-md`.

El link activo pasa de `text-brand` a `text-ink`. El inactivo sigue en `text-ink-secondary`. El azul no se usa en la navegación.

El panel móvil pierde `shadow-md`. Fondo `bg-surface`. Links en `text-h3`.

- [ ] **Step 2: Lint y commit**

```bash
pnpm lint
git add src/modules/features/site/src/components/organisms/header.tsx
git commit -m "feat: keep the header clear over the flight"
```

---

### Task 9: Cierre

**Files:**
- Modify: `DESIGN.md`

- [ ] **Step 1: Anotar el escalón**

En Typography, bajo Display, agrega **Display place**: `clamp(4.5rem, 14vw, 11rem)`, peso 500, line-height 0.9, tracking −0.045em. Una sola vez, para el nombre del lugar en el héroe.

- [ ] **Step 2: Build**

```bash
pnpm lint
pnpm build
```

Expected: build verde, con `/es/` y `/en/` generadas.

- [ ] **Step 3: Navegador**

Con `pnpm dev`, en `/es/`:

1. El primer viewport muestra `Puebla`, la ceja del año, un solo botón azul, doce nombres y las placas `IMG-01` y `IMG-02`.
2. Al bajar, el riel pasa de `00` a `05` y cambia el titular del capítulo. El fondo sigue oscuro.
3. El botón llega a `#adhesion`.
4. Agenda y bitácora muestran los markdown reales, o el estado vacío que esas secciones ya definen.
5. En `/en/`, el botón dice `Join the Pact` y el `h1` sigue siendo `Puebla`.
6. Con `prefers-reduced-motion: reduce`, los capítulos se apilan y no hay escenario pegado.
7. A 390 px, `Puebla` cabe en el ancho y el riel no se muestra.
8. Tab llega al botón con anillo visible. El skip link sigue ahí.

- [ ] **Step 4: Commit**

```bash
git add DESIGN.md
git commit -m "docs: record the place-name display step"
```

---

## Cobertura

| Pedido | Tarea |
|---|---|
| Héroe con Puebla, limbo, objeto y convocantes en blanco | 5 |
| Año Espacial y el acto del 10 de octubre | 4, 5 |
| Cinco ejes, ruta, adhesión | 4, 6, 7 |
| Agenda y blog ya existentes | 7 |
| Vuelo animado sin video de pago | 5 |
| Slots listos para los prompts | 2 |
| Un solo azul y tokens de DESIGN.md | 1, 8 |
| es y en | 4 |
| Menos movimiento | 5 |
