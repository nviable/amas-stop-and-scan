import type { CaseFile } from "../../lib/caseTypes";
import celebrityInvestmentScam from "./celebrity-investment-scam.json";

export const CASES: CaseFile[] = [celebrityInvestmentScam as CaseFile];

export const getCaseBySlug = (slug: string): CaseFile | undefined =>
  CASES.find((c) => c.slug === slug);
