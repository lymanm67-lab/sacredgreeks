import { Link } from "react-router-dom";
import logo from "@/assets/sacred-greeks-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Sacred Greeks" className="h-5 w-auto opacity-60" loading="lazy" />
              <span className="text-sm font-semibold text-muted-foreground">Sacred Greeks™</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link to="/user-guide" className="hover:text-sacred transition-colors">User Guide</Link>
            <Link to="/faq" className="hover:text-sacred transition-colors">FAQ</Link>
            <a href="https://www.sacredgreeks.com" target="_blank" rel="noopener noreferrer" className="hover:text-sacred transition-colors">
              Website
            </a>
            <Link to="/privacy" className="hover:text-sacred transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-sacred transition-colors">Terms</Link>
            <Link to="/legal" className="hover:text-sacred transition-colors">Legal</Link>
          </div>

          {/* Trademark Notice */}
          <p className="text-[10px] text-muted-foreground/60 text-center max-w-2xl mx-auto">
            Sacred Greeks™, P.R.O.O.F. Framework™, and 5 Persona Types Architecture™ are trademarks of Dr. Lyman Montgomery.
          </p>
        </div>
      </div>
    </footer>
  );
}
