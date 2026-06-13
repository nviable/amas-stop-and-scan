import { STEPS } from "../../lib/framework";

/** index: 0 = gut check, 1..5 = STOP, S, C, A, Reflect */
export default function StepProgress({ index }: { index: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 no-print">
      {STEPS.map((s, i) => {
        const stepNum = i + 1;
        const active = index === stepNum;
        const done = index > stepNum;
        return (
          <div key={s.key} className="flex items-center gap-1.5 sm:gap-2">
            <div
              className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-extrabold transition-all sm:text-sm"
              style={{
                backgroundColor: active || done ? s.hex : "#ffffff",
                color: active || done ? "#fff" : "#241b3a80",
                border: `2px solid ${active || done ? s.hex : "#241b3a20"}`,
              }}
              title={s.title}
            >
              {s.letter}
            </div>
            {i < STEPS.length - 1 && (
              <span
                className="hidden h-0.5 w-4 rounded sm:block"
                style={{ backgroundColor: done ? s.hex : "#241b3a20" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
