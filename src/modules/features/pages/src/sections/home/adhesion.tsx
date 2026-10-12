import { useLocale, useTranslations } from "next-intl";
import { PactCtas } from "@/modules/features/site/src/components/pact-ctas";

export function Adhesion() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section id="adhesion" data-section="adhesion" className="scroll-mt-20 py-24 lg:py-32">
      <div className="container-site max-w-3xl">
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("adhesion.eyebrow")}</p>
        <h2 className="mt-4 font-display text-h1 text-ink">{t("adhesion.title")}</h2>
        <p className="mt-6 text-body-lg text-ink-secondary">{t("adhesion.body")}</p>
        <p className="mt-4 text-body text-ink-muted">{t("adhesion.note")}</p>
        <div className="mt-8">
          <PactCtas
            locale={locale}
            samePage
            primary={t("cta.primary")}
            secondary={t("cta.secondary")}
          />
        </div>
      </div>
    </section>
  );
}
