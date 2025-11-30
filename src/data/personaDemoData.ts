import { DemoPersona, DEMO_PERSONAS } from './demoUserPersonas';
import { 
  DemoPrayerEntry, 
  DemoAchievement, 
  DemoJourneyProgress, 
  DemoServiceItem, 
  DemoStats,
  ScenarioDemoData,
  generateDemoPrayers,
  generateDemoAchievements,
  generateDemoJourneyProgress,
  generateDemoServiceItems,
} from './demoDataGenerators';

// Persona-specific prayer themes
const PERSONA_PRAYER_THEMES: Record<string, string[]> = {
  'new-member': [
    'Finding my place in the chapter',
    'Building relationships with brothers',
    'Balancing academics and Greek life',
    'Guidance in understanding traditions',
    'Confidence in new experiences',
  ],
  'active-member': [
    'Growing in my faith journey',
    'Leadership opportunities',
    'Supporting struggling members',
    'Balancing commitments',
    'Deepening friendships',
  ],
  'chapter-president': [
    'Wisdom in leading the chapter',
    'Unity among all members',
    'Making difficult decisions',
    'Mentoring new members',
    'Chapter growth and success',
  ],
  'chaplain': [
    'Spiritual guidance for the chapter',
    'Planning meaningful devotionals',
    'Members facing struggles',
    'Creating authentic faith community',
    'Personal spiritual renewal',
  ],
  'alumni': [
    'Continued connection with brothers',
    'Mentoring the next generation',
    'Career and family balance',
    'Using experience to serve',
    'Legacy and impact',
  ],
  'sorority-leader': [
    'Empowering sisters in faith',
    'Chapter unity and sisterhood',
    'Leading by example',
    'Service opportunities',
    'Building lasting bonds',
  ],
};

// Persona-specific achievements
const PERSONA_ACHIEVEMENTS: Record<string, { titles: string[]; count: number }> = {
  'new-member': {
    titles: ['First Steps', 'Curious Explorer', 'Getting Started'],
    count: 2,
  },
  'active-member': {
    titles: ['Week Warrior', 'Scripture Scholar', 'Prayer Champion', 'Community Builder'],
    count: 5,
  },
  'chapter-president': {
    titles: ['Leader of Leaders', 'Journey Master', 'Service Star', 'Faithful Friend', 'Mentor Badge'],
    count: 8,
  },
  'chaplain': {
    titles: ['Spiritual Guide', 'Prayer Warrior', 'Devotion Master', 'Shepherd Heart'],
    count: 6,
  },
  'alumni': {
    titles: ['Legacy Builder', 'Wisdom Keeper', 'Mentor Master', 'Faithful Alumni'],
    count: 10,
  },
  'sorority-leader': {
    titles: ['Sister Leader', 'Unity Champion', 'Service Queen', 'Faith Ambassador'],
    count: 7,
  },
};

// Generate prayers with persona-specific themes
function generatePersonaPrayers(personaId: string, count: number): DemoPrayerEntry[] {
  const themes = PERSONA_PRAYER_THEMES[personaId] || PERSONA_PRAYER_THEMES['active-member'];
  const prayers = generateDemoPrayers(count, 0.25);
  
  return prayers.map((prayer, index) => ({
    ...prayer,
    title: themes[index % themes.length],
    content: `Lord, I come before you with ${themes[index % themes.length].toLowerCase()}. Guide me in this journey and help me grow in faith and character.`,
  }));
}

// Generate stats based on persona
function generatePersonaStats(persona: DemoPersona): DemoStats {
  const { stats } = persona;
  
  return {
    totalPrayers: Math.floor(stats.daysActive * 0.3),
    answeredPrayers: stats.prayersAnswered,
    journeyDaysCompleted: Math.min(21, Math.floor(stats.daysActive / 10)),
    serviceHours: stats.serviceHours,
    achievementsEarned: PERSONA_ACHIEVEMENTS[persona.id]?.count || 3,
    totalPoints: stats.level * 150 + stats.currentStreak * 10,
    currentStreak: stats.currentStreak,
    level: stats.level,
  };
}

// Main function to generate persona-specific demo data
export function generatePersonaDemoData(personaId: string): ScenarioDemoData {
  const persona = DEMO_PERSONAS.find(p => p.id === personaId);
  
  if (!persona) {
    // Fallback to default data
    return {
      prayers: generateDemoPrayers(10, 0.3),
      achievements: generateDemoAchievements(3),
      journeyProgress: generateDemoJourneyProgress(5),
      serviceItems: generateDemoServiceItems(5, 0.7),
      stats: {
        totalPrayers: 10,
        answeredPrayers: 3,
        journeyDaysCompleted: 5,
        serviceHours: 15,
        achievementsEarned: 3,
        totalPoints: 350,
        currentStreak: 5,
        level: 3,
      },
    };
  }

  const stats = generatePersonaStats(persona);
  
  return {
    prayers: generatePersonaPrayers(personaId, stats.totalPrayers),
    achievements: generateDemoAchievements(stats.achievementsEarned),
    journeyProgress: generateDemoJourneyProgress(stats.journeyDaysCompleted),
    serviceItems: generateDemoServiceItems(Math.ceil(stats.serviceHours / 4), 0.8),
    stats,
  };
}

// Get personalized welcome message
export function getPersonaWelcomeMessage(personaId: string): string {
  const messages: Record<string, string> = {
    'new-member': 'Welcome to Sacred Greeks! Let\'s begin your faith journey together.',
    'active-member': 'Good to see you back! Ready to continue growing?',
    'chapter-president': 'Your leadership inspires others. Let\'s check on your chapter.',
    'chaplain': 'Your spiritual guidance matters. See who needs prayer today.',
    'alumni': 'Your experience is valuable. Help mentor the next generation.',
    'sorority-leader': 'Lead with grace and strength. Your sisters look up to you.',
  };
  
  return messages[personaId] || 'Welcome to Sacred Greeks!';
}

// Get persona-specific recommended features
export function getPersonaRecommendedFeatures(personaId: string): string[] {
  const features: Record<string, string[]> = {
    'new-member': ['devotional', 'journey', 'prayer-journal'],
    'active-member': ['bible-study', 'prayer-wall', 'achievements'],
    'chapter-president': ['service-tracker', 'forum', 'prayer-wall'],
    'chaplain': ['devotional', 'prayer-wall', 'bible-study'],
    'alumni': ['forum', 'prayer-wall', 'resources'],
    'sorority-leader': ['service-tracker', 'achievements', 'forum'],
  };
  
  return features[personaId] || ['dashboard', 'devotional', 'prayer-journal'];
}

// Get persona context for AI interactions
export function getPersonaAIContext(personaId: string): string {
  const persona = DEMO_PERSONAS.find(p => p.id === personaId);
  
  if (!persona) return '';
  
  return `User is ${persona.displayName}, a ${persona.role} from ${persona.organization} (${persona.chapter}). ${persona.bio} They have been active for ${persona.stats.daysActive} days with ${persona.stats.serviceHours} service hours.`;
}
