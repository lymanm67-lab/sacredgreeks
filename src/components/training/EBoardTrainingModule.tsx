import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, ArrowRight, CheckCircle, XCircle, BookOpen, Play, 
  FileText, Download, ChevronDown, ChevronUp, Lightbulb, Target,
  Award, Workflow, ClipboardCheck
} from 'lucide-react';
import { type TrainingModule } from '@/data/eboard-training-content';
import { useGamification } from '@/hooks/use-gamification';
import { useStudyProgress } from '@/hooks/use-study-progress';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface EBoardTrainingModuleProps {
  module: TrainingModule;
  onBack: () => void;
  isCompleted: boolean;
}

export function EBoardTrainingModule({ module, onBack, isCompleted }: EBoardTrainingModuleProps) {
  const { awardPoints } = useGamification();
  const { toggleSession } = useStudyProgress();
  const [activeTab, setActiveTab] = useState('lessons');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [expandedWorkflow, setExpandedWorkflow] = useState<number | null>(null);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentSection = module.sections[currentSectionIndex];
  const currentQuestion = module.quiz[currentQuestionIndex];

  const handleNextSection = () => {
    if (currentSectionIndex < module.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < module.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctCount = module.quiz.filter(q => 
      selectedAnswers[q.id] === q.correctIndex
    ).length;
    const passingScore = Math.ceil(module.quiz.length * 0.7);
    
    if (correctCount >= passingScore && !isCompleted) {
      setQuizCompleted(true);
      // Mark session complete and award points
      toggleSession({ sessionId: module.sessionId, completed: true });
      awardPoints({ points: module.points, actionType: `eboard_${module.id}_complete` });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      toast.success(`Module completed! +${module.points} points awarded!`);
    } else if (correctCount < passingScore) {
      toast.error(`Score: ${correctCount}/${module.quiz.length}. You need ${passingScore} correct to pass. Try again!`);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const correctCount = module.quiz.filter(q => 
    selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Positions
            </Button>
            <div className="flex items-center gap-3">
              {(isCompleted || quizCompleted) && (
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Badge variant="outline" style={{ borderColor: module.color, color: module.color }}>
                {module.points} pts
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Module Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center gap-6 mb-8"
        >
          <div 
            className="p-4 rounded-2xl w-fit"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Award className="h-10 w-10" style={{ color: module.color }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{module.position}</h1>
            <p className="text-xl text-slate-400">{module.title}</p>
            <p className="text-slate-500 mt-2 max-w-2xl">{module.description}</p>
          </div>
        </motion.div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="lessons" className="data-[state=active]:bg-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-primary">
              <Play className="h-4 w-4 mr-2" />
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="workflows" className="data-[state=active]:bg-primary">
              <Workflow className="h-4 w-4 mr-2" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-primary">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-primary">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Section Navigation */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-slate-700 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-sm text-slate-400">Lesson Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {module.sections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSectionIndex(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          idx === currentSectionIndex
                            ? 'bg-primary text-white'
                            : 'text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}. {section.title}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSectionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-slate-400">
                            Lesson {currentSectionIndex + 1} of {module.sections.length}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl text-white mt-4">
                          {currentSection.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-slate-300 leading-relaxed">
                          {currentSection.content}
                        </p>
                        
                        <div className="bg-slate-700/30 rounded-xl p-6">
                          <h4 className="flex items-center gap-2 font-semibold text-white mb-4">
                            <Target className="h-5 w-5 text-primary" />
                            Key Points
                          </h4>
                          <ul className="space-y-3">
                            {currentSection.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-slate-300">
                                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <Button
                            variant="outline"
                            onClick={handlePrevSection}
                            disabled={currentSectionIndex === 0}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                          </Button>
                          <Button
                            onClick={handleNextSection}
                            disabled={currentSectionIndex === module.sections.length - 1}
                          >
                            Next
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          {/* Scenarios Tab */}
          <TabsContent value="scenarios">
            <div className="space-y-4">
              {module.scenarios.map((scenario, idx) => (
                <Card 
                  key={idx} 
                  className="bg-slate-800/50 border-slate-700 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setExpandedScenario(expandedScenario === idx ? null : idx)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/20">
                          <Lightbulb className="h-5 w-5 text-amber-400" />
                        </div>
                        <CardTitle className="text-lg text-white">{scenario.title}</CardTitle>
                      </div>
                      {expandedScenario === idx ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {expandedScenario === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <CardContent className="space-y-4 pt-0">
                          <div className="bg-slate-700/30 rounded-lg p-4">
                            <h5 className="font-semibold text-slate-300 mb-2">Situation</h5>
                            <p className="text-slate-400">{scenario.situation}</p>
                          </div>
                          
                          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                            <h5 className="font-semibold text-red-400 mb-2">Challenge</h5>
                            <p className="text-slate-400">{scenario.challenge}</p>
                          </div>
                          
                          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                            <h5 className="font-semibold text-emerald-400 mb-2">Best Practice</h5>
                            <p className="text-slate-400">{scenario.bestPractice}</p>
                          </div>
                          
                          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <h5 className="font-semibold text-primary mb-2">Expected Outcome</h5>
                            <p className="text-slate-400">{scenario.outcome}</p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <div className="space-y-4">
              {module.workflows.map((workflow, idx) => (
                <Card 
                  key={idx}
                  className="bg-slate-800/50 border-slate-700"
                >
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedWorkflow(expandedWorkflow === idx ? null : idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <Workflow className="h-5 w-5 text-purple-400" />
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
                                  <p className="text-slate-400 text-sm mt-1">{step.action}</p>
                                  {step.tip && (
                                    <div className="mt-2 flex items-start gap-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg p-2">
                                      <Lightbulb className="h-4 w-4 shrink-0" />
                                      {step.tip}
                                    </div>
                                  )}
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

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                {!quizStarted && !showResults ? (
                  <div className="text-center py-8">
                    <div className="p-4 rounded-full bg-primary/20 w-fit mx-auto mb-4">
                      <ClipboardCheck className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Position Certification Quiz</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                      Test your knowledge of the {module.position} role. 
                      Score 70% or higher to earn {module.points} points!
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Badge variant="outline" className="text-slate-400">
                        {module.quiz.length} Questions
                      </Badge>
                      <Badge variant="outline" className="text-slate-400">
                        70% to Pass
                      </Badge>
                    </div>
                    <Button onClick={() => setQuizStarted(true)} size="lg">
                      Start Quiz
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                ) : showResults ? (
                  <div className="text-center py-8">
                    <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
                      correctCount >= Math.ceil(module.quiz.length * 0.7)
                        ? 'bg-emerald-500/20'
                        : 'bg-red-500/20'
                    }`}>
                      {correctCount >= Math.ceil(module.quiz.length * 0.7) ? (
                        <CheckCircle className="h-12 w-12 text-emerald-400" />
                      ) : (
                        <XCircle className="h-12 w-12 text-red-400" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {correctCount >= Math.ceil(module.quiz.length * 0.7)
                        ? 'Congratulations!'
                        : 'Keep Trying!'}
                    </h3>
                    <p className="text-slate-400 mb-4">
                      You scored {correctCount} out of {module.quiz.length}
                    </p>
                    <Progress 
                      value={(correctCount / module.quiz.length) * 100} 
                      className="w-64 mx-auto mb-6"
                    />
                    
                    {/* Show answers */}
                    <div className="text-left max-w-lg mx-auto mb-6">
                      <h4 className="font-semibold text-white mb-4">Answer Review:</h4>
                      {module.quiz.map((q, idx) => (
                        <div key={q.id} className="mb-4 p-3 rounded-lg bg-slate-700/30">
                          <p className="text-sm text-slate-300 mb-2">{idx + 1}. {q.question}</p>
                          <p className={`text-sm ${
                            selectedAnswers[q.id] === q.correctIndex
                              ? 'text-emerald-400'
                              : 'text-red-400'
                          }`}>
                            Your answer: {q.options[selectedAnswers[q.id]]}
                          </p>
                          {selectedAnswers[q.id] !== q.correctIndex && (
                            <p className="text-sm text-emerald-400">
                              Correct: {q.options[q.correctIndex]}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 mt-1">{q.explanation}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button onClick={resetQuiz}>
                      {correctCount >= Math.ceil(module.quiz.length * 0.7)
                        ? 'Retake Quiz'
                        : 'Try Again'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Badge variant="outline">
                        Question {currentQuestionIndex + 1} of {module.quiz.length}
                      </Badge>
                      <Progress 
                        value={((currentQuestionIndex + 1) / module.quiz.length) * 100} 
                        className="w-32"
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-6">
                      {currentQuestion.question}
                    </h3>
                    
                    <RadioGroup
                      value={selectedAnswers[currentQuestion.id]?.toString()}
                      onValueChange={(val) => handleSelectAnswer(currentQuestion.id, parseInt(val))}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                            selectedAnswers[currentQuestion.id] === idx
                              ? 'border-primary bg-primary/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                        >
                          <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                          <Label htmlFor={`option-${idx}`} className="cursor-pointer flex-1 text-slate-300">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <div className="flex justify-end mt-8">
                      <Button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswers[currentQuestion.id] === undefined}
                      >
                        {currentQuestionIndex === module.quiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.resources.map((resource, idx) => (
                <Card key={idx} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <FileText className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{resource.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{resource.description}</p>
                        {resource.downloadable && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
