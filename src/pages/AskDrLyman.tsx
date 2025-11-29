import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Send, MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'theology', label: 'Theology' },
  { value: 'family', label: 'Family Conversations' },
  { value: 'campus', label: 'Campus Ministry' },
  { value: 'practical', label: 'Practical Questions' },
  { value: 'general', label: 'General' }
];

const AskDrLyman = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('general');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [myQuestions, setMyQuestions] = useState<any[]>([]);
  const [publicAnswers, setPublicAnswers] = useState<any[]>([]);

  useEffect(() => {
    loadPublicAnswers();
    if (user) loadMyQuestions();
  }, [user]);

  const loadPublicAnswers = async () => {
    // Use secure view that excludes email addresses
    const { data } = await supabase
      .from('qa_public_answers')
      .select('*')
      .order('answered_at', { ascending: false })
      .limit(20);
    setPublicAnswers(data || []);
  };

  const loadMyQuestions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('qa_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setMyQuestions(data || []);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setSubmitting(true);
    
    const { error } = await supabase.from('qa_submissions').insert({
      user_id: user?.id || null,
      question: question.trim(),
      category,
      email: email || null
    });

    if (error) {
      toast({ title: 'Error', description: 'Failed to submit question', variant: 'destructive' });
    } else {
      toast({ title: 'Question Submitted!', description: 'Dr. Lyman will review your question soon.' });
      setQuestion('');
      setEmail('');
      if (user) loadMyQuestions();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold">Ask Dr. Lyman</h1>
            <p className="text-sm text-muted-foreground">Get answers to your questions</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Submit Question */}
        <Card className="mb-8 border-sacred/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5 text-sacred" /> Submit Your Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Ask about theology, family conversations, campus ministry, or anything related to faith and Greek life..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!user && (
                <Input
                  type="email"
                  placeholder="Your email (optional, for response)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
            <Button onClick={handleSubmit} disabled={!question.trim() || submitting} className="bg-sacred hover:bg-sacred/90">
              <Send className="w-4 h-4 mr-2" /> Submit Question
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="answered" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="answered">Answered Questions</TabsTrigger>
            {user && <TabsTrigger value="my">My Questions</TabsTrigger>}
          </TabsList>

          <TabsContent value="answered" className="space-y-4">
            {publicAnswers.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-muted-foreground">No public answers yet. Check back soon!</CardContent></Card>
            ) : (
              publicAnswers.map(qa => (
                <Card key={qa.id}>
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit capitalize mb-2">{qa.category}</Badge>
                    <CardTitle className="text-lg">{qa.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-sacred/10 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-sacred mb-2">Dr. Lyman's Response:</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{qa.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {user && (
            <TabsContent value="my" className="space-y-4">
              {myQuestions.length === 0 ? (
                <Card><CardContent className="py-8 text-center text-muted-foreground">You haven't submitted any questions yet.</CardContent></Card>
              ) : (
                myQuestions.map(qa => (
                  <Card key={qa.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">{qa.category}</Badge>
                        {qa.status === 'answered' ? (
                          <Badge className="bg-green-500/20 text-green-700"><CheckCircle2 className="w-3 h-3 mr-1" /> Answered</Badge>
                        ) : (
                          <Badge className="bg-amber-500/20 text-amber-700"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{qa.question}</CardTitle>
                    </CardHeader>
                    {qa.answer && (
                      <CardContent>
                        <div className="bg-sacred/10 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-sacred mb-2">Response:</p>
                          <p className="text-muted-foreground whitespace-pre-wrap">{qa.answer}</p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default AskDrLyman;
