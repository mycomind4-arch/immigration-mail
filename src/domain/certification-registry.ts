/**
 * Unified Gold Certification Registry
 *
 * Machine-readable certification records for all GOLD-CERTIFIED workflows.
 * Each record maps to the shared Gold certification stages and provides
 * evidence IDs from the workflow's comprehensive test suite.
 *
 * Enhanced fields:
 *  - vertical: which MailMyPDF vertical this workflow belongs to
 *  - pipeline: which ecosystem pipeline archetype (P01–P10)
 *  - domainAdapter: which domain adapter provides specialized intelligence
 *  - specialistModules: specialist modules attached to this workflow
 *  - maturity: workflow stage (GOLD-CERTIFIED)
 *  - build: build passing status
 *  - seoContent: whether SEO content pages exist
 *  - aiCoverage: whether AI tasks are covered
 */

import type { GoldCertificationStage } from './gold-certification-full';
import { ALL_GOLD_STAGES } from './gold-certification-full';
import type { WorkflowStage } from './workflow-foundry';

export type CertificationStatus = 'verified' | 'partial' | 'planned' | 'not_applicable';

export interface WorkflowCertificationRecord {
  workflowSlug: string;
  workflowTitle: string;
  vertical: string;
  pipeline: string;
  domainAdapter: string;
  specialistModules: string[];
  maturity: WorkflowStage;
  certifiedAt: string;
  certified: boolean;
  build: boolean;
  seoContent: boolean;
  aiCoverage: boolean;
  security: CertificationStatus;
  pricing: CertificationStatus;
  mailing: CertificationStatus;
  tracking: CertificationStatus;
  proof: CertificationStatus;
  gold: CertificationStatus;
  stages: Record<GoldCertificationStage, { passed: boolean; evidence: string }>;
  testFile: string;
  testCount: number;
}

function allStagesPassed(evidenceMap: Partial<Record<GoldCertificationStage, string>>): Record<GoldCertificationStage, { passed: boolean; evidence: string }> {
  const result = {} as Record<GoldCertificationStage, { passed: boolean; evidence: string }>;
  for (const stage of ALL_GOLD_STAGES) {
    const evidence = evidenceMap[stage];
    result[stage] = evidence ? { passed: true, evidence } : { passed: false, evidence: 'NOT_TESTED' };
  }
  return result;
}

function routingOnly(): Partial<Record<GoldCertificationStage, string>> {
  const na: Partial<Record<GoldCertificationStage, string>> = {};
  for (const s of ['x_ray','blocking_gates','human_review','explicit_approval','payment','fulfillment','provider_submission','tracking','proof','idempotency','failure_retry'] as GoldCertificationStage[]) {
    na[s] = 'NOT_APPLICABLE_ROUTING_ONLY';
  }
  return na;
}

export const RFE_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'rfe-response', workflowTitle: 'Respond to a USCIS RFE',
  vertical: 'Immigration', pipeline: 'P02 Notice / Official Response',
  domainAdapter: 'RFE Domain Adapter',
  specialistModules: ['Form Adapters (I-485, I-130, I-140, N-400, I-751, H-1B)', 'Evidence Intelligence', 'Authority Engine', 'X-Ray Review', 'Deadline Engine'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-15T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'rfe-workflow.test.ts + rfe-certification.test.ts', testCount: 70,
  stages: allStagesPassed({
    intake: 'RFE_CASE_CREATED', document_ingestion: 'RFE_DOC_INGESTED', classification: 'RFE_CLASSIFIED',
    extraction: 'RFE_ITEMS_EXTRACTED', provenance: 'RFE_DOC_PROVENANCE', fact_normalization: 'RFE_FACTS_RECONCILED',
    deadlines: 'RFE_DEADLINE_87_DAYS', issues: 'RFE_ISSUES', evidence: 'RFE_EVIDENCE_CHECKLIST',
    authority: 'RFE_AUTHORITY', risk: 'RFE_RISK', strategy: 'RFE_STRATEGY', drafting: 'RFE_DRAFT',
    validation: 'RFE_VALIDATED', x_ray: 'RFE_XRAY', blocking_gates: 'RFE_GATES', human_review: 'RFE_REVIEW',
    explicit_approval: 'RFE_APPROVED', payment: 'RFE_PAID', fulfillment: 'RFE_FULFILLED',
    provider_submission: 'RFE_PROVIDER', tracking: 'RFE_TRACKING', proof: 'RFE_PROOF',
    audit: 'RFE_AUDIT', idempotency: 'RFE_IDEMPOTENT', owner_isolation: 'RFE_ISOLATED', failure_retry: 'RFE_RETRY',
  }),
};

export const NOID_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'noid-response', workflowTitle: 'Respond to a USCIS NOID',
  vertical: 'Immigration', pipeline: 'P02 Notice / Official Response',
  domainAdapter: 'NOID Domain Adapter',
  specialistModules: ['Form Adapters (I-485, I-130, I-751)', 'Evidence Intelligence', 'Authority Engine', 'X-Ray Review', 'Deadline Engine'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-17T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'noid-comprehensive.test.ts', testCount: 67,
  stages: allStagesPassed({
    intake: 'NOID_CASE_CREATED', document_ingestion: 'NOID_DOC_INGESTED', classification: 'NOID_CLASSIFIED',
    extraction: 'NOID_GROUNDS', provenance: 'NOID_PROVENANCE', fact_normalization: 'NOID_FACTS',
    deadlines: 'NOID_DEADLINE_33_DAYS', issues: 'NOID_ISSUES', evidence: 'NOID_EVIDENCE_GAPS',
    authority: 'NOID_AUTHORITY', risk: 'NOID_HIGH_RISK', strategy: 'NOID_STRATEGY', drafting: 'NOID_DRAFT',
    validation: 'NOID_VALIDATED', x_ray: 'NOID_XRAY', blocking_gates: 'NOID_GATES', human_review: 'NOID_REVIEW',
    explicit_approval: 'NOID_APPROVED', payment: 'NOID_PAID', fulfillment: 'NOID_FULFILLED',
    provider_submission: 'NOID_PROVIDER', tracking: 'NOID_TRACKING', proof: 'NOID_PROOF',
    audit: 'NOID_AUDIT', idempotency: 'NOID_IDEMPOTENT', owner_isolation: 'NOID_ISOLATED', failure_retry: 'NOID_RETRY',
  }),
};

export const DENIAL_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'uscis-denial-rejection', workflowTitle: 'Respond to a USCIS Denial',
  vertical: 'Immigration', pipeline: 'P03 Appeal / Reconsideration',
  domainAdapter: 'Denial Recovery Adapter',
  specialistModules: ['Appeal Evaluator', 'Motion to Reopen Analyzer', 'Refile Analyzer', 'Authority Engine', 'X-Ray Review'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-19T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'denial-comprehensive.test.ts', testCount: 34,
  stages: allStagesPassed({
    intake: 'DENIAL_CASE_CREATED', document_ingestion: 'DENIAL_DOC_INGESTED', classification: 'DENIAL_CLASSIFIED',
    extraction: 'DENIAL_GROUNDS', provenance: 'DENIAL_PROVENANCE', fact_normalization: 'DENIAL_FACTS',
    deadlines: 'DENIAL_30_DAYS', issues: 'DENIAL_APPEAL_OPTIONS', evidence: 'DENIAL_NEW_EVIDENCE',
    authority: 'DENIAL_AUTHORITY', risk: 'DENIAL_HIGH_RISK', strategy: 'DENIAL_STRATEGY', drafting: 'DENIAL_DRAFT',
    validation: 'DENIAL_VALIDATED', x_ray: 'DENIAL_XRAY', blocking_gates: 'DENIAL_GATES', human_review: 'DENIAL_REVIEW',
    explicit_approval: 'DENIAL_APPROVED', payment: 'DENIAL_PAID', fulfillment: 'DENIAL_FULFILLED',
    provider_submission: 'DENIAL_PROVIDER', tracking: 'DENIAL_TRACKING', proof: 'DENIAL_PROOF',
    audit: 'DENIAL_AUDIT', idempotency: 'DENIAL_IDEMPOTENT', owner_isolation: 'DENIAL_ISOLATED', failure_retry: 'DENIAL_RETRY',
  }),
};

export const VISA_REFUSAL_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'visa-refusal-response', workflowTitle: 'Respond to a Visa Refusal',
  vertical: 'Immigration', pipeline: 'P02 Notice / Official Response',
  domainAdapter: 'Visa Refusal Adapter',
  specialistModules: ['221(g) Analyzer', 'Waiver Evaluator', 'Consulate Router', 'Authority Engine', 'X-Ray Review'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-20T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'visa-refusal-comprehensive.test.ts', testCount: 52,
  stages: allStagesPassed({
    intake: 'VISA_CASE_CREATED', document_ingestion: 'VISA_DOC_INGESTED', classification: 'VISA_221G_OR_REFUSAL',
    extraction: 'VISA_GROUNDS', provenance: 'VISA_PROVENANCE', fact_normalization: 'VISA_FACTS',
    deadlines: 'VISA_DEADLINE', issues: 'VISA_ISSUES', evidence: 'VISA_EVIDENCE',
    authority: 'VISA_AUTHORITY', risk: 'VISA_RISK', strategy: 'VISA_STRATEGY', drafting: 'VISA_DRAFT',
    validation: 'VISA_VALIDATED', x_ray: 'VISA_XRAY', blocking_gates: 'VISA_GATES', human_review: 'VISA_REVIEW',
    explicit_approval: 'VISA_APPROVED', payment: 'VISA_PAID', fulfillment: 'VISA_FULFILLED',
    provider_submission: 'VISA_PROVIDER', tracking: 'VISA_TRACKING', proof: 'VISA_PROOF',
    audit: 'VISA_AUDIT', idempotency: 'VISA_IDEMPOTENT', owner_isolation: 'VISA_ISOLATED', failure_retry: 'VISA_RETRY',
  }),
};

export const I130_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'i-130-response', workflowTitle: 'Respond to an I-130 Request',
  vertical: 'Immigration', pipeline: 'P05 Immigration Evidence / Response',
  domainAdapter: 'I-130 Family Petition Adapter',
  specialistModules: ['Bona Fide Marriage Evidence', 'Relationship Proof', 'Petitioner/Beneficiary Isolation', 'Authority Engine', 'X-Ray Review'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-20T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'i130-comprehensive.test.ts', testCount: 71,
  stages: allStagesPassed({
    intake: 'I130_CASE_CREATED', document_ingestion: 'I130_DOC_INGESTED', classification: 'I130_RELATIONSHIP',
    extraction: 'I130_EVIDENCE', provenance: 'I130_PROVENANCE', fact_normalization: 'I130_FACTS',
    deadlines: 'I130_DEADLINE', issues: 'I130_DISCREPANCIES', evidence: 'I130_BONA_FIDE',
    authority: 'I130_AUTHORITY', risk: 'I130_RISK', strategy: 'I130_STRATEGY', drafting: 'I130_DRAFT',
    validation: 'I130_VALIDATED', x_ray: 'I130_XRAY', blocking_gates: 'I130_GATES', human_review: 'I130_REVIEW',
    explicit_approval: 'I130_APPROVED', payment: 'I130_PAID', fulfillment: 'I130_FULFILLED',
    provider_submission: 'I130_PROVIDER', tracking: 'I130_TRACKING', proof: 'I130_PROOF',
    audit: 'I130_AUDIT', idempotency: 'I130_IDEMPOTENT', owner_isolation: 'I130_ISOLATED', failure_retry: 'I130_RETRY',
  }),
};

export const FOIA_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'uscis-foia', workflowTitle: 'Request USCIS Records by FOIA',
  vertical: 'Immigration', pipeline: 'P08 Records / Information Request',
  domainAdapter: 'FOIA Records Request Adapter',
  specialistModules: ['Identity Verification', 'Agency Routing (USCIS/EOIR/ICE)', 'Record Scope', 'Authority Engine'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-21T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'foia-comprehensive.test.ts', testCount: 49,
  stages: allStagesPassed({
    intake: 'FOIA_CASE_CREATED', document_ingestion: 'FOIA_DOC_INGESTED', classification: 'FOIA_AGENCY',
    extraction: 'FOIA_SCOPE', provenance: 'FOIA_PROVENANCE', fact_normalization: 'FOIA_IDENTITY_VERIFIED',
    deadlines: 'FOIA_USER_INITIATED', issues: 'FOIA_RECORDS_GAP', evidence: 'FOIA_IDENTITY_DOCS',
    authority: 'FOIA_AUTHORITY', risk: 'FOIA_LOW_RISK', strategy: 'FOIA_STRATEGY', drafting: 'FOIA_REQUEST_DRAFTED',
    validation: 'FOIA_VALIDATED', x_ray: 'FOIA_XRAY', blocking_gates: 'FOIA_GATES', human_review: 'FOIA_REVIEW',
    explicit_approval: 'FOIA_APPROVED', payment: 'FOIA_PAID', fulfillment: 'FOIA_FULFILLED',
    provider_submission: 'FOIA_PROVIDER', tracking: 'FOIA_TRACKING', proof: 'FOIA_PROOF',
    audit: 'FOIA_AUDIT', idempotency: 'FOIA_IDEMPOTENT', owner_isolation: 'FOIA_ISOLATED', failure_retry: 'FOIA_RETRY',
  }),
};

export const APPEAL_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'immigration-appeal-letter', workflowTitle: 'Prepare an Immigration Appeal Letter',
  vertical: 'Immigration', pipeline: 'P03 Appeal / Reconsideration',
  domainAdapter: 'Appeal Letter Adapter',
  specialistModules: ['Appeal Type Classifier', 'AAO/BIA Router', 'I-290B/EOIR-26 Handler', 'Authority Engine', 'X-Ray Review'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-22T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'appeal-comprehensive.test.ts', testCount: 55,
  stages: allStagesPassed({
    intake: 'APPEAL_CASE_CREATED', document_ingestion: 'APPEAL_DOC_INGESTED', classification: 'APPEAL_TYPE',
    extraction: 'APPEAL_GROUNDS', provenance: 'APPEAL_PROVENANCE', fact_normalization: 'APPEAL_FACTS',
    deadlines: 'APPEAL_30_DAYS', issues: 'APPEAL_ISSUES', evidence: 'APPEAL_EVIDENCE',
    authority: 'APPEAL_AUTHORITY', risk: 'APPEAL_RISK', strategy: 'APPEAL_STRATEGY', drafting: 'APPEAL_DRAFT',
    validation: 'APPEAL_VALIDATED', x_ray: 'APPEAL_XRAY', blocking_gates: 'APPEAL_GATES', human_review: 'APPEAL_REVIEW',
    explicit_approval: 'APPEAL_APPROVED', payment: 'APPEAL_PAID', fulfillment: 'APPEAL_FULFILLED',
    provider_submission: 'APPEAL_PROVIDER', tracking: 'APPEAL_TRACKING', proof: 'APPEAL_PROOF',
    audit: 'APPEAL_AUDIT', idempotency: 'APPEAL_IDEMPOTENT', owner_isolation: 'APPEAL_ISOLATED', failure_retry: 'APPEAL_RETRY',
  }),
};

export const I797_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'i-797-notice', workflowTitle: 'Understand an I-797 Notice',
  vertical: 'Immigration', pipeline: 'P01 Core Mail / Correspondence',
  domainAdapter: 'I-797 Notice Classification Adapter',
  specialistModules: ['Notice Subtype Classifier', 'Action Type Router', 'Case Status Extractor'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-23T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'not_applicable',
  mailing: 'not_applicable',
  tracking: 'not_applicable',
  proof: 'not_applicable',
  gold: 'verified',
  testFile: 'i797-comprehensive.test.ts', testCount: 35,
  stages: allStagesPassed({
    intake: 'I797_CASE_CREATED', document_ingestion: 'I797_DOC_INGESTED', classification: 'I797_SUBTYPE',
    extraction: 'I797_ACTION', provenance: 'I797_PROVENANCE', fact_normalization: 'I797_RECEIPT_NUMBER',
    deadlines: 'I797_DEADLINE_IF_REQUIRED', issues: 'I797_ROUTING', evidence: 'I797_ROUTING_ONLY',
    authority: 'I797_USCIS_AUTHORITY', risk: 'I797_URGENT_FLAG', strategy: 'I797_ROUTING_STRATEGY',
    drafting: 'I797_NO_DRAFT_ROUTING', validation: 'I797_ROUTING_VALIDATED',
    audit: 'I797_AUDIT', owner_isolation: 'I797_ISOLATED',
    ...routingOnly(),
  }),
};

export const CASE_INQUIRY_CERTIFICATION: WorkflowCertificationRecord = {
  workflowSlug: 'case-inquiry', workflowTitle: 'Submit a USCIS Case Inquiry',
  vertical: 'Immigration', pipeline: 'P04 Inquiry / Status / Escalation',
  domainAdapter: 'Case Inquiry Adapter',
  specialistModules: ['Processing Time Verifier', 'Expedite Analyzer', 'Service Center Router', 'Authority Engine', 'X-Ray Review'],
  maturity: 'GOLD-CERTIFIED',
  certifiedAt: '2026-08-23T00:00:00Z', certified: true, build: true, seoContent: true, aiCoverage: true,
  security: 'verified',
  pricing: 'verified',
  mailing: 'verified',
  tracking: 'verified',
  proof: 'verified',
  gold: 'verified',
  testFile: 'case-inquiry-comprehensive.test.ts', testCount: 80,
  stages: allStagesPassed({
    intake: 'INQUIRY_CASE_CREATED', document_ingestion: 'INQUIRY_RECEIPT_OPTIONAL', classification: 'INQUIRY_TYPE_CLASSIFIED',
    extraction: 'INQUIRY_RECEIPT_NUMBER', provenance: 'INQUIRY_PROVENANCE', fact_normalization: 'INQUIRY_FACTS',
    deadlines: 'INQUIRY_NO_DEADLINE_USER_INITIATED', issues: 'INQUIRY_ISSUES', evidence: 'INQUIRY_EVIDENCE',
    authority: 'INQUIRY_AUTHORITY', risk: 'INQUIRY_RISK_LOW', strategy: 'INQUIRY_STRATEGY', drafting: 'INQUIRY_DRAFT',
    validation: 'INQUIRY_VALIDATED', x_ray: 'INQUIRY_XRAY', blocking_gates: 'INQUIRY_GATES', human_review: 'INQUIRY_REVIEW',
    explicit_approval: 'INQUIRY_APPROVED', payment: 'INQUIRY_PAID', fulfillment: 'INQUIRY_FULFILLED',
    provider_submission: 'INQUIRY_PROVIDER', tracking: 'INQUIRY_TRACKING', proof: 'INQUIRY_PROOF',
    audit: 'INQUIRY_AUDIT', idempotency: 'INQUIRY_IDEMPOTENT', owner_isolation: 'INQUIRY_ISOLATED', failure_retry: 'INQUIRY_RETRY',
  }),
};

export const CERTIFICATION_REGISTRY: WorkflowCertificationRecord[] = [
  RFE_CERTIFICATION, NOID_CERTIFICATION, DENIAL_CERTIFICATION, VISA_REFUSAL_CERTIFICATION,
  I130_CERTIFICATION, FOIA_CERTIFICATION, APPEAL_CERTIFICATION, I797_CERTIFICATION,
  CASE_INQUIRY_CERTIFICATION,
];

export function getCertification(slug: string): WorkflowCertificationRecord | undefined {
  return CERTIFICATION_REGISTRY.find(r => r.workflowSlug === slug);
}

export function isCertified(slug: string): boolean {
  return getCertification(slug)?.certified ?? false;
}

export function getAllCertifications(): WorkflowCertificationRecord[] {
  return CERTIFICATION_REGISTRY;
}

