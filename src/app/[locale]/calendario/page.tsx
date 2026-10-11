import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { listUpcomingEvents, todayIso } from "@/modules/features/events/src/services/events";
import { EventCard } from "@/modules/features/events/src/components/event-card";
import { MonthGrid } from "@/modules/features/events/src/components/month-grid";
import { listEvents } from "@/modules/features/events/src/services/events";
import { SectionHeader } from "@/modules/shared/ui/src/components";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Calendario" });

  return buildMetadata({
    locale,
    route: "/calendario",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function CalendarioPage({
  params,
}: PageProps<"/[locale]/calendario">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Calendario" });
  const events = listEvents(locale);
  const upcoming = listUpcomingEvents(locale, todayIso());

  return (
    <div className="container-site py-16 lg:py-24">
      <header className="mb-12">
        <SectionHeader as="h1" title={t("title")} description={t("description")} />
      </header>

      <div className="grid gap-10 lg:grid-cols-2">
        <MonthGrid
          events={events}
          locale={locale}
          labels={{
            prevMonth: t("prevMonth"),
            nextMonth: t("nextMonth"),
            today: t("today"),
            hasEvents: t("hasEvents"),
          }}
        />

        <section>
          <h2 className="font-display text-h3 text-ink">{t("upcomingTitle")}</h2>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-body text-ink-secondary">{t("empty")}</p>
          ) : (
            <div className="mt-6 flex flex-col gap-6">
              {upcoming.map((event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  locale={locale}
                  labels={{ location: t("location"), details: t("details") }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
