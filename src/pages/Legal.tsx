import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Scale, 
  Shield, 
  FileText, 
  Copyright, 
  AlertTriangle,
  ExternalLink,
  BookOpen
} from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-sacred transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-semibold">Sacred Greeks Life™</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-sacred/10">
              <Scale className="w-8 h-8 text-sacred" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Legal Center</h1>
              <p className="text-muted-foreground">Important legal information and resources</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Quick Links */}
          <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sacred" />
                Legal Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/terms" className="group">
                  <div className="p-4 rounded-lg border border-border bg-background hover:border-sacred/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-sacred transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-sacred transition-colors">Terms of Service</p>
                        <p className="text-sm text-muted-foreground">Usage terms and conditions</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/privacy" className="group">
                  <div className="p-4 rounded-lg border border-border bg-background hover:border-sacred/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-muted-foreground group-hover:text-sacred transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-sacred transition-colors">Privacy Policy</p>
                        <p className="text-sm text-muted-foreground">How we handle your data</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/ip-documentation" className="group">
                  <div className="p-4 rounded-lg border border-border bg-background hover:border-sacred/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Copyright className="w-5 h-5 text-muted-foreground group-hover:text-sacred transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-sacred transition-colors">IP Documentation</p>
                        <p className="text-sm text-muted-foreground">Trademarks and patents</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/trademark-tracking" className="group">
                  <div className="p-4 rounded-lg border border-border bg-background hover:border-sacred/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Scale className="w-5 h-5 text-muted-foreground group-hover:text-sacred transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-sacred transition-colors">Trademark Status</p>
                        <p className="text-sm text-muted-foreground">Registration tracking</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Copyright Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copyright className="w-5 h-5" />
                Copyright Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
              </p>
              <p className="text-muted-foreground">
                All content, features, functionality, and design of the Sacred Greeks Life™ application are owned by 
                Dr. Lyman Montgomery and Sacred Greeks and are protected by United States and international copyright, 
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </CardContent>
          </Card>

          {/* Trademarks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline" className="text-sacred border-sacred/30">™</Badge>
                Registered Trademarks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-4">
                The following are trademarks of Dr. Lyman Montgomery:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Sacred Greeks™",
                  "Sacred Greeks Life™",
                  "P.R.O.O.F. Framework™",
                  "Sacred, Not Sinful™",
                  "5 Persona Types Architecture™",
                  "Shattered Masks™"
                ].map((trademark) => (
                  <div key={trademark} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <Badge variant="secondary" className="text-xs">TM</Badge>
                    <span className="font-medium">{trademark}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                These marks may not be used in connection with any product or service without the prior written consent 
                of Dr. Lyman Montgomery.
              </p>
            </CardContent>
          </Card>

          {/* Patent Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Patent Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sacred Greeks Life™ contains proprietary technology and methodologies that are the subject of 
                pending patent applications. The following technologies are protected:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>P.R.O.O.F. Framework™ assessment methodology and scoring algorithms</li>
                <li>5 Persona Types Architecture™ personality assessment system</li>
                <li>Shattered Masks™ archetype determination algorithms</li>
                <li>AI-powered spiritual guidance response systems</li>
                <li>Organization-specific content personalization technology</li>
              </ul>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                Patent Pending - U.S. Patent Application Filed
              </Badge>
            </CardContent>
          </Card>

          {/* DMCA */}
          <Card>
            <CardHeader>
              <CardTitle>DMCA Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you believe that content available on or through our application infringes your copyright, 
                please send a notice containing the following information to our designated agent:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the allegedly infringing material</li>
                <li>Your contact information</li>
                <li>A statement of good faith belief</li>
                <li>A statement of accuracy under penalty of perjury</li>
                <li>Your physical or electronic signature</li>
              </ul>
              <p className="text-muted-foreground">
                Contact: <a href="https://sacredgreekslife.com" className="text-sacred hover:underline">sacredgreekslife.com</a>
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The information provided through Sacred Greeks Life™ is for educational and spiritual guidance purposes only. 
                It is not intended to be a substitute for professional legal, medical, psychological, or pastoral advice. 
                Always seek the advice of qualified professionals with any questions you may have.
              </p>
              <p className="text-muted-foreground">
                Sacred Greeks Life™ is not affiliated with, endorsed by, or sponsored by any Greek letter organization, 
                national pan-Hellenic council, or their member organizations unless explicitly stated.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Footer Notice */}
        <div className="text-center pt-6 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Sacred Greeks™, P.R.O.O.F. Framework™, and related marks are trademarks of Dr. Lyman Montgomery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;