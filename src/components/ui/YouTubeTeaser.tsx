import { useState } from "react";

type YouTubeTeaserProps = {
  src: string;
  poster: string;
  label: string;
  posterAlt?: string;
};

function youtubeId(watchUrl: string): string | null {
  const match = watchUrl.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

export default function YouTubeTeaser({
  src,
  poster,
  label,
  posterAlt = "",
}: YouTubeTeaserProps) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(src);

  if (!id) return null;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/50 bg-inverse-surface shadow-2xl">
      {playing ? (
        <iframe
          title={label}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${label}`}
        >
          <img
            alt={posterAlt}
            className="h-full w-full object-cover"
            src={poster}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform group-hover:scale-110">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-10 w-10 fill-current"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
