import { getCaseBySlug } from "../data/cases";
import { getComicBySlug } from "../data/comics";
import { RESOURCES } from "../data/resources";
import { asset } from "./assets";
import { type StepKey } from "./framework";

export const SITE = {
  name: "STOP&SCAN",
  tagline: "Guided by Amito",
  defaultDescription:
    "STOP&SCAN helps you pause before you trust, scan before you share, and reflect before you act. Amito is your friendly guide through scaffolded digital sensemaking.",
  defaultImage: asset("/og-default.png"),
  icon: asset("/icon-512.png"),
  themeColor: "#f3a530",
} as const;

export type PageSeo = {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
};

const DEFAULT_TITLE = `${SITE.name} — ${SITE.tagline}`;

const STATIC_PAGES: Record<string, PageSeo> = {
  "/": {
    title: DEFAULT_TITLE,
    description:
      "Empowering digital resilience with the STOP&SCAN framework. Learn to pause, verify sources, analyze content, check alignment, and reflect — guided by Amito.",
    image: asset("/og-default.png"),
  },
  "/learn": {
    title: `Learn STOP&SCAN — ${SITE.name}`,
    description:
      "Walk through the full STOP&SCAN framework with Amito. Register your gut reaction, scan the evidence, and reflect on what changed — no wrong answers.",
    image: asset("/amito/pose-stop.png"),
  },
  "/practice": {
    title: `Case Files — ${SITE.name}`,
    description:
      "Practice spotting manipulation with real-world case files. Fewer cues than the guided lesson — test your STOP&SCAN skills on scams and authentic content.",
    image: asset("/amito/pose-analyze.png"),
  },
  "/resources": {
    title: `Resource Hub — ${SITE.name}`,
    description:
      "Read the reasoning behind each STOP&SCAN step: Stop, Source, Content, Alignment, and Now Reflect. Framework theory for digital trust calibration.",
    image: asset("/logo.png"),
  },
  "/comics": {
    title: `Comics — ${SITE.name}`,
    description:
      "Visual stories that help you slow down and question believability. Explore STOP&SCAN comics created with Julian Lawrence.",
    image: asset("/comics/stop-and-scan-cover.png"),
  },
  "/journal": {
    title: `My Journal — ${SITE.name}`,
    description:
      "Review saved reflections from guided lessons and practice cases. Track how your gut reaction, evidence scan, and final judgment evolved.",
    image: asset("/amito/pose-reflect.png"),
  },
  "/project": {
    title: `The Project — ${SITE.name}`,
    description:
      "STOP&SCAN is scaffolded sensemaking for trust calibration — targeting human cognition, not detection tech. Learn about the research and design rationale.",
    image: asset("/amito/pose-project.png"),
  },
  "/amito": {
    title: `Meet Amito — ${SITE.name}`,
    description:
      "Meet Amito, your friendly guide through STOP&SCAN. Explore framework step cues, poses, and how Amito helps you pause without judgment.",
    image: asset("/amito/home-waving.png"),
  },
  "/styleguide": {
    title: `Style Guide — ${SITE.name}`,
    description:
      "Brand colors, typography, buttons, components, Amito poses, and STOP&SCAN framework assets for designers and contributors.",
    image: asset("/logo.png"),
    noindex: true,
  },
  "/404": {
    title: `Page Not Found — ${SITE.name}`,
    description: "That page doesn't exist yet. Return to STOP&SCAN and continue learning with Amito.",
    image: asset("/og-default.png"),
    noindex: true,
  },
};

const RESOURCE_STEP_LABELS: Record<StepKey, string> = {
  stop: "Stop",
  source: "Source",
  content: "Content",
  alignment: "Alignment",
  reflect: "Now Reflect",
};

function resourceStepImage(key: StepKey): string {
  if (key === "alignment") return asset("/amito/pose-analyze.png");
  if (key === "reflect") return asset("/amito/pose-reflect.png");
  return asset(`/amito/pose-${key}.png`);
}

export function resolvePageSeo(pathname: string, searchParams?: URLSearchParams): PageSeo {
  const staticMatch = STATIC_PAGES[pathname];
  if (staticMatch) return staticMatch;

  const practiceMatch = pathname.match(/^\/practice\/([^/]+)$/);
  if (practiceMatch) {
    const caseFile = getCaseBySlug(practiceMatch[1]);
    if (caseFile) {
      return {
        title: `${caseFile.title} — Case File — ${SITE.name}`,
        description: caseFile.summary,
        image: asset("/amito/pose-stop.png"),
      };
    }
  }

  const toolsMatch = pathname.match(/^\/resources\/([^/]+)\/tools$/);
  if (toolsMatch) {
    const key = toolsMatch[1] as StepKey;
    const resource = RESOURCES[key];
    if (resource) {
      return {
        title: `${RESOURCE_STEP_LABELS[key]} Tools — ${SITE.name} Resources`,
        description: `Tools you can leverage for the ${RESOURCE_STEP_LABELS[key]} step of STOP&SCAN — provenance checks, detectors, and cross-checking aids. Each tool is one input, not a verdict.`,
        image: resourceStepImage(key),
      };
    }
  }

  const resourceMatch = pathname.match(/^\/resources\/([^/]+)$/);
  if (resourceMatch) {
    const key = resourceMatch[1] as StepKey;
    const resource = RESOURCES[key];
    if (resource) {
      return {
        title: `${RESOURCE_STEP_LABELS[key]} — ${SITE.name} Resources`,
        description: `${resource.question} ${resource.intro.slice(0, 140).trim()}…`,
        image: resourceStepImage(key),
      };
    }
  }

  const comicMatch = pathname.match(/^\/comics\/([^/]+)$/);
  if (comicMatch) {
    const comic = getComicBySlug(comicMatch[1]);
    if (comic) {
      return {
        title: `${comic.title} — Comics — ${SITE.name}`,
        description: comic.summary,
        image: comic.thumbnail ? asset(comic.thumbnail) : asset(`/comics/thumbnails/${comic.slug}.png`),
      };
    }
  }

  if (pathname === "/journal" && searchParams?.has("entry")) {
    return {
      title: `Reflection — My Journal — ${SITE.name}`,
      description:
        "A saved STOP&SCAN reflection: what you felt first, what you noticed, what changed your mind, and what you'll do next.",
      image: asset("/amito/pose-reflect.png"),
      noindex: true,
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: SITE.defaultDescription,
    image: SITE.defaultImage,
  };
}

export function absoluteUrl(path: string, origin: string): string {
  if (!origin) return path;
  return new URL(path, origin).href;
}
