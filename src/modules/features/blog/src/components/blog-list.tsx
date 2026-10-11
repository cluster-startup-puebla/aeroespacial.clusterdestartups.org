import { PostCard } from "@/modules/features/blog/src/components/post-card";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface BlogListProps {
  posts: PostMeta[];
  locale: string;
  readMoreLabel: string;
  emptyLabel: string;
}

export function BlogList({ posts, locale, readMoreLabel, emptyLabel }: BlogListProps) {
  if (posts.length === 0) {
    return <p className="text-body text-ink-secondary">{emptyLabel}</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} locale={locale} readMoreLabel={readMoreLabel} />
      ))}
    </div>
  );
}
