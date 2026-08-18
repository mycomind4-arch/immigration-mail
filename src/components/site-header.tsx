import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";

export function Logo() {
  return (
    <span aria-hidden className="relative inline-flex h-8 w-10 items-center justify-center rounded-sm border border-ink bg-paper-deep overflow-hidden">
      <span className="absolute inset-x-1 top-1 h-[7px] border-b border-ink" />
      <span className="absolute right-1 top-1 h-2 w-2 rounded-[1px] bg-stamp" />
      <span className="absolute bottom-1 left-1 right-1 h-px bg-ink/20" />
    </span>
  );
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
    { label: "FAQ", href: "/faq" },
  ];

  const handleSignOut = async () => { await signOut(); setUserMenuOpen(false); navigate({ to: "/" }); };

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group"><Logo /><span className="font-serif text-lg leading-none transition-colors group-hover:text-stamp">Immigration Mail</span></Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => <Link key={item.label} to={item.href} className="px-3 py-2 text-sm text-ink-soft transition-colors hover:text-foreground">{item.label}</Link>)}
          <Link to="/analyze" className="ml-1 px-3 py-2 text-sm text-ink-soft hover:text-foreground">Analyze</Link>
          {user ? <>
            <Link to="/cases" className="px-3 py-2 text-sm text-ink-soft hover:text-foreground">My Cases</Link>
            <Link to="/dashboard" className="px-3 py-2 text-sm text-ink-soft hover:text-foreground">My Mailings</Link>
            <div ref={menuRef} className="relative ml-2">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-paper-deep text-xs font-medium text-ink-soft" aria-label="Account menu">{(user.email || "?")[0].toUpperCase()}</button>
              {userMenuOpen && <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-rule bg-card p-2 shadow-card"><div className="border-b border-rule/50 px-3 py-2"><p className="text-xs font-medium text-foreground truncate">{user.email}</p></div><Link to="/cases" className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted/50" onClick={() => setUserMenuOpen(false)}>My Cases</Link><Link to="/dashboard" className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted/50" onClick={() => setUserMenuOpen(false)}>My Mailings</Link><button onClick={handleSignOut} className="block w-full rounded-md px-3 py-2 text-left text-sm text-ink-soft hover:bg-muted/50">Sign out</button></div>}
            </div>
          </> : <Link to="/auth" className="ml-1 px-3 py-2 text-sm text-ink-soft hover:text-foreground">Sign in</Link>}
          <Link to="/workflows/respond-to-notice" className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-stamp">Start a letter</Link>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-rule md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" aria-expanded={mobileOpen}>{mobileOpen ? "×" : "☰"}</button>
      </div>
      {mobileOpen && <div className="border-t border-rule bg-paper md:hidden"><div className="flex flex-col gap-1 px-4 py-3">{navItems.map((item) => <Link key={item.label} to={item.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>{item.label}</Link>)}<Link to="/analyze" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>Analyze a document</Link>{user ? <><Link to="/cases" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>My Cases</Link><Link to="/dashboard" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>My Mailings</Link></> : <Link to="/auth" className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-muted/50" onClick={() => setMobileOpen(false)}>Sign in</Link>}<Link to="/workflows/respond-to-notice" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground" onClick={() => setMobileOpen(false)}>Start a letter</Link></div></div>}
    </header>
  );
}
