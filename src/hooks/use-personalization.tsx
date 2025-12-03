import { useMemo } from 'react';
import { useLandingSurvey, SurveyAnswers } from './use-landing-survey';

export interface PersonalizedContent {
  welcomeMessage: string;
  priorityActions: string[];
  recommendedResources: string[];
  focusArea: string;
  journeyType: 'active' | 'alumni' | 'potential' | 'supporter' | 'leader';
}

const getJourneyType = (journey: string): PersonalizedContent['journeyType'] => {
  switch (journey) {
    case 'active': return 'active';
    case 'alumni': return 'alumni';
    case 'potential': return 'potential';
    case 'supporter': return 'supporter';
    case 'leader': return 'leader';
    default: return 'active';
  }
};

const getWelcomeMessage = (answers: SurveyAnswers): string => {
  const { journey, alumniStatus, challenge } = answers;
  
  if (journey === 'alumni') {
    if (alumniStatus === 'reconnecting') {
      return "Welcome back! We're here to help you reconnect with your Greek identity through faith.";
    }
    if (alumniStatus === 'inactive') {
      return "Welcome! Whether you've stepped away or just exploring, we have resources for your journey.";
    }
    return "Welcome, distinguished alumni! Your experience and wisdom enrich our community.";
  }
  
  if (journey === 'potential') {
    return "Welcome! Explore what it means to be Greek and Christian before making your decision.";
  }
  
  if (journey === 'leader') {
    return "Welcome, chapter leader! We have tools to help you guide your members spiritually.";
  }
  
  if (journey === 'supporter') {
    return "Welcome! Thank you for supporting Greek Christians in their faith journey.";
  }
  
  // Active member - personalize by challenge
  if (challenge === 'faith_identity') {
    return "Welcome! Let's explore how your faith and Greek identity work together.";
  }
  if (challenge === 'family_pressure') {
    return "Welcome! We understand the challenges of family concerns about Greek life.";
  }
  if (challenge === 'church_conflict') {
    return "Welcome! Navigate church concerns about Greek membership with confidence.";
  }
  
  return "Welcome to Sacred Greeks! Your personalized spiritual journey starts here.";
};

const getPriorityActions = (answers: SurveyAnswers): string[] => {
  const { journey, challenge, helpNeeded, coachingType } = answers;
  const actions: string[] = [];
  
  // If coaching was selected, prioritize that
  if (helpNeeded.includes('coaching')) {
    actions.push('coaching-application');
  }
  
  // Based on challenge
  if (challenge === 'faith_identity') {
    actions.push('30-day-journey', 'symbol-guide', 'myth-buster');
  } else if (challenge === 'family_pressure') {
    actions.push('family-fallout', 'bglo-objections', 'ask-dr-lyman');
  } else if (challenge === 'church_conflict') {
    actions.push('myth-buster', 'bglo-objections', 'resources');
  } else if (challenge === 'spiritual_growth') {
    actions.push('daily-devotional', 'prayer-journal', 'bible-study');
  } else if (challenge === 'leadership') {
    actions.push('org-community', 'forum', 'study-guide');
  }
  
  // Based on help needed
  if (helpNeeded.includes('daily_devotional')) {
    if (!actions.includes('daily-devotional')) actions.push('daily-devotional');
  }
  if (helpNeeded.includes('community')) {
    if (!actions.includes('org-community')) actions.push('org-community');
    if (!actions.includes('forum')) actions.push('forum');
  }
  if (helpNeeded.includes('resources')) {
    if (!actions.includes('resources')) actions.push('resources');
    actions.push('content-hub');
  }
  
  // Journey-specific additions
  if (journey === 'potential') {
    actions.unshift('symbol-guide', 'myth-buster');
  }
  if (journey === 'alumni' && answers.alumniStatus === 'reconnecting') {
    actions.unshift('org-community', '30-day-journey');
  }
  
  // Remove duplicates and limit
  return [...new Set(actions)].slice(0, 6);
};

const getRecommendedResources = (answers: SurveyAnswers): string[] => {
  const { challenge, helpNeeded } = answers;
  const resources: string[] = [];
  
  if (challenge === 'faith_identity' || helpNeeded.includes('resources')) {
    resources.push('Biblical Framework for BGLO Membership');
    resources.push('Symbol Guide - Christian Perspectives');
  }
  
  if (challenge === 'family_pressure' || challenge === 'church_conflict') {
    resources.push('Handling Objections Guide');
    resources.push('Family Ministry Fallout Resources');
  }
  
  if (helpNeeded.includes('daily_devotional')) {
    resources.push('30-Day Devotional Journey');
    resources.push('Daily Scripture Reflections');
  }
  
  return resources.slice(0, 4);
};

const getFocusArea = (answers: SurveyAnswers): string => {
  const { challenge } = answers;
  
  switch (challenge) {
    case 'faith_identity':
      return 'Integrating Faith & Greek Identity';
    case 'family_pressure':
      return 'Family Communication & Understanding';
    case 'church_conflict':
      return 'Church & Ministry Relationships';
    case 'spiritual_growth':
      return 'Deepening Your Spiritual Walk';
    case 'leadership':
      return 'Leading with Faith';
    default:
      return 'Your Spiritual Journey';
  }
};

export function usePersonalization() {
  const { surveyAnswers } = useLandingSurvey();
  
  const personalization = useMemo<PersonalizedContent | null>(() => {
    if (!surveyAnswers) return null;
    
    return {
      welcomeMessage: getWelcomeMessage(surveyAnswers),
      priorityActions: getPriorityActions(surveyAnswers),
      recommendedResources: getRecommendedResources(surveyAnswers),
      focusArea: getFocusArea(surveyAnswers),
      journeyType: getJourneyType(surveyAnswers.journey),
    };
  }, [surveyAnswers]);
  
  return {
    personalization,
    hasCompletedSurvey: !!surveyAnswers,
    surveyAnswers,
  };
}
