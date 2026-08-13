import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources & Guides — Immigration Mail" },
      { name: "description", content: "Guides for preparing immigration correspondence: how to respond to notices, write explanation letters, and submit supporting documents." },
      { property: "og:title", content: "Resources & Guides — Immigration Mail" },
      { property: "og:description", content: "Guides for preparing immigration correspondence." },
    ],
  }),
  component: ResourcesIndex,
});

const guides = [
  {
    slug: "how-to-respond-to-rfe",
    title: "How to Respond to a Request for Evidence (RFE)",
    excerpt: "An RFE gives you a deadline to submit additional evidence. Here's how to organize your response, what to include, and how to mail it with proof of delivery.",
    readTime: "6 min",
    category: "Responding to Notices",
    icon: "📋",
  },
  {
    slug: "writing-an-explanation-letter",
    title: "Writing an Effective Explanation Letter",
    excerpt: "Explanation letters accompany your application or response to clarify circumstances. Learn what to include, what to avoid, and how to structure your letter.",
    readTime: "5 min",
    category: "Correspondence Tips",
    icon: "✍️",
  },
  {
    slug: "certified-mail-guide",
    title: "Why Certified Mail Matters for Immigration Correspondence",
    excerpt: "When you send immigration correspondence, proof of delivery can be critical. Here's what certified mail offers and when to use it.",
    readTime: "4 min",
    category: "Mailing",
    icon: "📮",
  },
];

function ResourcesIndex() {
  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />

      <section className="bg-white py-16 md:py-20 border-b border-warm-border">
        <div className="container max-w-2xl">
          <div className="eyebrow">Resources</div>
          <h1 className="mt-3 text-4xl font-bold text-navy-600 md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>Guides for your correspondence</h1>
          <p className="mt-4 text-navy-400">Practical, plain-language guides about preparing and sending immigration-related correspondence. Not legal advice — written to help you understand the process.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="grid gap-5">
            {guides.map((guide) => (
              <Link key={guide.slug} to="/resources/$slug" params={{ slug: guide.slug }} className="card group p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-xl">{guide.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-xs text-navy-400">
                      <span className="font-semibold text-gold-600">{guide.category}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {guide.readTime}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-navy-600 group-hover:text-gold-600 transition-colors" style={{ fontFamily: "var(--font-serif)" }}>{guide.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-navy-400">{guide.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Read guide <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-dashed border-warm-border bg-white p-6 text-center">
            <BookOpen size={24} className="mx-auto text-navy-300" />
            <p className="mt-3 text-sm text-navy-400">More guides are being written. Have a topic you'd like covered? Let us know at <span className="font-semibold text-gold-600">support@immigrationmail.app</span>.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
