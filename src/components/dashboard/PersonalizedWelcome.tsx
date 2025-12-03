import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sparkles, Target, Settings2, RefreshCw, User } from 'lucide-react';
import { PersonalizedContent } from '@/hooks/use-personalization';
import { LandingPersonalizationSurvey } from '@/components/landing/LandingPersonalizationSurvey';
import { useLandingSurvey, SurveyAnswers } from '@/hooks/use-landing-survey';

interface PersonalizedWelcomeProps {
  personalization: PersonalizedContent;
  userName?: string;
}

export function PersonalizedWelcome({ personalization, userName }: PersonalizedWelcomeProps) {
  const { completeSurvey, resetSurvey } = useLandingSurvey();
  const [showSurvey, setShowSurvey] = useState(false);

  const handleRetakeSurvey = () => {
    resetSurvey();
    setShowSurvey(true);
  };

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    completeSurvey(answers);
    setShowSurvey(false);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-sacred/10 via-background to-warm-blue/10 border-sacred/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-sacred/20">
              <Sparkles className="w-6 h-6 text-sacred" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {userName ? `Hey ${userName.split(' ')[0]}!` : 'Welcome!'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {personalization.welcomeMessage}
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-sacred/20 text-sacred border-0">
                  <Target className="w-3 h-3 mr-1" />
                  {personalization.focusArea}
                </Badge>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 hover:bg-sacred/10">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleRetakeSurvey} className="gap-2 cursor-pointer">
                  <RefreshCw className="w-4 h-4" />
                  Retake Survey
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-2 cursor-pointer">
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    Edit in Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <LandingPersonalizationSurvey
        open={showSurvey}
        onComplete={handleSurveyComplete}
        onSkip={() => setShowSurvey(false)}
      />
    </>
  );
}

// Component for users who haven't completed the survey
export function PersonalizationPrompt() {
  const { completeSurvey } = useLandingSurvey();
  const [showSurvey, setShowSurvey] = useState(false);

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    completeSurvey(answers);
    setShowSurvey(false);
    // Refresh to show personalized content
    window.location.reload();
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-muted/50 via-background to-sacred/5 border-dashed border-2 border-sacred/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-sacred/10">
              <Sparkles className="w-6 h-6 text-sacred" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Personalize Your Experience</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Take a quick survey to get personalized recommendations and content
              </p>
            </div>
            <Button 
              onClick={() => setShowSurvey(true)}
              className="bg-sacred hover:bg-sacred/90 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Personalize
            </Button>
          </div>
        </CardContent>
      </Card>

      <LandingPersonalizationSurvey
        open={showSurvey}
        onComplete={handleSurveyComplete}
        onSkip={() => setShowSurvey(false)}
      />
    </>
  );
}
