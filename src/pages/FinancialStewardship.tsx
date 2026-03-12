import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { 
  DollarSign, 
  BookOpen, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Users, 
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Heart,
  Home,
  GraduationCap,
  Landmark,
  Sparkles,
  Car,
  Plane,
  Gem
} from "lucide-react";
import { FinancialScenarios } from "@/components/financial/FinancialScenarios";
import { FinancialTools } from "@/components/financial/FinancialTools";
import { FinancialExamples } from "@/components/financial/FinancialExamples";
import { StudentFinancialGuide } from "@/components/financial/StudentFinancialGuide";
import { SISPCalculator } from "@/components/financial/SISPCalculator";
import { FinancialOverviewTTS } from "@/components/financial/FinancialOverviewTTS";
import { BuildingWealthSection } from "@/components/financial/BuildingWealthSection";
import { DebtStrategiesCalculator } from "@/components/financial/DebtStrategiesCalculator";
import { PrismBudgetPromo } from "@/components/financial/PrismBudgetPromo";
import { SacredCapital } from "@/components/financial/SacredCapital";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const JOURNEY_STEPS = [
  { label: "Foundation", description: "Biblical money principles" },
  { label: "Budget", description: "Know your numbers" },
  { label: "Credit", description: "Protect & build credit" },
  { label: "Debt Free", description: "Eliminate what holds you back" },
  { label: "Build Wealth", description: "Grow for generations" },
  { label: "Chapter Finance", description: "Treasurer & expense tools" },
  { label: "Tools", description: "Resources & calculators" },
];

interface BudgetResults {
  tithe: number;
  needs: number;
  wants: number;
  funMoney: number;
  savings: number;
  investing: number;
  futureGoals: number;
  total: number;
}

const scriptures = [
  { reference: "Proverbs 22:7", text: "The rich rule over the poor, and the borrower is slave to the lender.", application: "Debt creates bondage. God desires freedom for His children." },
  { reference: "Malachi 3:10", text: "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven.", application: "Tithing demonstrates trust in God's provision." },
  { reference: "Luke 14:28", text: "Suppose one of you wants to build a tower. Won't you first sit down and estimate the cost?", application: "Jesus endorses budgeting and financial planning." },
  { reference: "Proverbs 13:22", text: "A good person leaves an inheritance for their children's children.", application: "Generational wealth is biblical stewardship." },
];

const greekCosts = [
  { item: "Membership Dues", typical: "$200-$500/semester", tip: "Budget monthly, not when due" },
  { item: "National Convention", typical: "$500-$2,000", tip: "Start saving 12 months ahead" },
  { item: "Chapter Events", typical: "$50-$200/event", tip: "Set a quarterly events budget" },
  { item: "Paraphernalia", typical: "$100-$500+", tip: "Prioritize needs over wants" },
  { item: "Regional Conferences", typical: "$200-$800", tip: "Carpool and share rooms" },
];

const budgetPercentages = {
  tithe: 10, needs: 45, wants: 15, funMoney: 5, savings: 10, investing: 10, futureGoals: 5,
};

const FinancialStewardship = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [income, setIncome] = useState<string>("");
  const [budgetResults, setBudgetResults] = useState<BudgetResults | null>(null);

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) return;
    const calc = (pct: number) => monthlyIncome * (pct / 100);
    const results = {
      tithe: calc(budgetPercentages.tithe),
      needs: calc(budgetPercentages.needs),
      wants: calc(budgetPercentages.wants),
      funMoney: calc(budgetPercentages.funMoney),
      savings: calc(budgetPercentages.savings),
      investing: calc(budgetPercentages.investing),
      futureGoals: calc(budgetPercentages.futureGoals),
      total: monthlyIncome,
    };
    setBudgetResults(results);
  };

  const goNext = () => setCurrentStep(s => Math.min(6, s + 1));
  const goPrev = () => setCurrentStep(s => Math.max(1, s - 1));

  const setActiveTab = (tab: string) => {
    // Map old tab names to journey steps for SacredCapital's onNavigateTab
    const tabMap: Record<string, number> = {
      foundation: 1, budget: 2, smsp: 2, greek: 2,
      credit: 3, capital: 3,
      debt: 4, students: 4,
      wealth: 5, scenarios: 5, examples: 5,
      tools: 6,
    };
    if (tabMap[tab]) setCurrentStep(tabMap[tab]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl pb-28">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Financial Stewardship</h1>
              <p className="text-sm text-muted-foreground">A guided journey to financial freedom</p>
            </div>
          </div>

          <FinancialOverviewTTS />
        </div>

        {/* Journey Stepper */}
        <div className="mb-8">
          <ProgressStepper steps={JOURNEY_STEPS} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* ══════════ STEP 1: Foundation ══════════ */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
                  <CardContent className="pt-6">
                    <p className="text-lg italic">"For which of you, intending to build a tower, does not sit down first and count the cost?"</p>
                    <p className="text-sm text-muted-foreground mt-2">— Luke 14:28 (NKJV)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-sacred" />
                      God's Word on Money
                    </CardTitle>
                    <CardDescription>Scripture provides timeless principles for financial stewardship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {scriptures.map((s, i) => (
                        <Card key={i} className="border-l-4 border-l-sacred">
                          <CardContent className="pt-4">
                            <Badge variant="outline" className="mb-2">{s.reference}</Badge>
                            <p className="italic text-sm mb-2">"{s.text}"</p>
                            <p className="text-xs text-muted-foreground flex items-start gap-2">
                              <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                              {s.application}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>The Stewardship Mindset</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { icon: Heart, color: "text-rose-500", title: "Owner vs. Manager", desc: "God owns it all. We are stewards (Psalm 24:1)" },
                        { icon: CheckCircle2, color: "text-emerald-500", title: "Faithful in Little", desc: "Manage small amounts well before expecting increase (Luke 16:10)" },
                        { icon: Landmark, color: "text-amber-500", title: "Eternal Perspective", desc: "Store treasures in heaven through generous giving (Matthew 6:19-21)" },
                      ].map((m, i) => (
                        <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                          <m.icon className={cn("w-8 h-8 mx-auto mb-2", m.color)} />
                          <h4 className="font-semibold">{m.title}</h4>
                          <p className="text-sm text-muted-foreground">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ══════════ STEP 2: Budget — Know Your Numbers ══════════ */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <SISPCalculator />

                {/* Quick Kingdom Budget */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-500" />
                        Kingdom Budget Calculator
                      </CardTitle>
                      <CardDescription>Zero-based: every dollar has a job</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Monthly Take-Home Income ($)</Label>
                        <Input type="number" placeholder="4000" value={income} onChange={e => setIncome(e.target.value)} />
                      </div>
                      <Button onClick={calculateBudget} className="w-full">Calculate My Budget</Button>
                      {budgetResults && (
                        <div className="space-y-3 pt-4 border-t">
                          {[
                            { label: "Tithe/Charity", pct: 10, value: budgetResults.tithe, icon: Heart, color: "text-sacred" },
                            { label: "Needs", pct: 45, value: budgetResults.needs, icon: Home, color: "text-blue-500" },
                            { label: "Wants", pct: 15, value: budgetResults.wants, icon: Users, color: "text-purple-500" },
                            { label: "Fun Money", pct: 5, value: budgetResults.funMoney, icon: Sparkles, color: "text-amber-500" },
                            { label: "Emergency Savings", pct: 10, value: budgetResults.savings, icon: PiggyBank, color: "text-emerald-500" },
                            { label: "Investing", pct: 10, value: budgetResults.investing, icon: TrendingUp, color: "text-cyan-500" },
                            { label: "Future Goals", pct: 5, value: budgetResults.futureGoals, icon: Target, color: "text-rose-500" },
                          ].map(item => (
                            <div key={item.label} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-2">
                                  <item.icon className={cn("w-4 h-4", item.color)} />
                                  {item.label} ({item.pct}%)
                                </span>
                                <span className="font-bold">${item.value.toFixed(2)}</span>
                              </div>
                              <Progress value={item.pct} className="h-2" />
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Greek Costs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" />
                        Real Costs of Greek Life
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {greekCosts.map((cost, i) => (
                          <div key={i} className="flex items-start justify-between p-3 rounded-lg border border-border">
                            <div>
                              <p className="font-medium text-sm">{cost.item}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{cost.tip}</p>
                            </div>
                            <Badge variant="outline" className="shrink-0 ml-2">{cost.typical}</Badge>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <p className="text-xs text-muted-foreground">
                          <AlertTriangle className="w-3 h-3 inline mr-1 text-amber-500" />
                          <strong>Warning:</strong> Using credit cards for dues or skipping meals for paraphernalia are signs of financial strain.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <PrismBudgetPromo variant="budget" />
              </div>
            )}

            {/* ══════════ STEP 3: Credit — Protect & Build ══════════ */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <SacredCapital onNavigateTab={setActiveTab} />
              </div>
            )}

            {/* ══════════ STEP 4: Debt Freedom ══════════ */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      The Debt Crisis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { stat: "$46,000+", label: "Average Black household debt", color: "bg-destructive/10 border-destructive/20 text-destructive" },
                        { stat: "$5,700+", label: "Average credit card debt", color: "bg-amber-500/10 border-amber-500/20 text-amber-600" },
                        { stat: "$25,000+", label: "Student loan debt (grads)", color: "bg-blue-500/10 border-blue-500/20 text-blue-600" },
                      ].map((d, i) => (
                        <div key={i} className={cn("text-center p-4 rounded-lg border", d.color)}>
                          <p className="text-2xl font-bold">{d.stat}</p>
                          <p className="text-sm text-muted-foreground">{d.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                      <strong>Biblical truth:</strong> "The borrower is slave to the lender" (Proverbs 22:7). 
                      Debt limits your ability to serve God freely and build generational wealth.
                    </p>
                  </CardContent>
                </Card>

                <DebtStrategiesCalculator />
                <StudentFinancialGuide />
                <PrismBudgetPromo variant="debt" />
              </div>
            )}

            {/* ══════════ STEP 5: Build Wealth ══════════ */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <BuildingWealthSection />
                <FinancialScenarios />
                <FinancialExamples />
                <PrismBudgetPromo variant="wealth" />
              </div>
            )}

            {/* ══════════ STEP 6: Chapter Finance ══════════ */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-500/20">
                  <CardContent className="pt-6 text-center">
                    <Landmark className="w-10 h-10 mx-auto mb-3 text-teal-500" />
                    <h3 className="text-lg font-bold mb-1">Chapter Finance Hub</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                      Treasurer tools for tracking expenses, managing budgets, and handling reimbursements for your chapter.
                    </p>
                    <Link to="/chapter-finance">
                      <Button>
                        Open Chapter Finance
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ══════════ STEP 7: Tools & Resources ══════════ */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-emerald-500/10 to-primary/10 border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
                    <h3 className="text-lg font-bold mb-1">You've Reached the Summit!</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      You've walked through the full stewardship journey. Use these tools anytime to stay on track.
                    </p>
                  </CardContent>
                </Card>
                <FinancialTools />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <Button variant="outline" onClick={goPrev} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground hidden sm:block">
            Step {currentStep} of {JOURNEY_STEPS.length}: <strong>{JOURNEY_STEPS[currentStep - 1].label}</strong>
          </span>
          {currentStep < 6 ? (
            <Button onClick={goNext}>
              Next: {JOURNEY_STEPS[currentStep].label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link to="/dashboard">
              <Button variant="outline">
                Back to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialStewardship;
