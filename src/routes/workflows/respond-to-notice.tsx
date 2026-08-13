import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { workflows } from "../../domain/workflows";

export const Route = createFileRoute("/workflows/respond-to-notice")({ component: RespondToNotice });

const steps = ["Start", "Notice", "Facts", "Objective", "Draft", "Review", "Attachments", "Recipient", "Mail"];

function RespondToNotice() {
  const definition = workflows["respond-to-notice"];
  const [step, setStep] = useState(0);
  const [noticeName, setNoticeName] = useState("");
  const [objective, setObjective] = useState("");
  const [facts, setFacts] = useState("");
  const [draft, setDraft] = useState("");

  const progress = useMemo(() => Math.round((step / (steps.length - 1)) * 100), [step]);
  const canContinue = step === 1 ? noticeName.trim().length > 0 : step === 2 ? facts.trim().length > 0 : step === 3 ? objective.trim().length > 0 : true;

  function continueWorkflow() {
    if (step === 4 && !draft) {
      setDraft(`Re: Response regarding ${noticeName}\n\nI am writing regarding the notice referenced above.\n\n${objective}\n\n${facts}\n\nSincerely,`);
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  return <main className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white"><div className="container flex min-h-18 items-center justify-between py-4"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><ArrowLeft size={17}/> Immigration Mail</Link><span className="text-sm text-slate-500">Respond to a Notice</span></div></header>
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8"><div className="flex items-center justify-between text-xs font-semibold text-slate-500"><span>Step {step + 1} of {steps.length}</span><span>{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-slate-800 transition-all" style={{width: `${progress}%`}} /></div><div className="mt-3 hidden justify-between text-xs text-slate-400 sm:flex">{steps.map((item) => <span key={item}>{item}</span>)}</div></div>
        <section className="card p-6 md:p-10">
          {step === 0 && <><div className="eyebrow">Guided workflow</div><h1 className="mt-3 text-3xl font-bold text-slate-950">Respond to an immigration notice</h1><p className="mt-4 leading-7 text-slate-600">We'll help you organize the notice, confirm the information you provide, prepare an editable draft, and move toward mailing. Nothing is sent until you review and approve it.</p><div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><ShieldAlert className="mb-2" size={19}/>{definition.disclaimer}</div></>}
          {step === 1 && <><div className="eyebrow">1 · Upload / identify</div><h2 className="mt-3 text-2xl font-bold">Start with the notice</h2><p className="mt-3 text-slate-600">Upload the notice when document processing is connected, or identify it here so the workflow can begin. Do not enter information you don't want to store.</p><label className="mt-7 block rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center"><FileUp className="mx-auto" size={28}/><span className="mt-3 block font-semibold">Upload notice</span><span className="mt-1 block text-sm text-slate-500">PDF, JPG, or PNG · secure storage will be added to the workflow backend</span><input type="file" accept="application/pdf,image/jpeg,image/png" className="sr-only" /></label><label className="mt-6 block text-sm font-medium">Notice name or reference<input value={noticeName} onChange={(e) => setNoticeName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700" placeholder="Example: USCIS notice received August 2026" /></label></>}
          {step === 2 && <><div className="eyebrow">2 · Your facts</div><h2 className="mt-3 text-2xl font-bold">What facts should the response address?</h2><p className="mt-3 text-slate-600">Use your own words. The drafting assistant must not invent facts.</p><textarea value={facts} onChange={(e) => setFacts(e.target.value)} className="mt-6 min-h-48 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-slate-700" placeholder="Enter the relevant facts you want included..." /></>}
          {step === 3 && <><div className="eyebrow">3 · Your objective</div><h2 className="mt-3 text-2xl font-bold">What do you want the correspondence to accomplish?</h2><textarea value={objective} onChange={(e) => setObjective(e.target.value)} className="mt-6 min-h-40 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-slate-700" placeholder="Example: I want to provide the requested documents and explain the missing item." /></>}
          {step === 4 && <><div className="eyebrow">4 · Draft</div><h2 className="mt-3 text-2xl font-bold">Prepare your response</h2><p className="mt-3 text-slate-600">This first draft is a starting point. Review every fact, name, date, and statement before sending.</p><textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="mt-6 min-h-72 w-full rounded-xl border border-slate-300 p-4 font-mono text-sm leading-6 outline-none focus:border-slate-700" placeholder="Your editable draft will appear here." /></>}
          {step === 5 && <><div className="eyebrow">5 · Review</div><h2 className="mt-3 text-2xl font-bold">Review before anything is mailed</h2><div className="mt-6 space-y-3">{["I reviewed every factual statement.", "Names, dates, receipt numbers, and addresses are correct.", "I reviewed the uploaded notice and official instructions.", "I understand Immigration Mail is not providing legal advice."] .map((item) => <label key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm text-slate-700"><input type="checkbox" className="mt-0.5" />{item}</label>)}</div></>}
          {step === 6 && <><div className="eyebrow">6 · Attachments</div><h2 className="mt-3 text-2xl font-bold">Add supporting documents</h2><p className="mt-3 text-slate-600">Add only the documents you intend to send and verify that they match the instructions you are responding to.</p><div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center"><FileUp className="mx-auto"/><p className="mt-2 font-medium">Add attachments</p><p className="text-sm text-slate-500">Secure document storage will be connected in the next backend phase.</p></div></>}
          {step === 7 && <><div className="eyebrow">7 · Recipient</div><h2 className="mt-3 text-2xl font-bold">Confirm where this will be sent</h2><p className="mt-3 text-slate-600">The production mailing step will require the exact recipient address from your notice or verified instructions.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="Recipient / agency"/><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="Street address"/><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="City"/><input className="rounded-xl border border-slate-300 px-4 py-3" placeholder="State / ZIP"/></div></>}
          {step === 8 && <><div className="eyebrow">8 · Mailing</div><h2 className="mt-3 text-2xl font-bold">Mailing and checkout</h2><p className="mt-3 text-slate-600">The next implementation phase will connect this reviewed package to Stripe and the mailing provider. Nothing is submitted from this prototype step.</p><div className="mt-6 rounded-xl bg-slate-100 p-5"><p className="font-semibold">Ready for production integration</p><p className="mt-2 text-sm text-slate-600">Stripe checkout → Lob submission → tracking → proof record.</p></div></>}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6"><button onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 disabled:invisible">Back</button>{step < steps.length - 1 ? <button onClick={continueWorkflow} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight size={17}/></button> : <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Save draft <CheckCircle2 size={17}/></Link>}</div>
        </section>
      </div>
    </div>
  </main>;
}
