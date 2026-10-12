import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { listPosts } from "@/modules/features/blog/src/services/markdown";
import { listUpcomingEvents, todayIso } from "@/modules/features/events/src/services/events";
import { OG_FRAME } from "@/modules/features/pages/src/config/frames";
import { Adhesion } from "@/modules/features/pages/src/sections/home/adhesion";
import { Axes } from "@/modules/features/pages/src/sections/home/axes";
import { Faq } from "@/modules/features/pages/src/sections/home/faq";
import { LandingFlight } from "@/modules/features/pages/src/sections/home/landing-flight";
import { LatestPosts } from "@/modules/features/pages/src/sections/home/latest-posts";
import { RouteDates } from "@/modules/features/pages/src/sections/home/route-dates";
import { SectionUrl } from "@/modules/features/pages/src/sections/home/section-url";
import { TaglineReveal } from "@/modules/features/pages/src/sections/home/tagline-reveal";
import { UpcomingEvents } from "@/modules/features/pages/src/sections/home/upcoming-events";

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
  const meta = buildMetadata({
    locale,
    route: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [{ url: OG_FRAME.src, alt: t("frames.img08") }],
    },
  };
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
      <LandingFlight />
      <SectionUrl />
      <TaglineReveal />
      <Axes />
      <RouteDates />
      <UpcomingEvents
        eyebrow={t("events.eyebrow")}
        title={t("events.title")}
        description={t("events.description")}
        ctaLabel={t("events.cta")}
        emptyLabel={calendario("empty")}
        locale={locale}
        today={todayIso()}
        events={events}
        labels={{
          location: calendario("location"),
          details: calendario("details"),
          statusPast: calendario("statusPast"),
          statusUpcoming: calendario("statusUpcoming"),
          statusLive: calendario("statusLive"),
        }}
      />
      <LatestPosts
        eyebrow={t("posts.eyebrow")}
        title={t("posts.title")}
        description={t("posts.description")}
        ctaLabel={t("posts.cta")}
        readMoreLabel={blog("readMore")}
        emptyLabel={blog("empty")}
        categoryLabels={{
          press: blog("categoryPress"),
          community: blog("categoryCommunity"),
        }}
        locale={locale}
        posts={posts}
      />
      <Adhesion />
      <Faq />
    </>
  );
}
