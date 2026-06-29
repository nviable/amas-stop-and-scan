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
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "C2PA Viewer",
          url: "https://c2paviewer.com/",
          description:
            "Drag-and-drop verification with full raw manifest JSON — useful when you need technical detail beyond a visual summary.",
          warning: "Same limits as any C2PA tool: provenance is not a truth guarantee.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Digimarc C2PA Chrome Extension",
          url: "https://chromewebstore.google.com/detail/c2pa-content-credentials/mjkaocdlpjmphfkjndocehcdhbigaafp",
          description:
            "Right-click images, video, or audio to verify credentials while browsing; can auto-detect assets with manifests and show a Cr pin.",
          warning: "Only works when credentials survive to the page you are viewing.",
          badges: ["Check now", "Free", "Extension"],
        },
        {
          name: "Adobe Content Authenticity",
          url: "https://contentauthenticity.adobe.com/",
          description:
            "Read the Content Authenticity Initiative's guidance on how credentials are created and what each field means before relying on them.",
          badges: ["Reference"],
        },
        {
          name: "c2patool (CLI)",
          url: "https://github.com/contentauth/c2pa-rs/tree/main/cli",
          description:
            "Official command-line tool for reading and validating C2PA manifests locally — batch checks and developer workflows.",
          badges: ["Check now", "Free", "CLI"],
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
          url: "https://support.google.com/youtube/answer/1311392",
          description:
            "Check the description and expanded details for an 'Altered or synthetic content' disclosure; creators must flag realistic AI content.",
          warning:
            "The label relies on creator disclosure and selective detection. Its absence is not a guarantee the video is authentic.",
          badges: ["YouTube", "Reference"],
        },
        {
          name: "Instagram / Meta — 'AI Info'",
          url: "https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/",
          description:
            "Tap the '⋯' menu on a post and look for 'AI Info' — Meta adds this when content is disclosed or detected as AI-generated (including via C2PA/IPTC signals).",
          warning:
            "Detection is partial and can miss edited or re-uploaded media. 'AI Info' can also appear on lightly AI-edited photos, not only fully generated ones.",
          badges: ["Instagram", "Facebook", "Threads", "Reference"],
        },
        {
          name: "LinkedIn — C2PA Content Credentials",
          url: "https://www.linkedin.com/help/linkedin/",
          description:
            "LinkedIn shows a small 'Cr' Content Credentials marker on images that carry C2PA data; click it to view the provenance record.",
          warning:
            "A Cr marker means provenance data exists — not that the image is fake or real. Read the underlying record instead of treating the badge as a verdict.",
          badges: ["LinkedIn", "Reference"],
        },
        {
          name: "TikTok — AI-generated content label",
          url: "https://www.tiktok.com/transparency/en-us/content-moderation/",
          description:
            "Look for TikTok's 'AI-generated' label; TikTok also reads C2PA credentials to auto-label some uploads.",
          warning: "Auto-labeling only triggers when credentials are present and intact.",
          badges: ["TikTok", "Reference"],
        },
        {
          name: "X (Twitter) — synthetic media policy",
          url: "https://help.x.com/en/rules-and-policies/manipulated-media",
          description:
            "Creators can voluntarily label posts as AI-generated in the composer. X also restricts deceptive synthetic media under its manipulated-media policy.",
          warning:
            "Labeling is voluntary — most AI content on X carries no label. Read the policy for context, not as a detection tool.",
          badges: ["X", "Reference"],
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
          badges: ["Check now", "Free tier", "Web"],
        },
        {
          name: "SynthID — how it works",
          url: "https://deepmind.google/technologies/synthid/",
          description:
            "Read how SynthID watermarking and detection work, and which Google products embed it, so you know the limits of a positive or negative result.",
          badges: ["Reference"],
        },
      ],
    },
    {
      id: "account-tracing",
      title: "Account & domain tracing",
      blurb:
        "Source is about who is accountable — not just what metadata a file carries. Trace domains, account history, and page longevity before trusting a claimed origin.",
      tools: [
        {
          name: "WHOIS lookup",
          url: "https://who.is/",
          description:
            "Check when a domain was registered, who holds it, and whether registrant details are hidden — new domains pushing urgent offers are a common scam pattern.",
          warning: "Privacy-protected WHOIS is common and not suspicious on its own — combine with other signals.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Wayback Machine",
          url: "https://web.archive.org/",
          description:
            "See whether a site or page existed before the claim surfaced — impersonation pages often appear only days before a scam.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Social Blade",
          url: "https://socialblade.com/",
          description:
            "Review account creation date, follower growth, and posting patterns — brand-new accounts pushing financial offers deserve extra scrutiny.",
          warning: "Growth metrics alone don't prove a scam; use alongside content and link checks.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Google — About this result / image",
          url: "https://www.google.com/",
          description:
            "When available, tap 'About this result' in Search or 'About this image' in Google Images for indexing context and earlier appearances.",
          warning: "Not available for every result; absence doesn't mean the source is trustworthy.",
          badges: ["Google", "Reference"],
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
          name: "TrueMedia",
          url: "https://www.truemedia.org/",
          description:
            "Nonprofit tool (Georgetown University) that aggregates multiple AI detectors for images and reports uncertainty — built for journalists and the public.",
          warning:
            "Service availability may vary during relaunch. No detector is perfect; read the uncertainty report, not just the headline score.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Hive Moderation — AI detector",
          url: "https://hivemoderation.com/ai-generated-content-detection",
          description:
            "Upload an image or paste a URL to get a likelihood score for AI generation across several model families.",
          warning:
            "Probabilistic, not definitive. A high or low score should change your confidence a little — never settle the question on its own.",
          badges: ["Check now", "Free demo", "Web"],
        },
        {
          name: "Sightengine — AI image detection",
          url: "https://sightengine.com/detect-ai-generated-images",
          description:
            "Run a quick check that returns an AI-generated probability; useful as a second opinion alongside reasoning.",
          warning: "Accuracy drops on edited, screenshotted, or low-resolution images.",
          badges: ["Check now", "Free demo", "Web"],
        },
        {
          name: "Illuminarty",
          url: "https://illuminarty.ai/",
          description:
            "Free consumer-facing AI image checker — lower barrier than enterprise demos for a quick first pass.",
          warning: "Consumer-grade accuracy; treat as a prompt to investigate further.",
          badges: ["Check now", "Free", "Web"],
        },
      ],
    },
    {
      id: "deepfake-video",
      title: "Deepfake / video / audio detection",
      blurb:
        "Video, face-swap, and voice detectors scan for manipulation artifacts. Generation tech keeps outpacing fixed cues, so use these to raise questions, not to close them.",
      tools: [
        {
          name: "Deepware Scanner",
          url: "https://deepware.ai/",
          description:
            "Submit a video or link to scan for face-manipulation/deepfake indicators.",
          warning:
            "Misses novel methods and can flag authentic video. Pair any result with source and alignment checks.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Sensity AI",
          url: "https://sensity.ai/",
          description:
            "Forensic-grade analysis of face manipulation, AI-generated images/video, and synthetic voice — used by investigators and media teams.",
          warning: "Enterprise-focused; some features require an account. Probabilistic output.",
          badges: ["Check now", "Web"],
        },
        {
          name: "Reality Defender",
          url: "https://www.realitydefender.com/",
          description:
            "Multi-model deepfake detection for images, video, and audio — upload media or use the API for a quick authenticity check.",
          warning: "Free tier has scan limits. Results are one input among many.",
          badges: ["Check now", "Free tier", "Web"],
        },
        {
          name: "Aurigin.ai",
          url: "https://aurigin.ai/",
          description:
            "Upload or submit audio to check for AI-generated, cloned, or synthetic voice — useful when a claim hinges on who supposedly said something.",
          warning:
            "Probabilistic output; novel voice clones may evade detection. Pair with source tracing and independent corroboration.",
          badges: ["Check now", "Free tier", "Web"],
        },
      ],
    },
    {
      id: "metadata-forensics",
      title: "Metadata & forensics (non-AI)",
      blurb:
        "Before reaching for an AI detector, check whether the file itself tells a story — editing traces, timestamps, and compression patterns often reveal recycled or manipulated media.",
      tools: [
        {
          name: "FotoForensics",
          url: "https://fotoforensics.com/",
          description:
            "Run Error Level Analysis (ELA) to spot re-compression and editing — regions that were saved at different quality levels stand out.",
          warning: "ELA is interpretive, not definitive; social-media compression creates false positives.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Jeffrey's Exif Viewer",
          url: "https://exif.regex.info/exif.cgi",
          description:
            "Inspect EXIF metadata: camera model, capture date, GPS, and software used — often stripped on re-upload but worth checking on originals.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Amnesty YouTube DataViewer",
          url: "https://citizenevidence.amnestyusa.org/",
          description:
            "Extract upload date, title, and key metadata from YouTube videos to cross-check timing against the claim.",
          badges: ["Check now", "Free", "Web"],
        },
      ],
    },
    {
      id: "context-search",
      title: "Video forensics & context search",
      blurb:
        "Often the strongest move isn't a detector at all — it's finding where media really came from. Authentic footage is frequently real but recycled from another event, place, or year.",
      tools: [
        {
          name: "InVID / WeVerify",
          url: "https://weverify.eu/tools/invid-we-verify/",
          description:
            "Browser toolkit that breaks video into keyframes for reverse search, plus metadata, magnifier, and optional deepfake analysis.",
          badges: ["Check now", "Free", "Extension"],
        },
        {
          name: "Yandex Images",
          url: "https://yandex.com/images/",
          description:
            "Reverse-image search with different index coverage from Google — often surfaces matches others miss.",
          badges: ["Check now", "Free", "Web"],
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
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "TinEye",
          url: "https://tineye.com/",
          description:
            "Sort results by oldest to establish the earliest source and spot recycled content.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Bing Visual Search",
          url: "https://www.bing.com/visualsearch",
          description:
            "A second reverse-image index — different coverage from Google, useful for cross-checking.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Yandex Images",
          url: "https://yandex.com/images/",
          description:
            "Third index with strong coverage of non-English and Eastern European sources — run when Google returns nothing.",
          badges: ["Check now", "Free", "Web"],
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
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Snopes",
          url: "https://www.snopes.com/",
          description:
            "Search long-running investigations of viral claims and recurring hoaxes.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Full Fact",
          url: "https://fullfact.org/",
          description:
            "Independent UK fact-checker — strong on viral European claims and recurring misinformation patterns.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Reuters Fact Check",
          url: "https://www.reuters.com/fact-check/",
          description:
            "Wire-service fact-checks with sourcing you can follow back to primary evidence.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "AP Fact Check",
          url: "https://apnews.com/hub/ap-fact-check",
          description:
            "Associated Press investigations of viral claims, political statements, and manipulated media.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "PolitiFact",
          url: "https://www.politifact.com/",
          description:
            "Fact-checks of political claims and viral statements, with transparent rating methodology.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Hoaxy",
          url: "https://hoaxy.osome.iu.edu/",
          description:
            "Visualize how a claim spreads across social networks — useful when assessing whether corroboration exists only inside one bubble.",
          warning: "Twitter/X data coverage has declined; still useful for historical spread patterns.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "Ground News",
          url: "https://ground.news/",
          description:
            "Compare how a story is covered across outlets on the political spectrum — surfaces whether independent reporting exists at all.",
          warning: "Some features require an account; use the free coverage comparison where available.",
          badges: ["Free tier", "Web"],
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
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "SunCalc",
          url: "https://www.suncalc.org/",
          description:
            "Check whether sun position and shadow direction in a photo or video match the claimed date, time, and location.",
          warning: "Requires identifiable shadows and a known location — not applicable to every scene.",
          badges: ["Check now", "Free", "Web"],
        },
        {
          name: "InVID / WeVerify",
          url: "https://weverify.eu/tools/invid-we-verify/",
          description:
            "Extract keyframes and metadata to corroborate when and where a video was likely captured.",
          badges: ["Check now", "Free", "Extension"],
        },
        {
          name: "Bellingcat Online Investigation Toolkit",
          url: "https://bellingcat.gitbook.io/toolkit",
          description:
            "Curated index of OSINT tools and techniques for geolocation, metadata, and social media verification.",
          badges: ["Reference"],
        },
      ],
    },
  ],
};

export function getStepTools(key: StepKey): ToolCategory[] | undefined {
  return STEP_TOOLS[key];
}
