import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.VITE_SITE_URL || "https://amas-stop-and-scan.workers.dev").replace(
  /\/$/,
  "",
);

const casesDir = join("src", "data", "cases");
const caseSlugs = readdirSync(casesDir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => JSON.parse(readFileSync(join(casesDir, name), "utf8")).slug);

const comicsSource = readFileSync(join("src", "data", "comics.ts"), "utf8");
const comicSlugs = [...comicsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

const staticRoutes = [
  "/",
  "/learn",
  "/practice",
  "/resources",
  "/resources/stop",
  "/resources/source",
  "/resources/content",
  "/resources/alignment",
  "/resources/reflect",
  "/resources/source/tools",
  "/resources/content/tools",
  "/resources/alignment/tools",
  "/comics",
  "/journal",
  "/project",
  "/amito",
];

const dynamicRoutes = [
  ...caseSlugs.map((slug) => `/practice/${slug}`),
  ...comicSlugs.map((slug) => `/comics/${slug}`),
];

const urls = [...staticRoutes, ...dynamicRoutes];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path === "/" ? "" : path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", `${xml}\n`);
console.log(`Wrote sitemap with ${urls.length} URLs (base: ${baseUrl})`);
