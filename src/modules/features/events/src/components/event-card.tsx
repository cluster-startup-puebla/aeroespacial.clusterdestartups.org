import { CalendarDays, MapPin } from "lucide-react";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";

interface EventCardProps {
  event: ClusterEvent;
  locale: string;
  labels: {
    location: string;
    details: string;
  };
}

function formatDateRange(event: ClusterEvent, locale: string) {
  const format = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  if (!event.endDate || event.endDate === event.date) return format(event.date);
  return `${format(event.date)} – ${format(event.endDate)}`;
}

export function EventCard({ event, locale, labels }: EventCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-line bg-elevated p-6">
      <p className="flex items-center gap-2 text-micro text-ink-muted">
        <CalendarDays size={14} aria-hidden="true" />
        <time dateTime={event.date}>{formatDateRange(event, locale)}</time>
      </p>
      <h3 className="font-display text-h4 text-ink">{event.title}</h3>
      <p className="text-small text-ink-secondary">{event.description}</p>
      {event.location && (
        <p className="flex items-center gap-2 text-small text-ink-muted">
          <MapPin size={14} aria-hidden="true" />
          <span>
            {labels.location}: {event.location}
          </span>
        </p>
      )}
      {event.url && (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-small text-link underline underline-offset-4"
        >
          {labels.details} →
        </a>
      )}
    </article>
  );
}
