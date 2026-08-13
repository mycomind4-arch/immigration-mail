# Immigration Mail

Immigration Mail is a standalone vertical product for preparing and sending important immigration-related correspondence. It is intentionally architected for a future connection to the shared MailMyPDF mailing platform without coupling the two repositories today.

## Product loop

Problem -> document/information -> guided workflow -> AI-assisted draft -> review -> mailing -> tracking -> mailing record -> repeat use.

## Current implementation

- TanStack Start + React + TypeScript foundation
- Cloudflare-compatible server entry
- Security-header middleware foundation
- Responsive marketing homepage
- Workflow discovery
- Flagship **Respond to a Notice** guided workflow prototype
- Supporting Documents and Explanation Letter workflow entries
- Reusable workflow and mailing domain types
- Focused initial SEO infrastructure (`robots.txt`, sitemap, `llms.txt`)

## Not yet connected

The following production integrations are deliberately staged behind interfaces and are not yet wired to live services:

- Supabase authentication/database
- private document storage
- AI provider
- Stripe checkout
- Lob mailing
- tracking webhooks
- proof archive
- account/order history

## Safety boundary

Immigration Mail is not a law firm or government agency and does not provide legal advice. The application must not invent facts, deadlines, requirements, or legal conclusions. Official government information must be sourced from authoritative government material when presented as requirements.

## Future MailMyPDF integration

Shared platform capabilities should eventually be consumed through stable interfaces for identity, documents, payments, mailing, tracking, proof, analytics, and subscriptions. Immigration-specific workflows, prompts, content, SEO, and UX remain owned by this vertical.
