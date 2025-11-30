// Realistic demo data generators for different scenarios

export interface DemoPrayerEntry {
  id: string;
  title: string;
  content: string;
  prayer_type: string;
  answered: boolean;
  created_at: string;
  answered_at?: string;
}

export interface DemoAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
  points: number;
}

export interface DemoJourneyProgress {
  day: number;
  completed: boolean;
  completed_at?: string;
  notes?: string;
}

export interface DemoServiceItem {
  id: string;
  title: string;
  description: string;
  hours: number;
  completed: boolean;
  event_date: string;
}

export interface DemoStats {
  totalPrayers: number;
  answeredPrayers: number;
  journeyDaysCompleted: number;
  serviceHours: number;
  achievementsEarned: number;
  totalPoints: number;
  currentStreak: number;
  level: number;
}

const prayerTitles = [
  'Guidance for finals week',
  'Strength for chapter meeting',
  'Wisdom in leadership decisions',
  'Peace during rush week',
  'Unity among brothers/sisters',
  'Healing for a family member',
  'Direction for career path',
  'Patience with difficult situations',
  'Gratitude for blessings received',
  'Protection for traveling members',
];

const prayerContent = [
  'Lord, please guide me as I prepare for my exams. Help me to study diligently and trust in Your plan.',
  'Father, give me the words to speak and the wisdom to lead our chapter meeting effectively.',
  'God, I need Your wisdom as I make decisions that affect our organization. Show me the right path.',
  'Lord, bring peace to our chapter during this busy rush week. Help us welcome new members with love.',
  'Father, unite our hearts and minds. Help us to support one another as brothers/sisters in Christ.',
];

const achievementData = [
  { title: 'First Prayer', description: 'Wrote your first prayer', icon: '🙏', points: 10 },
  { title: 'Week Warrior', description: 'Completed 7 days in a row', icon: '🔥', points: 50 },
  { title: 'Scripture Scholar', description: 'Completed 10 Bible studies', icon: '📖', points: 100 },
  { title: 'Prayer Champion', description: 'Prayed for 50 requests', icon: '⭐', points: 150 },
  { title: 'Journey Master', description: 'Completed the 21-day journey', icon: '🏆', points: 200 },
  { title: 'Service Star', description: 'Logged 20 service hours', icon: '💝', points: 100 },
  { title: 'Community Builder', description: 'Engaged with 10 discussions', icon: '🤝', points: 75 },
  { title: 'Faithful Friend', description: 'Sent 25 encouragements', icon: '💌', points: 80 },
];

const serviceActivities = [
  { title: 'Campus Cleanup', description: 'Helped clean up the campus grounds', hours: 3 },
  { title: 'Food Bank Volunteer', description: 'Sorted and distributed food at local food bank', hours: 4 },
  { title: 'Tutoring Session', description: 'Tutored students in math and science', hours: 2 },
  { title: 'Habitat Build Day', description: 'Helped build homes for families in need', hours: 6 },
  { title: 'Senior Center Visit', description: 'Spent time with seniors at local care facility', hours: 2 },
  { title: 'Blood Drive', description: 'Organized and participated in campus blood drive', hours: 4 },
  { title: 'Mentorship Program', description: 'Mentored incoming freshmen', hours: 3 },
];

function randomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function generateDemoPrayers(count: number, answeredRatio: number = 0.3): DemoPrayerEntry[] {
  const prayers: DemoPrayerEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const answered = Math.random() < answeredRatio;
    const createdAt = randomDate(90);
    
    prayers.push({
      id: generateId(),
      title: prayerTitles[i % prayerTitles.length],
      content: prayerContent[i % prayerContent.length],
      prayer_type: ['gratitude', 'petition', 'intercession', 'confession'][Math.floor(Math.random() * 4)],
      answered,
      created_at: createdAt,
      answered_at: answered ? randomDate(30) : undefined,
    });
  }
  
  return prayers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function generateDemoAchievements(count: number): DemoAchievement[] {
  const achievements: DemoAchievement[] = [];
  const availableAchievements = [...achievementData].slice(0, Math.min(count, achievementData.length));
  
  for (let i = 0; i < availableAchievements.length; i++) {
    const achievement = availableAchievements[i];
    achievements.push({
      id: generateId(),
      ...achievement,
      earned_at: randomDate(60),
    });
  }
  
  return achievements.sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime());
}

export function generateDemoJourneyProgress(daysCompleted: number): DemoJourneyProgress[] {
  const progress: DemoJourneyProgress[] = [];
  
  for (let day = 1; day <= 21; day++) {
    const completed = day <= daysCompleted;
    progress.push({
      day,
      completed,
      completed_at: completed ? randomDate(21 - day) : undefined,
      notes: completed && Math.random() > 0.5 
        ? 'This day really spoke to me. I felt God\'s presence clearly.'
        : undefined,
    });
  }
  
  return progress;
}

export function generateDemoServiceItems(count: number, completedRatio: number = 0.7): DemoServiceItem[] {
  const items: DemoServiceItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const activity = serviceActivities[i % serviceActivities.length];
    const completed = Math.random() < completedRatio;
    
    items.push({
      id: generateId(),
      title: activity.title,
      description: activity.description,
      hours: activity.hours,
      completed,
      event_date: randomDate(45),
    });
  }
  
  return items.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
}

export function generateDemoStats(scenario: 'new-user' | 'power-user' | 'greek-leader' | 'custom'): DemoStats {
  switch (scenario) {
    case 'new-user':
      return {
        totalPrayers: 3,
        answeredPrayers: 0,
        journeyDaysCompleted: 2,
        serviceHours: 0,
        achievementsEarned: 1,
        totalPoints: 25,
        currentStreak: 2,
        level: 1,
      };
    case 'power-user':
      return {
        totalPrayers: 47,
        answeredPrayers: 12,
        journeyDaysCompleted: 21,
        serviceHours: 35,
        achievementsEarned: 6,
        totalPoints: 1250,
        currentStreak: 14,
        level: 8,
      };
    case 'greek-leader':
      return {
        totalPrayers: 89,
        answeredPrayers: 28,
        journeyDaysCompleted: 21,
        serviceHours: 72,
        achievementsEarned: 8,
        totalPoints: 2450,
        currentStreak: 45,
        level: 15,
      };
    default:
      return {
        totalPrayers: 15,
        answeredPrayers: 4,
        journeyDaysCompleted: 10,
        serviceHours: 12,
        achievementsEarned: 3,
        totalPoints: 350,
        currentStreak: 5,
        level: 4,
      };
  }
}

export interface ScenarioDemoData {
  prayers: DemoPrayerEntry[];
  achievements: DemoAchievement[];
  journeyProgress: DemoJourneyProgress[];
  serviceItems: DemoServiceItem[];
  stats: DemoStats;
}

export function generateScenarioDemoData(scenario: 'new-user' | 'power-user' | 'greek-leader' | 'custom'): ScenarioDemoData {
  const stats = generateDemoStats(scenario);
  
  return {
    prayers: generateDemoPrayers(stats.totalPrayers, stats.answeredPrayers / Math.max(stats.totalPrayers, 1)),
    achievements: generateDemoAchievements(stats.achievementsEarned),
    journeyProgress: generateDemoJourneyProgress(stats.journeyDaysCompleted),
    serviceItems: generateDemoServiceItems(Math.ceil(stats.serviceHours / 3), 0.8),
    stats,
  };
}
