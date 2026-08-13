import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, Mail, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

const workflows = [
  { title: "Respond to a Notice", description: "Organize a notice, confirm the important details, prepare a response, and get it ready to mail.", icon: FileText, href: "/workflows/respond-to-notice" },
  { title: "Submit Supporting Documents", description: "Prepare a clear cover letter and organize supporting documentation for a mailing.", icon: Mail, href: "/workflows/supporting-documents" },
  { title: "Prepare an Explanation Letter", description: "Turn your own facts and instructions into a professional, editable correspondence draft.", icon: Sparkles, href: "/workflows/explanation-letter" },
];

function HomePage() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex min-h-18 items-center justify-between gap-5 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">Immigration Mail</Link>
          <nav className="hidden gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#workflows">What can I send?</a><a href="#how">How it works</a><a href="#trust">Trust & privacy</a>
          </nav>
          <Link to="/workflows/respond-to-notice" className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Start</Link>
        </div>
      </header>

      <section className="bg-white py-16 md:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="eyebrow">Immigration correspondence, made clearer</div>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">Prepare and send important immigration correspondence with confidence.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Immigration Mail helps you organize information, prepare professional correspondence, send physical mail, and keep a record of what you sent.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/workflows/respond-to-notice" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white hover:bg-slate-800">Respond to a notice <ArrowRight size={18} /></Link>
              <a href="#workflows" className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800">See what you can do</a>
            </div>
            <p className="mt-5 text-sm text-slate-500">Not a law firm. Not legal advice. You remain in control of the facts and final document.</p>
          </div>
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="rounded-xl bg-slate-100 p-3"><ShieldCheck size={22} /></div><div><p className="font-semibold text-slate-900">A guided correspondence workflow</p><p className="text-sm text-slate-500">From document to mailing record</p></div></div>
            <div className="mt-6 space-y-4">{["Upload and review your notice", "Organize the facts and objective", "Draft and edit your correspondence", "Choose mailing and keep the record"].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle2 size={19} className="shrink-0 text-emerald-600" />{item}</div>)}</div>
          </div>
        </div>
      </section>

      <section id="workflows" className="bg-slate-50 py-16 md:py-20"><div className="container"><div className="max-w-2xl"><div className="eyebrow">Start with the job</div><h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">What are you trying to do?</h2><p className="mt-4 text-slate-600">Choose a guided starting point. Immigration Mail is designed around correspondence tasks, not generic AI chat.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{workflows.map(({ title, description, icon: Icon, href }) => <Link key={title} to={href} className="card group p-6 transition hover:-translate-y-0.5 hover:shadow-lg"><Icon size={25} className="text-slate-700" /><h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">Start workflow <ArrowRight size={16} /></span></Link>)}</div></div></section>

      <section id="how" className="bg-white py-16 md:py-20"><div className="container"><div className="grid gap-8 md:grid-cols-4">{[["1","Understand","Start with the document or correspondence problem."],["2","Prepare","Confirm facts and create an editable draft."],["3","Send","Choose your mailing options and complete payment."],["4","Prove","Track the mailing and keep your record."]].map(([n,t,d]) => <div key={n}><div className="text-sm font-bold text-slate-400">0{n}</div><h3 className="mt-2 font-semibold text-slate-950">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></div>)}</div></div></section>

      <section id="trust" className="border-t border-slate-200 bg-slate-50 py-12"><div className="container grid gap-8 md:grid-cols-3"><div><h2 className="font-semibold text-slate-950">Your facts stay yours</h2><p className="mt-2 text-sm leading-6 text-slate-600">AI assists with organization and drafting. It should not invent facts, deadlines, or legal conclusions.</p></div><div><h2 className="font-semibold text-slate-950">Built for important mail</h2><p className="mt-2 text-sm leading-6 text-slate-600">The product is designed around physical correspondence, tracking, and a retained mailing record.</p></div><div><h2 className="font-semibold text-slate-950">Know what we're not</h2><p className="mt-2 text-sm leading-6 text-slate-600">Immigration Mail is not a government agency or law firm and does not provide legal advice.</p></div></div></section>

      <footer className="bg-white py-8"><div className="container flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"><span>© 2026 Immigration Mail</span><span>Information is educational and product-related, not legal advice.</span></div></footer>
    </main>
  );
}
