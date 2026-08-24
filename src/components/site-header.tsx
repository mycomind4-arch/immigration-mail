import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { ChevronDown } from "lucide-react";
import { ECOSYSTEM_PRODUCTS, ECOSYSTEM_PAGE_URL } from "./ecosystem-nav";

export function Logo() {
  return (
    <span aria-hidden className="relative inline-flex h-8 w-9 items-center justify-center rounded-sm border border-ink/20 bg-paper-deep overflow-hidden">
      <span className="absolute inset-x-1.5 top-1.5 h-[6px] border-b border-ink/30" />
      <span className="absolute right-1 top-1.5 h-2 w-2 rounded-[1px] bg-brass/70" />
      <span className="absolute bottom-1.5 left-1.5 right-1.5 h-px bg-ink/15" />
      <span className="absolute bottom-1 left-1.5 h-3 w-[2px] bg-brass/50" />
    </span>
  );
}


function WorkflowsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return <div ref={ref} className="relative">
    <button type="button" onClick={() => setOpen(!open)} className="flex items-center gap-1 px-3 py-2 text-sm text-ink-soft transition-colors hover:text-foreground">Workflows<ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} /></button>
    {open && <div className="absolute left-0 top-full z-50 mt-1.5 w-[520px] max-w-[calc(100vw-2rem)]"><div className="overflow-hidden rounded-xl border border-rule bg-card shadow-premium"><div className="border-b border-rule/60 px-5 py-3"><div className="font-serif text-base">Workflows</div><p className="mt-0.5 text-xs text-muted-foreground">Purpose-built products for specific document problems.</p></div><div className="grid gap-px bg-rule/20 sm:grid-cols-2">{ECOSYSTEM_PRODUCTS.map((p) => <a key={p.product} href={p.href} onClick={() => setOpen(false)} className="block bg-card px-4 py-3 transition-colors hover:bg-muted/40"><div className="font-medium text-sm text-foreground">{p.product}</div><div className="mt-0.5 text-xs leading-5 text-muted-foreground">{p.description}</div></a>)}</div><div className="flex items-center justify-between border-t border-rule bg-paper-deep/30 px-5 py-2.5"><a href={ECOSYSTEM_PAGE_URL} onClick={() => setOpen(false)} className="text-xs font-medium text-cobalt hover:text-cobalt/80">Explore all workflows →</a><div className="text-[10px] text-muted-foreground">{ECOSYSTEM_PRODUCTS.length} product families</div></div></div></div>}
  </div>;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) { if (e.key === "Escape") { setMobileOpen(false); setUserMenuOpen(false); } }
    function handleClickOutside(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenuOpen(false); }
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("keydown", handleEscape); document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const navItems = [
    { label: "Workflows", href: "/workflows" },
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ];

  const handleSignOut = async () => { await signOut(); setUserMenuOpen(false); navigate({ to: "/" }); };

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Immigration Mail home">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg transition-colors group-hover:text-brass">Immigration Mail</span>
            <span className="mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">A MailMyPDF product</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <WorkflowsDropdown />
          {navItems.map((item) => <Link key={item.label} to={item.href} className="px-3 py-2 text-sm text-ink-soft transition-colors hover:text-foreground">{item.label}</Link>)}
          {user ? <>
            <Link to="/cases" className="px-3 py-2 text-sm text-ink-soft hover:text-foreground">My Cases</Link>
            <Link to="/dashboard" className="px-3 py-2 text-sm text-ink-soft hover:text-foreground">My Mailings</Link>
            <div ref={menuRef} className="relative ml-2">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-paper-deep text-xs font-medium text-ink-soft" aria-label="Account menu" aria-expanded={userMenuOpen}>{(user.email || "?")[0].toUpperCase()}</button>
              {userMenuOpen && <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-rule bg-card p-2 shadow-card"><div className="border-b border-rule/50 px-3 py-2"><p className="text-xs font-medium text-foreground truncate">{user.email}</p></div><Link to="/cases" className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted/50" onClick={() => setUserMenuOpen(false)}>My Cases</Link><Link to="/dashboard" className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted/50" onClick={() => setUserMenuOpen(false)}>My Mailings</Link><button onClick={handleSignOut} className="block w-full rounded-md px-3 py-2 text-left text-sm text-ink-soft hover:bg-muted/50">Sign out</button></div>}
            </div>
          </> : <Link to="/auth" className="px-3 py-2 text-sm text-ink-soft hover:text-foreground">Sign in</Link>}
          <Link to="/workflows/respond-to-notice" className="ml-2 btn-primary">Start a Case</Link>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-rule md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" aria-expanded={mobileOpen}>{mobileOpen ? "×" : "☰"}</button>
      </div>
      {mobileOpen && <div className="border-t border-rule bg-paper md:hidden"><div className="flex flex-col gap-1 px-4 py-3"><div className="mb-2"><div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Ecosystem</div><div className="grid gap-0.5">{ECOSYSTEM_PRODUCTS.map((p) => <a key={p.product} href={p.href} className="rounded-lg px-3 py-2.5 text-sm text-ink-soft hover:bg-muted/50 hover:text-foreground" onClick={() => setMobileOpen(false)}>{p.product}</a>)}</div></div>{navItems.map((item) => <Link key={item.label} to={item.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>{item.label}</Link>)}{user ? <><Link to="/cases" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>My Cases</Link><Link to="/dashboard" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>My Mailings</Link></> : <Link to="/auth" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>Sign in</Link>}<div className="mt-2 border-t border-rule/60 pt-3"><p className="px-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">MailMyPDF fulfillment</p><p className="px-3 pt-1 text-xs text-muted-foreground">Print, mail, track, and preserve proof.</p></div><Link to="/workflows/respond-to-notice" className="mt-2 btn-primary justify-center" onClick={() => setMobileOpen(false)}>Start a Case</Link></div></div>}
    </header>
  );
}
