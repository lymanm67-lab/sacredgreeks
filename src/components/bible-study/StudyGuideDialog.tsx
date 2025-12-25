import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Download, 
  Save,
  CheckCircle2,
  Users,
  Lightbulb
} from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export interface StudyGuide {
  id: string;
  title: string;
  category: string;
  introduction: string;
  keyScriptures: Array<{
    ref: string;
    text: string;
  }>;
  discussionQuestions: string[];
  applicationPoints: string[];
}

interface StudyGuideDialogProps {
  study: StudyGuide | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudyGuideDialog: React.FC<StudyGuideDialogProps> = ({
  study,
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [personalNotes, setPersonalNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!study) return null;

  const fullStudyText = `
${study.title}

INTRODUCTION
${study.introduction}

KEY SCRIPTURES
${study.keyScriptures.map(s => `${s.ref}: ${s.text}`).join('\n\n')}

DISCUSSION QUESTIONS
${study.discussionQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

APPLICATION POINTS
${study.applicationPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}
  `.trim();

  const handleSaveNotes = () => {
    // In a real implementation, this would save to the database
    localStorage.setItem(`study-notes-${study.id}`, personalNotes);
    setNotesSaved(true);
    toast({
      title: 'Notes saved',
      description: 'Your personal notes have been saved.',
    });
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Create a simple text download (in production, use jsPDF for actual PDF)
    const content = `${fullStudyText}\n\nPERSONAL NOTES\n${personalNotes || '(No notes added)'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${study.title.replace(/\s+/g, '-').toLowerCase()}-study-guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Study guide downloaded',
      description: 'Your study guide has been downloaded.',
    });
  };

  // Load saved notes on open
  React.useEffect(() => {
    if (open && study) {
      const saved = localStorage.getItem(`study-notes-${study.id}`);
      if (saved) setPersonalNotes(saved);
    }
  }, [open, study]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <Badge className="mb-2 bg-sacred/10 text-sacred border-sacred/20">
                {study.category}
              </Badge>
              <DialogTitle className="text-xl">{study.title}</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <ListenButton
                text={fullStudyText}
                itemId={`study-${study.id}`}
                title={study.title}
                showLabel={true}
                size="sm"
                variant="outline"
              />
              <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-1 text-xs sm:text-sm">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="discuss" className="gap-1 text-xs sm:text-sm">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Discuss</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-1 text-xs sm:text-sm">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="forum" className="gap-1 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Forum</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh] mt-4 pr-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Introduction */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-sacred" />
                    Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.introduction}
                  </p>
                </CardContent>
              </Card>

              {/* Key Scriptures */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-sacred" />
                    Key Scriptures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {study.keyScriptures.map((scripture, idx) => (
                    <div key={idx} className="border-l-4 border-sacred/30 pl-4 py-2">
                      <Badge variant="outline" className="mb-2">
                        {scripture.ref}
                      </Badge>
                      <p className="text-sm italic text-muted-foreground">
                        "{scripture.text}"
                      </p>
                      <div className="mt-2">
                        <ListenButton
                          text={`${scripture.ref}. ${scripture.text}`}
                          itemId={`scripture-${study.id}-${idx}`}
                          title={scripture.ref}
                          showLabel={false}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Application Points */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sacred" />
                    Application Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {study.applicationPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sacred font-semibold">{idx + 1}.</span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussion Questions Tab */}
            <TabsContent value="discuss" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sacred" />
                    Discussion Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {study.discussionQuestions.map((question, idx) => (
                    <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sacred/10 text-sacred flex items-center justify-center font-semibold">
                          {idx + 1}
                        </span>
                        <p className="text-foreground pt-1">{question}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground text-center">
                    Use these questions for personal reflection or group discussion in your chapter meetings.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personal Notes Tab */}
            <TabsContent value="notes" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sacred" />
                    Personal Notes & Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Write your personal reflections, insights, and notes here..."
                    value={personalNotes}
                    onChange={(e) => setPersonalNotes(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Your notes are saved locally on this device
                    </p>
                    <Button onClick={handleSaveNotes} className="gap-2 bg-sacred hover:bg-sacred/90">
                      {notesSaved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Notes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-sacred/5 border-sacred/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Study Progress Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Read through all key scriptures carefully</li>
                    <li>• Answer each discussion question in your notes</li>
                    <li>• Share insights with your chapter or small group</li>
                    <li>• Apply one point this week</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum" className="space-y-4 mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-sacred" />
                    Discussion Forum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Join the conversation with other members studying this topic. Share your thoughts, ask questions, and encourage one another.
                  </p>
                  
                  <Separator />
                  
                  <div className="text-center py-6">
                    {user ? (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Connect with others studying "{study.title}"
                        </p>
                        <Link to={`/forum?topic=${encodeURIComponent(study.title)}`}>
                          <Button className="gap-2 bg-sacred hover:bg-sacred/90">
                            <MessageSquare className="w-4 h-4" />
                            Join Discussion
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Sign in to join the discussion forum
                        </p>
                        <Link to="/auth">
                          <Button variant="outline">
                            Sign In to Participate
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
