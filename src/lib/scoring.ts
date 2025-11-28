import { ComplianceAnswers, ComplianceScores, SacredGreeksAnswers, SacredGreeksScores, ResultType } from '@/types/assessment';

export function calculateComplianceScores(answers: ComplianceAnswers): {
  scores: ComplianceScores;
  resultType: ResultType;
} {
  const scores: ComplianceScores = {
    complianceRiskScore: 0,
    operationalCapacityScore: 50,
    financialRealityScore: 50,
    documentationAndTrainingScore: 50,
    leadershipStressScore: 50,
  };

  // Citation history affects compliance risk
  if (answers.citationHistory === 'Yes, in the past 12 months') {
    scores.complianceRiskScore += 40;
    scores.leadershipStressScore += 20;
  } else if (answers.citationHistory === 'Yes, more than 12 months ago') {
    scores.complianceRiskScore += 20;
  } else if (answers.citationHistory === 'Not sure') {
    scores.complianceRiskScore += 15;
  }

  // Policies and procedures
  if (answers.policies === 'Yes, up to date') {
    scores.documentationAndTrainingScore += 30;
    scores.complianceRiskScore -= 10;
  } else if (answers.policies === 'Yes, but outdated') {
    scores.documentationAndTrainingScore += 10;
    scores.complianceRiskScore += 15;
  } else if (answers.policies === 'Not really' || answers.policies === 'No') {
    scores.documentationAndTrainingScore -= 30;
    scores.complianceRiskScore += 30;
  }

  // Training plan
  if (answers.trainingPlan === 'Yes, formal training plan') {
    scores.documentationAndTrainingScore += 20;
    scores.operationalCapacityScore += 15;
  } else if (answers.trainingPlan === 'Some informal training') {
    scores.documentationAndTrainingScore += 5;
  } else {
    scores.documentationAndTrainingScore -= 20;
    scores.complianceRiskScore += 20;
  }

  // Timeline pressure
  if (answers.timeline === 'Within 30 days') {
    scores.leadershipStressScore += 30;
    scores.complianceRiskScore += 25;
    scores.operationalCapacityScore -= 20;
  } else if (answers.timeline === '31 to 90 days') {
    scores.leadershipStressScore += 15;
    scores.complianceRiskScore += 10;
  } else if (answers.timeline === '3 to 6 months') {
    scores.operationalCapacityScore += 10;
  } else {
    scores.operationalCapacityScore += 20;
    scores.leadershipStressScore -= 10;
  }

  // Staffing capacity
  if (answers.staffInvolved < 3) {
    scores.operationalCapacityScore -= 20;
    scores.leadershipStressScore += 15;
  } else if (answers.staffInvolved >= 10) {
    scores.operationalCapacityScore += 15;
  }

  // Scale of impact
  if (answers.individualsAffected > 50) {
    scores.complianceRiskScore += 15;
    scores.leadershipStressScore += 10;
  }

  // Normalize scores to 0-100
  Object.keys(scores).forEach((key) => {
    const scoreKey = key as keyof ComplianceScores;
    scores[scoreKey] = Math.max(0, Math.min(100, scores[scoreKey]));
  });

  // Determine result type
  const avgRisk = (scores.complianceRiskScore + scores.leadershipStressScore) / 2;
  const avgCapacity = (scores.operationalCapacityScore + scores.documentationAndTrainingScore) / 2;

  let resultType: ResultType;
  if (avgRisk > 60 || avgCapacity < 40) {
    resultType = 'high_risk';
  } else if (avgRisk > 35 || avgCapacity < 60) {
    resultType = 'medium_risk';
  } else {
    resultType = 'low_risk';
  }

  return { scores, resultType };
}

export function calculateSacredGreeksScores(answers: SacredGreeksAnswers): {
  scores: SacredGreeksScores;
  resultType: ResultType;
} {
  const scores: SacredGreeksScores = {
    biblicalClarity: 3,
    symbolRitualSensitivity: 3,
    traumaConscienceImpact: 3,
    witnessCommunityImpact: 3,
    relationalWisdom: 3,
  };

  // Emotions impact trauma/conscience and biblical clarity
  const traumaEmotions = ['Afraid of being judged', 'Ashamed', 'Hurt by church', 'Anxious'];
  const traumaCount = answers.emotions.filter(e => traumaEmotions.includes(e)).length;
  
  if (traumaCount > 0) {
    scores.traumaConscienceImpact += traumaCount;
  }

  if (answers.emotions.includes('Confused') || answers.emotions.includes('Numb')) {
    scores.biblicalClarity -= 1;
  }

  if (answers.emotions.includes('Hopeful') || answers.emotions.includes('Curious') || answers.emotions.includes('Peaceful')) {
    scores.traumaConscienceImpact -= 1;
    scores.biblicalClarity += 1;
  }

  if (answers.emotions.includes('Defensive') || answers.emotions.includes('Angry')) {
    scores.relationalWisdom += 1;
  }

  // Support level affects multiple dimensions
  if (answers.supportLevel === 'I feel alone in this' || answers.supportLevel === 'Little support, mostly opposition') {
    scores.traumaConscienceImpact += 1;
    scores.witnessCommunityImpact += 1;
    scores.relationalWisdom += 1;
  } else if (answers.supportLevel === 'Strong support from all (church, family, chapter)') {
    scores.relationalWisdom -= 1;
    scores.witnessCommunityImpact -= 1;
  }

  // Scenario-specific scoring
  if (answers.scenario === 'pressure') {
    scores.relationalWisdom += 2;
    scores.traumaConscienceImpact += 1;
    
    if (answers.scenarioSpecific.pressureSource === 'pastor' || answers.scenarioSpecific.pressureSource === 'multiple') {
      scores.witnessCommunityImpact += 1;
    }
  } else if (answers.scenario === 'denounce') {
    scores.biblicalClarity += 1;
    scores.witnessCommunityImpact += 1;
    
    if (answers.scenarioSpecific.currentBelief === 'sinful') {
      scores.traumaConscienceImpact += 1;
    } else if (answers.scenarioSpecific.currentBelief === 'unsure') {
      scores.biblicalClarity -= 1;
    }
  } else if (answers.scenario === 'symbol') {
    scores.symbolRitualSensitivity += 2;
    scores.biblicalClarity += 1;
  } else if (answers.scenario === 'event') {
    scores.witnessCommunityImpact += 1;
    scores.symbolRitualSensitivity += 1;
  } else if (answers.scenario === 'clip') {
    scores.biblicalClarity += 1;
    if (answers.scenarioSpecific.contentType === 'sermon') {
      scores.witnessCommunityImpact += 1;
    }
  }

  // Normalize scores to 1-5
  Object.keys(scores).forEach((key) => {
    const scoreKey = key as keyof SacredGreeksScores;
    scores[scoreKey] = Math.max(1, Math.min(5, scores[scoreKey]));
  });

  // Determine result type based on scenario and scores
  let resultType: ResultType;
  
  // High pressure situations
  if (scores.traumaConscienceImpact >= 4 || scores.relationalWisdom >= 4) {
    resultType = 'high_pressure';
  } 
  // Ministry/event scenarios
  else if (answers.scenario === 'event') {
    resultType = 'ministry_idea';
  }
  // Symbol confusion scenarios
  else if (answers.scenario === 'symbol') {
    resultType = 'symbol_clarity';
  }
  // Default to steady language for clip, denounce, and lower-pressure situations
  else {
    resultType = 'steady_language';
  }

  return { scores, resultType };
}
