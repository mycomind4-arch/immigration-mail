/**
 * Homepage Data — Canonical Workflow Cards & Concierge Configuration
 *
 * This module is the single source of truth for what appears on the homepage.
 * It is importable by both the route component and tests, keeping the
 * homepage testable without React rendering.
 *
 * Rules:
 *  - No internal workflow IDs are exposed in display text.
 *  - Every card routes to a real page.
 *  - Only Gold-Certified canonical workflows appear as specialized cards.
 *  - The AI Concierge is the front door — not the workflow grid.
 */

import { CERTIFICATION_REGISTRY, isCertified } from '@/domain/certification-registry';
import { WORKFLOW_REGISTRY, isGoldCertified, isExecutable, classifyStage } from '@/domain/workflow-foundry';

export interface CanonicalWorkflowCard {
  /** Human-readable display name (never an internal ID) */
  title: string;
  /** Plain-language purpose for the user */
  purpose: string;
  /** Route path (user-facing URL, not internal slug) */
  route: string;
  /** Whether this workflow is Gold-certified */
  gold: boolean;
  /** Badge text shown to users */
  badge?: string;
}

/**
 * The canonical specialized workflow cards shown on the homepage.
 * Only workflows that are Gold-Certified in the workflow foundry appear here.
 * The order is deliberate: most urgent / common first.
 */
export const CANONICAL_WORKFLOW_CARDS: readonly CanonicalWorkflowCard[] = [
  {
    title: 'Respond to an RFE',
    purpose: "USCIS requested evidence? Upload the notice, identify what's needed, draft your response, and mail it.",
    route: '/rfe',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Respond to a NOID',
    purpose: 'Notice of Intent to Deny? Identify the grounds, build your response, and mail it before the deadline.',
    route: '/noid',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Respond to a Denial',
    purpose: 'USCIS denied your case? Evaluate appeal, motion to reopen, or reapply — then prepare and mail your response.',
    route: '/uscis-denial',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Respond to a Visa Refusal',
    purpose: 'Visa refused under 221(g) or ineligibility? Prepare a rebuttal or waiver response and mail it to the consulate.',
    route: '/visa-refusal',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Respond to I-130 Request',
    purpose: 'I-130 petition issue? Handle RFE, NOID, or denial for family petitions — spouse, parent, child, sibling.',
    route: '/i-130',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Request Records (FOIA)',
    purpose: 'Need your A-File or immigration records? Prepare a FOIA request with identity verification and mail it.',
    route: '/uscis-foia',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Prepare an Appeal',
    purpose: 'Appealing an immigration decision? Identify what to appeal, draft the appeal letter, and mail it on time.',
    route: '/appeal',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Understand an I-797',
    purpose: "Received an I-797 notice? Upload it and we'll classify the subtype, explain what it means, and route you.",
    route: '/i-797-notice',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Submit a Case Inquiry',
    purpose: 'Case taking too long? Check if it is outside processing time, prepare a service request or expedite request, and mail it.',
    route: '/case-inquiry',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Resolve a Biometrics Issue',
    purpose: 'Need to reschedule, missed your appointment, or have an ASC location problem? We prepare and mail your biometrics letter.',
    route: '/biometrics-scheduling',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Resolve a Naturalization Issue',
    purpose: 'Preparing for your N-400 interview, need to reschedule, missed your interview, or have an oath ceremony problem? We prepare and mail your letter.',
    route: '/naturalization-citizenship',
    gold: true,
    badge: 'Gold Certified',
  },
  {
    title: 'Resolve a Consular Processing Issue',
    purpose: 'Need help with DS-260, NVC fees, civil documents, consular interview prep, rescheduling, priority date retrogression, or visa expiration? We prepare and mail your letter.',
    route: '/consular-processing',
    gold: true,
    badge: 'Gold Certified',
  },
];

/**
 * General starting points — simpler workflows for users who don't know
 * which specialized path they need. These route to the generic workflow engine.
 */
export const GENERAL_WORKFLOW_CARDS: readonly CanonicalWorkflowCard[] = [
  {
    title: 'Respond to a Notice',
    purpose: 'Organize a notice, confirm the important details, prepare a response, and get it ready to mail.',
    route: '/workflows/respond-to-notice',
    gold: false,
  },
  {
    title: 'Submit Supporting Documents',
    purpose: 'Prepare a clear cover letter and organize supporting documentation for a mailing.',
    route: '/workflows/supporting-documents',
    gold: false,
  },
  {
    title: 'Prepare an Explanation Letter',
    purpose: 'Turn your own facts and instructions into a professional, editable correspondence draft.',
    route: '/workflows/explanation-letter',
    gold: false,
  },
];

/**
 * Concierge configuration — the front door of the product.
 */
export const CONCIERGE_CONFIG = {
  headline: 'What happened?',
  subheadline: 'Tell us in your own words. We will figure out what you need and get it done.',
  primaryCta: { label: 'Start a Conversation', route: '/respond-to-a-uscis-notice' },
  secondaryCta: { label: 'Upload a Document', route: '/analyze' },
  voiceCta: { label: 'Talk to Me', route: '/respond-to-a-uscis-notice?voice=true' },
  examples: [
    'I got a letter from USCIS.',
    'My visa was refused.',
    "I don't understand this notice.",
    'The police took my passport.',
    'I need my immigration records.',
    'My I-130 has a problem.',
    "I don't know what to do.",
  ],
} as const;

/**
 * Language configuration for the homepage.
 */
export const HOMEPAGE_LANGUAGES = {
  en: { label: 'English', conciergeHeadline: 'What happened?', startCta: 'Start a Conversation', uploadCta: 'Upload a Document', voiceCta: 'Talk to Me' },
  es: { label: 'Español', conciergeHeadline: '¿Qué pasó?', startCta: 'Iniciar una Conversación', uploadCta: 'Subir un Documento', voiceCta: 'Háblame' },
} as const;

export type HomepageLanguage = keyof typeof HOMEPAGE_LANGUAGES;

/**
 * Validation helpers
 */

/** Internal workflow IDs that must never appear in user-facing display text */
const INTERNAL_ID_PATTERNS = [
  /rfe-response/i,
  /noid-response/i,
  /uscis-denial-rejection/i,
  /visa-refusal-response/i,
  /i-130-response/i,
  /uscis-foia/i,
  /immigration-appeal-letter/i,
  /i-797-notice/i,
  /respond-to-notice/i,
  /supporting-documents/i,
  /explanation-letter/i,
  /supporting-evidence-letter/i,
];

export function containsInternalId(text: string): boolean {
  return INTERNAL_ID_PATTERNS.some(p => p.test(text));
}

/** All routes that should exist for canonical workflow cards */
export function getCanonicalRoutes(): string[] {
  return CANONICAL_WORKFLOW_CARDS.map(c => c.route);
}

/** All routes for general workflow cards */
export function getGeneralRoutes(): string[] {
  return GENERAL_WORKFLOW_CARDS.map(c => c.route);
}

/** Verify every Gold-certified workflow in the foundry has a homepage card */
export function getGoldWorkflowsWithoutCards(): string[] {
  const cardRoutes = new Set(CANONICAL_WORKFLOW_CARDS.map(c => c.route));
  const goldSlugs = WORKFLOW_REGISTRY
    .filter(w => w.stage === 'GOLD-CERTIFIED')
    .map(w => w.slug);

  // Map gold slugs to expected routes
  const slugToRoute: Record<string, string> = {
    'rfe-response': '/rfe',
    'noid-response': '/noid',
    'uscis-denial-rejection': '/uscis-denial',
    'visa-refusal-response': '/visa-refusal',
    'i-130-response': '/i-130',
    'uscis-foia': '/uscis-foia',
    'immigration-appeal-letter': '/appeal',
    'i-797-notice': '/i-797-notice',
    'case-inquiry': '/case-inquiry',
    'biometrics-scheduling': '/biometrics-scheduling',
    'naturalization-citizenship': '/naturalization-citizenship',
    'consular-processing': '/consular-processing',
  };

  return goldSlugs.filter(slug => {
    const route = slugToRoute[slug];
    return route && !cardRoutes.has(route);
  });
}

/** Verify no alias or catalog workflow is presented as executable on the homepage */
export function getNonExecutableCardsOnHomepage(): string[] {
  const allCards = [...CANONICAL_WORKFLOW_CARDS, ...GENERAL_WORKFLOW_CARDS];
  const generalRoutes = new Set(GENERAL_WORKFLOW_CARDS.map(c => c.route));

  return allCards
    .filter(c => !c.gold && !generalRoutes.has(c.route))
    .filter(c => {
      // Check if the route maps to a non-executable workflow
      const foundryEntry = WORKFLOW_REGISTRY.find(w => {
        const slugToRoute: Record<string, string> = {
          'rfe-response': '/rfe',
          'noid-response': '/noid',
          'uscis-denial-rejection': '/uscis-denial',
          'visa-refusal-response': '/visa-refusal',
          'i-130-response': '/i-130',
          'uscis-foia': '/uscis-foia',
          'immigration-appeal-letter': '/appeal',
          'i-797-notice': '/i-797-notice',
          'respond-to-notice': '/workflows/respond-to-notice',
          'supporting-documents': '/workflows/supporting-documents',
          'explanation-letter': '/workflows/explanation-letter',
        };
        return slugToRoute[w.slug] === c.route;
      });
      return foundryEntry && !isExecutable(foundryEntry.slug);
    })
    .map(c => c.title);
}
