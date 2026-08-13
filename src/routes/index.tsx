import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Immigration Mail — Prepare and mail important immigration correspondence" },
      { name: "description", content: "Prepare, review, send, and track important immigration correspondence. Guided workflows, AI-assisted drafting, physical mail with proof of delivery. Not a law firm." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Immigration Mail",
          description: "Prepare and mail important immigration correspondence with guided workflows, AI-assisted drafting, and physical mail with proof of delivery.",
          areaServed: "US",
          offers: [
            { "@type": "Offer", name: "Standard mail (1-2 pages)", price: "4.99", priceCurrency: "USD" },
            { "@type": "Offer", name: "Certified mail (1-2 pages)", price: "14.94", priceCurrency: "USD" },
            { "@type": "Offer", name: "Registered mail (1-2 pages)", price: "32.49", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <TrustBar />
      <Workflows />
      <HowItWorks />
      <Features />
      <DocumentIntelligence />
      <Pricing />
      <Privacy />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ── Shared icons ─────────────────────────────────────────────────────── */
function ArrowRight() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}
function CheckIcon() {
  return <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
}

/* ── Logo mark for hero illustration ──────────────────────────────────── */
function StampMark() {
  return (
    <div className="relative flex h-16 w-14 flex-col items-center justify-center rounded-sm border-2 border-dashed border-stamp bg-stamp/10 text-stamp">
      <div className="font-serif text-lg leading-none italic">USA</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-widest">forever</div>
      <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-stamp/40 bg-stamp/20" />
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-28">
        <div className="flex flex-col justify-center">
          <div className="postmark w-fit">Immigration correspondence</div>
          <h1 className="mt-4 text-3xl leading-[1.08] sm:text-5xl md:mt-6 md:text-7xl md:leading-[1.05]">
            Prepare and mail
            <br />
            <span className="italic text-stamp">immigration letters</span>
            <br />
            without a printer.
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink-soft sm:mt-6 sm:text-lg">
            Guided workflows help you organize your facts, draft your correspondence,
            and mail it via USPS with tracking and proof of delivery.
          </p>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            No account required · Private &amp; secure · Not a law firm — you control the facts
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/workflows/respond-to-notice"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5"
            >
              Start your letter <ArrowRight />
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#workflows"
                className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                See what you can send
              </a>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Analyze a letter
              </Link>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-stamp sm:ml-1">Starting at $4.99</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:mt-6">
            <span className="flex items-center gap-1.5"><CheckIcon /> USPS Tracking</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> Certified Mail</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> Proof of Delivery</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> Secure Documents</span>
          </div>
        </div>

        {/* Hide envelope illustration on very small screens to save vertical space */}
        <div className="hidden py-4 sm:block">
          <EnvelopeIllustration />
        </div>
      </div>
    </section>
  );
}

function EnvelopeIllustration() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-4">
      <div className="postmark-circle h-28 w-28 -right-4 top-2" aria-hidden>
        <div className="text-center leading-tight">
          Los Angeles<br />CA 90001
        </div>
      </div>
      <div className="absolute inset-0 -rotate-3 rounded-2xl bg-paper-deep" aria-hidden />
      <div className="envelope-card relative w-full rotate-1 p-6" style={{ animation: "float 6s ease-in-out infinite" }}>
        <div className="flex items-start justify-between">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            From
            <div className="mt-1 font-sans text-sm normal-case tracking-normal text-foreground">
              Immigration Mail
              <div className="text-xs text-muted-foreground">Print Center · Los Angeles, CA</div>
            </div>
          </div>
          <StampMark />
        </div>

        <div className="mt-10 border-l-2 border-dashed border-rule pl-4">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">To</div>
          <div className="mt-1 font-serif text-2xl leading-tight text-foreground">
            USCIS
          </div>
          <div className="font-mono text-sm text-ink-soft">
            Attn: Texas Service Center<br />
            P.O. Box 851041<br />
            Mesquite, TX 75185
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-dashed border-rule pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-widest">RFE Response</span>
          </div>
          <div className="postmark">3 pages · certified</div>
        </div>
      </div>
    </div>
  );
}

/* ── Trust bar ────────────────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    "USPS Tracking",
    "Certified Mail available",
    "Proof of delivery",
    "Secure document handling",
    "No printer needed",
  ];
  return (
    <section className="border-y border-rule/60 bg-paper-deep/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 sm:gap-x-8">
          {items.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckIcon /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Workflows ─────────────────────────────────────────────────────────── */
const WORKFLOWS = [
  {
    title: "Respond to a Notice",
    desc: "Organize a notice, confirm the important details, prepare a response, and get it ready to mail.",
    href: "/workflows/respond-to-notice",
    icon: "M5 3h10l4 4v14H5V3zM9 7h6M9 11h6M9 15h4",
  },
  {
    title: "Submit Supporting Documents",
    desc: "Prepare a clear cover letter and organize supporting documentation for a mailing.",
    href: "/workflows/supporting-documents",
    icon: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66z",
  },
  {
    title: "Prepare an Explanation Letter",
    desc: "Turn your own facts and instructions into a professional, editable correspondence draft.",
    href: "/workflows/explanation-letter",
    icon: "M12 2a5 5 0 0 1 5 5c0 1.5-.5 3-1.5 4 .5 1 1.5 1.5 1.5 3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3c0-1.5 1-2 1.5-3-1-1-1.5-2.5-1.5-4a5 5 0 0 1 5-5z",
  },
];

function Workflows() {
  return (
    <section id="workflows" className="border-b border-rule/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="postmark w-fit">What you can send</div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl">Choose a guided starting point</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Each workflow walks you through identifying the document, stating the facts,
            preparing an editable draft, and mailing it — all in one place.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3 sm:mt-10">
          {WORKFLOWS.map((w) => (
            <Link
              key={w.title}
              to={w.href}
              className="envelope-card envelope-card-hover block p-5 sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-rule bg-paper-deep">
                <svg className="h-6 w-6 text-stamp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d={w.icon} />
                </svg>
              </span>
              <h3 className="mt-5 font-serif text-2xl">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-stamp">
                Start workflow <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────── */
const STEPS = [
  { n: "01", t: "Tell us what you need", d: "Choose a workflow and identify the document or correspondence you need to prepare." },
  { n: "02", t: "Prepare your correspondence", d: "State the facts in your own words. AI helps organize — but never invents facts or legal conclusions." },
  { n: "03", t: "Review everything", d: "Every word is editable. Nothing is mailed until you review and approve the final document." },
  { n: "04", t: "Mail it", d: "Choose Standard, Certified, or Registered mail. We print, envelope, and mail via USPS." },
  { n: "05", t: "Track it", d: "Get a USPS tracking number. Certified mail adds signature tracking and proof of delivery." },
  { n: "06", t: "Keep your record", d: "Every mailing is recorded with its tracking number and delivery status — all in one place." },
];

function HowItWorks() {
  return (
    <section id="how" className="border-b border-rule/60 bg-paper-deep/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="postmark w-fit">Process</div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl">How Immigration Mail works</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3 sm:mt-10">
          {STEPS.map((s) => (
            <div key={s.n} className="envelope-card p-5 sm:p-6">
              <div className="font-mono text-xs text-stamp">{s.n}</div>
              <div className="mt-3 font-serif text-xl sm:text-2xl">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "M5 3h10l4 4v14H5V3zM9 7h6M9 11h6M9 15h4", title: "Guided workflows", desc: "Start with the job, not a blank page. Each workflow walks you through the steps from document to mailed letter." },
  { icon: "M12 2a5 5 0 0 1 5 5c0 1.5-.5 3-1.5 4 .5 1 1.5 1.5 1.5 3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3c0-1.5 1-2 1.5-3-1-1-1.5-2.5-1.5-4a5 5 0 0 1 5-5z", title: "AI-assisted drafting", desc: "Organize your facts into a professional draft. Everything is editable. The AI never invents facts, deadlines, or legal conclusions." },
  { icon: "M22 12h-4l-3 9L9 3l-3 9H2", title: "Physical mail with tracking", desc: "Your correspondence is printed, enveloped, and mailed via USPS. Track delivery and keep proof of service." },
  { icon: "M12 3l8 4v6c0 5-3.5 7-8 8-4.5-1-8-3-8-8V7l8-4zM9 12l2 2 4-4", title: "Proof of delivery", desc: "Certified mail options include signature tracking — your record that the correspondence arrived." },
  { icon: "M5 3h14v18l-7-3-7 3V3zM9 12l2 2 4-4", title: "Secure document handling", desc: "Documents are stored securely, never shared, and never used for marketing or AI training." },
  { icon: "M12 6v6l4 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z", title: "Mailing history", desc: "Every mailing is recorded. See what you sent, when, and its delivery status — all in one place." },
];

function Features() {
  return (
    <section className="border-b border-rule/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="postmark w-fit">Why Immigration Mail</div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl">Built for immigration deadlines</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:mt-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="envelope-card p-5 sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-rule bg-paper-deep">
                <svg className="h-5 w-5 text-stamp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d={f.icon} />
                </svg>
              </span>
              <h3 className="mt-4 font-serif text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Document Intelligence ──────────────────────────────────────────────── */
function DocumentIntelligence() {
  return (
    <section className="border-b border-rule/60 bg-paper-deep/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="postmark w-fit">New · Document intelligence</div>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl">
              What does this <span className="italic text-stamp">letter</span> mean?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Upload any immigration document — a notice, letter, or decision — and get a
              plain-English explanation of what it is, what it says, and what you should do next.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Our AI identifies the document type, extracts deadlines and requested actions,
              and flags anything you need to verify. No legal jargon, no guesswork.
            </p>
            <Link
              to="/analyze"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5"
            >
              Try document analysis <ArrowRight />
            </Link>
          </div>

          <div className="relative">
            <div className="postmark-circle h-20 w-20 -right-2 top-0" aria-hidden>
              <div className="text-center leading-tight">Analyzed</div>
            </div>
            <div className="envelope-card relative p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="postmark w-fit">Identified</div>
                  <h3 className="mt-2 font-serif text-xl">Request for Evidence</h3>
                  <p className="text-xs text-muted-foreground">USCIS · Texas Service Center</p>
                </div>
                <span className="rounded-full bg-stamp/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-stamp">RFE</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { l: "Document type", v: "Request for Evidence (RFE)" },
                  { l: "Issuing agency", v: "USCIS" },
                  { l: "Response deadline", v: "Oct 15, 2026 — 87 days", urgent: true },
                  { l: "Requested items", v: "Medical I-693, proof of status" },
                ].map((row) => (
                  <div key={row.l} className="flex items-start justify-between gap-3 border-b border-rule/40 pb-3">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{row.l}</span>
                    <span className={`text-right text-sm font-medium ${row.urgent ? "text-stamp" : "text-foreground"}`}>{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-stamp/30 bg-stamp/5 px-3 py-2 text-xs text-ink-soft">
                <span className="font-mono uppercase tracking-widest text-stamp">Next step</span>
                <p className="mt-1">Gather the requested documents and prepare your response within 87 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────── */
const PRICING = [
  { type: "Standard", price: "$4.99", desc: "Standard delivery for non-urgent mail", features: ["3–7 business days", "USPS tracking included", "Professional printing & envelope", "Mailing record retained"] },
  { type: "Certified", price: "$14.94", desc: "Trackable delivery with confirmation", features: ["3–7 business days", "Delivery tracking + confirmation", "Proof of delivery", "Mailing record retained"], featured: true },
  { type: "Registered", price: "$32.49", desc: "Highest security for sensitive documents", features: ["5–10 business days", "Secure handling + tracking", "Insured delivery", "Signature required"] },
];

function Pricing() {
  return (
    <section id="pricing" className="border-b border-rule/60 bg-paper-deep/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="postmark w-fit">Pricing</div>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl">Pay per mailing. No subscription.</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Prices include printing, paper, envelope, and postage. Page-count tiers apply.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3 sm:mt-10">
          {PRICING.map((p) => (
            <div key={p.type} className={`envelope-card p-5 sm:p-6 ${p.featured ? "ring-1 ring-stamp/40" : ""}`}>
              {p.featured && (
                <div className="postmark w-fit mb-3">Recommended</div>
              )}
              <h3 className="font-serif text-2xl">{p.type}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <p className="mt-4 text-4xl font-serif">{p.price}</p>
              <p className="text-xs text-muted-foreground">per mailing, starting</p>
              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink-soft">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/workflows/respond-to-notice"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  p.featured ? "bg-primary text-primary-foreground shadow-stamp" : "border border-input text-foreground hover:bg-muted"
                }`}
              >
                Start <ArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Privacy ──────────────────────────────────────────────────────────── */
function Privacy() {
  return (
    <section className="border-b border-rule/60">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 md:grid-cols-2">
        <div className="envelope-card p-6 sm:p-8">
          <div className="postmark w-fit">Privacy</div>
          <h3 className="mt-4 font-serif text-2xl sm:text-3xl">Your documents stay private</h3>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Uploaded documents are used only to process, print, and mail your order.
            We do not use customer documents for AI training, resale, or marketing.
            You can request deletion at any time.
          </p>
        </div>
        <div className="envelope-card p-6 sm:p-8">
          <div className="postmark w-fit">Important</div>
          <h3 className="mt-4 font-serif text-2xl sm:text-3xl">Not a law firm</h3>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Immigration Mail is a correspondence tool, not a law firm. We do not provide
            legal advice or representation. AI assists with organization but never invents
            facts or draws legal conclusions. You review everything before it's sent.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  { q: "Is this legal advice?", a: "No. Immigration Mail is a correspondence tool, not a law firm. We help you prepare and send documents — we do not provide legal advice, and AI never invents facts or legal conclusions." },
  { q: "How does the mailing work?", a: "Your final document is printed, placed in an envelope, and mailed via USPS. You can choose Standard, Certified, or Registered mail for proof of delivery." },
  { q: "Is my data secure?", a: "All documents are stored with encryption, never shared with third parties, and never used for marketing or AI training. You can request full deletion at any time." },
  { q: "What types of mail can I send?", a: "Standard, Certified, and Registered mail. Costs start at $4.99 per mailing, including printing, paper, envelope, and postage." },
  { q: "Do I need an account?", a: "No. You can prepare, pay, and send as a guest. Your order status link will be sent by email." },
  { q: "Can I edit the draft?", a: "Absolutely. Every draft is fully editable. The AI helps organize your facts — but you review and approve everything before it's mailed." },
];

function FAQ() {
  return (
    <section className="border-b border-rule/60">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="postmark mx-auto w-fit">FAQ</div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl">Questions people ask</h2>
        <div className="mt-8 divide-y divide-rule/70 border-y border-rule/70 sm:mt-10">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group py-4 sm:py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                <span className="font-serif text-lg sm:text-xl">{item.q}</span>
                <span className="shrink-0 text-stamp transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="border-b border-rule/60">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-20">
        <div className="postmark mx-auto w-fit">Ready to mail</div>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl">
          Prepare. Review. <span className="italic text-stamp">Mailed.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
          Start a guided workflow, review your draft, and mail your correspondence — all in one place.
        </p>
        <Link
          to="/workflows/respond-to-notice"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5"
        >
          Start your letter <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
