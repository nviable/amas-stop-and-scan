export type StepKey = "stop" | "source" | "content" | "alignment" | "reflect";

export type AmitoState =
  | "greeting"
  | "stop"
  | "source"
  | "content"
  | "alignment"
  | "reflect"
  | "reward";

export interface StepMeta {
  key: StepKey;
  letter: string;
  title: string;
  tagline: string;
  /** Tailwind text color class for the accent */
  color: string;
  /** raw hex for inline glows */
  hex: string;
  amito: AmitoState;
  cue: string;
}

/**
 * The five stages of STOP&SCAN.
 * STOP is the pre-commitment gut check; S/C/A/N spell SCAN.
 * The final stage keeps the user-facing label "Now Reflect" while
 * preserving the framework's "uncertainty is a valid outcome" idea.
 */
export const STEPS: StepMeta[] = [
  {
    key: "stop",
    letter: "STOP",
    title: "Stop",
    tagline: "Pause and register your gut reaction.",
    color: "text-stop",
    hex: "#ef4a6b",
    amito: "stop",
    cue: "Pink-red torso glow",
  },
  {
    key: "source",
    letter: "S",
    title: "Source",
    tagline: "Who is really behind this?",
    color: "text-source",
    hex: "#22b8cf",
    amito: "source",
    cue: "Cyan right cuff",
  },
  {
    key: "content",
    letter: "C",
    title: "Content",
    tagline: "Does what you see actually hold up?",
    color: "text-content",
    hex: "#37b24d",
    amito: "content",
    cue: "Green left cuff",
  },
  {
    key: "alignment",
    letter: "A",
    title: "Alignment",
    tagline: "Does everything fit together?",
    color: "text-alignment",
    hex: "#ea80dc",
    amito: "alignment",
    cue: "Lilac head logo",
  },
  {
    key: "reflect",
    letter: "N",
    title: "Now Reflect",
    tagline: "Has your judgment changed — and why?",
    color: "text-reflect",
    hex: "#ff922b",
    amito: "reflect",
    cue: "Orange torso glow",
  },
];

export const stepByKey = (key: StepKey) =>
  STEPS.find((s) => s.key === key) as StepMeta;

/** Full uppercase step name for resource pages and other prominent UI */
export const stepDisplayTitle = (step: StepMeta): string => step.title.toUpperCase();
