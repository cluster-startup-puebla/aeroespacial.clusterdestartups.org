export const CATEGORIES = {
  press: "sala-de-prensa",
  community: "comunidad",
} as const;

export interface BlogPostImage {
  src: string;
  alt: string;
  /** Visible caption under the photo. Without it, the image only uses alt. */
  caption?: string;
}

export interface BlogPost {
  slug: string;
  locale: string;
  /** "sala-de-prensa" (institutional) or "comunidad" (workshops, calls). */
  category: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  /** Slugs reserved for a future directory. Stored, not linked yet. */
  companies?: string[];
  /** Ids de convocantes relacionados con la nota. */
  convocantes?: string[];
  image?: BlogPostImage;
  /** Extra photos besides the cover. They can also be inserted in markdown. */
  images?: BlogPostImage[];
  readingMinutes: number;
  contentHtml: string;
}

export type PostMeta = Omit<BlogPost, "contentHtml">;
