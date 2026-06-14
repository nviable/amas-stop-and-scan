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

- React + Vite + TypeScript
- React Router
- Tailwind CSS
- `localStorage` for the Reflection Journal and progress (no backend)
- Static JSON for case files and resource content

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```txt
src/
  components/        Layout, Nav, Footer, Amito, lesson + case media
  context/           JournalContext (localStorage)
  data/
    cases/           Case files as JSON (financial scam is the first)
    resources.ts     Per-step rationale (seeded from the framework paper)
  lib/               framework constants, types, export helpers
  pages/             Home, Learn, Practice, CaseFile, Resources, Journal, Project, MeetAmito
public/
  amito/             Amito pose art (placeholder renders — swap with finals)
```

## Amito assets

The images in `public/amito/` are AI-generated **placeholders** styled to match
the Amito renders. Replace them with the final pose art using the same filenames
(`greeting`, `stop`, `source`, `content`, `alignment`, `reflect`, `reward`).

## Adding a case file

Add a JSON file under `src/data/cases/` matching the `CaseFile` type in
`src/lib/caseTypes.ts`, then register it in `src/data/cases/index.ts`. The lesson
engine renders any conforming case. The schema already supports `authentic` and
`decontextualized` cases so the framework can train calibration in both
directions.

## Deployment

Builds to a static `/dist` and deploys as a Cloudflare static-assets Worker via
`wrangler deploy`. SPA routing fallback is handled by the Worker's
`not_found_handling: "single-page-application"` setting in `wrangler.jsonc`, so no
`_redirects` file is needed.
