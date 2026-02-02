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
  ClipboardList
} from "lucide-react";
import { FinancialScenarios } from "@/components/financial/FinancialScenarios";
import { FinancialTools } from "@/components/financial/FinancialTools";
import { FinancialExamples } from "@/components/financial/FinancialExamples";
import { CreditRepairHub } from "@/components/financial/CreditRepairHub";
import { StudentFinancialGuide } from "@/components/financial/StudentFinancialGuide";
import { SISPCalculator } from "@/components/financial/SISPCalculator";
import { FinancialOverviewTTS } from "@/components/financial/FinancialOverviewTTS";
import { Link } from "react-router-dom";

const FinancialStewardship = () => {
  const [income, setIncome] = useState<string>("");
  const [budgetResults, setBudgetResults] = useState<{needs: number; wants: number; savings: number; tithe: number} | null>(null);
  const [debtAmount, setDebtAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [debtPayoffMonths, setDebtPayoffMonths] = useState<number | null>(null);

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) return;
    
    // 10% Tithe, 50% Needs, 30% Wants, 10% Savings (modified 50/30/20 with tithe)
    const tithe = monthlyIncome * 0.10;
    const remaining = monthlyIncome - tithe;
    const needs = remaining * 0.50;
    const wants = remaining * 0.30;
    const savings = remaining * 0.20;
    
    setBudgetResults({ needs, wants, savings, tithe });
  };

  const calculateDebtPayoff = () => {
    const principal = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    
    if (isNaN(principal) || isNaN(rate) || isNaN(payment) || payment <= principal * rate) {
      setDebtPayoffMonths(null);
      return;
    }
    
    const months = Math.ceil(Math.log(payment / (payment - principal * rate)) / Math.log(1 + rate));
    setDebtPayoffMonths(months);
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
            <TabsTrigger value="sisp" className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ClipboardList className="w-4 h-4" />
              SISP Budget
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

          {/* SISP Calculator Tab */}
          <TabsContent value="sisp" className="space-y-6">
            <SISPCalculator />
          </TabsContent>

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
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    The Debt Crisis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Black household debt</span>
                      <Badge variant="destructive">$46,000+</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average credit card debt</span>
                      <Badge variant="destructive">$5,700+</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Student loan debt (college grads)</span>
                      <Badge variant="destructive">$25,000+</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-4 border-t">
                    <strong>The biblical truth:</strong> "The borrower is slave to the lender" (Proverbs 22:7). 
                    Debt limits your ability to serve God freely and build generational wealth.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-500" />
                    Debt Payoff Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Total Debt Amount ($)</Label>
                      <Input 
                        type="number" 
                        placeholder="10000" 
                        value={debtAmount}
                        onChange={(e) => setDebtAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Interest Rate (%)</Label>
                      <Input 
                        type="number" 
                        placeholder="18" 
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Monthly Payment ($)</Label>
                      <Input 
                        type="number" 
                        placeholder="300" 
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                      />
                    </div>
                    <Button onClick={calculateDebtPayoff} className="w-full">
                      Calculate Payoff Time
                    </Button>
                  </div>
                  
                  {debtPayoffMonths !== null && (
                    <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <p className="text-center">
                        <span className="block text-3xl font-bold text-emerald-600">{debtPayoffMonths} months</span>
                        <span className="text-sm text-muted-foreground">
                          ({Math.floor(debtPayoffMonths / 12)} years, {debtPayoffMonths % 12} months)
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>The Biblical Debt Freedom Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step1">
                    <AccordionTrigger>Step 1: Stop the Bleeding</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>• Cut up credit cards or freeze them (literally)</p>
                      <p>• Commit to no new debt—cash or debit only</p>
                      <p>• Cancel unnecessary subscriptions</p>
                      <p className="text-sm text-muted-foreground italic mt-2">
                        "No one can serve two masters" (Matthew 6:24)
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="step2">
                    <AccordionTrigger>Step 2: Build Emergency Fund ($1,000)</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>• Sell items you don't need</p>
                      <p>• Work extra hours or side gigs</p>
                      <p>• This prevents new debt for emergencies</p>
                      <p className="text-sm text-muted-foreground italic mt-2">
                        "The wise store up choice food and olive oil" (Proverbs 21:20)
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="step3">
                    <AccordionTrigger>Step 3: Debt Snowball Method</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>• List debts smallest to largest</p>
                      <p>• Pay minimums on all except smallest</p>
                      <p>• Attack smallest debt with everything extra</p>
                      <p>• When paid off, roll that payment to the next debt</p>
                      <p className="text-sm text-muted-foreground italic mt-2">
                        "Let us run with perseverance the race marked out for us" (Hebrews 12:1)
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="step4">
                    <AccordionTrigger>Step 4: Credit Repair Strategies</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p>• Get free credit report at AnnualCreditReport.com</p>
                      <p>• Dispute errors in writing</p>
                      <p>• Keep credit utilization under 30%</p>
                      <p>• Become an authorized user on family member's good account</p>
                      <p>• Consider a secured credit card for rebuilding</p>
                      <p className="text-sm text-muted-foreground italic mt-2">
                        "A good name is more desirable than great riches" (Proverbs 22:1)
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

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
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-sacred" />
                            Tithe (10%)
                          </span>
                          <span className="font-bold">${budgetResults.tithe.toFixed(2)}</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-blue-500" />
                            Needs (45%)
                          </span>
                          <span className="font-bold">${budgetResults.needs.toFixed(2)}</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <p className="text-xs text-muted-foreground">Housing, utilities, food, transportation, insurance</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500" />
                            Wants (27%)
                          </span>
                          <span className="font-bold">${budgetResults.wants.toFixed(2)}</span>
                        </div>
                        <Progress value={27} className="h-2" />
                        <p className="text-xs text-muted-foreground">Entertainment, dining out, Greek activities, hobbies</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <PiggyBank className="w-4 h-4 text-emerald-500" />
                            Savings (18%)
                          </span>
                          <span className="font-bold">${budgetResults.savings.toFixed(2)}</span>
                        </div>
                        <Progress value={18} className="h-2" />
                        <p className="text-xs text-muted-foreground">Emergency fund, retirement, investments</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Categories Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-sacred/10 border border-sacred/20">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Heart className="w-4 h-4 text-sacred" />
                        Tithe & Giving (10%)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Give first, not from leftovers. "Honor the Lord with your wealth and with the firstfruits" (Proverbs 3:9)
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Home className="w-4 h-4 text-blue-500" />
                        Essential Needs (45%)
                      </h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Housing (rent/mortgage): 25-30%</li>
                        <li>• Utilities: 5-10%</li>
                        <li>• Groceries: 5-10%</li>
                        <li>• Transportation: 5-10%</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        Lifestyle & Wants (27%)
                      </h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Greek dues & events</li>
                        <li>• Entertainment & dining</li>
                        <li>• Personal care & clothing</li>
                        <li>• Subscriptions</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <h4 className="font-semibold flex items-center gap-2">
                        <PiggyBank className="w-4 h-4 text-emerald-500" />
                        Savings & Future (18%)
                      </h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Emergency fund (3-6 months expenses)</li>
                        <li>• Retirement (401k, IRA)</li>
                        <li>• Investments</li>
                        <li>• Major purchases fund</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Building Generational Wealth
                </CardTitle>
                <CardDescription>
                  "A good person leaves an inheritance for their children's children" — Proverbs 13:22
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Home className="w-5 h-5 text-blue-500" />
                        Homeownership
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Build equity instead of paying rent</li>
                        <li>• Research first-time buyer programs</li>
                        <li>• Improve credit score for better rates</li>
                        <li>• Save 20% down to avoid PMI</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Landmark className="w-5 h-5 text-amber-500" />
                        Retirement Investing
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Start now—compound interest is powerful</li>
                        <li>• Max employer 401(k) match (free money!)</li>
                        <li>• Open a Roth IRA ($7,000/year limit)</li>
                        <li>• Target-date funds for simplicity</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-purple-500" />
                        Education & Skills
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Invest in certifications that increase income</li>
                        <li>• Negotiate salary (research market rates)</li>
                        <li>• Develop multiple income streams</li>
                        <li>• Use Greek network for opportunities</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        Legacy Planning
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Life insurance (term life is affordable)</li>
                        <li>• Create a will and trust</li>
                        <li>• Teach children about money early</li>
                        <li>• Support Black-owned businesses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">The Power of Compound Interest</h3>
                  <p className="text-muted-foreground">
                    If you invest $200/month starting at age 25 with 8% average returns:
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">$58,902</p>
                      <p className="text-sm text-muted-foreground">At age 35</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">$176,023</p>
                      <p className="text-sm text-muted-foreground">At age 45</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">$559,562</p>
                      <p className="text-sm text-muted-foreground">At age 65</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic pt-4">
                    "Whoever gathers money little by little makes it grow" — Proverbs 13:11
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialStewardship;
