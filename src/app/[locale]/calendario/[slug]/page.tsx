import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl, SITE_NAME, SITE_URL } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { EventDetail, EventDetailBack } from "@/modules/features/events/src/components/event-detail";
import { eventBringers } from "@/modules/features/events/src/components/event-facts";
import { eventEnd } from "@/modules/features/events/src/services/event-dates";
import { getPost } from "@/modules/features/blog/src/services/markdown";
import { getEvent, getEventSlugs, todayIso } from "@/modules/features/events/src/services/events";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getEventSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug, locale);
  if (!event) return {};

  const metadata = buildMetadata({
    locale,
    route: `/calendario/${slug}`,
    title: event.title,
    description: event.description,
    type: "article",
    publishedTime: event.date,
    keywords: event.category ? [event.category] : undefined,
  });

  if (!event.image) return metadata;

  const imageUrl = event.image.src.startsWith("http")
    ? event.image.src
    : `${SITE_URL}${event.image.src}`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: imageUrl, width: event.image.width, height: event.image.height, alt: event.image.alt }],
    },
    twitter: {
      ...metadata.twitter,
      images: [imageUrl],
    },
  };
}

export default async function EventPage({
  params,
}: PageProps<"/[locale]/calendario/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const event = getEvent(slug, locale);
  if (!event) notFound();

  const t = await getTranslations({ locale, namespace: "Calendario" });
  const pageUrl = localeUrl(locale, `/calendario/${slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: eventEnd(event),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: event.location
      ? "https://schema.org/OfflineEventAttendanceMode"
      : "https://schema.org/OnlineEventAttendanceMode",
    inLanguage: locale === "en" ? "en" : "es-MX",
    url: pageUrl,
    ...(event.image ? { image: `${SITE_URL}${event.image.src}` } : {}),
    ...(event.url ? { sameAs: event.url } : {}),
    ...(event.location
      ? {
          location: {
            "@type": "Place",
            name: event.location,
            address: event.location,
          },
        }
      : {}),
    organizer: (() => {
      const bringers = eventBringers(event.convocantes);
      if (bringers.length === 0) {
        return { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
      }
      return bringers.map((bringer) => ({ "@type": "Organization", name: bringer.name }));
    })(),
  };

  return (
    <div className="container-site py-12 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EventDetailBack href="/calendario" label={t("backToCalendar")} />
      <EventDetail
        event={event}
        locale={locale}
        today={todayIso()}
        resultHref={event.result && getPost(event.result, locale) ? `/blog/${event.result}` : undefined}
        labels={{
          location: t("location"),
          visitSite: t("visitSite"),
          directions: t("directions"),
          viewResult: t("viewResult"),
          statusPast: t("statusPast"),
          statusUpcoming: t("statusUpcoming"),
          statusLive: t("statusLive"),
        }}
      />
    </div>
  );
}
