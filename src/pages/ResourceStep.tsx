import { Link, useParams } from "react-router-dom";
import Amito from "../components/Amito";
import { STEPS, stepByKey, type StepKey } from "../lib/framework";
import { RESOURCES } from "../data/resources";

const VALID: StepKey[] = ["stop", "source", "content", "alignment", "reflect"];

export default function ResourceStep() {
  const { step } = useParams();
  const key = step as StepKey;

  if (!step || !VALID.includes(key)) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Step not found</h1>
        <Link to="/resources" className="btn-primary mt-6">
          Back to resources
        </Link>
      </div>
    );
  }

  const meta = stepByKey(key);
  const r = RESOURCES[key];
  const idx = VALID.indexOf(key);
  const next = STEPS[idx + 1];
  const prev = STEPS[idx - 1];

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/resources" className="text-sm font-bold text-ink/50 hover:text-ink">
          ← All steps
        </Link>

        <div className="mt-4 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white"
            style={{ backgroundColor: meta.hex }}
          >
            {meta.letter}
          </div>
          <div>
            <h1 className="font-display text-4xl font-extrabold">{meta.title}</h1>
            <p className="text-ink/60">{r.question}</p>
          </div>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-ink/80">{r.intro}</p>

        <div
          className="mt-8 rounded-3xl border-l-4 bg-white p-6 shadow-soft"
          style={{ borderColor: meta.hex }}
        >
          <h2 className="font-display text-lg font-extrabold">Ask yourself</h2>
          <ul className="mt-3 space-y-2">
            {r.asks.map((a, i) => (
              <li key={i} className="flex gap-2 text-ink/80">
                <span style={{ color: meta.hex }}>◆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[auto,1fr] md:items-start">
          <Amito state={meta.amito} size="md" />
          <div className="card">
            <h2 className="font-display text-lg font-extrabold">Why it works</h2>
            <p className="mt-2 text-ink/75">{r.why}</p>
            <p
              className="mt-4 rounded-2xl p-3 font-bold"
              style={{ backgroundColor: `${meta.hex}1a`, color: meta.hex }}
            >
              {r.takeaway}
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-6">
          {prev ? (
            <Link to={`/resources/${prev.key}`} className="btn-ghost">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/resources/${next.key}`} className="btn-primary">
              {next.title} →
            </Link>
          ) : (
            <Link to="/practice/celebrity-investment-scam" className="btn-accent">
              Try it on a case →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
