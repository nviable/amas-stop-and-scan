export interface ChoiceQuestion {
  prompt: string;
  /** when true, user can pick multiple options */
  multi: boolean;
  options: { id: string; label: string; flag?: boolean }[];
  /** optional explanation revealed after answering */
  insight?: string;
}

export interface SourceFinding {
  icon: string;
  label: string;
  detail: string;
}

export interface SearchResult {
  source: string;
  headline: string;
  snippet: string;
  /** signal: "warning" | "absent" | "unrelated" | "confirm" */
  signal: "warning" | "absent" | "unrelated" | "confirm";
}

export interface CaseFile {
  id: string;
  slug: string;
  title: string;
  kind: "scam" | "authentic" | "decontextualized";
  difficulty: "intro" | "core" | "advanced";
  summary: string;
  estMinutes: number;
  post: {
    account: string;
    handle: string;
    verified: boolean;
    timeAgo: string;
    avatarColor: string;
    body: string;
    mediaCaption: string;
    /** 16:9 still shown in the simulated media player (`/public/...`). */
    thumbnail?: string;
    /** Defaults to video (play control). Image posts hide the play overlay. */
    mediaType?: "video" | "image";
    mediaAlt?: string;
    stat: { likes: string; comments: string; shares: string };
    linkLabel: string;
    linkUrl: string;
    highlights: string[];
  };
  comments: { name: string; text: string; suspicious?: boolean }[];
  gutCheck: {
    reactionOptions: string[];
    feelingOptions: string[];
  };
  stop: { message: string };
  source: {
    message: string;
    findings: SourceFinding[];
    question: ChoiceQuestion;
  };
  content: {
    message: string;
    question: ChoiceQuestion;
  };
  alignment: {
    message: string;
    results: SearchResult[];
    question: ChoiceQuestion;
  };
  reflect: {
    message: string;
    nextActions: { id: string; label: string; recommended?: boolean }[];
    recommendedOutcome: string;
    rewardMessage: string;
  };
}
