import type { MetadataRoute } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { getPost, listPosts } from "@/modules/features/blog/src/services/markdown";
import { getEvent, listEvents } from "@/modules/features/events/src/services/events";
import { localeUrl } from "@/modules/cores/site/src/config/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "/", priority: 1, frequency: "weekly" as const },
  { path: "/manifiesto", priority: 0.9, frequency: "monthly" as const },
  { path: "/blog", priority: 0.9, frequency: "weekly" as const },
  { path: "/calendario", priority: 0.9, frequency: "weekly" as const },
];

function languageAlternates(route: string, locales: readonly string[] = routing.locales) {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = localeUrl(locale, route);
  if (languages.es) languages["x-default"] = languages.es;
  else if (languages.en) languages["x-default"] = languages.en;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      entries.push({
        url: localeUrl(locale, route.path),
        lastModified,
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates: languageAlternates(route.path),
      });
    }

    for (const post of listPosts(locale)) {
      const route = `/blog/${post.slug}`;
      const localesWithPost = routing.locales.filter((item) => getPost(post.slug, item));
      entries.push({
        url: localeUrl(locale, route),
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(route, localesWithPost),
      });
    }

    for (const event of listEvents(locale)) {
      const route = `/calendario/${event.slug}`;
      const localesWithEvent = routing.locales.filter((item) => getEvent(event.slug, item));
      entries.push({
        url: localeUrl(locale, route),
        lastModified: event.date,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: languageAlternates(route, localesWithEvent),
      });
    }
  }

  return entries;
}
