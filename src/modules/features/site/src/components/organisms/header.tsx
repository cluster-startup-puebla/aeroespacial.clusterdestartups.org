"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { LocaleSwitcher } from "@/modules/cores/i18n/src/components/locale-switcher";
import { PactCtas } from "@/modules/features/site/src/components/pact-ctas";
import { NAV_ITEMS } from "@/modules/features/site/src/config/navigation";
import { Logo } from "@/modules/shared/ui/src/components";

export function Header() {
  const t = useTranslations("Nav");
  const brand = useTranslations("Footer");
  const home = useTranslations("Home");
  const locale = useLocale();
  const pathname = usePathname();
  const samePage =
    pathname === "/es" || pathname === "/en" || pathname === "/es/" || pathname === "/en/";
  const [open, setOpen] = useState(false);
  const [overFlight, setOverFlight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const flight = document.getElementById("vuelo");
    if (!flight) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverFlight(entry.isIntersecting && entry.boundingClientRect.bottom > 64);
      },
      { threshold: [0, 0.15, 0.5] },
    );
    observer.observe(flight);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("#vuelo [data-flight-sentinel]");
      if (!hero) {
        setScrolled(window.scrollY > 12);
        return;
      }
      const mid = window.innerHeight / 2;
      const box = hero.getBoundingClientRect();
      const onHero = box.top <= mid && box.bottom > mid;
      setScrolled(!onHero);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/es" || pathname === "/en" || pathname === "/";
    return pathname.includes(href);
  };

  return (
    <>
      <a
        href="#contenido"
        className="fixed -top-32 left-4 z-[60] rounded-full bg-brand px-5 py-3 text-sm font-bold text-on-brand focus:top-4"
      >
        {t("skipToContent")}
      </a>

      <header className="sticky top-0 z-50 px-3 pt-2 pb-2 lg:px-6 lg:pt-3 lg:pb-3">
        <div
          className={`mx-auto flex h-11 items-center justify-between gap-3 rounded-full border px-3 transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none lg:h-14 lg:w-[min(100%,72rem)] lg:gap-6 lg:px-5 ${
            scrolled || !overFlight
              ? "border-line bg-surface/90 shadow-lg backdrop-blur-md"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          <Link href="/" aria-label={t("home")} className="flex min-w-0 items-center">
            <Logo label={brand("name")} compact className="w-auto whitespace-nowrap" />
          </Link>

          <nav className="hidden lg:block" aria-label={t("label")}>
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition ${
                      isActive(item.href) ? "font-semibold text-ink" : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <PactCtas
                locale={locale}
                samePage={samePage}
                primary={home("cta.primary")}
                secondary={home("cta.secondary")}
                size="compact"
              />
            </div>
            <LocaleSwitcher />
            <button
              type="button"
              className="rounded-full border border-line p-2 text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t("close") : t("open")}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            className="absolute inset-x-3 top-full z-50 mt-2 rounded-3xl border border-line bg-surface shadow-lg lg:hidden"
            aria-label={t("label")}
          >
            <div className="px-4 pt-4">
              <PactCtas
                locale={locale}
                samePage={samePage}
                primary={home("cta.primary")}
                secondary={home("cta.secondary")}
                size="compact"
              />
            </div>
            <ul className="flex flex-col p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-sm px-2 py-3 font-display text-h3 transition ${
                      isActive(item.href) ? "font-semibold text-ink" : "text-ink-secondary"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
