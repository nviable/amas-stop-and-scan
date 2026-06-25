import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { stitch } from "@google/stitch-sdk";

/** Writes to stitch/ (gitignored). Copy any assets you need into public/ for the app. */

async function loadDotEnv() {
  try {
    const raw = await readFile(join(process.cwd(), ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env is optional if vars are already exported
  }
}

const PROJECT_ID = "3027151433644504338";

const SCREENS = [
  { id: "5d368435ed274e3b9dfb5771dd67bb72", slug: "my-journal", title: "Stop & Scan - My Journal" },
  { id: "81ffcade25324b3eb8beaa2fee4b2eba", slug: "meet-amito", title: "Stop & Scan - Meet Amito" },
  { id: "dd9b88b332c34e3586c78c519845c8f5", slug: "practice-library", title: "Stop & Scan - Practice Library (Updated Chrome)" },
  { id: "2b3adbdbe8db413a8ba75d0f6af9b7d1", slug: "learn-framework", title: "Learn STOP&SCAN - Optimized Framework Layout" },
  { id: "77d9a3a7e3b94e738e15c826c1d125db", slug: "homepage", title: "Stop & Scan - Homepage with Compact Framework Grid" },
  { id: "c0e7165f61334628b62f742eea0d4ad5", slug: "about-project", title: "Stop & Scan - About the Project" },
  { id: "e59a91cff90a46978afb0c6c194c8e5b", slug: "practice-step-stop", title: "Stop & Scan - Practice Step 1 (Stop)" },
  { id: "f151cc60e2294f5b85d23755201a5ebf", slug: "comics-library", title: "Stop & Scan - Comics Library" },
  { id: "fd3d273d95994dffaef920ec772994b0", slug: "practice-case-intro", title: "Stop & Scan - Practice Case Intro (Redesigned with Post)" },
];

const OUT_DIR = join(process.cwd(), "stitch", "stop-and-scan-modern-redesign");

async function download(url, dest, label) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${label}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await loadDotEnv();

  if (!process.env.STITCH_API_KEY && !(process.env.STITCH_ACCESS_TOKEN && process.env.GOOGLE_CLOUD_PROJECT)) {
    console.error("Missing STITCH_API_KEY (or STITCH_ACCESS_TOKEN + GOOGLE_CLOUD_PROJECT).");
    process.exit(1);
  }

  await mkdir(join(OUT_DIR, "html"), { recursive: true });
  await mkdir(join(OUT_DIR, "images"), { recursive: true });

  const project = stitch.project(PROJECT_ID);
  const manifest = {
    projectId: PROJECT_ID,
    projectTitle: "Stop & Scan Modern Redesign",
    fetchedAt: new Date().toISOString(),
    screens: [],
  };

  for (const spec of SCREENS) {
    console.log(`Fetching: ${spec.title}`);
    const screen = await project.getScreen(spec.id);
    const htmlUrl = await screen.getHtml();
    let imageUrl = await screen.getImage();
    if (imageUrl && !imageUrl.includes("=w")) {
      imageUrl = `${imageUrl}=w1280`;
    }

    const htmlPath = join(OUT_DIR, "html", `${spec.slug}.html`);
    const imagePath = join(OUT_DIR, "images", `${spec.slug}.png`);

    const htmlBytes = await download(htmlUrl, htmlPath, "HTML");
    const imageBytes = await download(imageUrl, imagePath, "image");

    manifest.screens.push({
      ...spec,
      screenId: spec.id,
      htmlFile: `html/${spec.slug}.html`,
      imageFile: `images/${spec.slug}.png`,
      htmlUrl,
      imageUrl,
      htmlBytes,
      imageBytes,
    });

    console.log(`  ✓ ${spec.slug} (${htmlBytes} bytes HTML, ${imageBytes} bytes PNG)`);
  }

  await writeFile(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. Assets saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
