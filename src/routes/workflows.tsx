import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { IMMIGRATION_WORKFLOWS } from "@/lib/immigration-workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PLACEHOLDER_IMAGE = "https://media.base44.com/images/public/6a8bd310dfdf9ad92cf26415/06e033fed_generated_image.png";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "Immigration Mail Workflows | USCIS, RFE, FOIA & Immigration Records" },
      { name: "description", content: "Search focused Immigration Mail workflows for USCIS notices, RFE responses, NOIDs, immigration FOIA requests, visa refusals, and supporting correspondence." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Immigration Mail Workflows" },
      { property: "og:description", content: "Focused workflows for USCIS notices, evidence requests, immigration records, refusals, and response letters." },
    ],
    links: [{ rel: "canonical", href: "/workflows" }],
  }),
  component: WorkflowDirectory,
});

function ArrowRight() { return <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>; }

function WorkflowDirectory() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return IMMIGRATION_WORKFLOWS;
    return IMMIGRATION_WORKFLOWS.filter((w) => `${w.slug} ${w.title} ${w.description} ${w.intent} ${w.relatedTerms.join(" ")}`.toLowerCase().includes(term));
  }, [query]);

  return <div className="min-h-screen page-fade"><SiteHeader /><main>
    <section className="border-b border-rule/60 bg-paper-deep/20"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"><div className="max-w-4xl"><div className="eyebrow">Workflow directory</div><h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl">Find the immigration workflow that matches your notice, records request, or response.</h1><p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">Search by the document, agency, immigration task, or problem. You do not need to know the exact workflow name.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search USCIS, RFE, I-797, FOIA, visa refusal…" className="w-full rounded-full border border-rule bg-card px-5 py-3 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-ink/10 sm:flex-1" aria-label="Search immigration workflows" /><Link to="/analyze" className="btn-primary text-base">Analyze a notice <ArrowRight /></Link></div><div className="mt-3 font-mono text-xs text-muted-foreground">{filtered.length} workflows · AI handles the analysis underneath</div></div></div></section>
    <section className="border-b border-rule/60"><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((workflow) => <Link key={workflow.slug} to="/workflows/$workflowSlug" params={{ workflowSlug: workflow.slug }} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule/80 bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp/50"><div className="relative aspect-[16/9] overflow-hidden border-b border-rule/60"><img src={PLACEHOLDER_IMAGE} alt="" aria-hidden="true" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" /><span className="absolute bottom-3 left-4 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper backdrop-blur-sm">{workflow.intent}</span><span className="absolute bottom-3 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-paper/25 bg-ink/60 text-paper backdrop-blur-sm transition-transform group-hover:translate-x-0.5"><ArrowRight /></span></div><div className="flex flex-1 flex-col p-5 sm:p-6"><h2 className="font-serif text-[1.55rem] leading-[1.12] tracking-[-0.01em]">{workflow.title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{workflow.description}</p><div className="mt-5 border-t border-rule/60 pt-4"><div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">What it helps organize</div><p className="mt-1.5 text-xs leading-5 text-ink-soft">{workflow.relatedTerms.slice(0, 3).join(" · ")}</p></div><span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brass">View workflow <ArrowRight /></span></div></Link>)}</div>{filtered.length === 0 && <div className="py-16 text-center text-sm text-muted-foreground">No exact match yet. Try the agency, document type, or describe the task in different words.</div>}</div></section>
    <section className="bg-paper-deep/30"><div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16"><div className="envelope-card p-8 md:p-10"><div className="eyebrow">One product, specific pages</div><h2 className="mt-3 font-serif text-2xl md:text-3xl">One master product. Specific pages for specific immigration problems.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Every authority page answers the searcher's specific question first, then moves them into the shared Immigration Mail workflow. The directory remains the scalable discovery layer as the catalog grows.</p><p className="mt-6 text-sm text-muted-foreground">Immigration Mail is not a law firm or government agency. Procedures can be fact-specific. Verify official requirements with the relevant government agency or qualified counsel.</p></div></div></section>
  </main><SiteFooter /></div>;
}
