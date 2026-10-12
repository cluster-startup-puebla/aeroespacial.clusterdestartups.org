import { MapPin } from "lucide-react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";
import { EventFacts, type EventFactLabels } from "@/modules/features/events/src/components/event-facts";

interface EventCardProps {
  event: ClusterEvent;
  locale: string;
  today: string;
  labels: {
    location: string;
    details: string;
  } & EventFactLabels;
}

export function EventCard({ event, locale, today, labels }: EventCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-line bg-elevated p-6">
      <EventFacts event={event} locale={locale} today={today} labels={labels} />
      <h3 className="font-display text-h4 text-ink">
        <Link href={`/calendario/${event.slug}`} className="hover:text-link">
          {event.title}
        </Link>
      </h3>
      <p className="text-small text-ink-secondary">{event.description}</p>
      {event.location && (
        <p className="flex items-center gap-2 text-small text-ink-muted">
          <MapPin size={14} aria-hidden="true" />
          <span>
            {labels.location}: {event.location}
          </span>
        </p>
      )}
      <Link
        href={`/calendario/${event.slug}`}
        className="mt-auto text-small text-link underline underline-offset-4"
      >
        {labels.details} →
      </Link>
    </article>
  );
}
