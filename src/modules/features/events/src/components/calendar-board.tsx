"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";
import { EventFacts, type EventFactLabels } from "@/modules/features/events/src/components/event-facts";
import {
  compareNewestFirst,
  eventCovers,
  formatGroupLabel,
  formatMonthTitle,
  isUpcoming,
  parseIsoParts,
  weekdayInitials,
} from "@/modules/features/events/src/services/event-dates";

interface CalendarBoardProps {
  events: ClusterEvent[];
  locale: string;
  today: string;
  labels: {
    prevMonth: string;
    nextMonth: string;
    today: string;
    hasEvents: string;
    hasEvent: string;
    all: string;
    upcoming: string;
    past: string;
    empty: string;
    emptyPast: string;
    emptyDay: string;
    show: string;
    location: string;
  } & EventFactLabels;
}

type Scope = "all" | "upcoming" | "past";

interface DayCell {
  iso: string;
  day: number;
  inMonth: boolean;
  events: ClusterEvent[];
}

function shiftMonth(year: number, month: number, delta: number) {
  const next = new Date(Date.UTC(year, month + delta, 1));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() };
}

function buildMonth(year: number, month: number, events: ClusterEvent[]): DayCell[] {
  const first = new Date(Date.UTC(year, month, 1));
  const start = new Date(first);
  start.setUTCDate(1 - first.getUTCDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const iso = date.toISOString().slice(0, 10);
    return {
      iso,
      day: date.getUTCDate(),
      inMonth: date.getUTCMonth() === month,
      events: events.filter((event) => eventCovers(event, iso)),
    };
  });
}

function groupByStart(events: ClusterEvent[]) {
  const groups = new Map<string, ClusterEvent[]>();
  for (const event of events) {
    const current = groups.get(event.date) ?? [];
    current.push(event);
    groups.set(event.date, current);
  }
  return [...groups.entries()];
}

export function CalendarBoard({ events, locale, today, labels }: CalendarBoardProps) {
  const initial = parseIsoParts(today);
  const [visible, setVisible] = useState({ year: initial.year, month: initial.month });
  const [scope, setScope] = useState<Scope>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const scoped = useMemo(
    () =>
      events.filter((event) => {
        if (scope === "upcoming") return isUpcoming(event, today);
        if (scope === "past") return !isUpcoming(event, today);
        return true;
      }),
    [events, scope, today],
  );

  const visibleEvents = useMemo(() => {
    const pool = selected ? scoped.filter((event) => eventCovers(event, selected)) : scoped;
    return [...pool].sort(compareNewestFirst);
  }, [scoped, selected]);

  const groups = useMemo(() => groupByStart(visibleEvents), [visibleEvents]);
  const cells = useMemo(
    () => buildMonth(visible.year, visible.month, scoped),
    [visible, scoped],
  );
  const initials = useMemo(() => weekdayInitials(locale), [locale]);
  const monthTitle = formatMonthTitle(visible.year, visible.month, locale);
  const filledIso = selected ?? today;

  function chooseScope(next: Scope) {
    setScope(next);
    setSelected(null);
  }

  function chooseDay(iso: string) {
    const parts = parseIsoParts(iso);
    setVisible({ year: parts.year, month: parts.month });
    setSelected((current) => (current === iso ? null : iso));
  }

  const emptyLabel = selected ? labels.emptyDay : scope === "past" ? labels.emptyPast : labels.empty;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:gap-14">
      <div className="min-w-0">
        <div id="event-feed" aria-live="polite">
          {groups.length === 0 ? (
            <p className="text-body text-ink-secondary">{emptyLabel}</p>
          ) : (
            <ol className="relative">
              <span
                className="absolute top-2 bottom-2 left-[3px] w-px bg-line"
                aria-hidden="true"
              />
              {groups.map(([iso, dayEvents]) => (
                <li key={iso} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    className="absolute top-1.5 left-0 h-2 w-2 rounded-full bg-ink"
                    aria-hidden="true"
                  />
                  <p className="text-small text-ink-muted">
                    <time dateTime={iso}>{formatGroupLabel(iso, locale)}</time>
                  </p>
                  <ul className="mt-3 flex flex-col gap-3">
                    {dayEvents.map((event) => (
                      <li key={event.slug}>
                        <EventRow event={event} locale={locale} today={today} labels={labels} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-body font-medium text-ink">{monthTitle}</h2>
          <div className="flex">
            <button
              type="button"
              aria-label={labels.prevMonth}
              onClick={() => setVisible((current) => shiftMonth(current.year, current.month, -1))}
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-subtle hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.nextMonth}
              onClick={() => setVisible((current) => shiftMonth(current.year, current.month, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-subtle hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 text-center">
          {initials.map((label, index) => (
            <span key={`${label}-${index}`} className="py-1 text-micro text-ink-muted">
              {label}
            </span>
          ))}
          {cells.map((cell) => {
            const filled = cell.iso === filledIso;
            const count = cell.events.length;
            const eventWord = count === 1 ? labels.hasEvent : labels.hasEvents;
            const name = count
              ? `${formatGroupLabel(cell.iso, locale)}, ${count} ${eventWord}`
              : formatGroupLabel(cell.iso, locale);

            return (
              <button
                key={cell.iso}
                type="button"
                aria-label={cell.iso === today ? `${labels.today}. ${name}` : name}
                aria-pressed={selected === cell.iso}
                aria-current={cell.iso === today ? "date" : undefined}
                onClick={() => chooseDay(cell.iso)}
                className="flex h-11 flex-col items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-small tabular-nums ${
                    filled
                      ? "bg-ink font-medium text-on-brand"
                      : cell.inMonth
                        ? "text-ink"
                        : "text-ink-muted"
                  }`}
                >
                  {cell.day}
                </span>
                <span
                  className={`h-1 w-1 rounded-full ${count > 0 ? "bg-ink" : "bg-transparent"}`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-surface-subtle p-1" role="group" aria-label={labels.show}>
          <ScopeButton id="scope-all" pressed={scope === "all"} onClick={() => chooseScope("all")}>
            {labels.all}
          </ScopeButton>
          <ScopeButton
            id="scope-upcoming"
            pressed={scope === "upcoming"}
            onClick={() => chooseScope("upcoming")}
          >
            {labels.upcoming}
          </ScopeButton>
          <ScopeButton id="scope-past" pressed={scope === "past"} onClick={() => chooseScope("past")}>
            {labels.past}
          </ScopeButton>
        </div>
      </aside>
    </div>
  );
}

function ScopeButton({
  id,
  pressed,
  onClick,
  children,
}: {
  id: string;
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-small font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        pressed ? "bg-ink text-on-brand" : "text-ink-secondary hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function EventRow({
  event,
  locale,
  today,
  labels,
}: {
  event: ClusterEvent;
  locale: string;
  today: string;
  labels: EventFactLabels & { location: string };
}) {
  return (
    <article className="relative flex items-start gap-4 rounded-lg border border-line bg-surface-subtle px-4 py-4 transition hover:bg-elevated">
      <div className="min-w-0 flex-1">
        <EventFacts event={event} locale={locale} today={today} labels={labels} />
        <h2 className="mt-2 font-display text-body font-medium tracking-tight text-ink">
          <Link
            href={`/calendario/${event.slug}`}
            className="outline-none after:absolute after:inset-0 focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {event.title}
          </Link>
        </h2>
        <p className="mt-1 line-clamp-2 text-small text-ink-secondary">{event.description}</p>
        {event.location && (
          <p className="mt-3 flex items-center gap-2 text-small text-ink-muted">
            <MapPin size={14} aria-hidden="true" />
            <span>
              {labels.location}: {event.location}
            </span>
          </p>
        )}
      </div>
      {event.image && (
        <Image
          src={event.image.src}
          alt=""
          width={event.image.width}
          height={event.image.height}
          className="h-28 w-20 shrink-0 bg-surface object-contain"
        />
      )}
    </article>
  );
}
