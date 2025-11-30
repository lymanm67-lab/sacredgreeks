import { Link } from "react-router-dom";
import logo from "@/assets/sacred-greeks-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/user-guide" className="text-muted-foreground hover:text-sacred transition-colors font-medium">
              📖 User Guide
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-sacred transition-colors">
              FAQ
            </Link>
            <a
              href="https://www.sacredgreeks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              SacredGreeks.com
            </a>
            <Link to="/qr-code" className="text-muted-foreground hover:text-sacred transition-colors">
              Get QR Code
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-sacred transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-sacred transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://chatgpt.com/g/g-683eb25d5914819097a1c08dae64f36f-sacred-greeks-life-assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              ChatGPT Assistant
            </a>
            <a
              href="https://sacredgreeks.com/#card-xr13vgv4m5slqey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              Start Here
            </a>
            <a
              href="https://a.co/d/5a6Yt9t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              Sacred, Not Sinful Book
            </a>
            <a
              href="https://sacredgreeks.jellypod.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              Podcast
            </a>
            <a
              href="https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sacred transition-colors"
            >
              Study Guide
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Trademark and Proprietary Technology Notice */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <img src={logo} alt="Sacred Greeks" className="h-6 w-auto opacity-60" loading="lazy" />
              <span className="text-sm font-semibold text-muted-foreground">Sacred Greeks™</span>
            </div>
            
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
            </p>
            
            <div className="text-xs text-muted-foreground/70 max-w-3xl mx-auto space-y-2">
              <p>
                <strong>Sacred Greeks™</strong>, <strong>Sacred Greeks Life™</strong>, <strong>P.R.O.O.F. Framework™</strong>, 
                <strong> Sacred, Not Sinful™</strong>, and <strong>5 Persona Types Architecture™</strong> are trademarks of Dr. Lyman Montgomery.
              </p>
              <p>
                This application contains proprietary technology, methodologies, and intellectual property protected under U.S. and international copyright and trademark laws. 
                The P.R.O.O.F. Framework™, assessment algorithms, and all related content are the exclusive property of Dr. Lyman Montgomery and Sacred Greeks.
              </p>
              <p>
                Unauthorized reproduction, distribution, modification, or use of any content, trademarks, or proprietary technology 
                from this application is strictly prohibited without express written consent.
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/60">
            <Link to="/legal" className="hover:text-sacred transition-colors">Legal Center</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-sacred transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-sacred transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/ip-documentation" className="hover:text-sacred transition-colors">IP Documentation</Link>
            <span>•</span>
            <span>Patent Pending</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
