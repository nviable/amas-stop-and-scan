import type { CaseFile, ChoiceQuestion } from "./caseTypes";

export type ScanKey = "source" | "content" | "alignment";
export type StepScore = "good" | "partial" | "needs-work";
export type LessonPerformance = StepScore;

export const UNSURE_OPTION_ID = "not-sure-yet";
export const UNSURE_OPTION_LABEL = "I need more evidence before deciding";

export function scoreStep(question: ChoiceQuestion, selected: string[]): StepScore {
  if (!selected.length) return "needs-work";

  const flaggedIds = new Set(question.options.filter((o) => o.flag).map((o) => o.id));
  const selectedFlagged = selected.filter((id) => flaggedIds.has(id));
  const onlyUnsure = selected.length === 1 && selected[0] === UNSURE_OPTION_ID;

  if (onlyUnsure) return "partial";

  if (question.multi) {
    if (selectedFlagged.length >= Math.min(2, flaggedIds.size)) return "good";
    if (selectedFlagged.length >= 1) return "partial";
    return "needs-work";
  }

  if (selectedFlagged.length > 0) return "good";
  return "needs-work";
}

export function scoreLesson(
  data: CaseFile,
  choices: Partial<Record<ScanKey, string[]>>
): {
  performance: LessonPerformance;
  stepScores: Record<ScanKey, StepScore>;
} {
  const stepScores: Record<ScanKey, StepScore> = {
    source: scoreStep(data.source.question, choices.source ?? []),
    content: scoreStep(data.content.question, choices.content ?? []),
    alignment: scoreStep(data.alignment.question, choices.alignment ?? []),
  };

  const values = Object.values(stepScores);
  if (values.every((s) => s === "good")) {
    return { performance: "good", stepScores };
  }
  if (values.some((s) => s === "needs-work")) {
    return { performance: "needs-work", stepScores };
  }
  return { performance: "partial", stepScores };
}

const STEP_FOCUS: Record<ScanKey, string> = {
  source: "tracing who created the content — not just who shared it",
  content: "spotting pressure signals in the claim itself",
  alignment: "checking whether independent sources confirm or warn about the claim",
};

export function stepFeedback(key: ScanKey, score: StepScore): string | null {
  if (score === "good") return null;
  if (score === "partial") {
    return `You paused honestly on ${STEP_FOCUS[key]}, but try naming more concrete signals next time.`;
  }
  return `Focus on ${STEP_FOCUS[key]} before deciding what to trust.`;
}

export function buildClosingFeedback(
  data: CaseFile,
  performance: LessonPerformance,
  stepScores: Record<ScanKey, StepScore>
): { headline: string; body: string; workOn: string[] } {
  const workOn = (["source", "content", "alignment"] as const)
    .map((key) => stepFeedback(key, stepScores[key]))
    .filter((line): line is string => Boolean(line));

  if (performance === "good") {
    return {
      headline: data.reflect.rewardMessage,
      body: "You connected your gut reaction to the evidence and chose a careful next step. That is the habit.",
      workOn: [],
    };
  }

  if (performance === "partial") {
    return {
      headline: "You slowed down — now sharpen what you look for.",
      body: "Pausing was the right move. A few signals still deserve a closer look before you would act or share.",
      workOn,
    };
  }

  return {
    headline: "Good that you paused — here is what to practice next.",
    body: "Slowing down matters, but some choices missed key signals in this case. Review the flagged options and try again.",
    workOn,
  };
}

export function performanceLabel(performance: LessonPerformance): string {
  switch (performance) {
    case "good":
      return "Strong scan";
    case "partial":
      return "Partial scan";
    case "needs-work":
      return "Needs practice";
  }
}
