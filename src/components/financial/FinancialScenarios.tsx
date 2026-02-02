import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  GraduationCap,
  Briefcase,
  Heart,
  TrendingDown,
  TrendingUp,
  DollarSign
} from "lucide-react";

interface Scenario {
  title: string;
  icon: React.ReactNode;
  situation: string;
  mistake: string;
  biblicalWisdom: string;
  solution: string;
  outcome: string;
}

const scenarios: Scenario[] = [
  {
    title: "The Convention Trap",
    icon: <Users className="w-5 h-5" />,
    situation: "Marcus, a 3rd-year Kappa, earns $3,200/month. National Convention is in Vegas, and everyone is going. Total cost: $1,800 (flight, hotel, registration, events).",
    mistake: "He puts it all on credit cards, planning to 'pay it off later.' Six months later, with 24% interest, he now owes $2,100 and is making minimum payments.",
    biblicalWisdom: '"The rich rule over the poor, and the borrower is slave to the lender" — Proverbs 22:7',
    solution: "Start a dedicated 'Convention Fund' 12 months ahead. Save $150/month = $1,800 by convention time. If you can't save enough, skip this year or attend virtually.",
    outcome: "Marcus could have enjoyed convention debt-free AND had money for the next one already started."
  },
  {
    title: "The Paraphernalia Pressure",
    icon: <Heart className="w-5 h-5" />,
    situation: "Jasmine just crossed Delta and wants to represent. She sees sorors with custom jackets ($300), Greek sneakers ($200), jewelry ($150), and designer bags with letters ($400+).",
    mistake: "She spends $1,200 in her first month on paraphernalia using Buy Now Pay Later apps. Now she has 4 different payment plans eating $200/month.",
    biblicalWisdom: '"Do not wear yourself out to get rich; do not trust your own cleverness" — Proverbs 23:4',
    solution: "Budget $50/month for paraphernalia. Start with essentials (letters, basic shirt). Build your collection over years, not weeks. Quality over quantity.",
    outcome: "In 2 years, Jasmine would have $1,200 in paraphernalia she truly loves—without debt stress."
  },
  {
    title: "The Student Loan Surprise",
    icon: <GraduationCap className="w-5 h-5" />,
    situation: "DeShawn graduated with $45,000 in student loans and a $52,000/year job. Monthly take-home: $3,400. Student loan payment: $450/month.",
    mistake: "He maintains his college lifestyle—eating out, new clothes, Greek events—spending $3,300/month. Only $100 goes to savings. One car repair puts him $800 in credit card debt.",
    biblicalWisdom: '"Suppose one of you wants to build a tower. Won\'t you first sit down and estimate the cost?" — Luke 14:28',
    solution: "Live on a tight budget for 2-3 years post-graduation. Pay $800/month on loans instead of $450. Build 3-month emergency fund first.",
    outcome: "With $800/month payments, DeShawn pays off loans in 5 years instead of 10, saving $12,000+ in interest."
  },
  {
    title: "The Wedding Debt Disaster",
    icon: <Heart className="w-5 h-5" />,
    situation: "Brittany and James are getting married. As Greeks, they want a beautiful wedding with step shows, strolling, and their chapters represented. Dream budget: $35,000.",
    mistake: "They finance everything—venue, photographer, DJ, decorations. They start marriage with $28,000 in new debt on top of existing student loans.",
    biblicalWisdom: '"The wise store up choice food and olive oil, but fools gulp theirs down" — Proverbs 21:20',
    solution: "Plan a 2-year engagement and save $1,000/month. Set a cash-only budget of $15,000. Prioritize what matters most to you both.",
    outcome: "A debt-free wedding sets the foundation for a financially healthy marriage. Less stress, more joy."
  },
  {
    title: "The Career Upgrade",
    icon: <Briefcase className="w-5 h-5" />,
    situation: "Keisha gets a promotion: $55K to $72K. Her monthly take-home increases by $950. Finally, she can 'live a little.'",
    mistake: "She upgrades her apartment ($400 more), gets a new car ($350 payment), and starts eating out more. Her lifestyle inflates to match her income. Savings: still $0.",
    biblicalWisdom: '"Whoever loves money never has enough; whoever loves wealth is never satisfied" — Ecclesiastes 5:10',
    solution: "Keep living on the old salary. Direct 70% of the raise to debt payoff and savings. Allow 30% for lifestyle improvement.",
    outcome: "In 2 years: $16,000 in savings/investments. Same contentment. Financial security."
  },
  {
    title: "The Foundation Member",
    icon: <DollarSign className="w-5 h-5" />,
    situation: "Anthony wants to help charter a new graduate chapter of Alpha. Start-up costs include $2,500 chartering fees plus $1,500 in initial expenses he's expected to cover.",
    mistake: "He uses his emergency fund ($3,000) for chapter expenses, leaving nothing for emergencies. When his transmission fails 3 months later, he has to use high-interest credit.",
    biblicalWisdom: '"In the house of the wise are stores of choice food and oil, but a foolish man devours all he has" — Proverbs 21:20',
    solution: "Wait until you can afford chapter expenses WITHOUT touching emergency fund. Or negotiate a payment plan with the region.",
    outcome: "True leadership includes financial wisdom. A chapter built on members in debt won't thrive long-term."
  }
];

const pitfalls = [
  {
    title: "Keeping Up With Greek Joneses",
    description: "Comparing your paraphernalia, car, or lifestyle to other members",
    warning: "Social media only shows highlights. Many 'successful-looking' Greeks are drowning in debt.",
    scripture: "Galatians 6:4 — 'Each one should test their own actions... without comparing themselves to someone else.'"
  },
  {
    title: "Emotional Spending After Events",
    description: "Buying things to feel better after step shows, conventions, or reunions",
    warning: "The 'high' of Greek events can trigger impulse purchases. Wait 48 hours before buying.",
    scripture: "Proverbs 14:29 — 'Whoever is patient has great understanding, but one who is quick-tempered displays folly.'"
  },
  {
    title: "Ignoring Dues When Money Is Tight",
    description: "Skipping payments instead of communicating with chapter leadership",
    warning: "Unpaid dues create shame and isolation. Most chapters will work with you—ask.",
    scripture: "Proverbs 28:13 — 'Whoever conceals their sins does not prosper, but the one who confesses and renounces them finds mercy.'"
  },
  {
    title: "The 'I Deserve It' Mentality",
    description: "Justifying purchases because of hard work, stress, or past sacrifices",
    warning: "You deserve financial peace more than you deserve another purchase.",
    scripture: "1 Timothy 6:6-8 — 'Godliness with contentment is great gain... if we have food and clothing, we will be content.'"
  },
  {
    title: "Not Talking About Money",
    description: "Avoiding financial discussions with partners, family, or accountability partners",
    warning: "Silence breeds shame and poor decisions. Money needs accountability.",
    scripture: "Proverbs 15:22 — 'Plans fail for lack of counsel, but with many advisers they succeed.'"
  },
  {
    title: "Emergency Fund Raids",
    description: "Using emergency savings for Greek expenses or 'can't miss' opportunities",
    warning: "Emergencies will happen. Without a fund, credit cards become your backup.",
    scripture: "Proverbs 27:12 — 'The prudent see danger and take refuge, but the simple keep going and pay the penalty.'"
  }
];

export const FinancialScenarios = () => {
  return (
    <div className="space-y-6">
      {/* Real-World Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Real-World Scenarios
          </CardTitle>
          <CardDescription>
            Learn from these common situations faced by Black Greeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {scenarios.map((scenario, index) => (
              <AccordionItem key={index} value={`scenario-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {scenario.icon}
                    </div>
                    <span>{scenario.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="grid gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <h5 className="font-semibold text-sm mb-1 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        The Situation
                      </h5>
                      <p className="text-sm text-muted-foreground">{scenario.situation}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <h5 className="font-semibold text-sm mb-1 flex items-center gap-2 text-destructive">
                        <TrendingDown className="w-4 h-4" />
                        The Mistake
                      </h5>
                      <p className="text-sm">{scenario.mistake}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-sacred/10 border border-sacred/20">
                      <h5 className="font-semibold text-sm mb-1 flex items-center gap-2 text-sacred">
                        <Heart className="w-4 h-4" />
                        Biblical Wisdom
                      </h5>
                      <p className="text-sm italic">{scenario.biblicalWisdom}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <h5 className="font-semibold text-sm mb-1 flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        The Wise Solution
                      </h5>
                      <p className="text-sm">{scenario.solution}</p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h5 className="font-semibold text-sm mb-1 flex items-center gap-2 text-blue-600">
                        <CheckCircle2 className="w-4 h-4" />
                        The Outcome
                      </h5>
                      <p className="text-sm">{scenario.outcome}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Common Pitfalls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common Financial Pitfalls
          </CardTitle>
          <CardDescription>
            Traps that catch even the most well-intentioned Greeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {pitfalls.map((pitfall, index) => (
              <Card key={index} className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="pt-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    {pitfall.title}
                  </h4>
                  <p className="text-sm mb-2">{pitfall.description}</p>
                  <div className="p-2 rounded bg-background/50 mb-2">
                    <p className="text-xs text-amber-600 font-medium">⚠️ {pitfall.warning}</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{pitfall.scripture}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Framework */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            The Turnaround Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-emerald-600 mb-1">1</div>
              <h5 className="font-semibold text-sm">Acknowledge</h5>
              <p className="text-xs text-muted-foreground">Face your current situation honestly. Know your numbers.</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-emerald-600 mb-1">2</div>
              <h5 className="font-semibold text-sm">Commit</h5>
              <p className="text-xs text-muted-foreground">Make a firm decision. Tell someone. Write it down.</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-emerald-600 mb-1">3</div>
              <h5 className="font-semibold text-sm">Execute</h5>
              <p className="text-xs text-muted-foreground">Follow the plan daily. Small steps compound.</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-emerald-600 mb-1">4</div>
              <h5 className="font-semibold text-sm">Testify</h5>
              <p className="text-xs text-muted-foreground">Share your journey. Help others do the same.</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4 italic">
            "I can do all things through Christ who strengthens me" — Philippians 4:13
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
