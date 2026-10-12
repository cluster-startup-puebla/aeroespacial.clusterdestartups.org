import { Button, SectionHeader } from "@/modules/shared/ui/src/components";
import { PostCard } from "@/modules/features/blog/src/components/post-card";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface LatestPostsProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  readMoreLabel: string;
  emptyLabel: string;
  categoryLabels: {
    press: string;
    community: string;
  };
  locale: string;
  posts: PostMeta[];
}

export function LatestPosts({
  eyebrow,
  title,
  description,
  ctaLabel,
  readMoreLabel,
  emptyLabel,
  categoryLabels,
  locale,
  posts,
}: LatestPostsProps) {
  return (
    <section id="bitacora" data-section="bitacora" className="container-site scroll-mt-20 py-16 lg:py-24">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      {posts.length === 0 ? (
        <p className="mt-8 text-body text-ink-secondary">{emptyLabel}</p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              readMoreLabel={readMoreLabel}
              categoryLabels={categoryLabels}
            />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Button href="/blog" variant="secondary">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
