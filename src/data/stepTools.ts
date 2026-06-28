import type { StepKey } from "../lib/framework";

export interface StepTool {
  name: string;
  url: string;
  /** How to actually use it for this step. */
  description: string;
  /** Caveats, limits, or common misreadings. */
  warning?: string;
  /** Short context pills, e.g. platform names or "Free". */
  badges?: string[];
}

export interface ToolCategory {
  id: string;
  title: string;
  /** What this category of tools is for, and how to think about it. */
  blurb: string;
  tools: StepTool[];
}

/**
 * Tools are one input, never a verdict. Every category leads with reasoning;
 * each tool carries a "how to use" note and, where relevant, a warning so the
 * presence or absence of a signal is not mistaken for proof.
 */
export const STEP_TOOLS: Partial<Record<StepKey, ToolCategory[]>> = {
  source: [
    {
      id: "provenance-c2pa",
      title: "Content provenance & credentials (C2PA)",
      blurb:
        "C2PA Content Credentials attach a tamper-evident record of where a file came from and how it was edited. They help you trace origin — but only when they survive; platforms often strip them, and their presence describes history, not truthfulness.",
      tools: [
        {
          name: "Content Credentials — Verify",
          url: "https://contentcredentials.org/verify",
          description:
            "Upload an image or paste a link to inspect any attached C2PA provenance: capture device, AI tool used, and edit history.",
          warning:
            "No credentials does not mean fake — most files never carry them, and they are easily stripped on upload. Credentials describe origin, not whether a claim is true.",
          badges: ["Free", "Web"],
        },
        {
          name: "Adobe Content Authenticity",
          url: "https://contentauthenticity.adobe.com/",
          description:
            "Read the Content Authenticity Initiative's guidance on how credentials are created and what each field means before relying on them.",
          badges: ["Reference"],
        },
      ],
    },
    {
      id: "platform-labels",
      title: "Platform AI labels",
      blurb:
        "Major platforms now label content that is disclosed as, or detected to be, AI-generated. Labels are a starting cue — coverage is inconsistent and depends on creators disclosing.",
      tools: [
        {
          name: "YouTube — altered/synthetic content labels",
          url: "https://www.youtube.com/",
          description:
            "Check the description and the expanded details panel for an 'Altered or synthetic content' disclosure; creators must flag realistic AI content.",
          warning:
            "The label relies on creator disclosure and selective detection. Its absence is not a guarantee the video is authentic.",
          badges: ["YouTube"],
        },
        {
          name: "Instagram / Meta — 'AI Info'",
          url: "https://www.instagram.com/",
          description:
            "Tap the '⋯' menu or look for the 'AI Info' tag Meta adds to content disclosed or detected as AI-generated.",
          warning: "Detection is partial and can miss edited or re-uploaded media.",
          badges: ["Instagram", "Facebook"],
        },
        {
          name: "LinkedIn — C2PA Content Credentials",
          url: "https://www.linkedin.com/",
          description:
            "LinkedIn shows a small 'Cr' Content Credentials marker on images that carry C2PA data; click it to view the provenance.",
          warning:
            "A Cr marker means provenance data exists — not that the image is fake or real. Read the underlying record instead of treating the badge as a verdict.",
          badges: ["LinkedIn"],
        },
        {
          name: "TikTok — AI-generated content label",
          url: "https://www.tiktok.com/",
          description:
            "Look for TikTok's 'AI-generated' label; TikTok also reads C2PA credentials to auto-label some uploads.",
          warning: "Auto-labeling only triggers when credentials are present and intact.",
          badges: ["TikTok"],
        },
      ],
    },
    {
      id: "watermark-detection",
      title: "Watermark detection (SynthID)",
      blurb:
        "SynthID is an invisible watermark Google embeds in media made with its AI. Detecting it can confirm a Google-AI origin — but it says nothing about content from other generators.",
      tools: [
        {
          name: "Google Gemini",
          url: "https://gemini.google.com/",
          description:
            "Upload an image and ask whether it was created with Google AI; Gemini can identify content carrying Google's SynthID watermark.",
          warning:
            "Only detects Google's SynthID. Other AI generators leave no SynthID, so a 'no watermark' answer is not proof the content is real.",
          badges: ["Free tier", "Web"],
        },
        {
          name: "SynthID Detector",
          url: "https://deepmind.google/technologies/synthid/",
          description:
            "Read how SynthID watermarking and detection work, and which Google products embed it, so you know the limits of a positive or negative result.",
          badges: ["Reference"],
        },
      ],
    },
  ],

  content: [
    {
      id: "ai-image-detection",
      title: "AI image detection",
      blurb:
        "These classifiers estimate the probability an image was AI-generated. Treat the score as one weak signal: they are confidently wrong in both directions, especially on compressed, cropped, or re-shared media.",
      tools: [
        {
          name: "Hive Moderation — AI detector",
          url: "https://hivemoderation.com/ai-generated-content-detection",
          description:
            "Upload an image or paste a URL to get a likelihood score for AI generation across several model families.",
          warning:
            "Probabilistic, not definitive. A high or low score should change your confidence a little — never settle the question on its own.",
          badges: ["Free demo", "Web"],
        },
        {
          name: "Sightengine — AI image detection",
          url: "https://sightengine.com/detect-ai-generated-images",
          description:
            "Run a quick check that returns an AI-generated probability; useful as a second opinion alongside reasoning.",
          warning: "Accuracy drops on edited, screenshotted, or low-resolution images.",
          badges: ["Free demo", "Web"],
        },
      ],
    },
    {
      id: "deepfake-video",
      title: "Deepfake / video detection",
      blurb:
        "Video and face-swap detectors scan for manipulation artifacts. Generation tech keeps outpacing fixed cues, so use these to raise questions, not to close them.",
      tools: [
        {
          name: "Deepware Scanner",
          url: "https://deepware.ai/",
          description:
            "Submit a video or link to scan for face-manipulation/deepfake indicators.",
          warning:
            "Misses novel methods and can flag authentic video. Pair any result with source and alignment checks.",
          badges: ["Free", "Web"],
        },
      ],
    },
    {
      id: "context-search",
      title: "Reverse image & context search (non-AI)",
      blurb:
        "Often the strongest move isn't a detector at all — it's finding where an image really came from. Authentic footage is frequently real but recycled from another event, place, or year.",
      tools: [
        {
          name: "Google Lens",
          url: "https://lens.google.com/",
          description:
            "Reverse-search an image to find earlier appearances and the original context behind a recycled or miscaptioned photo.",
          badges: ["Free", "Web"],
        },
        {
          name: "TinEye",
          url: "https://tineye.com/",
          description:
            "Find the oldest known copy of an image to check whether a 'breaking' photo is actually years old.",
          badges: ["Free", "Web"],
        },
        {
          name: "InVID / WeVerify",
          url: "https://weverify.eu/tools/invid-we-verify/",
          description:
            "Browser toolkit that breaks video into keyframes for reverse search, plus metadata and magnifier tools for closer inspection.",
          badges: ["Free", "Extension"],
        },
      ],
    },
  ],

  alignment: [
    {
      id: "reverse-origin",
      title: "Reverse image & origin tracing",
      blurb:
        "Alignment asks whether a claim shows up independently. Start by tracing the media itself across the web to see where else — and when — it appears.",
      tools: [
        {
          name: "Google Lens",
          url: "https://lens.google.com/",
          description:
            "Reverse-search to surface independent appearances of the same image across different sites and dates.",
          badges: ["Free", "Web"],
        },
        {
          name: "TinEye",
          url: "https://tineye.com/",
          description:
            "Sort results by oldest to establish the earliest source and spot recycled content.",
          badges: ["Free", "Web"],
        },
        {
          name: "Bing Visual Search",
          url: "https://www.bing.com/visualsearch",
          description:
            "A second reverse-image index — different coverage from Google, useful for cross-checking.",
          badges: ["Free", "Web"],
        },
      ],
    },
    {
      id: "factchecks",
      title: "Cross-checking & fact-checks",
      blurb:
        "Look for independent corroboration from sources that don't share the same stake in the story. If only the original post carries a claim, that isolation is itself a signal.",
      tools: [
        {
          name: "Google Fact Check Explorer",
          url: "https://toolbox.google.com/factcheck/explorer",
          description:
            "Search a claim across published fact-checks from independent organizations worldwide.",
          warning: "Coverage is uneven; no result means 'not yet checked', not 'true'.",
          badges: ["Free", "Web"],
        },
        {
          name: "Snopes",
          url: "https://www.snopes.com/",
          description:
            "Search long-running investigations of viral claims and recurring hoaxes.",
          badges: ["Free", "Web"],
        },
        {
          name: "AFP Fact Check",
          url: "https://factcheck.afp.com/",
          description:
            "Browse independent newsroom fact-checks with sourcing you can follow back to evidence.",
          badges: ["Free", "Web"],
        },
      ],
    },
    {
      id: "geolocation",
      title: "Geolocation & scene verification",
      blurb:
        "When a post claims a specific place or time, check whether the scene actually matches by corroborating it against independent map and imagery sources.",
      tools: [
        {
          name: "Google Maps / Earth",
          url: "https://earth.google.com/",
          description:
            "Compare landmarks, signage, and layout in the footage against street-level and satellite imagery.",
          badges: ["Free", "Web"],
        },
        {
          name: "InVID / WeVerify",
          url: "https://weverify.eu/tools/invid-we-verify/",
          description:
            "Extract keyframes and metadata to corroborate when and where a video was likely captured.",
          badges: ["Free", "Extension"],
        },
      ],
    },
  ],
};

export function getStepTools(key: StepKey): ToolCategory[] | undefined {
  return STEP_TOOLS[key];
}
