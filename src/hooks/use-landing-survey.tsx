import { useState, useEffect } from 'react';

const SURVEY_KEY = 'sacred_greeks_landing_survey';
const SURVEY_COMPLETED_KEY = 'sacred_greeks_survey_completed';

export interface SurveyAnswers {
  journey: string;
  alumniStatus?: string;
  challenge: string;
  helpNeeded: string[];
  coachingType?: string;
}

export function useLandingSurvey() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem(SURVEY_COMPLETED_KEY);
    const savedAnswers = localStorage.getItem(SURVEY_KEY);
    
    console.log('[Survey] completed:', completed, 'savedAnswers:', !!savedAnswers);
    
    if (savedAnswers) {
      setSurveyAnswers(JSON.parse(savedAnswers));
    }
    
    if (!completed) {
      console.log('[Survey] Showing survey - not completed yet');
      setShowSurvey(true);
    } else {
      console.log('[Survey] Survey already completed/skipped');
    }
  }, []);

  const completeSurvey = (answers: SurveyAnswers) => {
    localStorage.setItem(SURVEY_KEY, JSON.stringify(answers));
    localStorage.setItem(SURVEY_COMPLETED_KEY, 'true');
    setSurveyAnswers(answers);
    setShowSurvey(false);
  };

  const skipSurvey = () => {
    localStorage.setItem(SURVEY_COMPLETED_KEY, 'skipped');
    setShowSurvey(false);
  };

  const resetSurvey = () => {
    localStorage.removeItem(SURVEY_KEY);
    localStorage.removeItem(SURVEY_COMPLETED_KEY);
    setSurveyAnswers(null);
    setShowSurvey(true);
  };

  return { showSurvey, surveyAnswers, completeSurvey, skipSurvey, resetSurvey };
}
