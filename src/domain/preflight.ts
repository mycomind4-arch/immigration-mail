import type { ImmigrationPreflightIssue, ImmigrationPreflightResult } from "./immigration-intelligence";

/** Deterministic checks that run before an AI/provider review. */
export function runBasicPreflight(input: {
  draft: string;
  recipient: { name: string; organization?: string; address: string };
  requiredFacts?: readonly string[];
}): ImmigrationPreflightResult {
  const issues: ImmigrationPreflightIssue[] = [];
  const draft = input.draft.trim();

  if (!draft) issues.push({ severity: "error", code: "EMPTY_DRAFT", message: "The response draft is empty." });
  if (!input.recipient.name.trim()) issues.push({ severity: "error", code: "MISSING_RECIPIENT", message: "A recipient name is required." });
  if (!input.recipient.address.trim()) issues.push({ severity: "error", code: "MISSING_ADDRESS", message: "A recipient mailing address is required." });

  for (const fact of input.requiredFacts ?? []) {
    if (!draft.toLowerCase().includes(fact.toLowerCase())) {
      issues.push({ severity: "warning", code: "FACT_NOT_FOUND", message: `A required fact was not found in the draft: ${fact}` });
    }
  }

  // Placeholder detection catches unfinished drafts without pretending to
  // determine whether a legal response is substantively sufficient.
  if (/\[[^\]]+\]/.test(draft)) {
    issues.push({ severity: "warning", code: "PLACEHOLDER_DETECTED", message: "The draft contains bracketed placeholders that should be reviewed." });
  }

  return { ready: !issues.some((issue) => issue.severity === "error"), issues };
}
