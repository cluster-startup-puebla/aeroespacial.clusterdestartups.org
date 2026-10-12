import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer, type Tokens } from "marked";
import { CATEGORIES, type BlogPost, type BlogPostImage } from "../interfaces/blog.interface";
import { withNoteUtm } from "./utm";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

marked.use({ gfm: true, async: false });

function escapeAttr(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeImageSrc(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

function renderFigure(src: string, alt: string, caption?: string | null): string {
  const safe = safeImageSrc(src);
  if (!safe) return escapeAttr(alt);
  const cap = caption
    ? `<figcaption class="px-4 py-3 text-small text-ink-muted">${escapeAttr(caption)}</figcaption>`
    : "";
  return `<figure class="my-8 overflow-hidden rounded-lg border border-line bg-elevated"><img src="${escapeAttr(safe)}" alt="${escapeAttr(alt)}" class="h-auto w-full" />${cap}</figure>`;
}

function unwrapFigures(html: string) {
  return html.replace(/<p>\s*(<figure[\s\S]*?<\/figure>)\s*<\/p>/g, "$1");
}

class NoteLinkRenderer extends Renderer {
  constructor(private readonly slug: string) {
    super();
  }

  link({ href, title, tokens, text, autolink }: Tokens.Link): string {
    const inner = autolink ? escapeAttr(text) : this.parser.parseInline(tokens);
    const next = withNoteUtm(href, this.slug);
    if (!next) return inner;
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    return `<a href="${escapeAttr(next)}"${titleAttr} target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }

  image({ href, title, text, tokens }: Tokens.Image): string {
    const alt = tokens?.length
      ? String(this.parser.parseInline(tokens, this.parser.textRenderer))
      : text;
    return renderFigure(href, alt, title);
  }
}

interface Frontmatter {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  category?: string;
  tags: string[];
  companies?: string[];
  image?: BlogPostImage;
  images?: BlogPostImage[];
}

export { CATEGORIES };

function parseFile(fileName: string): BlogPost {
  const [slug, locale] = fileName.replace(/\.md$/, "").split(".");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Frontmatter;
  const words = content.split(/\s+/).filter(Boolean).length;
  const bodyHtml = unwrapFigures(
    marked.parse(content, { renderer: new NoteLinkRenderer(slug) }) as string,
  );
  const extras = (meta.images ?? [])
    .filter((img) => img.src && img.src !== meta.image?.src && !bodyHtml.includes(img.src))
    .map((img) => renderFigure(img.src, img.alt, img.caption))
    .join("");

  return {
    slug,
    locale,
    category: meta.category ?? CATEGORIES.community,
    title: meta.title,
    description: meta.description,
    excerpt: meta.excerpt,
    date: meta.date,
    author: meta.author,
    tags: meta.tags ?? [],
    companies: Array.isArray(meta.companies)
      ? meta.companies.filter((item): item is string => typeof item === "string")
      : [],
    image: meta.image,
    images: meta.images,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    contentHtml: `${bodyHtml}${extras}`,
  };
}

export function listPosts(locale: string, category?: string): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(`.${locale}.md`))
    .map(parseFile)
    .filter((post) => !category || post.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, locale: string): BlogPost | undefined {
  const file = `${slug}.${locale}.md`;
  if (!fs.existsSync(path.join(CONTENT_DIR, file))) return undefined;
  return parseFile(file);
}

export function getPostSlugs(locale: string): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(`.${locale}.md`))
    .map((file) => file.replace(`.${locale}.md`, ""));
}
