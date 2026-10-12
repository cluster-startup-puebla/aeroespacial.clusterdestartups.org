import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "manifiesto");

marked.use({ gfm: true, async: false });

export interface ManifestoDocument {
  title: string;
  description: string;
  contentHtml: string;
}

export function getManifesto(locale: string): ManifestoDocument {
  const file = path.join(CONTENT_DIR, `manifiesto.${locale}.md`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const meta = data as { title: string; description: string };

  return {
    title: meta.title,
    description: meta.description,
    contentHtml: marked.parse(content) as string,
  };
}
