import { Link } from "react-router-dom";
import { STEPS } from "../lib/framework";
import { RESOURCES } from "../data/resources";

export default function Resources() {
  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold">Resource hub</h1>
        <p className="mt-3 text-lg text-ink/70">
          The reasoning behind each step. STOP&SCAN teaches you to interrogate
          context, provenance, and alignment — not to memorize visual artifacts
          that change as technology evolves.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {STEPS.map((s) => {
          const r = RESOURCES[s.key];
          return (
            <Link
              key={s.key}
              to={`/resources/${s.key}`}
              className="card group transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl font-display font-extrabold text-white"
                  style={{ backgroundColor: s.hex }}
                >
                  {s.letter}
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold">
                    {s.title}
                  </div>
                  <div className="text-sm text-ink/55">{r.question}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/70">{r.intro}</p>
              <span className="mt-3 inline-block font-bold text-alignment group-hover:underline">
                Read more →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
