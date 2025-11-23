import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Scale } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Focused Driven Decision Lab</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Expert Guidance for Your Next Move
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Answer a few questions and get expert-level guidance for your next move, whether you lead a DODD agency or you are a Christian in Greek Life.
          </p>
        </div>
      </section>

      {/* Assessment Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* FDCA Compliance Card */}
          <Card className="border-compliance/20 hover:border-compliance/40 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-compliance/10 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-compliance" />
              </div>
              <CardTitle className="text-2xl">FDCA Compliance Idea Checker</CardTitle>
              <CardDescription className="text-base">
                For DODD agency leaders, Directors of Operations, and compliance professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Quickly see if your proposed change is compliant, realistic, and worth pursuing. Get clear guidance on compliance risk, operational capacity, and leadership impact.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-compliance flex-shrink-0 mt-0.5" />
                  <span>Assess compliance risk before launching</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-compliance flex-shrink-0 mt-0.5" />
                  <span>Evaluate staffing and operational capacity</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-compliance flex-shrink-0 mt-0.5" />
                  <span>Get actionable recommendations</span>
                </li>
              </ul>
              <Link to="/compliance" className="block">
                <Button className="w-full bg-compliance hover:bg-compliance/90 text-compliance-foreground">
                  Start Compliance Checker
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sacred Greeks Card */}
          <Card className="border-sacred/20 hover:border-sacred/40 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-sacred/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-sacred" />
              </div>
              <CardTitle className="text-2xl">Sacred Greeks Decision Guide</CardTitle>
              <CardDescription className="text-base">
                For Christians in Black Greek Letter Organizations, pastors, and family members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You love Jesus. You love your letters. You can seek clarity without pressure. Process intense questions using the P.R.O.O.F. framework from "Sacred, Not Sinful."
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <span>Navigate pressure with biblical clarity</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <span>Plan faith-based events with confidence</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <span>Process emotions in a safe space</span>
                </li>
              </ul>
              <Link to="/sacred-greeks" className="block">
                <Button className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                  Start Sacred Greeks Guide
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Focused Driven Decision Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
