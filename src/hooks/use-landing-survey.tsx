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
    // Check for force show via URL param (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get('survey') === 'true';
    
    if (forceShow) {
      localStorage.removeItem(SURVEY_COMPLETED_KEY);
      setShowSurvey(true);
      return;
    }
    
    const completed = localStorage.getItem(SURVEY_COMPLETED_KEY);
    const savedAnswers = localStorage.getItem(SURVEY_KEY);
    
    if (savedAnswers) {
      setSurveyAnswers(JSON.parse(savedAnswers));
    }
    
    if (!completed) {
      setShowSurvey(true);
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
