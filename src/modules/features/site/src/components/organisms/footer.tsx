import { getTranslations } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { PactCtas } from "@/modules/features/site/src/components/pact-ctas";
import { NAV_ITEMS } from "@/modules/features/site/src/config/navigation";
import { Logo } from "@/modules/shared/ui/src/components";

export async function Footer() {
  const t = await getTranslations("Footer");
  const home = await getTranslations("Home");

  return (
    <footer className="mt-24 border-t border-line bg-surface-subtle py-16">
      <div className="container-site grid gap-12 md:grid-cols-2">
        <div>
          <Link href="/" className="inline-block h-10">
            <Logo label={t("name")} className="h-full w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-small text-ink-secondary">{t("tagline")}</p>
          <div className="mt-6">
            <PactCtas primary={home("cta.primary")} secondary={home("cta.secondary")} />
          </div>
        </div>

        <div>
          <p className="text-micro font-semibold uppercase tracking-wide text-ink-muted">
            {t("links")}
          </p>
          <ul className="mt-3 space-y-2 text-small">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-link underline underline-offset-4">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-line pt-6">
        <p className="text-micro text-ink-muted">
          © {new Date().getFullYear()} {t("name")} · {t("madeIn")}{" "}
          <Link href="/aviso-de-privacidad" className="text-link underline underline-offset-4">
            {t("privacy")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
