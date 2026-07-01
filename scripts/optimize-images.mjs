/**
 * Generates WebP variants for large raster assets in /public.
 * Run before `astro build` to keep image payloads small.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const MIN_BYTES = 40_000;
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function optimize(file) {
  const info = await stat(file);
  if (info.size < MIN_BYTES) return null;

  const rel = path.relative(PUBLIC_DIR, file);
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const image = sharp(file);
  const meta = await image.metadata();

  await image.webp({ quality: 82, effort: 4 }).toFile(out);

  const outInfo = await stat(out);
  return {
    rel,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    before: info.size,
    after: outInfo.size,
  };
}

const results = [];
for (const file of await walk(PUBLIC_DIR)) {
  const result = await optimize(file);
  if (result) results.push(result);
}

if (results.length) {
  console.log(`Optimized ${results.length} images to WebP:`);
  for (const r of results) {
    const saved = Math.round((1 - r.after / r.before) * 100);
    console.log(`  ${r.rel} → ${r.width}x${r.height} (${saved}% smaller)`);
  }
} else {
  console.log("No images needed optimization.");
}
