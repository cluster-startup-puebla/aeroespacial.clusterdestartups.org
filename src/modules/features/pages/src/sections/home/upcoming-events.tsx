import { Button, SectionHeader } from "@/modules/shared/ui/src/components";
import { EventCard } from "@/modules/features/events/src/components/event-card";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";

interface UpcomingEventsProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  emptyLabel: string;
  locale: string;
  events: ClusterEvent[];
  labels: {
    location: string;
    details: string;
  };
}

export function UpcomingEvents({
  eyebrow,
  title,
  description,
  ctaLabel,
  emptyLabel,
  locale,
  events,
  labels,
}: UpcomingEventsProps) {
  return (
    <section className="border-y border-line bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        {events.length === 0 ? (
          <p className="mt-8 text-body text-ink-secondary">{emptyLabel}</p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} locale={locale} labels={labels} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Button href="/calendario" variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
