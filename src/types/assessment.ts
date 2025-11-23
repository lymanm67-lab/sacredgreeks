export interface ComplianceAnswers {
  scenario: string;
  description: string;
  individualsAffected: number;
  staffInvolved: number;
  citationHistory: string;
  policies: string;
  trainingPlan: string;
  timeline: string;
  biggestFear: string;
  scenarioSpecific?: string;
}

export interface ComplianceScores {
  complianceRiskScore: number;
  operationalCapacityScore: number;
  financialRealityScore: number;
  documentationAndTrainingScore: number;
  leadershipStressScore: number;
}

export interface SacredGreeksAnswers {
  scenario: string;
  role: string;
  situation: string;
  emotions: string[];
  scenarioSpecific: Record<string, string>;
}

export interface SacredGreeksScores {
  biblicalClarity: number;
  consciencePeace: number;
  relationalRisk: number;
  symbolRisk: number;
  emotionalPressure: number;
}

export type ResultType = 'high_risk' | 'medium_risk' | 'low_risk' | 'steady_language' | 'high_pressure' | 'ministry_idea';
