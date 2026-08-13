import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileUp, ShieldAlert, CheckCircle2, Mail, PackageCheck, Stamp, CreditCard, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { workflows } from "../../domain/workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/workflows/supporting-documents")({
  head: () => ({
    meta: [
      { title: "Submit Supporting Documents — Immigration Mail" },
      { name: "description", content: "Prepare a cover letter and submit supporting documents by mail with tracking and proof of delivery." },
    ],
  }),
  component: SupportingDocuments,
});

const stepLabels = ["Start", "Documents", "Draft", "Review", "Attachments", "Recipient", "Mailing", "Checkout", "Done"];

const mailOptions = [
  { id: "first_class", label: "First-Class", price: "$3.99", desc: "3–5 business days · Tracking included", icon: Mail },
  { id: "certified", label: "Certified", price: "$8.99", desc: "Signature tracking · Proof of delivery", icon: PackageCheck },
  { id: "certified_rr", label: "Certified + Return Receipt", price: "$12.99", desc: "Signed return receipt card", icon: ShieldAlert },
  { id: "registered", label: "Registered", price: "$15.99", desc: "Highest security · Insured · Signature required", icon: Stamp },
];

const reviewChecks = [
  "I reviewed every factual statement in this cover letter.",
  "All document names, case numbers, and references are correct.",
  "The attachments match what is described in the cover letter.",
  "I understand Immigration Mail is not providing legal advice.",
];

function SupportingDocuments() {
  const definition = workflows["supporting-documents"];
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [documents, setDocuments] = useState("");
  const [draft, setDraft] = useState("");
  const [checks, setChecks] = useState<boolean[]>(reviewChecks.map(() => false));
  const [mailType, setMailType] = useState("certified");
  const [recipient, setRecipient] = useState({ name: "", org: "", address1: "", address2: "", city: "", state: "", zip: "" });

  const progress = useMemo(() => Math.round((step / (stepLabels.length - 1)) * 100), [step]);
  const allChecked = checks.every(Boolean);

  function generateDraft() {
    return `Re: Submission of Supporting Documents
${documents ? `Documents enclosed: ${documents}` : ""}

Dear Sir or Madam,

I am writing to submit the following supporting documents in connection with my matter. ${purpose || "[Describe the purpose of your submission.]"}

Please find the enclosed documents for your review and consideration. If you require any additional information, please do not hesitate to contact me.

Sincerely,
[Your Name]`;
  }

  function canContinue() {
    switch (step) {
      case 1: return purpose.trim().length > 0;
      case 2: return draft.trim().length > 0;
      case 3: return allChecked;
      case 5: return recipient.name && recipient.address1 && recipient.city && recipient.state && recipient.zip;
      default: return true;
    }
  }

  function next() {
    if (step === 1 && !draft) setDraft(generateDraft());
    setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />

      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-navy-400">
              <span>Step {step + 1} of {stepLabels.length}</span>
              <span>{progress}% complete</span>
            </div>
            <div className="progress-track mt-2">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 hidden justify-between text-[11px] text-navy-300 sm:flex">
              {stepLabels.map((label, i) => (
                <span key={label} className={i <= step ? "font-semibold text-navy-600" : ""}>{label}</span>
              ))}
            </div>
          </div>

          <div className="card p-6 md:p-10">
            {step === 0 && (
              <>
                <div className="eyebrow">Guided workflow</div>
                <h1 className="mt-3 text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Submit Supporting Documents</h1>
                <p className="mt-4 leading-7 text-navy-400">Prepare a clear cover letter, organize your supporting documentation, confirm the recipient, and move toward physical mailing.</p>
                <div className="alert alert-warning mt-6"><ShieldAlert size={18} className="mb-2 shrink-0" />{definition.disclaimer}</div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Describe what you're submitting", "Generate a cover letter draft", "Review and add attachments", "Choose mailing and send"].map((item, i) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-navy-500">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-400">{i + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="eyebrow">1 · What are you submitting?</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Describe your submission</h2>
                <p className="mt-3 text-navy-400">Describe the purpose of your submission and list the documents you are including. Use your own words — the drafting assistant won't invent facts.</p>
                <label className="input-label mt-6">Purpose of submission *</label>
                <textarea className="input-field min-h-32" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Example: Submitting additional evidence requested in my RFE response..." />
                <label className="input-label mt-4">Documents being enclosed</label>
                <textarea className="input-field min-h-28" value={documents} onChange={(e) => setDocuments(e.target.value)} placeholder="List each document (e.g., Form I-864, bank statements, lease agreement)..." />
              </>
            )}

            {step === 2 && (
              <>
                <div className="eyebrow">2 · Cover letter draft</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review your cover letter</h2>
                <p className="mt-3 text-navy-400">This draft was generated from your input. Edit any part before proceeding.</p>
                <textarea className="input-field mt-6 min-h-72 font-mono text-sm leading-6" value={draft} onChange={(e) => setDraft(e.target.value)} />
                <div className="alert alert-warning mt-4"><ShieldAlert size={16} className="shrink-0" /> This draft is not legal advice. Review and edit carefully.</div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="eyebrow">3 · Review</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review before mailing</h2>
                <p className="mt-3 text-navy-400">Please confirm each item below.</p>
                <div className="mt-6 space-y-3">
                  {reviewChecks.map((item, i) => (
                    <label key={item} className="check-card">
                      <input type="checkbox" checked={checks[i]} onChange={(e) => setChecks((c) => c.map((v, j) => (j === i ? e.target.checked : v)))} />
                      {item}
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="eyebrow">4 · Attachments</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Add your supporting documents</h2>
                <p className="mt-3 text-navy-400">Upload the documents referenced in your cover letter. Verify they match what was described.</p>
                <label className="upload-zone mt-6 block">
                  <FileUp className="mx-auto text-navy-400" size={28} />
                  <span className="mt-3 block font-semibold text-navy-500">Upload supporting documents</span>
                  <span className="mt-1 block text-sm text-navy-300">PDF, JPG, or PNG · Secure storage coming soon</span>
                  <input type="file" accept="application/pdf,image/jpeg,image/png" multiple className="sr-only" />
                </label>
              </>
            )}

            {step === 5 && (
              <>
                <div className="eyebrow">5 · Recipient</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Where should we send it?</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="input-label">Recipient name *</label><input className="input-field" value={recipient.name} onChange={(e) => setRecipient({ ...recipient, name: e.target.value })} placeholder="USCIS Attn: Field Office" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Organization / Office</label><input className="input-field" value={recipient.org} onChange={(e) => setRecipient({ ...recipient, org: e.target.value })} placeholder="Optional" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Address line 1 *</label><input className="input-field" value={recipient.address1} onChange={(e) => setRecipient({ ...recipient, address1: e.target.value })} placeholder="Street address" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Address line 2</label><input className="input-field" value={recipient.address2} onChange={(e) => setRecipient({ ...recipient, address2: e.target.value })} placeholder="Suite, unit, etc." /></div>
                  <div><label className="input-label">City *</label><input className="input-field" value={recipient.city} onChange={(e) => setRecipient({ ...recipient, city: e.target.value })} /></div>
                  <div><label className="input-label">State *</label><input className="input-field" value={recipient.state} onChange={(e) => setRecipient({ ...recipient, state: e.target.value })} placeholder="CA" /></div>
                  <div><label className="input-label">ZIP Code *</label><input className="input-field" value={recipient.zip} onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })} placeholder="90210" /></div>
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="eyebrow">6 · Mailing options</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Choose your mail type</h2>
                <p className="mt-3 text-navy-400">For document submissions, certified mail is recommended for proof of delivery.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {mailOptions.map(({ id, label, price, desc, icon: Icon }) => (
                    <div key={id} className={`mail-option ${mailType === id ? "selected" : ""}`} onClick={() => setMailType(id)}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3"><Icon size={20} className="text-navy-500" /><div><p className="font-semibold text-navy-600">{label}</p><p className="text-xs text-navy-400">{desc}</p></div></div>
                        <div className="text-right"><p className="text-lg font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{price}</p>{mailType === id && <Check size={16} className="ml-auto text-gold-500" />}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <div className="eyebrow">7 · Checkout</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review and pay</h2>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Mail type</span><span className="font-semibold text-navy-600">{mailOptions.find((m) => m.id === mailType)?.label}</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Recipient</span><span className="font-semibold text-navy-600">{recipient.name || "—"}</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Total</span><span className="text-lg font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{mailOptions.find((m) => m.id === mailType)?.price}</span></div>
                </div>
                <div className="alert alert-info mt-4"><CreditCard size={16} className="shrink-0" /> Secure checkout via Stripe is being connected.</div>
              </>
            )}

            {step === 8 && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 size={32} className="text-emerald-600" /></div>
                <h2 className="mt-5 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your mailing has been submitted</h2>
                <p className="mt-3 text-navy-400">Your cover letter and documents are being prepared for mailing.</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-warm-border px-4 py-3 text-sm"><PackageCheck size={16} className="text-gold-500" /><span className="text-navy-500">Tracking number:</span><span className="font-mono font-semibold text-navy-600">— Pending —</span></div>
                <div className="mt-8 flex justify-center gap-3"><Link to="/" className="btn-outline">Back to home</Link><Link to="/workflows/supporting-documents" className="btn-primary">Start another</Link></div>
              </div>
            )}

            {step < 8 && (
              <div className="mt-8 flex items-center justify-between">
                <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-30"><ArrowLeft size={16} /> Back</button>
                <button onClick={next} disabled={!canContinue()} className="btn-primary">{step === 7 ? "Pay and send" : "Continue"} <ArrowRight size={16} /></button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center"><Link to="/" className="text-sm text-navy-400 hover:text-gold-500">← Back to Immigration Mail</Link></div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
