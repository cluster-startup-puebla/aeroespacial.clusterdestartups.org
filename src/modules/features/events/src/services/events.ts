import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ClusterEvent } from "../interfaces/event.interface";

const CONTENT_DIR = path.join(process.cwd(), "content", "eventos");

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  url?: string;
  category?: string;
}

function parseFile(fileName: string): ClusterEvent {
  const [slug, locale] = fileName.replace(/\.md$/, "").split(".");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data } = matter(raw);
  const meta = data as Frontmatter;

  return {
    slug,
    locale,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    endDate: meta.endDate,
    location: meta.location,
    url: meta.url,
    category: meta.category,
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

/** Eventos que aún no terminan, a partir de la fecha `from` (YYYY-MM-DD). */
export function listUpcomingEvents(locale: string, from: string): ClusterEvent[] {
  return listEvents(locale).filter((event) => (event.endDate ?? event.date) >= from);
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
