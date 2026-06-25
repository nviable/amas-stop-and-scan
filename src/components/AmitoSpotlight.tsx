import type { ReactNode } from "react";
import type { AmitoState } from "../lib/framework";
import Amito from "./Amito";
import { SpeechBubble } from "./ui/PageSections";

type AmitoSize = "sm" | "md" | "lg" | "xl";

type SpeechPlacement = "top-right" | "top-left" | "upper-right";

const SPEECH_PLACEMENT: Record<SpeechPlacement, string> = {
  "top-right": "absolute -right-4 -top-4 z-20 max-w-[240px] md:-right-8",
  "top-left": "absolute -left-4 -top-4 z-20 max-w-[240px] md:-left-8",
  "upper-right": "absolute -right-12 -top-4 z-20 max-w-[180px] shadow-xl",
};

type AmitoSpotlightProps = {
  /** Render the glow Amito mascot by framework state */
  state?: AmitoState;
  amitoSize?: AmitoSize;
  /** Or a hero-scale image (learn pose, project pose, etc.) */
  src?: string;
  alt?: string;
  imageClassName?: string;
  float?: boolean;
  /** Optional backdrop glow behind the mascot */
  glow?: "primary" | "lilac" | "none";
  glowClassName?: string;
  /** Speech bubble content — positioned relative to the mascot */
  speech?: ReactNode;
  speechPlacement?: SpeechPlacement;
  speechTail?: "left" | "bottom";
  speechClassName?: string;
  className?: string;
};

export default function AmitoSpotlight({
  state,
  amitoSize = "lg",
  src,
  alt = "Amito",
  imageClassName = "relative z-10 w-full max-w-md object-contain",
  float = false,
  glow = "primary",
  glowClassName,
  speech,
  speechPlacement = "top-right",
  speechTail = "left",
  speechClassName,
  className = "",
}: AmitoSpotlightProps) {
  const bubbleClass = speechClassName ?? SPEECH_PLACEMENT[speechPlacement];

  const glowBg =
    glowClassName
      ? ""
      : glow === "lilac"
        ? "bg-lilac-accent/10 blur-[100px]"
        : glow === "primary"
          ? "bg-primary/10 blur-[100px]"
          : "";

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow !== "none" && (glowClassName || glowBg) && (
        <div
          className={`absolute inset-0 rounded-full ${glowClassName ?? glowBg}`}
          aria-hidden
        />
      )}
      {state ? (
        <Amito state={state} size={amitoSize} float={float} className="relative z-10" />
      ) : (
        src && (
          <img
            src={src}
            alt={alt}
            className={`${imageClassName}${float ? " animate-float" : ""}`}
          />
        )
      )}
      {speech && (
        <SpeechBubble tail={speechTail} className={bubbleClass}>
          {speech}
        </SpeechBubble>
      )}
    </div>
  );
}
