import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, FileText, Search, ShieldCheck, UserCheck } from "lucide-react";
import { IMMIGRATION_WORKFLOWS } from "@/lib/immigration-workflows";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "Immigration Mail Workflows | USCIS, RFE, FOIA & Immigration Records" },
      { name: "description", content: "Choose a focused Immigration Mail workflow for USCIS notices, RFE responses, NOIDs, immigration FOIA requests, visa refusals, and supporting correspondence." },
      { property: "og:title", content: "Immigration Mail Workflows" },
      { property: "og:description", content: "Focused workflows for USCIS notices, evidence requests, immigration records, refusals, and response letters." },
    ],
    links: [{ rel: "canonical", href: "/workflows" }],
  }),
  component: WorkflowDirectory,
});

function WorkflowDirectory() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="eyebrow">Immigration Mail · Workflow directory</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-teal-800 md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
            Find the immigration workflow that matches your notice, records request, or response.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-500">
            Immigration Mail is the master home for focused USCIS, immigration-records, refusal, and correspondence workflows. Start with the exact document or task you have, then move into the shared review and mailing workspace.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {IMMIGRATION_WORKFLOWS.map((workflow, index) => (
            <Link key={workflow.slug} to="/workflows/$workflowSlug" params={{ workflowSlug: workflow.slug }} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  {index % 3 === 0 ? <FileText size={24} className="text-teal-700" /> : index % 3 === 1 ? <Search size={24} className="text-teal-700" /> : <ShieldCheck size={24} className="text-teal-700" />}
                </div>
                <span className="badge badge-green">{workflow.intent}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-teal-800" style={{ fontFamily: "var(--font-serif)" }}>{workflow.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{workflow.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><CalendarClock size={14}/> Focused workflow</div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">Open workflow <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-warm-border bg-white p-8 md:p-10">
          <div className="eyebrow">Search intent architecture</div>
          <h2 className="mt-3 text-2xl font-bold text-teal-800 md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
            One master product. Specific pages for specific immigration problems.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-500">
            High-volume document and notice terms such as I-797/I-797C, RFE response, USCIS FOIA, and EOIR FOIA can attract users at different points in the journey. Each page should answer the specific question first, then move the user into the shared Immigration Mail workflow.
          </p>
        </section>
      </div>
    </main>
  );
}
