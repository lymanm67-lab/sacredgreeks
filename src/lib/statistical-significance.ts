/**
 * Statistical Significance Calculator for A/B Testing
 * Uses Z-test for proportion comparison
 */

export interface ABTestResult {
  variantName: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
}

export interface SignificanceResult {
  isSignificant: boolean;
  confidenceLevel: number;
  zScore: number;
  pValue: number;
  relativeImprovement: number;
  winner: string | null;
  recommendedAction: string;
  sampleSizeNeeded: number;
  currentSampleSize: number;
  progressToSignificance: number;
}

/**
 * Calculate the Z-score for comparing two proportions
 */
const calculateZScore = (
  p1: number,
  n1: number,
  p2: number,
  n2: number
): number => {
  if (n1 === 0 || n2 === 0) return 0;
  
  // Pooled proportion
  const pPool = (p1 * n1 + p2 * n2) / (n1 + n2);
  
  // Standard error
  const se = Math.sqrt(pPool * (1 - pPool) * (1/n1 + 1/n2));
  
  if (se === 0) return 0;
  
  return (p1 - p2) / se;
};

/**
 * Convert Z-score to p-value (two-tailed test)
 */
const zScoreToPValue = (z: number): number => {
  // Approximation of the cumulative distribution function
  const absZ = Math.abs(z);
  const t = 1 / (1 + 0.2316419 * absZ);
  const d = 0.3989423 * Math.exp(-absZ * absZ / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  
  // Two-tailed p-value
  return 2 * p;
};

/**
 * Calculate minimum sample size needed for statistical significance
 * Based on desired power (80%) and significance level (5%)
 */
const calculateMinSampleSize = (
  baselineRate: number,
  minimumDetectableEffect: number = 0.2, // 20% relative improvement
  power: number = 0.8,
  alpha: number = 0.05
): number => {
  const p1 = baselineRate;
  const p2 = baselineRate * (1 + minimumDetectableEffect);
  const pAvg = (p1 + p2) / 2;
  
  // Z-values for power and significance
  const zAlpha = 1.96; // For 95% confidence
  const zBeta = 0.84; // For 80% power
  
  const numerator = 2 * pAvg * (1 - pAvg) * Math.pow(zAlpha + zBeta, 2);
  const denominator = Math.pow(p2 - p1, 2);
  
  if (denominator === 0) return 1000;
  
  return Math.ceil(numerator / denominator);
};

/**
 * Calculate statistical significance between control and variant
 */
export const calculateSignificance = (
  control: ABTestResult,
  variant: ABTestResult,
  confidenceThreshold: number = 0.95
): SignificanceResult => {
  const controlRate = control.visitors > 0 ? control.conversions / control.visitors : 0;
  const variantRate = variant.visitors > 0 ? variant.conversions / variant.visitors : 0;
  
  const zScore = calculateZScore(
    variantRate,
    variant.visitors,
    controlRate,
    control.visitors
  );
  
  const pValue = zScoreToPValue(zScore);
  const confidenceLevel = 1 - pValue;
  const isSignificant = confidenceLevel >= confidenceThreshold;
  
  const relativeImprovement = controlRate > 0 
    ? ((variantRate - controlRate) / controlRate) * 100 
    : 0;
  
  // Determine winner
  let winner: string | null = null;
  if (isSignificant) {
    winner = variantRate > controlRate ? variant.variantName : control.variantName;
  }
  
  // Calculate recommended sample size
  const baselineRate = controlRate || 0.05; // Default 5% if no data
  const sampleSizeNeeded = calculateMinSampleSize(baselineRate);
  const currentSampleSize = control.visitors + variant.visitors;
  const progressToSignificance = Math.min(100, (currentSampleSize / (sampleSizeNeeded * 2)) * 100);
  
  // Generate recommendation
  let recommendedAction = "";
  if (isSignificant) {
    if (variantRate > controlRate) {
      recommendedAction = `Implement "${variant.variantName}" — it outperforms control by ${relativeImprovement.toFixed(1)}% with ${(confidenceLevel * 100).toFixed(1)}% confidence.`;
    } else {
      recommendedAction = `Keep control — variant underperforms by ${Math.abs(relativeImprovement).toFixed(1)}% with ${(confidenceLevel * 100).toFixed(1)}% confidence.`;
    }
  } else {
    const moreNeeded = Math.max(0, sampleSizeNeeded * 2 - currentSampleSize);
    if (moreNeeded > 0) {
      recommendedAction = `Continue testing — need ~${moreNeeded.toLocaleString()} more visitors for statistical significance.`;
    } else {
      recommendedAction = "Continue testing — results are not yet statistically significant.";
    }
  }
  
  return {
    isSignificant,
    confidenceLevel,
    zScore,
    pValue,
    relativeImprovement,
    winner,
    recommendedAction,
    sampleSizeNeeded: sampleSizeNeeded * 2, // Total for both variants
    currentSampleSize,
    progressToSignificance,
  };
};

/**
 * Calculate significance for multiple variants against control
 */
export const calculateMultiVariantSignificance = (
  control: ABTestResult,
  variants: ABTestResult[],
  confidenceThreshold: number = 0.95
): Map<string, SignificanceResult> => {
  const results = new Map<string, SignificanceResult>();
  
  for (const variant of variants) {
    results.set(variant.variantName, calculateSignificance(control, variant, confidenceThreshold));
  }
  
  return results;
};

/**
 * Determine overall test winner from multiple variants
 */
export const findOverallWinner = (
  control: ABTestResult,
  variants: ABTestResult[],
  confidenceThreshold: number = 0.95
): { winner: ABTestResult | null; significance: SignificanceResult | null } => {
  let bestVariant: ABTestResult | null = null;
  let bestSignificance: SignificanceResult | null = null;
  let highestImprovement = 0;
  
  // Include control in comparison
  const allVariants = [control, ...variants];
  
  for (const variant of variants) {
    const significance = calculateSignificance(control, variant, confidenceThreshold);
    
    if (significance.isSignificant && significance.relativeImprovement > highestImprovement) {
      highestImprovement = significance.relativeImprovement;
      bestVariant = variant;
      bestSignificance = significance;
    }
  }
  
  // If no variant beats control significantly, check if control is best
  if (!bestVariant) {
    const controlRate = control.visitors > 0 ? control.conversions / control.visitors : 0;
    const anyVariantBetter = variants.some(v => {
      const vRate = v.visitors > 0 ? v.conversions / v.visitors : 0;
      return vRate > controlRate;
    });
    
    if (!anyVariantBetter && control.visitors > 100) {
      // Control is winning but may not be significant
      return { winner: control, significance: null };
    }
  }
  
  return { winner: bestVariant, significance: bestSignificance };
};
