// Comprehensive demo sample data for all features

export interface DemoDevotional {
  id: string;
  date: string;
  title: string;
  scripture_ref: string;
  scripture_text: string;
  reflection: string;
  application: string;
  prayer: string;
  proof_focus: string;
}

export interface DemoPrayerRequest {
  id: string;
  title: string;
  description: string;
  request_type: string;
  privacy_level: string;
  prayer_count: number;
  answered: boolean;
  created_at: string;
  user_name: string;
}

export interface DemoAchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  achievement_type: string;
  points_required: number;
  earned: boolean;
  earned_at?: string;
}

export interface DemoUserStats {
  totalPrayers: number;
  answeredPrayers: number;
  devotionalStreak: number;
  journeyDaysCompleted: number;
  serviceHours: number;
  totalPoints: number;
  currentLevel: number;
  achievementsEarned: number;
}

// Demo Devotional
export const DEMO_DEVOTIONAL: DemoDevotional = {
  id: 'demo-devotional-today',
  date: new Date().toISOString().split('T')[0],
  title: 'Walking in Faith, Not Fear',
  scripture_ref: '2 Timothy 1:7',
  scripture_text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
  reflection: 'In our journey through Greek life, we often face moments that test our courage. Whether it\'s standing up for our values, leading with integrity, or simply being authentic in a crowd, fear can be a constant companion. But Paul\'s words to Timothy remind us that fear is not from God. Instead, we are equipped with power to overcome challenges, love to guide our relationships, and a sound mind to make wise decisions. As you navigate your day in your chapter, remember that the same Spirit who empowered the early church empowers you today.',
  application: 'Today, identify one area where fear has been holding you back in your chapter or personal life. Write it down and speak this verse over that situation. Take one small step of faith in that area, trusting that God has given you power to face it.',
  prayer: 'Lord, thank You for not leaving me defenseless against fear. I claim the power, love, and sound mind You\'ve given me. Help me to walk boldly in faith today, especially in [specific situation]. May my confidence come not from my own strength but from knowing You are with me. Amen.',
  proof_focus: 'Power - God equips us to handle challenges with divine strength, not human effort.',
};

// Demo Prayer Wall Requests
export const DEMO_PRAYER_REQUESTS: DemoPrayerRequest[] = [
  {
    id: 'demo-request-1',
    title: 'Guidance for Chapter Elections',
    description: 'Our chapter is going through elections next week. Praying for wisdom in choosing leaders who will guide us with integrity and faithfulness.',
    request_type: 'request',
    privacy_level: 'public',
    prayer_count: 23,
    answered: false,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user_name: 'Marcus T.',
  },
  {
    id: 'demo-request-2',
    title: 'Healing for Brother\'s Family',
    description: 'One of our brothers lost his father unexpectedly. Please pray for comfort and peace for his family during this difficult time.',
    request_type: 'request',
    privacy_level: 'public',
    prayer_count: 67,
    answered: false,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    user_name: 'Chapter Chaplain',
  },
  {
    id: 'demo-request-3',
    title: 'Praise - Scholarship Awarded!',
    description: 'God answered our prayers! Brother James received the scholarship he needed to continue his education. Thank You, Lord!',
    request_type: 'praise',
    privacy_level: 'public',
    prayer_count: 45,
    answered: true,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user_name: 'Soror Angela',
  },
  {
    id: 'demo-request-4',
    title: 'Unity in Our Chapter',
    description: 'We\'ve had some disagreements lately. Praying that God brings unity and helps us remember why we joined - to serve and uplift each other.',
    request_type: 'request',
    privacy_level: 'public',
    prayer_count: 34,
    answered: false,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    user_name: 'Derek M.',
  },
  {
    id: 'demo-request-5',
    title: 'Service Project Success',
    description: 'This weekend we\'re hosting a community service event. Pray for good weather, willing hearts, and that we impact lives for Christ.',
    request_type: 'request',
    privacy_level: 'public',
    prayer_count: 28,
    answered: false,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    user_name: 'Service Chair',
  },
];

// Demo Achievements
export const DEMO_ACHIEVEMENTS: DemoAchievementBadge[] = [
  {
    id: 'demo-achievement-1',
    title: 'First Steps',
    description: 'Complete your first devotional reading',
    icon: 'footprints',
    achievement_type: 'devotional',
    points_required: 10,
    earned: true,
    earned_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-achievement-2',
    title: 'Prayer Warrior',
    description: 'Record 10 prayers in your journal',
    icon: 'hands',
    achievement_type: 'prayer',
    points_required: 50,
    earned: true,
    earned_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-achievement-3',
    title: 'Week Warrior',
    description: 'Maintain a 7-day devotional streak',
    icon: 'flame',
    achievement_type: 'streak',
    points_required: 75,
    earned: true,
    earned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-achievement-4',
    title: 'Community Builder',
    description: 'Support 5 prayer requests on the wall',
    icon: 'users',
    achievement_type: 'community',
    points_required: 25,
    earned: true,
    earned_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-achievement-5',
    title: 'Scripture Scholar',
    description: 'Complete 10 Bible study sessions',
    icon: 'book',
    achievement_type: 'study',
    points_required: 100,
    earned: false,
  },
  {
    id: 'demo-achievement-6',
    title: 'Service Star',
    description: 'Log 20 hours of community service',
    icon: 'star',
    achievement_type: 'service',
    points_required: 150,
    earned: false,
  },
  {
    id: 'demo-achievement-7',
    title: 'Journey Master',
    description: 'Complete the 21-day faith journey',
    icon: 'trophy',
    achievement_type: 'journey',
    points_required: 200,
    earned: false,
  },
  {
    id: 'demo-achievement-8',
    title: 'Answered Prayer',
    description: 'Mark your first prayer as answered',
    icon: 'check-circle',
    achievement_type: 'prayer',
    points_required: 20,
    earned: true,
    earned_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Demo User Stats
export const DEMO_USER_STATS: DemoUserStats = {
  totalPrayers: 12,
  answeredPrayers: 4,
  devotionalStreak: 7,
  journeyDaysCompleted: 8,
  serviceHours: 16,
  totalPoints: 425,
  currentLevel: 4,
  achievementsEarned: 5,
};

// Demo Verse of the Day
export const DEMO_VERSE_OF_DAY = {
  verse_ref: 'Philippians 4:13',
  verse_text: 'I can do all things through Christ who strengthens me.',
  theme: 'Strength & Perseverance',
  reflection: 'As you face challenges in your chapter and personal life, remember that your strength comes from Christ.',
};

// Demo Dashboard Quick Stats
export const DEMO_DASHBOARD_STATS = {
  currentStreak: 7,
  totalPrayers: 12,
  answeredPrayers: 4,
  journeyProgress: 38, // percentage
  serviceHours: 16,
  nextMilestone: 'Week Warrior - 2 days away',
};

// Demo Journey Progress
export const DEMO_JOURNEY_PROGRESS = {
  currentDay: 8,
  totalDays: 21,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
  lastCompletedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
};

// Demo Service Items
export const DEMO_SERVICE_ITEMS = [
  {
    id: 'demo-service-1',
    title: 'Campus Cleanup',
    description: 'Participated in the annual campus beautification project',
    hours: 4,
    completed: true,
    completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    event_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-service-2',
    title: 'Food Bank Volunteer',
    description: 'Sorted and distributed food to families in need',
    hours: 6,
    completed: true,
    completed_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    event_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-service-3',
    title: 'Youth Mentoring',
    description: 'Weekly mentoring session with local middle school students',
    hours: 2,
    completed: true,
    completed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    event_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-service-4',
    title: 'Charity Run',
    description: 'Chapter participation in 5K charity run for cancer research',
    hours: 4,
    completed: true,
    completed_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    event_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-service-5',
    title: 'Upcoming: Senior Center Visit',
    description: 'Visit and spend time with elderly residents',
    hours: 3,
    completed: false,
    completed_at: null,
    event_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Demo Forum Discussions
export const DEMO_FORUM_DISCUSSIONS = [
  {
    id: 'demo-forum-1',
    title: 'How do you balance faith and Greek life?',
    content: 'I\'m curious how other members navigate maintaining their faith while being active in Greek organizations...',
    category: 'Discussion',
    reply_count: 12,
    view_count: 89,
    user_name: 'Brother Marcus',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-forum-2',
    title: 'Best practices for chapter devotionals',
    content: 'Our chapter wants to start regular devotional sessions. Any tips from chaplains who\'ve implemented this successfully?',
    category: 'Best Practices',
    reply_count: 8,
    view_count: 156,
    user_name: 'Soror Tiffany',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-forum-3',
    title: 'Service project ideas for spring',
    content: 'Looking for creative community service ideas that align with our faith values. What has worked for your chapter?',
    category: 'Service',
    reply_count: 15,
    view_count: 203,
    user_name: 'Chapter President',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper function to get demo data based on context
export function getDemoDataForPage(pageName: string) {
  switch (pageName) {
    case 'dashboard':
      return {
        stats: DEMO_DASHBOARD_STATS,
        verse: DEMO_VERSE_OF_DAY,
        devotional: DEMO_DEVOTIONAL,
      };
    case 'devotional':
      return DEMO_DEVOTIONAL;
    case 'prayer-journal':
      return { prayers: DEMO_PRAYER_REQUESTS.slice(0, 3) };
    case 'prayer-wall':
      return { requests: DEMO_PRAYER_REQUESTS };
    case 'achievements':
      return {
        achievements: DEMO_ACHIEVEMENTS,
        stats: DEMO_USER_STATS,
      };
    case 'service-tracker':
      return { items: DEMO_SERVICE_ITEMS };
    case 'forum':
      return { discussions: DEMO_FORUM_DISCUSSIONS };
    case 'journey':
      return DEMO_JOURNEY_PROGRESS;
    default:
      return null;
  }
}
