import { DemoFeatures, DemoScenario } from '@/contexts/DemoModeContext';

export type OnboardingTemplateType = 'sales' | 'training' | 'investor' | 'new-member' | 'chapter-leader' | 'custom';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  highlight?: string; // CSS selector for element to highlight
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  duration?: number; // auto-advance after ms
}

export interface OnboardingTemplate {
  id: OnboardingTemplateType;
  name: string;
  description: string;
  icon: string;
  scenario: DemoScenario;
  features: Partial<DemoFeatures>;
  tourSteps: TourStep[];
  settings: {
    showBanner: boolean;
    autoAdvance: boolean;
    showProgress: boolean;
  };
}

export const ONBOARDING_TEMPLATES: OnboardingTemplate[] = [
  {
    id: 'sales',
    name: 'Sales Demo',
    description: 'Showcase key features to potential partners or organizations',
    icon: '💼',
    scenario: 'power-user',
    features: {
      dashboard: true,
      prayerWall: true,
      achievements: true,
      progress: true,
      serviceTracker: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Welcome to Sacred Greeks',
        description: 'A comprehensive faith-based platform designed specifically for Greek organizations.',
        route: '/',
        position: 'center',
      },
      {
        id: 'dashboard-overview',
        title: 'Personalized Dashboard',
        description: 'Each member gets a personalized dashboard with daily devotionals, progress tracking, and quick actions.',
        route: '/dashboard',
        position: 'top',
      },
      {
        id: 'prayer-wall',
        title: 'Community Prayer Wall',
        description: 'Members can share prayer requests and support each other spiritually. Filter by chapter or organization.',
        route: '/prayer-wall',
        position: 'center',
      },
      {
        id: 'service-tracker',
        title: 'Service Hour Tracking',
        description: 'Track community service hours with built-in verification and reporting features.',
        route: '/service-tracker',
        position: 'center',
      },
      {
        id: 'achievements',
        title: 'Gamification & Engagement',
        description: 'Badges, streaks, and achievements keep members engaged and motivated.',
        route: '/achievements',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'Ready to Partner?',
        description: 'Sacred Greeks helps Greek organizations build faith-centered communities. Contact us to learn more.',
        route: '/',
        position: 'center',
      },
    ],
    settings: {
      showBanner: true,
      autoAdvance: false,
      showProgress: true,
    },
  },
  {
    id: 'training',
    name: 'Member Training',
    description: 'Onboard new members with a guided walkthrough of all features',
    icon: '📚',
    scenario: 'new-user',
    features: {
      dashboard: true,
      devotional: true,
      prayerJournal: true,
      bibleStudy: true,
      journey: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Welcome, New Member!',
        description: 'Let\'s walk through everything you need to know to get started with Sacred Greeks.',
        route: '/',
        position: 'center',
      },
      {
        id: 'dashboard',
        title: 'Your Home Base',
        description: 'The dashboard is where you\'ll start each day. Check your daily devotional and see your progress.',
        route: '/dashboard',
        position: 'top',
      },
      {
        id: 'devotional',
        title: 'Daily Devotionals',
        description: 'Start each day with scripture and reflection. Mark them complete to build your streak!',
        route: '/devotional',
        position: 'center',
      },
      {
        id: 'prayer-journal',
        title: 'Your Prayer Journal',
        description: 'Keep track of your prayers and mark them as answered. A private space for your spiritual journey.',
        route: '/prayer-journal',
        position: 'center',
      },
      {
        id: 'bible-study',
        title: 'Bible Study Tools',
        description: 'Search scriptures, save favorites, and deepen your understanding with AI-powered insights.',
        route: '/bible-study',
        position: 'center',
      },
      {
        id: 'journey',
        title: '21-Day Journey',
        description: 'Transform your faith walk with our structured 21-day journey program.',
        route: '/journey',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'You\'re All Set!',
        description: 'Explore at your own pace. Remember, consistency is key to spiritual growth!',
        route: '/dashboard',
        position: 'center',
      },
    ],
    settings: {
      showBanner: true,
      autoAdvance: false,
      showProgress: true,
    },
  },
  {
    id: 'investor',
    name: 'Investor Pitch',
    description: 'Highlight metrics, engagement, and growth potential',
    icon: '📈',
    scenario: 'power-user',
    features: {
      dashboard: true,
      achievements: true,
      progress: true,
      forum: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Sacred Greeks Platform',
        description: 'Faith-centered community platform serving Greek organizations nationwide.',
        route: '/',
        position: 'center',
      },
      {
        id: 'engagement',
        title: 'High User Engagement',
        description: 'Gamification, streaks, and achievements drive daily active usage. See the engagement metrics.',
        route: '/progress',
        position: 'center',
      },
      {
        id: 'community',
        title: 'Community Features',
        description: 'Forums and prayer walls create sticky, community-driven engagement.',
        route: '/forum',
        position: 'center',
      },
      {
        id: 'achievements',
        title: 'Retention Through Gamification',
        description: 'Badge system and level progression keeps users coming back.',
        route: '/achievements',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'Growth Opportunity',
        description: 'Expanding to more Greek organizations and faith communities. Let\'s discuss partnership.',
        route: '/',
        position: 'center',
      },
    ],
    settings: {
      showBanner: false,
      autoAdvance: false,
      showProgress: true,
    },
  },
  {
    id: 'new-member',
    name: 'Quick Start',
    description: 'Fast introduction to essential features for new users',
    icon: '🚀',
    scenario: 'new-user',
    features: {
      dashboard: true,
      devotional: true,
      prayerJournal: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Quick Start Guide',
        description: 'In just a few steps, you\'ll be ready to use Sacred Greeks!',
        route: '/',
        position: 'center',
      },
      {
        id: 'dashboard',
        title: 'Start Here Daily',
        description: 'Your dashboard shows everything you need. Check in each day!',
        route: '/dashboard',
        position: 'top',
      },
      {
        id: 'devotional',
        title: 'Daily Devotional',
        description: 'Read, reflect, and grow spiritually each day.',
        route: '/devotional',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'Go Explore!',
        description: 'That\'s the basics! Discover more features as you go.',
        route: '/dashboard',
        position: 'center',
      },
    ],
    settings: {
      showBanner: true,
      autoAdvance: false,
      showProgress: true,
    },
  },
  {
    id: 'chapter-leader',
    name: 'Chapter Leader',
    description: 'Admin and leadership features for chapter officers',
    icon: '👑',
    scenario: 'greek-leader',
    features: {
      dashboard: true,
      prayerWall: true,
      forum: true,
      serviceTracker: true,
      achievements: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Chapter Leader Guide',
        description: 'Learn how to manage your chapter\'s faith journey on Sacred Greeks.',
        route: '/',
        position: 'center',
      },
      {
        id: 'dashboard',
        title: 'Leadership Dashboard',
        description: 'Monitor chapter engagement and see who needs encouragement.',
        route: '/dashboard',
        position: 'top',
      },
      {
        id: 'prayer-wall',
        title: 'Moderate Prayer Requests',
        description: 'Foster community by encouraging members to support each other.',
        route: '/prayer-wall',
        position: 'center',
      },
      {
        id: 'service',
        title: 'Track Chapter Service',
        description: 'Monitor and verify community service hours for your chapter.',
        route: '/service-tracker',
        position: 'center',
      },
      {
        id: 'forum',
        title: 'Community Discussions',
        description: 'Start discussions and keep your chapter connected.',
        route: '/forum',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'Lead by Example',
        description: 'Your engagement inspires others. Start your daily devotional to set the pace!',
        route: '/devotional',
        position: 'center',
      },
    ],
    settings: {
      showBanner: true,
      autoAdvance: false,
      showProgress: true,
    },
  },
  {
    id: 'custom',
    name: 'Custom Template',
    description: 'Build your own onboarding experience',
    icon: '⚙️',
    scenario: 'custom',
    features: {
      dashboard: true,
      prayerWall: true,
      forum: true,
      bibleStudy: true,
      serviceTracker: true,
      journey: true,
      achievements: true,
      progress: true,
      devotional: true,
      prayerJournal: true,
    },
    tourSteps: [
      {
        id: 'welcome',
        title: 'Custom Demo',
        description: 'This is a customizable template. Edit the steps to create your own tour.',
        route: '/',
        position: 'center',
      },
      {
        id: 'complete',
        title: 'Explore Freely',
        description: 'All features are enabled. Explore at your own pace!',
        route: '/dashboard',
        position: 'center',
      },
    ],
    settings: {
      showBanner: true,
      autoAdvance: false,
      showProgress: true,
    },
  },
];

export function getTemplateById(id: OnboardingTemplateType): OnboardingTemplate | undefined {
  return ONBOARDING_TEMPLATES.find(t => t.id === id);
}

export function exportTemplate(template: OnboardingTemplate): string {
  return JSON.stringify(template, null, 2);
}

export function validateImportedConfig(data: unknown): data is OnboardingTemplate {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.scenario === 'string' &&
    Array.isArray(obj.tourSteps) &&
    typeof obj.features === 'object'
  );
}
