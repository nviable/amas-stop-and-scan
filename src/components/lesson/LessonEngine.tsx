import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseFile, ChoiceQuestion } from "../../lib/caseTypes";
import { STEPS } from "../../lib/framework";
import { useJournal, type ReflectionEntry } from "../../context/JournalContext";
import AmitoSays from "../AmitoSays";
import Amito from "../Amito";
import StepProgress from "./StepProgress";
import ChoiceGroup from "./ChoiceGroup";
import {
  CommentList,
  PostCard,
  SearchResults,
  SourceFindings,
} from "../case/CaseMedia";

type Screen = 1 | 2 | 3 | 4 | 5;
type LessonMode = "learn" | "practice";
type ScanKey = "source" | "content" | "alignment";

const SCAN_STEP_KEY: Record<2 | 3 | 4, ScanKey> = {
  2: "source",
  3: "content",
  4: "alignment",
};

const UNSURE_OPTION_ID = "not-sure-yet";
const UNSURE_OPTION_LABEL = "I need more evidence before deciding";

function guideMessage(data: CaseFile, mode: LessonMode, screen: Screen) {
  if (mode === "learn") {
    switch (screen) {
      case 1:
        return `Before we investigate, let's catch your first reaction. ${data.stop.message}`;
      case 2:
        return data.source.message;
      case 3:
        return data.content.message;
      case 4:
        return data.alignment.message;
      case 5:
        return data.reflect.message;
    }
  }

  switch (screen) {
    case 1:
      return "Name your first reaction before checking the evidence. That gives you an honest baseline to compare against later.";
    case 2:
      return "Scan the source first. Decide what you notice before opening a hint.";
    case 3:
      return "Scan the post itself. Pick the pressure or content signals you notice.";
    case 4:
      return "Compare the claim with outside evidence. Decide what the wider evidence supports.";
    case 5:
      return "Review your first reaction, your choices, and what you would do next.";
  }
}

function selectedLabels(question: ChoiceQuestion, selected: string[]) {
  return selected.map((id) => {
    if (id === UNSURE_OPTION_ID) return UNSURE_OPTION_LABEL;
    return question.options.find((opt) => opt.id === id)?.label ?? id;
  });
}

function flaggedLabels(question: ChoiceQuestion) {
  return question.options.filter((opt) => opt.flag).map((opt) => opt.label);
}

export default function LessonEngine({
  data,
  mode = "practice",
}: {
  data: CaseFile;
  mode?: LessonMode;
}) {
  const navigate = useNavigate();
  const { upsertEntry, newEntryId } = useJournal();
  const idRef = useRef<string>(newEntryId());
  const [screen, setScreen] = useState<Screen>(1);
  const [revealed, setRevealed] = useState(false);
  const [hintedSteps, setHintedSteps] = useState<
    Partial<Record<ScanKey, boolean>>
  >({});

  const [firstReaction, setFirstReaction] = useState("");
  const [firstFeeling, setFirstFeeling] = useState("");
  const [stopNote, setStopNote] = useState("");
  const [sourceChoice, setSourceChoice] = useState<string[]>([]);
  const [contentChoice, setContentChoice] = useState<string[]>([]);
  const [alignmentChoice, setAlignmentChoice] = useState<string[]>([]);
  const [finalThought, setFinalThought] = useState("");
  const [changedBy, setChangedBy] = useState("");
  const [nextActions, setNextActions] = useState<string[]>([]);

  const isLearn = mode === "learn";
  const currentScanKey =
    screen >= 2 && screen <= 4 ? SCAN_STEP_KEY[screen as 2 | 3 | 4] : null;
  const currentChoice =
    screen === 2
      ? sourceChoice
      : screen === 3
        ? contentChoice
        : screen === 4
          ? alignmentChoice
          : [];
  const hasCurrentChoice = currentChoice.length > 0;

  const buildEntry = (completed: boolean): ReflectionEntry => ({
    id: idRef.current,
    caseId: data.id,
    caseTitle: data.title,
    mode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completed,
    firstReaction,
    firstFeeling,
    notes: { stop: stopNote },
    choices: {
      source: sourceChoice,
      content: contentChoice,
      alignment: alignmentChoice,
    },
    finalThought,
    changedBy,
    nextActions,
    hintsUsed: hintedSteps,
  });

  const canContinue = useMemo(() => {
    switch (screen) {
      case 1:
        return Boolean(firstReaction && firstFeeling);
      case 2:
        return sourceChoice.length > 0 && (!isLearn || revealed);
      case 3:
        return contentChoice.length > 0 && (!isLearn || revealed);
      case 4:
        return alignmentChoice.length > 0 && (!isLearn || revealed);
      default:
        return true;
    }
  }, [
    screen,
    firstReaction,
    firstFeeling,
    sourceChoice,
    contentChoice,
    alignmentChoice,
    isLearn,
    revealed,
  ]);

  const revealFeedback = () => {
    if (currentScanKey && !isLearn) {
      setHintedSteps((prev) => ({ ...prev, [currentScanKey]: true }));
    }
    setRevealed(true);
  };

  const advance = () => {
    upsertEntry(buildEntry(false));
    setRevealed(false);
    setScreen((s) => Math.min(5, (s + 1) as Screen) as Screen);
  };

  const finish = () => {
    upsertEntry(buildEntry(true));
    navigate(`/journal/${idRef.current}`);
  };

  const step = STEPS[screen - 1];

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <StepProgress index={screen} />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-5 text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-extrabold text-white"
            style={{ backgroundColor: step.hex }}
          >
            {step.letter} · {step.title}
          </span>
          <p className="mt-2 text-ink/60">{step.tagline}</p>
        </div>

        {/* SCREEN 1 — STOP / gut check */}
        {screen === 1 && (
          <div className="space-y-5">
            <PostCard post={data.post} />
            <AmitoSays state="stop">{guideMessage(data, mode, screen)}</AmitoSays>

            <div className="card">
              <p className="font-display text-lg font-bold">
                What is your gut reaction?
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {data.gutCheck.reactionOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFirstReaction(opt)}
                    className={`option ${firstReaction === opt ? "option-selected" : ""}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <p className="mt-5 font-display text-lg font-bold">
                What did it make you feel?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.gutCheck.feelingOptions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFirstFeeling(f)}
                    className={`chip ${
                      firstFeeling === f
                        ? "border-stop bg-stop/10 text-stop"
                        : ""
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <label className="mt-5 block font-display text-lg font-bold">
                Before checking, I felt…
              </label>
              <textarea
                value={stopNote}
                onChange={(e) => setStopNote(e.target.value)}
                rows={2}
                placeholder="I felt ______ because ______."
                className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream/40 p-3 font-body outline-none focus:border-stop"
              />
            </div>
          </div>
        )}

        {/* SCREEN 2 — SOURCE */}
        {screen === 2 && (
          <div className="space-y-5">
            <AmitoSays state="source">{guideMessage(data, mode, screen)}</AmitoSays>
            <SourceFindings
              findings={data.source.findings}
              showDetails={isLearn || revealed}
            />
            <div className="card">
              <CommentList comments={data.comments} revealSignals={isLearn || revealed} />
            </div>
            <div className="card">
              <ChoiceGroup
                question={data.source.question}
                selected={sourceChoice}
                onChange={setSourceChoice}
                revealed={revealed}
                includeUnsure
              />
              {revealed && data.source.question.insight && (
                <p className="mt-3 rounded-2xl bg-source/10 p-3 text-sm font-semibold text-source">
                  <span className="font-extrabold">
                    {isLearn ? "Amito feedback:" : "Hint:"}
                  </span>{" "}
                  {data.source.question.insight}
                </p>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 3 — CONTENT */}
        {screen === 3 && (
          <div className="space-y-5">
            <AmitoSays state="content">{guideMessage(data, mode, screen)}</AmitoSays>
            <PostCard post={data.post} highlight={isLearn || revealed} />
            <div className="card">
              <ChoiceGroup
                question={data.content.question}
                selected={contentChoice}
                onChange={setContentChoice}
                revealed={revealed}
                includeUnsure
              />
              {revealed && data.content.question.insight && (
                <p className="mt-3 rounded-2xl bg-content/10 p-3 text-sm font-semibold text-content">
                  <span className="font-extrabold">
                    {isLearn ? "Amito feedback:" : "Hint:"}
                  </span>{" "}
                  {data.content.question.insight}
                </p>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 4 — ALIGNMENT */}
        {screen === 4 && (
          <div className="space-y-5">
            <AmitoSays state="alignment">{guideMessage(data, mode, screen)}</AmitoSays>
            <SearchResults
              results={data.alignment.results}
              showSignals={isLearn || revealed}
            />
            <div className="card">
              <ChoiceGroup
                question={data.alignment.question}
                selected={alignmentChoice}
                onChange={setAlignmentChoice}
                revealed={revealed}
                includeUnsure
              />
              {revealed && data.alignment.question.insight && (
                <p className="mt-3 rounded-2xl bg-alignment/10 p-3 text-sm font-semibold text-alignment">
                  <span className="font-extrabold">
                    {isLearn ? "Amito feedback:" : "Hint:"}
                  </span>{" "}
                  {data.alignment.question.insight}
                </p>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 5 — NOW REFLECT */}
        {screen === 5 && (
          <div className="space-y-5">
            <AmitoSays state="reflect">{guideMessage(data, mode, screen)}</AmitoSays>

            <div className="card grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stop/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-stop">
                  At first, I felt
                </div>
                <p className="mt-1 font-semibold">
                  {firstReaction || "—"}
                  {firstFeeling ? ` · ${firstFeeling}` : ""}
                </p>
                {stopNote && (
                  <p className="mt-1 text-sm text-ink/60">"{stopNote}"</p>
                )}
              </div>
              <div className="rounded-2xl bg-reflect/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-reflect">
                  After checking, I think
                </div>
                <textarea
                  value={finalThought}
                  onChange={(e) => setFinalThought(e.target.value)}
                  rows={2}
                  placeholder="Now I think…"
                  className="mt-1 w-full rounded-xl border-2 border-ink/10 bg-white p-2 text-sm outline-none focus:border-reflect"
                />
              </div>
            </div>

            {!isLearn && (
              <div className="card">
                <p className="font-display text-lg font-bold">
                  Practice review
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  Feedback was delayed while you practiced. Compare what you
                  selected with the signals Amito would double-check.
                </p>
                <div className="mt-4 space-y-3">
                  <StepReview
                    title="Source"
                    question={data.source.question}
                    selected={sourceChoice}
                    hinted={Boolean(hintedSteps.source)}
                    insight={data.source.question.insight}
                  />
                  <StepReview
                    title="Content"
                    question={data.content.question}
                    selected={contentChoice}
                    hinted={Boolean(hintedSteps.content)}
                    insight={data.content.question.insight}
                  />
                  <StepReview
                    title="Alignment"
                    question={data.alignment.question}
                    selected={alignmentChoice}
                    hinted={Boolean(hintedSteps.alignment)}
                    insight={data.alignment.question.insight}
                  />
                </div>
              </div>
            )}

            <div className="card">
              <label className="block font-display text-lg font-bold">
                The evidence that changed my mind was…
              </label>
              <textarea
                value={changedBy}
                onChange={(e) => setChangedBy(e.target.value)}
                rows={2}
                placeholder="The signal or search result that shifted my judgment…"
                className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream/40 p-3 outline-none focus:border-reflect"
              />
            </div>

            <div className="card">
              <p className="font-display text-lg font-bold">My next action</p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {data.reflect.nextActions.map((a) => {
                  const sel = nextActions.includes(a.id);
                  const showRecommended = isLearn || nextActions.length > 0;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() =>
                        setNextActions((prev) =>
                          prev.includes(a.id)
                            ? prev.filter((x) => x !== a.id)
                            : [...prev, a.id]
                        )
                      }
                      className={`option ${sel ? "option-selected" : ""}`}
                    >
                      <span className="flex items-center justify-between">
                        <span>{a.label}</span>
                        {showRecommended && a.recommended && (
                          <span className="text-xs font-bold text-content">
                            recommended
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              {isLearn || nextActions.length > 0 ? (
                <p className="mt-3 text-sm text-ink/60">
                  Recommended outcome:{" "}
                  <span className="font-bold text-ink">
                    {data.reflect.recommendedOutcome}
                  </span>
                </p>
              ) : (
                <p className="mt-3 text-sm text-ink/60">
                  Choose your next action first; then compare it with the
                  recommended outcome.
                </p>
              )}
            </div>

            <div className="card flex flex-col items-center gap-3 bg-alignment/5 text-center">
              <Amito state="reward" size="md" float />
              <p className="font-display text-xl font-extrabold">
                {data.reflect.rewardMessage}
              </p>
              <p className="max-w-md text-sm text-ink/60">
                You didn't have to "catch a fake" to succeed. Slowing down when
                content wants speed is the whole habit — and "I don't know yet"
                is always a complete, honest answer.
              </p>
            </div>
          </div>
        )}

        {/* Nav controls */}
        <div className="mt-7 flex items-center justify-between gap-3 no-print">
          <button
            type="button"
            onClick={() => {
              setRevealed(false);
              setScreen((s) => Math.max(1, (s - 1) as Screen) as Screen);
            }}
            disabled={screen === 1}
            className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            {currentScanKey && !revealed && (
              <button
                type="button"
                onClick={revealFeedback}
                disabled={isLearn && !hasCurrentChoice}
                className="btn-ghost disabled:opacity-40"
              >
                {isLearn ? "Check my answer" : "Show hint"}
              </button>
            )}
            {screen < 5 ? (
              <button
                type="button"
                onClick={advance}
                disabled={!canContinue}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>
            ) : (
              <button type="button" onClick={finish} className="btn-accent">
                Save to my Journal
              </button>
            )}
          </div>
        </div>

        {/* helper hint */}
        {!canContinue && (
          <p className="mt-3 text-center text-sm text-ink/45 no-print">
            {screen === 1
              ? "Pick a gut reaction and a feeling to continue."
              : isLearn && hasCurrentChoice && !revealed
                ? "Check your answer to see Amito's feedback before continuing."
                : "Choose a signal, or choose that you need more evidence, to continue."}
          </p>
        )}
      </div>
    </div>
  );
}

function StepReview({
  title,
  question,
  selected,
  hinted,
  insight,
}: {
  title: string;
  question: ChoiceQuestion;
  selected: string[];
  hinted: boolean;
  insight?: string;
}) {
  const picked = selectedLabels(question, selected);
  const flagged = flaggedLabels(question);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display font-bold">{title}</p>
        {hinted && (
          <span className="rounded-full bg-alignment/10 px-2 py-0.5 text-xs font-bold text-alignment">
            hint used
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-ink/65">
        You picked:{" "}
        <span className="font-semibold text-ink">
          {picked.length ? picked.join(", ") : "—"}
        </span>
      </p>
      <p className="mt-1 text-sm text-ink/65">
        Amito would double-check:{" "}
        <span className="font-semibold text-ink">
          {flagged.length ? flagged.join(", ") : "whether the evidence is enough"}
        </span>
      </p>
      {hinted && insight && (
        <p className="mt-2 rounded-xl bg-alignment/10 p-2 text-sm font-semibold text-alignment">
          Extra note: {insight}
        </p>
      )}
    </div>
  );
}
