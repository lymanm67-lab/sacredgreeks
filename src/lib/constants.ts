/**
 * Application-wide constants
 * Centralized location for magic strings, numbers, and configuration values
 */

// API & Backend
export const API_ENDPOINTS = {
  SUPABASE_FUNCTIONS_BASE: '/functions/v1',
} as const;

// Pagination & Limits
export const LIMITS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MAX_PRAYER_REQUESTS: 50,
  MAX_BOOKMARKS: 100,
  MAX_SEARCH_RESULTS: 25,
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW_MS: 60000, // 1 minute
} as const;

// Cache & Performance
export const CACHE = {
  STALE_TIME_SHORT: 1000 * 60 * 2, // 2 minutes
  STALE_TIME_MEDIUM: 1000 * 60 * 5, // 5 minutes
  STALE_TIME_LONG: 1000 * 60 * 30, // 30 minutes
  GC_TIME: 1000 * 60 * 60, // 1 hour
} as const;

// Timeouts
export const TIMEOUTS = {
  DEBOUNCE_DEFAULT: 300,
  DEBOUNCE_SEARCH: 500,
  TOAST_DURATION: 4000,
  ANIMATION_DURATION: 300,
  AUTO_SAVE_DELAY: 1000,
} as const;

// UI Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_AI_ASSISTANT: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_GAMIFICATION: true,
  ENABLE_FORUM: true,
  ENABLE_COACHING: true,
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  MINISTRY: 'ministry',
} as const;

export const TIER_LIMITS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    maxHiddenFeatures: 5,
    mythBusterTopics: 3,
    journeyDays: 7,
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    maxHiddenFeatures: Infinity,
    mythBusterTopics: Infinity,
    journeyDays: 30,
  },
  [SUBSCRIPTION_TIERS.MINISTRY]: {
    maxHiddenFeatures: Infinity,
    mythBusterTopics: Infinity,
    journeyDays: 30,
  },
} as const;

// Greek Organizations
export const GREEK_COUNCILS = {
  NPHC: 'National Pan-Hellenic Council',
  NPC: 'National Panhellenic Conference',
  IFC: 'Interfraternity Council',
  NAPA: 'National APIA Panhellenic Association',
  NALFO: 'National Association of Latino Fraternal Organizations',
  MGC: 'Multicultural Greek Council',
} as const;

// P.R.O.O.F. Framework
export const PROOF_FRAMEWORK = {
  P: 'Purpose',
  R: 'Rituals',
  O_1: 'Obligations',
  O_2: 'Outcomes',
  F: 'Fellowship',
} as const;

// Validation Limits
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  MESSAGE_MAX_LENGTH: 2000,
  PRAYER_TITLE_MAX_LENGTH: 200,
  PRAYER_CONTENT_MAX_LENGTH: 5000,
  FORUM_TITLE_MAX_LENGTH: 200,
  FORUM_CONTENT_MAX_LENGTH: 10000,
} as const;

// Streak & Gamification
export const GAMIFICATION = {
  POINTS_PER_DEVOTIONAL: 10,
  POINTS_PER_PRAYER: 5,
  POINTS_PER_ASSESSMENT: 25,
  POINTS_PER_FORUM_POST: 15,
  STREAK_BONUS_MULTIPLIER: 1.5,
  LEVEL_UP_THRESHOLD: 100,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'sacred-greeks-theme',
  ONBOARDING_COMPLETE: 'sacred-greeks-onboarding',
  DEMO_MODE: 'sacred-greeks-demo',
  SURVEY_ANSWERS: 'sacred-greeks-survey',
  LAST_VISIT: 'sacred-greeks-last-visit',
  EXPANDED_SECTIONS: 'sacred-greeks-expanded-sections',
  COOKIE_CONSENT: 'sacred-greeks-cookies',
} as const;

// External URLs
export const EXTERNAL_URLS = {
  MAIN_WEBSITE: 'https://www.sacredgreeks.com',
  INSTAGRAM: 'https://instagram.com/sacredgreeks',
  TWITTER: 'https://twitter.com/sacredgreeks',
  FACEBOOK: 'https://facebook.com/sacredgreeks',
  YOUTUBE: 'https://youtube.com/@sacredgreeks',
  DISCORD: 'https://discord.gg/sacredgreeks',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please sign in to continue.',
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  VALIDATION: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  SUBMITTED: 'Submitted successfully.',
  COPIED: 'Copied to clipboard.',
} as const;
