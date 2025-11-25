import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, MessageCircle, CheckCircle, Check, Edit3, Share2, Award, ShoppingCart, Lock } from "lucide-react";
import { studyGuideSessions } from "@/sacredGreeksContent";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { StudyReminderSettings } from "@/components/StudyReminderSettings";
import { ShareCompletionDialog } from "@/components/study-guide/ShareCompletionDialog";
import { CertificateDialog } from "@/components/study-guide/CertificateDialog";
import { AchievementBadgeDialog } from "@/components/AchievementBadgeDialog";

const StudyGuide = () => {
  const {
    isSessionComplete,
    toggleSession,
    saveNotes,
    isSavingNotes,
    getSessionNotes,
    completedCount,
    totalSessions,
    progressPercentage,
    isAuthenticated,
    progress,
  } = useStudyProgress();

  const [notesState, setNotesState] = useState<Record<number, string>>({});
  const [answersState, setAnswersState] = useState<Record<string, string>>({});
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);

  const isAllComplete = completedCount === totalSessions;

  // Load answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("studyGuideAnswers");
    if (savedAnswers) {
      try {
        setAnswersState(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to load saved answers", e);
      }
    }
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answersState).length > 0) {
      localStorage.setItem("studyGuideAnswers", JSON.stringify(answersState));
    }
  }, [answersState]);

  // Get the most recent completion date
  const completionDate = progress
    .filter((p) => p.completed)
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())[0]
    ?.completed_at || new Date().toISOString();

  const handleNotesChange = (sessionId: number, value: string) => {
    setNotesState((prev) => ({ ...prev, [sessionId]: value }));
  };

  const handleAnswerChange = (sessionId: number, questionIndex: number, value: string) => {
    const key = `${sessionId}-${questionIndex}`;
    setAnswersState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveNotes = (sessionId: number) => {
    const notes = notesState[sessionId] ?? getSessionNotes(sessionId);
    saveNotes({ sessionId, notes });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Badge className="bg-sacred/10 text-sacred hover:bg-sacred/20 border-sacred/20" variant="outline">
              Complete 5-Session Study Guide
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center mb-4 bg-sacred/10 rounded-full p-4">
            <BookOpen className="w-12 h-12 text-sacred" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Sacred Not Sinful <span className="text-sacred">Study Guide</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A 5-session starter guide to help you navigate faith and Greek life with biblical clarity. 
            Perfect for personal study, small groups, or chapter discussions.
          </p>

          {isAuthenticated && (
            <div className="max-w-md mx-auto mb-8">
              <Card className="bg-card/50 backdrop-blur border-sacred/20">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Your Progress</span>
                      <span className="font-semibold text-sacred">
                        {completedCount} / {totalSessions} Sessions
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {isAllComplete
                        ? "🎉 Congratulations! You've completed all sessions!"
                        : "Mark sessions as complete to track your journey"}
                    </p>
                    {isAllComplete && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          onClick={() => setShareDialogOpen(true)}
                          className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
                          size="sm"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          onClick={() => setCertificateDialogOpen(true)}
                          variant="outline"
                          size="sm"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Print
                        </Button>
                        <AchievementBadgeDialog
                          type="study_guide"
                          title="Study Guide Complete"
                          subtitle="5 Sessions Completed"
                          completionDate={completionDate}
                          trigger={
                            <Button variant="outline" size="sm">
                              <Award className="w-4 h-4 mr-2" />
                              Badge
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!isAuthenticated && (
            <Card className="max-w-md mx-auto mb-8 border-2 border-sacred/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-sacred" />
                  Unlock Full Experience
                </CardTitle>
                <CardDescription>
                  Sign up for free to track your progress, save notes, and earn completion certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred mt-0.5" />
                    <span className="text-sm">Save progress across all 5 sessions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred mt-0.5" />
                    <span className="text-sm">Personal notes and reflections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-sacred mt-0.5" />
                    <span className="text-sm">Completion certificate to share</span>
                  </div>
                </div>
                <Link to="/auth">
                  <Button className="w-full bg-sacred hover:bg-sacred/90">
                    Create Free Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Scripture-based</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Discussion questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-sacred" />
              <span>Action steps</span>
            </div>
          </div>
        </div>

        {/* Study Sessions */}
        <div className="max-w-4xl mx-auto space-y-6">
          {studyGuideSessions.map((session, index) => (
            <Card key={session.id} className="border-2 hover:border-sacred/50 transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all ${
                    isSessionComplete(session.id)
                      ? "bg-sacred text-sacred-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {isSessionComplete(session.id) ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      session.id
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <CardTitle className="text-2xl">{session.title}</CardTitle>
                      {isAuthenticated && (
                        <div className="flex items-center gap-2 pt-1">
                          <Checkbox
                            id={`session-${session.id}`}
                            checked={isSessionComplete(session.id)}
                            onCheckedChange={(checked) =>
                              toggleSession({
                                sessionId: session.id,
                                completed: checked as boolean,
                              })
                            }
                          />
                          <label
                            htmlFor={`session-${session.id}`}
                            className="text-sm text-muted-foreground cursor-pointer select-none"
                          >
                            Complete
                          </label>
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-base italic">
                      Theme: {session.theme}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {session.scriptures.map((scripture, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {scripture}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="teaching" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Teaching Content
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      {session.teaching.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="questions" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Discussion Questions
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        {session.questions.map((question, idx) => (
                          <div key={idx} className="space-y-3">
                            <p className="font-medium text-foreground">
                              {idx + 1}. {question}?
                            </p>
                            {isAuthenticated ? (
                              <Textarea
                                placeholder="Write your answer here..."
                                className="min-h-[120px] resize-none bg-muted/50"
                                value={answersState[`${session.id}-${idx}`] || ""}
                                onChange={(e) => handleAnswerChange(session.id, idx, e.target.value)}
                              />
                            ) : (
                              <div className="bg-muted/30 border border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                  Sign in to write and save your answers
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                        {isAuthenticated && (
                          <div className="pt-4">
                            <p className="text-xs text-muted-foreground mb-2">
                              💡 Your answers are automatically saved as you type
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="action" className="border-0">
                    <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                      Action Step
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-sacred/5 border border-sacred/20 rounded-lg p-4">
                        <p className="text-foreground font-medium mb-2">This Week's Challenge:</p>
                        <p className="text-muted-foreground">{session.actionStep}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {isAuthenticated && (
                    <AccordionItem value="notes" className="border-0">
                      <AccordionTrigger className="text-base font-semibold hover:text-sacred">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4" />
                          Personal Notes & Reflections
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Write your personal thoughts, insights, and reflections from this session. Your notes are private and saved automatically.
                          </p>
                          <Textarea
                            placeholder="Share your reflections, questions, or key takeaways from this session..."
                            className="min-h-[200px] resize-none"
                            value={
                              notesState[session.id] !== undefined
                                ? notesState[session.id]
                                : getSessionNotes(session.id)
                            }
                            onChange={(e) => handleNotesChange(session.id, e.target.value)}
                          />
                          <Button
                            onClick={() => handleSaveNotes(session.id)}
                            disabled={isSavingNotes}
                            className="bg-sacred hover:bg-sacred/90 text-sacred-foreground"
                          >
                            {isSavingNotes ? "Saving..." : "Save Notes"}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>

                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <p className="text-sm text-muted-foreground italic">
                    {session.readMoreNote}
                  </p>
                  <div className="bg-gradient-to-br from-sacred/5 to-sacred/10 border border-sacred/20 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">Ready to Go Deeper?</p>
                        <p className="text-sm text-muted-foreground">
                          Get the complete Sacred, Not Sinful book for in-depth teaching and guidance
                        </p>
                      </div>
                      <a
                        href="https://a.co/d/elm89y1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground w-full sm:w-auto">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Book
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-12 space-y-6">
          {isAuthenticated && <StudyReminderSettings />}
          
          {/* Podcast CTA */}
          <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader className="text-center space-y-4">
              <div className="inline-flex items-center justify-center mx-auto bg-sacred/10 rounded-full p-3">
                <MessageCircle className="w-8 h-8 text-sacred" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                Prefer to Listen?
              </CardTitle>
              <CardDescription className="text-base">
                Access the Sacred Greeks podcast and listen to study guide sessions on the go.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/podcast">
                <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Listen to Podcast
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl md:text-3xl">
                Ready to Go Deeper?
              </CardTitle>
              <CardDescription className="text-base">
                Get the full Sacred, Not Sinful book and explore personal coaching options with Dr. Lyman.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://a.co/d/5a6Yt9t"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Get the Book
                </Button>
              </a>
              <a
                href="https://sacredgreeks.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Explore Coaching
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Based on "Sacred, Not Sinful" by Dr. Lyman • <Link to="/" className="text-sacred hover:underline">SacredGreeks.com</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Share Dialog */}
      <ShareCompletionDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} />
      
      {/* Certificate Dialog */}
      <CertificateDialog 
        open={certificateDialogOpen} 
        onOpenChange={setCertificateDialogOpen}
        completionDate={completionDate}
      />
    </div>
  );
};

export default StudyGuide;
