export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeroespacial.clusterdestartups.org";

export const SITE_NAME = "Clúster Aeroespacial";

/** Absolute localized URL with the trailing slash `trailingSlash: true` expects. */
export function localeUrl(locale: string, route = "/") {
  const bare = route === "/" || route === "" ? "" : route.replace(/\/$/, "");
  const path = bare.startsWith("/") || bare === "" ? bare : `/${bare}`;
  return `${SITE_URL}/${locale}${path}/`;
}
