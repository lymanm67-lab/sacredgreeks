import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/sacred-greeks-logo.png";
import { useExternalLinks } from "@/hooks/use-external-links";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/sacredgreeks",
    hoverColor: "hover:text-pink-500"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/sacredgreeks",
    hoverColor: "hover:text-sky-500"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/sacredgreeks",
    hoverColor: "hover:text-blue-600"
  }
];

export function Footer() {
  const { openExternalLink } = useExternalLinks();

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
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => openExternalLink(social.url)}
                    aria-label={`Follow us on ${social.name}`}
                    className={`text-muted-foreground transition-colors cursor-pointer ${social.hoverColor}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link to="/user-guide" className="hover:text-sacred transition-colors">User Guide</Link>
            <Link to="/faq" className="hover:text-sacred transition-colors">FAQ</Link>
            <button 
              onClick={() => openExternalLink("https://www.sacredgreeks.com")} 
              className="hover:text-sacred transition-colors cursor-pointer"
            >
              Website
            </button>
            <Link to="/privacy" className="hover:text-sacred transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-sacred transition-colors">Terms</Link>
            <Link to="/legal" className="hover:text-sacred transition-colors">Legal</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>

          {/* Trademark Notice */}
          <p className="text-[10px] text-muted-foreground/60 text-center max-w-2xl mx-auto">
            Sacred Greeks™, P.R.O.O.F. Framework™, and 5 Persona Types Architecture™ are trademarks of Dr. Lyman Montgomery.
          </p>
        </div>
      </div>
    </footer>
  );
}
