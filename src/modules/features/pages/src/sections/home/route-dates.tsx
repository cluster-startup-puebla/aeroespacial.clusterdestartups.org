import { useTranslations } from "next-intl";

const DATES = ["d1", "d2", "d3"] as const;

export function RouteDates() {
  const t = useTranslations("Home");

  return (
    <section id="ruta" data-section="ruta" className="scroll-mt-20 py-16 lg:py-24">
      <div className="container-site">
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("route.eyebrow")}</p>
        <h2 className="mt-4 max-w-3xl font-display text-h1 text-ink">{t("route.title")}</h2>
        <ol className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {DATES.map((key) => (
            <li key={key} className="bg-surface p-6">
              <p className="font-display text-h4 text-ink">{t(`route.${key}.date`)}</p>
              <p className="mt-3 text-body text-ink-secondary">{t(`route.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
