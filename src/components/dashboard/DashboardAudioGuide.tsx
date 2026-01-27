import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, HelpCircle, X } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DASHBOARD_NAVIGATION_SCRIPT = `Welcome to Sacred Greeks! Let me guide you through your dashboard.

At the top, you'll see a welcome message and your organization's personalized greeting.

Next are your Featured Actions - the three core tools for your spiritual journey: the PROOF Assessment to understand your faith identity, the Daily Devotional for scripture meditation, and your Prayer Journal for recording prayers.

Below that is Your Progress section showing your current streak, assessment count, and today's devotional status.

The Learning Paths Map displays your training roadmap across four tracks: PROOF Course, Greek Life and Guild, Myth Busters, and Faith and Authority. Click any path to continue your learning.

Further down, you'll find the Greek Community section for connecting with other members, and an AI Assistant ready to answer your questions.

Finally, the Explore More section at the bottom contains quick links to additional resources and tools.

You can collapse sections by clicking their headers to customize your view. Pull down to refresh your dashboard at any time.`;

export function DashboardAudioGuide() {
  const [isOpen, setIsOpen] = useState(false);

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
      <PopoverContent className="w-72 sm:w-80 p-0" align="end">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sacred/10 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-sacred" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Dashboard Guide</h3>
              <p className="text-xs text-muted-foreground">Audio navigation help</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Listen to a guided overview of your dashboard and learn how to navigate each section.
          </p>

          <div className="flex items-center gap-2">
            <ListenButton
              text={DASHBOARD_NAVIGATION_SCRIPT}
              itemId="dashboard-navigation-guide"
              title="Dashboard Navigation Guide"
              voice="onyx"
              className="flex-1"
              showLabel={true}
            />
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center">
              Powered by ElevenLabs TTS
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
