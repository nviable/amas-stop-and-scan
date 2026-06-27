import type { ReflectionEntry } from "../context/JournalContext";

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function entryToMarkdown(entry: ReflectionEntry): string {
  const lines: string[] = [];
  const modeLabel =
    entry.mode === "learn"
      ? "Guided lesson"
      : entry.mode === "practice"
        ? "Practice case"
        : "Reflection";
  const hintsUsed = Object.entries(entry.hintsUsed ?? {})
    .filter(([, used]) => used)
    .map(([step]) => step);

  lines.push(`# My STOP&SCAN Reflection`);
  lines.push("");
  lines.push(`> A personal record of how my judgment changed as I checked the evidence.`);
  lines.push("");
  lines.push(`**Case:** ${entry.caseTitle}`);
  lines.push(`**Experience:** ${modeLabel}`);
  lines.push(`**Date:** ${fmtDate(entry.createdAt)}`);
  if (entry.performance) {
    lines.push(`**Scan result:** ${entry.performance.replace("-", " ")}`);
  }
  if (hintsUsed.length > 0) {
    lines.push(`**Hints used:** ${hintsUsed.join(", ")}`);
  }
  lines.push("");
  lines.push(`## What I felt first`);
  lines.push(`- My first reaction: ${entry.firstReaction || "—"}`);
  lines.push(`- What it made me feel: ${entry.firstFeeling || "—"}`);
  if (entry.notes.stop) {
    lines.push(`- Before checking: ${entry.notes.stop}`);
  }
  lines.push("");
  lines.push(`## What I noticed`);
  lines.push(`- Source signals: ${(entry.choices.source ?? []).join(", ") || "—"}`);
  lines.push(`- Pressure signals: ${(entry.choices.content ?? []).join(", ") || "—"}`);
  lines.push(`- Outside evidence: ${(entry.choices.alignment ?? []).join(", ") || "—"}`);
  lines.push("");
  lines.push(`## What changed my mind`);
  lines.push(`- After checking, I think: ${entry.finalThought || "—"}`);
  lines.push(`- The evidence that changed my mind: ${entry.changedBy || "—"}`);
  lines.push("");
  lines.push(`## What I'll do next`);
  if (entry.nextActions.length) {
    entry.nextActions.forEach((a) => lines.push(`- [x] ${a}`));
  } else {
    lines.push(`- —`);
  }
  lines.push("");
  lines.push(`---`);
  if (entry.feedbackHeadline) {
    lines.push(`*${entry.feedbackHeadline}*`);
    if (entry.feedbackBody) lines.push(`*${entry.feedbackBody}*`);
    if (entry.feedbackWorkOn?.length) {
      entry.feedbackWorkOn.forEach((line) => lines.push(`- ${line}`));
    }
  } else {
    lines.push(`*You slowed down when the post wanted speed. That is the habit.*`);
  }
  return lines.join("\n");
}

export function downloadMarkdown(entry: ReflectionEntry) {
  const md = entryToMarkdown(entry);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stopscan-reflection-${entry.caseId}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printEntry() {
  window.print();
}
