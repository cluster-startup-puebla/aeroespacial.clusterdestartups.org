import type { routing } from "../config/routing";

export type Locale = (typeof routing.locales)[number];

export interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export interface LocalePageProps {
  params: Promise<{ locale: Locale }>;
}
