import { useTranslations } from "next-intl";

const PAIRS = ["1", "2", "3", "4", "5", "6"] as const;

export function Faq() {
  const t = useTranslations("Home");

  return (
    <section id="preguntas" data-section="preguntas" className="scroll-mt-20 pb-24 lg:pb-32">
      <div className="container-site max-w-3xl">
        <h2 className="font-display text-h1 text-ink">{t("faq.title")}</h2>
        <div className="mt-8 border-t border-line">
          {PAIRS.map((id) => (
            <details key={id} className="border-b border-line py-4">
              <summary className="cursor-pointer font-display text-h4 text-ink">{t(`faq.q${id}`)}</summary>
              <p className="mt-3 text-body text-ink-secondary">{t(`faq.a${id}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
