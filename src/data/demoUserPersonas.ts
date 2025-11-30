export interface DemoPersona {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  role: string;
  organization: string;
  chapter: string;
  bio: string;
  stats: {
    daysActive: number;
    prayersAnswered: number;
    serviceHours: number;
    currentStreak: number;
    level: number;
  };
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    privateProfile: boolean;
  };
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'new-member',
    name: 'Jordan',
    displayName: 'Jordan Williams',
    avatar: '👤',
    role: 'New Member',
    organization: 'Alpha Phi Alpha',
    chapter: 'Beta Chapter',
    bio: 'Just joined the fraternity and excited to grow in faith alongside my brothers.',
    stats: {
      daysActive: 7,
      prayersAnswered: 1,
      serviceHours: 5,
      currentStreak: 3,
      level: 1,
    },
    preferences: {
      theme: 'light',
      notifications: true,
      privateProfile: false,
    },
  },
  {
    id: 'active-member',
    name: 'Marcus',
    displayName: 'Marcus Johnson',
    avatar: '⚡',
    role: 'Active Member',
    organization: 'Kappa Alpha Psi',
    chapter: 'Gamma Chapter',
    bio: 'Committed to daily devotionals and serving my community through faith.',
    stats: {
      daysActive: 90,
      prayersAnswered: 15,
      serviceHours: 45,
      currentStreak: 21,
      level: 5,
    },
    preferences: {
      theme: 'dark',
      notifications: true,
      privateProfile: false,
    },
  },
  {
    id: 'chapter-president',
    name: 'David',
    displayName: 'David Thompson',
    avatar: '👑',
    role: 'Chapter President',
    organization: 'Omega Psi Phi',
    chapter: 'Alpha Omega Chapter',
    bio: 'Leading our chapter in faith, service, and brotherhood for 2 years.',
    stats: {
      daysActive: 365,
      prayersAnswered: 52,
      serviceHours: 200,
      currentStreak: 45,
      level: 12,
    },
    preferences: {
      theme: 'dark',
      notifications: true,
      privateProfile: false,
    },
  },
  {
    id: 'chaplain',
    name: 'Michael',
    displayName: 'Michael Brown',
    avatar: '🙏',
    role: 'Chapter Chaplain',
    organization: 'Phi Beta Sigma',
    chapter: 'Delta Chapter',
    bio: 'Guiding spiritual growth and organizing prayer meetings for our chapter.',
    stats: {
      daysActive: 180,
      prayersAnswered: 30,
      serviceHours: 80,
      currentStreak: 60,
      level: 8,
    },
    preferences: {
      theme: 'light',
      notifications: true,
      privateProfile: false,
    },
  },
  {
    id: 'alumni',
    name: 'Robert',
    displayName: 'Robert Davis',
    avatar: '🎓',
    role: 'Alumni Member',
    organization: 'Iota Phi Theta',
    chapter: 'Epsilon Chapter',
    bio: 'Graduated 5 years ago, still active in faith journey and mentoring new members.',
    stats: {
      daysActive: 730,
      prayersAnswered: 100,
      serviceHours: 500,
      currentStreak: 15,
      level: 20,
    },
    preferences: {
      theme: 'light',
      notifications: false,
      privateProfile: true,
    },
  },
  {
    id: 'sorority-leader',
    name: 'Ashley',
    displayName: 'Ashley Carter',
    avatar: '💎',
    role: 'Sorority President',
    organization: 'Alpha Kappa Alpha',
    chapter: 'Zeta Chapter',
    bio: 'Empowering sisters through faith and service in our community.',
    stats: {
      daysActive: 280,
      prayersAnswered: 40,
      serviceHours: 150,
      currentStreak: 30,
      level: 10,
    },
    preferences: {
      theme: 'light',
      notifications: true,
      privateProfile: false,
    },
  },
];

export function getPersonaById(id: string): DemoPersona | undefined {
  return DEMO_PERSONAS.find(p => p.id === id);
}

export function getPersonasByRole(role: string): DemoPersona[] {
  return DEMO_PERSONAS.filter(p => p.role.toLowerCase().includes(role.toLowerCase()));
}
