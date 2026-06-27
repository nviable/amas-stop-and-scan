import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseFile, ChoiceQuestion } from "../../lib/caseTypes";
import { STEPS } from "../../lib/framework";
import {
  buildClosingFeedback,
  performanceLabel,
  scoreLesson,
  type StepScore,
  UNSURE_OPTION_ID,
  UNSURE_OPTION_LABEL,
} from "../../lib/lessonScoring";
import { useJournal, type ReflectionEntry } from "../../context/JournalContext";
import AmitoSays from "../AmitoSays";
import Amito from "../Amito";
import Icon from "../ui/Icon";
import StepProgress from "./StepProgress";
import ChoiceGroup from "./ChoiceGroup";
import {
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
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [activeFindingIcon, setActiveFindingIcon] = useState<string | null>(null);

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

  const lessonScore = useMemo(
    () =>
      scoreLesson(data, {
        source: sourceChoice,
        content: contentChoice,
        alignment: alignmentChoice,
      }),
    [data, sourceChoice, contentChoice, alignmentChoice]
  );

  const closingFeedback = useMemo(
    () =>
      buildClosingFeedback(
        data,
        lessonScore.performance,
        lessonScore.stepScores
      ),
    [data, lessonScore]
  );

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
    performance: lessonScore.performance,
    stepScores: lessonScore.stepScores,
    feedbackHeadline: closingFeedback.headline,
    feedbackBody: closingFeedback.body,
    feedbackWorkOn: closingFeedback.workOn,
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
    if (screen !== 2) {
      setCommentsExpanded(false);
      setActiveFindingIcon(null);
    }
    setScreen((s) => Math.min(5, (s + 1) as Screen) as Screen);
  };

  const finish = () => {
    upsertEntry(buildEntry(true));
    navigate(`/journal/${idRef.current}`);
  };

  const retake = () => {
    idRef.current = newEntryId();
    setScreen(1);
    setRevealed(false);
    setHintedSteps({});
    setFirstReaction("");
    setFirstFeeling("");
    setStopNote("");
    setSourceChoice([]);
    setContentChoice([]);
    setAlignmentChoice([]);
    setFinalThought("");
    setChangedBy("");
    setNextActions([]);
    setCommentsExpanded(false);
    setActiveFindingIcon(null);
  };

  const step = STEPS[screen - 1];

  return (
    <div className="px-margin-mobile pb-xxl pt-4 md:px-margin-desktop">
      <div className="mb-lg">
        <StepProgress index={screen} />
      </div>

      <div className="mx-auto max-w-container-max">
        <div className="mb-lg text-center">
          <span
            className="inline-block rounded-full px-lg py-1 font-label-md font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: step.hex }}
          >
            {step.letter} · {step.title}
          </span>
          <p className="mt-2 text-body-lg text-on-surface-variant">{step.tagline}</p>
        </div>

        <div className="grid grid-cols-1 gap-xl lg:grid-cols-12 lg:items-start">
          {/* The post under evaluation stays visible through every step */}
          <aside className="space-y-sm lg:sticky lg:top-24 lg:col-span-5">
            <p className="font-label-md uppercase tracking-widest text-on-surface-variant">
              The post you&apos;re evaluating
            </p>
            <PostCard
              post={data.post}
              highlight={screen === 3 && (isLearn || revealed)}
              comments={screen >= 2 ? data.comments : undefined}
              commentsExpanded={commentsExpanded}
              onCommentsToggle={
                screen >= 2 ? () => setCommentsExpanded((open) => !open) : undefined
              }
              revealCommentSignals={
                screen >= 2 && (isLearn || revealed || commentsExpanded)
              }
              promptComments={
                screen === 2 && !commentsExpanded && data.comments.length > 0
              }
            />
            {screen === 2 && !commentsExpanded && (
              <p className="text-xs text-on-surface-variant">
                Tap the comment count or the comments finding to inspect replies on this post.
              </p>
            )}
            {screen === 3 && (isLearn || revealed) && (
              <p className="text-xs italic text-on-surface-variant">
                Highlighted phrases show where the post is applying pressure.
              </p>
            )}
          </aside>

          {/* Amito's guidance, the step's evidence, and the interaction */}
          <div className="space-y-lg lg:col-span-7">
            <AmitoSays state={step.amito}>{guideMessage(data, mode, screen)}</AmitoSays>

            {/* SCREEN 1 — STOP / gut check */}
            {screen === 1 && (
              <div className="space-y-xl rounded-[32px] border border-on-surface/5 bg-surface-cream/50 p-xl">
                <div>
                  <p className="font-display text-headline-md">What is your gut reaction?</p>
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
                </div>

                <div>
                  <p className="font-display text-headline-md">What did it make you feel?</p>
                  <div className="mt-3 flex flex-wrap gap-sm">
                    {data.gutCheck.feelingOptions.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFirstFeeling(f)}
                        className={`rounded-full border-2 px-lg py-sm text-sm font-bold transition-colors ${
                          firstFeeling === f
                            ? "border-lilac-accent bg-lilac-accent text-white"
                            : "border-outline-variant text-on-surface-variant hover:border-lilac-accent hover:bg-lilac-accent/10"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-display text-headline-md">
                    Before checking, I felt…
                  </label>
                  <textarea
                    value={stopNote}
                    onChange={(e) => setStopNote(e.target.value)}
                    rows={3}
                    placeholder="I felt ______ because ______."
                    className="mt-2 w-full resize-none rounded-2xl border border-on-surface/10 bg-white p-lg font-body outline-none focus:border-lilac-accent focus:ring-lilac-accent"
                  />
                </div>
              </div>
            )}

            {/* SCREEN 2 — SOURCE */}
            {screen === 2 && (
              <>
                <SourceFindings
                  findings={data.source.findings}
                  showDetails={isLearn || revealed}
                  activeFindingIcon={activeFindingIcon}
                  onFindingActivate={(finding) => {
                    if (finding.icon === "chat") {
                      setActiveFindingIcon("chat");
                      setCommentsExpanded(true);
                    }
                  }}
                />
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
              </>
            )}

            {/* SCREEN 3 — CONTENT */}
            {screen === 3 && (
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
            )}

            {/* SCREEN 4 — ALIGNMENT */}
            {screen === 4 && (
              <>
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
              </>
            )}

            {/* SCREEN 5 — NOW REFLECT */}
            {screen === 5 && (
              <>
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
                    score={lessonScore.stepScores.source}
                    insight={data.source.question.insight}
                  />
                  <StepReview
                    title="Content"
                    question={data.content.question}
                    selected={contentChoice}
                    hinted={Boolean(hintedSteps.content)}
                    score={lessonScore.stepScores.content}
                    insight={data.content.question.insight}
                  />
                  <StepReview
                    title="Alignment"
                    question={data.alignment.question}
                    selected={alignmentChoice}
                    hinted={Boolean(hintedSteps.alignment)}
                    score={lessonScore.stepScores.alignment}
                    insight={data.alignment.question.insight}
                  />
                </div>
              </div>
            )}

            {isLearn && (
              <div className="card">
                <p className="font-display text-lg font-bold">How your scan went</p>
                <div className="mt-4 space-y-3">
                  <StepReview
                    title="Source"
                    question={data.source.question}
                    selected={sourceChoice}
                    hinted={false}
                    score={lessonScore.stepScores.source}
                    insight={data.source.question.insight}
                  />
                  <StepReview
                    title="Content"
                    question={data.content.question}
                    selected={contentChoice}
                    hinted={false}
                    score={lessonScore.stepScores.content}
                    insight={data.content.question.insight}
                  />
                  <StepReview
                    title="Alignment"
                    question={data.alignment.question}
                    selected={alignmentChoice}
                    hinted={false}
                    score={lessonScore.stepScores.alignment}
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

            <div
              className={`card flex flex-col items-center gap-3 text-center ${
                lessonScore.performance === "good"
                  ? "bg-alignment/5"
                  : lessonScore.performance === "partial"
                    ? "bg-reflect-orange/5"
                    : "bg-stop-red/5"
              }`}
            >
              <Amito
                state={lessonScore.performance === "good" ? "reward" : "reflect"}
                size="md"
                float
              />
              <span
                className={`rounded-full px-md py-xs font-label-md uppercase tracking-wide ${
                  lessonScore.performance === "good"
                    ? "bg-content-green/15 text-content-green"
                    : lessonScore.performance === "partial"
                      ? "bg-reflect-orange/15 text-reflect-orange"
                      : "bg-stop-red/15 text-stop-red"
                }`}
              >
                {performanceLabel(lessonScore.performance)}
              </span>
              <p className="font-display text-xl font-extrabold">{closingFeedback.headline}</p>
              <p className="max-w-md text-sm text-ink/70">{closingFeedback.body}</p>
              {closingFeedback.workOn.length > 0 && (
                <ul className="max-w-md space-y-2 text-left text-sm text-ink/80">
                  {closingFeedback.workOn.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-reflect-orange">→</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
              </>
            )}
          </div>
        </div>

        {/* Nav controls */}
        <div className="mt-xl flex items-center justify-between gap-lg border-t border-on-surface/5 pt-lg no-print">
          <button
            type="button"
            onClick={() => {
              setRevealed(false);
              setScreen((s) => Math.max(1, (s - 1) as Screen) as Screen);
            }}
            disabled={screen === 1}
            className="inline-flex items-center gap-xs rounded-full border border-on-surface/10 px-xl py-sm font-bold text-on-surface-variant transition-colors hover:bg-on-surface/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="arrow_back" className="text-sm" />
            Back
          </button>

          <div className="flex flex-col items-end gap-xs">
            <div className="flex gap-sm">
              {currentScanKey && !revealed && (
                <button
                  type="button"
                  onClick={revealFeedback}
                  disabled={isLearn && !hasCurrentChoice}
                  className="rounded-full border border-on-surface/10 px-lg py-sm font-bold text-on-surface-variant transition-colors hover:bg-on-surface/5 disabled:opacity-40"
                >
                  {isLearn ? "Check my answer" : "Show hint"}
                </button>
              )}
              {screen < 5 ? (
                <button
                  type="button"
                  onClick={advance}
                  disabled={!canContinue}
                  className="inline-flex items-center gap-xs rounded-full bg-primary px-xxl py-sm font-bold text-on-primary shadow-md transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:bg-outline-variant disabled:opacity-50"
                >
                  Continue
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              ) : (
                <div className="flex flex-wrap justify-end gap-sm">
                  {lessonScore.performance !== "good" && (
                    <button
                      type="button"
                      onClick={retake}
                      className="inline-flex items-center gap-xs rounded-full border-2 border-primary px-xl py-sm font-bold text-primary transition-colors hover:bg-primary/5"
                    >
                      Try again
                      <Icon name="history" className="text-sm" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={finish}
                    className={`inline-flex items-center gap-xs rounded-full px-xxl py-sm font-bold shadow-md transition-all hover:brightness-105 ${
                      lessonScore.performance === "good"
                        ? "bg-secondary-container text-on-secondary-container"
                        : "border border-on-surface/10 bg-white text-on-surface-variant"
                    }`}
                  >
                    {lessonScore.performance === "good"
                      ? "Save to my Journal"
                      : "Save attempt anyway"}
                    <Icon name="bookmark" className="text-sm" />
                  </button>
                </div>
              )}
            </div>
            {!canContinue && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-outline-variant">
                {screen === 1
                  ? "Pick a reaction to proceed"
                  : isLearn && hasCurrentChoice && !revealed
                    ? "Check your answer to continue"
                    : "Choose a signal to proceed"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepReview({
  title,
  question,
  selected,
  hinted,
  score,
  insight,
}: {
  title: string;
  question: ChoiceQuestion;
  selected: string[];
  hinted: boolean;
  score: StepScore;
  insight?: string;
}) {
  const picked = selectedLabels(question, selected);
  const flagged = flaggedLabels(question);
  const scoreStyle =
    score === "good"
      ? "text-content-green"
      : score === "partial"
        ? "text-reflect-orange"
        : "text-stop-red";

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display font-bold">{title}</p>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold uppercase ${scoreStyle}`}>
            {performanceLabel(score)}
          </span>
          {hinted && (
            <span className="rounded-full bg-alignment/10 px-2 py-0.5 text-xs font-bold text-alignment">
              hint used
            </span>
          )}
        </div>
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
