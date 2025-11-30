// Dynamic route registry for automatic sitemap generation and SEO
// When adding new pages, add them here and SEO will be handled automatically

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  isProtected: boolean;
  noindex?: boolean;
  structuredDataType?: 'WebPage' | 'Article' | 'FAQPage' | 'AboutPage' | 'Organization' | 'WebApplication' | 'BreadcrumbList';
}

// Central route registry - add new pages here
export const routeRegistry: RouteConfig[] = [
  // Public high-priority pages
  {
    path: '/',
    title: 'Sacred Greeks Life App - Daily Devotionals & Faith Guidance for Greek Life',
    description: 'Your daily companion for navigating faith and Greek life. Get devotionals, biblical guidance, prayer tools, and progress tracking grounded in the P.R.O.O.F. framework from Sacred, Not Sinful.',
    keywords: 'Sacred Greeks, Greek life app, Christian fraternity, Christian sorority, BGLO faith, Divine Nine Christian',
    changefreq: 'weekly',
    priority: 1.0,
    isProtected: false,
    structuredDataType: 'WebApplication',
  },
  {
    path: '/auth',
    title: 'Sign In',
    description: 'Sign in to Sacred Greeks Life to access your personal dashboard, devotionals, prayer journal, and community features.',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    description: 'Your personal Sacred Greeks dashboard. Track spiritual growth, access daily devotionals, and manage your faith journey in Greek life.',
    keywords: 'dashboard, spiritual growth tracker, faith journey',
    changefreq: 'weekly',
    priority: 0.9,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/guide',
    title: 'Getting Started Guide',
    description: 'Complete guide to using Sacred Greeks Life. Learn how to make the most of devotionals, prayer tools, and community features.',
    keywords: 'guide, how to use, getting started, tutorial',
    changefreq: 'monthly',
    priority: 0.9,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/user-guide',
    title: 'User Guide',
    description: 'Comprehensive user guide for Sacred Greeks Life app features and functionality.',
    changefreq: 'monthly',
    priority: 0.8,
    isProtected: false,
  },

  // Daily/Weekly content pages
  {
    path: '/devotional',
    title: 'Daily Devotionals',
    description: 'Daily devotionals for Christians in Greek life. Scripture-based reflections to strengthen your faith with the P.R.O.O.F. framework.',
    keywords: 'daily devotional, Christian devotional, Greek life devotional, scripture reflection',
    changefreq: 'daily',
    priority: 0.9,
    isProtected: true,
    structuredDataType: 'Article',
  },
  {
    path: '/prayer-wall',
    title: 'Prayer Wall',
    description: 'Community prayer support for Christians in Greek life. Share prayer requests, support others, and celebrate answered prayers together.',
    keywords: 'prayer wall, prayer community, prayer requests, Christian community',
    changefreq: 'daily',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/prayer-journal',
    title: 'Prayer Journal',
    description: 'Personal prayer journal to record, track, and organize your prayers. Mark answered prayers and grow in your prayer life.',
    keywords: 'prayer journal, prayer tracker, Christian prayer app, prayer diary',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/prayer-guide',
    title: 'Prayer Guide',
    description: 'Learn to pray effectively with guided prayer templates and resources for different life situations.',
    keywords: 'prayer guide, how to pray, prayer templates, guided prayer',
    changefreq: 'monthly',
    priority: 0.8,
    isProtected: true,
  },
  {
    path: '/bible-study',
    title: 'Bible Study',
    description: 'AI-powered Bible study tools. Search scriptures by topic, save meaningful verses, and deepen your understanding of God\'s Word.',
    keywords: 'Bible study, scripture search, Bible app, verse finder, topical Bible',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/study',
    title: 'Study Guide',
    description: 'Comprehensive study guides for understanding Scripture in the context of Greek life and faith.',
    keywords: 'study guide, Bible study guide, faith study',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/forum',
    title: 'Community Forum',
    description: 'Connect with other Christians in Greek life. Discuss faith, share experiences, and support one another in your spiritual journey.',
    keywords: 'Christian forum, Greek life community, faith discussion, BGLO forum',
    changefreq: 'daily',
    priority: 0.8,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/community',
    title: 'Organization Community',
    description: 'Connect with members of your Greek organization. Share resources, discuss faith, and build community.',
    changefreq: 'daily',
    priority: 0.75,
    isProtected: true,
  },

  // Tools and features
  {
    path: '/journey',
    title: '7-Day Faith Journey',
    description: 'Begin your 7-day faith journey. Daily guided content to strengthen your relationship with God while in Greek life.',
    keywords: 'faith journey, 7 day challenge, spiritual growth, devotional series',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/myth-buster',
    title: 'Myth Buster',
    description: 'Debunk common myths about Greek life and Christianity. Get biblical perspectives on controversial topics.',
    keywords: 'myth buster, Greek life myths, Christian perspective, BGLO truth',
    changefreq: 'monthly',
    priority: 0.75,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/symbol-guide',
    title: 'Symbol Guide',
    description: 'Comprehensive guide to symbols in Greek life. Understand meanings and biblical perspectives.',
    keywords: 'symbol guide, Greek symbols, fraternity symbols, sorority symbols',
    changefreq: 'monthly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/ask-dr-lyman',
    title: 'Ask Dr. Lyman',
    description: 'Get expert answers from Dr. Lyman Montgomery on faith and Greek life. Submit questions and browse answered topics.',
    keywords: 'ask Dr Lyman, expert answers, faith questions, Greek life advice',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/shattered-masks',
    title: 'Shattered Masks Assessment',
    description: 'Discover your authentic self with the Shattered Masks assessment. Understand your spiritual archetype.',
    keywords: 'shattered masks, personality assessment, spiritual archetype',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/service-tracker',
    title: 'Service Tracker',
    description: 'Track community service hours and activities. Document your impact and growth in serving others.',
    keywords: 'service tracker, community service, volunteer hours',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: true,
  },

  // Progress and achievements
  {
    path: '/achievements',
    title: 'Achievements',
    description: 'Track your spiritual growth milestones. Earn badges for devotional completion, prayers, and community engagement.',
    keywords: 'achievements, spiritual growth badges, faith milestones, gamification',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: true,
  },
  {
    path: '/progress',
    title: 'Progress Tracker',
    description: 'View your spiritual growth progress. Track streaks, completed devotionals, and overall engagement.',
    keywords: 'progress tracker, spiritual growth, streak tracker',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: true,
  },

  // Content and resources
  {
    path: '/resources',
    title: 'Resources',
    description: 'Faith resources for Christians in Greek life. Articles, guides, PDFs, and tools for spiritual growth.',
    keywords: 'Christian resources, Greek life resources, faith guides, spiritual tools',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/articles',
    title: 'Article Library',
    description: 'Browse our collection of articles on faith, Greek life, and spiritual growth.',
    keywords: 'articles, Christian articles, Greek life blog',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/video-library',
    title: 'Video Library',
    description: 'Watch videos on faith and Greek life. Teachings, testimonies, and educational content.',
    keywords: 'video library, Christian videos, Greek life videos',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/content-hub',
    title: 'Content Hub',
    description: 'Central hub for all Sacred Greeks content. Find articles, videos, and resources.',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/podcast',
    title: 'Podcast',
    description: 'Listen to the Sacred Greeks podcast. Discussions on faith, Greek life, and spiritual growth.',
    keywords: 'podcast, Christian podcast, Greek life podcast',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/podcast-appearances',
    title: 'Podcast Appearances',
    description: 'Dr. Lyman Montgomery\'s guest appearances on podcasts discussing faith and Greek life.',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/did-you-know',
    title: 'Did You Know?',
    description: 'Interesting facts and insights about Greek life and faith. Learn something new every day.',
    changefreq: 'weekly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/changelog',
    title: 'Changelog',
    description: 'See what\'s new in Sacred Greeks Life. Latest updates, features, and improvements to the app.',
    keywords: 'changelog, updates, new features, release notes',
    changefreq: 'weekly',
    priority: 0.5,
    isProtected: false,
  },

  // About and info pages
  {
    path: '/about',
    title: 'About Sacred Greeks',
    description: 'Learn about Sacred Greeks Life and Dr. Lyman Montgomery. Our mission to help Christians navigate Greek life with faith.',
    keywords: 'about Sacred Greeks, Dr. Lyman Montgomery, mission, about us',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    structuredDataType: 'AboutPage',
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions',
    description: 'Get answers to common questions about Sacred Greeks Life. Learn about features, Greek life, and faith topics.',
    keywords: 'FAQ, frequently asked questions, help, support',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/family-ministry-fallout',
    title: 'Family Ministry Fallout',
    description: 'Resources and support for those dealing with family ministry challenges. Find healing and restoration.',
    keywords: 'family ministry, church hurt, healing, restoration',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
  },
  {
    path: '/church-hurt-healing',
    title: 'Church Hurt Healing',
    description: 'Resources for healing from church hurt. Find restoration, support, and a path forward.',
    keywords: 'church hurt, healing, restoration, spiritual recovery',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
    noindex: true, // Duplicate content with family-ministry-fallout
  },

  // Subscription and signup
  {
    path: '/subscription',
    title: 'Premium Subscription',
    description: 'Unlock premium features with Sacred Greeks Life subscription. Access exclusive content and advanced tools.',
    keywords: 'subscription, premium, pricing, upgrade',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'View Sacred Greeks Life pricing and subscription options. Find the plan that fits your needs.',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    noindex: true, // Duplicate content with subscription
  },
  {
    path: '/beta-signup',
    title: 'Beta Signup',
    description: 'Join the Sacred Greeks Life beta program. Get early access to new features and help shape the app.',
    keywords: 'beta signup, early access, beta program',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
  },
  {
    path: '/install',
    title: 'Install App',
    description: 'Install Sacred Greeks Life on your device. Get quick access from your home screen.',
    keywords: 'install app, PWA, mobile app',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/qr-code',
    title: 'QR Code',
    description: 'Scan or share the Sacred Greeks Life QR code. Easy way to share the app with others.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  {
    path: '/install-guide',
    title: 'Install Guide',
    description: 'Simple step-by-step guide to install Sacred Greeks Life on your iPhone or Android device.',
    keywords: 'install guide, iPhone install, Android install, PWA guide',
    changefreq: 'monthly',
    priority: 0.5,
    isProtected: false,
  },
  {
    path: '/share-toolkit',
    title: 'Share Toolkit',
    description: 'Ready-to-use templates for sharing Sacred Greeks Life. Text messages, emails, and social media posts.',
    keywords: 'share app, invite friends, share templates, outreach',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },

  // User account pages
  {
    path: '/profile',
    title: 'My Profile',
    description: 'Manage your Sacred Greeks Life profile. Update settings, preferences, and account information.',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/bookmarks',
    title: 'Bookmarks',
    description: 'Access your saved content. View bookmarked devotionals, verses, and resources.',
    changefreq: 'weekly',
    priority: 0.6,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/assessment-history',
    title: 'Assessment History',
    description: 'View your past assessments and track your spiritual growth over time.',
    changefreq: 'weekly',
    priority: 0.5,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/offline-settings',
    title: 'Offline Settings',
    description: 'Configure offline access for Sacred Greeks Life. Download content for offline use.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/notification-preferences',
    title: 'Notification Preferences',
    description: 'Manage your notification settings. Control how and when you receive updates.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/analytics',
    title: 'Analytics Dashboard',
    description: 'View app analytics and usage statistics.',
    changefreq: 'daily',
    priority: 0.5,
    isProtected: true,
    noindex: true,
  },

  // Legal pages
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Sacred Greeks Life privacy policy. Learn how we collect, use, and protect your data.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Sacred Greeks Life terms of service. Read our terms and conditions for using the app.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  {
    path: '/legal',
    title: 'Legal Information',
    description: 'Legal information and documentation for Sacred Greeks Life.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
  },
  {
    path: '/ip-documentation',
    title: 'IP Documentation',
    description: 'Intellectual property documentation for Sacred Greeks Life.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },
  {
    path: '/trademark-tracking',
    title: 'Trademark Tracking',
    description: 'Trademark tracking and documentation.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },
  {
    path: '/trademark-usage-guide',
    title: 'Trademark Usage Guide',
    description: 'Guidelines for using Sacred Greeks trademarks.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },

  // Admin pages (noindex)
  {
    path: '/admin',
    title: 'Admin Dashboard',
    description: 'Admin dashboard for Sacred Greeks Life.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/beta-dashboard',
    title: 'Beta Dashboard',
    description: 'Beta program dashboard.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/beta-checklist',
    title: 'Beta Launch Checklist',
    description: 'Beta launch checklist for administrators.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },

  // Misc
  {
    path: '/reset-password',
    title: 'Reset Password',
    description: 'Reset your Sacred Greeks Life password.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },
];

// Get route config by path
export function getRouteConfig(path: string): RouteConfig | undefined {
  return routeRegistry.find(route => route.path === path);
}

// Get all public routes for sitemap
export function getPublicRoutes(): RouteConfig[] {
  return routeRegistry.filter(route => !route.noindex);
}

// Get route count
export function getTotalRoutes(): number {
  return routeRegistry.length;
}

// Validate all routes are registered (call during development)
export function validateRouteRegistry(appRoutes: string[]): string[] {
  const registeredPaths = routeRegistry.map(r => r.path);
  return appRoutes.filter(route => !registeredPaths.includes(route));
}
