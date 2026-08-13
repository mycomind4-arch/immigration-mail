import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, FileText } from "lucide-react";

export function SiteHeader({ variant = "default" }: { variant?: "default" | "transparent" }) {
  const [open, setOpen] = useState(false);
  const transparent = variant === "transparent";

  return (
    <header className={`sticky top-0 z-50 border-b transition-all ${transparent ? "border-transparent bg-transparent" : "border-warm-border bg-white/95 backdrop-blur-sm"}`}>
      <div className="container flex min-h-16 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${transparent ? "bg-white/15" : "bg-navy-600"}`}>
            <FileText size={18} className={transparent ? "text-white" : "text-gold-400"} />
          </div>
          <span className={`text-lg font-bold tracking-tight ${transparent ? "text-white" : "text-navy-600"}`} style={{ fontFamily: "var(--font-serif)" }}>
            Immigration Mail
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {[
            { label: "How it works", href: "/#how" },
            { label: "What you can send", href: "/#workflows" },
            { label: "Pricing", href: "/pricing" },
            { label: "Resources", href: "/resources" },
            { label: "FAQ", href: "/faq" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors ${transparent ? "text-white/80 hover:text-white" : "text-navy-500 hover:text-navy-600"}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/dashboard" className={`text-sm font-semibold ${transparent ? "text-white/90 hover:text-white" : "text-navy-500 hover:text-navy-600"}`}>
            My Mailings
          </Link>
          <Link to="/workflows/respond-to-notice" className="btn-gold">
            Start
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} className={transparent ? "text-white" : "text-navy-600"} /> : <Menu size={22} className={transparent ? "text-white" : "text-navy-600"} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-warm-border bg-white md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {[
              { label: "How it works", href: "/#how" },
              { label: "What you can send", href: "/#workflows" },
              { label: "Pricing", href: "/pricing" },
              { label: "Resources", href: "/resources" },
              { label: "FAQ", href: "/faq" },
              { label: "My Mailings", href: "/dashboard" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-500 hover:bg-navy-50" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <Link to="/workflows/respond-to-notice" className="btn-gold mt-2 justify-center" onClick={() => setOpen(false)}>
              Start
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
