import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { getImmigrationWorkflow } from "@/lib/immigration-workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
        { name: "description", content: workflow.description },
        { property: "og:title", content: `${workflow.title} | Immigration Mail` },
        { property: "og:description", content: workflow.description },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/workflows/${workflow.slug}` }],
    };
  },
  component: WorkflowLandingPage,
});

function WorkflowLandingPage() {
  const workflow = Route.useLoaderData();
  const faq = [
    ["What does this workflow do?", workflow.description],
    ["Will Immigration Mail decide my legal options?", "No. Immigration Mail organizes documents, facts, correspondence, and reviewable drafts. It does not provide legal advice or determine eligibility."],
    ["Can I review the response before mailing?", "Yes. The workflow is designed so the user reviews and edits the correspondence before a mailing is created."],
  ];

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main>
        <section className="border-b border-rule/60 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="eyebrow">Immigration Mail · {workflow.intent}</div>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl" style={{ fontFamily: "var(--font-serif)" }}>
              {workflow.h1}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-500">{workflow.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/respond-to-a-uscis-notice"
                search={{ workflow: workflow.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-7 py-3.5 font-medium text-white"
              >
                Start this workflow <ArrowRight size={17} />
              </Link>
              <Link to="/workflows" className="rounded-full border border-warm-border px-7 py-3.5 font-medium text-teal-800">See all Immigration Mail workflows</Link>
            </div>
          </div>
        </section>

        <section className="border-b border-rule/60 bg-paper-deep/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid gap-5 md:grid-cols-3">
              <InfoCard icon={<FileText size={22} />} title="Start with the record" text={workflow.notes[0] ?? "Preserve the source notice and facts before drafting."} />
              <InfoCard icon={<ShieldCheck size={22} />} title="Review before action" text={workflow.notes[1] ?? "Keep facts reviewable and avoid unsupported legal conclusions."} />
              <InfoCard icon={<CheckCircle2 size={22} />} title="Prepare to send" text="Review the final correspondence and preserve the mailing record through MailMyPDF." />
            </div>
          </div>
        </section>

        <section className="border-b border-rule/60 bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="eyebrow">What to have ready</div>
            <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Useful information for this workflow</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {workflow.relatedTerms.map((term) => (
                <li key={term} className="rounded-xl border border-warm-border bg-paper px-4 py-3 text-sm text-slate-600">{term}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-paper-deep/20">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="eyebrow">Frequently asked questions</div>
            <div className="mt-6 space-y-5">
              {faq.map(([question, answer]) => (
                <article key={question} className="card p-6">
                  <h2 className="text-lg font-semibold text-teal-800">{question}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm leading-6 text-slate-500">Immigration Mail is not a law firm or government agency. Procedures can be fact-specific. Verify official requirements with the relevant government agency or qualified counsel.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="card p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">{icon}</div>
      <h2 className="mt-4 text-xl font-semibold text-teal-800" style={{ fontFamily: "var(--font-serif)" }}>{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </article>
  );
}
