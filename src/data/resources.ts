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
      "Before doing anything else, name your instinctive response: Do I believe this? Am I unsure? Do I feel a strong emotion — fear, outrage, urgency, relief? Emotionally charged content works by triggering a fast, intuitive reaction before slower, reflective thinking can catch up. STOP is the pre-commitment moment that opens space for that slower thinking.",
    asks: [
      "What is my honest first reaction — believe, doubt, or unsure?",
      "What emotion is this making me feel right now?",
      "Is that emotion pushing me to act, share, or decide quickly?",
      "Would stepping away for a moment change how this looks?",
    ],
    why: "Borrowed from digital-forensics practice, pre-commitment means forming an explicit judgment before consulting any tool or evidence. It prevents anchoring on what you find and lets you honestly compare 'before' and 'after'. Motivated reasoning — agreeing with content because it fits what we already believe — is one of the strongest predictors of false acceptance. Strong emotion is not proof that something is fake; real emergencies feel urgent too. The point is to treat intense feeling as a cue that slower evaluation is needed — and small habits like pausing or briefly stepping back measurably reduce reactive sharing.",
    takeaway:
      "It takes five seconds and makes your initial judgment explicit, so the investigation can't just confirm whatever you already felt.",
  },
  source: {
    key: "source",
    question: "Who is really behind this?",
    intro:
      "Content spreads through resharing. By the time it reaches you, the original creator may be invisible — often intentionally. The aim isn't to assume official accounts are always trustworthy; it's to check whether the claimed source is identifiable, accountable, and plausibly connected to the content's origin. The further content travels from its source, the harder it is to hold anyone responsible — and the more legitimate it can falsely appear.",
    asks: [
      "Trace back to the original creator, not whoever shared it to you.",
      "Is the account real, established, and locatable? When was it created?",
      "Could this be impersonation — a cloned voice, a hijacked account, or a name dressed up to look official?",
      "Would this person or organization actually communicate through this channel?",
    ],
    why: "In the Elon Musk deepfake case, the video lived on an anonymous page with no link to any verified Musk channel. The account existed only to distribute the scam and vanish. Synthetic media makes impersonation cheap: voice clones, account takeovers, pseudo-institutional branding, and 'source laundering' all borrow trust while hiding the true operator. The person who forwarded it to you is not the same as an accountable origin.",
    takeaway:
      "When you cannot trace content to an accountable, verifiable source, treat it as unverified — and hold off on clicking, sharing, or acting until you can.",
  },
  content: {
    key: "content",
    question: "Does what you see actually hold up?",
    intro:
      "Our brains are wired to trust our senses — seeing feels like believing — and manipulators exploit this directly. Authentic footage can be lifted from a different event, country, or year and repackaged with a new caption, and AI-generated content mimics the visual texture of the real thing. So the more durable question isn't 'are there visual glitches?' but 'what is this trying to make me feel, believe, or do?'",
    asks: [
      "Could this footage be from a different event, place, or time, repackaged with a new caption?",
      "What is this trying to make me feel, believe, or do — and how fast?",
      "Do I see manipulation mechanics: urgency, a borrowed famous face, moral shock, vague 'experts say', or 'everyone is doing it'?",
      "Are there labels, content credentials, or a detection tool I can check — treating them as one input, not the final verdict?",
      "Does the framing actually match what is shown or said?",
    ],
    why: "Detection tools, watermarks, and provenance signals are genuinely useful — but on their own they have limits, and research found that teaching people a checklist of visual artifacts (unnatural textures, edge anomalies) didn't reliably improve their judgment, because generation tech keeps outpacing fixed cues. They work best in conjunction with reasoning: use any tool or signal as one input, then read the emotional and logical structure of manipulation — urgency, identity mimicry, false authority, moral shock, manufactured consensus — which stays constant across formats. Tool plus reasoning is stronger than either alone.",
    takeaway:
      "A strong emotional reaction to content is a signal to slow down, not speed up.",
  },
  alignment: {
    key: "alignment",
    question: "Does everything fit together?",
    intro:
      "Real events leave multiple independent traces. A genuine strike, announcement, or development gets reported within minutes from several angles by people who don't share a common incentive. Manipulated or distorted content tends to stay isolated — or circulate only within mutually reinforcing networks — because nothing independent confirms it.",
    asks: [
      "Search the claim — is anyone reporting this independently?",
      "Do the confirmations come from sources that don't share the same stake in the story?",
      "If only social media carries this and no independent reporting does, wait.",
      "In a closed chat where you can't trace the origin, am I leaning on peer trust instead of evidence?",
    ],
    why: "A simple search of 'Elon Musk investment platform' at the time would have returned nothing or active fraud warnings — both informative. STOP&SCAN doesn't require trusting any single outlet; the question is whether independent corroboration exists anywhere, applied consistently. In low-connectivity or closed-messaging settings the source set may shrink and trails are obscured, so the corroboration logic still holds — but lean toward waiting rather than substituting a friend's confidence for evidence.",
    takeaway:
      "If the claim exists only in this one piece of content and nowhere else, that isolation is a red flag.",
  },
  reflect: {
    key: "reflect",
    question: "Has your judgment changed — and why?",
    intro:
      "The goal is calibrated trust, not blanket skepticism. Sophisticated manipulation doesn't only make you believe something false — it can also make you feel certain when you have no real basis for certainty, in either direction. Return to your gut check and ask honestly what changed, and whether your confidence now matches the evidence.",
    asks: [
      "Has my judgment actually changed after scanning, and why?",
      "Am I now too quick to believe — or too quick to call something fake?",
      "If I couldn't complete Source, Content, or Alignment, I don't have enough yet.",
      "Is anything — time, emotion, opportunity — pushing me to act before I've checked?",
    ],
    why: "Poorly calibrated confidence — feeling sure when the evidence doesn't support it — drives both the acceptance of falsehoods and the dismissal of true content. Being too skeptical is its own failure: when people reflexively call real evidence fake, it becomes easier to deny genuine events (the 'liar's dividend'). Reviews of news judgment find that doubting true news is often a bigger problem than believing false news. Calibrated trust means confidence that tracks the evidence — and with practice, these checks fade from a deliberate checklist into an automatic habit.",
    takeaway:
      "\"I don't know yet\" is a complete and honest answer. Uncertainty, properly calibrated, is protective.",
  },
};
