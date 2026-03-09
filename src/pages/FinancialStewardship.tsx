import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Heart,
  Home,
  GraduationCap,
  Landmark,
  Lightbulb,
  Wrench,
  FileText,
  Shield,
  ClipboardList,
  Sparkles,
  Car,
  Plane,
  Gem
} from "lucide-react";
import { FinancialScenarios } from "@/components/financial/FinancialScenarios";
import { FinancialTools } from "@/components/financial/FinancialTools";
import { FinancialExamples } from "@/components/financial/FinancialExamples";
import { CreditRepairHub } from "@/components/financial/CreditRepairHub";
import { StudentFinancialGuide } from "@/components/financial/StudentFinancialGuide";
import { SISPCalculator } from "@/components/financial/SISPCalculator";
import { FinancialOverviewTTS } from "@/components/financial/FinancialOverviewTTS";
import { BuildingWealthSection } from "@/components/financial/BuildingWealthSection";
import { DebtStrategiesCalculator } from "@/components/financial/DebtStrategiesCalculator";
import { PrismBudgetPromo } from "@/components/financial/PrismBudgetPromo";
import { Link } from "react-router-dom";

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

const FinancialStewardship = () => {
  const [income, setIncome] = useState<string>("");
  const [budgetResults, setBudgetResults] = useState<BudgetResults | null>(null);

  // Zero-based budget percentages (must equal 100%)
  const budgetPercentages = {
    tithe: 10,        // First fruits - non-negotiable
    needs: 45,        // Housing, utilities, food, transportation, insurance
    wants: 15,        // Entertainment, dining, Greek activities
    funMoney: 5,      // Guilt-free spending
    savings: 10,      // Emergency fund
    investing: 10,    // Retirement, stocks, index funds
    futureGoals: 5,   // House, car, vacation, wedding
  };

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) return;
    
    // Zero-based budget: Every dollar has a job
    const tithe = monthlyIncome * (budgetPercentages.tithe / 100);
    const needs = monthlyIncome * (budgetPercentages.needs / 100);
    const wants = monthlyIncome * (budgetPercentages.wants / 100);
    const funMoney = monthlyIncome * (budgetPercentages.funMoney / 100);
    const savings = monthlyIncome * (budgetPercentages.savings / 100);
    const investing = monthlyIncome * (budgetPercentages.investing / 100);
    const futureGoals = monthlyIncome * (budgetPercentages.futureGoals / 100);
    
    const total = tithe + needs + wants + funMoney + savings + investing + futureGoals;
    
    setBudgetResults({ tithe, needs, wants, funMoney, savings, investing, futureGoals, total });
  };

  const scriptures = [
    {
      reference: "Proverbs 22:7",
      text: "The rich rule over the poor, and the borrower is slave to the lender.",
      application: "Debt creates bondage. God desires freedom for His children."
    },
    {
      reference: "Malachi 3:10",
      text: "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven.",
      application: "Tithing demonstrates trust in God's provision and opens doors to blessing."
    },
    {
      reference: "Proverbs 21:20",
      text: "The wise store up choice food and olive oil, but fools gulp theirs down.",
      application: "Saving and planning are marks of wisdom, not lack of faith."
    },
    {
      reference: "Luke 14:28",
      text: "Suppose one of you wants to build a tower. Won't you first sit down and estimate the cost?",
      application: "Jesus endorses budgeting and financial planning."
    },
    {
      reference: "Romans 13:8",
      text: "Let no debt remain outstanding, except the continuing debt to love one another.",
      application: "Pay what you owe—financial integrity honors God."
    },
    {
      reference: "Proverbs 13:22",
      text: "A good person leaves an inheritance for their children's children.",
      application: "Generational wealth is biblical stewardship."
    }
  ];

  const greekCosts = [
    { item: "Membership Dues", typical: "$200-$500/semester", tip: "Budget monthly, not when due" },
    { item: "National Convention", typical: "$500-$2,000", tip: "Start saving 12 months ahead" },
    { item: "Chapter Events/Programs", typical: "$50-$200/event", tip: "Set a quarterly events budget" },
    { item: "Paraphernalia", typical: "$100-$500+", tip: "Prioritize needs over wants" },
    { item: "Donations/Giving", typical: "Varies", tip: "Give purposefully, not impulsively" },
    { item: "Regional Conferences", typical: "$200-$800", tip: "Carpool and share rooms" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Financial Stewardship</h1>
              <p className="text-muted-foreground">Biblical wisdom for financial freedom</p>
            </div>
          </div>
          
          <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
            <CardContent className="pt-6">
              <p className="text-lg italic">
                "For which of you, intending to build a tower, does not sit down first and count the cost?"
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Luke 14:28 (NKJV)</p>
            </CardContent>
          </Card>

          {/* TTS Overview */}
          <FinancialOverviewTTS />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="foundation" className="space-y-6">
          <TabsList className="flex flex-wrap justify-start gap-2 h-auto bg-transparent">
            <TabsTrigger value="foundation" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Biblical</span> Foundation
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" />
              Credit Repair
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GraduationCap className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="smsp" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ClipboardList className="w-4 h-4" />
              SMSP Budget
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lightbulb className="w-4 h-4" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Wrench className="w-4 h-4" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="debt" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" />
              Debt Freedom
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PiggyBank className="w-4 h-4" />
              Budgeting
            </TabsTrigger>
            <TabsTrigger value="greek" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
              Greek Costs
            </TabsTrigger>
            <TabsTrigger value="wealth" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="w-4 h-4" />
              Wealth Building
            </TabsTrigger>
          </TabsList>

          {/* Biblical Foundation Tab */}
          <TabsContent value="foundation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sacred" />
                  God's Word on Money
                </CardTitle>
                <CardDescription>
                  Scripture provides timeless principles for financial stewardship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {scriptures.map((scripture, index) => (
                    <Card key={index} className="border-l-4 border-l-sacred">
                      <CardContent className="pt-4">
                        <Badge variant="outline" className="mb-2">{scripture.reference}</Badge>
                        <p className="italic text-sm mb-3">"{scripture.text}"</p>
                        <p className="text-xs text-muted-foreground flex items-start gap-2">
                          <Target className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                          {scripture.application}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Stewardship Mindset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                    <h4 className="font-semibold">Owner vs. Manager</h4>
                    <p className="text-sm text-muted-foreground">God owns it all. We are stewards managing His resources (Psalm 24:1)</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                    <h4 className="font-semibold">Faithful in Little</h4>
                    <p className="text-sm text-muted-foreground">Manage small amounts well before expecting increase (Luke 16:10)</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Landmark className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <h4 className="font-semibold">Eternal Perspective</h4>
                    <p className="text-sm text-muted-foreground">Store treasures in heaven through generous giving (Matthew 6:19-21)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credit Repair Hub Tab */}
          <TabsContent value="credit" className="space-y-6">
            <CreditRepairHub />
          </TabsContent>

          {/* Student Financial Guide Tab */}
          <TabsContent value="students" className="space-y-6">
            <StudentFinancialGuide />
          </TabsContent>

          {/* SMSP Calculator Tab */}
          <TabsContent value="smsp" className="space-y-6">
            <SISPCalculator />
            <PrismBudgetPromo variant="smsp" />

          {/* Scenarios & Pitfalls Tab */}
          <TabsContent value="scenarios" className="space-y-6">
            <FinancialScenarios />
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <FinancialTools />
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <FinancialExamples />
          </TabsContent>

          {/* Debt Freedom Tab */}
          <TabsContent value="debt" className="space-y-6">
            {/* Debt Crisis Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  The Debt Crisis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-2xl font-bold text-destructive">$46,000+</p>
                    <p className="text-sm text-muted-foreground">Average Black household debt</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-2xl font-bold text-amber-600">$5,700+</p>
                    <p className="text-sm text-muted-foreground">Average credit card debt</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-2xl font-bold text-blue-600">$25,000+</p>
                    <p className="text-sm text-muted-foreground">Student loan debt (grads)</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                  <strong>Biblical truth:</strong> "The borrower is slave to the lender" (Proverbs 22:7). 
                  Debt limits your ability to serve God freely and build generational wealth.
                </p>
              </CardContent>
            </Card>

            {/* New Debt Strategies Calculator */}
            <DebtStrategiesCalculator />
            <PrismBudgetPromo variant="debt" />

          {/* Budgeting Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-500" />
                    Kingdom Budget Calculator
                  </CardTitle>
                  <CardDescription>
                    Based on the biblical principle: Tithe first, then 50/30/20
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Monthly Take-Home Income ($)</Label>
                    <Input 
                      type="number" 
                      placeholder="4000" 
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                  <Button onClick={calculateBudget} className="w-full">
                    Calculate My Budget
                  </Button>
                  
                  {budgetResults && (
                    <div className="space-y-3 pt-4 border-t">
                      {/* Zero-Based Budget Summary */}
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm">Zero-Based Budget Total</span>
                          <span className={`font-bold ${Math.abs(budgetResults.total - parseFloat(income)) < 0.01 ? 'text-emerald-600' : 'text-destructive'}`}>
                            ${budgetResults.total.toFixed(2)} / ${parseFloat(income).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Every dollar has a job - budget should equal income</p>
                      </div>

                      {/* Tithe */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-sacred" />
                            Tithe/Charity (10%)
                          </span>
                          <span className="font-bold">${budgetResults.tithe.toFixed(2)}</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      
                      {/* Needs */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-blue-500" />
                            Needs (45%)
                          </span>
                          <span className="font-bold">${budgetResults.needs.toFixed(2)}</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <p className="text-xs text-muted-foreground">Housing, utilities, food, transportation</p>
                      </div>
                      
                      {/* Wants */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            Wants (15%)
                          </span>
                          <span className="font-bold">${budgetResults.wants.toFixed(2)}</span>
                        </div>
                        <Progress value={15} className="h-2" />
                        <p className="text-xs text-muted-foreground">Entertainment, Greek activities, dining</p>
                      </div>

                      {/* Fun Money */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Fun Money (5%)
                          </span>
                          <span className="font-bold">${budgetResults.funMoney.toFixed(2)}</span>
                        </div>
                        <Progress value={5} className="h-2" />
                        <p className="text-xs text-muted-foreground">Guilt-free spending - no questions asked!</p>
                      </div>
                      
                      {/* Savings */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <PiggyBank className="w-4 h-4 text-emerald-500" />
                            Emergency Savings (10%)
                          </span>
                          <span className="font-bold">${budgetResults.savings.toFixed(2)}</span>
                        </div>
                        <Progress value={10} className="h-2" />
                        <p className="text-xs text-muted-foreground">3-6 months expenses goal</p>
                      </div>

                      {/* Investing */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-cyan-500" />
                            Investing (10%)
                          </span>
                          <span className="font-bold">${budgetResults.investing.toFixed(2)}</span>
                        </div>
                        <Progress value={10} className="h-2" />
                        <p className="text-xs text-muted-foreground">401k, IRA, index funds, stocks</p>
                      </div>

                      {/* Future Goals */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-rose-500" />
                            Future Goals (5%)
                          </span>
                          <span className="font-bold">${budgetResults.futureGoals.toFixed(2)}</span>
                        </div>
                        <Progress value={5} className="h-2" />
                        <p className="text-xs text-muted-foreground">House, car, vacation, wedding</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Categories Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 text-center mb-2">
                    <p className="text-xs font-medium">Zero-Based Budget: 100% of income assigned</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 rounded-lg bg-sacred/10 border border-sacred/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Heart className="w-3 h-3 text-sacred" />
                        Tithe/Charity (10%)
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        "Honor the Lord with your firstfruits" (Proverbs 3:9)
                      </p>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Home className="w-3 h-3 text-blue-500" />
                        Needs (45%)
                      </h4>
                      <p className="text-xs text-muted-foreground">Housing, utilities, groceries, transportation, insurance</p>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Users className="w-3 h-3 text-purple-500" />
                        Wants (15%)
                      </h4>
                      <p className="text-xs text-muted-foreground">Greek events, entertainment, dining, subscriptions</p>
                    </div>

                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Fun Money (5%)
                      </h4>
                      <p className="text-xs text-muted-foreground">Guilt-free spending - treat yourself without regret</p>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <PiggyBank className="w-3 h-3 text-emerald-500" />
                        Emergency Savings (10%)
                      </h4>
                      <p className="text-xs text-muted-foreground">Build 3-6 months of expenses for security</p>
                    </div>

                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-cyan-500" />
                        Investing (10%)
                      </h4>
                      <p className="text-xs text-muted-foreground">401k, Roth IRA, index funds - build generational wealth</p>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Target className="w-3 h-3 text-rose-500" />
                        Future Goals (5%)
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="outline" className="text-xs py-0"><Home className="w-2 h-2 mr-1" />House</Badge>
                        <Badge variant="outline" className="text-xs py-0"><Car className="w-2 h-2 mr-1" />Car</Badge>
                        <Badge variant="outline" className="text-xs py-0"><Plane className="w-2 h-2 mr-1" />Vacation</Badge>
                        <Badge variant="outline" className="text-xs py-0"><Gem className="w-2 h-2 mr-1" />Wedding</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <PrismBudgetPromo variant="budget" />

          {/* Greek Costs Tab */}
          <TabsContent value="greek" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Real Costs of Greek Life
                </CardTitle>
                <CardDescription>
                  Planning ahead prevents financial strain from membership obligations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Expense</th>
                        <th className="text-left py-3 px-2">Typical Cost</th>
                        <th className="text-left py-3 px-2">Budget Tip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {greekCosts.map((cost, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{cost.item}</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">{cost.typical}</Badge>
                          </td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{cost.tip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                    Warning Signs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Using credit cards for dues or events</p>
                  <p>• Skipping meals to afford paraphernalia</p>
                  <p>• Borrowing money for conventions</p>
                  <p>• Feeling pressure to match others' spending</p>
                  <p>• Late payments causing chapter issues</p>
                  <p className="pt-2 italic text-muted-foreground">
                    "Owe no one anything except to love one another" — Romans 13:8
                  </p>
                </CardContent>
              </Card>

              <Card className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    Healthy Habits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Set aside monthly for annual dues</p>
                  <p>• Create a separate "Greek fund" savings</p>
                  <p>• Say no to events you can't afford</p>
                  <p>• Buy paraphernalia gradually, not all at once</p>
                  <p>• Share costs with line sisters/brothers</p>
                  <p className="pt-2 italic text-muted-foreground">
                    "The plans of the diligent lead to profit" — Proverbs 21:5
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Wealth Building Tab */}
          <TabsContent value="wealth" className="space-y-6">
            <BuildingWealthSection />
            <PrismBudgetPromo variant="wealth" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialStewardship;
