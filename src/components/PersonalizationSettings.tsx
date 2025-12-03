import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Edit2 } from 'lucide-react';
import { useLandingSurvey, SurveyAnswers } from '@/hooks/use-landing-survey';
import { LandingPersonalizationSurvey } from '@/components/landing/LandingPersonalizationSurvey';

const journeyLabels: Record<string, string> = {
  'considering': 'Considering joining',
  'member': 'Current member',
  'alumni': 'Alumni/Graduate',
  'pastor': 'Pastor/Ministry leader',
};

const challengeLabels: Record<string, string> = {
  'disapproval': 'Family or church disapproval',
  'torn': 'Feeling torn',
  'responses': 'Need biblical responses',
  'growth': 'Spiritual growth',
};

const helpLabels: Record<string, string> = {
  'quick-answers': 'Quick answers to criticism',
  'daily-guidance': 'Daily spiritual guidance',
  'symbols': 'Understanding symbols & rituals',
  'healing': 'Processing hurt or conflict',
  'coaching': 'Coaching',
};

export function PersonalizationSettings() {
  const { surveyAnswers, completeSurvey, resetSurvey } = useLandingSurvey();
  const [showSurvey, setShowSurvey] = useState(false);

  const handleEditClick = () => {
    setShowSurvey(true);
  };

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    completeSurvey(answers);
    setShowSurvey(false);
  };

  if (!surveyAnswers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sacred" />
            Personalization
          </CardTitle>
          <CardDescription>
            Take a quick survey to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleEditClick} className="bg-sacred hover:bg-sacred/90">
            <Sparkles className="w-4 h-4 mr-2" />
            Personalize My Experience
          </Button>
          
          <LandingPersonalizationSurvey
            open={showSurvey}
            onComplete={handleSurveyComplete}
            onSkip={() => setShowSurvey(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sacred" />
              Personalization Settings
            </CardTitle>
            <CardDescription>
              Your preferences help us tailor your dashboard
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleEditClick}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Your Journey</p>
          <Badge variant="secondary">{journeyLabels[surveyAnswers.journey] || surveyAnswers.journey}</Badge>
          {surveyAnswers.alumniStatus && (
            <Badge variant="outline" className="ml-2">{surveyAnswers.alumniStatus}</Badge>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Main Challenge</p>
          <Badge variant="secondary">{challengeLabels[surveyAnswers.challenge] || surveyAnswers.challenge}</Badge>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Help Needed</p>
          <div className="flex flex-wrap gap-2">
            {surveyAnswers.helpNeeded.map((help) => (
              <Badge key={help} variant="outline" className="text-xs">
                {helpLabels[help] || help}
              </Badge>
            ))}
          </div>
        </div>

        {surveyAnswers.coachingType && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Coaching Preference</p>
            <Badge variant="secondary">
              {surveyAnswers.coachingType === 'group' ? 'Group Coaching' : 'Personalized Coaching'}
            </Badge>
          </div>
        )}
      </CardContent>
      
      <LandingPersonalizationSurvey
        open={showSurvey}
        onComplete={handleSurveyComplete}
        onSkip={() => setShowSurvey(false)}
      />
    </Card>
  );
}
