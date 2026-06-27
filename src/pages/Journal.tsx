import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import HeroSection from "../components/ui/HeroSection";
import Icon from "../components/ui/Icon";
import { HeroBadge } from "../components/ui/PageSections";
import { useJournal, type ReflectionEntry } from "../context/JournalContext";
import { downloadMarkdown, printEntry } from "../lib/export";
import { performanceLabel } from "../lib/lessonScoring";
import { AMITO_IMAGES } from "../lib/assets";

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
      ? "Guided Lesson"
      : entry.mode === "practice"
        ? "Practice Case"
        : "Reflection";

  const performance = entry.performance ?? "good";
  const footerMessage =
    entry.feedbackHeadline ??
    (performance === "good"
      ? "You slowed down when the post wanted speed. That is the habit."
      : "Keep practicing the scan — slowing down is still the first win.");

  const performanceStyle =
    performance === "good"
      ? "bg-content-green/15 text-content-green"
      : performance === "partial"
        ? "bg-reflect-orange/15 text-reflect-orange"
        : "bg-stop-red/15 text-stop-red";

  return (
    <div className="px-margin-mobile pb-xxl pt-8 md:px-margin-desktop">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between no-print">
          <Link to="/journal" className="font-label-md text-on-surface-variant hover:text-on-surface">
            ← All reflections
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => downloadMarkdown(entry)}
              className="btn-ghost px-4 py-2 text-sm"
            >
              Export Markdown
            </button>
            <button type="button" onClick={printEntry} className="btn-primary px-4 py-2 text-sm">
              Print / PDF
            </button>
          </div>
        </div>

        <article className="print-page rounded-xxl border border-on-surface/15 bg-surface-cream p-8 shadow-soft">
          <header className="border-b border-on-surface/15 pb-4">
            <h1 className="font-hand text-display-lg">My STOP&SCAN Reflection</h1>
            <p className="mt-1 text-on-surface-variant">
              A personal record of how my judgment changed as I checked the evidence.
            </p>
            <p className="mt-2 text-body-sm text-outline">
              {entry.caseTitle} · {modeLabel} · {fmt(entry.createdAt)}
            </p>
            {entry.performance && (
              <p className="mt-3">
                <span
                  className={`inline-flex rounded-full px-md py-xs font-label-md uppercase tracking-wide ${performanceStyle}`}
                >
                  {performanceLabel(entry.performance)}
                </span>
              </p>
            )}
          </header>

          <JournalSection color="#ef4a6b" tab="What I felt first">
            <p>
              <span className="text-on-surface-variant">My first reaction:</span>{" "}
              <strong>{entry.firstReaction || "—"}</strong>
            </p>
            <p>
              <span className="text-on-surface-variant">It made me feel:</span>{" "}
              <strong>{entry.firstFeeling || "—"}</strong>
            </p>
            {entry.notes.stop && (
              <p className="mt-1 italic text-on-surface-variant">&ldquo;{entry.notes.stop}&rdquo;</p>
            )}
          </JournalSection>

          <JournalSection color="#22b8cf" tab="What I noticed">
            <Bullet label="Source signals" items={entry.choices.source} />
            <Bullet label="Pressure signals" items={entry.choices.content} />
            <Bullet label="Outside evidence" items={entry.choices.alignment} />
          </JournalSection>

          <JournalSection color="#ff922b" tab="What changed my mind">
            <p>
              <span className="text-on-surface-variant">After checking, I think:</span>{" "}
              <strong>{entry.finalThought || "—"}</strong>
            </p>
            <p className="mt-1">
              <span className="text-on-surface-variant">The evidence that changed my mind:</span>{" "}
              <strong>{entry.changedBy || "—"}</strong>
            </p>
          </JournalSection>

          <JournalSection color="#37b24d" tab="What I'll do next">
            {entry.nextActions.length ? (
              <ul className="space-y-1">
                {entry.nextActions.map((a) => (
                  <li key={a}>
                    <span className="text-content-green">✔</span> {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-on-surface-variant">—</p>
            )}
          </JournalSection>

          <footer className="mt-6 flex items-start gap-3 border-t border-on-surface/15 pt-4">
            <img
              alt="Amito"
              className="h-16 w-16 shrink-0 object-contain"
              src={
                performance === "good"
                  ? AMITO_IMAGES.reward
                  : AMITO_IMAGES.reflect
              }
            />
            <div className="space-y-2">
              <p className="font-hand text-handwritten-lg text-on-surface">{footerMessage}</p>
              {entry.feedbackBody && performance !== "good" && (
                <p className="text-sm text-on-surface-variant">{entry.feedbackBody}</p>
              )}
              {entry.feedbackWorkOn && entry.feedbackWorkOn.length > 0 && (
                <ul className="space-y-1 text-sm text-on-surface-variant">
                  {entry.feedbackWorkOn.map((line) => (
                    <li key={line}>→ {line}</li>
                  ))}
                </ul>
              )}
              {performance !== "good" && entry.mode && (
                <Link
                  to={entry.mode === "learn" ? "/learn" : `/practice/${entry.caseId}`}
                  className="inline-flex items-center gap-xs font-label-md text-primary hover:underline"
                >
                  Try this case again
                  <Icon name="history" className="text-sm" />
                </Link>
              )}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

function JournalSection({
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
      <span className="text-on-surface-variant">{label}:</span>{" "}
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
    <div>
      <HeroSection className="overflow-visible px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max flex-col items-center gap-xxl md:flex-row">
          <div className="relative flex w-full justify-center md:w-1/3">
            <div className="absolute inset-0 scale-75 animate-pulse rounded-full bg-lilac-accent/10 blur-3xl" />
            <img
              alt="Amito reflective pose"
              className="relative z-10 h-64 w-64 object-contain md:h-80 md:w-80"
              src={AMITO_IMAGES.reflect}
            />
          </div>
          <div className="w-full space-y-lg md:w-2/3">
            <HeroBadge icon="bookmark" label="My Journal" />
            <h1 className="font-display text-display-xl text-on-background">My Reflection Journal</h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              Track your journey through the STOP&SCAN framework and see how your digital
              judgment evolves over time. Entries are saved on this device.
            </p>
            {entries.length > 0 && (
              <div className="flex gap-md">
                <div className="flex items-center gap-sm rounded-xl bg-white/80 px-lg py-sm hairline-border">
                  <Icon name="history" className="text-primary" />
                  <span className="font-label-md">{entries.length} Saved Entries</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </HeroSection>

      <div className="px-margin-mobile pb-xxl md:px-margin-desktop">
      <div className="mx-auto max-w-container-max">

        {entries.length === 0 ? (
          <div className="flex flex-col items-center gap-lg py-xxl text-center">
            <img alt="" className="h-48 w-48 opacity-50 grayscale" src={AMITO_IMAGES.reflect} />
            <div className="max-w-md space-y-sm">
              <h2 className="font-display text-headline-md">Your journal is waiting!</h2>
              <p className="text-body-md text-on-surface-variant">
                Run through a guided lesson or a case file, and your reflection will be saved
                here automatically.
              </p>
            </div>
            <div className="flex gap-md">
              <Link to="/learn" className="btn-primary">
                Start the lesson
              </Link>
              <Link to="/practice" className="btn-ghost">
                Browse case files
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-xl flex items-center justify-between">
              <h2 className="font-display text-headline-md">Recent Reflections</h2>
            </div>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
              {entries.map((e) => (
                <div
                  key={e.id}
                  className="aura-glow flex flex-col rounded-xxl bg-white p-lg hairline-border transition-transform hover:-translate-y-1"
                >
                  <div className="mb-md flex items-start justify-between">
                    <span className="text-body-sm text-outline">{fmt(e.createdAt)}</span>
                    <span
                      className={`rounded-lg px-sm py-1 font-label-md ${
                        e.mode === "learn"
                          ? "bg-primary-fixed text-on-primary-fixed-variant"
                          : "bg-surface-variant text-on-surface"
                      }`}
                    >
                      {e.mode === "learn" ? "Guided Lesson" : "Practice Case"}
                    </span>
                  </div>
                  <h3 className="mb-md font-display text-headline-md">{e.caseTitle}</h3>
                  <div className="mb-lg space-y-sm rounded-xl bg-surface-container-low p-md">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Scan result</span>
                      <span className="font-bold">
                        {e.performance ? performanceLabel(e.performance) : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Initial reaction</span>
                      <span className="font-bold text-stop-red">{e.firstFeeling || "—"}</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Next actions</span>
                      <span className="font-bold text-content-green">
                        {e.nextActions.length ? `${e.nextActions.length} chosen` : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/journal/${e.id}`}
                      className="flex items-center gap-xs font-label-md font-bold text-primary"
                    >
                      OPEN ENTRY <Icon name="chevron_right" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteEntry(e.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                    >
                      <Icon name="delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
