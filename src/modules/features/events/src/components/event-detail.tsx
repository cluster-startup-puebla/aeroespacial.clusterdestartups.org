import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";
import { EventFacts, EventOrganizers, type EventFactLabels } from "@/modules/features/events/src/components/event-facts";
import { eventEnd, formatLongDate, monthChip } from "@/modules/features/events/src/services/event-dates";

interface EventDetailProps {
  event: ClusterEvent;
  locale: string;
  today: string;
  resultHref?: string;
  labels: {
    location: string;
    visitSite: string;
    directions: string;
    viewResult: string;
  } & EventFactLabels;
}

function externalUrl(value?: string) {
  if (!value) return undefined;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.toString();
  } catch {
    return undefined;
  }
  return undefined;
}

const primaryLink =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function EventDetail({ event, locale, today, labels, resultHref }: EventDetailProps) {
  const chip = monthChip(event.date, locale);
  const startLabel = formatLongDate(event.date, locale);
  const endLabel = event.endDate && event.endDate !== event.date ? formatLongDate(eventEnd(event), locale) : null;
  const site = externalUrl(event.url);
  const maps = event.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
    : undefined;
  const hours =
    event.startTime && event.endTime
      ? `${event.startTime}–${event.endTime}`
      : event.startTime;

  const hasPoster = Boolean(event.image);

  return (
    <article className={hasPoster ? "grid items-start gap-10 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-14" : ""}>
      {hasPoster && (
        <div className="flex flex-col gap-8">
          {event.image && (
            <Image
              src={event.image.src}
              alt={event.image.alt}
              width={event.image.width}
              height={event.image.height}
              priority
              className="h-auto w-full"
            />
          )}
          <EventOrganizers event={event} locale={locale} />
        </div>
      )}

      <div>
      <header>
        {!hasPoster && (
          <div className="mb-8">
            <EventOrganizers event={event} locale={locale} />
          </div>
        )}
        <EventFacts event={event} locale={locale} today={today} labels={labels} organizers="hidden" />
        <h1 className="mt-4 max-w-2xl font-display text-h1 tracking-tight text-ink">{event.title}</h1>
      </header>

      <div className={`grid items-start gap-10 ${event.image ? "mt-8" : "mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-16"}`}>
        <div className={event.image ? "order-2 max-w-[65ch]" : "max-w-[65ch] lg:order-1"}>
          <p className="text-body text-ink-secondary">{event.description}</p>
          {event.contentHtml && (
            <div
              className="article-body mt-6"
              dangerouslySetInnerHTML={{ __html: event.contentHtml }}
            />
          )}
        </div>

        <aside className={event.image ? "order-1" : "lg:sticky lg:top-24 lg:order-2"}>
        <div className="flex items-start gap-4 border-t border-line pt-5">
          <div className="w-12 shrink-0 overflow-hidden rounded-md border border-line text-center">
            <p className="bg-surface-subtle py-1 text-micro font-medium uppercase tracking-widest text-ink-muted">
              {chip.month}
            </p>
            <p className="py-1 font-display text-body font-medium tabular-nums text-ink">{chip.day}</p>
          </div>
          <div>
            <p className="text-body text-ink">{startLabel}</p>
            {hours && <p className="mt-1 text-small tabular-nums text-ink-secondary">{hours}</p>}
            {endLabel && <p className="mt-1 text-small text-ink-secondary">{endLabel}</p>}
          </div>
        </div>

        {event.location && (
          <p className="mt-5 flex items-start gap-3 text-body text-ink">
            <MapPin size={18} className="mt-1 shrink-0 text-ink-secondary" aria-hidden="true" />
            <span>
              <span className="block text-micro text-ink-muted">{labels.location}</span>
              {event.location}
            </span>
          </p>
        )}

        <div className="mt-8 flex flex-col items-start gap-3">
          {site && (
            <a href={site} target="_blank" rel="noopener noreferrer" className={primaryLink}>
              {labels.visitSite}
            </a>
          )}
          {!site && maps && (
            <a href={maps} target="_blank" rel="noopener noreferrer" className={primaryLink}>
              {labels.directions}
            </a>
          )}
          {resultHref && (
            <Link
              href={resultHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-link underline underline-offset-4"
            >
              {labels.viewResult}
            </Link>
          )}
        </div>
        </aside>
      </div>
      </div>
    </article>
  );
}

export function EventDetailBack({ href, label }: { href: string; label: string }) {
  return (
    <nav className="mb-8">
      <Link href={href} className="text-small text-link underline underline-offset-4">
        {label}
      </Link>
    </nav>
  );
}
