import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer, type Tokens } from "marked";
import type { ClusterEvent } from "../interfaces/event.interface";

const CONTENT_DIR = path.join(process.cwd(), "content", "eventos");

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  url?: string;
  category?: string;
  convocantes?: string[];
  result?: string;
}

function escapeAttr(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeHref(raw: string): string | null {
  const href = raw.trim();
  if (!href) return null;
  if (href.startsWith("#")) return href;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

class EventLinkRenderer extends Renderer {
  link({ href, title, tokens, text, autolink }: Tokens.Link): string {
    const inner = autolink ? escapeAttr(text) : this.parser.parseInline(tokens);
    const next = safeHref(href);
    if (!next) return inner;
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
    const blank = next.startsWith("#") ? "" : ` target="_blank" rel="noopener noreferrer"`;
    return `<a href="${escapeAttr(next)}"${titleAttr}${blank}>${inner}</a>`;
  }
}

function asIds(value: unknown): string[] | undefined {
  const list = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  const ids = list.filter((item): item is string => typeof item === "string" && item.length > 0);
  return ids.length > 0 ? ids : undefined;
}

function parseFile(fileName: string): ClusterEvent {
  const [slug, locale] = fileName.replace(/\.md$/, "").split(".");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Frontmatter;
  const body = content.trim();

  return {
    slug,
    locale,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    endDate: meta.endDate,
    location: meta.location,
    startTime: meta.startTime,
    endTime: meta.endTime,
    image: meta.image?.src
      ? {
          src: meta.image.src,
          alt: meta.image.alt,
          width: meta.image.width,
          height: meta.image.height,
        }
      : undefined,
    url: meta.url,
    category: meta.category,
    convocantes: asIds(meta.convocantes),
    result: typeof meta.result === "string" && meta.result.trim() ? meta.result.trim() : undefined,
    contentHtml: body
      ? (marked.parse(body, { async: false, gfm: true, renderer: new EventLinkRenderer() }) as string)
      : "",
  };
}

export function listEvents(locale: string): ClusterEvent[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map(parseFile)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getEvent(slug: string, locale: string): ClusterEvent | undefined {
  const file = `${slug}.${locale}.md`;
  if (!fs.existsSync(path.join(CONTENT_DIR, file))) return undefined;
  return parseFile(file);
}

export function getEventSlugs(locale: string): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map((f) => f.replace(`.${locale}.md`, ""));
}

export function listEventsForConvocante(locale: string, id: string): ClusterEvent[] {
  return listEvents(locale)
    .filter((event) => event.convocantes?.includes(id))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Eventos que aún no terminan, a partir de la fecha `from` (YYYY-MM-DD). */
export function listUpcomingEvents(locale: string, from: string): ClusterEvent[] {
  return listEvents(locale).filter((event) => (event.endDate ?? event.date) >= from);
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
