import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl } from "@/modules/cores/site/src/config/site";
import { getPost, getPostSlugs, listPosts } from "@/modules/features/blog/src/services/markdown";
import { PostCard } from "@/modules/features/blog/src/components/post-card";

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
    routing.locales.map((l) => [l, localeUrl(l, `/blog/${slug}`)]),
  );

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

  const related = listPosts(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map(({ contentHtml, ...meta }) => {
      void contentHtml;
      return meta;
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    mainEntityOfPage: localeUrl(locale, `/blog/${slug}`),
    inLanguage: locale === "en" ? "en" : "es-MX",
  };

  return (
    <div className="container-site py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <nav>
          <a href={`/${locale}/blog/`} className="text-small text-link underline underline-offset-4">
            {t("backToBlog")}
          </a>
        </nav>

        <header className="mt-8">
          <time dateTime={post.date} className="text-micro text-ink-muted">
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
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
          <div className="mt-10 overflow-hidden rounded-lg border border-line bg-elevated">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        )}

        <div
          className="article-body mt-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-display text-h2 text-ink">{t("relatedTitle")}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard
                key={item.slug}
                post={item}
                locale={locale}
                readMoreLabel={t("readMore")}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
