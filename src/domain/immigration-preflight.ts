import type { ImmigrationCase } from './immigration-case';

export type PreflightIssue = { severity: 'error'|'warning'; code: string; message: string; field?: string };

export function preflightResponse(input: { caseData: ImmigrationCase; recipient?: string; address?: string; draft: string; requiredFacts?: string[] }): PreflightIssue[] {
  const issues: PreflightIssue[] = [];
  if (!input.recipient?.trim()) issues.push({ severity: 'error', code: 'missing_recipient', message: 'A recipient is required.' });
  if (!input.address?.trim()) issues.push({ severity: 'error', code: 'missing_address', message: 'A mailing address is required.' });
  if (!input.draft.trim()) issues.push({ severity: 'error', code: 'empty_draft', message: 'The response draft is empty.' });
  if (/\[[^\]]+\]/.test(input.draft)) issues.push({ severity: 'error', code: 'unresolved_placeholder', message: 'The draft contains unresolved placeholders.' });
  for (const key of input.requiredFacts ?? []) {
    const fact = input.caseData.facts.find(f => f.key === key && f.verified);
    if (!fact) issues.push({ severity: 'warning', code: 'missing_verified_fact', message: `Required fact is not verified: ${key}`, field: key });
  }
  return issues;
}
