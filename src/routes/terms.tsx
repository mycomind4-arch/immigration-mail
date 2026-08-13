import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Immigration Mail" },
      { name: "description", content: "Terms of service for Immigration Mail, including user responsibilities, payment, and limitations." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  { title: "Acceptance of Terms", body: "By using Immigration Mail, you agree to these Terms of Service. If you do not agree, do not use the service." },
  { title: "Description of Service", body: "Immigration Mail provides guided workflows for preparing immigration-related correspondence and physical mailing services. The service includes AI-assisted drafting, document upload, physical mail delivery via USPS, and mailing record retention." },
  { title: "Not Legal Advice", body: "Immigration Mail is not a law firm, government agency, or accredited representative. We do not provide legal advice, legal representation, or case strategy. The AI assistant organizes information you provide but does not invent facts, determine legal requirements, or draw legal conclusions. If you need legal advice, consult a qualified immigration attorney." },
  { title: "User Responsibilities", body: "You are responsible for the accuracy of all information you provide. You must review every draft before approving it for mailing. You are responsible for verifying that the recipient address is correct and that the correspondence is appropriate for your situation." },
  { title: "Acceptable Use", body: "You agree not to use Immigration Mail to send fraudulent, threatening, or harassing correspondence. You may not use the service to file documents you know to be false or misleading. You may not attempt to access other users' data or interfere with service operations." },
  { title: "Payment & Refunds", body: "Payment is processed securely via Stripe before mailing. If your mailing has not been submitted for processing, you may request a full refund. Once a mailing is in process, refunds are not available. Prices include printing, paper, envelope, and postage." },
  { title: "Intellectual Property", body: "Immigration Mail and its design, content, and software are owned by Immigration Mail. Your correspondence content remains yours. We do not claim ownership of documents you create through the service." },
  { title: "Limitation of Liability", body: "Immigration Mail is provided 'as is.' We are not liable for outcomes related to your correspondence, including denied applications, missed deadlines, or delivery failures beyond our control. Our liability is limited to the cost of the mailing service provided." },
  { title: "Dispute Resolution", body: "Any disputes will be resolved through binding arbitration. You and Immigration Mail waive the right to participate in class action lawsuits or class-wide arbitration." },
  { title: "Changes to Terms", body: "We may update these terms at any time. Continued use after changes constitutes acceptance of the updated terms." },
  { title: "Contact", body: "For questions about these terms, contact us at support@immigrationmail.app." },
];

function TermsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />
      <section className="bg-white py-16">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50"><FileText size={20} className="text-navy-600" /></div>
            <div>
              <h1 className="text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Terms of Service</h1>
              <p className="text-sm text-navy-400">Last updated: August 2026</p>
            </div>
          </div>

          <div className="alert alert-warning mt-6">
            <ShieldAlert size={18} className="shrink-0" />
            <div><strong>Important:</strong> Immigration Mail is not a law firm and does not provide legal advice. These terms explain what we are and what we are not.</div>
          </div>

          <div className="mt-8 space-y-6">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h2>
                <p className="mt-2 text-sm leading-7 text-navy-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
