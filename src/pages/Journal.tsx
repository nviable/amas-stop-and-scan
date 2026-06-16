import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import Amito from "../components/Amito";
import { useJournal, type ReflectionEntry } from "../context/JournalContext";
import { downloadMarkdown, printEntry } from "../lib/export";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function EntryView({ entry }: { entry: ReflectionEntry }) {
  const modeLabel =
    entry.mode === "learn"
      ? "Guided lesson"
      : entry.mode === "practice"
        ? "Practice case"
        : "Reflection";
  const hintsUsed = Object.entries(entry.hintsUsed ?? {})
    .filter(([, used]) => used)
    .map(([step]) => step);

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between no-print">
          <Link to="/journal" className="text-sm font-bold text-ink/50 hover:text-ink">
            ← All reflections
          </Link>
          <div className="flex gap-2">
            <button onClick={() => downloadMarkdown(entry)} className="btn-ghost px-4 py-2 text-sm">
              Export Markdown
            </button>
            <button onClick={printEntry} className="btn-primary px-4 py-2 text-sm">
              Print / PDF
            </button>
          </div>
        </div>

        <article className="print-page rounded-3xl border border-ink/15 bg-cream p-8 shadow-soft">
          <header className="border-b border-ink/15 pb-4">
            <h1 className="font-hand text-3xl">My STOP&SCAN Reflection</h1>
            <p className="mt-1 text-ink/60">
              A personal record of how my judgment changed as I checked the
              evidence.
            </p>
            <p className="mt-2 text-sm text-ink/50">
              {entry.caseTitle} · {modeLabel} · {fmt(entry.createdAt)}
            </p>
            {hintsUsed.length > 0 && (
              <p className="mt-1 text-sm font-semibold text-alignment">
                Hints used: {hintsUsed.join(", ")}
              </p>
            )}
          </header>

          <Section color="#ef4a6b" tab="What I felt first">
            <p>
              <span className="text-ink/55">My first reaction:</span>{" "}
              <strong>{entry.firstReaction || "—"}</strong>
            </p>
            <p>
              <span className="text-ink/55">It made me feel:</span>{" "}
              <strong>{entry.firstFeeling || "—"}</strong>
            </p>
            {entry.notes.stop && (
              <p className="mt-1 italic text-ink/70">"{entry.notes.stop}"</p>
            )}
          </Section>

          <Section color="#22b8cf" tab="What I noticed">
            <Bullet label="Source signals" items={entry.choices.source} />
            <Bullet label="Pressure signals" items={entry.choices.content} />
            <Bullet label="Outside evidence" items={entry.choices.alignment} />
          </Section>

          <Section color="#ff922b" tab="What changed my mind">
            <p>
              <span className="text-ink/55">After checking, I think:</span>{" "}
              <strong>{entry.finalThought || "—"}</strong>
            </p>
            <p className="mt-1">
              <span className="text-ink/55">The evidence that changed my mind:</span>{" "}
              <strong>{entry.changedBy || "—"}</strong>
            </p>
          </Section>

          <Section color="#37b24d" tab="What I'll do next">
            {entry.nextActions.length ? (
              <ul className="space-y-1">
                {entry.nextActions.map((a) => (
                  <li key={a}>
                    <span className="text-content">✔</span> {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink/55">—</p>
            )}
          </Section>

          <footer className="mt-6 flex items-center gap-3 border-t border-ink/15 pt-4">
            <Amito state="reward" size="sm" />
            <p className="font-hand text-xl">
              You slowed down when the post wanted speed. That is the habit.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

function Section({
  color,
  tab,
  children,
}: {
  color: string;
  tab: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <span
        className="inline-block rounded-md px-2 py-0.5 font-hand text-lg text-white"
        style={{ backgroundColor: color }}
      >
        {tab}
      </span>
      <div className="mt-2 space-y-1 leading-relaxed">{children}</div>
    </section>
  );
}

function Bullet({ label, items }: { label: string; items?: string[] }) {
  return (
    <p>
      <span className="text-ink/55">{label}:</span>{" "}
      <strong>{items && items.length ? items.join(", ") : "—"}</strong>
    </p>
  );
}

export default function Journal() {
  const { id } = useParams();
  const { entries, getEntry, deleteEntry } = useJournal();

  if (id) {
    const entry = getEntry(id);
    if (entry) return <EntryView entry={entry} />;
  }

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">My Journal</h1>
          <p className="mt-2 max-w-xl text-ink/70">
            Your saved reflections live here, on this device. Each one captures
            how your judgment changed from gut reaction to final decision.
          </p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-3 py-14 text-center">
          <Amito state="reflect" size="lg" float />
          <h2 className="font-display text-2xl font-extrabold">
            No reflections yet
          </h2>
          <p className="max-w-md text-ink/60">
            Run through a guided lesson or a case file, and your reflection will
            be saved here automatically.
          </p>
          <div className="mt-2 flex gap-3">
            <Link to="/learn" className="btn-primary">
              Start the lesson
            </Link>
            <Link to="/practice" className="btn-ghost">
              Browse case files
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <div key={e.id} className="card flex flex-col">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-ink/40">
                <span>{fmt(e.createdAt)}</span>
                {e.completed ? (
                  <span className="text-content">✔ complete</span>
                ) : (
                  <span className="text-reflect">in progress</span>
                )}
              </div>
              <h3 className="mt-1 font-display text-lg font-extrabold">
                {e.caseTitle}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/40">
                {e.mode === "learn"
                  ? "Guided lesson"
                  : e.mode === "practice"
                    ? "Practice case"
                    : "Reflection"}
              </p>
              <p className="mt-1 flex-1 text-sm text-ink/60">
                Felt <strong>{e.firstFeeling || "—"}</strong> →{" "}
                {e.nextActions.length
                  ? `decided to ${e.nextActions.length} action(s)`
                  : "no decision yet"}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Link
                  to={`/journal/${e.id}`}
                  className="font-bold text-alignment hover:underline"
                >
                  Open →
                </Link>
                <button
                  onClick={() => deleteEntry(e.id)}
                  className="ml-auto text-sm text-ink/40 hover:text-stop"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
