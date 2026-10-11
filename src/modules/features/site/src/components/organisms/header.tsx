"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { LocaleSwitcher } from "@/modules/cores/i18n/src/components/locale-switcher";
import { NAV_ITEMS } from "@/modules/features/site/src/config/navigation";
import { Logo } from "@/modules/shared/ui/src/components";

export function Header() {
  const t = useTranslations("Nav");
  const brand = useTranslations("Footer");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

      <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
        <div className="container-site flex items-center justify-between gap-4 py-3">
          <Link href="/" aria-label={t("home")} className="h-8 sm:h-9">
            <Logo label={brand("name")} className="h-full w-auto" />
          </Link>

          <nav className="hidden lg:block" aria-label={t("label")}>
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition ${
                      isActive(item.href)
                        ? "font-semibold text-brand"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <button
              type="button"
              className="rounded-md border border-line p-2 text-ink lg:hidden"
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
            className="mx-3 mb-3 rounded-md border border-line bg-surface shadow-md lg:hidden"
            aria-label={t("label")}
          >
            <ul className="flex flex-col p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-sm px-2 py-3 text-body transition ${
                      isActive(item.href) ? "font-semibold text-brand" : "text-ink-secondary"
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
