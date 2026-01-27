import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, HelpCircle, Navigation, LayoutDashboard, Users, Share2, Sparkles } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { useFeaturePreferences } from '@/hooks/use-feature-preferences';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Feature ID to friendly name mapping for audio narration
const FEATURE_AUDIO_NAMES: Record<string, string> = {
  'daily-devotional': 'Daily Devotional for scripture-based reflections',
  'myth-buster': 'Mythbusters to address common misconceptions about Greek life',
  'bglo-objections': 'Handle Greek Life Objections with biblical responses',
  '30-day-journey': '30-Day Journey to build your faith foundation',
  'prayer-journal': 'Prayer Journal to track your prayers',
  'prayer-wall': 'Prayer Wall for community prayer requests',
  'bible-study': 'Bible Study tools and reading plans',
  'symbol-guide': 'Symbol Guide for Christian perspectives on Greek symbolism',
  'achievements': 'Achievements to track your progress',
  'bookmarks': 'Bookmarks for saved resources',
  'did-you-know': 'Did You Know educational content',
  'content-hub': 'Content Hub with podcasts and videos',
  'family-fallout': 'Family and Ministry Fallout resources',
  'service-hours': 'Service Hours tracking',
  'org-community': 'Greek Community connections',
  'forum': 'Discussion Forum',
  'ask-dr-lyman': 'Ask Dr. Lyman AI assistant',
  'prayer-guide': 'AI Prayer Guide',
  'response-coach': 'Response Coach for conversation practice',
  'coaching': 'Coaching Application',
  'chapter-resources': 'Chapter Resources for leaders',
  'chapter-meeting-notes': 'Chapter Meeting Notes',
  'new-assessment': 'Faith Assessment',
  'proof-assessment': 'P.R.O.O.F. Quiz',
  'shattered-masks': 'Shattered Masks archetype discovery',
  'assessment-history': 'My Assessments history',
};

// Category groupings for audio narration
const CATEGORY_INTROS: Record<string, string> = {
  core: 'Core features include',
  study: 'For study and learning, you have',
  prayer: 'Your prayer tools include',
  community: 'Community features include',
  ai: 'AI-powered tools include',
  chapter: 'Chapter leadership tools include',
};

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
}

function generateDynamicSections(
  visibleFeatureIds: string[],
  isDemoMode: boolean
): GuideSection[] {
  // Build dynamic feature list for the dashboard section
  const featuredFeatures = ['daily-devotional', 'myth-buster', 'bglo-objections'];
  const visibleFeatured = featuredFeatures.filter(id => visibleFeatureIds.includes(id));
  
  let featuredContent = '';
  if (visibleFeatured.length > 0) {
    const featuredNames = visibleFeatured.map(id => FEATURE_AUDIO_NAMES[id] || id).join(', ');
    featuredContent = `The Get Started section shows: ${featuredNames}.`;
  } else {
    featuredContent = 'The Get Started section shows quick access to your enabled features.';
  }

  // Group other visible features by type for navigation section
  const learningFeatures = visibleFeatureIds.filter(id => 
    ['proof-assessment', 'myth-buster', 'symbol-guide', 'bglo-objections', 'did-you-know', 'content-hub'].includes(id)
  );
  const spiritualFeatures = visibleFeatureIds.filter(id => 
    ['daily-devotional', 'prayer-journal', 'prayer-wall', 'bible-study', '30-day-journey'].includes(id)
  );
  const communityFeatures = visibleFeatureIds.filter(id => 
    ['org-community', 'forum', 'prayer-wall'].includes(id)
  );
  const aiFeatures = visibleFeatureIds.filter(id => 
    ['ask-dr-lyman', 'response-coach', 'prayer-guide', 'coaching'].includes(id)
  );

  let navContent = 'The navigation panel on the left side gives you quick access to your enabled features.';
  
  if (learningFeatures.length > 0) {
    const names = learningFeatures.slice(0, 3).map(id => FEATURE_AUDIO_NAMES[id]?.split(' ')[0] || id).join(', ');
    navContent += ` Your Learning Path includes ${names}${learningFeatures.length > 3 ? ' and more' : ''}.`;
  }
  
  if (spiritualFeatures.length > 0) {
    const names = spiritualFeatures.slice(0, 3).map(id => FEATURE_AUDIO_NAMES[id]?.split(' for')[0]?.split(' to')[0] || id).join(', ');
    navContent += ` Spiritual Practices includes ${names}${spiritualFeatures.length > 3 ? ' and more' : ''}.`;
  }

  if (aiFeatures.length > 0) {
    const names = aiFeatures.map(id => FEATURE_AUDIO_NAMES[id]?.split(' for')[0] || id).join(', ');
    navContent += ` AI-powered tools available: ${names}.`;
  }

  navContent += ' On mobile devices, the navigation appears as a bottom bar for easy thumb access.';

  const sections: GuideSection[] = [
    {
      id: 'welcome',
      title: 'Welcome & Overview',
      icon: LayoutDashboard,
      content: `Welcome to Sacred Greeks! This audio guide will help you navigate your dashboard and discover the features you have enabled. ${visibleFeatureIds.length > 10 ? 'You have many features active.' : visibleFeatureIds.length < 5 ? 'You have a focused set of features enabled.' : 'You have a balanced selection of features.'} Let me walk you through each section.`
    },
    {
      id: 'navigation',
      title: 'Navigation Panel',
      icon: Navigation,
      content: navContent
    },
  ];

  // Only add demo section if in demo mode
  if (isDemoMode) {
    sections.push({
      id: 'demo',
      title: 'Demo Mode & Sample Data',
      icon: Sparkles,
      content: `You're viewing the app in Demo Mode with sample data. The demo includes example progress stats, sample learning paths, and placeholder content. Once you create an account and log in, all demo data will be replaced with your personal progress, prayers, and achievements. Look for the Preview Mode banner at the top of the page.`
    });
  }

  sections.push(
    {
      id: 'dashboard',
      title: 'Dashboard Sections',
      icon: LayoutDashboard,
      content: `Your dashboard is personalized based on features you've enabled. At the top, you'll see a welcome message and your Greek organization's greeting. ${featuredContent} Your Progress section displays your current streak, assessment count, and today's devotional status. ${communityFeatures.length > 0 ? 'The Greek Community section helps you connect with other members.' : ''} ${aiFeatures.includes('ask-dr-lyman') ? 'The AI Assistant is ready to answer your questions.' : ''} The Explore More section at the bottom contains quick links to additional resources you've enabled.`
    },
    {
      id: 'sharing',
      title: 'Invite & Share',
      icon: Share2,
      content: `Sacred Greeks is designed to be shared with your Greek organization, chapter, or faith community. To invite others, look for the Share button in your profile or settings area. You can send invitation links via email or copy a shareable link. The more members who participate, the stronger your Greek community becomes.`
    },
    {
      id: 'tips',
      title: 'Quick Tips & Profile',
      icon: Users,
      content: `Here are some quick tips. You can customize which features appear on your dashboard by going to Profile and selecting Feature Customization. ${visibleFeatureIds.length > 15 ? 'You have many features enabled - consider hiding ones you dont use often.' : ''} Pull down on mobile to refresh your data. Use the audio listen buttons throughout the app to have content read aloud. To make changes to your account or Greek organization affiliation, click the Profile button in the header.`
    }
  );

  return sections;
}

export function DashboardAudioGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile();
  const { isDemoMode } = useDemoMode();
  const { getVisibleFeatures, loading: prefsLoading } = useFeaturePreferences();

  // Get visible feature IDs
  const visibleFeatureIds = useMemo(() => {
    if (prefsLoading) return [];
    const features = getVisibleFeatures();
    return features.map(f => f.id);
  }, [getVisibleFeatures, prefsLoading]);

  // Generate dynamic sections based on visible features
  const GUIDE_SECTIONS = useMemo(() => {
    return generateDynamicSections(visibleFeatureIds, isDemoMode);
  }, [visibleFeatureIds, isDemoMode]);

  // Full combined script for the complete audio guide
  const FULL_AUDIO_SCRIPT = useMemo(() => {
    return GUIDE_SECTIONS.map(s => s.content).join(' ');
  }, [GUIDE_SECTIONS]);

  // Auto-expand first section in demo mode on tablet/desktop
  useEffect(() => {
    if (isDemoMode && isOpen && !isMobile && !expandedSection) {
      setExpandedSection('welcome');
    }
  }, [isDemoMode, isOpen, isMobile, expandedSection]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden lg:inline">Audio Guide</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 md:w-[420px] p-0" 
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b border-border bg-gradient-to-r from-sacred/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-sacred" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Dashboard Audio Guide</h3>
                {isDemoMode && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent text-accent-foreground rounded">
                    Demo
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Personalized guide based on your enabled features
              </p>
            </div>
          </div>
        </div>

        {/* Full Audio Guide Button */}
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Listen to the complete guided tour of your dashboard.
            </p>
            <ListenButton
              text={FULL_AUDIO_SCRIPT}
              itemId={`dashboard-full-audio-guide-${visibleFeatureIds.length}`}
              title="Complete Dashboard Guide"
              voice="onyx"
              className="w-full justify-center"
              showLabel={true}
            />
          </div>
        </div>

        {/* Sections - Shown on tablet/desktop */}
        {!isMobile && (
          <ScrollArea className="max-h-[350px]">
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 py-1 mb-1">
                Or explore individual sections:
              </p>
              <Accordion 
                type="single" 
                collapsible 
                value={expandedSection}
                onValueChange={setExpandedSection}
              >
                {GUIDE_SECTIONS.map((section) => (
                  <AccordionItem 
                    key={section.id} 
                    value={section.id}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-2 px-2 hover:bg-muted/50 rounded-md hover:no-underline">
                      <div className="flex items-center gap-2 text-left">
                        <div className="w-7 h-7 rounded-md bg-sacred/10 flex items-center justify-center flex-shrink-0">
                          <section.icon className="w-3.5 h-3.5 text-sacred" />
                        </div>
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 pb-3">
                      <div className="pl-9 space-y-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                        <ListenButton
                          text={section.content}
                          itemId={`dashboard-guide-${section.id}-${visibleFeatureIds.length}`}
                          title={section.title}
                          voice="onyx"
                          size="sm"
                          showLabel={true}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        )}

        {/* Mobile: Show compact section list */}
        {isMobile && (
          <ScrollArea className="max-h-[250px]">
            <div className="p-2 space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">
                Individual sections:
              </p>
              {GUIDE_SECTIONS.map((section) => (
                <div 
                  key={section.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-sacred/10 flex items-center justify-center">
                      <section.icon className="w-3 h-3 text-sacred" />
                    </div>
                    <span className="text-sm">{section.title}</span>
                  </div>
                  <ListenButton
                    text={section.content}
                    itemId={`dashboard-guide-${section.id}-${visibleFeatureIds.length}`}
                    title={section.title}
                    voice="onyx"
                    size="sm"
                    variant="ghost"
                    showLabel={false}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="p-3 border-t border-border bg-muted/20">
          <p className="text-[10px] text-muted-foreground text-center">
            Powered by ElevenLabs TTS • Personalized to your feature settings
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
