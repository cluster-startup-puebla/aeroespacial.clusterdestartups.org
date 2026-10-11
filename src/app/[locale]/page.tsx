import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { listPosts } from "@/modules/features/blog/src/services/markdown";
import { listUpcomingEvents, todayIso } from "@/modules/features/events/src/services/events";
import { Hero } from "@/modules/features/pages/src/sections/home/hero";
import { LatestPosts } from "@/modules/features/pages/src/sections/home/latest-posts";
import { UpcomingEvents } from "@/modules/features/pages/src/sections/home/upcoming-events";
import { ClosingCta } from "@/modules/features/pages/src/sections/home/closing-cta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return buildMetadata({
    locale,
    route: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });
  const blog = await getTranslations({ locale, namespace: "Blog" });
  const calendario = await getTranslations({ locale, namespace: "Calendario" });

  const posts = listPosts(locale).slice(0, 3).map(({ contentHtml, ...meta }) => {
    void contentHtml;
    return meta;
  });
  const events = listUpcomingEvents(locale, todayIso()).slice(0, 3);

  return (
    <>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primary={{ href: "/calendario", label: t("hero.primaryCta") }}
        secondary={{ href: "/blog", label: t("hero.secondaryCta") }}
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
      <UpcomingEvents
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        description={t("events.description")}
        ctaLabel={t("events.cta")}
        emptyLabel={calendario("empty")}
        locale={locale}
        events={events}
        labels={{
          location: calendario("location"),
          details: calendario("details"),
        }}
      />
      <ClosingCta
        title={t("closing.title")}
        description={t("closing.description")}
        cta={t("closing.cta")}
        href="/calendario"
      />
    </>
  );
}
