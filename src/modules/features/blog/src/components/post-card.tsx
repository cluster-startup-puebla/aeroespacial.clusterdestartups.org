import Image from "next/image";
import { Badge } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { CATEGORIES, type PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface PostCardProps {
  post: PostMeta;
  locale: string;
  readMoreLabel: string;
  categoryLabels?: {
    press: string;
    community: string;
  };
  readingLabel?: string;
}

export function PostCard({ post, locale, readMoreLabel, categoryLabels, readingLabel }: PostCardProps) {
  const categoryLabel = categoryLabels
    ? post.category === CATEGORIES.press
      ? categoryLabels.press
      : categoryLabels.community
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-elevated transition hover:border-ink-muted"
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface-subtle">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover transition group-hover:opacity-90"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <time dateTime={post.date} className="text-micro text-ink-muted">
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          {categoryLabel && <Badge>{categoryLabel}</Badge>}
        </div>
        <h3 className="font-display text-h4 text-ink">{post.title}</h3>
        <p className="text-small text-ink-secondary">{post.excerpt}</p>
        {readingLabel && <span className="text-small text-ink-muted">{readingLabel}</span>}
        <span className="mt-auto text-small text-link">{readMoreLabel}</span>
      </div>
    </Link>
  );
}
