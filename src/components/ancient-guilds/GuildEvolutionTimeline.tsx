import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Hammer, Building2, GraduationCap, Users, ArrowRight, Volume2 } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';

interface TimelineEra {
  period: string;
  title: string;
  years: string;
  description: string;
  keyFeatures: string[];
  icon: React.ReactNode;
  color: string;
}

const timelineData: TimelineEra[] = [
  {
    period: '1st Century AD',
    title: 'Biblical Trade Guilds',
    years: '~30-100 AD',
    description: 'Trade associations of carpenters (tektons), tentmakers, and craftsmen in the Roman Empire. Jesus and Paul practiced these trades within guild structures.',
    keyFeatures: [
      'Apprenticeship under masters',
      'Trade secrets and specialized knowledge',
      'Recognition rituals (right hand of fellowship)',
      'Mutual aid among members',
      'Quality standards and ethics'
    ],
    icon: <Hammer className="w-5 h-5" />,
    color: 'green'
  },
  {
    period: 'Medieval Era',
    title: 'Craft Guilds',
    years: '~1100-1500 AD',
    description: 'Formalized trade guilds in European cities with structured hierarchies, initiation ceremonies, and protective regulations.',
    keyFeatures: [
      'Apprentice → Journeyman → Master progression',
      'Initiation rituals and oaths',
      'Secret signs for mutual recognition',
      'Guildhalls for meetings',
      'Charitable works and member welfare'
    ],
    icon: <Building2 className="w-5 h-5" />,
    color: 'amber'
  },
  {
    period: 'Enlightenment Era',
    title: 'Fraternal Lodges',
    years: '~1700-1850 AD',
    description: 'Philosophical societies and fraternal orders emerged, adapting guild structures for intellectual and social purposes.',
    keyFeatures: [
      'Symbolic use of craft tools',
      'Ritualized initiation ceremonies',
      'Grips, passwords, and signs',
      'Degrees of membership',
      'Charitable and educational missions'
    ],
    icon: <Users className="w-5 h-5" />,
    color: 'blue'
  },
  {
    period: 'Modern Era',
    title: 'Greek-Letter Organizations',
    years: '~1776-Present',
    description: 'College fraternities and sororities adapted fraternal lodge structures for academic and social contexts, beginning with Phi Beta Kappa.',
    keyFeatures: [
      'Pledging/new member education',
      'Initiation rituals and ceremonies',
      'Grips, calls, and recognition signs',
      'Chapter structure with officers',
      'Service, scholarship, and brotherhood/sisterhood'
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'purple'
  }
];

const ttsText = `Guild Evolution Timeline: From Trade Guilds to Fraternities.

This timeline traces the structural evolution from ancient trade guilds to modern Greek-letter organizations.

First Century AD: Biblical Trade Guilds (approximately 30 to 100 AD).
Trade associations of carpenters, tentmakers, and craftsmen flourished in the Roman Empire. Jesus worked as a tekton (carpenter) and Paul as a tentmaker within these guild structures. Key features included apprenticeship under masters, trade secrets, recognition rituals like the right hand of fellowship, mutual aid, and quality standards.

Medieval Era: Craft Guilds (approximately 1100 to 1500 AD).
Formalized trade guilds emerged in European cities with structured hierarchies. The Apprentice to Journeyman to Master progression became standard. These guilds featured initiation rituals and oaths, secret signs for recognition, guildhalls for meetings, and charitable works.

Enlightenment Era: Fraternal Lodges (approximately 1700 to 1850 AD).
Philosophical societies adapted guild structures for intellectual and social purposes. They used symbolic craft tools, ritualized initiation ceremonies, grips and passwords, degrees of membership, and focused on charitable and educational missions.

Modern Era: Greek-Letter Organizations (1776 to Present).
College fraternities and sororities adapted fraternal lodge structures for academic contexts, beginning with Phi Beta Kappa in 1776. They feature pledging and new member education, initiation rituals, recognition signs, chapter structures, and focus on service, scholarship, and brotherhood or sisterhood.

The key insight is that the structural DNA of modern Greek organizations—apprenticeship, initiation, recognition practices, mutual aid—traces directly back to 1st-century trade guilds where Jesus and Paul practiced their crafts.`;

const colorClasses = {
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
    icon: 'from-green-500 to-emerald-600'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
    icon: 'from-amber-500 to-orange-600'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
    icon: 'from-blue-500 to-indigo-600'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-700 dark:text-purple-400',
    dot: 'bg-purple-500',
    icon: 'from-purple-500 to-violet-600'
  }
};

export function GuildEvolutionTimeline({ className }: { className?: string }) {
  return (
    <Card className={`border-sacred/30 overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-sacred/10 to-purple-500/10 pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-purple-600 flex items-center justify-center shadow-lg">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Guild Evolution Timeline
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  From 1st-century trade guilds to modern Greek organizations
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30">
              Historical Continuity
            </Badge>
          </div>

          {/* TTS Button */}
          <div className="flex items-center gap-2 pt-2 border-t border-sacred/20">
            <Volume2 className="w-4 h-4 text-sacred" />
            <span className="text-sm text-muted-foreground">Listen to timeline:</span>
            <ListenButton
              text={ttsText}
              itemId="guild-evolution-timeline"
              title="Guild Evolution"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-amber-500 via-blue-500 to-purple-500 hidden md:block" />

          <div className="space-y-6">
            {timelineData.map((era, idx) => {
              const colors = colorClasses[era.color as keyof typeof colorClasses];
              
              return (
                <div key={idx} className="relative">
                  {/* Connection arrow for non-first items */}
                  {idx > 0 && (
                    <div className="hidden md:flex absolute -top-3 left-5 text-muted-foreground">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center z-10 bg-background`}>
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center text-white`}>
                          {era.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 md:hidden mb-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center text-white`}>
                              {era.icon}
                            </div>
                          </div>
                          <Badge variant="outline" className={`${colors.text} ${colors.border} mb-2`}>
                            {era.period}
                          </Badge>
                          <h4 className="font-semibold text-foreground">{era.title}</h4>
                          <p className="text-xs text-muted-foreground">{era.years}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {era.description}
                      </p>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-foreground">Key Features:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {era.keyFeatures.map((feature, fIdx) => (
                            <li key={fIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-6 p-4 bg-gradient-to-r from-sacred/10 to-purple-500/10 rounded-lg border border-sacred/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Key Insight:</strong> The structural DNA of modern Greek organizations—apprenticeship, 
            initiation, recognition practices, mutual aid—traces directly back to 1st-century trade guilds where 
            Jesus and Paul practiced their crafts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
