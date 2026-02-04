import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Play, CheckCircle, XCircle, Lightbulb, Target, ArrowRight,
  FileText, Calculator, PieChart, RotateCcw, Sparkles, Clock,
  ChevronDown, ChevronUp, Eye, AlertTriangle
} from 'lucide-react';
import { 
  MOCK_EXPENSES, MOCK_BUDGETS, MOCK_MEMBERS, 
  PRACTICE_SCENARIOS, GUIDED_WORKFLOWS,
  type MockExpense, type PracticeScenario 
} from '@/data/finance-sandbox-data';
import { toast } from 'sonner';

interface FinanceSandboxProps {
  onExitSandbox?: () => void;
}

export function FinanceSandbox({ onExitSandbox }: FinanceSandboxProps) {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<PracticeScenario | null>(null);
  const [scenarioProgress, setScenarioProgress] = useState<Record<string, boolean>>({});
  const [expandedWorkflow, setExpandedWorkflow] = useState<number | null>(null);
  const [showMockData, setShowMockData] = useState(false);

  const handleStartScenario = (scenario: PracticeScenario) => {
    setSelectedScenario(scenario);
    setShowMockData(true);
    toast.info(`Starting: ${scenario.title}`);
  };

  const handleCompleteScenario = (scenarioId: string) => {
    setScenarioProgress(prev => ({ ...prev, [scenarioId]: true }));
    toast.success('Scenario completed! Great work!');
    setSelectedScenario(null);
    setShowMockData(false);
  };

  const completedCount = Object.values(scenarioProgress).filter(Boolean).length;
  const progressPercent = (completedCount / PRACTICE_SCENARIOS.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-500/20 text-emerald-400';
      case 'intermediate': return 'bg-amber-500/20 text-amber-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'receipt': return FileText;
      case 'approval': return CheckCircle;
      case 'budget': return PieChart;
      case 'report': return Calculator;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sandbox Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 via-slate-800 to-amber-500/10 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Finance Sandbox</h3>
                <p className="text-slate-400">Practice with mock data - no real transactions!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="font-semibold text-white">{completedCount}/{PRACTICE_SCENARIOS.length} Scenarios</p>
              </div>
              <Progress value={progressPercent} className="w-24 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Scenario Panel */}
      <AnimatePresence>
        {selectedScenario && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <CardTitle className="text-amber-400">Active Scenario</CardTitle>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedScenario(null);
                      setShowMockData(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Exit Scenario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-white text-lg mb-2">{selectedScenario.title}</h4>
                <p className="text-slate-300 mb-4">{selectedScenario.task}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      Hints
                    </h5>
                    <ul className="space-y-1">
                      {selectedScenario.hints.map((hint, idx) => (
                        <li key={idx} className="text-sm text-slate-400">• {hint}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-emerald-400" />
                      Success Criteria
                    </h5>
                    <ul className="space-y-1">
                      {selectedScenario.successCriteria.map((criteria, idx) => (
                        <li key={idx} className="text-sm text-slate-400">✓ {criteria}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button 
                  onClick={() => handleCompleteScenario(selectedScenario.id)}
                  className="w-full"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Scenario Complete
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-primary">
            <Play className="h-4 w-4 mr-2" />
            Practice Scenarios
          </TabsTrigger>
          <TabsTrigger value="workflows" className="data-[state=active]:bg-primary">
            <Target className="h-4 w-4 mr-2" />
            Guided Workflows
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-primary">
            <Eye className="h-4 w-4 mr-2" />
            Mock Data
          </TabsTrigger>
        </TabsList>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRACTICE_SCENARIOS.map((scenario) => {
              const CategoryIcon = getCategoryIcon(scenario.category);
              const isCompleted = scenarioProgress[scenario.id];
              
              return (
                <Card 
                  key={scenario.id}
                  className={`bg-slate-800/50 border-slate-700 transition-all ${
                    isCompleted ? 'border-emerald-500/30' : 'hover:border-primary/50'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-700">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-white flex items-center gap-2">
                            {scenario.title}
                            {isCompleted && (
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(scenario.difficulty)}>
                              {scenario.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {scenario.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 mb-4">{scenario.description}</p>
                    <Button 
                      variant={isCompleted ? "outline" : "default"}
                      size="sm" 
                      className="w-full"
                      onClick={() => handleStartScenario(scenario)}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Practice Again
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Scenario
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="mt-6">
          <div className="space-y-4">
            {GUIDED_WORKFLOWS.map((workflow, idx) => (
              <Card 
                key={workflow.id}
                className="bg-slate-800/50 border-slate-700"
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedWorkflow(expandedWorkflow === idx ? null : idx)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{workflow.title}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </div>
                    </div>
                    {expandedWorkflow === idx ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {expandedWorkflow === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {workflow.steps.map((step, stepIdx) => (
                            <div 
                              key={stepIdx}
                              className="flex gap-4 items-start"
                            >
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                  {step.step}
                                </div>
                                {stepIdx < workflow.steps.length - 1 && (
                                  <div className="w-0.5 h-12 bg-slate-600 mt-2" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <h5 className="font-semibold text-white">{step.title}</h5>
                                <p className="text-slate-400 text-sm mt-1">{step.instruction}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mock Data Tab */}
        <TabsContent value="data" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mock Expenses */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Sample Expenses
                </CardTitle>
                <CardDescription>Mock expense data for practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {MOCK_EXPENSES.map((expense) => (
                    <div 
                      key={expense.id}
                      className="p-3 rounded-lg bg-slate-700/30 border border-slate-600"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-white">{expense.vendor_name}</p>
                          <p className="text-sm text-slate-400">{expense.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              variant="outline" 
                              style={{ borderColor: expense.category_color, color: expense.category_color }}
                            >
                              {expense.category}
                            </Badge>
                            <Badge variant="outline" className={
                              expense.status === 'approved' ? 'border-emerald-500 text-emerald-400' :
                              expense.status === 'pending' ? 'border-amber-500 text-amber-400' :
                              expense.status === 'reimbursed' ? 'border-blue-500 text-blue-400' :
                              'border-red-500 text-red-400'
                            }>
                              {expense.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="font-bold text-white">${expense.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mock Budgets */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Sample Budgets
                </CardTitle>
                <CardDescription>Mock budget allocations for practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_BUDGETS.map((budget, idx) => {
                    const utilization = (budget.spent / budget.allocated) * 100;
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: budget.color }}
                            />
                            <span className="text-sm text-white">{budget.category}</span>
                          </div>
                          <span className="text-sm text-slate-400">
                            ${budget.spent.toFixed(0)} / ${budget.allocated}
                          </span>
                        </div>
                        <Progress 
                          value={utilization} 
                          className="h-2"
                          style={{ 
                            '--progress-background': budget.color 
                          } as React.CSSProperties}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {utilization.toFixed(0)}% utilized • ${(budget.allocated - budget.spent).toFixed(0)} remaining
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mock Members */}
            <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Sample Chapter Members
                </CardTitle>
                <CardDescription>Mock member data for approval workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {MOCK_MEMBERS.map((member) => (
                    <div 
                      key={member.id}
                      className="p-3 rounded-lg bg-slate-700/30 text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white truncate">{member.name}</p>
                      <p className="text-xs text-primary">{member.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
