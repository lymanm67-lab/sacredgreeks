import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scroll, 
  Hand, 
  MessageSquare, 
  Sparkles,
  BookOpen,
  Download,
  ChevronDown,
  ChevronUp,
  Quote,
  ArrowRight
} from 'lucide-react';
import { 
  GUILD_OATHS, 
  GUILD_HANDSHAKES, 
  GUILD_PHRASES, 
  GUILD_RITUALS,
  type GuildPractice 
} from '@/data/guildPracticesContent';
import { generateGuildWorksheetPDF } from '@/lib/guild-worksheet-pdf';
import { toast } from 'sonner';

interface GuildPracticesSectionProps {
  className?: string;
}

const CATEGORY_CONFIG = {
  oath: {
    icon: Scroll,
    label: 'Oaths',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Professional commitments of loyalty and conduct'
  },
  handshake: {
    icon: Hand,
    label: 'Handshakes',
    color: 'text-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Grips and tokens for member recognition'
  },
  phrase: {
    icon: MessageSquare,
    label: 'Phrases',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Passwords and challenge-response identification'
  },
  ritual: {
    icon: Sparkles,
    label: 'Rituals',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'Ceremonies marking advancement and celebration'
  }
};

function PracticeCard({ practice }: { practice: GuildPractice }) {
  const [expanded, setExpanded] = useState(false);
  const config = CATEGORY_CONFIG[practice.category];
  const IconComponent = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className={`${config.borderColor} border overflow-hidden`}>
        <CardHeader 
          className={`${config.bgColor} pb-3 cursor-pointer`}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-background/60 flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-5 h-5 ${config.color}`} />
              </div>
              <div>
                <CardTitle className="text-base">{practice.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{practice.historicalContext}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="pt-4 space-y-4">
                {/* Example Quote */}
                <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-sacred">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-sacred mt-1 flex-shrink-0" />
                    <p className="text-sm italic">{practice.example}</p>
                  </div>
                </div>

                {/* Modern Parallel */}
                {practice.modernParallel && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Modern Parallel</p>
                      <p className="text-sm text-muted-foreground">{practice.modernParallel}</p>
                    </div>
                  </div>
                )}

                {/* Biblical Connection */}
                {practice.biblicalConnection && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10">
                    <BookOpen className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Scripture Reference</p>
                      <p className="text-sm text-muted-foreground">{practice.biblicalConnection}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export function GuildPracticesSection({ className }: GuildPracticesSectionProps) {
  const handleDownloadWorksheet = () => {
    generateGuildWorksheetPDF();
    toast.success('Worksheet PDF downloaded!');
  };

  return (
    <div className={className}>
      <Card className="border-sacred/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-600" />
                Historical Guild Practices
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Sample oaths, handshakes, phrases & rituals from ancient trade guilds
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleDownloadWorksheet}
              className="border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Worksheet
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Key Principle */}
          <div className="mb-6 p-4 rounded-lg bg-sacred/10 border border-sacred/20">
            <p className="text-sm">
              <strong className="text-sacred">Key Principle:</strong> These practices were <em>professional</em> and <em>practical</em>—not 
              religious worship. Guild oaths were commitments to quality and confidentiality. Secret handshakes identified 
              fellow craftsmen before photo IDs existed. Rituals marked advancement and celebrated community. 
              <strong> Understanding this context transforms how we evaluate modern fraternal practices.</strong>
            </p>
          </div>

          <Tabs defaultValue="oath" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((category) => {
                const config = CATEGORY_CONFIG[category];
                const IconComponent = config.icon;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{config.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="oath" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30">
                  {CATEGORY_CONFIG.oath.description}
                </Badge>
              </div>
              {GUILD_OATHS.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </TabsContent>

            <TabsContent value="handshake" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30">
                  {CATEGORY_CONFIG.handshake.description}
                </Badge>
              </div>
              {GUILD_HANDSHAKES.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </TabsContent>

            <TabsContent value="phrase" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30">
                  {CATEGORY_CONFIG.phrase.description}
                </Badge>
              </div>
              {GUILD_PHRASES.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </TabsContent>

            <TabsContent value="ritual" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30">
                  {CATEGORY_CONFIG.ritual.description}
                </Badge>
              </div>
              {GUILD_RITUALS.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-sm">📝 Printable Study Worksheet</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Includes all examples, reflection questions, and group discussion prompts
                </p>
              </div>
              <Button
                onClick={handleDownloadWorksheet}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
