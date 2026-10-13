import { Factory, Globe, GraduationCap, Rocket, Telescope } from "lucide-react";
import { useTranslations } from "next-intl";

const AXES = ["a1", "a2", "a3", "a4", "a5"] as const;

type AxisKey = (typeof AXES)[number];

function AxisMark({ axis }: { axis: AxisKey }) {
  if (axis === "a1") {
    return (
      <div className="relative flex h-24 w-full items-center justify-center">
        <span aria-hidden className="absolute size-8 rounded-full border border-line" />
        <span aria-hidden className="absolute size-14 rounded-full border border-line" />
        <span aria-hidden className="absolute size-20 rounded-full border border-line" />
        <span
          aria-hidden
          className="absolute size-8 rounded-full border border-line motion-safe:animate-axis-ring"
        />
        <Telescope className="relative size-7 text-ink" strokeWidth={1.25} aria-hidden />
      </div>
    );
  }

  if (axis === "a2") {
    return (
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2">
        <Factory className="size-6 text-ink" strokeWidth={1.25} aria-hidden />
        <div className="flex w-full max-w-32 flex-col gap-1.5" aria-hidden>
          {["w-2/5", "w-3/5", "w-4/5"].map((width) => (
            <div key={width} className="h-1.5 overflow-hidden rounded-full border border-line">
              <div className={`h-full rounded-full bg-ink ${width}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (axis === "a3") {
    return (
      <div className="flex h-24 w-full flex-col items-center justify-center gap-2">
        <Rocket
          className="size-6 text-ink motion-safe:animate-axis-rise"
          strokeWidth={1.25}
          aria-hidden
        />
        <span aria-hidden className="h-4 w-px bg-line" />
      </div>
    );
  }

  if (axis === "a4") {
    return (
      <div className="flex h-24 w-full items-center justify-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-md border border-line bg-surface">
          <GraduationCap className="size-5 text-ink" strokeWidth={1.25} aria-hidden />
        </span>
        <span aria-hidden className="h-px w-6 bg-line" />
        <span aria-hidden className="size-1.5 rounded-full bg-ink" />
        <span aria-hidden className="h-px w-6 bg-line" />
        <span className="flex size-10 items-center justify-center rounded-md border border-line bg-surface">
          <Factory className="size-5 text-ink" strokeWidth={1.25} aria-hidden />
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex h-24 w-full items-center justify-center">
      <span aria-hidden className="absolute size-14 rounded-full border border-line" />
      {[0, 1, 2].map((pulse) => (
        <span
          key={pulse}
          aria-hidden
          className="absolute size-14 rounded-full border border-line motion-safe:animate-axis-ring"
          style={{ animationDelay: `${pulse * 1.05}s` }}
        />
      ))}
      <Globe className="relative size-6 text-ink" strokeWidth={1.25} aria-hidden />
    </div>
  );
}

export function Axes() {
  const t = useTranslations("Home");

  return (
    <section id="ejes" data-section="ejes" className="scroll-mt-20 py-16 lg:py-24">
      <div className="container-site">
        <h2 className="max-w-3xl font-display text-h1 text-ink">{t("axes.title")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {AXES.map((key) => (
            <article
              key={key}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface-subtle p-5"
            >
              <AxisMark axis={key} />
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {t(`axes.items.${key}.index`)}
                </p>
                <h3 className="mt-2 font-display text-h4 text-ink">
                  {t(`axes.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-body text-ink-secondary">{t(`axes.items.${key}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
