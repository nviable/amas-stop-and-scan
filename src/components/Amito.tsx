import type { AmitoState } from "../lib/framework";
import { AMITO_IMAGES } from "../lib/assets";

const GLOW: Record<AmitoState, string> = {
  greeting: "#4dabf7",
  stop: "#ef4a6b",
  source: "#22b8cf",
  content: "#37b24d",
  alignment: "#ea80dc",
  reflect: "#ff922b",
  reward: "#b197fc",
};

const sizes = {
  sm: "h-20 w-20",
  md: "h-32 w-32",
  lg: "h-48 w-48",
  xl: "h-64 w-64",
};

interface AmitoProps {
  state?: AmitoState;
  size?: keyof typeof sizes;
  float?: boolean;
  className?: string;
}

export default function Amito({
  state = "greeting",
  size = "md",
  float = false,
  className = "",
}: AmitoProps) {
  const glow = GLOW[state];
  const src = AMITO_IMAGES[state] ?? AMITO_IMAGES.greeting;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${float ? "animate-float" : ""} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full blur-2xl animate-glowpulse"
        style={{ backgroundColor: glow, opacity: 0.45 }}
      />
      <img
        src={src}
        alt={`Amito — ${state} pose`}
        className={`relative z-10 ${sizes[size]} object-contain drop-shadow-xl`}
      />
    </div>
  );
}
