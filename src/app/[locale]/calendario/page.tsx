import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { CalendarBoard } from "@/modules/features/events/src/components/calendar-board";
import { listEvents, todayIso } from "@/modules/features/events/src/services/events";

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

  return (
    <div className="container-site py-12 lg:py-16">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-h2 text-ink">{t("title")}</h1>
        <p className="mt-2 text-body text-ink-secondary">{t("description")}</p>
      </header>

      <CalendarBoard
        events={listEvents(locale)}
        locale={locale}
        today={todayIso()}
        labels={{
          prevMonth: t("prevMonth"),
          nextMonth: t("nextMonth"),
          today: t("today"),
          hasEvents: t("hasEvents"),
          hasEvent: t("hasEvent"),
          all: t("all"),
          upcoming: t("upcoming"),
          past: t("past"),
          empty: t("empty"),
          emptyPast: t("emptyPast"),
          emptyDay: t("emptyDay"),
          show: t("show"),
          location: t("location"),
          statusPast: t("statusPast"),
          statusUpcoming: t("statusUpcoming"),
          statusLive: t("statusLive"),
        }}
      />
    </div>
  );
}
