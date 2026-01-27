import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, HelpCircle, Navigation, LayoutDashboard, Users, Share2, Sparkles } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDemoMode } from '@/contexts/DemoModeContext';
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

const GUIDE_SECTIONS = [
  {
    id: 'welcome',
    title: 'Welcome & Overview',
    icon: LayoutDashboard,
    content: `Welcome to Sacred Greeks! This audio guide will help you navigate your dashboard and discover all the features available to you. Let me walk you through each section so you can make the most of your spiritual journey.`
  },
  {
    id: 'navigation',
    title: 'Navigation Panel',
    icon: Navigation,
    content: `The navigation panel on the left side of your screen gives you quick access to all areas of the app. At the top, you'll find the Dashboard link which brings you here. Below that, the Learning Path section contains your training courses including the PROOF Course, PROOF Quiz, Greek Life and Guild, Myth Busters, and Faith and Authority modules. The Spiritual Practices section includes your Daily Devotional, Prayer Journal, and other spiritual tools. On mobile devices, the navigation appears as a bottom bar for easy thumb access.`
  },
  {
    id: 'demo',
    title: 'Demo Mode & Sample Data',
    icon: Sparkles,
    content: `If you're exploring as a guest or haven't logged in yet, you're viewing the app in Demo Mode. This means you're seeing sample data that demonstrates how the app works. The demo includes example progress stats, sample learning paths, and placeholder content. Once you create an account and log in, all demo data will be replaced with your personal progress, prayers, and achievements. Look for the Preview Mode banner at the top of the page to know when you're in demo mode.`
  },
  {
    id: 'dashboard',
    title: 'Dashboard Sections',
    icon: LayoutDashboard,
    content: `Your dashboard is organized into several key sections. At the top, you'll see a welcome message and your organization's personalized greeting. The Featured Actions section shows three core tools: the PROOF Assessment to understand your faith identity, the Daily Devotional for scripture meditation, and your Prayer Journal for recording prayers. Your Progress section displays your current streak, assessment count, and today's devotional status. The Learning Paths Map shows your training roadmap across four tracks. The Greek Community section helps you connect with other members, and the AI Assistant is ready to answer your questions. Finally, the Explore More section at the bottom contains quick links to additional resources.`
  },
  {
    id: 'sharing',
    title: 'Invite & Share',
    icon: Share2,
    content: `Sacred Greeks is designed to be shared with your Greek organization, chapter, or faith community. To invite others, look for the Share button in your profile or settings area. You can send invitation links via email or copy a shareable link to send through text or social media. When you invite someone, they'll be able to join your organization's community and see shared content. Encourage your chapter members to join so you can track collective progress, share prayer requests, and grow together in faith. The more members who participate, the stronger your Greek community becomes.`
  },
  {
    id: 'tips',
    title: 'Quick Tips',
    icon: Users,
    content: `Here are some quick tips to enhance your experience. You can collapse dashboard sections by clicking their headers to customize your view. Pull down on mobile to refresh your dashboard data. Use the audio listen buttons throughout the app to have content read aloud. Check your notifications bell for updates from your community. Visit your profile to update your Greek organization affiliation and personalize your experience. And remember, the AI Assistant on your dashboard can answer questions about faith, Greek life, and using the app.`
  }
];

// Full combined script for the complete audio guide
const FULL_AUDIO_SCRIPT = GUIDE_SECTIONS.map(s => s.content).join(' ');

export function DashboardAudioGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile();
  const { isDemoMode } = useDemoMode();

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
              <p className="text-xs text-muted-foreground">Learn how to navigate and use the app</p>
            </div>
          </div>
        </div>

        {/* Full Audio Guide Button */}
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Listen to the complete guided tour of all dashboard features.
            </p>
            <ListenButton
              text={FULL_AUDIO_SCRIPT}
              itemId="dashboard-full-audio-guide"
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
                          itemId={`dashboard-guide-${section.id}`}
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
                    itemId={`dashboard-guide-${section.id}`}
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
            Powered by ElevenLabs TTS • Tap any section to learn more
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
