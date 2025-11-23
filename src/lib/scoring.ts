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
    consciencePeace: 3,
    relationalRisk: 2,
    symbolRisk: 2,
    emotionalPressure: 2,
  };

  // Emotions impact emotional pressure and conscience peace
  const highPressureEmotions = ['Afraid of being judged', 'Ashamed', 'Hurt by church'];
  const emotionalPressureCount = answers.emotions.filter(e => 
    highPressureEmotions.includes(e)
  ).length;
  
  if (emotionalPressureCount > 0) {
    scores.emotionalPressure += emotionalPressureCount;
    scores.consciencePeace -= 1;
  }

  if (answers.emotions.includes('Confused') || answers.emotions.includes('Numb')) {
    scores.biblicalClarity -= 1;
  }

  if (answers.emotions.includes('Hopeful') || answers.emotions.includes('Curious')) {
    scores.consciencePeace += 1;
  }

  // Scenario-specific scoring
  if (answers.scenario === 'pressure') {
    scores.relationalRisk += 2;
    scores.emotionalPressure += 1;
    
    if (answers.scenarioSpecific.belief === 'not sure') {
      scores.biblicalClarity -= 1;
      scores.consciencePeace -= 1;
    }
  } else if (answers.scenario === 'event') {
    scores.symbolRisk += 1;
    if (answers.scenarioSpecific.concern?.includes('symbol')) {
      scores.symbolRisk += 1;
    }
  }

  // Normalize scores to 1-5
  Object.keys(scores).forEach((key) => {
    const scoreKey = key as keyof SacredGreeksScores;
    scores[scoreKey] = Math.max(1, Math.min(5, scores[scoreKey]));
  });

  // Determine result type
  let resultType: ResultType;
  if (scores.emotionalPressure >= 4 || scores.relationalRisk >= 4) {
    resultType = 'high_pressure';
  } else if (answers.scenario === 'event') {
    resultType = 'ministry_idea';
  } else {
    resultType = 'steady_language';
  }

  return { scores, resultType };
}
