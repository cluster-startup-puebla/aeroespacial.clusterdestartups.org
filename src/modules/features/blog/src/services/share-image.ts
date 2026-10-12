import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/modules/cores/site/src/config/site";

export interface ShareImage {
  url: string;
  alt: string;
  type: string;
  width: number;
  height: number;
}

/**
 * WhatsApp builds the card from og:image. WebP and a declared size that
 * does not match the file make it fall back to a domain-only card.
 * Covers stay WebP on the page. The share image is a JPEG in /og.
 * Notes without a cover omit og:image. This site has no default card yet.
 */
export function shareImageFor(src: string | undefined, alt: string): ShareImage | null {
  if (!src) return null;

  if (!src.endsWith(".webp")) {
    return {
      url: src.startsWith("http") ? src : `${SITE_URL}${src}`,
      alt,
      type: src.endsWith(".png") ? "image/png" : "image/jpeg",
      width: 1200,
      height: 630,
    };
  }

  const jpgSrc = `/og/${path.basename(src, ".webp")}.jpg`;
  const file = path.join(process.cwd(), "public", jpgSrc);
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing share JPEG for ${src}. Save public${jpgSrc} (JPEG, max 1200px wide, under 600KB).`,
    );
  }

  const size = readJpegSize(file);
  return {
    url: `${SITE_URL}${jpgSrc}`,
    alt,
    type: "image/jpeg",
    width: size.width,
    height: size.height,
  };
}

function readJpegSize(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  let offset = 2;
  while (offset + 8 < buf.length) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    const length = buf.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  throw new Error(`Could not read JPEG size for ${filePath}`);
}
