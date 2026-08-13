import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileUp, ShieldAlert, Sparkles, CheckCircle2, Mail, PackageCheck, Stamp, CreditCard, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { workflows } from "../../domain/workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/workflows/explanation-letter")({
  head: () => ({
    meta: [
      { title: "Prepare an Explanation Letter — Immigration Mail" },
      { name: "description", content: "Turn your facts and objective into a professional, editable explanation letter and mail it with tracking." },
    ],
  }),
  component: ExplanationLetter,
});

const stepLabels = ["Start", "Facts", "Objective", "Draft", "Review", "Attachments", "Recipient", "Mailing", "Checkout", "Done"];

const mailOptions = [
  { id: "standard", label: "Standard", price: "$4.99", desc: "3–7 business days · Tracking included", icon: Mail },
  { id: "certified", label: "Certified", price: "$14.94", desc: "Delivery tracking + confirmation · 3–7 days", icon: PackageCheck },
  { id: "registered", label: "Registered", price: "$32.49", desc: "Secure handling + tracking · 5–10 days", icon: Stamp },
];

const reviewChecks = [
  "I reviewed every factual statement in this letter.",
  "Names, dates, and references are correct.",
  "The letter accurately reflects what I want to communicate.",
  "I understand Immigration Mail is not providing legal advice.",
];

function ExplanationLetter() {
  const definition = workflows["explanation-letter"];
  const [step, setStep] = useState(0);
  const [facts, setFacts] = useState("");
  const [objective, setObjective] = useState("");
  const [draft, setDraft] = useState("");
  const [checks, setChecks] = useState<boolean[]>(reviewChecks.map(() => false));
  const [mailType, setMailType] = useState("certified");
  const [recipient, setRecipient] = useState({ name: "", org: "", address1: "", address2: "", city: "", state: "", zip: "" });

  const progress = useMemo(() => Math.round((step / (stepLabels.length - 1)) * 100), [step]);
  const allChecked = checks.every(Boolean);

  function generateDraft() {
    return `Re: Explanation Letter

Dear Sir or Madam,

I am writing to provide an explanation regarding the following matter.

${objective || "[Your objective will appear here.]"}

${facts || "[The facts you provided will appear here.]"}

I appreciate your consideration of this explanation. Should you require any additional information, please do not hesitate to contact me.

Sincerely,
[Your Name]`;
  }

  function canContinue() {
    switch (step) {
      case 1: return facts.trim().length > 0;
      case 2: return objective.trim().length > 0;
      case 4: return allChecked;
      case 6: return recipient.name && recipient.address1 && recipient.city && recipient.state && recipient.zip;
      default: return true;
    }
  }

  function next() {
    if (step === 2 && !draft) setDraft(generateDraft());
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
                <div className="eyebrow">AI-assisted correspondence</div>
                <h1 className="mt-3 text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Prepare an Explanation Letter</h1>
                <p className="mt-4 leading-7 text-navy-400">Start with facts you provide and the outcome you want the correspondence to accomplish. The AI assistant will help organize those facts into an editable draft.</p>
                <div className="alert alert-warning mt-6"><ShieldAlert size={18} className="mb-2 shrink-0" />{definition.disclaimer}</div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Provide your facts", "Describe your objective", "Review and edit the draft", "Choose mailing and send"].map((item, i) => (
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
                <div className="eyebrow">1 · Your facts</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>What facts should the letter include?</h2>
                <p className="mt-3 text-navy-400">Use your own words. Only enter facts you can verify. The drafting assistant will not invent information.</p>
                <textarea className="input-field mt-6 min-h-48" value={facts} onChange={(e) => setFacts(e.target.value)} placeholder="Enter the facts you want included in your explanation letter..." />
                <div className="alert alert-info mt-4">
                  <Sparkles size={16} className="shrink-0" /> <strong>Tip:</strong> Include relevant dates, events, and context. The more specific you are, the better the draft will be.
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="eyebrow">2 · Your objective</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>What do you want the letter to accomplish?</h2>
                <p className="mt-3 text-navy-400">Describe what you want to explain or communicate. This guides the tone and structure of the letter.</p>
                <textarea className="input-field mt-6 min-h-40" value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Example: I want to explain a gap in employment and provide supporting context." />
              </>
            )}

            {step === 3 && (
              <>
                <div className="eyebrow">3 · Draft</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your explanation letter</h2>
                <p className="mt-3 text-navy-400">This draft was generated from your facts and objective. Edit anything before proceeding.</p>
                <textarea className="input-field mt-6 min-h-72 font-mono text-sm leading-6" value={draft} onChange={(e) => setDraft(e.target.value)} />
                <div className="alert alert-warning mt-4"><ShieldAlert size={16} className="shrink-0" /> AI-generated text is editable and must not invent facts, deadlines, requirements, or legal conclusions. Review carefully.</div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="eyebrow">4 · Review</div>
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

            {step === 5 && (
              <>
                <div className="eyebrow">5 · Attachments</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Add supporting documents</h2>
                <p className="mt-3 text-navy-400">Attach any documents that support your explanation. Optional — only include what's relevant.</p>
                <label className="upload-zone mt-6 block">
                  <FileUp className="mx-auto text-navy-400" size={28} />
                  <span className="mt-3 block font-semibold text-navy-500">Upload attachments</span>
                  <span className="mt-1 block text-sm text-navy-300">PDF, JPG, or PNG · Secure storage coming soon</span>
                  <input type="file" accept="application/pdf,image/jpeg,image/png" multiple className="sr-only" />
                </label>
              </>
            )}

            {step === 6 && (
              <>
                <div className="eyebrow">6 · Recipient</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Where should we send it?</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="input-label">Recipient name *</label><input className="input-field" value={recipient.name} onChange={(e) => setRecipient({ ...recipient, name: e.target.value })} placeholder="Agency or individual" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Organization / Office</label><input className="input-field" value={recipient.org} onChange={(e) => setRecipient({ ...recipient, org: e.target.value })} placeholder="Optional" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Address line 1 *</label><input className="input-field" value={recipient.address1} onChange={(e) => setRecipient({ ...recipient, address1: e.target.value })} placeholder="Street address" /></div>
                  <div className="sm:col-span-2"><label className="input-label">Address line 2</label><input className="input-field" value={recipient.address2} onChange={(e) => setRecipient({ ...recipient, address2: e.target.value })} placeholder="Suite, unit, etc." /></div>
                  <div><label className="input-label">City *</label><input className="input-field" value={recipient.city} onChange={(e) => setRecipient({ ...recipient, city: e.target.value })} /></div>
                  <div><label className="input-label">State *</label><input className="input-field" value={recipient.state} onChange={(e) => setRecipient({ ...recipient, state: e.target.value })} placeholder="CA" /></div>
                  <div><label className="input-label">ZIP Code *</label><input className="input-field" value={recipient.zip} onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })} placeholder="90210" /></div>
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <div className="eyebrow">7 · Mailing options</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Choose your mail type</h2>
                <p className="mt-3 text-navy-400">All options include printing, paper, envelope, and postage.</p>
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

            {step === 8 && (
              <>
                <div className="eyebrow">8 · Checkout</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review and pay</h2>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Mail type</span><span className="font-semibold text-navy-600">{mailOptions.find((m) => m.id === mailType)?.label}</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Recipient</span><span className="font-semibold text-navy-600">{recipient.name || "—"}</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm"><span className="text-navy-500">Total</span><span className="text-lg font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{mailOptions.find((m) => m.id === mailType)?.price}</span></div>
                </div>
                <div className="alert alert-info mt-4"><CreditCard size={16} className="shrink-0" /> Secure checkout via Stripe is being connected.</div>
              </>
            )}

            {step === 9 && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 size={32} className="text-emerald-600" /></div>
                <h2 className="mt-5 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your letter has been submitted</h2>
                <p className="mt-3 text-navy-400">Your explanation letter is being prepared for mailing.</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-warm-border px-4 py-3 text-sm"><PackageCheck size={16} className="text-gold-500" /><span className="text-navy-500">Tracking number:</span><span className="font-mono font-semibold text-navy-600">— Pending —</span></div>
                <div className="mt-8 flex justify-center gap-3"><Link to="/" className="btn-outline">Back to home</Link><Link to="/workflows/explanation-letter" className="btn-primary">Start another</Link></div>
              </div>
            )}

            {step < 9 && (
              <div className="mt-8 flex items-center justify-between">
                <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-30"><ArrowLeft size={16} /> Back</button>
                <button onClick={next} disabled={!canContinue()} className="btn-primary">{step === 8 ? "Pay and send" : "Continue"} <ArrowRight size={16} /></button>
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
