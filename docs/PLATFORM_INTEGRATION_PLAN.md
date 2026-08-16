# Immigration-Mail × MailMyPDF Platform

Immigration-Mail is the flagship reference vertical for the MailMyPDF ecosystem. The vertical owns immigration-specific workflows, terminology, UX, prompts, and domain policy. Shared capabilities belong in the Platform and should be consumed through stable provider-neutral boundaries.

## Platform capabilities to consume

| Capability | Platform source | Immigration-Mail use |
|---|---|---|
| Document security + provenance | `@mailmypdf/documents` | Safe upload, hashes, source references, document relationships |
| Document intelligence | `@mailmypdf/document-intelligence` | OCR/layout extraction and classification |
| Structured AI | `@mailmypdf/ai` | Fact extraction, explanations, drafting, preflight |
| Voice | `@mailmypdf/voice` + `@mailmypdf/voice-client` | Multilingual conversational assistant |
| Evidence / timeline / deadlines | Platform contracts | Case timeline and response planning |
| Ecosystem identity/usage | MailMyPDF ecosystem contracts | One account, metered rich workflows |
| Mailing / tracking / proof | MailMyPDF | Final fulfillment and permanent mailing record |

## New vertical technology being introduced here

1. Immigration document taxonomy and agency classification.
2. Source-backed immigration facts and deadlines.
3. Independent language preferences for UI, assistant, document, and mailing output.
4. Approval-gated voice actions.
5. Deterministic correspondence preflight before provider/AI review.
6. Case context linking documents, facts, deadlines, and correspondence.

These contracts are intentionally provider-neutral so the vertical can adopt the Platform packages without binding the product to a specific AI, OCR, or realtime voice vendor.

## Flagship experience

`Upload / photograph a letter → understand it → identify what is being requested → build a case context → prepare a response → review → preflight → mail → track → prove → follow up.`

## Safety boundary

The system must never invent facts, deadlines, requirements, or legal conclusions. Extracted facts and AI suggestions remain reviewable and source-linked. Inferred dates must be clearly marked as inferred. Mailing and other consequential actions require explicit user approval.
