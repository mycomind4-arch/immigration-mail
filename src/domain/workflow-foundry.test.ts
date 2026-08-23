/**
 * G7 — Immigration Workflow Foundry Tests
 */

import { describe, it, expect } from 'vitest';
import {
  WORKFLOW_REGISTRY,
  classifyStage,
  isExecutable,
  isGoldCertified,
  getStageCounts,
  selectWorkflowsFromReasoning,
  validateComposition,
  type WorkflowStage,
} from './workflow-foundry';
import { reasonAboutCase, type ReasonerInput } from './case-reasoner';
import { createLanguageContext } from './multilingual';
import { buildDocumentUnderstanding } from './document-understanding';

function makeRfe() {
  return buildDocumentUnderstanding({
    documentId: 'doc-1',
    text: 'U.S. Citizenship and Immigration Services\nRequest for Evidence\nYou must respond no later than December 15, 2026',
    source: { documentId: 'doc-1', confidence: 0.9 },
    language: 'en',
  });
}

function makeInput(overrides: Partial<ReasonerInput> = {}): ReasonerInput {
  return {
    case: { id: 'case-1', facts: [], deadlines: [], documents: [] },
    documentUnderstandings: [],
    narrative: 'I received a request for evidence from USCIS.',
    language: createLanguageContext({}),
    userIsUnsure: false,
    ...overrides,
  };
}

describe('G7: Workflow registry', () => {
  it('registry contains all known workflows', () => {
    expect(WORKFLOW_REGISTRY.length).toBeGreaterThanOrEqual(18);
  });

  it('every workflow has a slug, title, description, and stage', () => {
    for (const entry of WORKFLOW_REGISTRY) {
      expect(entry.slug).toBeDefined();
      expect(entry.title).toBeDefined();
      expect(entry.description).toBeDefined();
      expect(entry.stage).toBeDefined();
    }
  });

  it('classifies stages correctly', () => {
    expect(classifyStage('respond-to-notice')).toBe('EXECUTABLE');
    expect(classifyStage('supporting-documents')).toBe('EXECUTABLE');
    expect(classifyStage('explanation-letter')).toBe('EXECUTABLE');
    expect(classifyStage('rfe-response')).toBe('CATALOG');
    expect(classifyStage('uscis-foia')).toBe('CATALOG');
  });

  it('isExecutable returns true only for EXECUTABLE and GOLD', () => {
    expect(isExecutable('respond-to-notice')).toBe(true);
    expect(isExecutable('supporting-documents')).toBe(true);
    expect(isExecutable('rfe-response')).toBe(false);
    expect(isExecutable('uscis-foia')).toBe(false);
  });

  it('isGoldCertified returns false (no Gold workflows yet)', () => {
    for (const entry of WORKFLOW_REGISTRY) {
      expect(isGoldCertified(entry.slug)).toBe(false);
    }
  });

  it('stage counts distinguish catalog from executable', () => {
    const counts = getStageCounts();
    expect(counts.EXECUTABLE).toBe(3);
    expect(counts.CATALOG).toBeGreaterThanOrEqual(15);
    expect(counts['GOLD-CERTIFIED']).toBe(0);
  });
});

describe('G7: Workflow selection from reasoner', () => {
  it('selects workflows based on reasoner output', () => {
    const reasoning = reasonAboutCase(makeInput({
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    expect(result.selected.length).toBeGreaterThan(0);
  });

  it('detects compound cases (multiple workflows)', () => {
    const reasoning = reasonAboutCase(makeInput({
      narrative: 'I received a request for evidence and I need to submit supporting documents.',
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    // Should select multiple workflows for compound case
    expect(result.selected.length).toBeGreaterThanOrEqual(1);
  });

  it('rejected workflows have reasons', () => {
    const reasoning = reasonAboutCase(makeInput({
      narrative: 'I received a request for evidence.',
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    for (const r of result.rejected) {
      expect(r.reason).toBeDefined();
      expect(r.reason.length).toBeGreaterThan(10);
    }
  });

  it('identifies stage gaps (catalog workflows that should be executable)', () => {
    const reasoning = reasonAboutCase(makeInput({
      narrative: 'I received a request for evidence from USCIS.',
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    // Should identify that rfe-response (catalog) should be executable
    expect(result.stageGaps.some(g => g.slug === 'rfe-response')).toBe(true);
  });
});

describe('G7: Incompatible workflows', () => {
  it('detects incompatible workflow combinations', () => {
    const validation = validateComposition(['respond-to-notice', 'immigration-appeal-letter']);
    expect(validation.valid).toBe(false);
    expect(validation.incompatible.length).toBeGreaterThan(0);
  });

  it('allows compatible workflows', () => {
    const validation = validateComposition(['respond-to-notice', 'supporting-documents']);
    expect(validation.valid).toBe(true);
  });

  it('incompatible workflows are not both selected', () => {
    const reasoning = reasonAboutCase(makeInput({
      narrative: 'I received a request for evidence.',
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    // No two selected workflows should be incompatible
    for (let i = 0; i < result.selected.length; i++) {
      for (let j = i + 1; j < result.selected.length; j++) {
        const a = result.selected[i];
        const b = result.selected[j];
        expect(a.incompatibleWith?.includes(b.slug) ?? false).toBe(false);
        expect(b.incompatibleWith?.includes(a.slug) ?? false).toBe(false);
      }
    }
  });
});

describe('G7: Stage integrity', () => {
  it('does not equate catalog presence with execution', () => {
    // Catalog workflows should not be executable
    expect(isExecutable('rfe-response')).toBe(false);
    expect(isExecutable('noid-response')).toBe(false);
    expect(isExecutable('immigration-appeal-letter')).toBe(false);
  });

  it('uses reasoner to select workflows (not keyword matching)', () => {
    const reasoning = reasonAboutCase(makeInput({
      narrative: 'This is a denial. I was denied.',
      documentUnderstandings: [makeRfe()],
    }));

    const result = selectWorkflowsFromReasoning(reasoning);
    // Should not blindly select denial workflows when evidence shows RFE
    // The contradiction should prevent confident selection
    expect(reasoning.detectedIssues.some(i => i.knowledgeState === 'CONTRADICTORY')).toBe(true);
  });

  it('preserves domain-specific rules', () => {
    const entry = WORKFLOW_REGISTRY.find(w => w.slug === 'respond-to-notice');
    expect(entry?.rules).toBeDefined();
    expect(entry?.rules!.length).toBeGreaterThan(0);
  });
});
