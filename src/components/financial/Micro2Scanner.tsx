import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { 
  CreditCard, 
  Building2, 
  TrendingUp, 
  Rocket, 
  CheckCircle2, 
  Circle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Know Your Credit", description: "Understand your personal credit foundation" },
  { label: "Build Business Credit", description: "Establish your business credit profile" },
  { label: "Master Cash Flow", description: "Control your money in and out" },
  { label: "Grow & Get Funded", description: "Access capital for growth" },
];

interface ChecklistItem {
  id: string;
  label: string;
  tip: string;
}

const STEP_DATA: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  scripture: { ref: string; text: string };
  checklist: ChecklistItem[];
  resources: { label: string; url: string }[];
}[] = [
  {
    icon: CreditCard,
    title: "Know Your Credit",
    subtitle: "Your personal credit is the gateway to every funding opportunity.",
    scripture: {
      ref: "Proverbs 22:1",
      text: "A good name is more desirable than great riches; to be esteemed is better than silver or gold.",
    },
    checklist: [
      { id: "1a", label: "Pull your free credit reports (all 3 bureaus)", tip: "Use AnnualCreditReport.com — it's the only federally authorized source." },
      { id: "1b", label: "Identify and dispute any errors", tip: "Errors on 1 in 5 reports — dispute under FCRA Section 611." },
      { id: "1c", label: "Understand your FICO score breakdown", tip: "Payment history (35%), utilization (30%), length (15%), mix (10%), inquiries (10%)." },
      { id: "1d", label: "Set up credit monitoring", tip: "Free options: Credit Karma, Experian app, or your bank's tool." },
      { id: "1e", label: "Get utilization below 30%", tip: "Pay balances before statement closes, or request credit limit increases." },
    ],
    resources: [
      { label: "AnnualCreditReport.com", url: "https://www.annualcreditreport.com" },
      { label: "CFPB Credit Guide", url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" },
    ],
  },
  {
    icon: Building2,
    title: "Build Business Credit",
    subtitle: "Separate your personal and business finances to unlock larger funding.",
    scripture: {
      ref: "Luke 16:10",
      text: "Whoever can be trusted with very little can also be trusted with much.",
    },
    checklist: [
      { id: "2a", label: "Register your business (LLC or Corp)", tip: "An EIN from the IRS is free — apply at irs.gov." },
      { id: "2b", label: "Get a DUNS number from Dun & Bradstreet", tip: "Free registration at dnb.com — takes about 30 days to activate." },
      { id: "2c", label: "Open a business bank account", tip: "Keep personal and business finances completely separate." },
      { id: "2d", label: "Apply for net-30 vendor accounts", tip: "Start with Uline, Quill, or Grainger — they report to business bureaus." },
      { id: "2e", label: "Monitor your Paydex score", tip: "Pay early (not just on time) to build a Paydex score of 80+." },
    ],
    resources: [
      { label: "IRS EIN Application", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" },
      { label: "D&B Registration", url: "https://www.dnb.com/duns-number/get-a-duns.html" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Master Cash Flow",
    subtitle: "Cash flow is the lifeblood of any ministry or micro-business.",
    scripture: {
      ref: "Ecclesiastes 11:2",
      text: "Invest in seven ventures, yes, in eight; you do not know what disaster may come upon the land.",
    },
    checklist: [
      { id: "3a", label: "Track all income and expenses for 30 days", tip: "Use a simple spreadsheet or free tool like Wave Accounting." },
      { id: "3b", label: "Calculate your monthly burn rate", tip: "Total fixed costs + average variable costs = your minimum needed." },
      { id: "3c", label: "Build a 3-month operating reserve", tip: "Start with 1 month, then grow — treat it like a tithe to your future." },
      { id: "3d", label: "Separate revenue streams", tip: "Know which products/services are profitable vs. draining resources." },
      { id: "3e", label: "Create a 90-day cash flow forecast", tip: "Project income and expenses weekly to anticipate shortfalls." },
    ],
    resources: [
      { label: "Wave Free Accounting", url: "https://www.waveapps.com" },
      { label: "SBA Cash Flow Guide", url: "https://www.sba.gov/business-guide/manage-your-business/manage-your-finances" },
    ],
  },
  {
    icon: Rocket,
    title: "Grow & Get Funded",
    subtitle: "With credit and cash flow in order, you're ready to access real capital.",
    scripture: {
      ref: "Deuteronomy 8:18",
      text: "Remember the LORD your God, for it is He who gives you the ability to produce wealth.",
    },
    checklist: [
      { id: "4a", label: "Identify your funding need and amount", tip: "Be specific: equipment, inventory, hiring, marketing — lenders want clarity." },
      { id: "4b", label: "Explore SBA microloans (up to $50K)", tip: "SBA microloans have lower rates and are designed for underserved communities." },
      { id: "4c", label: "Research CDFI lenders in your area", tip: "Community Development Financial Institutions serve faith-based and minority businesses." },
      { id: "4d", label: "Prepare a 1-page business plan", tip: "Problem, solution, market, revenue model, funding ask — keep it concise." },
      { id: "4e", label: "Apply for grants (no repayment required)", tip: "Check Grants.gov, local SCORE chapter, and denomination-specific programs." },
    ],
    resources: [
      { label: "SBA Microloan Program", url: "https://www.sba.gov/funding-programs/loans/microloans" },
      { label: "Find a CDFI", url: "https://ofn.org/cdfi-locator" },
      { label: "SCORE Mentorship", url: "https://www.score.org" },
    ],
  },
];

const stepColors = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-green-500",
  "from-amber-500 to-orange-500",
];

export function Micro2Scanner() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const stepIndex = currentStep - 1;
  const data = STEP_DATA[stepIndex];
  const StepIcon = data.icon;

  const stepChecked = data.checklist.filter((c) => completed[c.id]).length;
  const stepTotal = data.checklist.length;
  const stepPercent = Math.round((stepChecked / stepTotal) * 100);

  const totalChecked = STEP_DATA.flatMap((s) => s.checklist).filter((c) => completed[c.id]).length;
  const totalItems = STEP_DATA.flatMap((s) => s.checklist).length;
  const overallPercent = Math.round((totalChecked / totalItems) * 100);

  const toggleItem = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-amber-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-6 h-6 text-blue-400" />
                Micro2 Scanner
              </CardTitle>
              <CardDescription className="mt-1">
                Your 4-step roadmap from credit awareness to funded growth
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold">{overallPercent}%</p>
              <Progress value={overallPercent} className="w-32 h-2 mt-1" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stepper */}
      <ProgressStepper steps={STEPS} currentStep={currentStep} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <Card className={cn("border-t-4", {
            "border-t-blue-500": stepIndex === 0,
            "border-t-violet-500": stepIndex === 1,
            "border-t-emerald-500": stepIndex === 2,
            "border-t-amber-500": stepIndex === 3,
          })}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white", stepColors[stepIndex])}>
                  <StepIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{data.title}</CardTitle>
                  <CardDescription className="mt-1">{data.subtitle}</CardDescription>
                  <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm italic">"{data.scripture.text}"</p>
                    <p className="text-xs text-muted-foreground mt-1">— {data.scripture.ref}</p>
                  </div>
                </div>
              </div>

              {/* Step progress */}
              <div className="flex items-center gap-3 mt-4">
                <Progress value={stepPercent} className="flex-1 h-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  {stepChecked}/{stepTotal}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {data.checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all duration-200 group",
                    completed[item.id]
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card border-border hover:border-primary/30 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {completed[item.id] ? (
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-primary/50" />
                    )}
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        completed[item.id] && "line-through text-muted-foreground"
                      )}>
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1.5">
                        <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0 text-amber-400" />
                        {item.tip}
                      </p>
                    </div>
                  </div>
                </button>
              ))}

              {/* Resources */}
              {data.resources.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Helpful Resources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.resources.map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                          {r.label} ↗
                        </Badge>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        {currentStep < 4 ? (
          <Button onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}>
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            disabled={overallPercent < 100}
            className={overallPercent === 100 ? "bg-gradient-to-r from-amber-500 to-orange-500" : ""}
          >
            {overallPercent === 100 ? "🎉 Scanner Complete!" : `${overallPercent}% Complete`}
          </Button>
        )}
      </div>
    </div>
  );
}
