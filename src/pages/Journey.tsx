import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Heart, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { journeyContent } from '@/data/journeyContent';
import { ListenButton } from '@/components/ListenButton';

const Journey = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<Record<number, { completed: boolean; notes: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadProgress();
    else setLoading(false);
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('journey_progress')
      .select('*')
      .eq('user_id', user.id);
    
    const progressMap: Record<number, { completed: boolean; notes: string }> = {};
    data?.forEach(p => {
      progressMap[p.day_number] = { completed: p.completed, notes: p.reflection_notes || '' };
    });
    setProgress(progressMap);
    setLoading(false);
  };

  const toggleDay = async (day: number) => {
    if (!user) return;
    const current = progress[day];
    const newCompleted = !current?.completed;
    
    const { error } = await supabase
      .from('journey_progress')
      .upsert({
        user_id: user.id,
        day_number: day,
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
        reflection_notes: current?.notes || null
      }, { onConflict: 'user_id,day_number' });

    if (!error) {
      setProgress(prev => ({ ...prev, [day]: { ...prev[day], completed: newCompleted, notes: prev[day]?.notes || '' } }));
      if (newCompleted) toast({ title: `Day ${day} completed!` });
    }
  };

  const saveNotes = async (day: number, notes: string) => {
    if (!user) return;
    await supabase
      .from('journey_progress')
      .upsert({
        user_id: user.id,
        day_number: day,
        completed: progress[day]?.completed || false,
        reflection_notes: notes
      }, { onConflict: 'user_id,day_number' });
    
    setProgress(prev => ({ ...prev, [day]: { ...prev[day], notes, completed: prev[day]?.completed || false } }));
  };

  const completedDays = Object.values(progress).filter(p => p.completed).length;
  const progressPercent = (completedDays / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">30-Day "Sacred, Not Sinful" Journey</h1>
            <p className="text-sm text-muted-foreground">Daily readings, scriptures & reflections</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold">{completedDays}/30 Days</p>
                <p className="text-muted-foreground">completed</p>
              </div>
              <Heart className="w-12 h-12 text-sacred" />
            </div>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {!user && (
          <Card className="mb-8 border-sacred/30 bg-sacred/5">
            <CardContent className="pt-6 text-center">
              <Lock className="w-12 h-12 text-sacred mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground mb-4">Sign in to save your journey progress and reflections</p>
              <Link to="/auth"><Button className="bg-sacred hover:bg-sacred/90">Sign In to Track Progress</Button></Link>
            </CardContent>
          </Card>
        )}

        {/* Journey Days */}
        <div className="space-y-4">
          {journeyContent.map((day) => (
            <Card key={day.day} className={progress[day.day]?.completed ? 'border-sacred/50 bg-sacred/5' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {user && (
                      <button onClick={() => toggleDay(day.day)} className="mt-1">
                        {progress[day.day]?.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-sacred" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                    )}
                    <div>
                      <Badge variant="outline" className="mb-1">Day {day.day}</Badge>
                      <CardTitle className="text-lg">{day.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{day.theme}</p>
                    </div>
                  </div>
                  <ListenButton text={day.reading} itemId={`journey-day-${day.day}`} title={day.title} size="sm" />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="content" className="border-none">
                    <AccordionTrigger className="py-2 text-sacred hover:no-underline">
                      <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Read Day {day.day}</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-sacred">
                        <p className="font-semibold text-sm text-sacred">{day.scripture}</p>
                        <p className="text-sm italic mt-1">"{day.scriptureText}"</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{day.reading}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Reflection Questions</h4>
                        <ul className="space-y-2">
                          {day.reflection.map((q, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-sacred">•</span> {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-sacred/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Prayer</h4>
                        <p className="text-sm italic">{day.prayer}</p>
                      </div>
                      {user && (
                        <div>
                          <h4 className="font-semibold mb-2">My Reflections</h4>
                          <Textarea
                            placeholder="Write your thoughts..."
                            value={progress[day.day]?.notes || ''}
                            onChange={(e) => setProgress(prev => ({ ...prev, [day.day]: { ...prev[day.day], notes: e.target.value, completed: prev[day.day]?.completed || false } }))}
                            onBlur={(e) => saveNotes(day.day, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Journey;
