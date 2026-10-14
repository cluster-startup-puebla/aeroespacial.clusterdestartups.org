import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { Faq } from "@/modules/features/pages/src/sections/home/faq";
import { JoinForm } from "@/modules/features/site/src/components/join-form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Join" });

  return buildMetadata({
    locale,
    route: "/formulario",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FormularioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (["1", "2", "3", "4", "5", "6"] as const).map((id) => ({
      "@type": "Question",
      name: t(`faq.q${id}`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.a${id}`),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <JoinForm />
      <Faq />
    </>
  );
}
