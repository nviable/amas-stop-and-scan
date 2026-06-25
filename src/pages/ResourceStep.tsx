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
        <h1 className="font-display text-display-lg">Step not found</h1>
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
    <div className="px-margin-mobile pb-xxl pt-8 md:px-margin-desktop">
      <div className="mx-auto max-w-3xl">
        <Link to="/resources" className="font-label-md text-on-surface-variant hover:text-on-surface">
          ← All steps
        </Link>

        <div className="mt-md flex items-center gap-md">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white"
            style={{ backgroundColor: meta.hex }}
          >
            {meta.letter}
          </div>
          <div>
            <h1 className="font-display text-display-xl">{meta.title}</h1>
            <p className="text-on-surface-variant">{r.question}</p>
          </div>
        </div>

        <p className="mt-lg text-body-lg leading-relaxed text-on-surface">{r.intro}</p>

        <div
          className="mt-xl rounded-3xl border-l-4 bg-white p-lg shadow-soft"
          style={{ borderColor: meta.hex }}
        >
          <h2 className="font-display text-headline-md">Ask yourself</h2>
          <ul className="mt-md space-y-2">
            {r.asks.map((a, i) => (
              <li key={i} className="flex gap-2 text-on-surface">
                <span style={{ color: meta.hex }}>◆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-lg grid gap-md md:grid-cols-[auto,1fr] md:items-start">
          <Amito state={meta.amito} size="md" />
          <div className="card">
            <h2 className="font-display text-headline-md">Why it works</h2>
            <p className="mt-2 text-on-surface-variant">{r.why}</p>
            <p
              className="mt-md rounded-2xl p-md font-bold"
              style={{ backgroundColor: `${meta.hex}1a`, color: meta.hex }}
            >
              {r.takeaway}
            </p>
          </div>
        </div>

        <div className="mt-xl flex items-center justify-between border-t border-on-surface/10 pt-lg">
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
