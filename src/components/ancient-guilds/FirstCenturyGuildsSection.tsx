import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Hammer, 
  Tent, 
  BookOpen, 
  Users, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Quote,
  Volume2,
  ScrollText
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListenButton } from '@/components/ListenButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GuildData {
  id: string;
  name: string;
  greekTerm: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  biblicalFigures: string[];
  scriptures: string[];
  practices: {
    title: string;
    description: string;
  }[];
  historicalEvidence: string;
  scholarlyNotes: string[];
}

const FIRST_CENTURY_GUILDS: GuildData[] = [
  {
    id: 'tekton',
    name: 'Carpenters Guild (Tektons)',
    greekTerm: 'τέκτων (tektōn)',
    icon: Hammer,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    biblicalFigures: ['Jesus of Nazareth', 'Joseph (his earthly father)'],
    scriptures: ['Mark 6:3 - "Is not this the carpenter (tektōn)?"', 'Matthew 13:55 - "Is not this the carpenter\'s son?"'],
    practices: [
      {
        title: 'Apprenticeship System',
        description: 'Young men entered formal training under a master craftsman (usually father to son). Jesus spent approximately 15-18 years as an apprentice and journeyman before His public ministry.'
      },
      {
        title: 'Trade Secrets & Techniques',
        description: 'Specialized knowledge of joinery, tool-making, and construction was passed down through oral instruction and hands-on training—not shared with outsiders.'
      },
      {
        title: 'Recognition Practices',
        description: 'Traveling craftsmen used tokens, phrases, and physical demonstrations of skill to prove guild membership and secure work in new cities.'
      },
      {
        title: 'Quality Standards',
        description: 'Guild masters maintained standards for workmanship. Shoddy work reflected on the entire guild and could result in expulsion or loss of trading rights.'
      },
      {
        title: 'Mutual Aid',
        description: 'Guild members supported one another during illness, provided for widows and orphans, and assisted traveling craftsmen with housing and work referrals.'
      }
    ],
    historicalEvidence: 'Archaeological evidence from Galilee and Judea shows organized carpenter communities with standardized tools and techniques. The Mishnah references craftsmen\'s associations with their own customs and regulations.',
    scholarlyNotes: [
      'Fiensy, David A. - "Jesus the Galilean" documents tekton guilds in 1st-century Palestine',
      'Burford, Alison - "Craftsmen in Greek and Roman Society" analyzes artisan associations',
      'Safrai & Stern - "The Jewish People in the First Century" documents Jewish trade guilds'
    ]
  },
  {
    id: 'tentmaker',
    name: 'Tentmakers Guild (Skēnopoioi)',
    greekTerm: 'σκηνοποιός (skēnopoios)',
    icon: Tent,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    biblicalFigures: ['Paul of Tarsus', 'Aquila', 'Priscilla'],
    scriptures: ['Acts 18:3 - "because he was a tentmaker as they were, Paul stayed and worked with them"', '1 Corinthians 4:12 - "we work hard with our own hands"'],
    practices: [
      {
        title: 'Leather Working & Weaving',
        description: 'Tentmakers worked with animal hides (especially goat hair from Cilicia, Paul\'s home region) and required mastery of cutting, stitching, and waterproofing techniques.'
      },
      {
        title: 'Workshop Communities',
        description: 'Craftsmen worked together in shared spaces, creating natural community and mutual accountability. Paul met Aquila and Priscilla through their shared trade.'
      },
      {
        title: 'Traveling Journeymen',
        description: 'Skilled tentmakers traveled between cities, using guild connections to find work and housing. Paul used this network throughout his missionary journeys.'
      },
      {
        title: 'Commercial Networks',
        description: 'Guild membership provided access to supply chains, customer referrals, and business partnerships across the Roman Empire—explaining how Paul financed his ministry.'
      },
      {
        title: 'Guild Meetings & Fellowship',
        description: 'Trade associations held regular meetings for business, mutual aid, and social fellowship—a pattern Paul may have adapted for house churches.'
      }
    ],
    historicalEvidence: 'Roman records document tentmaker collegia (trade associations) in major cities. Paul\'s ability to find work immediately upon arriving in new cities (Corinth, Ephesus) suggests guild networking.',
    scholarlyNotes: [
      'Hock, Ronald F. - "The Social Context of Paul\'s Ministry: Tentmaking and Apostleship"',
      'Meeks, Wayne A. - "The First Urban Christians" documents artisan networks',
      'Ascough, Richard S. - "Paul\'s Macedonian Associations" analyzes trade guild parallels'
    ]
  }
];

const generateOverviewTTS = () => {
  return `First-Century Trade Guilds: The Biblical Context for Fraternal Organization

In the 1st century AD, during the time of Jesus and the apostle Paul, trade guilds were a central feature of economic and social life. These organizations—called collegia in Latin—provided professional training, quality standards, mutual aid, and community identity for artisans and craftsmen.

Two trade guilds are explicitly connected to biblical figures: the Carpenter's Guild and the Tentmaker's Guild.

The Carpenter's Guild, or Tektons:
Jesus of Nazareth was identified in Mark 6:3 as "the carpenter"—in Greek, ho tekton. This wasn't just a job description; it indicated membership in an organized trade association. Jesus would have apprenticed under Joseph, learning trade secrets, quality standards, and guild customs. Archaeological evidence shows organized carpenter communities in Galilee with standardized tools and techniques. The Mishnah references craftsmen's associations with their own regulations.

The Tentmaker's Guild, or Skēnopoioi:
The apostle Paul was a tentmaker, as recorded in Acts 18:3. When he arrived in Corinth, he immediately found work with Aquila and Priscilla "because he was a tentmaker as they were." This wasn't coincidence—it was guild networking. Paul's ability to find employment in new cities throughout his missionary journeys demonstrates the power of trade association connections. Roman records document tentmaker collegia in major cities across the empire.

Both guilds practiced similar organizational elements to modern Greek-letter organizations:
- Apprenticeship and advancement through ranks
- Trade secrets and specialized knowledge
- Recognition practices for identifying members
- Quality standards and accountability
- Mutual aid and community support
- Regular meetings and fellowship

The key insight is this: Jesus and Paul were both members of organized fraternal trade associations that used oaths, symbols, hierarchy, and mutual aid—the same structural elements found in Greek-letter organizations today. The question is not whether such organizations are acceptable, but whether their practices direct members toward idolatry or serve legitimate professional and social purposes.`;
};

export function FirstCenturyGuildsSection({ className }: { className?: string }) {
  const [expandedGuild, setExpandedGuild] = useState<string | null>(null);

  const toggleGuild = (guildId: string) => {
    setExpandedGuild(prev => prev === guildId ? null : guildId);
  };

  return (
    <Card className={`border-sacred/30 overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-sacred/10 to-amber-500/10 pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-amber-600 flex items-center justify-center shadow-lg">
                <ScrollText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  1st-Century Trade Guilds
                  <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30 text-xs">
                    Jesus's Era
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Tektons (Carpenters) & Skēnopoioi (Tentmakers) in biblical context
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-sacred/30 hover:bg-sacred/10">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Scholarly Sources
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Academic Sources: 1st-Century Guilds</DialogTitle>
                  <DialogDescription>
                    Key scholarly works documenting trade associations during the apostolic era
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto">
                  {FIRST_CENTURY_GUILDS.map(guild => (
                    <div key={guild.id} className="space-y-2">
                      <h4 className={`font-semibold text-sm ${guild.color} flex items-center gap-2`}>
                        <guild.icon className="w-4 h-4" />
                        {guild.name}
                      </h4>
                      {guild.scholarlyNotes.map((note, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground pl-6 italic">
                          • {note}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* TTS Button */}
          <div className="flex items-center gap-2 pt-2 border-t border-sacred/20">
            <Volume2 className="w-4 h-4 text-sacred" />
            <span className="text-sm text-muted-foreground">Listen to overview:</span>
            <ListenButton
              text={generateOverviewTTS()}
              itemId="first-century-guilds-overview"
              title="1st-Century Trade Guilds"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Key Principle */}
        <div className="p-4 rounded-lg bg-sacred/10 border border-sacred/20">
          <p className="text-sm">
            <strong className="text-sacred">Key Insight:</strong> Jesus and Paul were both members of 
            organized <em>fraternal trade associations</em> that used apprenticeship, trade secrets, 
            recognition practices, and mutual aid—the same structural elements found in Greek-letter 
            organizations today.
          </p>
        </div>

        {/* Guild Cards */}
        {FIRST_CENTURY_GUILDS.map(guild => {
          const IconComponent = guild.icon;
          const isExpanded = expandedGuild === guild.id;

          return (
            <motion.div key={guild.id} layout>
              <Card className={`${guild.borderColor} border-2 overflow-hidden`}>
                <CardHeader 
                  className={`${guild.bgColor} pb-3 cursor-pointer`}
                  onClick={() => toggleGuild(guild.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-background/60 flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${guild.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                          {guild.name}
                          <Badge variant="outline" className={`${guild.bgColor} ${guild.color} ${guild.borderColor} text-xs`}>
                            {guild.greekTerm}
                          </Badge>
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {guild.biblicalFigures.map((figure, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              {figure}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="pt-4 space-y-4">
                        {/* Scripture References */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-sacred" />
                            Scripture References
                          </h4>
                          {guild.scriptures.map((scripture, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-sacred/5 border border-sacred/10">
                              <Quote className="w-4 h-4 text-sacred mt-0.5 flex-shrink-0" />
                              <p className="text-sm italic text-muted-foreground">{scripture}</p>
                            </div>
                          ))}
                        </div>

                        {/* Guild Practices */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Documented Guild Practices</h4>
                          {guild.practices.map((practice, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${guild.bgColor} border ${guild.borderColor}`}>
                              <p className={`font-medium text-sm ${guild.color}`}>{practice.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{practice.description}</p>
                            </div>
                          ))}
                        </div>

                        {/* Historical Evidence */}
                        <div className="p-3 rounded-lg bg-muted/50 border border-border">
                          <p className="font-medium text-sm text-foreground mb-1">Historical Evidence</p>
                          <p className="text-sm text-muted-foreground">{guild.historicalEvidence}</p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}

        {/* Bottom CTA */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-sacred/5 to-amber-500/5 border border-sacred/20 mt-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Bottom Line:</strong> The apostle Paul used his tentmaker 
            guild connections to finance his ministry and build networks across the Roman Empire. Jesus spent 
            the majority of His life as a member of the carpenter's guild. Fraternal trade associations with 
            oaths, symbols, hierarchy, and mutual aid are <em>part of the biblical story</em>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
