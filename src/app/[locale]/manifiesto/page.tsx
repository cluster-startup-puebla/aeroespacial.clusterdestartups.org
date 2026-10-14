import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { getManifesto } from "@/modules/features/pages/src/services/manifesto";
import { PactCtas } from "@/modules/features/site/src/components/pact-ctas";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Manifiesto" });
  const doc = getManifesto(locale);

  return buildMetadata({
    locale,
    route: "/manifiesto",
    title: t("metaTitle"),
    description: doc.description,
  });
}

export default async function ManifiestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Manifiesto" });
  const home = await getTranslations({ locale, namespace: "Home" });
  const doc = getManifesto(locale);

  return (
    <article className="container-site py-16 lg:py-24">
      <header className="max-w-3xl">
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("eyebrow")}</p>
        <h1 className="mt-4 font-display text-h1 text-balance text-ink">{doc.title}</h1>
        {locale === "en" ? (
          <p className="mt-4 text-small text-ink-muted">{t("translationNote")}</p>
        ) : null}
      </header>
      <div
        className="article-body mt-12 max-w-3xl"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <div className="mt-12">
        <PactCtas primary={home("cta.primary")} />
      </div>
    </article>
  );
}
