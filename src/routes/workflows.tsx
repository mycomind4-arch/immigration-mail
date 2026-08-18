import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, ShieldCheck, Search, UserCheck, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/workflows")({ component: WorkflowDirectory });

const workflows = [
  { title: "Understand an I-797 or I-797C", description: "Identify what the USCIS notice means, what action it requests, and whether a deadline or follow-up is required.", icon: FileText, href: "/respond-to-a-uscis-notice", intent: "I-797 / I-797C" },
  { title: "Respond to a Request for Evidence (RFE)", description: "Organize the notice, requested evidence, supporting documents, and response package before the USCIS deadline.", icon: Search, href: "/respond-to-a-uscis-notice", intent: "RFE response" },
  { title: "Respond to a Notice of Intent", description: "Build a structured response to an adverse notice while preserving the notice, deadline, evidence, and submission record.", icon: ShieldCheck, href: "/respond-to-a-uscis-notice", intent: "NOID / intent notice" },
  { title: "Respond to a USCIS Denial or Rejection", description: "Review the decision, identify the available response or review path, and organize the documents needed for the next step.", icon: ShieldCheck, href: "/respond-to-a-uscis-notice", intent: "Denial / rejection" },
  { title: "Prepare for a USCIS Deadline", description: "Turn an immigration notice into a deadline-aware case with the requested actions, documents, and mailing proof organized together.", icon: CalendarClock, href: "/respond-to-a-uscis-notice", intent: "Deadline response" },
  { title: "Organize a USCIS Case Record", description: "Keep notices, filings, supporting evidence, correspondence, and response history together so the case has a defensible document trail.", icon: UserCheck, href: "/cases", intent: "Case record" },
];

function WorkflowDirectory() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="eyebrow">Immigration Mail · Workflow directory</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-teal-800 md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
            Find the USCIS workflow that matches your notice.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Search demand is often notice-specific. Immigration Mail turns major notice types and response jobs into focused workflows while keeping the underlying case workspace in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map(({ title, description, icon: Icon, href, intent }) => (
            <Link key={title} to={href} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <Icon size={24} className="text-teal-700" />
                </div>
                <span className="badge badge-green">{intent}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-teal-800" style={{ fontFamily: "var(--font-serif)" }}>{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
                Open workflow <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-warm-border bg-white p-8 md:p-10">
          <div className="eyebrow">Search intent architecture</div>
          <h2 className="mt-3 text-2xl font-bold text-teal-800 md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
            Immigration Mail is the master home for USCIS notice and response workflows.
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-500">
            High-volume informational notice terms should lead into focused response pages, while specialized case work stays in the authenticated workspace. New USCIS notice workflows belong here before they become separate products.
          </p>
        </section>
      </div>
    </main>
  );
}
