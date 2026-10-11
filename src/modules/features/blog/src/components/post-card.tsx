import Image from "next/image";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface PostCardProps {
  post: PostMeta;
  locale: string;
  readMoreLabel: string;
}

export function PostCard({ post, locale, readMoreLabel }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-elevated transition hover:border-ink-muted"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-surface-subtle">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover transition group-hover:opacity-90"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time dateTime={post.date} className="text-micro text-ink-muted">
          {new Date(post.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </time>
        <h3 className="font-display text-h4 text-ink">{post.title}</h3>
        <p className="text-small text-ink-secondary">{post.excerpt}</p>
        <span className="mt-auto text-small text-link">{readMoreLabel}</span>
      </div>
    </Link>
  );
}
