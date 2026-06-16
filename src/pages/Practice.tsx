import { Link } from "react-router-dom";
import { CASES } from "../data/cases";

const KIND_LABEL: Record<string, string> = {
  scam: "Financial scam",
  authentic: "Authentic content",
  decontextualized: "Decontextualized footage",
};

export default function Practice() {
  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold">Case Files</h1>
        <p className="mt-3 text-lg text-ink/70">
          Practice STOP&SCAN on example scenarios with fewer cues than the
          guided lesson. You can ask for hints when you need them, and each case
          ends with a personal reflection you can save and export.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c) => (
          <Link
            key={c.id}
            to={`/practice/${c.slug}`}
            className="card group flex flex-col transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink/40">
              <span>{KIND_LABEL[c.kind] ?? c.kind}</span>·<span>{c.difficulty}</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-extrabold">
              {c.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-ink/65">{c.summary}</p>
            <span className="mt-4 font-bold text-alignment group-hover:underline">
              Start case · {c.estMinutes} min →
            </span>
          </Link>
        ))}

        <div className="card flex flex-col items-center justify-center border-dashed text-center text-ink/45">
          <div className="font-display text-lg font-bold">More coming soon</div>
          <p className="mt-1 text-sm">
            Authentic-content and decontextualized-footage cases are on the way —
            so you practice trusting real content too, not just doubting.
          </p>
        </div>
      </div>
    </div>
  );
}
