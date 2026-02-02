import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Printer,
  PiggyBank,
  TrendingUp,
  ShoppingCart,
  Heart,
  Users,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Play,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface BudgetItem {
  label: string;
  amount: number;
  category: "kingdom" | "savings" | "investing" | "spending";
}

export function SISPCalculator() {
  const [primaryIncome, setPrimaryIncome] = useState("");
  const [sideIncome, setSideIncome] = useState("");
  const [tithe, setTithe] = useState("");
  const [offerings, setOfferings] = useState("");
  const [emergencyFund, setEmergencyFund] = useState("");
  const [greekSinking, setGreekSinking] = useState("");
  const [generalSavings, setGeneralSavings] = useState("");
  const [retirement, setRetirement] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [housing, setHousing] = useState("");
  const [utilities, setUtilities] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [greekDues, setGreekDues] = useState("");
  const [insurance, setInsurance] = useState("");
  const [personal, setPersonal] = useState("");

  const parseNum = (val: string) => parseFloat(val) || 0;

  const totalIncome = parseNum(primaryIncome) + parseNum(sideIncome);
  
  const kingdomTotal = parseNum(tithe) + parseNum(offerings);
  const savingsTotal = parseNum(emergencyFund) + parseNum(greekSinking) + parseNum(generalSavings);
  const investingTotal = parseNum(retirement) + parseNum(brokerage);
  const spendingTotal = parseNum(housing) + parseNum(utilities) + parseNum(transportation) + 
                        parseNum(food) + parseNum(greekDues) + parseNum(insurance) + parseNum(personal);

  const totalAllocated = kingdomTotal + savingsTotal + investingTotal + spendingTotal;
  const remaining = totalIncome - totalAllocated;

  const kingdomPercent = totalIncome > 0 ? (kingdomTotal / totalIncome) * 100 : 0;
  const savingsPercent = totalIncome > 0 ? (savingsTotal / totalIncome) * 100 : 0;
  const investingPercent = totalIncome > 0 ? (investingTotal / totalIncome) * 100 : 0;
  const spendingPercent = totalIncome > 0 ? (spendingTotal / totalIncome) * 100 : 0;

  const isHealthy = kingdomPercent >= 10 && savingsPercent >= 10 && spendingPercent <= 70;

  // Load demo data - realistic scenario for a young professional D9 member
  const loadDemoData = () => {
    // Income: Young professional making $55k/year + side income
    setPrimaryIncome("4583");  // ~$55k/year
    setSideIncome("400");      // Photography/consulting side hustle
    
    // Kingdom First: 10%+
    setTithe("498.30");        // 10% of total
    setOfferings("50");        // Additional giving
    
    // Savings: 15%
    setEmergencyFund("250");   // Building 3-6 month fund
    setGreekSinking("150");    // Convention, Boule, chapter events
    setGeneralSavings("100");  // General savings
    
    // Investing: 10%
    setRetirement("350");      // 401k contribution
    setBrokerage("150");       // Taxable brokerage
    
    // Spending: 65%
    setHousing("1400");        // Rent/mortgage
    setUtilities("180");       // Electric, gas, water, internet
    setTransportation("450");  // Car payment, gas, insurance
    setFood("400");            // Groceries + occasional dining
    setGreekDues("125");       // Monthly dues, chapter assessments
    setInsurance("120");       // Health insurance (after employer contribution)
    setPersonal("260");        // Entertainment, clothing, misc
    
    toast.success("Demo data loaded! This shows a realistic budget for a young D9 professional.");
  };

  // Clear all data
  const clearAllData = () => {
    setPrimaryIncome("");
    setSideIncome("");
    setTithe("");
    setOfferings("");
    setEmergencyFund("");
    setGreekSinking("");
    setGeneralSavings("");
    setRetirement("");
    setBrokerage("");
    setHousing("");
    setUtilities("");
    setTransportation("");
    setFood("");
    setGreekDues("");
    setInsurance("");
    setPersonal("");
    toast.success("All data cleared");
  };

  const autoCalculate = () => {
    if (totalIncome <= 0) {
      toast.error("Enter your income first");
      return;
    }

    // Kingdom First: 10%
    const autoTithe = totalIncome * 0.10;
    setTithe(autoTithe.toFixed(2));
    setOfferings("0");

    // Savings: 15%
    const savingsAlloc = totalIncome * 0.15;
    setEmergencyFund((savingsAlloc * 0.4).toFixed(2));
    setGreekSinking((savingsAlloc * 0.3).toFixed(2));
    setGeneralSavings((savingsAlloc * 0.3).toFixed(2));

    // Investing: 10%
    const investAlloc = totalIncome * 0.10;
    setRetirement((investAlloc * 0.7).toFixed(2));
    setBrokerage((investAlloc * 0.3).toFixed(2));

    // Spending: 65% (leaving room for user to allocate)
    const spendAlloc = totalIncome * 0.65;
    setHousing((spendAlloc * 0.40).toFixed(2));
    setUtilities((spendAlloc * 0.08).toFixed(2));
    setTransportation((spendAlloc * 0.15).toFixed(2));
    setFood((spendAlloc * 0.15).toFixed(2));
    setGreekDues((spendAlloc * 0.07).toFixed(2));
    setInsurance((spendAlloc * 0.05).toFixed(2));
    setPersonal((spendAlloc * 0.10).toFixed(2));

    toast.success("Budget auto-calculated using SMSP formula!");
  };

  const exportCSV = () => {
    const data = [
      ["SACRED MONEY SPENDING PLAN (SMSP) - Faith-First Financial Plan"],
      [""],
      ["INCOME", "Monthly", "Annual"],
      ["Primary Income", primaryIncome, (parseNum(primaryIncome) * 12).toFixed(2)],
      ["Side Hustle", sideIncome, (parseNum(sideIncome) * 12).toFixed(2)],
      ["TOTAL INCOME", totalIncome.toFixed(2), (totalIncome * 12).toFixed(2)],
      [""],
      ["KINGDOM FIRST (Target: 10%)", "", ""],
      ["Tithe (10%)", tithe, (parseNum(tithe) * 12).toFixed(2)],
      ["Offerings/Charity", offerings, (parseNum(offerings) * 12).toFixed(2)],
      ["Subtotal", kingdomTotal.toFixed(2), (kingdomTotal * 12).toFixed(2)],
      [""],
      ["SAVINGS (Target: 15%)", "", ""],
      ["Emergency Fund", emergencyFund, (parseNum(emergencyFund) * 12).toFixed(2)],
      ["Greek Event Sinking Fund", greekSinking, (parseNum(greekSinking) * 12).toFixed(2)],
      ["General Savings", generalSavings, (parseNum(generalSavings) * 12).toFixed(2)],
      ["Subtotal", savingsTotal.toFixed(2), (savingsTotal * 12).toFixed(2)],
      [""],
      ["INVESTING (Target: 10%)", "", ""],
      ["Retirement (401k/IRA)", retirement, (parseNum(retirement) * 12).toFixed(2)],
      ["Brokerage Account", brokerage, (parseNum(brokerage) * 12).toFixed(2)],
      ["Subtotal", investingTotal.toFixed(2), (investingTotal * 12).toFixed(2)],
      [""],
      ["SPENDING (Target: 65%)", "", ""],
      ["Housing/Rent", housing, (parseNum(housing) * 12).toFixed(2)],
      ["Utilities", utilities, (parseNum(utilities) * 12).toFixed(2)],
      ["Transportation", transportation, (parseNum(transportation) * 12).toFixed(2)],
      ["Food/Groceries", food, (parseNum(food) * 12).toFixed(2)],
      ["Greek Dues", greekDues, (parseNum(greekDues) * 12).toFixed(2)],
      ["Insurance", insurance, (parseNum(insurance) * 12).toFixed(2)],
      ["Personal/Entertainment", personal, (parseNum(personal) * 12).toFixed(2)],
      ["Subtotal", spendingTotal.toFixed(2), (spendingTotal * 12).toFixed(2)],
      [""],
      ["SUMMARY", "", ""],
      ["Total Allocated", totalAllocated.toFixed(2), (totalAllocated * 12).toFixed(2)],
      ["Remaining", remaining.toFixed(2), (remaining * 12).toFixed(2)],
    ];

    const csv = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sacred-money-spending-plan-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Budget exported to CSV!");
  };

  const printPlan = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-sacred/10 to-emerald-500/10 border-sacred/20 print:bg-white print:border-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="w-6 h-6 text-sacred" />
            Sacred Money Spending Plan (SMSP)
          </CardTitle>
          <CardDescription>
            Faith-first budgeting with the 10/15/10/65 rule — honor God with every dollar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" onClick={loadDemoData}>
              <Play className="w-4 h-4 mr-2" />
              Load Demo
            </Button>
            <Button variant="outline" size="sm" onClick={autoCalculate}>
              <Calculator className="w-4 h-4 mr-2" />
              Auto-Calculate
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={printPlan} className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAllData} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Dashboard */}
      {totalIncome > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <Heart className="w-4 h-4 text-rose-500" />
                    Kingdom
                  </span>
                  <span className="text-sm font-medium">{kingdomPercent.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(kingdomPercent, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: 10%+</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <PiggyBank className="w-4 h-4 text-emerald-500" />
                    Savings
                  </span>
                  <span className="text-sm font-medium">{savingsPercent.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(savingsPercent, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: 15%</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-sacred" />
                    Investing
                  </span>
                  <span className="text-sm font-medium">{investingPercent.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(investingPercent, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: 10%</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4 text-amber-500" />
                    Spending
                  </span>
                  <span className="text-sm font-medium">{spendingPercent.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(spendingPercent, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground">Target: ≤65%</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className={`p-4 rounded-lg ${isHealthy ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
              <div className="flex items-center gap-2">
                {isHealthy ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-medium">
                  {isHealthy ? "Budget looks healthy!" : "Budget needs adjustment"}
                </span>
              </div>
              {remaining !== 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {remaining > 0 
                    ? `You have $${remaining.toFixed(2)} unallocated` 
                    : `You're over budget by $${Math.abs(remaining).toFixed(2)}`}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💰 Income</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Primary Income (Monthly)</Label>
              <Input 
                type="number"
                placeholder="3000"
                value={primaryIncome}
                onChange={(e) => setPrimaryIncome(e.target.value)}
              />
            </div>
            <div>
              <Label>Side Hustle / Other</Label>
              <Input 
                type="number"
                placeholder="500"
                value={sideIncome}
                onChange={(e) => setSideIncome(e.target.value)}
              />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Total Monthly Income:</strong> ${totalIncome.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Annual: ${(totalIncome * 12).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Kingdom First */}
        <Card className="border-rose-200 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Kingdom First (10%)
            </CardTitle>
            <CardDescription>"Seek first the kingdom of God" - Matthew 6:33</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tithe (10% of income)</Label>
              <Input 
                type="number"
                placeholder={totalIncome > 0 ? (totalIncome * 0.1).toFixed(2) : "300"}
                value={tithe}
                onChange={(e) => setTithe(e.target.value)}
              />
            </div>
            <div>
              <Label>Offerings / Charity</Label>
              <Input 
                type="number"
                placeholder="50"
                value={offerings}
                onChange={(e) => setOfferings(e.target.value)}
              />
            </div>
            <div className="p-3 bg-rose-500/10 rounded-lg">
              <p className="text-sm"><strong>Subtotal:</strong> ${kingdomTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Savings */}
        <Card className="border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-500" />
              Savings (15%)
            </CardTitle>
            <CardDescription>"The wise store up choice food" - Proverbs 21:20</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Emergency Fund</Label>
              <Input 
                type="number"
                placeholder="200"
                value={emergencyFund}
                onChange={(e) => setEmergencyFund(e.target.value)}
              />
            </div>
            <div>
              <Label>Greek Event Sinking Fund</Label>
              <Input 
                type="number"
                placeholder="100"
                value={greekSinking}
                onChange={(e) => setGreekSinking(e.target.value)}
              />
            </div>
            <div>
              <Label>General Savings</Label>
              <Input 
                type="number"
                placeholder="150"
                value={generalSavings}
                onChange={(e) => setGeneralSavings(e.target.value)}
              />
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <p className="text-sm"><strong>Subtotal:</strong> ${savingsTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Investing */}
        <Card className="border-sacred/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sacred" />
              Investing (10%)
            </CardTitle>
            <CardDescription>"A good person leaves an inheritance" - Proverbs 13:22</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Retirement (401k/Roth IRA)</Label>
              <Input 
                type="number"
                placeholder="200"
                value={retirement}
                onChange={(e) => setRetirement(e.target.value)}
              />
            </div>
            <div>
              <Label>Brokerage Account</Label>
              <Input 
                type="number"
                placeholder="100"
                value={brokerage}
                onChange={(e) => setBrokerage(e.target.value)}
              />
            </div>
            <div className="p-3 bg-sacred/10 rounded-lg">
              <p className="text-sm"><strong>Subtotal:</strong> ${investingTotal.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Spending */}
        <Card className="lg:col-span-2 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-500" />
              Spending (≤65%)
            </CardTitle>
            <CardDescription>"Let no debt remain outstanding" - Romans 13:8</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label>Housing/Rent</Label>
                <Input 
                  type="number"
                  placeholder="1000"
                  value={housing}
                  onChange={(e) => setHousing(e.target.value)}
                />
              </div>
              <div>
                <Label>Utilities</Label>
                <Input 
                  type="number"
                  placeholder="150"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                />
              </div>
              <div>
                <Label>Transportation</Label>
                <Input 
                  type="number"
                  placeholder="300"
                  value={transportation}
                  onChange={(e) => setTransportation(e.target.value)}
                />
              </div>
              <div>
                <Label>Food/Groceries</Label>
                <Input 
                  type="number"
                  placeholder="400"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Greek Dues (Monthly)
                </Label>
                <Input 
                  type="number"
                  placeholder="50"
                  value={greekDues}
                  onChange={(e) => setGreekDues(e.target.value)}
                />
              </div>
              <div>
                <Label>Insurance</Label>
                <Input 
                  type="number"
                  placeholder="100"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </div>
              <div>
                <Label>Personal/Entertainment</Label>
                <Input 
                  type="number"
                  placeholder="200"
                  value={personal}
                  onChange={(e) => setPersonal(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <div className="p-3 bg-amber-500/10 rounded-lg w-full">
                  <p className="text-sm"><strong>Subtotal:</strong> ${spendingTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
