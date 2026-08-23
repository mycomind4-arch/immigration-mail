import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { findRFEPage } from "@/domain/rfe-content";

export const Route = createFileRoute('/rfe/$slug')({
  head: ({ params }) => {
    const page = findRFEPage(`/rfe/${params.slug}`);
    if (!page) {
      return {
        meta: [{ title: 'Page Not Found — Immigration Mail' }],
      };
    }
    return {
      meta: [
        { title: page.title },
        { name: 'description', content: page.description },
      ],
      links: [{ rel: 'canonical', href: page.canonical }],
      ...(page.faqSchema ? {
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.faqSchema.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          },
        ],
      } : {}),
    };
  },
  component: RFESupportingPage,
});

function RFESupportingPage() {
  const { slug } = Route.useParams();
  const page = findRFEPage(`/rfe/${slug}`);

  if (!page) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main>
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>Page not found</h1>
            <p className="mt-4 text-ink-soft">This RFE resource page doesn't exist.</p>
            <Link to="/rfe" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground">
              Back to RFE hub
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const sections = page.content.split('\n## ');

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Breadcrumbs */}
        <nav className="border-b border-rule/40 bg-paper-deep/20">
          <div className="mx-auto max-w-4xl px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-ink-soft">
              {page.breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-rule">/</span>}
                  {idx < page.breadcrumbs.length - 1 ? (
                    <Link to={crumb.path === '/' ? '/' : crumb.path.startsWith('/rfe/') ? '/rfe/$slug' : '/rfe'} params={crumb.path === '/' ? {} : { slug: crumb.path.replace('/rfe/', '') }} className="hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="border-b border-rule/60">
          <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
            <h1 className="text-3xl leading-tight md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
              {page.h1}
            </h1>
            <p className="mt-4 text-lg text-ink-soft max-w-2xl">{page.description}</p>
          </div>
        </section>

        {/* FAQ Section (if present) */}
        {page.faqSchema && page.faqSchema.length > 0 && (
          <section className="bg-paper-deep/40 border-b border-rule/60">
            <div className="mx-auto max-w-4xl px-6 py-12">
              <h2 className="text-xl md:text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Common Questions
              </h2>
              <div className="space-y-4">
                {page.faqSchema.map((faq, idx) => (
                  <div key={idx} className="envelope-card p-5">
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section>
          <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="space-y-6">
              {sections.slice(1).map((section, idx) => {
                const [heading, ...body] = section.split('\n');
                return (
                  <div key={idx}>
                    <h2 className="text-xl md:text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                      {heading}
                    </h2>
                    <div className="text-ink-soft space-y-2">
                      {body.join('\n').trim().split('\n').map((line, i) => (
                        line.trim() && <p key={i}>{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper-deep/40 border-t border-rule/60">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="envelope-card p-8 text-center">
              <h2 className="text-xl md:text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                Upload your RFE to get started
              </h2>
              <p className="mt-3 text-ink-soft">
                We'll read your letter, explain what USCIS is asking for, and help you build your response.
              </p>
              <Link
                to="/respond-to-a-uscis-notice"
                className="mt-6 inline-flex rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground"
              >
                Upload your RFE →
              </Link>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="border-t border-rule/60">
          <div className="mx-auto max-w-4xl px-6 py-8">
            <h3 className="text-sm font-medium text-ink-soft mb-3">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              {page.relatedPages.map(path => {
                const relSlug = path.replace('/rfe/', '');
                if (path === '/rfe') {
                  return (
                    <Link key={path} to="/rfe" className="rounded-full border border-rule px-4 py-2 text-sm hover:border-stamp">
                      RFE Hub
                    </Link>
                  );
                }
                return (
                  <Link
                    key={path}
                    to="/rfe/$slug"
                    params={{ slug: relSlug }}
                    className="rounded-full border border-rule px-4 py-2 text-sm hover:border-stamp"
                  >
                    {relSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
