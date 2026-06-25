import { STEPS } from "../../lib/framework";

/** index: 1..5 = STOP, S, C, A, N (Now Reflect) */
export default function StepProgress({ index }: { index: number }) {
  // Short labels keyed to each step; colors come from the canonical
  // framework palette so the bar matches the step badge and the
  // signal accents used throughout the lesson.
  const labels = ["Stop", "Source", "Content", "Alignment", "Reflect"];

  return (
    <div className="no-print flex justify-center px-md">
      <div className="relative flex w-full max-w-2xl items-center justify-between">
        <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-full -translate-y-1/2 bg-outline-variant" />
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const active = index === stepNum;
          const done = index > stepNum;
          const isActiveStyle = active || done;
          const size = i === 0 ? "w-12 h-12" : "w-10 h-10";

          return (
            <div key={s.key} className="flex flex-col items-center gap-xs">
              <div
                className={`flex items-center justify-center rounded-full font-display font-bold text-white shadow-md ring-4 ring-white ${size} ${
                  isActiveStyle ? "" : "border-2 bg-white text-outline-variant"
                }`}
                style={{
                  backgroundColor: isActiveStyle ? s.hex : undefined,
                  borderColor: isActiveStyle ? undefined : s.hex,
                }}
                title={s.title}
              >
                {s.letter}
              </div>
              <span
                className={`font-label-md font-bold uppercase tracking-widest ${
                  isActiveStyle ? "" : "text-outline-variant"
                }`}
                style={{ color: isActiveStyle ? s.hex : undefined }}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
