import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/workflows/supporting-documents")({ component: SupportingDocuments });

function SupportingDocuments() {
  const [purpose, setPurpose] = useState("");
  return <main className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="container py-4"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={17}/> Immigration Mail</Link></div></header><div className="container py-12"><div className="mx-auto max-w-2xl card p-7 md:p-10"><div className="eyebrow">Workflow</div><h1 className="mt-3 text-3xl font-bold">Submit Supporting Documents</h1><p className="mt-4 leading-7 text-slate-600">Prepare a clear cover letter, organize your supporting documents, confirm the recipient, and move toward physical mailing.</p><label className="mt-8 block text-sm font-semibold">What are you submitting?<textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} className="mt-2 min-h-40 w-full rounded-xl border border-slate-300 p-4" placeholder="Describe the documents and purpose in your own words." /></label><p className="mt-4 text-xs leading-5 text-slate-500">Review the official instructions applicable to your matter. Immigration Mail does not determine what evidence you are legally required to submit.</p><button disabled={!purpose.trim()} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-40">Continue <ArrowRight size={17}/></button></div></div></main>;
}
