/** Optional CDN/R2 prefix — leave unset to serve from /public via the app origin. */
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE_URL?.replace(/\/$/, "") ?? "";

/** Resolve a site-relative asset path (optionally prefixed for R2/CDN). */
export function asset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Brand assets in /public root. */
export const LOGO_URL = asset("/logo.png");
export const ICON_URL = asset("/icon-512.png");

const AMITO_POSE = {
  greeting: "/amito/home-waving.png",
  stop: "/amito/pose-stop.png",
  source: "/amito/pose-source.png",
  content: "/amito/pose-content.png",
  alignment: "/amito/pose-analyze.png",
  reflect: "/amito/pose-reflect.png",
  reward: "/amito/pose-heart.png",
  comics: "/amito/pose-comics.png",
  project: "/amito/pose-project.png",
  learn: "/amito/home-waving.png",
} as const;

const AMITO_MEDIA = {
  postVideo: "/media/post-video.png",
  comicCover: "/comics/stop-and-scan-cover.png",
  videoTeaser: "/media/video-teaser.jpeg",
} as const;

export const AMITO_VIDEOS = {
  meetAmitoTeaser: "https://www.youtube.com/watch?v=zcNQUsBJ8vg",
  stop: "https://www.youtube.com/watch?v=E8HPyEh-SAk",
  source: "https://www.youtube.com/watch?v=zSVFqOqMyxE",
} as const;

/** YouTube thumbnail for a watch URL or video id. */
export function youtubePoster(watchUrl: string): string {
  const match = watchUrl.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  const id = match?.[1] ?? watchUrl;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/** Live favicon for a tool URL, via Google's favicon service. */
export function faviconFor(url: string, size = 128): string {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`;
  } catch {
    return "";
  }
}

export const AMITO_IMAGES = {
  greeting: asset(AMITO_POSE.greeting),
  stop: asset(AMITO_POSE.stop),
  source: asset(AMITO_POSE.source),
  content: asset(AMITO_POSE.content),
  alignment: asset(AMITO_POSE.alignment),
  reflect: asset(AMITO_POSE.reflect),
  reward: asset(AMITO_POSE.reward),
  comics: asset(AMITO_POSE.comics),
  project: asset(AMITO_POSE.project),
  learn: asset(AMITO_POSE.learn),
  postVideo: asset(AMITO_MEDIA.postVideo),
  comicCover: asset(AMITO_MEDIA.comicCover),
  videoTeaser: asset(AMITO_MEDIA.videoTeaser),
} as const;

/** Team photos in /public/team/ */
export const PROJECT_TEAM = {
  fatmaAksu: asset("/team/fatma-aksu.png"),
  saniatSohrawardi: asset("/team/saniat-sohrawardi.png"),
  emanuelLukawiecki: asset("/team/emanuel-lukawiecki.png"),
  julianLawrence: asset("/team/julian-lawrence.jpg"),
} as const;

const FRAMEWORK_ICONS = {
  stop: "/amito/icons/stop.png",
  source: "/amito/icons/source.png",
  content: "/amito/icons/content.png",
  alignment: "/amito/icons/alignment.png",
  reflect: "/amito/icons/reflect.png",
} as const;

export const FRAMEWORK_STEP_IMAGES = {
  stop: {
    icon: asset(FRAMEWORK_ICONS.stop),
    amito: asset(AMITO_POSE.stop),
    bg: "#f3a530",
  },
  source: {
    icon: asset(FRAMEWORK_ICONS.source),
    amito: asset(AMITO_POSE.source),
    bg: "#6ae4e7",
  },
  content: {
    icon: asset(FRAMEWORK_ICONS.content),
    amito: asset(AMITO_POSE.content),
    bg: "#82e896",
  },
  alignment: {
    icon: asset(FRAMEWORK_ICONS.alignment),
    amito: asset(AMITO_POSE.alignment),
    bg: "#ea80dc",
  },
  reflect: {
    icon: asset(FRAMEWORK_ICONS.reflect),
    amito: asset(AMITO_POSE.reflect),
    bg: "#f3a530",
  },
} as const;
