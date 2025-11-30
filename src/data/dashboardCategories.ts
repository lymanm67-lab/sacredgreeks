import { 
  BookOpen, 
  Book, 
  MessageSquare, 
  Heart, 
  Clock, 
  MessageCircle, 
  TrendingUp, 
  Bookmark,
  LucideIcon 
} from "lucide-react";

export interface CategoryAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface CategoryConfig {
  title: string;
  description: string;
  icon: LucideIcon;
  categoryId: string;
  gradient: string;
  actions: CategoryAction[];
}

export const dashboardCategories: CategoryConfig[] = [
  {
    title: "Daily Spiritual Tools",
    description: "Build your daily practice",
    icon: BookOpen,
    categoryId: "daily-spiritual",
    gradient: "from-blue-500 to-indigo-600",
    actions: [
      {
        id: 'devotional',
        title: 'Daily Devotional',
        description: 'Today\'s reflection',
        icon: BookOpen,
        href: '/devotional',
      },
      {
        id: 'bible-study',
        title: 'Bible Study',
        description: 'Search & explore',
        icon: Book,
        href: '/bible-study',
      },
      {
        id: 'prayer-journal',
        title: 'Prayer Journal',
        description: 'Track your prayers',
        icon: MessageSquare,
        href: '/prayer-journal',
      },
      {
        id: 'prayer-guide',
        title: 'Prayer Guide',
        description: 'AI prayers & templates',
        icon: Heart,
        href: '/prayer-guide',
      },
    ],
  },
  {
    title: "Community Features",
    description: "Connect & serve together",
    icon: Heart,
    categoryId: "community",
    gradient: "from-purple-500 to-violet-600",
    actions: [
      {
        id: 'prayer-wall',
        title: 'Prayer Wall',
        description: 'Share & support',
        icon: Heart,
        href: '/prayer-wall',
      },
      {
        id: 'service-hours',
        title: 'Service Tracker',
        description: 'Track service hours',
        icon: Clock,
        href: '/service-tracker',
      },
      {
        id: 'bglo-guide',
        title: 'BGLO Objections',
        description: 'Handle challenges',
        icon: MessageCircle,
        href: '/guide',
      },
    ],
  },
  {
    title: "Personal Growth",
    description: "Track your journey",
    icon: TrendingUp,
    categoryId: "personal-growth",
    gradient: "from-rose-500 to-pink-600",
    actions: [
      {
        id: 'progress',
        title: 'Progress',
        description: 'View your growth',
        icon: TrendingUp,
        href: '/progress',
      },
      {
        id: 'achievements',
        title: 'Achievements',
        description: 'Unlock badges',
        icon: TrendingUp,
        href: '/achievements',
      },
      {
        id: 'bookmarks',
        title: 'Bookmarks',
        description: 'Saved resources',
        icon: Bookmark,
        href: '/bookmarks',
      },
    ],
  },
];
