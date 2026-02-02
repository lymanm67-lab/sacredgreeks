import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface BudgetExample {
  name: string;
  income: number;
  situation: string;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  verdict: "good" | "warning" | "danger";
  tips: string[];
}

const budgetExamples: BudgetExample[] = [
  {
    name: "Recent Graduate Tanya",
    income: 3200,
    situation: "25, AKA, entry-level job, $28K student loans, renting with roommate",
    breakdown: [
      { category: "Tithe & Giving", amount: 320, percentage: 10 },
      { category: "Rent & Utilities", amount: 700, percentage: 22 },
      { category: "Transportation", amount: 300, percentage: 9 },
      { category: "Groceries", amount: 250, percentage: 8 },
      { category: "Student Loans", amount: 400, percentage: 12.5 },
      { category: "Greek Expenses", amount: 100, percentage: 3 },
      { category: "Emergency/Savings", amount: 400, percentage: 12.5 },
      { category: "Personal/Entertainment", amount: 250, percentage: 8 },
      { category: "Insurance/Phone", amount: 200, percentage: 6 },
      { category: "Miscellaneous", amount: 280, percentage: 9 }
    ],
    verdict: "good",
    tips: [
      "Living with a roommate keeps housing affordable",
      "Attacking student loans aggressively",
      "Greek expenses are reasonable at 3%",
      "Building emergency fund while paying debt"
    ]
  },
  {
    name: "Grad Student Marcus",
    income: 2400,
    situation: "27, Omega, PhD stipend, minimal debt, shares apartment",
    breakdown: [
      { category: "Tithe & Giving", amount: 240, percentage: 10 },
      { category: "Rent & Utilities", amount: 550, percentage: 23 },
      { category: "Groceries", amount: 200, percentage: 8 },
      { category: "Transportation", amount: 150, percentage: 6 },
      { category: "Greek Expenses", amount: 150, percentage: 6 },
      { category: "Emergency/Savings", amount: 300, percentage: 12.5 },
      { category: "Books/Research", amount: 100, percentage: 4 },
      { category: "Personal", amount: 150, percentage: 6 },
      { category: "Convention Fund", amount: 100, percentage: 4 },
      { category: "Insurance/Phone", amount: 150, percentage: 6 },
      { category: "Miscellaneous", amount: 310, percentage: 14.5 }
    ],
    verdict: "good",
    tips: [
      "Smart to save separately for convention",
      "6% on Greek expenses is manageable",
      "Building savings despite lower income",
      "Consider side income opportunities"
    ]
  },
  {
    name: "Professional Keisha",
    income: 5800,
    situation: "32, Delta, mid-career professional, $15K remaining student loans, single",
    breakdown: [
      { category: "Tithe & Giving", amount: 580, percentage: 10 },
      { category: "Rent", amount: 1450, percentage: 25 },
      { category: "Car Payment", amount: 450, percentage: 8 },
      { category: "Student Loans", amount: 500, percentage: 9 },
      { category: "Utilities", amount: 150, percentage: 2.5 },
      { category: "Groceries", amount: 300, percentage: 5 },
      { category: "Greek Expenses", amount: 300, percentage: 5 },
      { category: "Retirement (401k)", amount: 700, percentage: 12 },
      { category: "Emergency Fund", amount: 400, percentage: 7 },
      { category: "Insurance", amount: 200, percentage: 3.5 },
      { category: "Personal/Entertainment", amount: 400, percentage: 7 },
      { category: "Miscellaneous", amount: 370, percentage: 6 }
    ],
    verdict: "good",
    tips: [
      "Maxing out employer 401(k) match—great!",
      "Paying down student loans quickly",
      "Greek expenses reasonable for income level",
      "Could increase retirement contributions"
    ]
  },
  {
    name: "Warning Example: Jerome",
    income: 4200,
    situation: "29, Kappa, good salary but lifestyle inflation, $8K credit card debt",
    breakdown: [
      { category: "Tithe & Giving", amount: 0, percentage: 0 },
      { category: "Rent", amount: 1500, percentage: 36 },
      { category: "Car Payment", amount: 550, percentage: 13 },
      { category: "Credit Card Minimums", amount: 200, percentage: 5 },
      { category: "Groceries", amount: 200, percentage: 5 },
      { category: "Greek Expenses", amount: 400, percentage: 10 },
      { category: "Entertainment/Dining", amount: 600, percentage: 14 },
      { category: "Insurance/Phone", amount: 300, percentage: 7 },
      { category: "Savings", amount: 0, percentage: 0 },
      { category: "Miscellaneous", amount: 450, percentage: 10 }
    ],
    verdict: "danger",
    tips: [
      "⚠️ Housing at 36% is too high",
      "⚠️ No savings or emergency fund",
      "⚠️ Greek expenses at 10% while in debt",
      "⚠️ Entertainment/dining needs to be cut",
      "⚠️ Car payment too expensive for income",
      "Action: Cut expenses, attack credit card debt"
    ]
  }
];

const debtPayoffExamples = [
  {
    scenario: "$10,000 Credit Card Debt at 22% APR",
    options: [
      {
        approach: "Minimum Payments ($200/month)",
        time: "9 years, 6 months",
        totalPaid: "$22,819",
        interestPaid: "$12,819",
        verdict: "terrible"
      },
      {
        approach: "Aggressive ($500/month)",
        time: "2 years, 0 months",
        totalPaid: "$12,091",
        interestPaid: "$2,091",
        verdict: "good"
      },
      {
        approach: "Gazelle Intense ($800/month)",
        time: "1 year, 2 months",
        totalPaid: "$11,229",
        interestPaid: "$1,229",
        verdict: "excellent"
      }
    ]
  },
  {
    scenario: "$25,000 Student Loans at 6% APR",
    options: [
      {
        approach: "Standard 10-Year Plan ($278/month)",
        time: "10 years",
        totalPaid: "$33,306",
        interestPaid: "$8,306",
        verdict: "okay"
      },
      {
        approach: "Accelerated ($450/month)",
        time: "5 years, 4 months",
        totalPaid: "$28,764",
        interestPaid: "$3,764",
        verdict: "good"
      },
      {
        approach: "Aggressive ($700/month)",
        time: "3 years, 3 months",
        totalPaid: "$27,318",
        interestPaid: "$2,318",
        verdict: "excellent"
      }
    ]
  }
];

export const FinancialExamples = () => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "excellent": return "bg-emerald-500";
      case "good": return "bg-green-500";
      case "okay": return "bg-blue-500";
      case "warning": return "bg-amber-500";
      case "danger": return "bg-red-500";
      case "terrible": return "bg-red-600";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Budget Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            Real Budget Examples
          </CardTitle>
          <CardDescription>
            See how other Greeks balance their finances at different income levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgetExamples.map((example, index) => (
            <Card key={index} className={`border-l-4 ${example.verdict === 'danger' ? 'border-l-red-500 bg-red-500/5' : 'border-l-emerald-500'}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {example.name}
                  </CardTitle>
                  <Badge variant={example.verdict === 'danger' ? 'destructive' : 'default'}>
                    ${example.income.toLocaleString()}/month
                  </Badge>
                </div>
                <CardDescription>{example.situation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold mb-2">Budget Breakdown:</p>
                    <div className="space-y-1">
                      {example.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.category}</span>
                          <span className="font-medium">${item.amount} ({item.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Assessment:</p>
                    {example.tips.map((tip, i) => (
                      <p key={i} className="text-xs flex items-start gap-2">
                        {tip.startsWith('⚠️') ? (
                          <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-muted-foreground">{tip.replace('⚠️ ', '')}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Debt Payoff Comparisons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-500" />
            Debt Payoff Comparisons
          </CardTitle>
          <CardDescription>
            See the dramatic difference payment amounts make
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {debtPayoffExamples.map((example, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-semibold text-sm border-b pb-2">{example.scenario}</h4>
              <div className="grid gap-3 md:grid-cols-3">
                {example.options.map((option, i) => (
                  <Card key={i} className={`border-t-4 ${
                    option.verdict === 'excellent' ? 'border-t-emerald-500' :
                    option.verdict === 'good' ? 'border-t-green-500' :
                    option.verdict === 'okay' ? 'border-t-blue-500' :
                    'border-t-red-500'
                  }`}>
                    <CardContent className="pt-4 space-y-2">
                      <p className="text-xs font-medium">{option.approach}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-semibold">{option.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Paid:</span>
                          <span className="font-semibold">{option.totalPaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Interest:</span>
                          <span className={`font-semibold ${option.verdict === 'terrible' ? 'text-red-500' : ''}`}>
                            {option.interestPaid}
                          </span>
                        </div>
                      </div>
                      <Badge className={`w-full justify-center ${getVerdictColor(option.verdict)}`}>
                        {option.verdict.charAt(0).toUpperCase() + option.verdict.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Convention Cost Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Real Convention Cost Breakdowns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-purple-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget-Friendly Convention</CardTitle>
                <CardDescription>Smart choices, full experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Registration (early bird)</span>
                  <span className="font-medium">$300</span>
                </div>
                <div className="flex justify-between">
                  <span>Flight (booked 6 months ahead)</span>
                  <span className="font-medium">$280</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotel (4 nights, split 2 ways)</span>
                  <span className="font-medium">$400</span>
                </div>
                <div className="flex justify-between">
                  <span>Food (mostly groceries + some dining)</span>
                  <span className="font-medium">$150</span>
                </div>
                <div className="flex justify-between">
                  <span>Events/Activities</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="flex justify-between">
                  <span>Transportation</span>
                  <span className="font-medium">$70</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>TOTAL</span>
                  <span className="text-emerald-600">$1,300</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Expensive Convention</CardTitle>
                <CardDescription>Last-minute, no planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Registration (late)</span>
                  <span className="font-medium">$450</span>
                </div>
                <div className="flex justify-between">
                  <span>Flight (last minute)</span>
                  <span className="font-medium">$520</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotel (4 nights, solo room)</span>
                  <span className="font-medium">$800</span>
                </div>
                <div className="flex justify-between">
                  <span>Food (all restaurants)</span>
                  <span className="font-medium">$350</span>
                </div>
                <div className="flex justify-between">
                  <span>Events/Activities/Shopping</span>
                  <span className="font-medium">$400</span>
                </div>
                <div className="flex justify-between">
                  <span>Uber/Rideshares</span>
                  <span className="font-medium">$180</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>TOTAL</span>
                  <span className="text-red-600">$2,700</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <strong>Difference: $1,400</strong> — Planning saves over 50%!
          </p>
        </CardContent>
      </Card>

      {/* The Numbers That Matter */}
      <Card className="bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sacred" />
            Numbers Every Greek Should Know
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-sacred">$1,000</p>
              <p className="text-sm text-muted-foreground">Starter emergency fund goal</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-emerald-600">30%</p>
              <p className="text-sm text-muted-foreground">Max credit utilization</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-blue-600">28%</p>
              <p className="text-sm text-muted-foreground">Max housing as % of income</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <p className="text-3xl font-bold text-purple-600">15%</p>
              <p className="text-sm text-muted-foreground">Target savings rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
