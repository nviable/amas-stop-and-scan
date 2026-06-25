import { STEPS } from "../../lib/framework";

/** index: 1..5 = STOP, S, C, A, Reflect */
export default function StepProgress({ index }: { index: number }) {
  const stepStyles = [
    { bg: "#f36734", label: "Stop", letter: "STOP", size: "w-12 h-12" },
    { bg: "#6ae4e7", label: "Scan", letter: "S", size: "w-10 h-10" },
    { bg: "#82e896", label: "content", letter: "C", size: "w-10 h-10" },
    { bg: "#ea80dc", label: "align", letter: "A", size: "w-10 h-10" },
    { bg: "#f3a530", label: "Now", letter: "N", size: "w-10 h-10" },
  ];

  return (
    <div className="no-print flex justify-center px-md">
      <div className="relative flex w-full max-w-2xl items-center justify-between">
        <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-full -translate-y-1/2 bg-outline-variant" />
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const active = index === stepNum;
          const done = index > stepNum;
          const style = stepStyles[i];
          const isActiveStyle = active || done;

          return (
            <div key={s.key} className="flex flex-col items-center gap-xs">
              <div
                className={`flex items-center justify-center rounded-full font-display font-bold text-white shadow-md ring-4 ring-white ${style.size} ${
                  isActiveStyle ? "" : "border-2 bg-white text-outline-variant"
                }`}
                style={{
                  backgroundColor: isActiveStyle ? style.bg : undefined,
                  borderColor: isActiveStyle ? undefined : style.bg,
                }}
                title={s.title}
              >
                {i === 0 ? style.letter : style.letter}
              </div>
              <span
                className={`font-label-md font-bold uppercase tracking-widest ${
                  isActiveStyle ? "" : "text-outline-variant"
                }`}
                style={{ color: isActiveStyle ? style.bg : undefined }}
              >
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
