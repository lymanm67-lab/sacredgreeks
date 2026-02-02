import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  GraduationCap, 
  AlertTriangle, 
  CreditCard,
  Shield,
  CheckCircle2,
  Clock,
  DollarSign,
  Calculator,
  BookOpen,
  Target,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

const creditCardTraps = [
  {
    trap: "Campus Sign-Up Tables",
    tactic: "Free t-shirts, pizza, or gifts for applications",
    reality: "One $20 shirt can cost you $1,000+ in interest over time",
    defense: "Walk away. Nothing free is worth 24% APR."
  },
  {
    trap: "Store Credit Cards",
    tactic: "'Save 20% today if you open a card!'",
    reality: "Store cards have 25-30% APR, the highest rates available",
    defense: "Pay full price or wait for a sale. Never open store cards."
  },
  {
    trap: "Pre-Approved Offers",
    tactic: "'You're pre-approved for $5,000!'",
    reality: "Pre-approved ≠ pre-qualified. High limits = high temptation.",
    defense: "Shred all offers. Opt out at OptOutPrescreen.com"
  },
  {
    trap: "Student Credit Cards",
    tactic: "'Build credit while in school!'",
    reality: "Low limits but still dangerous if not managed properly",
    defense: "If needed, use only for small recurring bills, pay in full monthly"
  },
  {
    trap: "Buy Now, Pay Later",
    tactic: "'Split into 4 easy payments!'",
    reality: "Missed payments = 25%+ APR backdated to purchase date",
    defense: "If you can't afford it now, you can't afford it. Period."
  }
];

const debtAvoidanceChecklist = [
  { id: "emergency", label: "Build $500 emergency fund before anything else", scripture: "Proverbs 21:20" },
  { id: "budget", label: "Create a written monthly budget", scripture: "Luke 14:28" },
  { id: "wants", label: "Wait 48 hours before any purchase over $50", scripture: "Proverbs 21:5" },
  { id: "cards", label: "Avoid credit cards until after graduation", scripture: "Proverbs 22:7" },
  { id: "greek", label: "Save for Greek costs BEFORE joining", scripture: "Luke 14:28" },
  { id: "work", label: "Work part-time to cover personal expenses", scripture: "Proverbs 14:23" },
  { id: "tithe", label: "Honor God first with 10% of any income", scripture: "Malachi 3:10" },
  { id: "loans", label: "Only borrow what's absolutely necessary for education", scripture: "Romans 13:8" }
];

export function StudentFinancialGuide() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [greekCosts, setGreekCosts] = useState("");
  const [hoursNeeded, setHoursNeeded] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const calculateHours = () => {
    const income = parseFloat(monthlyIncome);
    const costs = parseFloat(greekCosts);
    
    if (isNaN(costs) || costs <= 0) {
      toast.error("Enter valid Greek costs");
      return;
    }

    // Assume $12/hour average student wage after taxes
    const hourlyWage = 12;
    const monthlyGreekCost = costs / 12; // Annualize
    const hours = Math.ceil(monthlyGreekCost / hourlyWage * 4.33); // Weekly hours needed
    
    setHoursNeeded(hours);
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const checklistProgress = (checkedItems.length / debtAvoidanceChecklist.length) * 100;

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <Card className="bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-500/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h3 className="font-bold text-lg">College is Ground Zero for Debt</h3>
              <p className="text-muted-foreground">
                Credit card companies spend $1 billion annually targeting college students. 
                The average graduate leaves with $5,000+ in credit card debt ON TOP of student loans.
                This guide will help you avoid their traps.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Card Traps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-rose-500" />
            Credit Card Traps Targeting Students
          </CardTitle>
          <CardDescription>
            Know the enemy's tactics and defend yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {creditCardTraps.map((item, index) => (
              <AccordionItem key={index} value={`trap-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    {item.trap}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 rounded-lg bg-amber-500/10">
                      <p className="text-xs font-semibold text-amber-600 mb-1">Their Tactic</p>
                      <p className="text-sm">{item.tactic}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-500/10">
                      <p className="text-xs font-semibold text-rose-600 mb-1">The Reality</p>
                      <p className="text-sm">{item.reality}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10">
                      <p className="text-xs font-semibold text-emerald-600 mb-1">Your Defense</p>
                      <p className="text-sm">{item.defense}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Part-Time Work Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            Can You Afford Greek Life Without Debt?
          </CardTitle>
          <CardDescription>
            Calculate hours needed to fund Greek costs through work, not borrowing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Estimated Annual Greek Costs ($)</Label>
              <Input 
                type="number"
                placeholder="e.g., 1500 (dues, events, gear)"
                value={greekCosts}
                onChange={(e) => setGreekCosts(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include: dues, conventions, paraphernalia, events
              </p>
            </div>
            <div>
              <Label>Current Monthly Income ($)</Label>
              <Input 
                type="number"
                placeholder="e.g., 800"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                From work-study, part-time job, stipend, etc.
              </p>
            </div>
          </div>
          
          <Button onClick={calculateHours} className="w-full">
            Calculate Hours Needed
          </Button>

          {hoursNeeded !== null && (
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-sacred/10 rounded-lg border">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">To afford Greek life debt-free, you need:</p>
                <p className="text-4xl font-bold text-emerald-600">{hoursNeeded} hours/week</p>
                <p className="text-sm text-muted-foreground">at $12/hour average student wage</p>
              </div>
              
              {hoursNeeded > 20 && (
                <div className="mt-4 p-3 bg-amber-500/10 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
                    <p className="text-sm">
                      <strong>Warning:</strong> Working more than 20 hours/week while in school can hurt your grades. 
                      Consider waiting until you can afford it or finding a scholarship.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Biblical Debt Avoidance Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sacred" />
            Student Debt Avoidance Covenant
          </CardTitle>
          <CardDescription>
            Biblical principles to keep you debt-free through college
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {checkedItems.length}/{debtAvoidanceChecklist.length} completed
            </span>
          </div>
          <Progress value={checklistProgress} className="h-2 mb-4" />

          <div className="space-y-3">
            {debtAvoidanceChecklist.map((item) => (
              <div 
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toggleChecklist(item.id)}
              >
                <Checkbox 
                  checked={checkedItems.includes(item.id)}
                  onCheckedChange={() => toggleChecklist(item.id)}
                />
                <div className="flex-1">
                  <p className={`text-sm ${checkedItems.includes(item.id) ? "line-through text-muted-foreground" : ""}`}>
                    {item.label}
                  </p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {item.scripture}
                  </Badge>
                </div>
                {checkedItems.includes(item.id) && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
              </div>
            ))}
          </div>

          {checklistProgress === 100 && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold">Debt-Free Mindset Achieved!</p>
              <p className="text-sm text-muted-foreground">
                You're equipped to navigate college and Greek life without financial bondage.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Fund Priority */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            Before You Pledge: The $500 Rule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-emerald-500/10">
            <p className="text-center font-semibold text-lg mb-2">
              "The wise store up choice food and olive oil, but fools gulp theirs down."
            </p>
            <p className="text-center text-sm text-muted-foreground">— Proverbs 21:20</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                Why $500 First?
              </h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Covers most unexpected expenses</li>
                <li>• Prevents credit card "emergencies"</li>
                <li>• Builds financial confidence</li>
                <li>• Proves discipline before bigger commitments</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-sacred" />
                How to Save $500 Fast
              </h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Sell textbooks/unused items: $50-200</li>
                <li>• Skip eating out for 1 month: $100-200</li>
                <li>• One weekend gig/tutoring: $100-150</li>
                <li>• Cancel subscriptions: $30-50/month</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-sacred/10 border border-sacred/20 rounded-lg">
            <div className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 text-sacred mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Biblical Truth</h4>
                <p className="text-sm text-muted-foreground">
                  If you can't save $500 before joining an organization, you're not ready for the financial 
                  responsibilities of membership. Greek life should enhance your life, not put you in bondage.
                  "Count the cost before building" (Luke 14:28).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
