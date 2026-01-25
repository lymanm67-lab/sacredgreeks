import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  GraduationCap, 
  Crown, 
  ChevronRight, 
  BookOpen, 
  Hammer, 
  Users, 
  Eye, 
  CheckCircle2,
  Scroll,
  Shield,
  Heart
} from 'lucide-react';

interface JourneyStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  guildFeatures: string[];
  biblicalParallels: {
    title: string;
    scripture: string;
    scriptureText: string;
    application: string;
  }[];
  jesusConnection: string;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'apprentice',
    title: 'Apprentice',
    subtitle: 'The Beginning (Years 1-3)',
    description: 'A young person enters formal training under a master craftsman, learning through observation, repetition, and submission to authority.',
    icon: User,
    color: 'text-blue-600',
    bgColor: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/40',
    guildFeatures: [
      'Long-term apprenticeship under authority',
      'Submission to instruction and correction',
      'Periods of silence and observation',
      'Living and working closely with others',
      'Learning through repetition and discipline',
      'Accountability to the master craftsman'
    ],
    biblicalParallels: [
      {
        title: 'Jesus Trained Under Joseph',
        scripture: 'Luke 2:51-52',
        scriptureText: 'Then he went down to Nazareth with them and was obedient to them... And Jesus grew in wisdom and stature, and in favor with God and man.',
        application: 'Even Jesus submitted to human authority during His formative years, learning the carpenter\'s trade under Joseph\'s guidance.'
      },
      {
        title: 'Disciples Follow Their Rabbi',
        scripture: 'Matthew 4:19-20',
        scriptureText: '"Come, follow me," Jesus said, "and I will send you out to fish for people." At once they left their nets and followed him.',
        application: 'Like apprentices, the disciples left everything to learn under their Master through observation and imitation.'
      }
    ],
    jesusConnection: 'As an apprentice carpenter, Jesus would have experienced years of silent observation, repetitive practice, and correction—preparing Him for His later ministry. This period of hidden development aligns perfectly with Philippians 2:7, where Christ "made himself nothing."'
  },
  {
    id: 'journeyman',
    title: 'Journeyman',
    subtitle: 'The Development (Years 4-7)',
    description: 'Having proven basic competency, the craftsman now travels to learn from different masters, expanding skills and building a reputation.',
    icon: GraduationCap,
    color: 'text-amber-600',
    bgColor: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/40',
    guildFeatures: [
      'Demonstrating mastery through tested skill',
      'Traveling to learn from multiple masters',
      'Building reputation through quality work',
      'Teaching younger apprentices',
      'Networking within the guild system',
      'Developing signature techniques'
    ],
    biblicalParallels: [
      {
        title: 'The 70 Sent Out',
        scripture: 'Luke 10:1',
        scriptureText: 'After this the Lord appointed seventy-two others and sent them two by two ahead of him to every town and place where he was about to go.',
        application: 'Like journeymen, the 70 disciples traveled to practice and develop their skills before becoming master teachers themselves.'
      },
      {
        title: 'Paul\'s Early Ministry',
        scripture: 'Galatians 1:17-18',
        scriptureText: 'I went into Arabia. Later I returned to Damascus. Then after three years, I went up to Jerusalem.',
        application: 'Paul spent years in development before his major ministry—a journeyman phase of growth and preparation.'
      }
    ],
    jesusConnection: 'By His late teens/early twenties, Jesus would have been a journeyman craftsman—capable, respected locally, and possibly traveling to larger construction projects. His reputation for excellent work (Mark 6:3 implies He was well-known as "the carpenter") prepared Him for public ministry.'
  },
  {
    id: 'master',
    title: 'Master',
    subtitle: 'The Completion (Year 7+)',
    description: 'After demonstrating exceptional skill and character, the craftsman is recognized as a master—able to take apprentices and represent the guild.',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/40',
    guildFeatures: [
      'Full recognition by the guild',
      'Ability to train apprentices',
      'Upholding the reputation of the trade',
      'Community evaluation of readiness',
      'Responsibility for quality standards',
      'Leadership within the guild structure'
    ],
    biblicalParallels: [
      {
        title: 'Jesus Begins Public Ministry',
        scripture: 'Luke 3:23',
        scriptureText: 'Now Jesus himself was about thirty years old when he began his ministry.',
        application: 'At 30—the age of full maturity in Jewish culture and typical master craftsman age—Jesus began His public teaching ministry.'
      },
      {
        title: 'Commissioning the Twelve',
        scripture: 'Matthew 28:19-20',
        scriptureText: '"Go and make disciples of all nations... teaching them to obey everything I have commanded you."',
        application: 'Like a master craftsman training others, Jesus commissioned His disciples to train the next generation.'
      }
    ],
    jesusConnection: 'Jesus the Master Craftsman spent ~18 years in the guild system before beginning His public ministry at 30. His mastery of carpentry taught Him precision, patience, and the value of building on solid foundations—themes He carried into His teaching (Matthew 7:24-27).'
  }
];

interface GuildJourneyDiagramProps {
  className?: string;
}

export function GuildJourneyDiagram({ className }: GuildJourneyDiagramProps) {
  const [activeStage, setActiveStage] = useState<string>('apprentice');
  const [showBiblical, setShowBiblical] = useState(true);

  const currentStage = JOURNEY_STAGES.find(s => s.id === activeStage) || JOURNEY_STAGES[0];
  const IconComponent = currentStage.icon;

  return (
    <div className={className}>
      <Card className="border-sacred/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Hammer className="w-5 h-5 text-sacred" />
                Ancient Guild Membership Journey
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Jesus & Paul's path through the apprenticeship system
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showBiblical ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBiblical(true)}
                className={showBiblical ? "bg-sacred hover:bg-sacred/90" : ""}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Biblical View
              </Button>
              <Button
                variant={!showBiblical ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBiblical(false)}
                className={!showBiblical ? "bg-sacred hover:bg-sacred/90" : ""}
              >
                <Hammer className="w-4 h-4 mr-1" />
                Guild View
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Journey Path Visualization */}
          <div className="flex items-center justify-between mb-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-purple-500/30 -translate-y-1/2 rounded-full" />
            
            {JOURNEY_STAGES.map((stage, index) => {
              const StageIcon = stage.icon;
              const isActive = stage.id === activeStage;
              const isPast = JOURNEY_STAGES.findIndex(s => s.id === activeStage) > index;
              
              return (
                <div key={stage.id} className="flex flex-col items-center relative z-10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStage(stage.id)}
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center 
                      transition-all duration-300 border-2 cursor-pointer
                      ${isActive 
                        ? `bg-gradient-to-br ${stage.bgColor} ${stage.borderColor} shadow-lg` 
                        : isPast 
                          ? 'bg-sacred/20 border-sacred/40' 
                          : 'bg-muted border-muted-foreground/20'
                      }
                    `}
                  >
                    {isPast && !isActive ? (
                      <CheckCircle2 className="w-6 h-6 text-sacred" />
                    ) : (
                      <StageIcon className={`w-6 h-6 ${isActive ? stage.color : 'text-muted-foreground'}`} />
                    )}
                  </motion.button>
                  
                  <div className="mt-3 text-center">
                    <p className={`font-semibold text-sm ${isActive ? stage.color : 'text-muted-foreground'}`}>
                      {stage.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {stage.subtitle}
                    </p>
                  </div>

                  {index < JOURNEY_STAGES.length - 1 && (
                    <ChevronRight className="absolute -right-8 top-4 w-6 h-6 text-muted-foreground/30 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Stage Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeStage}-${showBiblical}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`bg-gradient-to-br ${currentStage.bgColor} ${currentStage.borderColor} border`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-background/60 flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${currentStage.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${currentStage.color}`}>
                        {currentStage.title}: {currentStage.subtitle}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {currentStage.description}
                      </p>
                    </div>
                  </div>

                  {showBiblical ? (
                    <div className="space-y-4">
                      {/* Jesus Connection */}
                      <div className="p-4 rounded-lg bg-sacred/10 border border-sacred/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Crown className="w-4 h-4 text-sacred" />
                          <h4 className="font-semibold text-sacred">Jesus as Master Carpenter</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {currentStage.jesusConnection}
                        </p>
                      </div>

                      {/* Biblical Parallels */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentStage.biblicalParallels.map((parallel, idx) => (
                          <div 
                            key={idx} 
                            className="p-4 rounded-lg bg-background/60 border border-border/50"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Scroll className="w-4 h-4 text-amber-600" />
                              <h5 className="font-semibold text-sm">{parallel.title}</h5>
                            </div>
                            <div className="bg-amber-500/10 p-2 rounded mb-2 border-l-2 border-amber-500">
                              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                {parallel.scripture}
                              </p>
                              <p className="text-xs italic text-muted-foreground">
                                "{parallel.scriptureText}"
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {parallel.application}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Guild Stage Requirements & Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {currentStage.guildFeatures.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-start gap-2 p-2 rounded bg-background/60"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Summary */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-sacred" />
              <h4 className="font-semibold text-sm">Key Insight</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Jesus condemned <strong>idolatry</strong>, not <strong>organization</strong>. He confronted 
              <strong> misplaced worship</strong>, not <strong>structure</strong>. He opposed <strong>false devotion</strong>, 
              not <strong>disciplined brotherhood</strong>. There is no Gospel account of Jesus condemning trade guilds, 
              apprenticeship systems, or structured communities. <em>He lived inside them.</em>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
