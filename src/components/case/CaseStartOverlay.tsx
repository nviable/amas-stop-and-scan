import { useEffect, useId, useRef } from "react";
import Amito from "../Amito";
import Icon from "../ui/Icon";
import { LOGO_URL } from "../../lib/assets";

type CaseStartMode = "learn" | "practice";

const COPY: Record<CaseStartMode, { eyebrow: string; eyebrowIcon: string }> = {
  learn: {
    eyebrow: "Guided lesson",
    eyebrowIcon: "school",
  },
  practice: {
    eyebrow: "Practice case",
    eyebrowIcon: "lightbulb",
  },
};

export default function CaseStartOverlay({
  mode,
  open,
  onStart,
}: {
  mode: CaseStartMode;
  open: boolean;
  onStart: () => void;
}) {
  const titleId = useId();
  const startRef = useRef<HTMLButtonElement>(null);
  const onStartRef = useRef(onStart);
  const copy = COPY[mode];
  onStartRef.current = onStart;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    startRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onStartRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      event.preventDefault();
      startRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-lg no-print">
      <div
        className="absolute inset-0 bg-background-paper/75 backdrop-blur-2xl"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-xxl border border-on-surface/10 bg-white p-xl shadow-xl md:p-xxl"
      >
        <div className="mb-lg flex items-center justify-between">
          <img
            alt="STOP&SCAN"
            className="h-12 w-12 object-contain"
            src={LOGO_URL}
            width={512}
            height={512}
          />
          <Amito state="stop" size="sm" />
        </div>

        <div className="mb-md inline-flex items-center gap-sm rounded-full bg-surface-container-high px-md py-xs">
          <Icon name={copy.eyebrowIcon} className="text-body-sm text-primary" />
          <span className="font-label-md uppercase tracking-widest text-primary">
            {copy.eyebrow}
          </span>
        </div>

        <h2 id={titleId} className="font-display text-display-lg text-on-surface">
          This is a practice scenario
        </h2>

        <button
          ref={startRef}
          type="button"
          onClick={onStart}
          className="btn-primary mt-xl w-full"
        >
          Start
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  );
}
