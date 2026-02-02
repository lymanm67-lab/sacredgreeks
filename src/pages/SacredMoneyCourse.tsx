import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  ArrowLeft,
  ChevronRight,
  Target,
  Sparkles,
  Award,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home as HomeIcon,
  LineChart
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useGamification } from "@/hooks/use-gamification";
import { cn } from "@/lib/utils";

interface CourseModule {
  id: number;
  title: string;
  description: string;
  scripture: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
  points: number;
}

const courseModules: CourseModule[] = [
  {
    id: 50,
    title: "Biblical Foundation of Money",
    description: "Understanding God's perspective on wealth and stewardship",
    scripture: "Proverbs 22:7",
    icon: BookOpen,
    content: [
      "The Bible contains over 2,300 verses about money and possessions",
      "God owns everything; we are stewards (Psalm 24:1)",
      "Money is a tool, not an idol (Matthew 6:24)",
      "The borrower is slave to the lender (Proverbs 22:7)"
    ],
    points: 15
  },
  {
    id: 51,
    title: "The 10/15/10/65 Rule",
    description: "Sacred Money Spending Plan fundamentals",
    scripture: "Malachi 3:10",
    icon: PiggyBank,
    content: [
      "10% - Kingdom Giving (Tithe first)",
      "15% - Savings (Emergency fund & future)",
      "10% - Investing (Wealth building)",
      "65% - Living Expenses (Everything else)"
    ],
    points: 15
  },
  {
    id: 52,
    title: "Breaking the Debt Cycle",
    description: "Strategies for becoming debt-free",
    scripture: "Romans 13:8",
    icon: CreditCard,
    content: [
      "Understand the true cost of debt",
      "Debt Snowball vs Avalanche methods",
      "Creating a debt elimination timeline",
      "Avoiding the 'minimum payment trap'"
    ],
    points: 15
  },
  {
    id: 53,
    title: "Emergency Fund Essentials",
    description: "Building your financial safety net",
    scripture: "Proverbs 21:20",
    icon: Target,
    content: [
      "Start with $1,000 starter fund",
      "Build to 3-6 months of expenses",
      "Keep it accessible but separate",
      "Don't touch it except for true emergencies"
    ],
    points: 15
  },
  {
    id: 54,
    title: "Smart Spending Habits",
    description: "Aligning purchases with values",
    scripture: "Proverbs 21:5",
    icon: TrendingUp,
    content: [
      "The 24-hour rule for purchases",
      "Needs vs wants assessment",
      "Creating a spending plan that works",
      "Accountability and tracking"
    ],
    points: 15
  },
  {
    id: 55,
    title: "Investing Fundamentals",
    description: "Growing wealth God's way",
    scripture: "Ecclesiastes 11:2",
    icon: LineChart,
    content: [
      "Start early - compound interest is powerful",
      "Diversification principles",
      "Retirement accounts (401k, IRA)",
      "Avoiding get-rich-quick schemes"
    ],
    points: 15
  },
  {
    id: 56,
    title: "Building Toward Homeownership",
    description: "The path to owning your home",
    scripture: "Proverbs 24:27",
    icon: HomeIcon,
    content: [
      "Down payment strategies",
      "Understanding mortgage options",
      "First-time buyer programs (HUD, NACA, VA)",
      "Avoiding predatory lending"
    ],
    points: 15
  },
  {
    id: 57,
    title: "Generational Wealth",
    description: "Leaving a legacy for your children",
    scripture: "Proverbs 13:22",
    icon: Award,
    content: [
      "Teaching children about money",
      "Life insurance fundamentals",
      "Estate planning basics",
      "Breaking generational poverty cycles"
    ],
    points: 15
  },
  {
    id: 58,
    title: "Greek Life & Finances",
    description: "Managing fraternity/sorority costs",
    scripture: "Luke 14:28",
    icon: DollarSign,
    content: [
      "Budgeting for dues and fees",
      "Convention and conference costs",
      "Paraphernalia without debt",
      "Financial accountability as a leader"
    ],
    points: 15
  },
  {
    id: 59,
    title: "Generous Living",
    description: "The joy of biblical giving",
    scripture: "2 Corinthians 9:7",
    icon: Sparkles,
    content: [
      "Giving beyond the tithe",
      "Supporting your local church",
      "Charitable giving strategies",
      "Teaching generosity to the next generation"
    ],
    points: 15
  },
  {
    id: 60,
    title: "Financial Freedom Declaration",
    description: "Commitment to lifelong stewardship",
    scripture: "Galatians 5:1",
    icon: CheckCircle2,
    content: [
      "Review your financial goals",
      "Create an accountability plan",
      "Declare financial freedom over your life",
      "Continue the journey with community support"
    ],
    points: 20
  }
];

export default function SacredMoneyCourse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { awardPoints } = useGamification();
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

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
          completed_at: new Date().toISOString()
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

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedModule(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>

          <Card className="border-sacred/20">
            <CardHeader className="bg-gradient-to-r from-sacred/10 to-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-sacred/20 flex items-center justify-center">
                  <selectedModule.icon className="h-6 w-6 text-sacred" />
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedModule.title}</CardTitle>
                  <CardDescription>{selectedModule.description}</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="w-fit mt-2">
                📖 {selectedModule.scripture}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Principles</h3>
                <ul className="space-y-3">
                  {selectedModule.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                {completedModules.includes(selectedModule.id) ? (
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Module Completed!</span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => completeModule.mutate(selectedModule.id)}
                    disabled={completeModule.isPending}
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
