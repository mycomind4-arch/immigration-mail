import { describe, it, expect } from 'vitest';
import {
  CERTIFICATION_REGISTRY,
  getCertification,
  isCertified,
  getAllCertifications,
  RFE_CERTIFICATION,
  NOID_CERTIFICATION,
  DENIAL_CERTIFICATION,
  VISA_REFUSAL_CERTIFICATION,
  I130_CERTIFICATION,
  FOIA_CERTIFICATION,
  APPEAL_CERTIFICATION,
  I797_CERTIFICATION,
} from './certification-registry';
import { ALL_GOLD_STAGES } from './gold-certification-full';

describe('Certification Registry', () => {
  it('contains 8 GOLD-CERTIFIED workflows', () => {
    expect(CERTIFICATION_REGISTRY).toHaveLength(8);
    expect(CERTIFICATION_REGISTRY.every(r => r.certified)).toBe(true);
  });

  it('all 8 workflows have certification records', () => {
    const slugs = CERTIFICATION_REGISTRY.map(r => r.workflowSlug).sort();
    expect(slugs).toEqual([
      'i-130-response', 'i-797-notice', 'immigration-appeal-letter', 'noid-response',
      'rfe-response', 'uscis-denial-rejection', 'uscis-foia', 'visa-refusal-response',
    ]);
  });

  it('each record has all 27 Gold stages', () => {
    for (const record of CERTIFICATION_REGISTRY) {
      const stageKeys = Object.keys(record.stages);
      expect(stageKeys.length).toBe(ALL_GOLD_STAGES.length);
      for (const stage of ALL_GOLD_STAGES) {
        expect(record.stages[stage]).toBeDefined();
        expect(typeof record.stages[stage].passed).toBe('boolean');
        expect(typeof record.stages[stage].evidence).toBe('string');
      }
    }
  });

  it('RFE has all stages passed', () => {
    expect(RFE_CERTIFICATION.certified).toBe(true);
    expect(RFE_CERTIFICATION.testCount).toBeGreaterThanOrEqual(70);
    const failed = Object.entries(RFE_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('NOID has all stages passed', () => {
    expect(NOID_CERTIFICATION.certified).toBe(true);
    expect(NOID_CERTIFICATION.testCount).toBeGreaterThanOrEqual(67);
    const failed = Object.entries(NOID_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('Denial has all stages passed', () => {
    expect(DENIAL_CERTIFICATION.certified).toBe(true);
    expect(DENIAL_CERTIFICATION.testCount).toBeGreaterThanOrEqual(34);
    const failed = Object.entries(DENIAL_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('Visa Refusal has all stages passed', () => {
    expect(VISA_REFUSAL_CERTIFICATION.certified).toBe(true);
    expect(VISA_REFUSAL_CERTIFICATION.testCount).toBeGreaterThanOrEqual(52);
    const failed = Object.entries(VISA_REFUSAL_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('I-130 has all stages passed', () => {
    expect(I130_CERTIFICATION.certified).toBe(true);
    expect(I130_CERTIFICATION.testCount).toBeGreaterThanOrEqual(71);
    const failed = Object.entries(I130_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('FOIA has all stages passed', () => {
    expect(FOIA_CERTIFICATION.certified).toBe(true);
    expect(FOIA_CERTIFICATION.testCount).toBeGreaterThanOrEqual(49);
    const failed = Object.entries(FOIA_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('Appeal has all stages passed', () => {
    expect(APPEAL_CERTIFICATION.certified).toBe(true);
    expect(APPEAL_CERTIFICATION.testCount).toBeGreaterThanOrEqual(55);
    const failed = Object.entries(APPEAL_CERTIFICATION.stages).filter(([, v]) => !v.passed);
    expect(failed).toHaveLength(0);
  });

  it('I-797 is certified as routing-only workflow', () => {
    expect(I797_CERTIFICATION.certified).toBe(true);
    expect(I797_CERTIFICATION.testCount).toBeGreaterThanOrEqual(35);
    expect(I797_CERTIFICATION.stages.drafting.evidence).toBe('I797_NO_DRAFT_ROUTING');
    expect(I797_CERTIFICATION.stages.payment.evidence).toBe('NOT_APPLICABLE_ROUTING_ONLY');
    expect(I797_CERTIFICATION.stages.fulfillment.evidence).toBe('NOT_APPLICABLE_ROUTING_ONLY');
    expect(I797_CERTIFICATION.stages.tracking.evidence).toBe('NOT_APPLICABLE_ROUTING_ONLY');
    expect(I797_CERTIFICATION.stages.proof.evidence).toBe('NOT_APPLICABLE_ROUTING_ONLY');
  });

  it('getCertification returns correct record', () => {
    expect(getCertification('rfe-response')?.workflowTitle).toBe('Respond to a USCIS RFE');
    expect(getCertification('noid-response')?.workflowTitle).toBe('Respond to a USCIS NOID');
    expect(getCertification('uscis-denial-rejection')?.workflowTitle).toBe('Respond to a USCIS Denial');
    expect(getCertification('visa-refusal-response')?.workflowTitle).toBe('Respond to a Visa Refusal');
    expect(getCertification('i-130-response')?.workflowTitle).toBe('Respond to an I-130 Request');
    expect(getCertification('uscis-foia')?.workflowTitle).toBe('Request USCIS Records by FOIA');
    expect(getCertification('immigration-appeal-letter')?.workflowTitle).toBe('Prepare an Immigration Appeal Letter');
    expect(getCertification('i-797-notice')?.workflowTitle).toBe('Understand an I-797 Notice');
    expect(getCertification('nonexistent')).toBeUndefined();
  });

  it('isCertified returns true for all 8 workflows', () => {
    expect(isCertified('rfe-response')).toBe(true);
    expect(isCertified('noid-response')).toBe(true);
    expect(isCertified('uscis-denial-rejection')).toBe(true);
    expect(isCertified('visa-refusal-response')).toBe(true);
    expect(isCertified('i-130-response')).toBe(true);
    expect(isCertified('uscis-foia')).toBe(true);
    expect(isCertified('immigration-appeal-letter')).toBe(true);
    expect(isCertified('i-797-notice')).toBe(true);
    expect(isCertified('nonexistent')).toBe(false);
  });

  it('getAllCertifications returns all 8', () => {
    expect(getAllCertifications()).toHaveLength(8);
    expect(getAllCertifications()).toBe(CERTIFICATION_REGISTRY);
  });

  it('every record has a valid ISO date', () => {
    for (const r of CERTIFICATION_REGISTRY) {
      const date = new Date(r.certifiedAt);
      expect(date.getTime()).not.toBeNaN();
    }
  });

  it('every record has a test file and positive test count', () => {
    for (const r of CERTIFICATION_REGISTRY) {
      expect(r.testFile.length).toBeGreaterThan(0);
      expect(r.testCount).toBeGreaterThan(0);
    }
  });
});
