import { useState, useEffect } from "react";
import { Sun, BookOpen, Heart, Check, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStreaks } from "@/hooks/use-streaks";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ListenButton } from "@/components/ListenButton";
import { cn } from "@/lib/utils";

interface QuickMorningModeProps {
  onComplete?: () => void;
  className?: string;
}

interface DailyVerse {
  verse_text: string;
  verse_ref: string;
  reflection: string;
  theme: string;
}

export function QuickMorningMode({ onComplete, className }: QuickMorningModeProps) {
  const { user } = useAuth();
  const { updateStreak, hasEngagedToday } = useStreaks();
  const [step, setStep] = useState<'verse' | 'prayer' | 'complete'>(hasEngagedToday ? 'complete' : 'verse');
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prayerStarted, setPrayerStarted] = useState(false);
  const [prayerTime, setPrayerTime] = useState(0);

  useEffect(() => {
    fetchTodaysVerse();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (prayerStarted && step === 'prayer') {
      interval = setInterval(() => {
        setPrayerTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [prayerStarted, step]);

  const fetchTodaysVerse = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_verses')
        .select('verse_text, verse_ref, reflection, theme')
        .eq('date', today)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setVerse(data);
      } else {
        // Fallback verse if none for today
        setVerse({
          verse_text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          verse_ref: "Proverbs 3:5-6",
          reflection: "As you navigate Greek life and faith today, trust God's guidance.",
          theme: "Trust"
        });
      }
    } catch (error) {
      console.error('Error fetching verse:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerseComplete = () => {
    setStep('prayer');
  };

  const handlePrayerComplete = async () => {
    setStep('complete');
    await updateStreak();
    
    // Log the check-in
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from('user_daily_check_ins')
        .upsert({
          user_id: user.id,
          date: today,
          prayed_today: true,
          read_bible: true,
        }, { onConflict: 'user_id,date' });
    }
    
    onComplete?.();
  };

  const progress = step === 'verse' ? 33 : step === 'prayer' ? 66 : 100;

  if (hasEngagedToday && step === 'complete') {
    return (
      <Card className={cn("border-sacred/20 bg-sacred/5", className)}>
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sacred/20 mb-3">
            <Check className="w-6 h-6 text-sacred" />
          </div>
          <h3 className="font-semibold text-lg mb-1">Morning Complete! 🌅</h3>
          <p className="text-sm text-muted-foreground">
            You've already done your Quick Morning today. Great job staying consistent!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <CardTitle className="text-lg">Quick Morning</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>~2 min</span>
          </div>
        </div>
        <Progress value={progress} className="h-1 mt-2" />
      </CardHeader>

      <CardContent className="p-4">
        {step === 'verse' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>Step 1: Today's Verse</span>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : verse && (
              <>
                <blockquote className="border-l-2 border-sacred pl-4 italic text-foreground">
                  "{verse.verse_text}"
                </blockquote>
                <p className="text-sm font-medium text-sacred">{verse.verse_ref}</p>
                <p className="text-sm text-muted-foreground">{verse.reflection}</p>
                
                <div className="flex items-center gap-2">
                  <ListenButton
                    text={`${verse.verse_text}. ${verse.verse_ref}. ${verse.reflection}`}
                    itemId="quick-morning-verse"
                    title="Today's Verse"
                    variant="outline"
                    size="sm"
                  />
                  <Button onClick={handleVerseComplete} className="flex-1">
                    I've Read It
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 'prayer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>Step 2: Quick Prayer</span>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium">Take a moment to pray:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Thank God for this new day</li>
                <li>• Ask for guidance in your Greek activities</li>
                <li>• Pray for your brothers/sisters</li>
                <li>• Commit your day to Him</li>
              </ul>
            </div>

            {!prayerStarted ? (
              <Button 
                onClick={() => setPrayerStarted(true)} 
                variant="outline" 
                className="w-full"
              >
                <Heart className="w-4 h-4 mr-2" />
                Start Prayer Timer
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-3xl font-mono font-bold">
                    {Math.floor(prayerTime / 60)}:{(prayerTime % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-xs text-muted-foreground">Time in prayer</p>
                </div>
                <Button 
                  onClick={handlePrayerComplete} 
                  className="w-full bg-sacred hover:bg-sacred/90"
                  disabled={prayerTime < 10}
                >
                  <Check className="w-4 h-4 mr-2" />
                  {prayerTime < 10 ? `Wait ${10 - prayerTime}s...` : "Complete Prayer"}
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center py-4 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">Morning Complete! 🔥</h3>
            <p className="text-sm text-muted-foreground">
              You've started your day with God. Your streak has been updated!
            </p>
            <p className="text-xs text-muted-foreground">
              Prayer time: {Math.floor(prayerTime / 60)}:{(prayerTime % 60).toString().padStart(2, '0')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
