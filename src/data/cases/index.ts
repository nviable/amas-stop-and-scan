import type { CaseFile } from "../../lib/caseTypes";
import celebrityInvestmentScam from "./celebrity-investment-scam.json";
import martinLewisDeepfakeAd from "./martin-lewis-deepfake-ad.json";
import minabAiFactCheck from "./minab-ai-fact-check.json";

export const CASES: CaseFile[] = [
  celebrityInvestmentScam as CaseFile,
  martinLewisDeepfakeAd as CaseFile,
  minabAiFactCheck as CaseFile,
];

export const getCaseBySlug = (slug: string): CaseFile | undefined =>
  CASES.find((c) => c.slug === slug);
