import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Shield, GraduationCap, Landmark, TrendingUp, CreditCard, 
  CheckCircle2, AlertTriangle, Target, BookOpen, Users,
  ArrowRight, Star, Lightbulb, DollarSign, Heart, FileText
} from 'lucide-react';
import { CreditRepairHub } from './CreditRepairHub';

// Credit Score Ranges
const creditRanges = [
  { label: 'Poor', range: '300–579', color: 'bg-red-500', width: 'w-[23%]', tip: 'Focus on paying bills on time and reducing collections.' },
  { label: 'Fair', range: '580–669', color: 'bg-orange-500', width: 'w-[15%]', tip: 'You\'re building! Avoid new hard inquiries and keep balances below 30%.' },
  { label: 'Good', range: '670–739', color: 'bg-yellow-500', width: 'w-[12%]', tip: 'Keep it up! Consider a credit-builder loan to diversify your mix.' },
  { label: 'Very Good', range: '740–799', color: 'bg-emerald-500', width: 'w-[10%]', tip: 'Excellent position! Maintain low utilization and long credit history.' },
  { label: 'Excellent', range: '800–850', color: 'bg-green-600', width: 'w-[8%]', tip: 'Top tier! You qualify for the best rates on everything.' },
];

// Youth Credit Challenges
const creditChallenges = [
  {
    week: 1,
    title: 'Know Your Starting Point',
    tasks: [
      'Pull your free credit report from AnnualCreditReport.com',
      'Write down your credit score (or "no score yet")',
      'List any negative items or collections',
    ],
    scripture: '"My people are destroyed for lack of knowledge." — Hosea 4:6',
  },
  {
    week: 2,
    title: 'Build the Foundation',
    tasks: [
      'Open a secured credit card ($200–$500 deposit)',
      'Set up autopay for at least the minimum payment',
      'Add yourself as an authorized user on a parent/mentor\'s card',
    ],
    scripture: '"The plans of the diligent lead surely to abundance." — Proverbs 21:5',
  },
  {
    week: 3,
    title: 'Master Utilization',
    tasks: [
      'Keep credit card balance below 10% of your limit',
      'Make a small recurring purchase (gas/subscription) on your card',
      'Pay the full balance before the statement date',
    ],
    scripture: '"The borrower is slave to the lender." — Proverbs 22:7',
  },
  {
    week: 4,
    title: 'Protect & Monitor',
    tasks: [
      'Set up free credit monitoring (Credit Karma or similar)',
      'Freeze your credit at all 3 bureaus to prevent fraud',
      'Review your report for any errors and dispute them',
    ],
    scripture: '"A prudent person foresees danger and takes precautions." — Proverbs 27:12',
  },
];

// Church Capital Campaign Phases
const campaignPhases = [
  {
    phase: 1,
    title: 'Vision Casting',
    duration: '2–4 weeks',
    icon: Lightbulb,
    steps: [
      'Define the project scope and total cost with leadership',
      'Present the vision to the congregation with biblical grounding',
      'Create a prayer team specifically for the capital campaign',
      'Set a realistic timeline (12–36 months typical)',
    ],
    tip: 'The vision should be God-sized but grounded in real numbers.',
  },
  {
    phase: 2,
    title: 'Commitment Drive',
    duration: '4–6 weeks',
    icon: Heart,
    steps: [
      'Host commitment card Sundays — members pledge monthly or one-time gifts',
      'Offer multiple giving tiers (seed, builder, cornerstone)',
      'Set up dedicated fund tracking separate from general tithes',
      'Share testimonies of generous giving from scripture and members',
    ],
    tip: 'Never pressure — let the Holy Spirit lead. "Each one must give as he has decided in his heart." (2 Cor 9:7)',
  },
  {
    phase: 3,
    title: 'Execution & Transparency',
    duration: 'Ongoing',
    icon: Target,
    steps: [
      'Publish monthly progress reports to the congregation',
      'Celebrate milestones (25%, 50%, 75%) publicly',
      'Maintain a separate bank account for capital funds',
      'Engage youth and young adults with specific fundraising projects',
    ],
    tip: 'Transparency builds trust. Show every dollar in, every dollar out.',
  },
  {
    phase: 4,
    title: 'Stewardship & Completion',
    duration: '2–4 weeks',
    icon: CheckCircle2,
    steps: [
      'Final accounting and audit of all funds raised and spent',
      'Celebration service honoring the congregation\'s faithfulness',
      'Document lessons learned for future campaigns',
      'Transition remaining pledges to ongoing stewardship',
    ],
    tip: 'A completed campaign is a testimony — share the story!',
  },
];

// Quick Links to existing tools
const quickLinks = [
  {
    title: 'Student Financial Defense',
    description: 'Avoid predatory lending & debt traps',
    tab: 'students',
    icon: GraduationCap,
    color: 'text-purple-500',
  },
  {
    title: 'Debt Freedom Calculator',
    description: 'Snowball, Avalanche & Snowflake strategies',
    tab: 'debt',
    icon: CreditCard,
    color: 'text-red-500',
  },
  {
    title: 'SMSP Budget Planner',
    description: 'Sacred Money Spending Plan calculator',
    tab: 'smsp',
    icon: DollarSign,
    color: 'text-emerald-500',
  },
];

interface SacredCapitalProps {
  onNavigateTab?: (tab: string) => void;
}

export function SacredCapital({ onNavigateTab }: SacredCapitalProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [simulatedScore, setSimulatedScore] = useState(580);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const toggleChallenge = (week: number) => {
    setCompletedChallenges(prev =>
      prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
    );
  };

  const challengeProgress = (completedChallenges.length / creditChallenges.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-emerald-500/10 border-amber-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Sacred Capital</CardTitle>
              <CardDescription>
                Credit education, youth credit-building, and church capital campaign tools
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic text-muted-foreground">
            "The rich rule over the poor, and the borrower is slave to the lender." — Proverbs 22:7
          </p>
        </CardContent>
      </Card>

      {/* Quick Links to Existing Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Your Financial Toolkit
          </CardTitle>
          <CardDescription>Quick access to tools already available in this hub</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => onNavigateTab?.(link.tab)}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-left"
              >
                <link.icon className={`w-5 h-5 mt-0.5 ${link.color}`} />
                <div>
                  <p className="font-medium text-sm">{link.title}</p>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sub-tabs for Sacred Capital sections */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <TrendingUp className="w-3.5 h-3.5" />
            Credit Basics
          </TabsTrigger>
          <TabsTrigger value="youth" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            Youth Builder
            <Badge variant="secondary" className="ml-1 text-[10px] bg-purple-500/20 text-purple-400">New</Badge>
          </TabsTrigger>
          <TabsTrigger value="church" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Landmark className="w-3.5 h-3.5" />
            Church Capital
          </TabsTrigger>
          <TabsTrigger value="repair" className="flex items-center gap-1.5 text-xs sm:text-sm">
            <FileText className="w-3.5 h-3.5" />
            Credit Repair
          </TabsTrigger>
        </TabsList>

        {/* Credit Basics Overview */}
        <TabsContent value="overview" className="space-y-6 mt-4">
          {/* Credit Score Visual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Understanding Your Credit Score</CardTitle>
              <CardDescription>Know where you stand and what it means</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                {creditRanges.map((range) => (
                  <div
                    key={range.label}
                    className={`${range.color} ${range.width} flex items-center justify-center`}
                    title={`${range.label}: ${range.range}`}
                  >
                    <span className="text-[10px] text-white font-medium hidden sm:inline">{range.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>300</span>
                <span>580</span>
                <span>670</span>
                <span>740</span>
                <span>800</span>
                <span>850</span>
              </div>

              {/* Interactive Score Simulator */}
              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
                <Label className="text-sm font-medium">Credit Score Simulator</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Slide to see what each score range unlocks
                </p>
                <Input
                  type="range"
                  min={300}
                  max={850}
                  value={simulatedScore}
                  onChange={(e) => setSimulatedScore(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-2xl font-bold">{simulatedScore}</span>
                  <Badge variant={
                    simulatedScore >= 740 ? 'default' :
                    simulatedScore >= 670 ? 'secondary' : 'destructive'
                  }>
                    {creditRanges.find(r => {
                      const [min, max] = r.range.replace('–', '-').split('-').map(Number);
                      return simulatedScore >= min && simulatedScore <= max;
                    })?.label || 'Poor'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {creditRanges.find(r => {
                    const [min, max] = r.range.replace('–', '-').split('-').map(Number);
                    return simulatedScore >= min && simulatedScore <= max;
                  })?.tip}
                </p>
              </div>

              {/* 5 Factors */}
              <div className="mt-4">
                <h4 className="font-semibold mb-3 text-sm">The 5 Factors That Determine Your Score</h4>
                <div className="space-y-3">
                  {[
                    { factor: 'Payment History', weight: 35, tip: 'Pay every bill on time, every time' },
                    { factor: 'Credit Utilization', weight: 30, tip: 'Keep balances below 30% (ideally 10%)' },
                    { factor: 'Length of History', weight: 15, tip: 'Keep old accounts open even if unused' },
                    { factor: 'Credit Mix', weight: 10, tip: 'A healthy mix of cards, loans, and installments' },
                    { factor: 'New Credit', weight: 10, tip: 'Limit hard inquiries to 1-2 per year' },
                  ].map((item) => (
                    <div key={item.factor} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.factor}</span>
                        <span className="text-muted-foreground">{item.weight}%</span>
                      </div>
                      <Progress value={item.weight} className="h-2" />
                      <p className="text-xs text-muted-foreground">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Youth Credit Builder */}
        <TabsContent value="youth" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-500" />
                    4-Week Credit Builder Challenge
                  </CardTitle>
                  <CardDescription>
                    A faith-based program for 18–25 year olds to build credit from scratch
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{completedChallenges.length}/{creditChallenges.length}</p>
                  <p className="text-xs text-muted-foreground">weeks done</p>
                </div>
              </div>
              <Progress value={challengeProgress} className="mt-3" />
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {creditChallenges.map((challenge) => (
                  <AccordionItem key={challenge.week} value={`week-${challenge.week}`} className="border rounded-lg px-3">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${completedChallenges.includes(challenge.week) 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-muted text-muted-foreground'}`}
                        >
                          {completedChallenges.includes(challenge.week) ? '✓' : challenge.week}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">Week {challenge.week}: {challenge.title}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <ul className="space-y-2 mb-4">
                        {challenge.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs italic text-muted-foreground border-l-2 border-primary/30 pl-3 mb-3">
                        {challenge.scripture}
                      </p>
                      <Button
                        size="sm"
                        variant={completedChallenges.includes(challenge.week) ? 'outline' : 'default'}
                        onClick={() => toggleChallenge(challenge.week)}
                      >
                        {completedChallenges.includes(challenge.week) ? 'Mark Incomplete' : 'Mark Complete'}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {challengeProgress === 100 && (
                <Card className="mt-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
                  <CardContent className="pt-4 text-center">
                    <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-bold text-lg">Challenge Complete! 🎉</p>
                    <p className="text-sm text-muted-foreground">
                      You've laid the foundation for a lifetime of good credit stewardship.
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Common Youth Credit Mistakes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Credit Traps to Avoid (Ages 18–25)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  { trap: 'Store credit cards with 25%+ APR', fix: 'Use a secured card from a credit union instead' },
                  { trap: 'Only paying the minimum balance', fix: 'Pay the full balance monthly — even if it means spending less' },
                  { trap: 'Co-signing loans for friends', fix: 'Protect your credit — help them find secured alternatives' },
                  { trap: 'Ignoring student loan grace periods', fix: 'Make interest payments during grace periods to prevent capitalization' },
                  { trap: 'Opening too many cards for "rewards"', fix: 'Start with 1–2 cards max for the first 2 years' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{item.trap}</p>
                        <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Church Capital Campaigns */}
        <TabsContent value="church" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-600" />
                Church Capital Campaign Playbook
              </CardTitle>
              <CardDescription>
                A 4-phase framework for faith-based fundraising — from vision to completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignPhases.map((phase) => (
                  <Card key={phase.phase} className="border-l-4 border-l-primary/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <phase.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Phase {phase.phase}: {phase.title}</h4>
                          <p className="text-xs text-muted-foreground">{phase.duration}</p>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-3">
                        {phase.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs italic text-muted-foreground bg-muted/30 p-2 rounded">
                        💡 {phase.tip}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capital Campaign Budget Template */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                Sample Capital Campaign Budget Categories
              </CardTitle>
              <CardDescription>Common line items to include in your church capital plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { category: 'Building / Renovation', example: 'Roof repair, sanctuary expansion, HVAC', pct: '60–70%' },
                  { category: 'Technology & Media', example: 'Sound system, livestream, screens', pct: '10–15%' },
                  { category: 'Ministry Programs', example: 'Youth center, community kitchen, van', pct: '10–15%' },
                  { category: 'Contingency Fund', example: 'Unexpected costs, material price changes', pct: '5–10%' },
                  { category: 'Campaign Operations', example: 'Printing, events, consulting fees', pct: '3–5%' },
                  { category: 'Debt Reduction', example: 'Paying down existing mortgage/loans', pct: 'Varies' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm">{item.category}</p>
                      <Badge variant="outline" className="text-[10px]">{item.pct}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.example}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
