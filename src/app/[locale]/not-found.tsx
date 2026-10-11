import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="font-display text-h1 text-ink">404</h1>
      <p className="text-body-lg text-ink-secondary">{t("metaTitle")}</p>
    </div>
  );
}
