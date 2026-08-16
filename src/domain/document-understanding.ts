import type { SupportedLanguage, FactSource, ImmigrationDocument, CaseFact } from './immigration-case';

export type ImmigrationAgency = 'USCIS'|'DOS'|'EOIR'|'ICE'|'CBP'|'DHS'|'UNKNOWN';
export type NoticeType = 'RFE'|'NOID'|'receipt'|'biometrics'|'interview'|'decision'|'appointment'|'request_for_evidence'|'other'|'unknown';
export type DocumentUnderstanding = {
  agency: ImmigrationAgency;
  noticeType: NoticeType;
  detectedLanguage: SupportedLanguage;
  plainLanguageSummary: string;
  requestedActions: string[];
  deadlines: { label: string; date?: string; source: FactSource; confidence: number }[];
  facts: CaseFact[];
  warnings: string[];
};

const agencyPattern: Array<[ImmigrationAgency, RegExp]> = [
  ['USCIS', /u\.s\. citizenship and immigration services|uscis/i],
  ['DOS', /department of state|state department|consular/i],
  ['EOIR', /executive office for immigration review|eoir|immigration court/i],
  ['ICE', /immigration and customs enforcement|ice/i],
  ['CBP', /customs and border protection|cbp/i],
  ['DHS', /department of homeland security|dhs/i],
];

export function detectAgency(text: string): ImmigrationAgency {
  return agencyPattern.find(([, pattern]) => pattern.test(text))?.[0] ?? 'UNKNOWN';
}

export function detectNoticeType(text: string): NoticeType {
  if (/request for evidence|\brfe\b/i.test(text)) return 'RFE';
  if (/notice of intent to deny|\bnoid\b/i.test(text)) return 'NOID';
  if (/receipt notice|receipt number|case was received/i.test(text)) return 'receipt';
  if (/biometrics/i.test(text)) return 'biometrics';
  if (/interview/i.test(text)) return 'interview';
  if (/appointment/i.test(text)) return 'appointment';
  if (/decision|we approved|we denied/i.test(text)) return 'decision';
  return 'unknown';
}

export function buildDocumentUnderstanding(input: { documentId: string; text: string; source: FactSource; language: SupportedLanguage }): DocumentUnderstanding {
  const { text, source, language } = input;
  const agency = detectAgency(text);
  const noticeType = detectNoticeType(text);
  const warnings: string[] = [];
  if (agency === 'UNKNOWN') warnings.push('Agency could not be confidently identified.');
  if (noticeType === 'unknown') warnings.push('Notice type could not be confidently identified.');
  return {
    agency, noticeType, detectedLanguage: language,
    plainLanguageSummary: 'Document analysis requires the configured Platform document/AI provider; this contract preserves provenance rather than inventing facts.',
    requestedActions: [], deadlines: [], facts: [], warnings,
  };
}

export function toImmigrationDocument(input: { id: string; filename: string; uploadedAt: string; understanding: DocumentUnderstanding }): ImmigrationDocument {
  return { id: input.id, filename: input.filename, type: input.understanding.noticeType, agency: input.understanding.agency, language: input.understanding.detectedLanguage, uploadedAt: input.uploadedAt, facts: input.understanding.facts };
}
