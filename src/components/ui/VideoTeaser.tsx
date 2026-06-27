import { lazy, Suspense, useState } from "react";
import Icon from "./Icon";

const ReactPlayer = lazy(() => import("react-player"));

type VideoTeaserProps = {
  src: string;
  poster: string;
  label: string;
  posterAlt?: string;
};

export default function VideoTeaser({ src, poster, label, posterAlt = "" }: VideoTeaserProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/50 bg-inverse-surface shadow-2xl">
      {playing ? (
        <div className="absolute inset-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover">
          <Suspense fallback={<div className="h-full w-full bg-inverse-surface" aria-hidden />}>
            <ReactPlayer
              src={src}
              playing
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", inset: 0 }}
              config={{
                youtube: {
                  rel: 0,
                  iv_load_policy: 3,
                },
              }}
            />
          </Suspense>
        </div>
      ) : (
        <button
          type="button"
          className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${label}`}
        >
          <img alt={posterAlt} className="h-full w-full object-cover" src={poster} />
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform group-hover:scale-110">
              <Icon name="play_arrow" className="text-4xl" filled />
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
