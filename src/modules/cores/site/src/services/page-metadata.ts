import type { Metadata } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl, SITE_NAME } from "@/modules/cores/site/src/config/site";

interface BuildMetadataProps {
  locale: string;
  route: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}

export function buildMetadata({
  locale,
  route,
  title,
  description,
  type = "website",
  publishedTime,
  keywords,
}: BuildMetadataProps): Metadata {
  const url = localeUrl(locale, route);
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, localeUrl(item, route)]),
  );
  const ogLocale = locale === "en" ? "en_US" : "es_MX";

  return {
    title: route === "/" ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localeUrl("es", route) },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
