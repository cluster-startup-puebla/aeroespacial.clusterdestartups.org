import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return buildMetadata({
    locale,
    route: "/aviso-de-privacidad",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const SECTIONS = ["responsible", "data", "purpose", "delivery", "rights"] as const;

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <article className="container-site max-w-3xl py-16 lg:py-24">
      <header>
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("eyebrow")}</p>
        <h1 className="mt-4 font-display text-h1 text-balance text-ink">{t("title")}</h1>
        <p className="mt-6 text-body-lg text-ink-secondary">{t("intro")}</p>
      </header>
      <div className="mt-12 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section} id={section === "data" ? "uso" : undefined} className="scroll-mt-24">
            <h2 className="font-display text-h3 text-ink">{t(`${section}Title`)}</h2>
            <p className="mt-4 text-body text-ink-secondary">{t(section)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
