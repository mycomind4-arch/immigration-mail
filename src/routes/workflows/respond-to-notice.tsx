import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, FileUp, ShieldAlert, CheckCircle2, Mail, Clock, PackageCheck, Stamp, CreditCard, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { workflows } from "../../domain/workflows";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/workflows/respond-to-notice")({
  head: () => ({
    meta: [
      { title: "Respond to a Notice — Immigration Mail" },
      { name: "description", content: "Guided workflow to organize a notice, prepare a response, and mail it with proof of delivery." },
      { property: "og:title", content: "Respond to a Notice — Immigration Mail" },
      { property: "og:description", content: "Organize your notice, prepare an editable draft, and send certified mail with tracking." },
    ],
  }),
  component: RespondToNotice,
});

const stepLabels = ["Start", "Notice", "Facts", "Objective", "Draft", "Review", "Attachments", "Recipient", "Mailing", "Checkout", "Done"];

const mailOptions = [
  { id: "standard", label: "Standard", price: "$4.99", desc: "3–7 business days · Tracking included", icon: Mail },
  { id: "certified", label: "Certified", price: "$14.94", desc: "Delivery tracking + confirmation · 3–7 days", icon: PackageCheck },
  { id: "registered", label: "Registered", price: "$32.49", desc: "Secure handling + tracking · 5–10 days", icon: Stamp },
];

const reviewChecks = [
  "I reviewed every factual statement in this draft.",
  "Names, dates, receipt numbers, and addresses are correct.",
  "I reviewed the uploaded notice and official instructions.",
  "I understand Immigration Mail is not providing legal advice.",
];

function RespondToNotice() {
  const definition = workflows["respond-to-notice"];
  const [step, setStep] = useState(0);
  const [noticeName, setNoticeName] = useState("");
  const [agency, setAgency] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [responseDeadline, setResponseDeadline] = useState("");
  const [facts, setFacts] = useState("");
  const [objective, setObjective] = useState("");
  const [draft, setDraft] = useState("");
  const [checks, setChecks] = useState<boolean[]>(reviewChecks.map(() => false));
  const [mailType, setMailType] = useState("certified");
  const [recipient, setRecipient] = useState({ name: "", org: "", address1: "", address2: "", city: "", state: "", zip: "" });

  const progress = useMemo(() => Math.round((step / (stepLabels.length - 1)) * 100), [step]);
  const allChecked = checks.every(Boolean);

  function generateDraft() {
    return `Re: Response to ${noticeName || "[Notice Reference]"}
${agency ? `Agency: ${agency}` : ""}
${noticeDate ? `Notice Date: ${noticeDate}` : ""}
${responseDeadline ? `Response Deadline: ${responseDeadline}` : ""}

Dear Sir or Madam,

I am writing in response to the notice referenced above. ${objective || "[Your objective will appear here.]"}

${facts || "[The facts you provided will appear here.]"}

Please find enclosed the requested documents and information. I respectfully request that you consider this response in a timely manner.

Sincerely,
[Your Name]`;
  }

  function canContinue() {
    switch (step) {
      case 1: return noticeName.trim().length > 0;
      case 2: return facts.trim().length > 0;
      case 3: return objective.trim().length > 0;
      case 5: return allChecked;
      case 7: return recipient.name && recipient.address1 && recipient.city && recipient.state && recipient.zip;
      default: return true;
    }
  }

  function next() {
    if (step === 4 && !draft) setDraft(generateDraft());
    setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  return (
    <main className="min-h-screen bg-cream">
      <SiteHeader />

      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress */}
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
            {/* Step 0: Intro */}
            {step === 0 && (
              <>
                <div className="eyebrow">Guided workflow</div>
                <h1 className="mt-3 text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Respond to an immigration notice</h1>
                <p className="mt-4 leading-7 text-navy-400">We'll help you organize the notice, confirm the information you provide, prepare an editable draft, and move toward mailing. Nothing is sent until you review and approve it.</p>
                <div className="alert alert-warning mt-6">
                  <ShieldAlert size={18} className="mb-2 shrink-0" />
                  {definition.disclaimer}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Upload or identify the notice", "Confirm your facts and objective", "Review and edit the draft", "Choose mailing and send"].map((item, i) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-navy-500">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-xs font-bold text-navy-400">{i + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 1: Notice */}
            {step === 1 && (
              <>
                <div className="eyebrow">1 · Upload / identify</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Start with the notice</h2>
                <p className="mt-3 text-navy-400">Upload the notice when document processing is connected, or identify it here so the workflow can begin. Do not enter information you don't want to store.</p>
                <label className="upload-zone mt-7 block">
                  <FileUp className="mx-auto text-navy-400" size={28} />
                  <span className="mt-3 block font-semibold text-navy-500">Upload notice</span>
                  <span className="mt-1 block text-sm text-navy-300">PDF, JPG, or PNG · Secure storage will be added</span>
                  <input type="file" accept="application/pdf,image/jpeg,image/png" className="sr-only" />
                </label>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="input-label">Notice name or reference *</label>
                    <input className="input-field" value={noticeName} onChange={(e) => setNoticeName(e.target.value)} placeholder="Example: USCIS notice received August 2026" />
                  </div>
                  <div>
                    <label className="input-label">Issuing agency</label>
                    <input className="input-field" value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="USCIS, ICE, DOS, etc." />
                  </div>
                  <div>
                    <label className="input-label">Notice date</label>
                    <input type="date" className="input-field" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="input-label">Response deadline</label>
                    <input type="date" className="input-field" value={responseDeadline} onChange={(e) => setResponseDeadline(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Facts */}
            {step === 2 && (
              <>
                <div className="eyebrow">2 · Your facts</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>What facts should the response address?</h2>
                <p className="mt-3 text-navy-400">Use your own words. The drafting assistant must not invent facts. Only include information you can verify.</p>
                <textarea className="input-field mt-6 min-h-48" value={facts} onChange={(e) => setFacts(e.target.value)} placeholder="Enter the relevant facts you want included in your response..." />
                <div className="alert alert-info mt-4">
                  <strong>Tip:</strong> Include dates, receipt numbers, case numbers, and any specific requests from the notice. The more specific you are, the better the draft will be.
                </div>
              </>
            )}

            {/* Step 3: Objective */}
            {step === 3 && (
              <>
                <div className="eyebrow">3 · Your objective</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>What do you want the correspondence to accomplish?</h2>
                <p className="mt-3 text-navy-400">Describe the outcome you want. This guides the tone and structure of the draft.</p>
                <textarea className="input-field mt-6 min-h-40" value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Example: I want to provide the requested documents and explain why one item is missing." />
              </>
            )}

            {/* Step 4: Draft */}
            {step === 4 && (
              <>
                <div className="eyebrow">4 · Draft</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Prepare your response</h2>
                <p className="mt-3 text-navy-400">This draft is a starting point based on the information you provided. Review every fact, name, date, and statement before sending.</p>
                <textarea className="input-field mt-6 min-h-72 font-mono text-sm leading-6" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Your editable draft will appear here." />
                <div className="alert alert-warning mt-4">
                  <ShieldAlert size={16} className="shrink-0" /> This draft was generated from your input. It is not legal advice. Review and edit carefully before proceeding.
                </div>
              </>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <>
                <div className="eyebrow">5 · Review</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review before anything is mailed</h2>
                <p className="mt-3 text-navy-400">Please confirm each item below before proceeding.</p>
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

            {/* Step 6: Attachments */}
            {step === 6 && (
              <>
                <div className="eyebrow">6 · Attachments</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Add supporting documents</h2>
                <p className="mt-3 text-navy-400">Add only the documents you intend to send and verify that they match the instructions you are responding to.</p>
                <label className="upload-zone mt-6 block">
                  <FileUp className="mx-auto text-navy-400" size={28} />
                  <span className="mt-3 block font-semibold text-navy-500">Add attachments</span>
                  <span className="mt-1 block text-sm text-navy-300">PDF, JPG, or PNG · Secure document storage coming soon</span>
                  <input type="file" accept="application/pdf,image/jpeg,image/png" multiple className="sr-only" />
                </label>
              </>
            )}

            {/* Step 7: Recipient */}
            {step === 7 && (
              <>
                <div className="eyebrow">7 · Recipient</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Where should we send it?</h2>
                <p className="mt-3 text-navy-400">Enter the mailing address of the agency or recipient.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="input-label">Recipient name *</label>
                    <input className="input-field" value={recipient.name} onChange={(e) => setRecipient({ ...recipient, name: e.target.value })} placeholder="USCIS Attn: Field Office" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="input-label">Organization / Office</label>
                    <input className="input-field" value={recipient.org} onChange={(e) => setRecipient({ ...recipient, org: e.target.value })} placeholder="Optional" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="input-label">Address line 1 *</label>
                    <input className="input-field" value={recipient.address1} onChange={(e) => setRecipient({ ...recipient, address1: e.target.value })} placeholder="Street address" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="input-label">Address line 2</label>
                    <input className="input-field" value={recipient.address2} onChange={(e) => setRecipient({ ...recipient, address2: e.target.value })} placeholder="Suite, unit, etc. (optional)" />
                  </div>
                  <div>
                    <label className="input-label">City *</label>
                    <input className="input-field" value={recipient.city} onChange={(e) => setRecipient({ ...recipient, city: e.target.value })} />
                  </div>
                  <div>
                    <label className="input-label">State *</label>
                    <input className="input-field" value={recipient.state} onChange={(e) => setRecipient({ ...recipient, state: e.target.value })} placeholder="CA" />
                  </div>
                  <div>
                    <label className="input-label">ZIP Code *</label>
                    <input className="input-field" value={recipient.zip} onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })} placeholder="90210" />
                  </div>
                </div>
              </>
            )}

            {/* Step 8: Mailing */}
            {step === 8 && (
              <>
                <div className="eyebrow">8 · Mailing options</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Choose your mail type</h2>
                <p className="mt-3 text-navy-400">All options include printing, paper, envelope, and postage. For immigration correspondence, we recommend certified mail for proof of delivery.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {mailOptions.map(({ id, label, price, desc, icon: Icon }) => (
                    <div key={id} className={`mail-option ${mailType === id ? "selected" : ""}`} onClick={() => setMailType(id)}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon size={20} className="text-navy-500" />
                          <div>
                            <p className="font-semibold text-navy-600">{label}</p>
                            <p className="text-xs text-navy-400">{desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{price}</p>
                          {mailType === id && <Check size={16} className="ml-auto text-gold-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 9: Checkout */}
            {step === 9 && (
              <>
                <div className="eyebrow">9 · Checkout</div>
                <h2 className="mt-3 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Review and pay</h2>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm">
                    <span className="text-navy-500">Mail type</span>
                    <span className="font-semibold text-navy-600">{mailOptions.find((m) => m.id === mailType)?.label}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm">
                    <span className="text-navy-500">Recipient</span>
                    <span className="font-semibold text-navy-600">{recipient.name || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-warm-border px-4 py-3 text-sm">
                    <span className="text-navy-500">Total</span>
                    <span className="text-lg font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{mailOptions.find((m) => m.id === mailType)?.price}</span>
                  </div>
                </div>
                <div className="alert alert-info mt-4">
                  <CreditCard size={16} className="shrink-0" /> Secure checkout via Stripe is being connected. You will be able to pay with any major credit or debit card.
                </div>
              </>
            )}

            {/* Step 10: Done */}
            {step === 10 && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your mailing has been submitted</h2>
                <p className="mt-3 text-navy-400">Your correspondence is being prepared for mailing. You'll receive a tracking number once it ships.</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-warm-border px-4 py-3 text-sm">
                  <PackageCheck size={16} className="text-gold-500" />
                  <span className="text-navy-500">Tracking number:</span>
                  <span className="font-mono font-semibold text-navy-600">— Pending —</span>
                </div>
                <div className="mt-8 flex justify-center gap-3">
                  <Link to="/" className="btn-outline">Back to home</Link>
                  <Link to="/workflows/respond-to-notice" className="btn-primary">Start another</Link>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < 10 && (
              <div className="mt-8 flex items-center justify-between">
                <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-30">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={next} disabled={!canContinue()} className="btn-primary">
                  {step === 9 ? "Pay and send" : "Continue"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-navy-400 hover:text-gold-500">← Back to Immigration Mail</Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
