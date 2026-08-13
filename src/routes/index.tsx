import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, Mail, ShieldCheck, Sparkles, Clock, PackageCheck, Lock, FileUp, ChevronDown, Send, Eye, Stamp, Star, Quote } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({ component: HomePage });

const workflows = [
  { title: "Respond to a Notice", description: "Organize a notice, confirm the important details, prepare a response, and get it ready to mail.", icon: FileText, href: "/workflows/respond-to-notice" },
  { title: "Submit Supporting Documents", description: "Prepare a clear cover letter and organize supporting documentation for a mailing.", icon: Mail, href: "/workflows/supporting-documents" },
  { title: "Prepare an Explanation Letter", description: "Turn your own facts and instructions into a professional, editable correspondence draft.", icon: Sparkles, href: "/workflows/explanation-letter" },
];

const features = [
  { icon: FileText, title: "Guided workflows", desc: "Start with the job, not a blank page. Each workflow walks you through the steps from document to mailed letter." },
  { icon: Sparkles, title: "AI-assisted drafting", desc: "Organize your facts into a professional draft. Everything is editable. The AI never invents facts, deadlines, or legal conclusions." },
  { icon: Send, title: "Physical mail with tracking", desc: "Your correspondence is printed, enveloped, and mailed via USPS. Track delivery and keep proof of service." },
  { icon: ShieldCheck, title: "Proof of delivery", desc: "Certified mail options include signature tracking and a return receipt card — your record that it arrived." },
  { icon: Lock, title: "Secure document handling", desc: "Documents are stored securely, never shared, and never used for marketing analytics. You can delete your data anytime." },
  { icon: Clock, title: "Mailing history", desc: "Every mailing is recorded. See what you sent, when, and its delivery status — all in one place." },
];

const steps = [
  { n: "01", title: "Understand", desc: "Start with the document or correspondence problem you need to solve." },
  { n: "02", title: "Prepare", desc: "Confirm your facts, let AI help organize the draft, and review every word." },
  { n: "03", title: "Send", desc: "Choose your mailing options — first-class, certified, or certified with return receipt." },
  { n: "04", title: "Prove", desc: "Track delivery and keep a permanent record of what you sent and when." },
];

const stats = [
  { value: "3–5", label: "Business day delivery" },
  { value: "$3.99", label: "Starting price per mailing" },
  { value: "100%", label: "You control the facts" },
  { value: "0", label: "Printers needed" },
];

const testimonials = [
  { quote: "I needed to respond to an RFE and didn't have a printer. Immigration Mail walked me through the whole thing and mailed it certified. The tracking gave me peace of mind.", author: "Maria L.", role: "Responded to RFE" },
  { quote: "The guided workflow made writing my explanation letter so much clearer. I liked that I could edit everything and nothing was sent until I approved it.", author: "David K.", role: "Explanation Letter" },
  { quote: "Having a record of every mailing with tracking numbers in one place is exactly what I needed for my immigration case.", author: "Priya S.", role: "Supporting Documents" },
];

const comparison = [
  { feature: "Guided workflows (not blank-page chat)", us: true, them: false },
  { feature: "AI never invents facts or legal conclusions", us: true, them: "varies" },
  { feature: "Physical mail with tracking", us: true, them: false },
  { feature: "Certified mail with return receipt", us: true, them: false },
  { feature: "Proof of delivery records", us: true, them: false },
  { feature: "Mailing history dashboard", us: true, them: false },
  { feature: "No printer or post office visit needed", us: true, them: "DIY" },
  { feature: "You review before anything is sent", us: true, them: "varies" },
];

const faqItems = [
  { q: "Is this legal advice?", a: "No. Immigration Mail is a correspondence tool, not a law firm. We help you prepare and send documents — we do not provide legal advice, and AI never invents facts or legal conclusions." },
  { q: "How does the mailing work?", a: "Your final document is printed, placed in an envelope, and mailed via USPS. You can choose first-class, certified, or certified with return receipt for proof of delivery." },
  { q: "Is my data secure?", a: "All documents are stored with encryption, never shared with third parties, and never used for marketing. You can request full deletion of your data at any time." },
  { q: "What types of mail can I send?", a: "First-class, certified mail, certified with return receipt, and registered mail. Prices start at $3.99 per mailing, including printing, paper, envelope, and postage." },
  { q: "How long does delivery take?", a: "First-class mail typically arrives in 3–5 business days. Certified mail follows the same timeline with added tracking and proof of delivery." },
];

function HomePage() {
  return (
    <main>
      <SiteHeader variant="transparent" />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2b4a 0%, #15223c 60%, #101a30 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8951d' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-12V8H14v28h14v-2H16V10h18v12h2zM16 12h12v6H16v-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container relative py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="badge badge-gold mb-5">Immigration correspondence, made clearer</div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
                Send your immigration correspondence with confidence.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Prepare professional correspondence, send physical mail with tracking, and keep a record of what you sent. Guided workflows — not blank-page AI chat.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/workflows/respond-to-notice" className="btn-gold text-base">
                  Respond to a Notice <ArrowRight size={18} />
                </Link>
                <a href="#workflows" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                  See what you can do
                </a>
              </div>
              <p className="mt-5 text-sm text-white/50">Not a law firm. Not legal advice. You remain in control of the facts and final document.</p>
            </div>

            {/* Visual mockup */}
            <div className="relative hidden lg:block">
              <div className="card relative p-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-warm-border pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600">
                    <ShieldCheck size={20} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your correspondence workflow</p>
                    <p className="text-sm text-navy-400">From document to mailing record</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { icon: FileUp, text: "Upload and review your notice", done: true },
                    { icon: FileText, text: "Organize the facts and objective", done: true },
                    { icon: Sparkles, text: "Draft and edit your correspondence", done: true },
                    { icon: Send, text: "Choose mailing and keep the record", done: false },
                  ].map(({ icon: Icon, text, done }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${done ? "bg-emerald-50" : "bg-gray-100"}`}>
                        <Icon size={15} className={done ? "text-emerald-600" : "text-gray-400"} />
                      </div>
                      <span className={done ? "text-navy-600" : "text-navy-400"}>{text}</span>
                      {done && <CheckCircle2 size={15} className="ml-auto text-emerald-500" />}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-navy-500">
                    <PackageCheck size={16} className="text-gold-500" />
                    <span>Tracking: USPS Certified</span>
                  </div>
                  <span className="badge badge-green">In transit</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                <Stamp size={16} /> Proof of delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-warm-border bg-white py-8">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{value}</p>
              <p className="mt-1 text-xs text-navy-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-warm-border bg-cream py-6">
        <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-navy-400">
          {[
            { icon: Lock, text: "Bank-grade encryption" },
            { icon: PackageCheck, text: "USPS tracking included" },
            { icon: ShieldCheck, text: "Proof of delivery records" },
            { icon: Eye, text: "You review before anything is sent" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="text-gold-500" /> {text}
            </div>
          ))}
        </div>
      </section>

      {/* Workflows */}
      <section id="workflows" className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Start with the job</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>What are you trying to do?</h2>
            <p className="mt-4 text-navy-400">Choose a guided starting point. Immigration Mail is designed around correspondence tasks, not generic AI chat.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {workflows.map(({ title, description, icon: Icon, href }) => (
              <Link key={title} to={href} className="card group p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
                  <Icon size={24} className="text-navy-600" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{title}</h3>
                <p className="mt-3 text-sm leading-6 text-navy-400">{description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                  Start workflow <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="eyebrow">The process</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>How Immigration Mail works</h2>
            <p className="mt-4 text-navy-400">From document to delivered letter in four clear steps. Nothing is sent until you review and approve it.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-[2.2rem] top-12 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-warm-border to-transparent md:block" />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-600 text-white">
                  <span className="text-sm font-bold">{n}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section id="features" className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="eyebrow">Why Immigration Mail</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Built for important mail</h2>
            <p className="mt-4 text-navy-400">Everything you need to prepare, send, and prove your immigration correspondence — in one place.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-50">
                  <Icon size={22} className="text-gold-600" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="text-center">
            <div className="eyebrow">The difference</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Immigration Mail vs. doing it yourself</h2>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm border border-warm-border rounded-xl overflow-hidden">
              <thead className="bg-navy-600 text-white">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Feature</th>
                  <th className="px-5 py-4 text-center font-semibold" style={{ fontFamily: "var(--font-serif)" }}>Immigration Mail</th>
                  <th className="px-5 py-4 text-center font-semibold">DIY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border">
                {comparison.map(({ feature, us, them }) => (
                  <tr key={feature} className="hover:bg-cream/50">
                    <td className="px-5 py-3.5 text-navy-500 font-medium">{feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {us === true ? <CheckCircle2 size={18} className="mx-auto text-emerald-600" /> : <span className="text-navy-400">{us}</span>}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {them === false ? <span className="text-navy-300">—</span> : <span className="text-navy-400">{them}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What people say</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Built for real correspondence</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <Quote size={24} className="text-gold-300" />
                <p className="mt-3 text-sm leading-7 text-navy-500">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 font-bold text-navy-500" style={{ fontFamily: "var(--font-serif)" }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-600">{t.author}</p>
                    <p className="text-xs text-navy-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Simple pricing</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Pay per mailing. No subscription.</h2>
            <p className="mt-4 text-navy-400">Prices include printing, paper, envelope, and postage.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { type: "First-Class", price: "$3.99", desc: "3–5 business days, tracking included", icon: Mail },
              { type: "Certified", price: "$8.99", desc: "Signature tracking, proof of delivery", icon: PackageCheck, featured: false },
              { type: "Certified + Return Receipt", price: "$12.99", desc: "Signed return receipt card", icon: ShieldCheck, featured: true },
              { type: "Registered", price: "$15.99", desc: "Highest security, insured, signature required", icon: Stamp },
            ].map(({ type, price, desc, icon: Icon, featured }) => (
              <div key={type} className={`card p-6 text-center ${featured ? "ring-2 ring-gold-400" : ""}`}>
                {featured && <div className="badge badge-gold mb-3">Most popular</div>}
                <Icon size={28} className="mx-auto text-navy-600" />
                <h3 className="mt-4 font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{type}</h3>
                <p className="mt-2 text-3xl font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>{price}</p>
                <p className="mt-2 text-xs text-navy-400">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/pricing" className="btn-outline">See full pricing <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="trust" className="bg-cream py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card p-6">
              <Lock size={24} className="text-gold-500" />
              <h2 className="mt-4 text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Your facts stay yours</h2>
              <p className="mt-2 text-sm leading-6 text-navy-400">AI assists with organization and drafting. It will never invent facts, deadlines, or legal conclusions. Your documents are encrypted and never shared.</p>
            </div>
            <div className="card p-6">
              <ShieldCheck size={24} className="text-gold-500" />
              <h2 className="mt-4 text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Built for important mail</h2>
              <p className="mt-2 text-sm leading-6 text-navy-400">The product is designed around physical correspondence, tracking, and a retained mailing record — not just digital documents.</p>
            </div>
            <div className="card p-6">
              <FileText size={24} className="text-gold-500" />
              <h2 className="mt-4 text-lg font-semibold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Know what we're not</h2>
              <p className="mt-2 text-sm leading-6 text-navy-400">Immigration Mail is not a government agency or law firm and does not provide legal advice. If you need legal guidance, consult a qualified immigration attorney.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="bg-white py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="text-center">
            <div className="eyebrow">Questions</div>
            <h2 className="mt-3 text-3xl font-bold text-navy-600 md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Frequently asked</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="btn-outline">See all questions <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #1a2b4a 0%, #15223c 100%)" }} className="py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Ready to send your correspondence?</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">Start a guided workflow, review your draft, and mail it — all in one place.</p>
          <Link to="/workflows/respond-to-notice" className="btn-gold mt-8 text-base">Start now <ArrowRight size={18} /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button className="flex w-full items-center justify-between p-5 text-left" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-navy-600">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-navy-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm leading-6 text-navy-400">{a}</div>}
    </div>
  );
}
