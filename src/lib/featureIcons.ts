/**
 * Feature Icons & Colors Constants
 * Centralized configuration for all feature icons and their associated colors
 * Matches the official sacredgreekslife.com branding
 */

import { 
  Zap, 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  Video, 
  UserCheck,
  type LucideIcon 
} from 'lucide-react';

export interface FeatureConfig {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  // Color configuration
  gradient: string;
  bgColor: string;
  bgGlow: string;
  hoverBgColor: string;
  iconColor: string;
  borderColor: string;
  topBorderColor: string;
}

/**
 * Primary Featured Tools
 * MythBusters, Symbols & Rituals, Anti-Hazing
 */
export const FEATURE_ICONS = {
  MYTHBUSTERS: {
    icon: Zap,
    name: 'MythBusters',
    color: 'orange',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    bgGlow: 'bg-orange-600/30',
    hoverBgColor: 'bg-orange-500/30',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/70',
    topBorderColor: 'bg-orange-500',
  },
  SYMBOLS: {
    icon: Shield,
    name: 'Symbols & Rituals',
    color: 'fuchsia',
    gradient: 'from-violet-500 via-fuchsia-500 to-purple-600',
    bgColor: 'bg-fuchsia-500/20',
    bgGlow: 'bg-fuchsia-600/30',
    hoverBgColor: 'bg-fuchsia-500/30',
    iconColor: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/70',
    topBorderColor: 'bg-fuchsia-500',
  },
  ANTI_HAZING: {
    icon: AlertTriangle,
    name: 'Anti-Hazing',
    color: 'red',
    gradient: 'from-red-500 via-rose-600 to-pink-600',
    bgColor: 'bg-red-500/20',
    bgGlow: 'bg-red-600/30',
    hoverBgColor: 'bg-red-500/30',
    iconColor: 'text-red-400',
    borderColor: 'border-red-500/70',
    topBorderColor: 'bg-red-500',
  },
  BIBLE_STUDY: {
    icon: BookOpen,
    name: 'Bible Study',
    color: 'blue',
    gradient: 'from-blue-500 via-sky-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    bgGlow: 'bg-blue-600/30',
    hoverBgColor: 'bg-blue-500/30',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/70',
    topBorderColor: 'bg-blue-500',
  },
  VIDEO_LIBRARY: {
    icon: Video,
    name: 'Video Library',
    color: 'pink',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    bgColor: 'bg-pink-500/20',
    bgGlow: 'bg-pink-600/30',
    hoverBgColor: 'bg-pink-500/30',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/70',
    topBorderColor: 'bg-pink-500',
  },
  CHURCH_LEADERS: {
    icon: UserCheck,
    name: 'Church Leaders',
    color: 'purple',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    bgColor: 'bg-purple-500/20',
    bgGlow: 'bg-purple-600/30',
    hoverBgColor: 'bg-purple-500/30',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/70',
    topBorderColor: 'bg-purple-500',
  },
} as const;

/**
 * Full feature configurations for Auth page and Dashboard Preview
 */
export const FEATURED_TOOLS_CONFIG: FeatureConfig[] = [
  {
    icon: FEATURE_ICONS.MYTHBUSTERS.icon,
    title: "MythBusters",
    subtitle: "Debunk Greek Life Misconceptions",
    description: "Get biblical answers to common objections about Greek life and faith compatibility.",
    tags: ["50+ Myths Debunked", "Scripture-Based", "Shareable Cards"],
    link: "/mythbusters",
    gradient: FEATURE_ICONS.MYTHBUSTERS.gradient,
    bgColor: FEATURE_ICONS.MYTHBUSTERS.bgColor,
    bgGlow: FEATURE_ICONS.MYTHBUSTERS.bgGlow,
    hoverBgColor: FEATURE_ICONS.MYTHBUSTERS.hoverBgColor,
    iconColor: FEATURE_ICONS.MYTHBUSTERS.iconColor,
    borderColor: FEATURE_ICONS.MYTHBUSTERS.borderColor,
    topBorderColor: FEATURE_ICONS.MYTHBUSTERS.topBorderColor,
  },
  {
    icon: FEATURE_ICONS.SYMBOLS.icon,
    title: "Symbols & Rituals Guide",
    subtitle: "Understand Hidden Meanings",
    description: "Explore the biblical and historical context behind Greek letters, rituals, and traditions.",
    tags: ["100+ Symbols", "Historical Context", "Faith Connections"],
    link: "/symbols",
    gradient: FEATURE_ICONS.SYMBOLS.gradient,
    bgColor: FEATURE_ICONS.SYMBOLS.bgColor,
    bgGlow: FEATURE_ICONS.SYMBOLS.bgGlow,
    hoverBgColor: FEATURE_ICONS.SYMBOLS.hoverBgColor,
    iconColor: FEATURE_ICONS.SYMBOLS.iconColor,
    borderColor: FEATURE_ICONS.SYMBOLS.borderColor,
    topBorderColor: FEATURE_ICONS.SYMBOLS.topBorderColor,
  },
  {
    icon: FEATURE_ICONS.ANTI_HAZING.icon,
    title: "Anti-Hazing Resources",
    subtitle: "Protect & Educate Your Chapter",
    description: "Access vital hazing prevention tools, success stories, and memorial resources to keep your organization safe.",
    tags: ["Prevention Tools", "Success Stories", "Memorial Wall"],
    link: "/anti-hazing",
    gradient: FEATURE_ICONS.ANTI_HAZING.gradient,
    bgColor: FEATURE_ICONS.ANTI_HAZING.bgColor,
    bgGlow: FEATURE_ICONS.ANTI_HAZING.bgGlow,
    hoverBgColor: FEATURE_ICONS.ANTI_HAZING.hoverBgColor,
    iconColor: FEATURE_ICONS.ANTI_HAZING.iconColor,
    borderColor: FEATURE_ICONS.ANTI_HAZING.borderColor,
    topBorderColor: FEATURE_ICONS.ANTI_HAZING.topBorderColor,
  },
];

export const SECONDARY_TOOLS_CONFIG: FeatureConfig[] = [
  {
    icon: FEATURE_ICONS.BIBLE_STUDY.icon,
    title: "Greek Life Bible Study",
    subtitle: "Faith Foundations for Greeks",
    description: "Dive deep into scripture with studies designed specifically for the Greek experience.",
    tags: ["12-Week Journey", "Group Guides", "Interactive Flashcards"],
    link: "/bible-study",
    gradient: FEATURE_ICONS.BIBLE_STUDY.gradient,
    bgColor: FEATURE_ICONS.BIBLE_STUDY.bgColor,
    bgGlow: FEATURE_ICONS.BIBLE_STUDY.bgGlow,
    hoverBgColor: FEATURE_ICONS.BIBLE_STUDY.hoverBgColor,
    iconColor: FEATURE_ICONS.BIBLE_STUDY.iconColor,
    borderColor: FEATURE_ICONS.BIBLE_STUDY.borderColor,
    topBorderColor: FEATURE_ICONS.BIBLE_STUDY.topBorderColor,
  },
  {
    icon: FEATURE_ICONS.VIDEO_LIBRARY.icon,
    title: "Video Library",
    subtitle: "Learn Through Powerful Stories",
    description: "Watch testimonies, teachings, and discussions from Greeks who've navigated faith and fraternity life.",
    tags: ["50+ Videos", "Testimonies", "Teaching Series"],
    link: "/video-library",
    gradient: FEATURE_ICONS.VIDEO_LIBRARY.gradient,
    bgColor: FEATURE_ICONS.VIDEO_LIBRARY.bgColor,
    bgGlow: FEATURE_ICONS.VIDEO_LIBRARY.bgGlow,
    hoverBgColor: FEATURE_ICONS.VIDEO_LIBRARY.hoverBgColor,
    iconColor: FEATURE_ICONS.VIDEO_LIBRARY.iconColor,
    borderColor: FEATURE_ICONS.VIDEO_LIBRARY.borderColor,
    topBorderColor: FEATURE_ICONS.VIDEO_LIBRARY.topBorderColor,
  },
  {
    icon: FEATURE_ICONS.CHURCH_LEADERS.icon,
    title: "Church Leaders",
    subtitle: "Guidance From Trusted Voices",
    description: "Connect with pastors and ministry leaders who understand the unique challenges of Greek life.",
    tags: ["Expert Insights", "Ministry Resources", "Leadership Tips"],
    link: "/church-leaders",
    gradient: FEATURE_ICONS.CHURCH_LEADERS.gradient,
    bgColor: FEATURE_ICONS.CHURCH_LEADERS.bgColor,
    bgGlow: FEATURE_ICONS.CHURCH_LEADERS.bgGlow,
    hoverBgColor: FEATURE_ICONS.CHURCH_LEADERS.hoverBgColor,
    iconColor: FEATURE_ICONS.CHURCH_LEADERS.iconColor,
    borderColor: FEATURE_ICONS.CHURCH_LEADERS.borderColor,
    topBorderColor: FEATURE_ICONS.CHURCH_LEADERS.topBorderColor,
  },
];
