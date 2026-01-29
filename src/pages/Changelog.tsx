import { ArrowLeft, Sparkles, Bug, Zap, Shield, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { SEOHead, pageSEO } from "@/components/SEOHead";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    category: 'feature' | 'fix' | 'improvement' | 'security';
    description: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "2.5.1",
    date: "2026-01-29",
    title: "Sidebar Progress & Sign-In Improvements",
    type: "patch",
    changes: [
      { category: "feature", description: "Progress bars now visible on all courses in sidebar menu showing completion percentage" },
      { category: "feature", description: "Remember password support with browser autofill for faster sign-in" },
      { category: "improvement", description: "Progress bars show color-coded status: muted (0%), primary (in-progress), emerald (complete)" },
      { category: "improvement", description: "Enhanced sign-in form with proper autocomplete attributes" },
    ]
  },
  {
    version: "2.5.0",
    date: "2026-01-28",
    title: "Hidden in Plain Sight Course",
    type: "minor",
    changes: [
      { category: "feature", description: "New 'Hidden in Plain Sight' course exploring pagan roots in American & Christian traditions" },
      { category: "feature", description: "9 interactive modules covering birthdays, weddings, holidays, symbols, cosmetics, architecture, language, and more" },
      { category: "feature", description: "Case study format with TTS narration using Marcus voice" },
      { category: "feature", description: "200 points awarded upon course completion (22 points per module, 24 for final)" },
      { category: "improvement", description: "Achievement tracking for course completion on Achievements page" },
    ]
  },
  {
    version: "2.4.9",
    date: "2026-01-25",
    title: "Points Roadmap & Achievement Tracking",
    type: "patch",
    changes: [
      { category: "feature", description: "Points Roadmap showing all 880 available points across the platform" },
      { category: "feature", description: "Automatic point awarding via awardPoints() hook" },
      { category: "improvement", description: "Visual breakdown of points by course and assessment" },
    ]
  },
  {
    version: "2.4.8",
    date: "2026-01-20",
    title: "Learning Paths Map & Master Certificate",
    type: "patch",
    changes: [
      { category: "feature", description: "Learning Paths Map visual roadmap on dashboard" },
      { category: "feature", description: "Master Certificate unlocked at 100% curriculum completion" },
      { category: "feature", description: "Printable landscape HTML certificate with unique ID" },
      { category: "improvement", description: "Track progress across PROOF, Greek Life, Myth Busters, and Faith & Authority" },
    ]
  },
  {
    version: "2.4.7",
    date: "2026-01-15",
    title: "PROOF Course Achievement Badges",
    type: "patch",
    changes: [
      { category: "feature", description: "Five interactive P-R-O-O-F badges that unlock with animations" },
      { category: "feature", description: "PROOF Master trophy revealed at 100% completion" },
      { category: "feature", description: "Milestone confetti celebrations at 1st, 3rd, and 5th lessons" },
      { category: "improvement", description: "Enhanced gamification integration with achievement system" },
    ]
  },
  {
    version: "2.4.6",
    date: "2026-01-10",
    title: "Course Point Values System",
    type: "patch",
    changes: [
      { category: "feature", description: "PROOF Course awards 50 points upon completion" },
      { category: "feature", description: "Faith & Authority course awards 70 points" },
      { category: "feature", description: "Should You Stay or Leave assessment awards 60 points" },
      { category: "feature", description: "Saints or Sellouts assessment awards 60 points" },
      { category: "improvement", description: "Myth Buster Library now awards up to 350 points total" },
    ]
  },
  {
    version: "2.4.5",
    date: "2026-01-05",
    title: "TTS Audio Narration Enhancement",
    type: "patch",
    changes: [
      { category: "feature", description: "Marcus voice TTS narration for course content" },
      { category: "feature", description: "Audio playback controls for lesson modules" },
      { category: "improvement", description: "Improved audio quality and pacing" },
    ]
  },
  {
    version: "2.4.4",
    date: "2025-12-28",
    title: "Course Module Framework",
    type: "patch",
    changes: [
      { category: "feature", description: "Case study format for interactive learning" },
      { category: "feature", description: "Module-based progress tracking" },
      { category: "improvement", description: "Consistent lesson layout across all courses" },
    ]
  },
  {
    version: "2.4.3",
    date: "2025-12-20",
    title: "Enhanced Assessment Results",
    type: "patch",
    changes: [
      { category: "feature", description: "Shareable assessment certificates" },
      { category: "feature", description: "Detailed score breakdowns by category" },
      { category: "improvement", description: "Better visual presentation of results" },
    ]
  },
  {
    version: "2.4.2",
    date: "2025-12-15",
    title: "Subscription Tier Features",
    type: "patch",
    changes: [
      { category: "feature", description: "Pro tier unlocks AI tools and premium audio" },
      { category: "feature", description: "Ministry tier provides full platform access" },
      { category: "improvement", description: "Visual tier comparison in subscription manager" },
    ]
  },
  {
    version: "2.4.1",
    date: "2025-12-10",
    title: "Dashboard Quick Actions",
    type: "patch",
    changes: [
      { category: "feature", description: "Reorganized quick actions for easier navigation" },
      { category: "improvement", description: "Context-aware action suggestions" },
      { category: "improvement", description: "Faster loading for dashboard widgets" },
    ]
  },
  {
    version: "2.4.0",
    date: "2025-12-03",
    title: "Admin Gifting & Feature Customization",
    type: "minor",
    changes: [
      { category: "feature", description: "Admin gift subscription manager - gift Pro or Ministry access to users" },
      { category: "feature", description: "Tiered feature customization - personalize your dashboard experience" },
      { category: "feature", description: "Free users can hide up to 5 features, Pro/Ministry get unlimited customization" },
      { category: "improvement", description: "Subscription system now checks gifted subscriptions automatically" },
      { category: "security", description: "RLS policies for feature preferences and gifted subscriptions" },
    ]
  },
  {
    version: "2.3.0",
    date: "2025-12-02",
    title: "Enhanced Dashboard & Personalization",
    type: "minor",
    changes: [
      { category: "feature", description: "Personalization survey for new users" },
      { category: "feature", description: "Dashboard adapts based on user preferences" },
      { category: "improvement", description: "Improved quick actions organization" },
      { category: "improvement", description: "Better mobile responsiveness across all pages" },
    ]
  },
  {
    version: "2.2.0",
    date: "2025-12-01",
    title: "Demo Mode & Onboarding Improvements",
    type: "minor",
    changes: [
      { category: "feature", description: "Interactive demo mode for exploring features without signup" },
      { category: "feature", description: "Demo walkthrough overlay with guided tour" },
      { category: "improvement", description: "Streamlined onboarding flow" },
      { category: "improvement", description: "Better first-time user experience" },
    ]
  },
  {
    version: "2.1.0",
    date: "2025-11-30",
    title: "iOS Installation Fix & SEO Improvements",
    type: "minor",
    changes: [
      { category: "fix", description: "Fixed Safari 'cannot find network' error when installing on iPhone" },
      { category: "feature", description: "Dynamic sitemap generator that auto-updates when pages are added" },
      { category: "feature", description: "Structured data (JSON-LD) for rich search snippets" },
      { category: "feature", description: "Comprehensive SEO meta tags for all 45+ pages" },
      { category: "feature", description: "PWA validation tests to prevent future installation issues" },
      { category: "improvement", description: "Service worker now handles SPA routes correctly" },
      { category: "improvement", description: "Better offline fallback experience" },
    ]
  },
  {
    version: "2.0.0",
    date: "2025-11-28",
    title: "Real-Time Community Features",
    type: "major",
    changes: [
      { category: "feature", description: "Real-time notifications for prayer wall updates" },
      { category: "feature", description: "Live community interactions with instant updates" },
      { category: "feature", description: "Keyboard shortcuts for quick navigation (Alt+D, Alt+P, Alt+B)" },
      { category: "feature", description: "Smart route prefetching for faster navigation" },
      { category: "improvement", description: "Enhanced error handling with retry mechanisms" },
      { category: "improvement", description: "Optimized image loading with lazy loading" },
      { category: "security", description: "Strengthened RLS policies across all tables" },
    ]
  },
  {
    version: "1.5.0",
    date: "2025-11-25",
    title: "Enhanced User Experience",
    type: "minor",
    changes: [
      { category: "feature", description: "Feature feedback system for continuous improvement" },
      { category: "feature", description: "Comprehensive form validation with real-time feedback" },
      { category: "improvement", description: "Improved network error handling and offline support" },
      { category: "improvement", description: "Better loading states across all pages" },
      { category: "fix", description: "Fixed prayer journal sync issues" },
    ]
  },
  {
    version: "1.4.0",
    date: "2025-11-20",
    title: "Community Forum Launch",
    type: "minor",
    changes: [
      { category: "feature", description: "Community forum for discussions and support" },
      { category: "feature", description: "Forum notifications for replies and mentions" },
      { category: "feature", description: "Best answer marking for helpful responses" },
      { category: "improvement", description: "Organization-specific content filtering" },
    ]
  },
  {
    version: "1.3.0",
    date: "2025-11-15",
    title: "Prayer Wall Enhancements",
    type: "minor",
    changes: [
      { category: "feature", description: "Encouragement notes when praying for others" },
      { category: "feature", description: "Answered prayer testimonies" },
      { category: "feature", description: "Prayer request filtering by organization" },
      { category: "improvement", description: "Better privacy controls for prayer requests" },
    ]
  },
  {
    version: "1.2.0",
    date: "2025-11-10",
    title: "Gamification System",
    type: "minor",
    changes: [
      { category: "feature", description: "Points and levels for spiritual growth activities" },
      { category: "feature", description: "Achievement badges for milestones" },
      { category: "feature", description: "Daily challenges to encourage engagement" },
      { category: "improvement", description: "Progress tracking dashboard" },
    ]
  },
  {
    version: "1.1.0",
    date: "2025-11-05",
    title: "Daily Devotionals",
    type: "minor",
    changes: [
      { category: "feature", description: "AI-generated daily devotionals" },
      { category: "feature", description: "Scripture-based reflections" },
      { category: "feature", description: "Devotional reminders via push notifications" },
      { category: "improvement", description: "Offline devotional access" },
    ]
  },
  {
    version: "1.0.0",
    date: "2025-11-01",
    title: "Initial Launch",
    type: "major",
    changes: [
      { category: "feature", description: "Sacred Greeks assessment tool" },
      { category: "feature", description: "Prayer journal with categories" },
      { category: "feature", description: "Bible study with AI-powered search" },
      { category: "feature", description: "Symbol guide for Greek organizations" },
      { category: "feature", description: "User authentication and profiles" },
      { category: "security", description: "Row-level security for all user data" },
    ]
  },
];

const categoryIcons = {
  feature: <Sparkles className="h-4 w-4" />,
  fix: <Bug className="h-4 w-4" />,
  improvement: <Zap className="h-4 w-4" />,
  security: <Shield className="h-4 w-4" />,
};

const categoryColors = {
  feature: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  fix: "bg-red-500/10 text-red-500 border-red-500/20",
  improvement: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  security: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const typeColors = {
  major: "bg-primary text-primary-foreground",
  minor: "bg-secondary text-secondary-foreground",
  patch: "bg-muted text-muted-foreground",
};

export default function Changelog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...pageSEO.changelog} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <AnimatedSection animation="fade-up">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Changelog</h1>
            <p className="text-muted-foreground">
              Track all updates, improvements, and new features added to Sacred Greeks.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {changelog.map((entry, index) => (
            <AnimatedSection key={entry.version} animation="fade-up" delay={index * 100}>
              <Card className={index === 0 ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Badge className={typeColors[entry.type]}>
                        v{entry.version}
                      </Badge>
                      <CardTitle className="text-xl">{entry.title}</CardTitle>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  {index === 0 && (
                    <CardDescription className="text-primary font-medium">
                      Latest Release
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${categoryColors[change.category]} shrink-0 mt-0.5`}
                        >
                          {categoryIcons[change.category]}
                          <span className="ml-1 capitalize">{change.category}</span>
                        </Badge>
                        <span className="text-foreground">{change.description}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p>Have a feature request or found a bug?</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/dashboard')}
            className="text-primary"
          >
            Send us feedback from the dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
