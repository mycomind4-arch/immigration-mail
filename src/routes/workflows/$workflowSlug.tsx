import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getImmigrationWorkflow } from "@/lib/immigration-workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PLACEHOLDER_IMAGE = "https://media.base44.com/images/public/6a8bd310dfdf9ad92cf26415/06e033fed_generated_image.png";

export const Route = createFileRoute("/workflows/$workflowSlug")({
  loader: ({ params }) => {
    const workflow = getImmigrationWorkflow(params.workflowSlug);
    if (!workflow) throw notFound();
    return workflow;
  },
  head: ({ loaderData }) => {
    const workflow = loaderData;
    return {
      meta: [
        { title: `${workflow.title} | Immigration Mail` },
        { name: "description", content: `${workflow.description} Learn what to gather, what to review, and how Immigration Mail helps organize the response.` },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: `${workflow.title} | Immigration Mail` },
        { property: "og:description", content: workflow.description },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/workflows/${workflow.slug}` }],
    };
  },
  component: WorkflowLandingPage,
});

function ArrowRight() {
  return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
}

function WorkflowLandingPage() {
  const workflow = Route.useLoaderData();
  const faq = [
    ["What does this workflow do?", workflow.description],
    ["Will Immigration Mail decide my legal options?", "No. Immigration Mail helps organize documents, facts, correspondence, and reviewable drafts. It does not provide legal advice or determine eligibility."],
    ["Can I review the response before mailing?", "Yes. You review the correspondence before a mailing is created and can correct facts or wording before approval."],
  ];

  return (
    <div className="min-h-screen page-fade">
      <SiteHeader />
      <main>
        <section className="border-b border-rule/60 bg-paper-deep/20">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <Link to="/workflows" className="text-sm text-muted-foreground hover:text-foreground">← All Immigration Mail workflows</Link>
            <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <div className="eyebrow">{workflow.intent}</div>
                <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.06] tracking-[-0.02em] md:text-6xl">{workflow.h1}</h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{workflow.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/respond-to-a-uscis-notice" search={{ workflow: workflow.slug }} className="btn-primary text-base">Start this workflow <ArrowRight /></Link>
                  <Link to="/workflows" className="btn-secondary">See all workflows</Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-rule/70 bg-card shadow-card">
                <div className="relative aspect-[16/9]"><img src={PLACEHOLDER_IMAGE} alt="" aria-hidden="true" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 rounded-full border border-paper/30 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">Workflow image placeholder</div></div>
                <div className="p-5 sm:p-6"><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Simple on the surface</div><p className="mt-2 text-sm leading-6 text-muted-foreground">AI helps handle the document analysis and organization underneath. You review the result before it is sent.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/60">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="grid gap-5 md:grid-cols-3">
              {[{ t: "Understand", d: workflow.notes[0] ?? "Preserve the source notice and the facts that matter." }, { t: "Build", d: workflow.notes[1] ?? "Organize the supporting material and prepare a reviewable response." }, { t: "Review & send", d: "Review the exact correspondence, approve it, and transition into MailMyPDF fulfillment." }].map((item) => <article key={item.t} className="rounded-2xl border border-rule bg-card p-6 shadow-card"><h2 className="font-serif text-2xl">{item.t}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.d}</p></article>)}
            </div>
          </div>
        </section>

        <section className="border-b border-rule/60">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="eyebrow">Useful information</div>
            <h2 className="mt-3 font-serif text-3xl">What to have ready</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">{workflow.relatedTerms.map((term) => <li key={term} className="rounded-xl border border-rule bg-card px-4 py-3 text-sm text-ink-soft">{term}</li>)}</ul>
          </div>
        </section>

        <section className="bg-paper-deep/30">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="eyebrow">Frequently asked questions</div>
            <div className="mt-6 space-y-4">{faq.map(([question, answer]) => <article key={question} className="rounded-2xl border border-rule bg-card p-6 shadow-card"><h2 className="font-serif text-xl text-foreground">{question}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p></article>)}</div>
            <p className="mt-8 text-sm leading-6 text-muted-foreground">Immigration Mail is not a law firm or government agency. Procedures can be fact-specific. Verify official requirements with the relevant government agency or qualified counsel.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
