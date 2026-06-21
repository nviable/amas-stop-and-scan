export type ComicStrip = {
  /** Stable id — typically matches the PDF filename without extension */
  id: string;
  /** URL slug for /comics/:slug */
  slug: string;
  title: string;
  summary: string;
  /** Path under public/, e.g. /comics/comic-charleen.pdf */
  pdfPath: string;
  /** Optional cover image; defaults to /comics/thumbnails/{slug}.png */
  thumbnail?: string;
};
