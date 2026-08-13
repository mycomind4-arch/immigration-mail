import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/workflows/explanation-letter")({ component: ExplanationLetter });

function ExplanationLetter() {
  const [facts, setFacts] = useState("");
  const [objective, setObjective] = useState("");
  return <main className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="container py-4"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={17}/> Immigration Mail</Link></div></header><div className="container py-12"><div className="mx-auto max-w-2xl card p-7 md:p-10"><div className="eyebrow">AI-assisted correspondence</div><h1 className="mt-3 text-3xl font-bold">Prepare an Explanation Letter</h1><p className="mt-4 leading-7 text-slate-600">Start with facts you provide and the outcome you want the correspondence to accomplish. The eventual AI assistant will help organize those facts into an editable draft.</p><label className="mt-7 block text-sm font-semibold">Your facts<textarea value={facts} onChange={(e) => setFacts(e.target.value)} className="mt-2 min-h-36 w-full rounded-xl border border-slate-300 p-4" placeholder="Only enter facts you can verify." /></label><label className="mt-5 block text-sm font-semibold">Your objective<textarea value={objective} onChange={(e) => setObjective(e.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 p-4" placeholder="What do you want the letter to explain or communicate?" /></label><div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-600"><Sparkles size={18} className="mb-2"/> AI-generated text will be editable and must not invent facts, deadlines, requirements, or legal conclusions.</div><button disabled={!facts.trim() || !objective.trim()} className="mt-7 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-40">Prepare draft</button></div></div></main>;
}
