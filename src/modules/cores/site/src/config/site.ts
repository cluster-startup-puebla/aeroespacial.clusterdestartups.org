export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aeroespacial.clusterdestartups.org";

export const SITE_NAME = "Puebla en las estrellas";

/**
 * Default share card. JPEG, not WebP: WhatsApp drops og:image when the file is WebP.
 * 1200×630, under 600KB.
 */
export const SHARE_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: SITE_NAME,
} as const;

/** Stays on the adhesion section until a real inbox exists. Do not invent an address. */
export const ADHESION_HREF = "#adhesion";

/** Absolute localized URL with the trailing slash `trailingSlash: true` expects. */
export function localeUrl(locale: string, route = "/") {
  const bare = route === "/" || route === "" ? "" : route.replace(/\/$/, "");
  const path = bare.startsWith("/") || bare === "" ? bare : `/${bare}`;
  return `${SITE_URL}/${locale}${path}/`;
}
