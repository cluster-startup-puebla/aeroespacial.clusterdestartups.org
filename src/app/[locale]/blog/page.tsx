import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { listPosts } from "@/modules/features/blog/src/services/markdown";
import { BlogList } from "@/modules/features/blog/src/components/blog-list";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return buildMetadata({
    locale,
    route: "/blog",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale).map(({ contentHtml, ...meta }) => {
    void contentHtml;
    return meta;
  });

  return (
    <div className="container-site py-16 lg:py-24">
      <header className="mb-12">
        <h1 className="font-display text-h1 text-ink">{t("title")}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">{t("description")}</p>
      </header>

      <BlogList
        posts={posts}
        locale={locale}
        readMoreLabel={t("readMore")}
        emptyLabel={t("empty")}
      />
    </div>
  );
}
