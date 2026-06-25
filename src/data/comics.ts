import type { ComicStrip } from "../lib/comicTypes";

/**
 * Comic strip catalog.
 *
 * To add a strip:
 * 1. Place the PDF in public/comics/ (e.g. public/comics/my-strip.pdf)
 * 2. Optionally add a cover/thumbnail at public/comics/ (e.g. stop-and-scan-cover.png)
 * 3. Add an entry below — slug should match the PDF filename without .pdf
 */
export const COMICS: ComicStrip[] = [
  {
    id: "comic-charleen",
    slug: "comic-charleen",
    title: "STOP & SCAN! Real or AI?",
    author: "Charleen Tang",
    summary:
      "Charleen sits down with her phone as a flood of sensational posts, ads, and headlines compete for attention — a visual introduction to pausing before you trust what scrolls past.",
    pdfPath: "/comics/comic-charleen.pdf",
    thumbnail: "/comics/stop-and-scan-cover.png",
  },
];

export const getComicBySlug = (slug: string): ComicStrip | undefined =>
  COMICS.find((c) => c.slug === slug);

export const comicThumbnail = (comic: ComicStrip): string =>
  comic.thumbnail ?? `/comics/thumbnails/${comic.slug}.png`;
