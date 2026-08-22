import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getImmigrationWorkflow } from "@/lib/immigration-workflows";

export const Route = createFileRoute('/respond-to-a-uscis-notice')({
  validateSearch: (search: Record<string, unknown>) => ({
    workflow: typeof search.workflow === "string" ? search.workflow : "i-797-notice",
  }),
  head: ({ search }) => {
    const workflow = getImmigrationWorkflow(search.workflow);
    return {
      meta: [
        { title: `${workflow?.title ?? "Respond to a USCIS Notice"} | Immigration Mail` },
        {
          name: 'description',
          content: workflow?.description ?? 'Organize a USCIS notice, identify its requested response, dates and documents, prepare a reviewable response, and preserve the mailing record.',
        },
      ],
      links: [{ rel: 'canonical', href: '/respond-to-a-uscis-notice' }],
    };
  },
  component: Page,
});

function Page(){
  const { workflow: workflowSlug } = Route.useSearch();
  const workflow = getImmigrationWorkflow(workflowSlug) ?? getImmigrationWorkflow("i-797-notice")!;

  return <div className="min-h-screen"><SiteHeader/><main>
    <section className="border-b border-rule/60">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="postmark w-fit">Immigration Mail · {workflow.intent}</div>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{workflow.h1}</h1>
        <p className="mt-7 max-w-2xl text-xl text-ink-soft">{workflow.description} Start with the source record, keep the facts reviewable, and prepare correspondence you can edit before mailing.</p>
      </div>
    </section>
    <section className="bg-paper-deep/40 border-b border-rule/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-4">
          {[['01','Source record','Preserve the exact notice, identifiers, and dates.'],['02','Requested action','Identify what the agency is asking for or deciding.'],['03','Evidence','Organize supporting documents and flag missing information.'],['04','Mail','Review the final response and preserve the resulting mailing information.']].map(([n,t,d])=><article className="envelope-card p-6" key={n}><b className="font-mono text-xs text-stamp">{n}</b><h2 className="mt-3 font-serif text-2xl">{t}</h2><p className="mt-2 text-sm text-muted-foreground">{d}</p></article>)}
        </div>
      </div>
    </section>
    <section>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="eyebrow">Selected workflow</div>
        <h2 className="mt-3 text-3xl md:text-4xl" style={{fontFamily:'var(--font-serif)'}}>{workflow.title}</h2>
        <p className="mt-5 text-lg text-ink-soft">{workflow.notes.join(' ')}</p>
        <Link to="/workflows/$workflowSlug" params={{workflowSlug: workflow.slug}} className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground">Review workflow guidance →</Link>
        <p className="mt-8 text-sm leading-6 text-ink-soft">Immigration Mail helps organize documents and correspondence. It does not determine eligibility, guarantee an outcome, or replace legal advice.</p>
      </div>
    </section>
  </main><SiteFooter/></div>
}
