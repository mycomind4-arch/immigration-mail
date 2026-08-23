import { describe, it, expect } from 'vitest';
import { classifyStage, isExecutable, isGoldCertified, WORKFLOW_REGISTRY } from './workflow-foundry';

describe('FOIA Variant Consolidation', () => {
  it('eoir-foia is ALIAS (consolidated into uscis-foia)', () => {
    expect(classifyStage('eoir-foia')).toBe('ALIAS');
    expect(isExecutable('eoir-foia')).toBe(false);
  });

  it('ice-foia is ALIAS (consolidated into uscis-foia)', () => {
    expect(classifyStage('ice-foia')).toBe('ALIAS');
    expect(isExecutable('ice-foia')).toBe(false);
  });

  it('g-639-records is ALIAS (consolidated into uscis-foia)', () => {
    expect(classifyStage('g-639-records')).toBe('ALIAS');
    expect(isExecutable('g-639-records')).toBe(false);
  });

  it('supporting-evidence-letter is ALIAS (specialist module)', () => {
    expect(classifyStage('supporting-evidence-letter')).toBe('ALIAS');
    expect(isExecutable('supporting-evidence-letter')).toBe(false);
  });

  it('uscis-foia is GOLD-CERTIFIED (canonical FOIA engine)', () => {
    expect(classifyStage('uscis-foia')).toBe('GOLD-CERTIFIED');
    expect(isGoldCertified('uscis-foia')).toBe(true);
    expect(isExecutable('uscis-foia')).toBe(true);
  });

  it('no CATALOG workflows remain', () => {
    const catalog = WORKFLOW_REGISTRY.filter(w => w.stage === 'CATALOG');
    expect(catalog).toHaveLength(0);
  });

  it('9 GOLD-CERTIFIED canonical workflows exist', () => {
    const gold = WORKFLOW_REGISTRY.filter(w => w.stage === 'GOLD-CERTIFIED');
    expect(gold.length).toBe(9);
    const slugs = gold.map(w => w.slug).sort();
    expect(slugs).toEqual([
      'case-inquiry',
      'i-130-response',
      'i-797-notice',
      'immigration-appeal-letter',
      'noid-response',
      'rfe-response',
      'uscis-denial-rejection',
      'uscis-foia',
      'visa-refusal-response',
    ]);
  });

  it('15 ALIAS workflows exist (form variants + consolidated)', () => {
    const aliases = WORKFLOW_REGISTRY.filter(w => w.stage === 'ALIAS');
    expect(aliases.length).toBe(15);
  });

  it('3 EXECUTABLE workflows exist (not yet GOLD)', () => {
    const exec = WORKFLOW_REGISTRY.filter(w => w.stage === 'EXECUTABLE');
    expect(exec.length).toBe(3);
    const slugs = exec.map(w => w.slug).sort();
    expect(slugs).toEqual(['explanation-letter', 'respond-to-notice', 'supporting-documents']);
  });

  it('total canonical workflows = 27 (9 GOLD + 3 EXECUTABLE + 15 ALIAS)', () => {
    expect(WORKFLOW_REGISTRY.length).toBe(27);
  });
});
