"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ConvenerWall } from "@/modules/features/pages/src/sections/home/convener-wall";
import { PactCtas } from "@/modules/features/site/src/components/pact-ctas";
import {
  FLIGHT_FRAMES,
  HERO_OBJECT,
  HERO_PLATE,
  type LandingFrame,
} from "@/modules/features/pages/src/config/frames";
import { FLIGHT_SECTION_IDS } from "@/modules/features/pages/src/config/sections";

const CHAPTER_KEYS = ["c1", "c2", "c3", "c4", "c5"] as const;
const RAIL = ["00", "01", "02", "03", "04", "05"] as const;

type ChapterKey = (typeof CHAPTER_KEYS)[number];
type HomeTranslator = ReturnType<typeof useTranslations<"Home">>;

function HeroCopy({ t }: { t: HomeTranslator }) {
  const locale = useLocale();

  return (
    <div className="flex h-auto min-h-full flex-col justify-between pt-16 pb-10 lg:h-full lg:py-28">
      <div className="max-w-3xl">
        <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("hero.eyebrow")}</p>
        <h1 className="mt-4 font-display text-place text-ink lg:mt-8">{t("hero.title")}</h1>
        <p className="mt-6 hidden max-w-xl text-body-lg text-ink-secondary lg:block">{t("hero.description")}</p>
        <div className="mt-5 lg:mt-8">
          <div className="lg:hidden">
            <PactCtas locale={locale} samePage primary={t("cta.primary")} size="default" />
            <Link
              href="/manifiesto"
              className="mt-3 inline-block text-small text-ink-secondary underline underline-offset-4"
            >
              {t("cta.secondary")}
            </Link>
          </div>
          <div className="hidden lg:block">
            <PactCtas
              locale={locale}
              samePage
              primary={t("cta.primary")}
              secondary={t("cta.secondary")}
              size="default"
            />
          </div>
        </div>
      </div>
      <div>
        <ConvenerWall />
        <p className="mt-2 text-center text-micro font-medium uppercase tracking-[0.14em] text-ink-muted lg:mt-6">
          {t("hero.scroll")}
        </p>
      </div>
    </div>
  );
}

function ChapterCopy({ chapterKey, t }: { chapterKey: ChapterKey; t: HomeTranslator }) {
  return (
    <div className="max-w-xl pb-16 lg:pb-24">
      <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">
        {t(`chapters.${chapterKey}.eyebrow`)}
      </p>
      <h2 className="mt-4 font-display text-h1 text-ink">{t(`chapters.${chapterKey}.title`)}</h2>
      <p className="mt-4 text-body-lg text-ink-secondary">{t(`chapters.${chapterKey}.body`)}</p>
    </div>
  );
}

function FramePlate({
  frame,
  alt,
  className,
  priority = false,
}: {
  frame: LandingFrame;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!frame.portraitSrc) {
    return (
      <Image
        src={frame.src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <picture className={`absolute inset-0 ${className ?? ""}`}>
      <source media="(orientation: portrait)" srcSet={frame.portraitSrc} />
      <img
        src={frame.src}
        alt={alt}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

function Still({ frame, alt, active }: { frame: LandingFrame; alt: string; active: boolean }) {
  const frameClass = `flight-frame object-cover ${active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`;

  return <FramePlate frame={frame} alt={alt} priority={frame.id === "IMG-01"} className={frameClass} />;
}

function StackedFlight({ t }: { t: HomeTranslator }) {
  return (
    <div id="vuelo">
      <section
        id={FLIGHT_SECTION_IDS[0]}
        data-section={FLIGHT_SECTION_IDS[0]}
        className="relative min-h-dvh scroll-mt-20 bg-surface"
      >
        <FramePlate frame={HERO_PLATE} alt={t(HERO_PLATE.altKey)} priority className="object-cover" />
        <Image
          src={HERO_OBJECT.src}
          alt={t(HERO_OBJECT.altKey)}
          width={1500}
          height={1000}
          className="flight-object pointer-events-none absolute top-[22%] right-[-22%] z-[2] w-[38vw] max-w-[168px] lg:top-16 lg:right-[-3%] lg:w-[min(42vw,680px)] lg:max-w-none"
        />
        <div className="container-site relative h-full min-h-dvh">
          <HeroCopy t={t} />
        </div>
      </section>
      {FLIGHT_FRAMES.map((frame, index) => (
        <section
          key={frame.id}
          id={FLIGHT_SECTION_IDS[index + 1]}
          data-section={FLIGHT_SECTION_IDS[index + 1]}
          className="scroll-mt-20 border-t border-line"
        >
          <Image
            src={frame.src}
            alt={t(frame.altKey)}
            width={1600}
            height={900}
            className="aspect-video w-full object-cover"
          />
          <div className="container-site py-12">
            <ChapterCopy chapterKey={CHAPTER_KEYS[index]} t={t} />
          </div>
        </section>
      ))}
    </div>
  );
}

export function LandingFlight() {
  const t = useTranslations("Home");
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useLayoutEffect(() => {
    const raw = window.location.hash.slice(1);
    if (!raw) return;
    let id = raw;
    try {
      id = decodeURIComponent(raw);
    } catch {
      id = raw;
    }
    const index = (FLIGHT_SECTION_IDS as readonly string[]).indexOf(id);
    // Paint the frame that matches the hash before the browser paints. The scroll
    // listener corrects it afterward; this only avoids a flash of the hero.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hash is an external URL input
    if (index > 0) setActive(index);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce) return;
    // A rootMargin band never intersects these tall sentinels, so the observer
    // stayed silent. Follow the sentinel that contains the viewport midpoint.
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let next: number | null = null;
      document.querySelectorAll<HTMLElement>("[data-flight-sentinel]").forEach((node) => {
        const box = node.getBoundingClientRect();
        if (box.top <= mid && box.bottom > mid) next = Number(node.dataset.index);
      });
      if (next === null) return;
      const index = next;
      setActive((current) => (current === index ? current : index));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return <StackedFlight t={t} />;

  const frames: LandingFrame[] = [HERO_PLATE, ...FLIGHT_FRAMES];

  return (
    <div id="vuelo" className="flight-track max-lg:-mt-14">
      <div className="flight-stage bg-surface">
        {frames.map((frame, index) => (
          <Still
            key={frame.id}
            frame={frame}
            alt={index === 0 ? t(HERO_PLATE.altKey) : t(frame.altKey)}
            active={active === index}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/30 via-[34%] to-transparent to-[68%]" />
        <div className="pointer-events-auto absolute inset-0">
          <div className="container-site flex h-auto min-h-full items-end lg:h-full">
            {active === 0 ? <HeroCopy t={t} /> : <ChapterCopy chapterKey={CHAPTER_KEYS[active - 1]} t={t} />}
          </div>
        </div>
        <Image
          src={HERO_OBJECT.src}
          alt=""
          width={1500}
          height={1000}
          className={`flight-launch flight-object pointer-events-none absolute top-[22%] right-[-22%] z-[2] w-[38vw] max-w-[168px] lg:top-16 lg:right-[-3%] lg:w-[min(42vw,680px)] lg:max-w-none ${
            active === 0 ? "opacity-100 [--flight-x:0vw] [--flight-y:0vh]" : "opacity-0 [--flight-x:-34vw] [--flight-y:-42vh]"
          }`}
        />
        <ol className="absolute top-1/2 right-7 z-10 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
          {RAIL.map((label, index) => (
            <li
              key={label}
              className={`font-display text-micro tracking-[0.14em] ${
                active === index ? "text-ink" : "text-ink-muted"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
        <ol className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-3 lg:hidden">
          {RAIL.map((label, index) => (
            <li
              key={label}
              className={`font-display text-micro tracking-[0.14em] ${
                active === index ? "text-ink" : "text-ink-muted"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>
      <div className="pointer-events-none -mt-[100dvh]">
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            id={FLIGHT_SECTION_IDS[index]}
            data-section={FLIGHT_SECTION_IDS[index]}
            data-flight-sentinel
            data-index={index}
            className="h-screen"
          />
        ))}
      </div>
    </div>
  );
}
