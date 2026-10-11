import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer, type Tokens } from "marked";
import type { BlogPost, BlogPostImage } from "../interfaces/blog.interface";

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
  return `<figure class="my-8 overflow-hidden rounded-lg border border-line"><img src="${escapeAttr(safe)}" alt="${escapeAttr(alt)}" class="h-auto w-full" />${cap}</figure>`;
}

function unwrapFigures(html: string) {
  return html.replace(/<p>\s*(<figure[\s\S]*?<\/figure>)\s*<\/p>/g, "$1");
}

class NoteLinkRenderer extends Renderer {
  link({ href, title, tokens, text, autolink }: Tokens.Link): string {
    const inner = autolink ? escapeAttr(text) : this.parser.parseInline(tokens);
    const safe = safeImageSrc(href);
    if (!safe) return inner;
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    return `<a href="${escapeAttr(safe)}"${titleAttr} target="_blank" rel="noopener noreferrer">${inner}</a>`;
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
  tags?: string[];
  image?: BlogPostImage;
}

function parseFile(fileName: string): BlogPost {
  const [slug, locale] = fileName.replace(/\.md$/, "").split(".");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Frontmatter;
  const words = content.split(/\s+/).filter(Boolean).length;
  const bodyHtml = unwrapFigures(
    marked.parse(content, { renderer: new NoteLinkRenderer() }) as string,
  );

  return {
    slug,
    locale,
    title: meta.title,
    description: meta.description,
    excerpt: meta.excerpt,
    date: meta.date,
    author: meta.author,
    tags: meta.tags ?? [],
    image: meta.image,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    contentHtml: bodyHtml,
  };
}

export function listPosts(locale: string): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map(parseFile)
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
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map((f) => f.replace(`.${locale}.md`, ""));
}
