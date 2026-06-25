import type { ReactNode } from "react";
import Amito from "./Amito";
import { SpeechBubble } from "./ui/PageSections";
import type { AmitoState } from "../lib/framework";

interface AmitoSaysProps {
  state?: AmitoState;
  children: ReactNode;
  className?: string;
}

/** Amito paired with a speech bubble — the recurring "guide" motif. */
export default function AmitoSays({
  state = "greeting",
  children,
  className = "",
}: AmitoSaysProps) {
  return (
    <div className={`flex items-start gap-md ${className}`}>
      <Amito state={state} size="sm" />
      <SpeechBubble className="relative mt-2 flex-1">{children}</SpeechBubble>
    </div>
  );
}
