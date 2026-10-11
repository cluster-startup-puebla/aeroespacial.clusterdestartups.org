import { getRequestConfig } from "next-intl/server";
import fs from "node:fs";
import path from "node:path";
import { routing } from "../config/routing";
import type { Locale } from "../interfaces/i18n.interface";

const MESSAGES_DIR = path.join(process.cwd(), "src", "modules", "cores", "i18n", "messages");

function loadLocaleMessages(locale: string): Record<string, unknown> {
  const dir = path.join(MESSAGES_DIR, locale);
  if (!fs.existsSync(dir)) return {};
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .reduce(
      (acc, file) => ({
        ...acc,
        ...JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")),
      }),
      {},
    );
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: loadLocaleMessages(locale),
  };
});
