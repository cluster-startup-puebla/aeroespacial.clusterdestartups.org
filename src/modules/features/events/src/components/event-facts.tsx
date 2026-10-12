import Image from "next/image";
import { Badge } from "@/modules/shared/ui/src/components";
import { composeConvocanteIds, CONVOCANTES } from "@/modules/features/pages/src/config/convocantes";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";
import {
  eventTiming,
  formatShortDate,
  type EventTiming,
} from "@/modules/features/events/src/services/event-dates";

export interface EventFactLabels {
  statusPast: string;
  statusUpcoming: string;
  statusLive: string;
}

const STATUS_CLASS: Record<EventTiming, string> = {
  past: "text-ink-muted",
  upcoming: "",
  live: "border-accent text-accent",
};

export function eventHours(event: ClusterEvent) {
  if (event.startTime && event.endTime) return `${event.startTime}–${event.endTime}`;
  return event.startTime;
}

export function eventDateLine(event: ClusterEvent, locale: string) {
  if (event.endDate && event.endDate !== event.date) {
    return `${formatShortDate(event.date, locale)} – ${formatShortDate(event.endDate, locale)}`;
  }
  return formatShortDate(event.date, locale);
}

interface OrganizerMark {
  id: string;
  name: string;
  logo?: string;
  width: number;
  height: number;
}

function organizerMark(id: string, locale: string): OrganizerMark {
  const found = CONVOCANTES.find((item) => item.id === id);
  const english = locale === "en" && Boolean(found?.logoEn);
  return {
    id,
    name: found?.shortName ?? id,
    logo: english ? found?.logoEn : found?.logo,
    width: (english ? found?.widthEn : found?.width) ?? 160,
    height: (english ? found?.heightEn : found?.height) ?? 40,
  };
}

export function eventBringers(ids: string[] | undefined, locale = "es") {
  if (!ids?.length) return [];
  return composeConvocanteIds(ids).flatMap((group) => group.map((id) => organizerMark(id, locale)));
}

function organizerGroups(ids: string[] | undefined, locale: string) {
  if (!ids?.length) return [];
  return composeConvocanteIds(ids).map((group) => ({
    id: group.join("+"),
    marks: group.map((id) => organizerMark(id, locale)),
  }));
}

function OrganizerMarkView({ mark, size }: { mark: OrganizerMark; size: "detail" | "list" }) {
  if (!mark.logo) {
    return <span className="font-display text-small text-ink">{mark.name}</span>;
  }
  const list = size === "list";
  return (
    <Image
      src={mark.logo}
      alt={mark.name}
      width={mark.width}
      height={mark.height}
      style={{
        height: list ? "2rem" : "3.5rem",
        width: "auto",
        maxWidth: list ? "8rem" : "46%",
      }}
      className="shrink-0 object-contain object-left"
    />
  );
}

export function OrganizerLockup({
  ids,
  locale,
  size,
}: {
  ids: string[] | undefined;
  locale: string;
  size: "detail" | "list";
}) {
  const groups = organizerGroups(ids, locale);
  if (groups.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
      {groups.map((group) => (
        <li key={group.id} className={size === "list" ? "flex items-end gap-3" : "organizer-row"}>
          {group.marks.map((mark) => (
            <OrganizerMarkView key={mark.id} mark={mark} size={size} />
          ))}
        </li>
      ))}
    </ul>
  );
}

export function EventOrganizers({ event, locale }: { event: ClusterEvent; locale: string }) {
  return <OrganizerLockup ids={event.convocantes} locale={locale} size="detail" />;
}

export function EventFacts({
  event,
  locale,
  today,
  labels,
  organizers = "compact",
}: {
  event: ClusterEvent;
  locale: string;
  today: string;
  labels: EventFactLabels;
  organizers?: "compact" | "hidden";
}) {
  const timing = eventTiming(event, today);
  const status =
    timing === "past" ? labels.statusPast : timing === "live" ? labels.statusLive : labels.statusUpcoming;
  const hours = eventHours(event);

  return (
    <div className="flex flex-col gap-2">
      <Badge tone={timing === "upcoming" ? "inverse" : "default"} className={STATUS_CLASS[timing]}>
        {status}
      </Badge>
      {organizers === "compact" ? (
        <OrganizerLockup ids={event.convocantes} locale={locale} size="list" />
      ) : null}
      <p className="text-micro tabular-nums text-ink-muted">
        <time dateTime={event.date}>{eventDateLine(event, locale)}</time>
        {hours ? <span> · {hours}</span> : null}
      </p>
      {event.category ? <p className="text-micro capitalize text-ink-muted">{event.category}</p> : null}
    </div>
  );
}
