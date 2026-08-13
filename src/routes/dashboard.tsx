import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/lib/auth";
import {
  fetchMailingOrders,
  fetchCorrespondence,
  formatPrice,
  formatMailMethod,
  formatDate,
  type MailingOrder,
  type Correspondence,
} from "@/lib/cases";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Mailings — Immigration Mail" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardPage,
});

const statusColors: Record<string, string> = {
  draft: "text-muted-foreground",
  pending: "text-stamp",
  in_transit: "text-stamp",
  delivered: "text-emerald-700",
  completed: "text-emerald-700",
  cancelled: "text-destructive",
};

function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mailings, setMailings] = useState<MailingOrder[]>([]);
  const [correspondence, setCorrespondence] = useState<Correspondence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to auth if not signed in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    const [mailingsResult, correspondenceResult] = await Promise.all([
      fetchMailingOrders(user.id),
      fetchCorrespondence(user.id),
    ]);

    if (mailingsResult.error || correspondenceResult.error) {
      setError(mailingsResult.error || correspondenceResult.error);
    } else {
      setMailings(mailingsResult.data ?? []);
      setCorrespondence(correspondenceResult.data ?? []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-rule border-t-stamp" />
            <p className="mt-4 text-sm text-muted-foreground">Loading your dashboard…</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!user) return null;

  // Calculate stats from real data
  const stats = [
    { label: "Total mailings", value: mailings.length.toString() },
    { label: "In transit", value: mailings.filter((m) => m.status === "in_transit" || m.status === "pending").length.toString() },
    { label: "Delivered", value: mailings.filter((m) => m.status === "delivered").length.toString() },
    { label: "Drafts saved", value: correspondence.length.toString() },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="postmark w-fit">My Mailings</div>
            <h1 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl">Your correspondence record</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your immigration mailings and delivery records.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/cases"
              className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              My Cases
            </Link>
            <Link
              to="/workflows/respond-to-notice"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5"
            >
              New mailing{" "}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="envelope-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-2xl font-serif">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Mailings table */}
        <div className="mt-8 envelope-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-rule/60 px-5 py-4">
            <h2 className="font-serif text-lg">Recent mailings</h2>
            {mailings.length > 0 && (
              <span className="font-mono text-xs text-muted-foreground">{mailings.length} total</span>
            )}
          </div>

          {loading ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-rule border-t-stamp" />
              <p className="mt-3 text-sm text-muted-foreground">Loading mailings…</p>
            </div>
          ) : mailings.length === 0 ? (
            <EmptyState
              icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12l3-3m0 0l3 3m-3-3v6m-6.75 0h6.75"
              title="No mailings yet"
              desc="Start a workflow to prepare and mail your first letter."
              cta={{ label: "Start a letter", to: "/workflows/respond-to-notice" }}
            />
          ) : (
            <>
              <div className="hidden md:block">
                <table className="w-full text-sm">
                  <thead className="bg-paper-deep/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-medium">Recipient</th>
                      <th className="px-5 py-3 font-medium">Mail type</th>
                      <th className="px-5 py-3 font-medium">Price</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/40">
                    {mailings.map((m) => (
                      <tr key={m.id} className="hover:bg-paper-deep/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-foreground">{m.recipient_name}</p>
                          {m.recipient_org && <p className="text-xs text-muted-foreground">{m.recipient_org}</p>}
                          <p className="text-xs text-muted-foreground">{m.recipient_city}, {m.recipient_state} {m.recipient_zip}</p>
                        </td>
                        <td className="px-5 py-3.5 text-ink-soft">{formatMailMethod(m.mail_method)}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{formatPrice(m.price_cents)}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{formatDate(m.created_at)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`font-mono text-xs ${statusColors[m.status] || "text-muted-foreground"}`}>
                            {m.status.replace(/_/g, " ")}
                          </span>
                          {m.tracking_number && (
                            <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{m.tracking_number}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-rule/40 md:hidden">
                {mailings.map((m) => (
                  <div key={m.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{m.recipient_name}</span>
                      <span className={`font-mono text-xs ${statusColors[m.status] || "text-muted-foreground"}`}>
                        {m.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    {m.recipient_org && <p className="mt-1 text-sm text-muted-foreground">{m.recipient_org}</p>}
                    <p className="mt-1 text-sm text-muted-foreground">{m.recipient_city}, {m.recipient_state} {m.recipient_zip}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDate(m.created_at)}</span>
                      <span>·</span>
                      <span>{formatMailMethod(m.mail_method)}</span>
                      <span>·</span>
                      <span>{formatPrice(m.price_cents)}</span>
                    </div>
                    {m.tracking_number && (
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">{m.tracking_number}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drafts */}
        <div className="mt-8 envelope-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-rule/60 px-5 py-4">
            <h2 className="font-serif text-lg">Saved drafts</h2>
            {correspondence.length > 0 && (
              <span className="font-mono text-xs text-muted-foreground">{correspondence.length} total</span>
            )}
          </div>

          {loading ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-rule border-t-stamp" />
            </div>
          ) : correspondence.length === 0 ? (
            <EmptyState
              icon="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.36a4.5 4.5 0 01-1.897 1.13L6 18l.5-2.043a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
              title="No saved drafts"
              desc="Drafts from workflows you complete will appear here."
              cta={{ label: "Start a letter", to: "/workflows/respond-to-notice" }}
            />
          ) : (
            <div className="divide-y divide-rule/40">
              {correspondence.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-4 hover:bg-paper-deep/20 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{c.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.workflow_id.replace(/-/g, " ")} · {formatDate(c.created_at)}
                    </p>
                  </div>
                  <span className={`ml-3 shrink-0 font-mono text-xs ${statusColors[c.status] || "text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analyze CTA */}
        <div className="mt-6 envelope-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-rule bg-paper-deep">
              <svg className="h-5 w-5 text-stamp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-lg">Got a letter you don&apos;t understand?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload it and get a plain-English explanation with deadlines and next steps.
              </p>
            </div>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Analyze a document{" "}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function EmptyState({
  icon,
  title,
  desc,
  cta,
}: {
  icon: string;
  title: string;
  desc: string;
  cta: { label: string; to: string };
}) {
  return (
    <div className="px-5 py-12 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-rule bg-paper-deep/40">
        <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </span>
      <p className="mt-4 font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <Link
        to={cta.to}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        {cta.label}
      </Link>
    </div>
  );
}
