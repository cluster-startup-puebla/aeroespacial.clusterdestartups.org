import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { localeUrl } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { listPostsForConvocante } from "@/modules/features/blog/src/services/markdown";
import { listEventsForConvocante, todayIso } from "@/modules/features/events/src/services/events";
import { ConvocanteDetail } from "@/modules/features/pages/src/components/convocante-detail";
import {
  convocanteById,
  detailConvocantes,
  hasConvocantePage,
  SOCIAL_NETWORKS,
  type SocialNetwork,
} from "@/modules/features/pages/src/config/convocantes";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    detailConvocantes().map((item) => ({ locale, slug: item.id })),
  );
}

function profileCopy(
  t: Awaited<ReturnType<typeof getTranslations>>,
  id: string,
) {
  return {
    name: t(`profiles.${id}.name`),
    description: t(`profiles.${id}.description`),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = convocanteById(slug);
  if (!hasConvocantePage(item)) return {};

  const t = await getTranslations({ locale, namespace: "Convocante" });
  const copy = profileCopy(t, item.id);

  return buildMetadata({
    locale,
    route: `/${item.id}`,
    title: copy.name,
    description: copy.description,
  });
}

export default async function ConvocantePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = convocanteById(slug);
  if (!hasConvocantePage(item)) notFound();

  const t = await getTranslations({ locale, namespace: "Convocante" });
  const home = await getTranslations({ locale, namespace: "Home" });
  const calendar = await getTranslations({ locale, namespace: "Calendario" });
  const blog = await getTranslations({ locale, namespace: "Blog" });
  const copy = profileCopy(t, item.id);
  const pageUrl = localeUrl(locale, `/${item.id}`);
  const sameAs = (item.links ?? [])
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
  const website = item.links?.find((link) => link.network === "web")?.href;

  const networks = Object.fromEntries(
    SOCIAL_NETWORKS.map((network) => [network, t(`networks.${network}`)]),
  ) as Record<SocialNetwork, string>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: copy.name,
    description: copy.description,
    url: website ?? pageUrl,
    mainEntityOfPage: pageUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const posts = listPostsForConvocante(locale, item.id).map(({ contentHtml, ...meta }) => {
    void contentHtml;
    return meta;
  });

  return (
    <div className="container-site py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ConvocanteDetail
        item={item}
        name={copy.name}
        description={copy.description}
        sectorLabel={home(`sectors.${item.sector}`)}
        locale={locale}
        today={todayIso()}
        events={listEventsForConvocante(locale, item.id)}
        posts={posts}
        labels={{
          back: t("back"),
          allyType: t("allyType"),
          events: t("events"),
          posts: t("posts"),
          emptyEvents: t("emptyEvents"),
          emptyPosts: t("emptyPosts"),
          networks,
          location: calendar("location"),
          details: calendar("details"),
          statusPast: calendar("statusPast"),
          statusUpcoming: calendar("statusUpcoming"),
          statusLive: calendar("statusLive"),
          readMore: blog("readMore"),
          press: blog("categoryPress"),
          community: blog("categoryCommunity"),
        }}
      />
    </div>
  );
}
