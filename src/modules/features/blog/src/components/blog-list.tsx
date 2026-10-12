"use client";

import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/modules/cores/i18n/src/config/routing";
import { PostCard } from "@/modules/features/blog/src/components/post-card";
import { CATEGORIES, type PostMeta } from "@/modules/features/blog/src/interfaces/blog.interface";

interface BlogListProps {
  posts: PostMeta[];
  locale: string;
  labels: {
    all: string;
    press: string;
    community: string;
    readMore: string;
    empty: string;
    filter: string;
    year: string;
    month: string;
    allYears: string;
    allMonths: string;
  };
}

interface BlogQuery {
  categoria: string | null;
  anio: string | null;
  mes: string | null;
}

const FILTER_IDLE =
  "inline-flex items-center justify-center rounded-full border border-line bg-transparent px-5 py-2.5 text-small font-semibold text-ink transition hover:bg-surface-subtle";
const FILTER_ACTIVE =
  "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-small font-semibold text-on-accent transition hover:bg-accent-hover";
const SELECT =
  "rounded-full border border-line bg-elevated px-4 py-2.5 text-small text-ink";

function blogHref({ categoria, anio, mes }: BlogQuery) {
  const params = new URLSearchParams();
  if (categoria === CATEGORIES.press || categoria === CATEGORIES.community) {
    params.set("categoria", categoria);
  }
  if (anio && /^\d{4}$/.test(anio)) params.set("anio", anio);
  if (mes && /^(0[1-9]|1[0-2])$/.test(mes)) params.set("mes", mes);
  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

function monthName(locale: string, month: string) {
  return new Date(Date.UTC(2026, Number(month) - 1, 1)).toLocaleDateString(locale, {
    month: "long",
    timeZone: "UTC",
  });
}

export function BlogList({ posts, locale, labels }: BlogListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawCategory = searchParams.get("categoria");
  const categoria =
    rawCategory === CATEGORIES.press || rawCategory === CATEGORIES.community ? rawCategory : null;
  const rawYear = searchParams.get("anio");
  const rawMonth = searchParams.get("mes");

  const inCategory = (post: PostMeta) => !categoria || post.category === categoria;
  const years = [...new Set(posts.filter(inCategory).map((post) => post.date.slice(0, 4)))].sort((a, b) =>
    b.localeCompare(a),
  );
  const anio = rawYear && years.includes(rawYear) ? rawYear : null;
  const monthSource = posts.filter(
    (post) => inCategory(post) && (!anio || post.date.startsWith(`${anio}-`)),
  );
  const months = [...new Set(monthSource.map((post) => post.date.slice(5, 7)))].sort();
  const mes = rawMonth && months.includes(rawMonth) ? rawMonth : null;

  const visible = posts.filter((post) => {
    if (!inCategory(post)) return false;
    if (anio && !post.date.startsWith(`${anio}-`)) return false;
    if (mes && post.date.slice(5, 7) !== mes) return false;
    return true;
  });

  const query = { categoria, anio, mes };
  const filters = [
    { value: null, label: labels.all, active: !categoria },
    { value: CATEGORIES.press, label: labels.press, active: categoria === CATEGORIES.press },
    { value: CATEGORIES.community, label: labels.community, active: categoria === CATEGORIES.community },
  ];

  function push(next: BlogQuery) {
    router.push(blogHref(next), { scroll: false });
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <nav aria-label={labels.filter} className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Link
              key={filter.label}
              href={blogHref({ ...query, categoria: filter.value })}
              className={filter.active ? FILTER_ACTIVE : FILTER_IDLE}
              aria-pressed={filter.active}
            >
              {filter.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-small text-ink-secondary">
            {labels.year}
            <select
              className={SELECT}
              value={anio ?? ""}
              onChange={(event) => {
                const nextYear = event.target.value || null;
                const monthStillExists =
                  !mes ||
                  posts.some(
                    (post) =>
                      inCategory(post) &&
                      (!nextYear || post.date.startsWith(`${nextYear}-`)) &&
                      post.date.slice(5, 7) === mes,
                  );
                push({ categoria, anio: nextYear, mes: monthStillExists ? mes : null });
              }}
            >
              <option value="">{labels.allYears}</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-small text-ink-secondary">
            {labels.month}
            <select
              className={SELECT}
              value={mes ?? ""}
              onChange={(event) => push({ categoria, anio, mes: event.target.value || null })}
            >
              <option value="">{labels.allMonths}</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {monthName(locale, month)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-body text-ink-secondary">{labels.empty}</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
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
    </>
  );
}
