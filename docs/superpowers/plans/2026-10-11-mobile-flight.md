# Mobile flight Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The phone shows the same shot, the same rocket, and the same scroll flight as the desktop landing. The first screen is the room, not a form.

**Architecture:** Keep one sticky stage and the existing sentinel scroll. Below `lg`, strip the hero down to eyebrow, “Puebla”, one button, and a text link; park the rocket in the upper-right void; replace the two-column logo grid with one horizontal lockup on the limb; show the `00`–`05` rail as a row. Desktop classes stay behind `lg:`. There is no component test runner in this repo. Each task is verified in the browser at 390×667 and confirmed unchanged at 1440×900, then `pnpm exec eslint` on the touched files.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, next-intl (`es` / `en`).

---

## What must not change

- Desktop at `lg` (1024px): both pills, the paragraph, the vertical rail, the large rocket, the two-row convener lockup, the crossfade.
- Copy keys. Reuse `Home.cta.secondary` and `Home.hero.description`. No new strings.
- The portrait plate `public/landing/img-01-portrait.webp`. Do not reframe the limb.
- `prefers-reduced-motion`: `StackedFlight` stays a document. It may show the rocket and the new mobile logo row, because those live in shared components.

## File map

- Modify: `src/modules/features/pages/src/sections/home/landing-flight.tsx` — hero furniture, rocket pose, inner scroll, rail.
- Modify: `src/modules/features/pages/src/sections/home/convener-wall.tsx` — mobile lockup.
- Do not modify: `pact-ctas.tsx`, `frames.ts`, message files, `globals.css` unless a class in Task 3 cannot be expressed with utilities already in the file.

## Success picture (390×667, portrait)

One viewport, top to bottom:

1. Transparent header over the plate.
2. Eyebrow, then “Puebla”, then one blue pill, then “Lee el manifiesto” as a link.
3. Rocket nose in the upper right, not covering the title or the pill.
4. Limb still visible.
5. “Convocan” and one horizontal row of marks on that limb. The row scrolls sideways. It does not wrap into a grid.
6. “Desliza para entrar” and the rail `00`–`05`.
7. The stage does not scroll inside itself. The next finger-scroll changes the still and the rocket leaves.

---

### Task 1: Empty the first screen

**Files:**
- Modify: `src/modules/features/pages/src/sections/home/landing-flight.tsx` (`HeroCopy`)

The paragraph and the second pill are what turn the phone into a form. Desktop keeps both.

- [x] **Step 1: Split the hero furniture**

Replace `HeroCopy` with this. `PactCtas` stays as it is. The manifesto link uses the existing `Link` from `@/modules/cores/i18n/src/config/routing` — add that import next to the other imports in this file.

```tsx
function HeroCopy({ t }: { t: HomeTranslator }) {
  const locale = useLocale();

  return (
    <div className="flex h-auto min-h-full flex-col justify-between py-6 lg:h-full lg:py-28">
      <div className="max-w-3xl">
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("hero.eyebrow")}</p>
        <h1 className="mt-4 font-display text-place text-ink lg:mt-8">{t("hero.title")}</h1>
        <p className="mt-6 hidden max-w-xl text-body-lg text-ink-secondary lg:block">{t("hero.description")}</p>
        <div className="mt-5 lg:mt-8">
          <div className="lg:hidden">
            <PactCtas locale={locale} samePage primary={t("cta.primary")} size="default" />
            <Link
              href="/manifiesto"
              className="mt-3 inline-block text-small text-ink-secondary underline underline-offset-4"
            >
              {t("cta.secondary")}
            </Link>
          </div>
          <div className="hidden lg:block">
            <PactCtas
              locale={locale}
              samePage
              primary={t("cta.primary")}
              secondary={t("cta.secondary")}
              size="default"
            />
          </div>
        </div>
      </div>
      <div>
        <ConvenerWall />
        <p className="mt-2 text-center text-micro font-medium uppercase tracking-[0.14em] text-ink-muted lg:mt-6">
          {t("hero.scroll")}
        </p>
      </div>
    </div>
  );
}
```

- [x] **Step 2: Check both widths**

At 390×667 the hero shows one pill and a text link. The four-line paragraph is gone. At 1440×900 the paragraph is back and both controls are pills.

```bash
pnpm exec eslint src/modules/features/pages/src/sections/home/landing-flight.tsx
```

Expected: exit 0.

- [x] **Step 3: Commit**

```bash
git add src/modules/features/pages/src/sections/home/landing-flight.tsx
git commit -m "$(cat <<'EOF'
feat: keep the mobile hero to one action

EOF
)"
```

---

### Task 2: Put the rocket in the phone

**Files:**
- Modify: `src/modules/features/pages/src/sections/home/landing-flight.tsx` (both `Image` nodes that use `HERO_OBJECT`, around the `StackedFlight` image and the flight-stage image)

The object is `hidden lg:block`, so the phone never gets the thing that makes the picture feel like orbit. A 42vw rocket starting at the right edge covers the end of “Puebla” on a 390px screen. Park a smaller one in the right void.

- [x] **Step 1: Share one pose**

On both rocket images, replace the class string that starts with `flight-object` / `flight-launch`. Keep the `active === 0` opacity and CSS variables on the stage image exactly as they are now. Only the box model changes.

Shared pose classes, in this order:

```tsx
"pointer-events-none absolute top-[22%] right-[-22%] z-[2] w-[38vw] max-w-[168px] lg:top-16 lg:right-[-3%] lg:w-[min(42vw,680px)] lg:max-w-none"
```

Stage image keeps `flight-launch flight-object` plus the active ternary. Stacked image keeps `flight-object` and drops `hidden`. Neither image may contain `hidden` or `lg:block`.

- [x] **Step 2: Check the pose**

At 390×667, frame 0: the nose is in the upper right, the word “Puebla” is fully readable, the pill is fully readable. Scroll one viewport: the rocket leaves with the existing translate. At 1440×900 the rocket is still the large bleed on the right.

```bash
pnpm exec eslint src/modules/features/pages/src/sections/home/landing-flight.tsx
```

Expected: exit 0.

- [x] **Step 3: Commit**

```bash
git add src/modules/features/pages/src/sections/home/landing-flight.tsx
git commit -m "$(cat <<'EOF'
feat: show the ceremonial rocket on the phone

EOF
)"
```

---

### Task 3: Let the finger move the film

**Files:**
- Modify: `src/modules/features/pages/src/sections/home/landing-flight.tsx` (the copy wrapper and the rail)

`max-lg:overflow-y-auto` makes the first screen a document. Scroll never reaches the sentinels until the logo catalog is finished, so the flight feels missing.

- [x] **Step 1: Remove the inner scroll and slide the plate under the header**

The header is sticky and about `3.5rem` tall (`py-3` plus an `h-8` logo). A `100dvh` stage that starts below it hides the limb and the rail under the fold. Pull the flight up on small screens and pad the copy so the eyebrow clears the header.

On the `id="vuelo"` element, add `max-lg:-mt-14`.

On the copy wrapper, delete `max-lg:overflow-y-auto`. The class becomes:

```tsx
className="pointer-events-auto absolute inset-0"
```

The inner `container-site` stays `flex h-auto min-h-full items-end lg:h-full`.

In `HeroCopy`, change the outer div padding from `py-6 lg:h-full lg:py-28` to `h-auto min-h-full pt-16 pb-10 lg:h-full lg:py-28`. `pt-16` clears the transparent header. `pb-10` clears the phone rail.

- [x] **Step 2: Add the phone rail**

Keep the existing vertical `<ol>` (`hidden … lg:flex`). Add this sibling after it:

```tsx
<ol className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-3 lg:hidden">
  {RAIL.map((label, index) => (
    <li
      key={label}
      className={`font-display text-micro tracking-[0.14em] ${
        active === index ? "text-ink" : "text-ink-muted"
      }`}
    >
      {label}
    </li>
  ))}
</ol>
```

- [x] **Step 3: Check the flight**

At 375×667 the eyebrow is not under the header. The limb and the rail are inside the viewport, not below it. `document.querySelector(".flight-stage")` has `overflow: hidden` and the copy wrapper does not scroll. Scroll one viewport: the still changes and `01` is the ink-colored index. Scroll back: `00` is ink and the hero returns. At 1440×900 the flight is not pulled up (`margin-top` is `0`), the vertical rail is the only rail, and it sits on the right.

```bash
pnpm exec eslint src/modules/features/pages/src/sections/home/landing-flight.tsx
```

Expected: exit 0.

- [x] **Step 4: Commit**

```bash
git add src/modules/features/pages/src/sections/home/landing-flight.tsx
git commit -m "$(cat <<'EOF'
feat: drive the phone flight with the page scroll

EOF
)"
```

---

### Task 4: One lockup on the limb

**Files:**
- Modify: `src/modules/features/pages/src/sections/home/convener-wall.tsx`

Below `lg` the wall is `grid-cols-2` of `h-16` cells, so every mark is forced into the same box and the first screen becomes a sponsor sheet. Desktop rows stay.

- [x] **Step 1: Render a phone strip**

In `ConvenerWall`, keep the desktop tree inside `hidden lg:block`. Before it, render a phone strip. Build the strip from `CONVOCANTES` in array order, grouped by `ROWS` so sector order matches the desktop (academia, privado, then sociedad, gobierno).

```tsx
<div className="mt-4 lg:hidden">
  <p className="text-micro font-medium uppercase tracking-[0.16em] text-ink">{t("hero.conveners")}</p>
  <div className="mt-3 flex items-end gap-6 overflow-x-auto pb-1">
    {ROWS.flat().map((sector) => (
      <div key={sector} className="flex shrink-0 items-end gap-4">
        <p className="pb-2 text-micro uppercase tracking-[0.08em] text-ink-muted">{t(`sectors.${sector}`)}</p>
        <div className="flex items-center gap-4">
          {CONVOCANTES.filter((item) => item.sector === sector).map((item) => (
            <div key={item.id} className="shrink-0">
              <Slot item={item} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
```

Wrap the existing `mt-4 border-t … lg:mt-6` block so it is `hidden lg:block`, and drop the duplicate top border from the phone strip. The phone strip has no `border-t`; the limb is the divider.

- [x] **Step 2: Stop the square cells on the phone**

`Slot` figure is `h-16 w-full` below `lg`, which stretches the strip. Change the figure class to:

```tsx
className={`relative flex h-8 w-auto shrink-0 items-center justify-center lg:h-16 lg:w-full lg:px-0 lg:pb-0 ${SLOT_CLASS[presence]}`}
```

Remove `px-2 pb-3` from the phone size. `lg:h-10`, `lg:h-8`, `lg:h-7`, and `lg:h-16` in `SLOT_CLASS` still win at the desktop breakpoint because they come later in the class list — put `SLOT_CLASS[presence]` after the base classes, as above.

`Mark` image classes already set `h-full w-full` and only cap height at `lg:`. On the phone the figure is `h-8`, so the image at `h-full w-auto` is 32px tall and keeps its aspect. Change `MARK_CLASS` phone half from `h-full w-full` to `h-full w-auto` for every presence. Leave every `lg:` token as it is.

The `Link` around a slot is `w-full lg:w-auto`. On the strip that makes each link a stretched cell. Change it to `w-auto`.

- [x] **Step 3: Check the lockup**

At 390×667 the marks are one row, about 32px tall, and the row scrolls horizontally. UPAEP stays wide. INAOE stays a small mark. BUAP is the seal, not a square crop. Sector words are in the row, muted. At 1440×900 the two desktop rows are unchanged and the phone strip is not in the layout (`display: none`).

```bash
pnpm exec eslint src/modules/features/pages/src/sections/home/convener-wall.tsx
```

Expected: exit 0.

- [x] **Step 4: Commit**

```bash
git add src/modules/features/pages/src/sections/home/convener-wall.tsx
git commit -m "$(cat <<'EOF'
feat: lay mobile conveners in one scrolling row

EOF
)"
```

---

### Task 5: Prove the first screen on a short phone

**Files:**
- No new source. This task only accepts or rejects Tasks 1–4.

iPhone SE is 375×667 CSS pixels. That is the screen in the screenshot that felt plain. 390×844 is not enough.

- [ ] **Step 1: Portrait, 375×667**

Load `/es/`. Pass only if all of these are true:

- “Puebla” is fully visible and does not wrap onto a second line.
- One blue pill. “Lee el manifiesto” is a link, not a pill.
- The paragraph is absent.
- The rocket is visible and does not cover the title or the pill.
- The atmospheric limb is visible behind the logo row.
- Logos are one horizontal row.
- `00` is ink, `01`–`05` are muted.
- `getComputedStyle(document.querySelector(".flight-stage")).overflow` is `hidden`.

Scroll one viewport:

- The still is no longer the limb plate.
- The rocket is gone.
- `01` is ink.
- The chapter title is an `h2`, not a second `h1`.

- [ ] **Step 2: Desktop, 1440×900**

Load `/es/`. Pass only if the paragraph is visible, both controls are pills, the rocket is the large right bleed, the rail is vertical on the right, and the convener wall is two rows (academia with privado, sociedad with gobierno).

- [ ] **Step 3: English**

Load `/en/` at 375×667. The link reads “Read the manifesto”. The `h1` is still “Puebla”. The rocket and the row behave as in Step 1.

- [ ] **Step 4: Lint the two files together**

```bash
pnpm exec eslint src/modules/features/pages/src/sections/home/landing-flight.tsx src/modules/features/pages/src/sections/home/convener-wall.tsx
```

Expected: exit 0.

If any check fails, fix it in the task that owns the behavior and do not add a new mechanism.

---

## Out of scope

- A second portrait rocket file. The current `img-02` is reused.
- Rewriting chapter copy.
- Changing logo assets or desktop sizes (`quiet`, `compact`, `seal`).
- The pages below the flight (tagline, axes, route, adhesion, FAQ).
