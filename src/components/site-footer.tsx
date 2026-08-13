import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-warm-border bg-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600">
                <FileText size={16} className="text-gold-400" />
              </div>
              <span className="text-base font-bold text-navy-600" style={{ fontFamily: "var(--font-serif)" }}>Immigration Mail</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-navy-400">Prepare and send important immigration correspondence with confidence.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-600">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-400">
              <li><a href="/#how" className="hover:text-gold-500">How it works</a></li>
              <li><a href="/#workflows" className="hover:text-gold-500">What you can send</a></li>
              <li><Link to="/pricing" className="hover:text-gold-500">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-gold-500">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-600">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-400">
              <li><Link to="/privacy" className="hover:text-gold-500">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-500">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-gold-500">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-600">Important</h3>
            <p className="mt-3 text-xs leading-5 text-navy-400">
              Immigration Mail is not a law firm or government agency and does not provide legal advice.
              You remain in control of the facts and final document.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-warm-border pt-6 text-xs text-navy-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Immigration Mail. Powered by MailMyPDF.</span>
          <span>Information is educational and product-related, not legal advice.</span>
        </div>
      </div>
    </footer>
  );
}
