import { useState } from "react";
import { Link } from "react-router-dom";
import Amito from "../components/Amito";
import LessonEngine from "../components/lesson/LessonEngine";
import { getCaseBySlug } from "../data/cases";
import { STEPS } from "../lib/framework";

export default function Learn() {
  const [started, setStarted] = useState(false);
  const data = getCaseBySlug("celebrity-investment-scam");

  if (!data) return null;

  if (started) return <LessonEngine data={data} mode="learn" />;

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl text-center">
        <Amito state="greeting" size="lg" float className="mx-auto" />
        <h1 className="mt-4 font-display text-4xl font-extrabold">
          Learn STOP&SCAN
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink/70">
          We'll walk through one real-world example together. You'll register a
          gut reaction first, then scan the evidence, then reflect on what
          changed. There are no wrong answers — the goal is the habit of slowing
          down.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.key} className="card text-left">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-extrabold text-white"
                style={{ backgroundColor: s.hex }}
              >
                {s.letter}
              </div>
              <div className="mt-2 font-display font-bold">{s.title}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => setStarted(true)} className="btn-primary">
            Start the guided lesson →
          </button>
          <Link to="/resources" className="btn-ghost">
            Read the framework first
          </Link>
        </div>
        <p className="mt-3 text-sm text-ink/50">
          Today's example: {data.title} · about {data.estMinutes} minutes
        </p>
      </div>
    </div>
  );
}
