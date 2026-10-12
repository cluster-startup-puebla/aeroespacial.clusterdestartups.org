export function eventEnd(event: { date: string; endDate?: string }) {
  return event.endDate && event.endDate > event.date ? event.endDate : event.date;
}

export function eventCovers(event: { date: string; endDate?: string }, iso: string) {
  return event.date <= iso && eventEnd(event) >= iso;
}

export function isUpcoming(event: { date: string; endDate?: string }, today: string) {
  return eventEnd(event) >= today;
}

export type EventTiming = "past" | "upcoming" | "live";

export function eventTiming(event: { date: string; endDate?: string }, today: string): EventTiming {
  if (eventEnd(event) < today) return "past";
  if (event.date > today) return "upcoming";
  return "live";
}

export function compareNewestFirst(
  a: { date: string; endDate?: string; startTime?: string },
  b: { date: string; endDate?: string; startTime?: string },
) {
  const byEnd = eventEnd(b).localeCompare(eventEnd(a));
  if (byEnd !== 0) return byEnd;
  const byStart = b.date.localeCompare(a.date);
  if (byStart !== 0) return byStart;
  return (b.startTime ?? "").localeCompare(a.startTime ?? "");
}

export function parseIsoParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month: month - 1, day };
}

function utcDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

export function formatShortDate(iso: string, locale: string) {
  const date = utcDate(iso);
  const month = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    .format(date)
    .replace(/\./g, "")
    .toLowerCase();
  return `${date.getUTCDate()} ${month}`;
}

export function formatGroupLabel(iso: string, locale: string) {
  const date = utcDate(iso);
  const month = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    .format(date)
    .replace(/\./g, "")
    .toLowerCase();
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" })
    .format(date)
    .toLowerCase();
  return `${date.getUTCDate()} ${month} ${weekday}`;
}

export function formatLongDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(utcDate(iso));
}

export function monthChip(iso: string, locale: string) {
  const date = utcDate(iso);
  const month = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    .format(date)
    .replace(/\./g, "");
  return { month, day: String(date.getUTCDate()) };
}

export function formatMonthTitle(year: number, month: number, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));
}

/** Sunday-first single letters. Spanish uses X for miércoles so it does not collide with martes. */
export function weekdayInitials(locale: string) {
  if (locale.startsWith("es")) return ["D", "L", "M", "X", "J", "V", "S"];
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(Date.UTC(2023, 0, 1 + index))).slice(0, 1).toUpperCase(),
  );
}
