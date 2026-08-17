# Immigration-Mail × MailMyPDF Platform

Immigration-Mail is the flagship reference vertical for the MailMyPDF ecosystem. The vertical owns immigration-specific workflows, terminology, UX, prompts, and domain policy. Shared capabilities belong in the Platform and are consumed through stable provider-neutral boundaries.

## Platform capabilities consumed

| Capability | Shared owner | Immigration-Mail use |
|---|---|---|
| Document security + provenance | MailMyPDF Platform | Safe upload, hashes, source references, document relationships |
| Document intelligence | MailMyPDF Platform | OCR/layout extraction, classification, structured understanding |
| Structured AI | MailMyPDF Platform | Fact extraction, explanations, drafting, deterministic preflight |
| Voice | MailMyPDF Platform | Multilingual conversational assistance with approval-gated actions |
| Evidence / timeline / deadlines | MailMyPDF Platform | Case context, deadlines, response planning |
| Identity / usage / entitlements | MailMyPDF | One ecosystem account and metered rich workflows |
| Mailing / tracking / proof | MailMyPDF | Final fulfillment and permanent mailing record |

## Vertical-owned capabilities

1. Immigration document taxonomy and agency classification.
2. Immigration-specific workflows and terminology.
3. Source-backed immigration facts and deadline interpretation.
4. Immigration response objectives, checklists, and domain prompts.
5. Language preferences and immigration-specific UX.
6. Immigration-specific safety policy and review requirements.

## Flagship experience

`Upload / photograph a letter → understand it → identify what is being requested → build a case context → prepare a response → review → deterministic preflight → explicit approval → mail → track → prove → follow up.`

## Safety boundary

The system must never invent facts, deadlines, requirements, or legal conclusions. Extracted facts and AI suggestions remain reviewable and source-linked. Inferred dates are explicitly marked as inferred. Mailing and other consequential actions require explicit user approval.

## Production integration status

The vertical has a verified CI pipeline covering `npm ci`, tests, and production build. Provider-neutral contracts are ready for the shared Platform services; live production providers remain behind their interfaces until the corresponding Platform/identity rollout is connected.
