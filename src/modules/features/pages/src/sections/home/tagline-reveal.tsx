"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

function Line({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = root.querySelectorAll<HTMLElement>("[data-word]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-on", "true");
          }
        }
      },
      { rootMargin: "-10% 0px -40% 0px", threshold: 0.6 },
    );
    words.forEach((word) => observer.observe(word));
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={ref} className="block">
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-word
          className="mr-[0.28em] inline-block text-ink-muted transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[on=true]:text-ink"
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export function TaglineReveal() {
  const t = useTranslations("Home");

  return (
    <section id="lema" data-section="lema" className="scroll-mt-20 py-24 lg:py-32">
      <h2 className="container-site max-w-3xl font-display text-h1 text-balance">
        <Line text={t("tagline.line1")} />
        <Line text={t("tagline.line2")} />
      </h2>
    </section>
  );
}
