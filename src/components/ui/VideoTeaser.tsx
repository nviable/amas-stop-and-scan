import { useRef, useState } from "react";
import Icon from "./Icon";

type VideoTeaserProps = {
  src: string;
  poster: string;
  label: string;
  posterAlt?: string;
};

export default function VideoTeaser({ src, poster, label, posterAlt = "" }: VideoTeaserProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/50 bg-inverse-surface shadow-2xl">
      {playing ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          aria-label={label}
        />
      ) : (
        <button
          type="button"
          className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left"
          onClick={startPlayback}
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

      <div className="pointer-events-none absolute bottom-lg left-lg z-10">
        <span className="rounded-full bg-white/90 px-md py-xs font-label-md uppercase tracking-wider text-primary backdrop-blur-md">
          {label}
        </span>
      </div>
    </div>
  );
}
