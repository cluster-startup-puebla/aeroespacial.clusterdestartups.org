import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Badge } from "@/modules/shared/ui/src/components";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl, SITE_NAME, SITE_URL } from "@/modules/cores/site/src/config/site";
import { RelatedNotes } from "@/modules/features/blog/src/components/related-notes";
import { CATEGORIES, getPost, getPostSlugs, listPosts } from "@/modules/features/blog/src/services/markdown";
import { shareImageFor } from "@/modules/features/blog/src/services/share-image";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const url = localeUrl(locale, `/blog/${slug}`);
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, localeUrl(item, `/blog/${slug}`)]),
  );
  const image = shareImageFor(post.image?.src, post.image?.alt ?? post.title);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: post.author,
      tags: post.tags,
      siteName: SITE_NAME,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(image ? { images: [image.url] } : {}),
    },
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localeUrl("es", `/blog/${slug}`) },
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const relatedPosts = listPosts(locale).map(({ contentHtml, ...meta }) => {
    void contentHtml;
    return meta;
  });

  const isPress = post.category === CATEGORIES.press;
  const images = [post.image, ...(post.images ?? [])].filter(
    (item): item is NonNullable<typeof item> => Boolean(item?.src),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isPress ? "NewsArticle" : "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: localeUrl("es"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: localeUrl(locale, `/blog/${slug}`),
    image: images.map((item) => (item.src.startsWith("http") ? item.src : `${SITE_URL}${item.src}`)),
    articleSection: post.category,
    url: localeUrl(locale, `/blog/${slug}`),
    keywords: post.tags.join(", "),
    inLanguage: locale === "en" ? "en" : "es-MX",
  };

  return (
    <div className="container-site py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-3xl">
        <nav>
          <Link href="/blog" className="text-small text-link underline underline-offset-4">
            {t("backToBlog")}
          </Link>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <time dateTime={post.date} className="text-micro text-ink-muted">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <Badge>{isPress ? t("categoryPress") : t("categoryCommunity")}</Badge>
          </div>
          <h1 className="mt-2 font-display text-h1 text-ink">{post.title}</h1>
          <p className="mt-4 text-body-lg text-ink-secondary">{post.excerpt}</p>
          <p className="mt-6 flex flex-col items-start gap-1 text-small text-ink-muted md:flex-row md:items-center md:gap-3">
            <span>{post.author}</span>
            <span aria-hidden="true" className="hidden md:inline">
              ·
            </span>
            <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
          </p>
        </header>

        {post.image && (
          <figure className="mt-10 overflow-hidden rounded-lg border border-line bg-elevated">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
            {post.image.caption && (
              <figcaption className="px-4 py-3 text-small text-ink-muted">{post.image.caption}</figcaption>
            )}
          </figure>
        )}

        <div className="article-body mt-12" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <RelatedNotes posts={relatedPosts} currentSlug={slug} locale={locale} />
    </div>
  );
}
