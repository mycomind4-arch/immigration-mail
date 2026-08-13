import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, FileText, Trash2, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Immigration Mail" },
      { name: "description", content: "How Immigration Mail collects, uses, stores, and protects your data and documents." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  { title: "Information We Collect", body: "We collect information you provide directly: your name, email address, mailing addresses, correspondence content, and uploaded documents. We also collect usage data such as pages visited and actions taken, used to operate and improve the service." },
  { title: "How We Use Your Information", body: "Your information is used solely to provide the Immigration Mail service — preparing, sending, and tracking your correspondence. We never use your documents or case details for marketing, advertising, or training AI models." },
  { title: "Data Storage & Security", body: "All data is stored with industry-standard encryption. Documents are stored in private, access-controlled storage. Access is limited to you and authorized service operators. We conduct regular security reviews." },
  { title: "Document Handling", body: "Your documents are processed only to fulfill your mailing request. The final approved document is transmitted to our mailing partner for printing and mailing. Unapproved drafts and supporting documents are stored securely and can be deleted at any time." },
  { title: "Third-Party Services", body: "We use the following third-party services to operate: MailMyPDF (mailing fulfillment), Stripe (payment processing), and USPS (delivery). Each service receives only the information necessary to perform its function. Your document content is never shared with analytics or advertising providers." },
  { title: "Your Rights", body: "You have the right to access your data, export it, and request deletion. You can delete individual documents, mailing records (after retention requirements are met), or your entire account. Contact us at any time to exercise these rights." },
  { title: "Data Retention", body: "Mailing records are retained for the period necessary to provide proof-of-service documentation. Draft documents can be deleted by you at any time. Account data is deleted within 30 days of your deletion request, except where retention is legally required." },
  { title: "Cookies", body: "We use essential cookies for authentication and session management. We do not use advertising cookies or third-party tracking pixels." },
  { title: "Contact", body: "For privacy questions or to exercise your data rights, contact us at privacy@immigrationmail.app." },
];

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />
      <section className="bg-white py-16">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50"><ShieldCheck size={20} className="text-navy-600" /></div>
            <div>
              <h1 className="text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Privacy Policy</h1>
              <p className="text-sm text-navy-400">Last updated: August 2026</p>
            </div>
          </div>

          <div className="alert alert-info mt-6">
            <Lock size={16} className="shrink-0" /> Your documents and case details are sensitive. This policy explains exactly how we handle them.
          </div>

          <div className="mt-8 space-y-6">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h2>
                <p className="mt-2 text-sm leading-7 text-navy-400">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-4 text-center"><FileText size={20} className="mx-auto text-gold-500" /><p className="mt-2 text-xs text-navy-400">Documents never used for marketing</p></div>
            <div className="card p-4 text-center"><Trash2 size={20} className="mx-auto text-gold-500" /><p className="mt-2 text-xs text-navy-400">Delete your data anytime</p></div>
            <div className="card p-4 text-center"><Mail size={20} className="mx-auto text-gold-500" /><p className="mt-2 text-xs text-navy-400">Contact us for any request</p></div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
