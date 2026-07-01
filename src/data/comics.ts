import type { ComicStrip } from "../lib/comicTypes";

/**
 * Comic strip catalog.
 *
 * To add a strip:
 * 1. Place the PDF in public/comics/ (e.g. public/comics/my-strip.pdf)
 * 2. Optionally add a cover/thumbnail at public/comics/ (e.g. stop-and-scan-cover.png)
 * 3. Add an entry below — slug should match the PDF filename without .pdf
 */
/** Format author list for display, e.g. "A, B, and C". */
export const formatComicAuthors = (authors: string[]): string => {
  if (authors.length === 0) return "";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`;
};

export const COMICS: ComicStrip[] = [
  {
    id: "comic-charleen",
    slug: "comic-charleen",
    title: "STOP & SCAN! Real or AI?",
    authors: ["Charleen Tang", "Issy Laing", "Katie Mcalister"],
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
