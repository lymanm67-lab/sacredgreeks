import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Snowflake,
  Mountain,
  TrendingDown,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
  Heart,
  DollarSign,
  Trophy,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { ListenButton } from "@/components/ListenButton";

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

interface PayoffResult {
  months: number;
  totalInterest: number;
  payoffOrder: string[];
}

const DEMO_DEBTS: Debt[] = [
  { id: "1", name: "Credit Card #1", balance: 2500, interestRate: 22.99, minimumPayment: 75 },
  { id: "2", name: "Credit Card #2", balance: 8000, interestRate: 18.99, minimumPayment: 200 },
  { id: "3", name: "Car Loan", balance: 12000, interestRate: 6.5, minimumPayment: 350 },
  { id: "4", name: "Student Loan", balance: 25000, interestRate: 5.5, minimumPayment: 280 },
];

const STRATEGY_INFO = {
  snowball: {
    name: "Debt Snowball",
    icon: Snowflake,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Pay minimums on everything, attack smallest balance first",
    why: "Quick wins build momentum and motivation",
    bestFor: "People who need psychological wins to stay motivated",
    scripture: '"The plans of the diligent lead surely to abundance" — Proverbs 21:5',
  },
  avalanche: {
    name: "Debt Avalanche",
    icon: Mountain,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Pay minimums on everything, attack highest interest rate first",
    why: "Mathematically optimal, saves the most money",
    bestFor: "Analytical people focused on minimizing total cost",
    scripture: '"The wisdom of the prudent is to give thought to their ways" — Proverbs 14:8',
  },
  snowflake: {
    name: "Debt Snowflake",
    icon: Zap,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Make small extra payments whenever possible",
    why: "Builds daily habits, keeps momentum even without lump sums",
    bestFor: "People with variable income or who want to accelerate any strategy",
    scripture: '"Whoever gathers money little by little makes it grow" — Proverbs 13:11',
  },
};

export function DebtStrategiesCalculator() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [extraPayment, setExtraPayment] = useState("");
  const [snowflakeAmount, setSnowflakeAmount] = useState("");
  const [results, setResults] = useState<{
    snowball: PayoffResult | null;
    avalanche: PayoffResult | null;
    snowflake: PayoffResult | null;
  }>({ snowball: null, avalanche: null, snowflake: null });
  
  // Strategy finder quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [recommendedStrategy, setRecommendedStrategy] = useState<string | null>(null);

  const addDebt = () => {
    setDebts([...debts, {
      id: Date.now().toString(),
      name: "",
      balance: 0,
      interestRate: 0,
      minimumPayment: 0,
    }]);
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const loadDemoData = () => {
    setDebts(DEMO_DEBTS);
    setExtraPayment("200");
    setSnowflakeAmount("50");
    toast.success("Demo data loaded - typical D9 member debt scenario");
  };

  const clearAll = () => {
    setDebts([]);
    setExtraPayment("");
    setSnowflakeAmount("");
    setResults({ snowball: null, avalanche: null, snowflake: null });
    setQuizAnswers({});
    setRecommendedStrategy(null);
    toast.success("All data cleared");
  };

  const calculatePayoff = (sortedDebts: Debt[], extra: number, weeklySnowflake: number = 0): PayoffResult => {
    const debtsCopy = sortedDebts.map(d => ({ ...d, currentBalance: d.balance }));
    let months = 0;
    let totalInterest = 0;
    const payoffOrder: string[] = [];
    const monthlySnowflake = weeklySnowflake * 4;

    while (debtsCopy.some(d => d.currentBalance > 0) && months < 600) {
      months++;
      let availableExtra = extra + monthlySnowflake;

      for (const debt of debtsCopy) {
        if (debt.currentBalance <= 0) continue;

        const monthlyRate = debt.interestRate / 100 / 12;
        const interest = debt.currentBalance * monthlyRate;
        totalInterest += interest;

        let payment = debt.minimumPayment;
        
        // Apply extra to first debt with balance
        if (availableExtra > 0 && debt === debtsCopy.find(d => d.currentBalance > 0)) {
          payment += availableExtra;
          availableExtra = 0;
        }

        debt.currentBalance = debt.currentBalance + interest - payment;

        if (debt.currentBalance <= 0) {
          debt.currentBalance = 0;
          payoffOrder.push(debt.name);
          // Freed minimum payment becomes extra for next debt
          extra += debt.minimumPayment;
        }
      }
    }

    return { months, totalInterest, payoffOrder };
  };

  const runCalculations = () => {
    if (debts.length === 0 || debts.some(d => !d.name || d.balance <= 0)) {
      toast.error("Please add at least one debt with valid information");
      return;
    }

    const extra = parseFloat(extraPayment) || 0;
    const snowflake = parseFloat(snowflakeAmount) || 0;

    // Snowball: smallest balance first
    const snowballSorted = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballResult = calculatePayoff(snowballSorted, extra);

    // Avalanche: highest interest first
    const avalancheSorted = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    const avalancheResult = calculatePayoff(avalancheSorted, extra);

    // Snowflake: using avalanche order with weekly extra payments
    const snowflakeResult = calculatePayoff(avalancheSorted, extra, snowflake);

    setResults({
      snowball: snowballResult,
      avalanche: avalancheResult,
      snowflake: snowflakeResult,
    });

    toast.success("Calculations complete! Compare your strategies below.");
  };

  const calculateRecommendation = () => {
    const { q1, q2, q3, q4 } = quizAnswers;
    
    let snowballScore = 0;
    let avalancheScore = 0;
    let snowflakeScore = 0;

    // Q1: Motivation style
    if (q1 === "wins") snowballScore += 2;
    if (q1 === "math") avalancheScore += 2;
    if (q1 === "habit") snowflakeScore += 2;

    // Q2: Income type
    if (q2 === "steady") { avalancheScore += 1; snowballScore += 1; }
    if (q2 === "variable") snowflakeScore += 2;

    // Q3: Debt situation
    if (q3 === "many-small") snowballScore += 2;
    if (q3 === "few-high") avalancheScore += 2;
    if (q3 === "mixed") snowflakeScore += 1;

    // Q4: Discipline level
    if (q4 === "high") avalancheScore += 2;
    if (q4 === "medium") snowballScore += 1;
    if (q4 === "building") snowflakeScore += 2;

    const scores = { snowball: snowballScore, avalanche: avalancheScore, snowflake: snowflakeScore };
    const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    setRecommendedStrategy(winner);
    toast.success(`Based on your answers, we recommend the ${STRATEGY_INFO[winner as keyof typeof STRATEGY_INFO].name}!`);
  };

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinimums = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  const strategyComparisonText = results.avalanche && results.snowball ? 
    `Here's your debt payoff comparison. With the Debt Snowball method, paying smallest balances first, you'll be debt-free in ${results.snowball.months} months, paying $${results.snowball.totalInterest.toFixed(0)} in interest. With the Debt Avalanche method, tackling highest interest rates first, you'll finish in ${results.avalanche.months} months, paying $${results.avalanche.totalInterest.toFixed(0)} in interest. ${results.snowflake ? `Adding weekly snowflake payments of $${snowflakeAmount}, you could finish in ${results.snowflake.months} months.` : ''} The avalanche saves you $${(results.snowball.totalInterest - results.avalanche.totalInterest).toFixed(0)} in interest, but the snowball gives faster psychological wins.` : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-emerald-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingDown className="w-6 h-6 text-emerald-500" />
                Debt Freedom Calculator
              </CardTitle>
              <CardDescription>
                Compare Snowball, Avalanche, and Snowflake strategies to find your path to debt freedom
              </CardDescription>
            </div>
            <ListenButton
              text="The Debt Freedom Calculator helps you compare three proven debt payoff strategies. The Snowball method targets your smallest balances first for quick psychological wins. The Avalanche method attacks highest interest rates first to save the most money. The Snowflake method adds small extra payments whenever you can. Enter your debts below, and we'll show you exactly how long each strategy takes and how much interest you'll pay."
              itemId="debt-strategies-intro"
              title="Debt Strategies"
              voice="onyx"
              size="sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={loadDemoData}>
              <Play className="w-4 h-4 mr-2" />
              Load Demo
            </Button>
            <Button variant="outline" size="sm" onClick={addDebt}>
              <Plus className="w-4 h-4 mr-2" />
              Add Debt
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="finder" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Strategy Finder</span>
          </TabsTrigger>
        </TabsList>

        {/* Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4">
          {/* Debt Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Debts</CardTitle>
              <CardDescription>Enter all your debts to compare payoff strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {debts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No debts added yet</p>
                  <p className="text-sm">Click "Add Debt" or "Load Demo" to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {debts.map((debt, index) => (
                    <div key={debt.id} className="p-4 rounded-lg border bg-card space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Debt #{index + 1}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => removeDebt(debt.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-4">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input
                            placeholder="Credit Card"
                            value={debt.name}
                            onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Balance ($)</Label>
                          <Input
                            type="number"
                            placeholder="5000"
                            value={debt.balance || ""}
                            onChange={(e) => updateDebt(debt.id, "balance", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Interest Rate (%)</Label>
                          <Input
                            type="number"
                            placeholder="18.99"
                            value={debt.interestRate || ""}
                            onChange={(e) => updateDebt(debt.id, "interestRate", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Min Payment ($)</Label>
                          <Input
                            type="number"
                            placeholder="150"
                            value={debt.minimumPayment || ""}
                            onChange={(e) => updateDebt(debt.id, "minimumPayment", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {debts.length > 0 && (
                <>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex justify-between text-sm">
                      <span>Total Debt:</span>
                      <span className="font-bold">${totalDebt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Minimum Payments:</span>
                      <span className="font-medium">${totalMinimums.toLocaleString()}/month</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Extra Monthly Payment ($)</Label>
                      <Input
                        type="number"
                        placeholder="200"
                        value={extraPayment}
                        onChange={(e) => setExtraPayment(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Amount above minimums to throw at debt
                      </p>
                    </div>
                    <div>
                      <Label>Weekly Snowflake Amount ($)</Label>
                      <Input
                        type="number"
                        placeholder="50"
                        value={snowflakeAmount}
                        onChange={(e) => setSnowflakeAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Small weekly extras (cash back, tips, etc.)
                      </p>
                    </div>
                  </div>

                  <Button onClick={runCalculations} className="w-full" size="lg">
                    <Calculator className="w-4 h-4 mr-2" />
                    Compare All Strategies
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Results Comparison */}
          {results.snowball && results.avalanche && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Strategy Comparison
                    </CardTitle>
                    <CardDescription>See how each method affects your debt-free date</CardDescription>
                  </div>
                  {strategyComparisonText && (
                    <ListenButton
                      text={strategyComparisonText}
                      itemId="debt-comparison-results"
                      title="Strategy Comparison"
                      voice="onyx"
                      size="sm"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Snowball */}
                  <div className={`p-4 rounded-lg ${STRATEGY_INFO.snowball.bgColor} border ${STRATEGY_INFO.snowball.borderColor}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Snowflake className={`w-5 h-5 ${STRATEGY_INFO.snowball.color}`} />
                      <h4 className="font-semibold">Snowball</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <p className="text-3xl font-bold">{results.snowball.months}</p>
                        <p className="text-xs text-muted-foreground">months to debt-free</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest:</span>
                          <span className="font-medium">${results.snowball.totalInterest.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Years:</span>
                          <span className="font-medium">{(results.snowball.months / 12).toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Payoff order:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {results.snowball.payoffOrder.slice(0, 3).map((name, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{i + 1}. {name}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avalanche */}
                  <div className={`p-4 rounded-lg ${STRATEGY_INFO.avalanche.bgColor} border ${STRATEGY_INFO.avalanche.borderColor}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Mountain className={`w-5 h-5 ${STRATEGY_INFO.avalanche.color}`} />
                      <h4 className="font-semibold">Avalanche</h4>
                      {results.avalanche.totalInterest < results.snowball.totalInterest && (
                        <Badge className="bg-emerald-500 text-xs">Saves Most</Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="text-center p-3 bg-background/50 rounded-lg">
                        <p className="text-3xl font-bold">{results.avalanche.months}</p>
                        <p className="text-xs text-muted-foreground">months to debt-free</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest:</span>
                          <span className="font-medium">${results.avalanche.totalInterest.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Savings vs Snowball:</span>
                          <span className="font-medium text-emerald-600">
                            ${(results.snowball.totalInterest - results.avalanche.totalInterest).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Payoff order:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {results.avalanche.payoffOrder.slice(0, 3).map((name, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{i + 1}. {name}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Snowflake */}
                  {results.snowflake && parseFloat(snowflakeAmount) > 0 && (
                    <div className={`p-4 rounded-lg ${STRATEGY_INFO.snowflake.bgColor} border ${STRATEGY_INFO.snowflake.borderColor}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className={`w-5 h-5 ${STRATEGY_INFO.snowflake.color}`} />
                        <h4 className="font-semibold">Avalanche + Snowflake</h4>
                        {results.snowflake.months < results.avalanche.months && (
                          <Badge className="bg-emerald-500 text-xs">Fastest</Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="text-center p-3 bg-background/50 rounded-lg">
                          <p className="text-3xl font-bold">{results.snowflake.months}</p>
                          <p className="text-xs text-muted-foreground">months to debt-free</p>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Interest:</span>
                            <span className="font-medium">${results.snowflake.totalInterest.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time Saved:</span>
                            <span className="font-medium text-emerald-600">
                              {results.avalanche.months - results.snowflake.months} months
                            </span>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            + ${(parseFloat(snowflakeAmount) * 4).toFixed(0)}/month in small payments
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Timeline */}
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-3 text-sm">Debt-Free Timeline</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Snowball", months: results.snowball.months, color: "bg-blue-500" },
                      { name: "Avalanche", months: results.avalanche.months, color: "bg-amber-500" },
                      ...(results.snowflake && parseFloat(snowflakeAmount) > 0 
                        ? [{ name: "Snowflake+", months: results.snowflake.months, color: "bg-emerald-500" }] 
                        : []),
                    ].map((strategy) => (
                      <div key={strategy.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{strategy.name}</span>
                          <span>{strategy.months} months ({(strategy.months / 12).toFixed(1)} years)</span>
                        </div>
                        <Progress 
                          value={(strategy.months / Math.max(results.snowball.months, results.avalanche.months)) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Strategies Info Tab */}
        <TabsContent value="strategies" className="space-y-4">
          {Object.entries(STRATEGY_INFO).map(([key, info]) => {
            const Icon = info.icon;
            return (
              <Card key={key} className={`${info.bgColor} border ${info.borderColor}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-background`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{info.name}</CardTitle>
                        <CardDescription>{info.description}</CardDescription>
                      </div>
                    </div>
                    <ListenButton
                      text={`${info.name}: ${info.description}. Why people use it: ${info.why}. Best for: ${info.bestFor}. ${info.scripture}`}
                      itemId={`strategy-${key}`}
                      title={info.name}
                      voice="onyx"
                      size="sm"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4" />
                        Why People Use It
                      </h4>
                      <p className="text-sm text-muted-foreground">{info.why}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4" />
                        Best For
                      </h4>
                      <p className="text-sm text-muted-foreground">{info.bestFor}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border">
                    <p className="text-sm italic text-muted-foreground">{info.scripture}</p>
                  </div>

                  {key === "snowball" && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">How It Works:</h4>
                      <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                        <li>List all debts from smallest to largest balance</li>
                        <li>Pay minimums on everything except the smallest</li>
                        <li>Throw all extra money at the smallest debt</li>
                        <li>When it's paid off, roll that payment into the next</li>
                        <li>Repeat until debt-free!</li>
                      </ol>
                    </div>
                  )}

                  {key === "avalanche" && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">How It Works:</h4>
                      <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                        <li>List all debts from highest to lowest interest rate</li>
                        <li>Pay minimums on everything except the highest rate</li>
                        <li>Throw all extra money at the highest interest debt</li>
                        <li>When it's paid off, roll that payment into the next</li>
                        <li>Mathematically optimal—saves the most interest!</li>
                      </ol>
                    </div>
                  )}

                  {key === "snowflake" && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Snowflake Sources:</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Cash back rewards</Badge>
                        <Badge variant="outline">Round-up apps</Badge>
                        <Badge variant="outline">Side gig tips</Badge>
                        <Badge variant="outline">Rebates</Badge>
                        <Badge variant="outline">Selling items</Badge>
                        <Badge variant="outline">Tax refunds</Badge>
                        <Badge variant="outline">Birthday money</Badge>
                        <Badge variant="outline">Budget surplus</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Strategy Finder Quiz */}
        <TabsContent value="finder" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sacred" />
                    Which Strategy Fits You?
                  </CardTitle>
                  <CardDescription>
                    Answer 4 quick questions to find your best debt payoff approach
                  </CardDescription>
                </div>
                <ListenButton
                  text="Take this quick assessment to find your best debt payoff strategy. We'll ask about your motivation style, income type, debt situation, and self-discipline level to recommend the approach that fits your personality and situation."
                  itemId="strategy-finder-intro"
                  title="Strategy Finder"
                  voice="onyx"
                  size="sm"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Q1 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">1. What motivates you most?</Label>
                <RadioGroup value={quizAnswers.q1} onValueChange={(v) => setQuizAnswers({ ...quizAnswers, q1: v })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="wins" id="q1-wins" />
                    <Label htmlFor="q1-wins" className="cursor-pointer flex-1">
                      <span className="font-medium">Quick wins</span>
                      <span className="text-sm text-muted-foreground block">I need to see progress fast to stay motivated</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="math" id="q1-math" />
                    <Label htmlFor="q1-math" className="cursor-pointer flex-1">
                      <span className="font-medium">Maximum efficiency</span>
                      <span className="text-sm text-muted-foreground block">I want to pay the least amount possible overall</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="habit" id="q1-habit" />
                    <Label htmlFor="q1-habit" className="cursor-pointer flex-1">
                      <span className="font-medium">Building habits</span>
                      <span className="text-sm text-muted-foreground block">I want to develop a consistent money mindset</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Q2 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">2. How would you describe your income?</Label>
                <RadioGroup value={quizAnswers.q2} onValueChange={(v) => setQuizAnswers({ ...quizAnswers, q2: v })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="steady" id="q2-steady" />
                    <Label htmlFor="q2-steady" className="cursor-pointer flex-1">
                      <span className="font-medium">Steady paycheck</span>
                      <span className="text-sm text-muted-foreground block">Predictable income every pay period</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="variable" id="q2-variable" />
                    <Label htmlFor="q2-variable" className="cursor-pointer flex-1">
                      <span className="font-medium">Variable/Side income</span>
                      <span className="text-sm text-muted-foreground block">Income fluctuates or I have irregular side gigs</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Q3 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">3. What does your debt look like?</Label>
                <RadioGroup value={quizAnswers.q3} onValueChange={(v) => setQuizAnswers({ ...quizAnswers, q3: v })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="many-small" id="q3-many" />
                    <Label htmlFor="q3-many" className="cursor-pointer flex-1">
                      <span className="font-medium">Many small debts</span>
                      <span className="text-sm text-muted-foreground block">Multiple credit cards, store cards, small loans</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="few-high" id="q3-few" />
                    <Label htmlFor="q3-few" className="cursor-pointer flex-1">
                      <span className="font-medium">Few large debts with high interest</span>
                      <span className="text-sm text-muted-foreground block">A couple big balances eating me with interest</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="mixed" id="q3-mixed" />
                    <Label htmlFor="q3-mixed" className="cursor-pointer flex-1">
                      <span className="font-medium">Mixed bag</span>
                      <span className="text-sm text-muted-foreground block">Variety of sizes and rates</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Q4 */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">4. How would you rate your financial discipline?</Label>
                <RadioGroup value={quizAnswers.q4} onValueChange={(v) => setQuizAnswers({ ...quizAnswers, q4: v })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="high" id="q4-high" />
                    <Label htmlFor="q4-high" className="cursor-pointer flex-1">
                      <span className="font-medium">High discipline</span>
                      <span className="text-sm text-muted-foreground block">I can stick to a plan even without seeing results</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="medium" id="q4-medium" />
                    <Label htmlFor="q4-medium" className="cursor-pointer flex-1">
                      <span className="font-medium">Medium discipline</span>
                      <span className="text-sm text-muted-foreground block">I can follow through if I see some progress</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="building" id="q4-building" />
                    <Label htmlFor="q4-building" className="cursor-pointer flex-1">
                      <span className="font-medium">Still building</span>
                      <span className="text-sm text-muted-foreground block">I need structure and frequent action to stay on track</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={calculateRecommendation} 
                className="w-full" 
                size="lg"
                disabled={Object.keys(quizAnswers).length < 4}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Get My Recommendation
              </Button>

              {/* Results */}
              {recommendedStrategy && (
                <div className={`p-6 rounded-lg ${STRATEGY_INFO[recommendedStrategy as keyof typeof STRATEGY_INFO].bgColor} border ${STRATEGY_INFO[recommendedStrategy as keyof typeof STRATEGY_INFO].borderColor}`}>
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      {recommendedStrategy === "snowball" && <Snowflake className="w-12 h-12 text-blue-500" />}
                      {recommendedStrategy === "avalanche" && <Mountain className="w-12 h-12 text-amber-500" />}
                      {recommendedStrategy === "snowflake" && <Zap className="w-12 h-12 text-emerald-500" />}
                    </div>
                    <h3 className="text-xl font-bold">
                      We Recommend: {STRATEGY_INFO[recommendedStrategy as keyof typeof STRATEGY_INFO].name}
                    </h3>
                    <p className="text-muted-foreground">
                      {STRATEGY_INFO[recommendedStrategy as keyof typeof STRATEGY_INFO].description}
                    </p>
                    <p className="text-sm italic">
                      {STRATEGY_INFO[recommendedStrategy as keyof typeof STRATEGY_INFO].scripture}
                    </p>
                    <Button variant="outline" onClick={() => {
                      setQuizAnswers({});
                      setRecommendedStrategy(null);
                    }}>
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
