import { SITE_URL } from "@/modules/cores/site/src/config/site";

const UTM_SOURCE = "aeroespacial";
const UTM_MEDIUM = "referral";

/** Marks a link opened from a note. Internal routes stay relative. */
export function withNoteUtm(rawUrl: string, content: string, campaign = "blog"): string | null {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("#")) return trimmed;
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return null;
  if (/^(mailto:|tel:)/i.test(trimmed)) return trimmed;

  const relative = trimmed.startsWith("/") && !trimmed.startsWith("//");
  let url: URL;
  try {
    url = new URL(trimmed, SITE_URL);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);

  if (relative) return `${url.pathname}${url.search}${url.hash}`;
  return url.toString();
}
