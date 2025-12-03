// Stripe product IDs for Sacred Greeks tiers
export const TIER_PRODUCTS = {
  free: null,
  pro: 'prod_TVYrOSsEoHLuT5',
  proAnnual: 'prod_TVYwmhkWRYHatX',
  ministry: 'prod_TVYwpo8aT8QRf5',
  ministryAnnual: 'prod_TVYwTWFRMDG9Lx',
} as const;

export type TierLevel = 'free' | 'pro' | 'ministry';

// Map product IDs to tier levels
export function getTierFromProductId(productId: string | null): TierLevel {
  if (!productId) return 'free';
  
  switch (productId) {
    case TIER_PRODUCTS.pro:
    case TIER_PRODUCTS.proAnnual:
      return 'pro';
    case TIER_PRODUCTS.ministry:
    case TIER_PRODUCTS.ministryAnnual:
      return 'ministry';
    default:
      return 'free';
  }
}

// Feature definitions with tier access
export interface FeatureDefinition {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'study' | 'prayer' | 'community' | 'ai' | 'chapter';
  minTier: TierLevel;
  canHide: boolean; // Whether users can hide this feature
  icon?: string;
}

export const FEATURES: FeatureDefinition[] = [
  // Core features - Available to all
  { id: '30-day-journey', name: '30-Day Journey', description: 'Daily readings through P.R.O.O.F. framework', category: 'core', minTier: 'free', canHide: true },
  { id: 'daily-devotional', name: 'Daily Devotional', description: 'Scripture-based daily reflections', category: 'core', minTier: 'free', canHide: true },
  { id: 'myth-buster', name: 'Myth Buster', description: 'Biblical responses to common accusations', category: 'study', minTier: 'free', canHide: true },
  { id: 'symbol-guide', name: 'Symbol Guide', description: 'Christian perspectives on Greek symbolism', category: 'study', minTier: 'free', canHide: true },
  { id: 'prayer-journal', name: 'Prayer Journal', description: 'Track your prayers and answered requests', category: 'prayer', minTier: 'free', canHide: true },
  { id: 'prayer-wall', name: 'Prayer Wall', description: 'Share and support community prayer requests', category: 'community', minTier: 'free', canHide: true },
  { id: 'bible-study', name: 'Bible Study', description: 'Search Scripture and explore reading plans', category: 'study', minTier: 'free', canHide: true },
  { id: 'bookmarks', name: 'Bookmarks', description: 'Access your saved resources', category: 'core', minTier: 'free', canHide: true },
  { id: 'achievements', name: 'Achievements', description: 'View your progress and unlocked badges', category: 'core', minTier: 'free', canHide: true },
  { id: 'did-you-know', name: 'Did You Know?', description: 'Educational content and videos', category: 'study', minTier: 'free', canHide: true },
  { id: 'new-assessment', name: 'New Assessment', description: 'Discover your 5 Persona Types', category: 'core', minTier: 'free', canHide: true },
  { id: 'shattered-masks', name: 'Shattered Masks', description: 'Discover your archetype', category: 'core', minTier: 'free', canHide: true },
  { id: 'assessment-history', name: 'My Assessments', description: 'View your past assessment results', category: 'core', minTier: 'free', canHide: true },
  { id: 'service-hours', name: 'Service Hours', description: 'Track community service activities', category: 'core', minTier: 'free', canHide: true },
  { id: 'content-hub', name: 'Content Hub', description: 'Podcasts, videos, and study guides', category: 'study', minTier: 'free', canHide: true },
  { id: 'family-fallout', name: 'Family & Ministry Fallout', description: 'Navigate damaged relationships', category: 'core', minTier: 'free', canHide: true },
  { id: 'bglo-objections', name: 'Handle Objections', description: 'Navigate BGLO challenges with PROOF', category: 'study', minTier: 'free', canHide: true },
  
  // Community features
  { id: 'org-community', name: 'Greek Community', description: 'Connect with other Sacred Greeks', category: 'community', minTier: 'free', canHide: true },
  { id: 'forum', name: 'Discussion Forum', description: 'Join conversations with the community', category: 'community', minTier: 'free', canHide: true },
  
  // Pro features - Require Pro tier
  { id: 'ask-dr-lyman', name: 'Ask Dr. Lyman', description: 'AI-powered answers to your questions', category: 'ai', minTier: 'pro', canHide: true },
  { id: 'prayer-guide', name: 'Prayer Guide', description: 'AI prayers, templates & learning', category: 'ai', minTier: 'pro', canHide: true },
  { id: 'response-coach', name: 'Response Coach', description: 'AI-powered conversation practice', category: 'ai', minTier: 'pro', canHide: true },
  { id: 'coaching', name: 'Coaching Application', description: 'Apply for personalized coaching', category: 'ai', minTier: 'pro', canHide: true },
  
  // Ministry features - Require Ministry tier
  { id: 'chapter-resources', name: 'Chapter Resources', description: 'Resources for chapter leaders', category: 'chapter', minTier: 'ministry', canHide: true },
  { id: 'chapter-meeting-notes', name: 'Chapter Meeting Notes', description: 'Track chapter meetings', category: 'chapter', minTier: 'ministry', canHide: true },
];

// Get features available for a tier
export function getFeaturesForTier(tier: TierLevel): FeatureDefinition[] {
  const tierOrder: TierLevel[] = ['free', 'pro', 'ministry'];
  const tierIndex = tierOrder.indexOf(tier);
  
  return FEATURES.filter(feature => {
    const featureTierIndex = tierOrder.indexOf(feature.minTier);
    return featureTierIndex <= tierIndex;
  });
}

// Check if a feature is available for a tier
export function isFeatureAvailable(featureId: string, tier: TierLevel): boolean {
  const feature = FEATURES.find(f => f.id === featureId);
  if (!feature) return false;
  
  const tierOrder: TierLevel[] = ['free', 'pro', 'ministry'];
  const tierIndex = tierOrder.indexOf(tier);
  const featureTierIndex = tierOrder.indexOf(feature.minTier);
  
  return featureTierIndex <= tierIndex;
}

// Get features by category
export function getFeaturesByCategory(tier: TierLevel) {
  const available = getFeaturesForTier(tier);
  const categories = ['core', 'study', 'prayer', 'community', 'ai', 'chapter'] as const;
  
  return categories.reduce((acc, category) => {
    acc[category] = available.filter(f => f.category === category);
    return acc;
  }, {} as Record<typeof categories[number], FeatureDefinition[]>);
}

// Tier display info
export const TIER_INFO = {
  free: {
    name: 'Free',
    description: 'Basic access to core features',
    price: '$0',
    maxHiddenFeatures: 5,
  },
  pro: {
    name: 'Pro',
    description: 'Full access with AI-powered tools',
    price: '$9.99/mo',
    maxHiddenFeatures: null, // Unlimited
    priceId: 'price_1SYXjdLMtnFcNpvTGb2LX4v7',
  },
  ministry: {
    name: 'Ministry',
    description: 'Team features for chapter leaders',
    price: '$29.99/mo',
    maxHiddenFeatures: null, // Unlimited
  },
} as const;
