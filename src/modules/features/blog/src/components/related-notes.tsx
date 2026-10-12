"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PostCard } from "@/modules/features/blog/src/components/post-card";
import type { PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

const STORAGE_KEY = "aeroespacial-blog-recs";

interface StoredRecs {
  slug: string;
  shown: string[];
}

interface RelatedNotesProps {
  posts: PostMeta[];
  currentSlug: string;
  locale: string;
}

function readStored(): StoredRecs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredRecs>;
    if (typeof parsed.slug !== "string" || !Array.isArray(parsed.shown)) return null;
    return {
      slug: parsed.slug,
      shown: parsed.shown.filter((slug): slug is string => typeof slug === "string"),
    };
  } catch {
    return null;
  }
}

function writeStored(value: StoredRecs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or a full quota should not block the article.
  }
}

/** Newest post stays; the other two rotate past whatever the previous note already showed. */
export function pickRelated(posts: PostMeta[], currentSlug: string, prev: StoredRecs | null): PostMeta[] {
  const pool = posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (pool.length <= 3) return pool;

  if (prev?.slug === currentSlug && prev.shown.length > 0) {
    const bySlug = new Map(pool.map((post) => [post.slug, post]));
    const kept = prev.shown
      .map((slug) => bySlug.get(slug))
      .filter((post): post is PostMeta => Boolean(post));
    if (kept.length >= 3) return kept.slice(0, 3);
  }

  const newest = pool[0];
  const omitted = new Set(prev && prev.slug !== currentSlug ? prev.shown : []);
  if (omitted.size === 0) return pool.slice(0, 3);

  const rotating = pool.filter((post) => post.slug !== newest.slug && !omitted.has(post.slug));
  let others = rotating.slice(0, 2);
  if (others.length < 2) {
    const fallback = pool.filter(
      (post) => post.slug !== newest.slug && !others.some((item) => item.slug === post.slug),
    );
    others = [...others, ...fallback].slice(0, 2);
  }

  return [newest, ...others];
}

export function RelatedNotes({ posts, currentSlug, locale }: RelatedNotesProps) {
  const t = useTranslations("Blog");
  const [picked, setPicked] = useState<PostMeta[] | null>(null);

  useEffect(() => {
    const prev = readStored();
    const next = pickRelated(posts, currentSlug, prev);
    writeStored({ slug: currentSlug, shown: next.map((post) => post.slug) });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPicked(next);
  }, [posts, currentSlug]);

  if (!picked || picked.length === 0) return null;

  const labels = {
    press: t("categoryPress"),
    community: t("categoryCommunity"),
  };

  return (
    <section className="mt-16 border-t border-line pt-12" aria-labelledby="related-notes-heading">
      <h2 id="related-notes-heading" className="font-display text-h3 text-ink">
        {t("relatedTitle")}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {picked.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            readMoreLabel={t("readMore")}
            categoryLabels={labels}
            readingLabel={t("readingTime", { minutes: post.readingMinutes })}
          />
        ))}
      </div>
    </section>
  );
}
