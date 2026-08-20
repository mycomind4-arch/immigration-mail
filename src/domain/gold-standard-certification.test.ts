import { describe, expect, it } from 'vitest';
import { certifyImmigrationPreflight } from './gold-standard-certification';
import type { ImmigrationCase } from './immigration-case';

const caseData = {
  facts: [{ key: 'receipt', value: 'ABC123', verified: true }],
  deadlines: [{ date: '2026-09-01', status: 'confirmed', source: { confidence: 0.95 } }],
} as unknown as ImmigrationCase;

describe('immigration gold-standard certification', () => {
  it('blocks consequential stages until human approval exists', () => {
    const stages = certifyImmigrationPreflight({
      caseData,
      recipient: 'USCIS',
      address: '123 Main St',
      draft: 'A complete response without placeholders.',
      requireDeadlineVerification: true,
      humanReviewApproved: false,
      mailingConfigured: true,
      proofConfigured: true,
    });

    expect(stages.find(stage => stage.stage === 'validation')?.status).toBe('passed');
    expect(stages.find(stage => stage.stage === 'review')?.status).toBe('blocked');
    expect(stages.find(stage => stage.stage === 'approval')?.status).toBe('blocked');
    expect(stages.find(stage => stage.stage === 'mailing')?.status).toBe('blocked');
  });

  it('requires mailing and proof configuration after approval', () => {
    const stages = certifyImmigrationPreflight({
      caseData,
      recipient: 'USCIS',
      address: '123 Main St',
      draft: 'A complete response without placeholders.',
      requireDeadlineVerification: true,
      humanReviewApproved: true,
      mailingConfigured: false,
      proofConfigured: false,
    });

    expect(stages.find(stage => stage.stage === 'approval')?.status).toBe('passed');
    expect(stages.find(stage => stage.stage === 'mailing')?.status).toBe('blocked');
    expect(stages.find(stage => stage.stage === 'proof')?.status).toBe('blocked');
  });

  it('permits Gold consequential stages only when all gates are satisfied', () => {
    const stages = certifyImmigrationPreflight({
      caseData,
      recipient: 'USCIS',
      address: '123 Main St',
      draft: 'A complete response without placeholders.',
      requireDeadlineVerification: true,
      humanReviewApproved: true,
      mailingConfigured: true,
      proofConfigured: true,
    });

    expect(stages.every(stage => stage.status === 'passed')).toBe(true);
  });
});
