import type { StepKey } from "../lib/framework";

export interface ResourceContent {
  key: StepKey;
  question: string;
  intro: string;
  asks: string[];
  why: string;
  takeaway: string;
}

export const RESOURCES: Record<StepKey, ResourceContent> = {
  stop: {
    key: "stop",
    question: "Pause and register your gut reaction.",
    intro:
      "Before doing anything else, name your instinctive response: Do I believe this? Am I unsure? Do I feel a strong emotion — fear, outrage, urgency? This is the pre-commitment moment.",
    asks: [
      "What is my honest first reaction — believe, doubt, or unsure?",
      "What emotion is this making me feel right now?",
      "Is that emotion pushing me to act quickly?",
    ],
    why: "Borrowed from digital-forensics practice, pre-commitment means forming an explicit judgment before consulting any tool or evidence. It prevents anchoring on what you find and lets you honestly compare 'before' and 'after'. Motivated reasoning — simply agreeing with content — is one of the strongest predictors of false acceptance, so naming your reaction early is the first line of defense.",
    takeaway:
      "It takes five seconds and makes your initial judgment explicit, so the investigation can't just confirm whatever you already felt.",
  },
  source: {
    key: "source",
    question: "Who is really behind this?",
    intro:
      "Content spreads through resharing. By the time it reaches you, the original creator may be invisible — often intentionally. The further content travels from its origin, the harder it is to hold anyone accountable, and the more legitimate it can falsely appear.",
    asks: [
      "Trace back to the original creator, not who shared it to you.",
      "Is the account real, established, and locatable? When was it created?",
      "How many hands has this passed through before reaching you?",
      "Would this person or organization actually communicate through this channel?",
    ],
    why: "In the Elon Musk deepfake case, the video lived on an anonymous page with no link to any verified Musk channel. The account existed only to distribute the scam and vanish. Bad actors create on anonymous accounts, let others reshare, and disappear.",
    takeaway:
      "If you cannot find the origin, that is itself the manipulation. Unverifiable origin = unverified content. Do not share.",
  },
  content: {
    key: "content",
    question: "Does what you see actually hold up?",
    intro:
      "Our brains are wired to trust our senses — seeing feels like believing — and manipulators exploit this directly. Footage can be lifted from a different event, country, or year and repackaged with a new caption. AI-generated content mimics the visual texture of authentic footage.",
    asks: [
      "Could this footage be from a different event, location, or time entirely?",
      "Do faces, hands, text, edges, and lighting appear consistent?",
      "Does the audio match the visuals in timing, tone, and environment?",
      "Is the language emotionally extreme, urgent, or designed to provoke immediate action?",
    ],
    why: "Artifact cues (unnatural textures, edge anomalies) are subtle, evolving, and insufficient as a primary strategy — generation tech outpaces them. What remains constant is the emotional and logical structure of manipulation. That's what STOP&SCAN teaches you to read.",
    takeaway:
      "A strong emotional reaction to content is a signal to slow down, not speed up.",
  },
  alignment: {
    key: "alignment",
    question: "Does everything fit together?",
    intro:
      "Real events leave multiple independent traces. A genuine strike, announcement, or development gets reported within minutes from multiple independent angles. Manipulated content exists in isolation — it can't withstand cross-checking because nothing else confirms it.",
    asks: [
      "Search the claim — is anyone reporting this independently?",
      "If only social media carries this story and no established outlet does, wait.",
      "Do the source, content, timing, and context fit together coherently?",
      "Is the narrative suspiciously perfect — too clean, too outrageous, too conveniently timed?",
    ],
    why: "A simple search of 'Elon Musk investment platform' at the time would have returned nothing or active fraud warnings — both informative. STOP&SCAN doesn't require trusting any specific outlet; the question is whether independent confirmation exists anywhere, applied consistently.",
    takeaway:
      "If the claim exists only in this one piece of content and nowhere else, that isolation is a red flag.",
  },
  reflect: {
    key: "reflect",
    question: "Has your judgment changed — and why?",
    intro:
      "The most sophisticated manipulation doesn't make you believe something obviously false — it makes you feel certain when you have no real basis for certainty. Premature decision is the goal. Return to your gut check and ask honestly what changed.",
    asks: [
      "Has my judgment actually changed after scanning, and why?",
      "If I couldn't complete Source, Content, or Alignment, I don't have enough yet.",
      "Is anything — time, emotion, opportunity — pushing me to act before I've checked?",
      "Not sharing is always a responsible choice in the face of uncertainty.",
    ],
    why: "Poorly calibrated confidence — feeling sure when the evidence doesn't support it — is the primary driver of misinformation acceptance and spread. 'Not decided yet' is not a failure state; it's often the most honest and correct response.",
    takeaway:
      "\"I don't know yet\" is a complete and honest answer. Uncertainty, properly calibrated, is protective.",
  },
};
