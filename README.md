# STOP&SCAN — Guided by Amito

An interactive educational website for the **STOP&SCAN** framework: a scaffolded
sensemaking process that helps people pause before they trust, scan before they
share, and reflect before they act when interacting with digital media. Amito is
the friendly guide; STOP&SCAN is the brand.

> STOP&SCAN helps you pause before you trust, scan before you share, and reflect
> before you act. Amito is your friendly guide through the process.

## The framework

- **STOP** — pause and register your gut reaction (pre-commitment)
- **S — Source** — who is really behind this?
- **C — Content** — does what you see actually hold up?
- **A — Alignment** — does everything fit together?
- **N — Now Reflect** — has your judgment changed, and why? ("I don't know yet" is a valid answer.)

## Tech stack

- [Astro](https://astro.build) (static site generation; uses Vite under the hood)
- React islands for interactive lesson, journal, comic reader, and video UI
- Tailwind CSS
- `localStorage` for the Reflection Journal and progress (no backend)
- Static JSON for case files and resource content

## Getting started

```bash
npm install
npm run dev      # Astro dev server (Vite-powered)
npm run build    # sitemap + production build to /dist
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```txt
src/
  components/
    views/           Page-level React views (hydrated as islands)
    lesson/          Lesson engine, choice UI
    ui/              Header, footer, heroes, icons
  context/           JournalContext (localStorage)
  data/
    cases/           Case files as JSON
    resources.ts     Per-step rationale
  layouts/           BaseLayout.astro (SEO meta, shell)
  lib/               framework constants, SEO, export helpers
  pages/             Astro file-based routes (.astro)
public/
  amito/             Amito pose art
  comics/            Comic strip PDFs, cover art, thumbnails
  media/cases/       16:9 lineart stills for Learn/Practice post media
```

## Deployment

Builds to a static `/dist` and deploys as a Cloudflare static-assets Worker via
`wrangler deploy`. Each route is pre-rendered HTML with per-page SEO metadata.
Unknown paths serve `404.html` via the Worker's `not_found_handling: "404-page"`
setting in `wrangler.jsonc`.

Set `PUBLIC_SITE_URL` (no trailing slash) for the canonical URL in sitemap and Open Graph tags.

## Adding a case file

Add a JSON file under `src/data/cases/` matching the `CaseFile` type in
`src/lib/caseTypes.ts`, then register it in `src/data/cases/index.ts`. The lesson
engine renders any conforming case.

## Adding a comic strip

1. Place the PDF in `public/comics/`.
2. Add an optional thumbnail at `public/comics/thumbnails/my-strip.png`.
3. Register the strip in `src/data/comics.ts`.

The gallery at `/comics` and reader at `/comics/:slug` update automatically on the next build.
