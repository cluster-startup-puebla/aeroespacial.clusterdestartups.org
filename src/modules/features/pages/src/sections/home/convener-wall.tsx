"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import {
  CONVOCANTES,
  hasConvocantePage,
  type Convocante,
  type Sector,
} from "@/modules/features/pages/src/config/convocantes";

const MARK_CLASS = {
  compact: "h-full w-auto object-contain lg:h-8 lg:max-h-8 lg:w-auto",
  quiet: "h-full w-auto object-contain lg:h-7 lg:max-h-7 lg:w-auto",
  seal: "h-full w-auto object-contain lg:h-16 lg:max-h-16 lg:w-auto",
  plate: "h-full w-auto object-contain lg:h-auto lg:max-h-10 lg:w-auto lg:max-w-full",
} as const;

const SLOT_CLASS = {
  compact: "lg:h-8",
  quiet: "lg:h-7",
  seal: "lg:h-16",
  plate: "lg:h-10",
} as const;

/** Two rows: academia beside private, civil society beside government. */
const ROWS: readonly (readonly Sector[])[] = [
  ["academia", "privado"],
  ["sociedad", "gobierno"],
];

function Mark({ item, locale }: { item: Convocante; locale: string }) {
  const english = locale === "en" && item.logoEn;
  const src = english ? item.logoEn : item.logo;
  if (!src) {
    return (
      <span className="flex h-full w-full items-center justify-center font-display text-small tracking-[0.08em] text-ink lg:h-10 lg:w-auto">
        {item.shortName}
      </span>
    );
  }

  const presence = item.presence ?? "plate";

  return (
    <span className="flex h-full w-full items-center justify-center lg:h-auto lg:w-auto lg:max-w-96">
      <Image
        src={src}
        alt={item.showName ? "" : item.shortName}
        width={(english ? item.widthEn : item.width) ?? 160}
        height={(english ? item.heightEn : item.height) ?? 40}
        className={MARK_CLASS[presence]}
      />
    </span>
  );
}

function Slot({ item, locale }: { item: Convocante; locale: string }) {
  const presence = item.presence ?? "plate";
  const plate = (
    <figure
      className={`relative flex h-8 w-auto shrink-0 items-center justify-center lg:h-16 lg:w-full lg:px-0 lg:pb-0 ${SLOT_CLASS[presence]}`}
    >
      <Mark item={item} locale={locale} />
      {item.showName ? (
        <figcaption className="absolute inset-x-0 bottom-0.5 text-center text-micro leading-none tracking-[0.08em] text-ink-secondary lg:inset-x-auto lg:bottom-auto lg:top-full lg:left-1/2 lg:mt-1 lg:-translate-x-1/2 lg:whitespace-nowrap">
          {item.shortName}
        </figcaption>
      ) : null}
    </figure>
  );

  if (!hasConvocantePage(item)) return plate;

  return (
    <Link
      href={`/${item.id}`}
      className="block w-auto rounded-sm outline-none transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:w-auto"
    >
      {plate}
    </Link>
  );
}

function SectorBlock({
  sector,
  locale,
  t,
}: {
  sector: Sector;
  locale: string;
  t: ReturnType<typeof useTranslations<"Home">>;
}) {
  const items = CONVOCANTES.filter((item) => item.sector === sector);
  const slots: ReactNode[] = [];
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const next = items[index + 1];
    if (item.paired && next) {
      slots.push(
        <div key={item.id} className="col-span-2 flex items-center justify-center gap-1.5 lg:w-auto">
          <Slot item={item} locale={locale} />
          <Slot item={next} locale={locale} />
        </div>,
      );
      index += 1;
      continue;
    }
    slots.push(<Slot key={item.id} item={item} locale={locale} />);
  }

  const offset = sector === "privado" || sector === "gobierno";

  return (
    <div className={`w-full lg:w-auto ${offset ? "lg:ml-10" : ""}`}>
      <p className="text-micro uppercase tracking-[0.08em] text-ink-muted">{t(`sectors.${sector}`)}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 lg:mt-3 lg:flex lg:h-16 lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-3">
        {slots}
      </div>
    </div>
  );
}

export function ConvenerWall() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <>
      <div className="mt-4 lg:hidden">
        <p className="text-micro font-medium uppercase tracking-[0.16em] text-ink">{t("hero.conveners")}</p>
        <div className="mt-3 flex items-end gap-6 overflow-x-auto pb-1">
          {ROWS.flat().map((sector) => (
            <div key={sector} className="flex shrink-0 items-end gap-4">
              <p className="pb-2 text-micro uppercase tracking-[0.08em] text-ink-muted">{t(`sectors.${sector}`)}</p>
              <div className="flex items-center gap-4">
                {CONVOCANTES.filter((item) => item.sector === sector).map((item) => (
                  <div key={item.id} className="shrink-0">
                    <Slot item={item} locale={locale} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-line pt-3 lg:mt-6 lg:pt-4 hidden lg:block">
        <p className="text-micro font-medium uppercase tracking-[0.16em] text-ink">
          {t("hero.conveners")}
        </p>
        <div className="mt-3 flex flex-col gap-y-4 lg:mt-4 lg:gap-y-5">
          {ROWS.map((sectors) => (
            <div
              key={sectors.join("-")}
              className="flex flex-col gap-y-4 lg:flex-row lg:items-start lg:gap-x-10"
            >
              {sectors.map((sector) => (
                <SectorBlock key={sector} sector={sector} locale={locale} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
