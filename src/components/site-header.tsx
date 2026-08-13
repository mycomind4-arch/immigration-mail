import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navItems = [
    { label: "How it works", href: "/#how" },
    { label: "What you can send", href: "/#workflows" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="font-serif text-lg leading-none transition-colors group-hover:text-stamp">
            Immigration Mail
          </span>
        </Link>

        {/* Desktop nav */}
        <div ref={containerRef} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm text-ink-soft transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="ml-2 px-3 py-2 text-sm text-ink-soft transition-colors hover:text-foreground"
          >
            My Mailings
          </Link>
          <Link
            to="/workflows/respond-to-notice"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-stamp transition-transform hover:-translate-y-0.5"
          >
            Start a letter
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-rule md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-rule bg-paper md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-muted/50 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-muted/50 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              My Mailings
            </Link>
            <Link
              to="/workflows/respond-to-notice"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Start a letter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
