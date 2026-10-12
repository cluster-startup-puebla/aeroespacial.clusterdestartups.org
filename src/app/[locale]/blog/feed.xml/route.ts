import { getTranslations } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl, SITE_NAME, SITE_URL } from "@/modules/cores/site/src/config/site";
import { listPosts } from "@/modules/features/blog/src/services/markdown";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale);
  const blogUrl = localeUrl(locale, "/blog");
  const feedUrl = `${SITE_URL}/${locale}/blog/feed.xml`;

  const items = posts
    .map((post) => {
      const link = localeUrl(locale, `/blog/${post.slug}`);
      const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("");
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
      ${categories}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — ${t("title")}`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(t("description"))}</description>
    <language>${locale}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
