"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";

interface MonthGridProps {
  events: ClusterEvent[];
  locale: string;
  labels: {
    prevMonth: string;
    nextMonth: string;
    today: string;
    hasEvents: string;
  };
}

interface DayCell {
  day: number;
  events: ClusterEvent[];
}

const WEEKDAY_KEY_DATE = "2024-01-01";

function toUtc(iso: string) {
  return new Date(`${iso}T00:00:00Z`);
}

function addMonths(year: number, month: number, delta: number) {
  const next = new Date(Date.UTC(year, month + delta, 1));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() };
}

function buildGrid(year: number, month: number, events: ClusterEvent[]): (DayCell | null)[] {
  const firstDay = new Date(Date.UTC(year, month, 1));
  const offset = (firstDay.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (DayCell | null)[] = Array.from({ length: offset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = events.filter((event) => {
      const end = event.endDate ?? event.date;
      return event.date <= iso && end >= iso;
    });
    cells.push({ day, events: dayEvents });
  }

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function MonthGrid({ events, locale, labels }: MonthGridProps) {
  const now = new Date();
  const [visible, setVisible] = useState(() => ({
    year: now.getFullYear(),
    month: now.getMonth(),
  }));

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    return Array.from({ length: 7 }, (_, index) => {
      const date = toUtc(WEEKDAY_KEY_DATE);
      date.setUTCDate(date.getUTCDate() + index);
      return formatter.format(date);
    });
  }, [locale]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(Date.UTC(visible.year, visible.month, 1))),
    [locale, visible],
  );

  const cells = useMemo(
    () => buildGrid(visible.year, visible.month, events),
    [visible, events],
  );

  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="rounded-lg border border-line bg-elevated p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label={labels.prevMonth}
          onClick={() => setVisible((current) => addMonths(current.year, current.month, -1))}
          className="rounded-md border border-line p-2 text-ink transition hover:bg-surface-subtle"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <h3 className="font-display text-h3 capitalize text-ink">{monthLabel}</h3>
        <button
          type="button"
          aria-label={labels.nextMonth}
          onClick={() => setVisible((current) => addMonths(current.year, current.month, 1))}
          className="rounded-md border border-line p-2 text-ink transition hover:bg-surface-subtle"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdayLabels.map((label) => (
          <span key={label} className="py-1 text-micro font-semibold uppercase text-ink-muted">
            {label}
          </span>
        ))}

        {cells.map((cell, index) => {
          if (!cell) return <span key={`empty-${index}`} />;

          const iso = `${visible.year}-${String(visible.month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
          const isToday = iso === todayIso;
          const titles = cell.events.map((event) => event.title).join(", ");

          return (
            <div
              key={iso}
              title={titles || undefined}
              aria-label={titles ? `${cell.day}: ${titles}` : undefined}
              className={`flex min-h-10 flex-col items-center justify-center gap-1 rounded-md border p-1 text-small sm:min-h-12 ${
                cell.events.length > 0
                  ? "border-line bg-surface-subtle font-semibold text-ink"
                  : "border-transparent text-ink-secondary"
              } ${isToday ? "outline outline-2 outline-ink" : ""}`}
            >
              <span>{cell.day}</span>
              {cell.events.length > 0 && (
                <span className="flex gap-1" aria-hidden="true">
                  {cell.events.slice(0, 3).map((event) => (
                    <span key={event.slug} className="h-1.5 w-1.5 rounded-full bg-brand" />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
