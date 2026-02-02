import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Target,
  Sparkles,
  Award,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home as HomeIcon,
  LineChart,
  Volume2,
  Pause,
  Play,
  Loader2,
  AlertTriangle,
  Lightbulb,
  Wrench,
  MessageSquare,
  Save,
  ExternalLink
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useGamification } from "@/hooks/use-gamification";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

interface CourseModule {
  id: number;
  title: string;
  description: string;
  scripture: string;
  scriptureText: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
  scenarios: {
    title: string;
    situation: string;
    solution: string;
  }[];
  pitfalls: string[];
  tools: {
    name: string;
    description: string;
    link?: string;
  }[];
  reflectionPrompt: string;
  points: number;
}

const courseModules: CourseModule[] = [
  {
    id: 50,
    title: "Biblical Foundation of Money",
    description: "Understanding God's perspective on wealth and stewardship",
    scripture: "Proverbs 22:7",
    scriptureText: "The rich rule over the poor, and the borrower is slave to the lender.",
    icon: BookOpen,
    content: [
      "The Bible contains over 2,300 verses about money and possessions - more than faith and prayer combined",
      "God owns everything; we are stewards entrusted with His resources (Psalm 24:1)",
      "Money is a tool for kingdom purposes, not an idol to be worshipped (Matthew 6:24)",
      "The borrower is slave to the lender - debt limits your freedom and options (Proverbs 22:7)"
    ],
    scenarios: [
      {
        title: "The New Graduate",
        situation: "Marcus just graduated and got his first job making $50,000. He's tempted to buy a new car, upgrade his apartment, and start 'living his best life' like his social media feed suggests.",
        solution: "Before lifestyle inflation hits, Marcus should establish his 10/15/10/65 plan immediately. Living on 65% while building savings will set him up for generational wealth, not generational debt."
      },
      {
        title: "The Greek Leader",
        situation: "Jasmine is chapter president and feels pressure to always have the latest paraphernalia and attend every conference, even though she's already carrying $8,000 in credit card debt.",
        solution: "True leadership means modeling financial wisdom. Jasmine can lead by being transparent about prioritizing debt payoff while still serving her chapter creatively within her means."
      }
    ],
    pitfalls: [
      "Believing you deserve things you can't afford because you work hard",
      "Using credit cards as 'emergency funds' instead of building real savings",
      "Comparing your financial situation to others' curated social media lives",
      "Thinking small purchases don't matter - $5 daily = $1,825 yearly",
      "Waiting until you 'make more money' to start managing what you have"
    ],
    tools: [
      { name: "Net Worth Calculator", description: "Track your assets vs liabilities monthly", link: "/financial-stewardship" },
      { name: "Bible Money Verses", description: "Study the 2,300+ verses about finances" },
      { name: "Stewardship Assessment", description: "Evaluate your current money mindset" }
    ],
    reflectionPrompt: "What is your current relationship with money? Do you see yourself as an owner or a steward? How has debt affected your freedom?",
    points: 15
  },
  {
    id: 51,
    title: "The 10/15/10/65 Rule",
    description: "Sacred Money Spending Plan fundamentals",
    scripture: "Malachi 3:10",
    scriptureText: "Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven.",
    icon: PiggyBank,
    content: [
      "10% - Kingdom Giving: Honor God first with your tithe before any other allocation",
      "15% - Savings: Build your emergency fund and save for future goals",
      "10% - Investing: Grow wealth through consistent, long-term investment",
      "65% - Living Expenses: Cover all needs and some wants within this boundary"
    ],
    scenarios: [
      {
        title: "Making It Work on $35,000",
        situation: "DeShawn earns $35,000/year ($2,917 monthly take-home). He thinks the 10/15/10/65 rule is only for high earners.",
        solution: "Monthly breakdown: $292 tithe, $437 savings, $292 investing, $1,896 living. It's tight but doable. Starting these habits NOW means when income increases, wealth builds automatically."
      },
      {
        title: "The Six-Figure Trap",
        situation: "Keisha makes $120,000 but lives paycheck to paycheck. Higher income led to higher lifestyle - luxury apartment, car payment, designer clothes.",
        solution: "Income isn't wealth. Reset to 10/15/10/65 based on her $7,500 monthly take-home. That's $750 tithe, $1,125 savings, $750 investing, $4,875 living. Time to downgrade the lifestyle to upgrade her future."
      }
    ],
    pitfalls: [
      "Tithing last instead of first - what's left over rarely makes it to the offering",
      "Combining savings and investing into one category",
      "Borrowing from savings for non-emergencies",
      "Not adjusting percentages when income changes significantly",
      "Giving up when you can't hit perfect percentages immediately"
    ],
    tools: [
      { name: "SMSP Calculator", description: "Sacred Money Spending Plan budget tool", link: "/financial-stewardship" },
      { name: "Percentage Tracker", description: "Monitor your actual spending ratios" },
      { name: "Income Allocation App", description: "Automate your money splits" }
    ],
    reflectionPrompt: "What would your life look like if you consistently followed 10/15/10/65? What's the biggest obstacle preventing you from starting?",
    points: 15
  },
  {
    id: 52,
    title: "Breaking the Debt Cycle",
    description: "Strategies for becoming debt-free",
    scripture: "Romans 13:8",
    scriptureText: "Let no debt remain outstanding, except the continuing debt to love one another.",
    icon: CreditCard,
    content: [
      "Understand the true cost of debt: A $5,000 balance at 24% APR takes 27 years to pay off with minimum payments",
      "Debt Snowball: Pay smallest debts first for psychological wins and momentum",
      "Debt Avalanche: Pay highest interest rates first to minimize total interest paid",
      "Avoid the 'minimum payment trap' - it's designed to keep you in debt for decades"
    ],
    scenarios: [
      {
        title: "The Credit Card Juggler",
        situation: "Anthony has 4 credit cards: $500 (15% APR), $2,000 (22% APR), $5,000 (19% APR), $3,000 (24% APR). He's been paying minimums for years.",
        solution: "Using Debt Snowball: Attack the $500 first while paying minimums on others. That quick win motivates the next. Using Avalanche: Attack the $3,000 at 24% first to save the most interest. Choose based on what keeps YOU motivated."
      },
      {
        title: "Student Loan Reality",
        situation: "Brittany has $45,000 in student loans at 6.8% interest. She feels hopeless and has been on income-driven repayment for 5 years, watching the balance grow.",
        solution: "Time to get intense. Brittany needs to calculate what aggressive payoff looks like - $1,000/month for 4.5 years. Side hustles, lifestyle cuts, and laser focus can make her debt-free by 30 instead of 50."
      }
    ],
    pitfalls: [
      "Paying off debt while continuing to use credit cards",
      "Not having a small emergency fund first (you'll just go back into debt)",
      "Consolidating debt without addressing spending habits",
      "Taking out loans to pay off loans without a payoff plan",
      "Feeling shame and hiding from your debt instead of facing it"
    ],
    tools: [
      { name: "Debt Payoff Calculator", description: "Compare snowball vs avalanche methods", link: "/financial-stewardship" },
      { name: "Credit Report Access", description: "AnnualCreditReport.com - free yearly", link: "https://www.annualcreditreport.com" },
      { name: "Debt Tracking Spreadsheet", description: "Monitor balances and progress monthly" }
    ],
    reflectionPrompt: "List all your current debts with balances and interest rates. Which payoff method resonates with your personality - snowball or avalanche? Why?",
    points: 15
  },
  {
    id: 53,
    title: "Emergency Fund Essentials",
    description: "Building your financial safety net",
    scripture: "Proverbs 21:20",
    scriptureText: "The wise store up choice food and olive oil, but fools gulp theirs down.",
    icon: Target,
    content: [
      "Start with a $1,000 starter emergency fund as your first financial goal",
      "Build to 3-6 months of expenses once debt-free (6+ months if self-employed)",
      "Keep it accessible in a high-yield savings account but separate from checking",
      "Only use for TRUE emergencies: job loss, medical crisis, car breakdown - not sales or wants"
    ],
    scenarios: [
      {
        title: "The Car Breakdown",
        situation: "Terrence's car needs $1,200 in repairs. Without an emergency fund, he'd put it on a credit card at 24% interest.",
        solution: "With his $1,500 emergency fund, Terrence pays cash, then rebuilds the fund over 3 months. He avoided $288+ in interest and the stress of more debt."
      },
      {
        title: "Job Loss",
        situation: "Maya unexpectedly loses her job. Her monthly expenses are $3,500. She has $15,000 in emergency savings.",
        solution: "Maya has over 4 months of runway. She can job search strategically instead of panic-accepting a bad fit. She also cuts expenses to $2,800/month, extending her runway to 5+ months."
      }
    ],
    pitfalls: [
      "Keeping emergency fund in checking where it gets spent accidentally",
      "Using it for wants disguised as needs (that sale isn't an emergency)",
      "Not replenishing it immediately after use",
      "Keeping it in investments where it could lose value when you need it",
      "Skipping the emergency fund to pay off debt faster (you'll just go back into debt)"
    ],
    tools: [
      { name: "High-Yield Savings Finder", description: "Compare rates at Bankrate or NerdWallet", link: "https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/" },
      { name: "Emergency Fund Calculator", description: "Calculate your target amount" },
      { name: "Automatic Transfer Setup", description: "Pay yourself first every payday" }
    ],
    reflectionPrompt: "What would change in your life if you had 3-6 months of expenses saved? How would it affect your peace of mind and decision-making?",
    points: 15
  },
  {
    id: 54,
    title: "Smart Spending Habits",
    description: "Aligning purchases with values",
    scripture: "Proverbs 21:5",
    scriptureText: "The plans of the diligent lead to profit as surely as haste leads to poverty.",
    icon: TrendingUp,
    content: [
      "The 24-hour rule: Wait 24 hours (or 72 for big purchases) before buying non-essentials",
      "Needs vs wants assessment: Ask 'Will this matter in 5 years?' before purchasing",
      "Create a spending plan that reflects your values, not society's expectations",
      "Track every dollar with an app or spreadsheet - awareness changes behavior"
    ],
    scenarios: [
      {
        title: "The Impulse Shopper",
        situation: "Tameka finds herself with Amazon packages arriving daily. She estimates she spends $400/month on things she forgets she bought.",
        solution: "Remove saved payment info, delete shopping apps, implement 72-hour rule. Redirect that $400/month to debt payoff or investing = $4,800/year toward actual goals."
      },
      {
        title: "Lifestyle Creep",
        situation: "Jerome got a $15,000 raise but somehow still feels broke. His new car payment, upgraded apartment, and dining habits absorbed it all.",
        solution: "The 50% rule: When income increases, save/invest at least 50% of the raise before lifestyle expands. Jerome should have directed $7,500/year to wealth-building."
      }
    ],
    pitfalls: [
      "Retail therapy - using shopping to deal with emotions",
      "Subscription creep - small monthly charges adding up to hundreds",
      "Social spending pressure - keeping up with friends' lifestyles",
      "Sale mentality - buying things because they're 'on sale' not because you need them",
      "Convenience spending - paying premium for things you could do yourself"
    ],
    tools: [
      { name: "Spending Tracker", description: "Apps like Mint, YNAB, or EveryDollar" },
      { name: "Subscription Audit", description: "Review and cancel unused subscriptions" },
      { name: "Values-Based Budget", description: "Align spending with what truly matters" }
    ],
    reflectionPrompt: "Look at your last month's spending. What purchases brought lasting value? What purchases do you regret? What patterns do you notice?",
    points: 15
  },
  {
    id: 55,
    title: "Investing Fundamentals",
    description: "Growing wealth God's way",
    scripture: "Ecclesiastes 11:2",
    scriptureText: "Invest in seven ventures, yes, in eight; you do not know what disaster may come upon the land.",
    icon: LineChart,
    content: [
      "Start early: $200/month from age 25 at 7% = $525,000 by 65. Starting at 35 = only $244,000",
      "Diversification: Don't put all eggs in one basket - spread across asset classes",
      "Retirement accounts: 401(k) with employer match is free money - never leave it on the table",
      "Avoid get-rich-quick schemes: If it sounds too good to be true, it is"
    ],
    scenarios: [
      {
        title: "The Late Starter",
        situation: "Kevin is 40 and has nothing saved for retirement. He feels it's too late to start.",
        solution: "It's NEVER too late. $500/month from 40-65 at 7% = $379,000. Max out catch-up contributions after 50. Kevin can still build significant wealth with discipline and time."
      },
      {
        title: "The Crypto FOMO",
        situation: "Destiny keeps hearing about friends making money in crypto and meme stocks. She's tempted to put her emergency fund into Bitcoin.",
        solution: "Speculative assets shouldn't exceed 5-10% of investments, NEVER emergency funds. Destiny should max her 401(k) match first, build her investment foundation, then allocate 'fun money' for speculation if desired."
      }
    ],
    pitfalls: [
      "Not starting because you don't understand everything - start simple with target-date funds",
      "Trying to time the market instead of consistent investing",
      "Paying high fees that eat into returns - index funds often beat managed funds",
      "Checking investments too often and making emotional decisions",
      "Ignoring tax-advantaged accounts for taxable brokerage accounts"
    ],
    tools: [
      { name: "Compound Interest Calculator", description: "See the power of starting early" },
      { name: "401(k) Comparison Tool", description: "Understand your employer's plan" },
      { name: "Investment Fee Analyzer", description: "Calculate how fees impact your returns" }
    ],
    reflectionPrompt: "If you started investing $100/month today, where would you be in 20 years? What's stopping you from starting? What can you automate?",
    points: 15
  },
  {
    id: 56,
    title: "Building Toward Homeownership",
    description: "The path to owning your home",
    scripture: "Proverbs 24:27",
    scriptureText: "Put your outdoor work in order and get your fields ready; after that, build your house.",
    icon: HomeIcon,
    content: [
      "Save 20% down payment to avoid PMI (Private Mortgage Insurance)",
      "Understand mortgage options: Fixed vs ARM, 15-year vs 30-year terms",
      "First-time buyer programs: HUD, NACA, VA loans offer significant benefits",
      "Avoid predatory lending: If a deal seems rushed or pressure-filled, walk away"
    ],
    scenarios: [
      {
        title: "The Rent vs Buy Decision",
        situation: "Aaliyah pays $1,500/month rent and wonders if she should buy. She has $10,000 saved but also $15,000 in debt.",
        solution: "Not ready yet. Aaliyah should pay off debt first, then save 20% down payment + 3-6 months expenses + closing costs (3-5% of home price). Rushing into homeownership with debt is a recipe for foreclosure."
      },
      {
        title: "The Down Payment Assistance Path",
        situation: "Marcus and his wife have great jobs, no debt, and $30,000 saved. They're eyeing a $250,000 home but feel they need $50,000 down.",
        solution: "Explore NACA (0% down, no PMI), state first-time buyer programs, and FHA loans (3.5% down). With their financial position, they may qualify for programs that make homeownership accessible now while they continue building wealth."
      }
    ],
    pitfalls: [
      "Buying too much house - keep mortgage payment under 25% of take-home pay",
      "Forgetting about maintenance costs - budget 1-2% of home value annually",
      "Skipping the home inspection to save money",
      "Using all savings for down payment with nothing left for emergencies",
      "Adjustable rate mortgages when you can't afford the potential rate increase"
    ],
    tools: [
      { name: "HUD Resources", description: "Housing counseling and buyer programs", link: "https://www.hud.gov/topics/buying_a_home" },
      { name: "NACA Program", description: "No down payment, no closing costs", link: "https://www.naca.com" },
      { name: "Mortgage Calculator", description: "Calculate true monthly costs including taxes/insurance" }
    ],
    reflectionPrompt: "Is homeownership the right next step for you? What needs to be in place financially before you're truly ready? What's your timeline?",
    points: 15
  },
  {
    id: 57,
    title: "Generational Wealth",
    description: "Leaving a legacy for your children",
    scripture: "Proverbs 13:22",
    scriptureText: "A good person leaves an inheritance for their children's children.",
    icon: Award,
    content: [
      "Teach children about money early: allowance, saving, giving, and spending categories",
      "Life insurance: Term life (10-12x income) protects your family if something happens to you",
      "Estate planning: Everyone needs a will, healthcare directive, and power of attorney",
      "Break generational poverty cycles by being the generation that changes everything"
    ],
    scenarios: [
      {
        title: "Breaking the Cycle",
        situation: "Jasmine grew up in a household where money was never discussed, debt was normal, and there was never enough. She's determined her children will have a different experience.",
        solution: "Jasmine starts family money meetings, gives her kids commission-based allowance for chores, opens 529 accounts for their education, and models healthy financial conversations. She's changing her family tree."
      },
      {
        title: "The Insurance Gap",
        situation: "David is 32, married with 2 kids, earning $75,000. He has no life insurance because 'nothing will happen to me.'",
        solution: "If David passes, his family loses that income forever. A $750,000 20-year term policy might cost $35-50/month. That's the cost of protecting his family's future - non-negotiable for a provider."
      }
    ],
    pitfalls: [
      "Leaving debt instead of wealth to the next generation",
      "Whole life insurance when term life is more appropriate and affordable",
      "No will = the state decides what happens to your assets",
      "Not teaching children about money because it's 'uncomfortable'",
      "Assuming generational wealth is only for wealthy people"
    ],
    tools: [
      { name: "529 Plan Comparison", description: "College savings account options by state" },
      { name: "Term Life Calculator", description: "How much coverage do you need?" },
      { name: "Estate Planning Checklist", description: "Documents every adult needs" }
    ],
    reflectionPrompt: "What financial legacy are you building? What do you want your children or future children to learn about money? What patterns are you breaking?",
    points: 15
  },
  {
    id: 58,
    title: "Greek Life & Finances",
    description: "Managing fraternity/sorority costs",
    scripture: "Luke 14:28",
    scriptureText: "Suppose one of you wants to build a tower. Won't you first sit down and estimate the cost?",
    icon: DollarSign,
    content: [
      "Budget for dues and fees BEFORE you join: Membership costs $500-$2,000+ annually",
      "Convention and conference costs: Regional/national events can cost $500-$2,000 per trip",
      "Paraphernalia without debt: Save for items instead of charging them",
      "Financial accountability as a leader: Model stewardship for your chapter"
    ],
    scenarios: [
      {
        title: "The Eager Pledge",
        situation: "Terrell is excited to join his organization but hasn't considered the full cost. Initiation fees, dues, event costs, and paraphernalia could total $3,000 in his first year.",
        solution: "Count the cost before committing. Terrell should save at least 50% before initiating, create a monthly Greek budget, and communicate with chapter about payment plans. Never start Greek life in debt."
      },
      {
        title: "The Chapter Treasurer",
        situation: "Nicole is chapter treasurer and notices many sorors are behind on dues, affecting chapter operations and her personal frustration.",
        solution: "Implement payment plans, educate members on budgeting for Greek obligations, and create a financial wellness program. Nicole can turn this challenge into a chapter-wide growth opportunity."
      }
    ],
    pitfalls: [
      "Putting Greek dues on credit cards and paying interest for years",
      "Attending every event regardless of cost",
      "Buying paraphernalia before securing financial stability",
      "Peer pressure to spend beyond your means to 'represent'",
      "Choosing organization based on status instead of true fit and affordability"
    ],
    tools: [
      { name: "Greek Budget Calculator", description: "Annual D9 membership cost estimator", link: "/financial-stewardship" },
      { name: "Conference Savings Plan", description: "12-month savings for annual events" },
      { name: "Paraphernalia Tracker", description: "Save for items without debt" }
    ],
    reflectionPrompt: "How much do you spend annually on Greek life? Is that amount sustainable and aligned with your financial goals? What boundaries do you need to set?",
    points: 15
  },
  {
    id: 59,
    title: "Generous Living",
    description: "The joy of biblical giving",
    scripture: "2 Corinthians 9:7",
    scriptureText: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    icon: Sparkles,
    content: [
      "Giving beyond the tithe: Offerings, alms, and generosity demonstrate trust in God's provision",
      "Support your local church: The tithe belongs to your spiritual home first",
      "Charitable giving strategies: Donor-advised funds, appreciated stock gifts, legacy giving",
      "Teach generosity to the next generation: Model open-handed living"
    ],
    scenarios: [
      {
        title: "The Generous Giver",
        situation: "Patricia tithes consistently but feels called to give more. She's not sure how to increase giving without jeopardizing her family's finances.",
        solution: "Patricia can create an 'offerings' line in her budget - even $50/month for spontaneous giving. She can also give time and skills. As her income grows, she increases her giving percentage, building toward the goal of reverse tithing (living on 10%, giving 90%)."
      },
      {
        title: "The Strategic Giver",
        situation: "William received a large bonus and wants to give significantly but also wants to maximize the impact and tax benefit.",
        solution: "William opens a Donor-Advised Fund, contributes appreciated stock (avoiding capital gains), and recommends grants to his church and favorite ministries over time. Strategic giving multiplies impact."
      }
    ],
    pitfalls: [
      "Giving to look good instead of from a cheerful heart",
      "Neglecting local church for trendy causes",
      "Giving beyond your means and creating resentment",
      "Tax deduction as primary motivation instead of kingdom impact",
      "Not researching charities to ensure they're effective"
    ],
    tools: [
      { name: "Charity Navigator", description: "Research nonprofit effectiveness", link: "https://www.charitynavigator.org" },
      { name: "Donor-Advised Fund Info", description: "Strategic giving vehicles" },
      { name: "Giving Calculator", description: "Plan annual charitable contributions" }
    ],
    reflectionPrompt: "How has generosity impacted your life? What would it look like to grow in giving over the next year? What's holding you back from greater generosity?",
    points: 15
  },
  {
    id: 60,
    title: "Financial Freedom Declaration",
    description: "Commitment to lifelong stewardship",
    scripture: "Galatians 5:1",
    scriptureText: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.",
    icon: CheckCircle2,
    content: [
      "Review your financial goals: Write specific, measurable targets with deadlines",
      "Create an accountability plan: Find a money mentor, join a financial community",
      "Declare financial freedom over your life: Speak it, believe it, work toward it",
      "Continue the journey with community support: You're not meant to do this alone"
    ],
    scenarios: [
      {
        title: "The Accountability Partnership",
        situation: "Chris knows what to do but struggles with follow-through. He starts strong but loses momentum within weeks.",
        solution: "Chris finds an accountability partner from his fraternity - they meet monthly to review budgets, celebrate wins, and course-correct. The brotherhood connection keeps him on track."
      },
      {
        title: "The Freedom Declaration",
        situation: "Monica has completed this course and transformed her finances. She wants to help others but doesn't know where to start.",
        solution: "Monica becomes a financial mentor in her sorority, leads a Sacred Money small group, and shares her story publicly. Her transformation ripples outward, impacting generations."
      }
    ],
    pitfalls: [
      "Finishing the course but not implementing the lessons",
      "Trying to change everything at once instead of one step at a time",
      "Going back to old habits when life gets stressful",
      "Keeping your financial journey private instead of building community",
      "Defining freedom as 'spending whatever you want' instead of 'peace and purpose'"
    ],
    tools: [
      { name: "Financial Goal Template", description: "SMART goals for money", link: "/financial-stewardship" },
      { name: "Accountability Partner Guide", description: "How to find and work with a mentor" },
      { name: "Sacred Money Community", description: "Connect with fellow stewards" }
    ],
    reflectionPrompt: "Write your Financial Freedom Declaration below. What specific commitments are you making? Who will hold you accountable? What will your life look like when you achieve financial freedom?",
    points: 20
  }
];

export default function SacredMoneyCourse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { awardPoints } = useGamification();
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading } = useTextToSpeech();
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [reflection, setReflection] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["content", "scenarios", "pitfalls", "tools"]));

  // Fetch completed modules
  const { data: completedModules = [] } = useQuery({
    queryKey: ['sacred-money-progress', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('study_session_progress')
        .select('session_id')
        .eq('user_id', user.id)
        .gte('session_id', 50)
        .lte('session_id', 60)
        .eq('completed', true);
      
      if (error) throw error;
      return data?.map(d => d.session_id) || [];
    },
    enabled: !!user?.id
  });

  // Fetch saved reflection for module
  const { data: savedReflection } = useQuery({
    queryKey: ['sacred-money-reflection', user?.id, selectedModule?.id],
    queryFn: async () => {
      if (!user?.id || !selectedModule?.id) return null;
      const { data, error } = await supabase
        .from('study_session_progress')
        .select('notes')
        .eq('user_id', user.id)
        .eq('session_id', selectedModule.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data?.notes || "";
    },
    enabled: !!user?.id && !!selectedModule?.id
  });

  // Update local reflection when saved data loads
  useEffect(() => {
    if (savedReflection !== undefined && savedReflection !== null) {
      setReflection(savedReflection);
    } else {
      setReflection("");
    }
  }, [savedReflection, selectedModule?.id]);

  // Save reflection mutation
  const saveReflection = useMutation({
    mutationFn: async () => {
      if (!user?.id || !selectedModule?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('study_session_progress')
        .upsert({
          user_id: user.id,
          session_id: selectedModule.id,
          notes: reflection,
          completed: completedModules.includes(selectedModule.id)
        }, {
          onConflict: 'user_id,session_id'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Reflection saved!');
      queryClient.invalidateQueries({ queryKey: ['sacred-money-reflection'] });
    },
    onError: () => {
      toast.error('Failed to save reflection');
    }
  });

  // Mark module as complete
  const completeModule = useMutation({
    mutationFn: async (moduleId: number) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('study_session_progress')
        .upsert({
          user_id: user.id,
          session_id: moduleId,
          completed: true,
          completed_at: new Date().toISOString(),
          notes: reflection
        }, {
          onConflict: 'user_id,session_id'
        });
      
      if (error) throw error;
      return moduleId;
    },
    onSuccess: (moduleId) => {
      const module = courseModules.find(m => m.id === moduleId);
      if (module) {
        awardPoints({ points: module.points, actionType: `sacred_money_${moduleId}` });
      }
      queryClient.invalidateQueries({ queryKey: ['sacred-money-progress'] });
      queryClient.invalidateQueries({ queryKey: ['navigation-progress'] });
      toast.success('Module completed! Keep going!');
      setSelectedModule(null);
    }
  });

  const progress = Math.round((completedModules.length / courseModules.length) * 100);
  const totalPoints = courseModules.reduce((sum, m) => sum + m.points, 0);
  const earnedPoints = courseModules
    .filter(m => completedModules.includes(m.id))
    .reduce((sum, m) => sum + m.points, 0);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleTTSClick = (text: string, itemId: string, title: string) => {
    if (isPlaying === itemId) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text, itemId, "onwK4e9ZLuTAKqWW03F9", title); // Daniel voice
    }
  };

  const getModuleNarration = (module: CourseModule) => {
    return `${module.title}. ${module.description}. Scripture: ${module.scripture}. "${module.scriptureText}". Key Principles: ${module.content.join(". ")}`;
  };

  const TTSButton = ({ text, itemId, title, size = "default" }: { text: string; itemId: string; title: string; size?: "default" | "sm" }) => {
    const isActive = isPlaying === itemId;
    const loading = isLoading === itemId;
    
    return (
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : "default"}
        onClick={(e) => {
          e.stopPropagation();
          handleTTSClick(text, itemId, title);
        }}
        disabled={loading}
        className={cn(
          "gap-2",
          isActive 
            ? "bg-sacred/20 border-sacred/50 text-sacred" 
            : "border-muted-foreground/30"
        )}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isActive && !isPaused ? (
          <Pause className="w-4 h-4" />
        ) : isActive && isPaused ? (
          <Play className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
        {loading ? "Loading..." : isActive && !isPaused ? "Pause" : isActive && isPaused ? "Resume" : "Listen"}
      </Button>
    );
  };

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => {
              stop();
              setSelectedModule(null);
            }}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>

          <Card className="border-sacred/20">
            <CardHeader className="bg-gradient-to-r from-sacred/10 to-emerald-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-sacred/20 flex items-center justify-center">
                    <selectedModule.icon className="h-6 w-6 text-sacred" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedModule.title}</CardTitle>
                    <CardDescription>{selectedModule.description}</CardDescription>
                  </div>
                </div>
                <TTSButton 
                  text={getModuleNarration(selectedModule)} 
                  itemId={`module-${selectedModule.id}`}
                  title={selectedModule.title}
                />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="bg-sacred/10">
                  📖 {selectedModule.scripture}
                </Badge>
                <span className="text-sm text-muted-foreground italic">
                  "{selectedModule.scriptureText}"
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-4">
              {/* Key Principles */}
              <Collapsible 
                open={expandedSections.has("content")}
                onOpenChange={() => toggleSection("content")}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-sacred" />
                    <span className="font-semibold">Key Principles</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", expandedSections.has("content") && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-3">
                  {selectedModule.content.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Scenarios & Examples */}
              <Collapsible 
                open={expandedSections.has("scenarios")}
                onOpenChange={() => toggleSection("scenarios")}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold">Scenarios & Examples</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", expandedSections.has("scenarios") && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  {selectedModule.scenarios.map((scenario, idx) => (
                    <Card key={idx} className="border-emerald-500/20">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{scenario.title}</CardTitle>
                          <TTSButton 
                            text={`${scenario.title}. Situation: ${scenario.situation}. Solution: ${scenario.solution}`}
                            itemId={`scenario-${selectedModule.id}-${idx}`}
                            title={scenario.title}
                            size="sm"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Situation:</p>
                          <p className="text-sm">{scenario.situation}</p>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-emerald-600 mb-1">Solution:</p>
                          <p className="text-sm">{scenario.solution}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Pitfalls to Avoid */}
              <Collapsible 
                open={expandedSections.has("pitfalls")}
                onOpenChange={() => toggleSection("pitfalls")}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="font-semibold">Pitfalls to Avoid</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", expandedSections.has("pitfalls") && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="space-y-2">
                    {selectedModule.pitfalls.map((pitfall, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <span className="text-sm">{pitfall}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Tools & Resources */}
              <Collapsible 
                open={expandedSections.has("tools")}
                onOpenChange={() => toggleSection("tools")}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Tools & Resources</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", expandedSections.has("tools") && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedModule.tools.map((tool, idx) => (
                      <Card key={idx} className="border-blue-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-sm">{tool.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                            </div>
                            {tool.link && (
                              tool.link.startsWith('http') ? (
                                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="sm" className="shrink-0">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </a>
                              ) : (
                                <Link to={tool.link}>
                                  <Button variant="ghost" size="sm" className="shrink-0">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </Link>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Reflection Area */}
              <Card className="border-sacred/30 bg-sacred/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-sacred" />
                      <CardTitle className="text-base">Your Reflection</CardTitle>
                    </div>
                    <TTSButton 
                      text={`Reflection prompt: ${selectedModule.reflectionPrompt}`}
                      itemId={`reflection-${selectedModule.id}`}
                      title="Reflection Prompt"
                      size="sm"
                    />
                  </div>
                  <CardDescription className="italic">
                    "{selectedModule.reflectionPrompt}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Write your thoughts, commitments, and action steps here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-[150px] bg-background"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => saveReflection.mutate()}
                    disabled={saveReflection.isPending || !user}
                    className="w-full sm:w-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saveReflection.isPending ? "Saving..." : "Save Reflection"}
                  </Button>
                </CardContent>
              </Card>

              {/* Complete Module Button */}
              <div className="pt-4 border-t">
                {completedModules.includes(selectedModule.id) ? (
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Module Completed!</span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => completeModule.mutate(selectedModule.id)}
                    disabled={completeModule.isPending || !user}
                    className="w-full bg-sacred hover:bg-sacred/90"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Complete (+{selectedModule.points} pts)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-sacred to-emerald-500 flex items-center justify-center">
              <DollarSign className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sacred Money Course</h1>
              <p className="text-muted-foreground">Biblical principles for financial freedom</p>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-sacred/5 to-emerald-500/5 border-sacred/20">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedModules.length}/{courseModules.length} modules
                </span>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{progress}% complete</span>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                  {earnedPoints}/{totalPoints} pts earned
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Modules */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Course Modules</h2>
          {courseModules.map((module, idx) => {
            const isCompleted = completedModules.includes(module.id);
            const isLocked = idx > 0 && !completedModules.includes(courseModules[idx - 1].id) && !isCompleted;
            
            return (
              <Card 
                key={module.id}
                className={cn(
                  "transition-all cursor-pointer hover:shadow-md",
                  isCompleted && "border-emerald-500/50 bg-emerald-500/5",
                  isLocked && "opacity-60"
                )}
                onClick={() => !isLocked && setSelectedModule(module)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      isCompleted ? "bg-emerald-500" : "bg-sacred/20"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      ) : (
                        <module.icon className="h-5 w-5 text-sacred" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{module.title}</h3>
                        {!isCompleted && (
                          <Badge variant="outline" className="text-xs shrink-0">
                            +{module.points} pts
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {module.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Link to Tools */}
        <Card className="mt-6 bg-gradient-to-r from-emerald-500/10 to-sacred/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Need Financial Tools?</h3>
                <p className="text-sm text-muted-foreground">
                  Access budget calculators, debt payoff tools, and more
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/financial-stewardship">
                  View Tools
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
