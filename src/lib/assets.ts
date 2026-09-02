/** Optional CDN/R2 prefix — leave unset to serve from /public via the app origin. */
const ASSET_BASE =
  import.meta.env.PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "") ??
  import.meta.env.VITE_ASSET_BASE_URL?.replace(/\/$/, "") ??
  "";

/** Resolve a site-relative asset path (optionally prefixed for R2/CDN). */
export function asset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Prefer an optimized WebP sibling for large raster assets. */
export function rasterAsset(path: string): string {
  const webp = path.replace(/\.(png|jpe?g)$/i, ".webp");
  return asset(webp);
}

/** Brand assets in /public root. */
export const LOGO_URL = asset("/logo.png");
export const ICON_URL = asset("/icon-512.png");

/** Institutional affiliation logos shown in the site footer. */
export const PARTNER_LOGOS = [
  {
    name: "International Telecommunication Union",
    href: "https://www.itu.int/",
    src: asset("/partners/itu.svg"),
    width: 170,
    height: 200,
  },
  {
    name: "AI for Good",
    href: "https://aiforgood.itu.int/",
    src: asset("/partners/ai-for-good.png"),
    width: 533,
    height: 147,
  },
  {
    name: "RIT ESL Global Cybersecurity Institute",
    href: "https://www.rit.edu/cybersecurity/",
    src: asset("/partners/rit-esl-cybersecurity.svg"),
    width: 193,
    height: 37,
  },
  {
    name: "University of Bologna",
    href: "https://www.unibo.it/",
    src: asset("/partners/unibo.png"),
    width: 415,
    height: 136,
  },
] as const;

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
  content: "https://www.youtube.com/watch?v=HhAjKIjnwJ4",
  alignment: "https://www.youtube.com/watch?v=hDrMlVPko3U",
  reflect: "https://www.youtube.com/watch?v=Gza4EpT_AMs",
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
  greeting: rasterAsset(AMITO_POSE.greeting),
  stop: rasterAsset(AMITO_POSE.stop),
  source: rasterAsset(AMITO_POSE.source),
  content: rasterAsset(AMITO_POSE.content),
  alignment: rasterAsset(AMITO_POSE.alignment),
  reflect: rasterAsset(AMITO_POSE.reflect),
  reward: rasterAsset(AMITO_POSE.reward),
  comics: rasterAsset(AMITO_POSE.comics),
  project: rasterAsset(AMITO_POSE.project),
  learn: rasterAsset(AMITO_POSE.learn),
  postVideo: rasterAsset(AMITO_MEDIA.postVideo),
  comicCover: rasterAsset(AMITO_MEDIA.comicCover),
  videoTeaser: rasterAsset(AMITO_MEDIA.videoTeaser),
} as const;

/** 16:9 still for a case-file media player; falls back to the shared placeholder. */
export function caseMediaThumbnail(path?: string): string {
  return path ? rasterAsset(path) : AMITO_IMAGES.postVideo;
}

export const SUMMIT_BANNER =
  "https://cdn.stopandscan.org/amito-geneva-banner-2026.jpeg";

/** Team photos in /public/team/ */
export const PROJECT_TEAM = {
  fatmaAksu: rasterAsset("/team/fatma-aksu.png"),
  saniatSohrawardi: rasterAsset("/team/saniat-sohrawardi.png"),
  emanuelLukawiecki: rasterAsset("/team/emanuel-lukawiecki.png"),
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
    amito: rasterAsset(AMITO_POSE.stop),
    bg: "#f3a530",
  },
  source: {
    icon: asset(FRAMEWORK_ICONS.source),
    amito: rasterAsset(AMITO_POSE.source),
    bg: "#6ae4e7",
  },
  content: {
    icon: asset(FRAMEWORK_ICONS.content),
    amito: rasterAsset(AMITO_POSE.content),
    bg: "#82e896",
  },
  alignment: {
    icon: asset(FRAMEWORK_ICONS.alignment),
    amito: rasterAsset(AMITO_POSE.alignment),
    bg: "#ea80dc",
  },
  reflect: {
    icon: asset(FRAMEWORK_ICONS.reflect),
    amito: rasterAsset(AMITO_POSE.reflect),
    bg: "#f3a530",
  },
} as const;
