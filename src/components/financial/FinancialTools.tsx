import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  PiggyBank, 
  Target, 
  TrendingUp,
  Shield,
  CreditCard,
  DollarSign,
  Calendar
} from "lucide-react";

export const FinancialTools = () => {
  // Emergency Fund Calculator
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [emergencyFundResult, setEmergencyFundResult] = useState<{
    threeMonth: number;
    sixMonth: number;
    currentMonths: number;
    toSave: number;
  } | null>(null);

  // Savings Goal Calculator
  const [savingsGoal, setSavingsGoal] = useState<string>("");
  const [monthlySavings, setMonthlySavings] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [savingsResult, setSavingsResult] = useState<{
    monthsNeeded: number;
    targetDateReach: string;
    onTrack: boolean;
  } | null>(null);

  // Credit Score Simulator
  const [creditScore, setCreditScore] = useState<string>("");
  const [creditUtilization, setCreditUtilization] = useState<string>("");
  const [creditResult, setCreditResult] = useState<{
    rating: string;
    color: string;
    improvements: string[];
  } | null>(null);

  // Greek Event Budget Calculator
  const [eventType, setEventType] = useState<string>("convention");
  const [eventBudget, setEventBudget] = useState<string>("");
  const [monthsToSave, setMonthsToSave] = useState<string>("");
  const [eventResult, setEventResult] = useState<{
    monthlySavings: number;
    weeklySavings: number;
    dailySavings: number;
  } | null>(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const savings = parseFloat(currentSavings) || 0;
    
    if (isNaN(expenses) || expenses <= 0) return;
    
    const threeMonth = expenses * 3;
    const sixMonth = expenses * 6;
    const currentMonths = savings / expenses;
    const toSave = Math.max(0, sixMonth - savings);
    
    setEmergencyFundResult({ threeMonth, sixMonth, currentMonths, toSave });
  };

  const calculateSavingsGoal = () => {
    const goal = parseFloat(savingsGoal);
    const monthly = parseFloat(monthlySavings);
    
    if (isNaN(goal) || isNaN(monthly) || goal <= 0 || monthly <= 0) return;
    
    const monthsNeeded = Math.ceil(goal / monthly);
    const targetDateReach = new Date();
    targetDateReach.setMonth(targetDateReach.getMonth() + monthsNeeded);
    
    let onTrack = true;
    if (targetDate) {
      const target = new Date(targetDate);
      onTrack = targetDateReach <= target;
    }
    
    setSavingsResult({
      monthsNeeded,
      targetDateReach: targetDateReach.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      onTrack
    });
  };

  const calculateCreditScore = () => {
    const score = parseInt(creditScore);
    const utilization = parseFloat(creditUtilization);
    
    if (isNaN(score)) return;
    
    let rating = "";
    let color = "";
    const improvements: string[] = [];
    
    if (score >= 800) {
      rating = "Exceptional";
      color = "text-emerald-600";
    } else if (score >= 740) {
      rating = "Very Good";
      color = "text-green-600";
    } else if (score >= 670) {
      rating = "Good";
      color = "text-blue-600";
    } else if (score >= 580) {
      rating = "Fair";
      color = "text-amber-600";
      improvements.push("Pay all bills on time for 6+ months");
      improvements.push("Reduce credit card balances");
    } else {
      rating = "Poor";
      color = "text-red-600";
      improvements.push("Start with a secured credit card");
      improvements.push("Become an authorized user on a family member's account");
      improvements.push("Dispute any errors on your credit report");
    }
    
    if (!isNaN(utilization)) {
      if (utilization > 30) {
        improvements.push(`Lower utilization from ${utilization}% to under 30%`);
      }
      if (utilization > 50) {
        improvements.unshift("⚠️ High utilization is significantly hurting your score");
      }
    }
    
    if (score < 740) {
      improvements.push("Request credit limit increases (don't spend more!)");
      improvements.push("Keep old accounts open for credit history length");
    }
    
    setCreditResult({ rating, color, improvements });
  };

  const calculateEventBudget = () => {
    const budget = parseFloat(eventBudget);
    const months = parseInt(monthsToSave);
    
    if (isNaN(budget) || isNaN(months) || budget <= 0 || months <= 0) return;
    
    const monthlySavings = budget / months;
    const weeklySavings = monthlySavings / 4.33;
    const dailySavings = monthlySavings / 30;
    
    setEventResult({ monthlySavings, weeklySavings, dailySavings });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emergency Fund Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Emergency Fund Calculator
            </CardTitle>
            <CardDescription>
              "The wise store up choice food and olive oil" — Proverbs 21:20
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Monthly Expenses ($)</Label>
              <Input 
                type="number" 
                placeholder="2500" 
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Include rent, utilities, food, transportation, insurance</p>
            </div>
            <div>
              <Label>Current Savings ($)</Label>
              <Input 
                type="number" 
                placeholder="1000" 
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
              />
            </div>
            <Button onClick={calculateEmergencyFund} className="w-full">
              Calculate Emergency Fund
            </Button>
            
            {emergencyFundResult && (
              <div className="space-y-3 pt-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                    <p className="text-xs text-muted-foreground">3-Month Goal</p>
                    <p className="text-lg font-bold text-blue-600">${emergencyFundResult.threeMonth.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
                    <p className="text-xs text-muted-foreground">6-Month Goal</p>
                    <p className="text-lg font-bold text-emerald-600">${emergencyFundResult.sixMonth.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Current Coverage</span>
                    <Badge variant={emergencyFundResult.currentMonths >= 3 ? "default" : "destructive"}>
                      {emergencyFundResult.currentMonths.toFixed(1)} months
                    </Badge>
                  </div>
                  <Progress value={Math.min(100, (emergencyFundResult.currentMonths / 6) * 100)} className="h-2" />
                </div>
                {emergencyFundResult.toSave > 0 && (
                  <p className="text-sm text-center">
                    <span className="font-semibold">Still need:</span> ${emergencyFundResult.toSave.toLocaleString()} to reach 6-month goal
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Savings Goal Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Savings Goal Calculator
            </CardTitle>
            <CardDescription>
              Plan for conventions, dues, or any major expense
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Savings Goal ($)</Label>
              <Input 
                type="number" 
                placeholder="2000" 
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
              />
            </div>
            <div>
              <Label>Monthly Savings Amount ($)</Label>
              <Input 
                type="number" 
                placeholder="200" 
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
              />
            </div>
            <div>
              <Label>Target Date (optional)</Label>
              <Input 
                type="date" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
            <Button onClick={calculateSavingsGoal} className="w-full">
              Calculate Timeline
            </Button>
            
            {savingsResult && (
              <div className="space-y-3 pt-4 border-t">
                <div className="p-4 rounded-lg bg-purple-500/10 text-center">
                  <p className="text-sm text-muted-foreground">You'll reach your goal in</p>
                  <p className="text-2xl font-bold text-purple-600">{savingsResult.monthsNeeded} months</p>
                  <p className="text-sm">{savingsResult.targetDateReach}</p>
                </div>
                {targetDate && (
                  <div className={`p-3 rounded-lg ${savingsResult.onTrack ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}>
                    <p className={`text-sm text-center ${savingsResult.onTrack ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {savingsResult.onTrack 
                        ? "✓ You're on track to meet your target date!" 
                        : "⚠️ Increase monthly savings to meet your target date"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Credit Score Analyzer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              Credit Score Analyzer
            </CardTitle>
            <CardDescription>
              "A good name is more desirable than great riches" — Proverbs 22:1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Credit Score</Label>
              <Input 
                type="number" 
                placeholder="680" 
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Check free at Credit Karma or your bank</p>
            </div>
            <div>
              <Label>Credit Utilization % (optional)</Label>
              <Input 
                type="number" 
                placeholder="45" 
                value={creditUtilization}
                onChange={(e) => setCreditUtilization(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Balance ÷ Credit Limit × 100</p>
            </div>
            <Button onClick={calculateCreditScore} className="w-full">
              Analyze My Credit
            </Button>
            
            {creditResult && (
              <div className="space-y-3 pt-4 border-t">
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-sm text-muted-foreground">Your credit rating</p>
                  <p className={`text-2xl font-bold ${creditResult.color}`}>{creditResult.rating}</p>
                </div>
                {creditResult.improvements.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Steps to Improve:</p>
                    {creditResult.improvements.map((tip, index) => (
                      <p key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Greek Event Budget Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-500" />
              Greek Event Savings Plan
            </CardTitle>
            <CardDescription>
              Never go into debt for Greek events again
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Event Type</Label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="convention">National Convention</option>
                <option value="regional">Regional Conference</option>
                <option value="founders">Founders Day Weekend</option>
                <option value="dues">Annual Dues</option>
                <option value="custom">Custom Event</option>
              </select>
            </div>
            <div>
              <Label>Total Budget Needed ($)</Label>
              <Input 
                type="number" 
                placeholder="1800" 
                value={eventBudget}
                onChange={(e) => setEventBudget(e.target.value)}
              />
            </div>
            <div>
              <Label>Months Until Event</Label>
              <Input 
                type="number" 
                placeholder="12" 
                value={monthsToSave}
                onChange={(e) => setMonthsToSave(e.target.value)}
              />
            </div>
            <Button onClick={calculateEventBudget} className="w-full">
              Create Savings Plan
            </Button>
            
            {eventResult && (
              <div className="space-y-3 pt-4 border-t">
                <p className="text-sm text-center font-semibold">To save ${parseFloat(eventBudget).toLocaleString()}, you need:</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-lg bg-rose-500/10 text-center">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="text-lg font-bold text-rose-600">${eventResult.monthlySavings.toFixed(0)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 text-center">
                    <p className="text-xs text-muted-foreground">Weekly</p>
                    <p className="text-lg font-bold text-purple-600">${eventResult.weeklySavings.toFixed(0)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                    <p className="text-xs text-muted-foreground">Daily</p>
                    <p className="text-lg font-bold text-blue-600">${eventResult.dailySavings.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground italic">
                  "The plans of the diligent lead to profit" — Proverbs 21:5
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Reference Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            Quick Financial Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Metric</th>
                  <th className="text-left py-2 px-2">Danger Zone</th>
                  <th className="text-left py-2 px-2">Okay</th>
                  <th className="text-left py-2 px-2">Excellent</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Credit Score</td>
                  <td className="py-2 px-2"><Badge variant="destructive">Below 580</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">580-740</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">740+</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Credit Utilization</td>
                  <td className="py-2 px-2"><Badge variant="destructive">Above 50%</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">30-50%</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">Under 30%</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Emergency Fund</td>
                  <td className="py-2 px-2"><Badge variant="destructive">$0</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">1-3 months</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">6+ months</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Housing Cost</td>
                  <td className="py-2 px-2"><Badge variant="destructive">Above 35%</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">28-35%</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">Under 28%</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2 font-medium">Debt-to-Income</td>
                  <td className="py-2 px-2"><Badge variant="destructive">Above 43%</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">36-43%</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">Under 36%</Badge></td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-medium">Savings Rate</td>
                  <td className="py-2 px-2"><Badge variant="destructive">0%</Badge></td>
                  <td className="py-2 px-2"><Badge variant="outline">10-15%</Badge></td>
                  <td className="py-2 px-2"><Badge className="bg-emerald-500">20%+</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
