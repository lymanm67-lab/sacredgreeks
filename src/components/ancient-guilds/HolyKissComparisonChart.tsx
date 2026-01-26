import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hand, MessageSquare, BookOpen, ArrowRight, Check, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';

interface ComparisonItem {
  element: string;
  earlyChristian: string;
  greekOrg: string;
  scripture?: string;
}

const comparisonData: ComparisonItem[] = [
  {
    element: 'Physical Gesture',
    earlyChristian: 'Holy Kiss (philēma hagion) – formal liturgical greeting exchanged during worship',
    greekOrg: 'Organizational grip/handshake – formal recognition gesture during meetings and events',
    scripture: 'Romans 16:16; 1 Corinthians 16:20'
  },
  {
    element: 'Tickle Palm Grip',
    earlyChristian: 'Ichthys Trace – during a handshake, one Christian would trace a curved line (half of the fish symbol) in the other\'s palm. If they completed the fish, they were confirmed as a believer.',
    greekOrg: 'Distinctive grips with subtle pressure points, finger positions, or movements that only initiated members recognize.',
    scripture: 'Galatians 2:9 (Right hand of fellowship)'
  },
  {
    element: 'Verbal Component',
    earlyChristian: '"Maranatha" (Aramaic: "Our Lord, come!") – whispered password known only to believers',
    greekOrg: 'Call-and-response phrases, passwords, or verbal recognitions known to members',
    scripture: '1 Corinthians 16:22; Didache 10:6'
  },
  {
    element: 'Purpose',
    earlyChristian: 'Identify genuine believers during persecution; authenticate community membership',
    greekOrg: 'Identify genuine members; authenticate organizational affiliation; foster belonging'
  },
  {
    element: 'Context',
    earlyChristian: 'Gathered worship assemblies; before the Lord\'s Supper; greeting fellow travelers; catacombs',
    greekOrg: 'Chapter meetings; formal events; encountering unknown members; conventions'
  },
  {
    element: 'Secrecy Rationale',
    earlyChristian: 'Protection from Roman persecution; outsiders wouldn\'t know the Aramaic password or recognize the ichthys trace',
    greekOrg: 'Organizational identity protection; meaningful traditions preserved for initiated members'
  },
  {
    element: 'Historical Period',
    earlyChristian: '1st-3rd century AD (documented by Paul, Justin Martyr, Didache, Church Fathers)',
    greekOrg: '19th century AD - present (modeled on fraternal lodge practices)'
  }
];

const ttsText = `Holy Kiss, Maranatha, and Tickle Palm Grip Comparison Chart.

This chart compares early Christian recognition practices with modern Greek organization traditions.

The early church used multiple covert recognition methods during Roman persecution:

First, the Holy Kiss combined with Maranatha. The holy kiss was a formal liturgical greeting, and believers would whisper the Aramaic password "Maranatha," meaning "Our Lord, come." This combination of physical gesture plus verbal password served to identify genuine believers.

Second, the Tickle Palm Grip, also called the Ichthys Trace. During a handshake, one Christian would trace a curved line—half of the fish symbol—in the other person's palm. If the stranger was a fellow Christian, they would complete the fish shape, confirming their shared faith without verbal disclosure that could endanger both parties. This grip determined who could be trusted with the location of hidden gatherings, sacred texts, and the identities of church leaders.

These structures directly parallel Greek organization practices: formal grips combined with verbal passwords or call-and-response phrases.

Key comparison points:

Physical Gesture: Early Christians used the Holy Kiss as a formal liturgical greeting. Greek organizations use organizational grips as formal recognition gestures.

Tickle Palm Grip: Early Christians traced the ichthys fish symbol in each other's palms. Greek organizations use distinctive grips with subtle pressure points or movements.

Verbal Component: Early Christians whispered "Maranatha" as a password. Greek organizations use passwords or call-and-response phrases.

Purpose: Both systems identify genuine members and authenticate community belonging.

Secrecy Rationale: Early Christians kept their practices secret for protection from Roman persecution. Greek organizations maintain privacy to protect organizational identity.

The key insight: The structure of recognition practices—physical gesture combined with verbal password—was established in the earliest Christian communities. When Greek organizations use similar structures, they employ a pattern with biblical precedent.

Scripture references: Romans 16:16, 1 Corinthians 16:20, 2 Corinthians 13:12, 1 Thessalonians 5:26, 1 Peter 5:14, 1 Corinthians 16:22, Galatians 2:9, and the Didache 10:6.`;

export function HolyKissComparisonChart({ className, defaultOpen = false }: { className?: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={`border-green-500/30 overflow-hidden ${className}`}>
      <CardHeader 
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 pb-4 cursor-pointer hover:bg-green-500/15 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Hand className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Holy Kiss + Maranatha Comparison
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Early Christian recognition practices vs. Greek organization traditions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30">
                Biblical Precedent
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* TTS Button - always visible */}
          <div className="flex items-center gap-2 pt-2 border-t border-green-500/20" onClick={(e) => e.stopPropagation()}>
            <Volume2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Listen to comparison:</span>
            <ListenButton
              text={ttsText}
              itemId="holy-kiss-comparison-chart"
              title="Holy Kiss Comparison"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-0">
          {/* Key Insight Banner */}
          <div className="p-4 bg-sacred/10 border-b border-sacred/20">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-sacred mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-sacred">Key Insight</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The <strong>structure</strong> of recognition practices—physical gesture + verbal password—was 
                  established in the <em>earliest Christian communities</em>. When Greek organizations use 
                  similar structures, they employ a pattern with biblical precedent.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-[20%]">
                    Element
                  </th>
                  <th className="p-3 text-left text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide w-[40%]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Early Christian Practice
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide w-[40%]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      Greek Organization Practice
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-medium text-sm text-foreground align-top">
                      {row.element}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground align-top">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          {row.earlyChristian}
                          {row.scripture && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 italic">
                              {row.scripture}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground align-top">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{row.greekOrg}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scripture References Footer */}
          <div className="p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-t">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <strong className="text-foreground">Scripture Commands for Holy Kiss:</strong>{' '}
                Romans 16:16, 1 Corinthians 16:20, 2 Corinthians 13:12, 1 Thessalonians 5:26, 1 Peter 5:14.{' '}
                <strong className="text-foreground">Maranatha preserved in:</strong>{' '}
                1 Corinthians 16:22, Didache 10:6.
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}