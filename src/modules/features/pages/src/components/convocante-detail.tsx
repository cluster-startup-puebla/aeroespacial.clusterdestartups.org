import Image from "next/image";
import { AtSign, Briefcase, Camera, Clapperboard, Globe, Music, Users, type LucideIcon } from "lucide-react";
import { Badge } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { PostCard } from "@/modules/features/blog/src/components/post-card";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";
import { EventCard } from "@/modules/features/events/src/components/event-card";
import type { ClusterEvent } from "@/modules/features/events/src/interfaces/event.interface";
import {
  type Convocante,
  type ConvocanteLink,
  type SocialNetwork,
} from "@/modules/features/pages/src/config/convocantes";

const NETWORK_ICONS: Record<SocialNetwork, LucideIcon> = {
  web: Globe,
  facebook: Users,
  instagram: Camera,
  x: AtSign,
  linkedin: Briefcase,
  youtube: Clapperboard,
  tiktok: Music,
};

export interface ConvocanteDetailLabels {
  back: string;
  allyType: string;
  events: string;
  posts: string;
  emptyEvents: string;
  emptyPosts: string;
  networks: Record<SocialNetwork, string>;
  location: string;
  details: string;
  statusPast: string;
  statusUpcoming: string;
  statusLive: string;
  readMore: string;
  press: string;
  community: string;
}

function safeHref(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

function markIsTall(item: Convocante) {
  if (item.presence === "seal" || item.showName) return true;
  const width = item.width ?? 1;
  const height = item.height ?? 1;
  return height / width > 0.75;
}

function SocialLinks({
  links,
  labels,
}: {
  links: ConvocanteLink[] | undefined;
  labels: Record<SocialNetwork, string>;
}) {
  const items = (links ?? []).flatMap((link) => {
    const href = safeHref(link.href);
    return href ? [{ ...link, href }] : [];
  });
  if (items.length === 0) return null;

  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((link) => {
        const Icon = NETWORK_ICONS[link.network];
        return (
          <li key={link.network}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-2 text-small text-ink transition hover:border-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon size={16} aria-hidden="true" />
              {labels[link.network]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ConvocanteDetail({
  item,
  name,
  description,
  sectorLabel,
  locale,
  today,
  events,
  posts,
  labels,
}: {
  item: Convocante;
  name: string;
  description: string;
  sectorLabel: string;
  locale: string;
  today: string;
  events: ClusterEvent[];
  posts: PostMeta[];
  labels: ConvocanteDetailLabels;
}) {
  const english = locale === "en" && item.logoEn;
  const src = english ? item.logoEn : item.logo;
  const tall = markIsTall(item);

  return (
    <article>
      <nav className="mb-8">
        <Link href="/" className="text-small text-link underline underline-offset-4">
          {labels.back}
        </Link>
      </nav>

      <header className="grid items-center gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14">
        {src ? (
          <div className={tall ? "flex h-36 w-36 items-center lg:h-44 lg:w-44" : "flex h-16 w-full max-w-sm items-center lg:h-20"}>
            <Image
              src={src}
              alt={item.shortName}
              width={(english ? item.widthEn : item.width) ?? 160}
              height={(english ? item.heightEn : item.height) ?? 40}
              priority
              className="max-h-full w-auto max-w-full object-contain object-left"
            />
          </div>
        ) : (
          <p className="font-display text-h2 text-ink">{item.shortName}</p>
        )}

        <div>
          <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{labels.allyType}</p>
          <div className="mt-3">
            <Badge>{sectorLabel}</Badge>
          </div>
          <h1 className="mt-4 font-display text-h1 text-balance text-ink">{name}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink-secondary">{description}</p>
          <SocialLinks links={item.links} labels={labels.networks} />
        </div>
      </header>

      <section className="mt-16 lg:mt-24">
        <h2 className="font-display text-h2 text-ink">{labels.events}</h2>
        {events.length === 0 ? (
          <p className="mt-6 text-body text-ink-secondary">{labels.emptyEvents}</p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                locale={locale}
                today={today}
                labels={{
                  location: labels.location,
                  details: labels.details,
                  statusPast: labels.statusPast,
                  statusUpcoming: labels.statusUpcoming,
                  statusLive: labels.statusLive,
                }}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 lg:mt-24">
        <h2 className="font-display text-h2 text-ink">{labels.posts}</h2>
        {posts.length === 0 ? (
          <p className="mt-6 text-body text-ink-secondary">{labels.emptyPosts}</p>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                readMoreLabel={labels.readMore}
                categoryLabels={{ press: labels.press, community: labels.community }}
              />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
