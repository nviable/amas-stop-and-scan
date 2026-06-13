import type { ReactNode } from "react";
import Amito from "./Amito";
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
    <div className={`flex items-start gap-4 ${className}`}>
      <Amito state={state} size="sm" />
      <div className="relative mt-2 flex-1 rounded-2xl rounded-tl-none border border-ink/10 bg-white p-4 text-ink shadow-soft">
        <span
          aria-hidden
          className="absolute -left-2 top-3 h-4 w-4 rotate-45 border-b border-l border-ink/10 bg-white"
        />
        <div className="relative font-semibold leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
