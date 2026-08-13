import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageCheck, Clock, CheckCircle2, FileText, TrendingUp, Mail, ArrowRight, Stamp, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Mailings — Immigration Mail" },
      { name: "description", content: "View your mailing history, tracking status, and delivery records." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Total mailings", value: "3", icon: Mail, color: "text-navy-600" },
  { label: "In transit", value: "1", icon: PackageCheck, color: "text-gold-500" },
  { label: "Delivered", value: "2", icon: CheckCircle2, color: "text-emerald-600" },
  { label: "Avg. delivery", value: "3.5 days", icon: Clock, color: "text-navy-400" },
];

const mailings = [
  { id: "IM-2026-0042", type: "Respond to a Notice", recipient: "USCIS Field Office, Los Angeles", date: "Aug 10, 2026", status: "in_transit", mailType: "Certified", tracking: "9405 5118 9956 3312 8847" },
  { id: "IM-2026-0038", type: "Explanation Letter", recipient: "USCIS Attn: AOS Unit", date: "Aug 3, 2026", status: "delivered", mailType: "Certified + RR", tracking: "9405 5118 9956 3298 7711" },
  { id: "IM-2026-0031", type: "Supporting Documents", recipient: "USCIS Texas Service Center", date: "Jul 22, 2026", status: "delivered", mailType: "Certified", tracking: "9405 5118 9956 3214 0033" },
];

const statusConfig: Record<string, { label: string; badge: string }> = {
  in_transit: { label: "In transit", badge: "badge badge-amber" },
  delivered: { label: "Delivered", badge: "badge badge-green" },
};

function DashboardPage() {
  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />

      <section className="bg-white py-10 border-b border-warm-border">
        <div className="container">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>My Mailings</h1>
              <p className="mt-1 text-sm text-navy-400">Track your correspondence and delivery records.</p>
            </div>
            <Link to="/workflows/respond-to-notice" className="btn-gold">
              New mailing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-navy-400">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{value}</p>
                  </div>
                  <Icon size={24} className={color} />
                </div>
              </div>
            ))}
          </div>

          {/* Mailings table */}
          <div className="mt-8 card overflow-hidden">
            <div className="flex items-center justify-between border-b border-warm-border px-5 py-4">
              <h2 className="font-semibold text-navy-600">Recent mailings</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
                  <input className="input-field pl-9 py-2 text-sm" placeholder="Search mailings..." style={{ width: 200 }} />
                </div>
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead className="bg-navy-50/50 text-left text-xs font-semibold text-navy-400">
                  <tr>
                    <th className="px-5 py-3">Reference</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Recipient</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Mail type</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border">
                  {mailings.map((m) => (
                    <tr key={m.id} className="hover:bg-cream transition-colors cursor-pointer">
                      <td className="px-5 py-3.5 font-mono text-xs font-semibold text-navy-600">{m.id}</td>
                      <td className="px-5 py-3.5 text-navy-500">{m.type}</td>
                      <td className="px-5 py-3.5 text-navy-500">{m.recipient}</td>
                      <td className="px-5 py-3.5 text-navy-400">{m.date}</td>
                      <td className="px-5 py-3.5 text-navy-400">{m.mailType}</td>
                      <td className="px-5 py-3.5"><span className={statusConfig[m.status].badge}>{statusConfig[m.status].label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-warm-border md:hidden">
              {mailings.map((m) => (
                <div key={m.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-navy-600">{m.id}</span>
                    <span className={statusConfig[m.status].badge}>{statusConfig[m.status].label}</span>
                  </div>
                  <p className="mt-2 font-semibold text-navy-600">{m.type}</p>
                  <p className="mt-1 text-sm text-navy-400">{m.recipient}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-navy-300">
                    <span>{m.date}</span>
                    <span>·</span>
                    <span>{m.mailType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking detail for in-transit */}
          <div className="mt-6 card p-5">
            <div className="flex items-center gap-2">
              <PackageCheck size={18} className="text-gold-500" />
              <h2 className="font-semibold text-navy-600">Latest tracking</h2>
            </div>
            <p className="mt-1 text-sm text-navy-400">IM-2026-0042 · Certified Mail</p>
            <div className="mt-4 space-y-4">
              {[
                { date: "Aug 12, 9:30 AM", event: "Mailed from Los Angeles, CA", done: true },
                { date: "Aug 12, 2:15 PM", event: "Processed at USPS facility", done: true },
                { date: "Aug 13", event: "In transit to destination facility", done: false },
                { date: "—", event: "Out for delivery", done: false },
                { date: "—", event: "Delivered (signature required)", done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${step.done ? "bg-emerald-50" : "bg-gray-100"}`}>
                    {step.done ? <CheckCircle2 size={14} className="text-emerald-600" /> : <span className="text-[10px] font-bold text-gray-400">{i + 1}</span>}
                  </div>
                  <div>
                    <p className={`text-sm ${step.done ? "text-navy-600" : "text-navy-300"}`}>{step.event}</p>
                    <p className="text-xs text-navy-300">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty state preview */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-warm-border bg-white p-5 text-sm text-navy-400">
            <TrendingUp size={18} className="text-gold-500" />
            <span>Account features (save drafts, save recipient addresses, re-send) are coming when authentication launches.</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
