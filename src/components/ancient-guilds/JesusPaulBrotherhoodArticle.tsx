import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Hammer, Scroll, Heart, ChevronDown, ChevronUp, Volume2, GraduationCap, Scale } from 'lucide-react';
import { ListenButton } from '@/components/ListenButton';
import { motion, AnimatePresence } from 'framer-motion';

const articleSections = [
  {
    id: 'introduction',
    title: 'The Brotherhood Question',
    icon: Users,
    color: 'sacred',
    content: `One of the most persistent questions in Christian conversations about fraternities and brotherhood organizations is this: Would Jesus have opposed them? To answer honestly, we must step out of modern assumptions and into the world Jesus and Paul actually lived in.

The first century was not an individualistic society. It was communal, structured, and deeply shaped by guilds, apprenticeships, and brotherhoods of shared labor. When Scripture is read alongside historical context, a more nuanced and faithful picture emerges.`
  },
  {
    id: 'jesus-carpenter',
    title: 'Jesus the Carpenter and the World of Guilds',
    icon: Hammer,
    color: 'amber',
    content: `The Gospels identify Jesus of Nazareth as a tekton, commonly translated as carpenter but more accurately understood as a skilled craftsman or builder. This was not casual labor. It implied formal training, apprenticeship, discipline, and accountability.

In the ancient Mediterranean world, trades were typically organized through guild-like structures. These associations regulated training, protected reputation, and ensured quality. Apprentices lived and worked under authority for years before being recognized as masters. Silence, submission, testing, and communal living were part of the process.

None of this contradicts the character of Jesus. In fact, Luke tells us that Jesus "grew in wisdom and stature, and in favor with God and man" (Luke 2:52). Growth implies formation, discipline, and process.`,
    scripture: 'Luke 2:52'
  },
  {
    id: 'paul-tentmaker',
    title: 'Paul the Tentmaker and Associational Life',
    icon: Users,
    color: 'blue',
    content: `The book of Acts introduces Paul the Apostle as a tentmaker (Acts 18:3). Like carpentry, tentmaking was a skilled trade commonly associated with guilds in Greco-Roman cities. These guilds were not inherently religious. They were economic and social associations that provided identity, protection, and mutual support.

Paul did not reject association. He rejected idolatry. His critiques in 1 Corinthians and Colossians were directed at the worship of false gods, not the existence of structured communities, symbols, or oaths of integrity. In fact, Paul repeatedly used guild language, such as "body," "members," and "building," to describe the Church itself (1 Corinthians 12; Ephesians 2:19–22).`,
    scripture: 'Acts 18:3; 1 Corinthians 12; Ephesians 2:19-22'
  },
  {
    id: 'fraternity-meaning',
    title: 'What the Word "Fraternity" Actually Means',
    icon: BookOpen,
    color: 'green',
    content: `Much of the discomfort around fraternities begins with misunderstanding the word itself. The term fraternity is not rooted in pagan worship or secret religion. It is rooted in brotherhood.

The English word fraternity comes from the Latin fraternitas, derived from frater, meaning brother. Long before modern Greek letter organizations existed, fraternitas was used in Roman and early Christian contexts to describe bonds of mutual responsibility, shared identity, and communal obligation.

Even earlier, the concept of brotherhood is deeply embedded in Greek thought and language. While Greek fraternities as we know them today did not exist in the first century, the idea of adelphos (brother) was foundational to social and religious life. The New Testament repeatedly uses adelphoi to describe believers bound together not by blood, but by shared commitment and covenant. Paul addresses churches as "brothers" throughout his letters.

This matters because when later European universities adopted the Latin term fraternity, they were not inventing a new concept. They were borrowing an ancient one. A fraternity, by definition, is simply a structured brotherhood.

Jesus and Paul would have understood this instinctively. As a trained craftsman, Jesus lived within systems of apprenticeship and communal identity where older masters guided younger brothers in the craft. As a tentmaker, Paul worked in associational environments where loyalty, shared language, ethical commitments, and mutual accountability were expected.

None of this was worship. It was formation.`
  },
  {
    id: 'rituals-symbols',
    title: 'Rituals, Oaths, and Symbols Are Not Automatically Worship',
    icon: Scroll,
    color: 'purple',
    content: `A common objection raised against fraternities is the presence of rituals, symbols, oaths, or secret signs. Yet these elements existed across cultures long before Greek letter organizations.

Ancient guilds used ceremonies to mark advancement, symbols tied to their craft, and pledges related to ethical practice. These were instructional and communal, not acts of worship. Pagan cults, by contrast, centered their rituals on devotion to a deity, seeking favor, protection, or salvation.

Scripture consistently draws this distinction. Paul writes, "An idol has no real existence" (1 Corinthians 8:4), and later adds, "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean" (Romans 14:14). The moral issue is not the object or symbol, but the heart and belief behind it.`,
    scripture: '1 Corinthians 8:4; Romans 14:14'
  },
  {
    id: 'conscience-liberty',
    title: 'Belief, Conscience, and Christian Liberty',
    icon: Heart,
    color: 'pink',
    content: `Romans 14 provides one of the clearest frameworks for understanding this issue. Paul teaches that believers may hold different convictions on disputable matters, and that each person must be "fully convinced in his own mind" (Romans 14:5). Acting against conscience is sin. Acting with a clear conscience, in faith, is not.

This principle explains why Scripture never issues a blanket condemnation of associations, guilds, or brotherhoods. Instead, it warns against idolatry, coercion of conscience, and misplaced devotion.`,
    scripture: 'Romans 14:5'
  },
  {
    id: 'brotherhood-formation',
    title: 'Brotherhood, Formation, and the Way of Christ',
    icon: Users,
    color: 'sacred',
    content: `Jesus did not reject disciplined brotherhood. He formed one. He called twelve men to live together, learn together, submit to instruction, and undergo testing. They shared meals, private teachings, symbolic actions, and even periods of misunderstanding and correction.

The difference was not structure. The difference was lordship.`
  },
  {
    id: 'modern-fraternities',
    title: 'What This Means for Modern Fraternities',
    icon: GraduationCap,
    color: 'amber',
    content: `Modern fraternities, including Black Greek Letter Organizations, are voluntary, non-religious associations centered on leadership, service, and community. They do not promise salvation, spiritual power, or divine favor. When stripped of assumptions and examined honestly, they bear greater resemblance to ancient guilds than to pagan cults.

The biblical question, then, is not "Is there ritual or structure?" but "Who is being worshiped?"

Scripture condemns idolatry. It does not condemn brotherhood.`
  }
];

const scholarlyReferences = [
  { author: 'Meeks, Wayne A.', title: 'The First Urban Christians', publication: 'Yale University Press' },
  { author: 'Deissmann, Adolf', title: 'Light from the Ancient East', publication: 'Baker Academic' },
  { author: 'Banks, Robert', title: "Paul's Idea of Community", publication: 'Hendrickson' }
];

const scriptureReferences = ['Acts 18:3', 'Luke 2:52', 'Romans 14', '1 Corinthians 8', 'Ephesians 2'];

const ttsText = `Jesus, Paul, and the Brotherhood Question: What Ancient Guilds and Fraternities Really Mean.

One of the most persistent questions in Christian conversations about fraternities and brotherhood organizations is this: Would Jesus have opposed them? To answer honestly, we must step out of modern assumptions and into the world Jesus and Paul actually lived in.

The first century was not an individualistic society. It was communal, structured, and deeply shaped by guilds, apprenticeships, and brotherhoods of shared labor. When Scripture is read alongside historical context, a more nuanced and faithful picture emerges.

Jesus the Carpenter and the World of Guilds:

The Gospels identify Jesus of Nazareth as a tekton, commonly translated as carpenter but more accurately understood as a skilled craftsman or builder. This was not casual labor. It implied formal training, apprenticeship, discipline, and accountability.

In the ancient Mediterranean world, trades were typically organized through guild-like structures. These associations regulated training, protected reputation, and ensured quality. Apprentices lived and worked under authority for years before being recognized as masters.

Luke tells us that Jesus "grew in wisdom and stature, and in favor with God and man." Growth implies formation, discipline, and process.

Paul the Tentmaker and Associational Life:

The book of Acts introduces Paul the Apostle as a tentmaker. Like carpentry, tentmaking was a skilled trade commonly associated with guilds in Greco-Roman cities. These guilds were not inherently religious. They were economic and social associations that provided identity, protection, and mutual support.

Paul did not reject association. He rejected idolatry. His critiques were directed at the worship of false gods, not the existence of structured communities, symbols, or oaths of integrity. In fact, Paul repeatedly used guild language, such as "body," "members," and "building," to describe the Church itself.

What the Word Fraternity Actually Means:

The term fraternity is not rooted in pagan worship or secret religion. It is rooted in brotherhood. The English word fraternity comes from the Latin fraternitas, derived from frater, meaning brother.

The New Testament repeatedly uses adelphoi to describe believers bound together not by blood, but by shared commitment and covenant. A fraternity, by definition, is simply a structured brotherhood.

Rituals, Oaths, and Symbols Are Not Automatically Worship:

Ancient guilds used ceremonies to mark advancement, symbols tied to their craft, and pledges related to ethical practice. These were instructional and communal, not acts of worship.

Paul writes, "An idol has no real existence," and later adds, "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean." The moral issue is not the object or symbol, but the heart and belief behind it.

Christian Liberty:

Romans 14 provides one of the clearest frameworks for understanding this issue. Paul teaches that believers may hold different convictions on disputable matters, and that each person must be fully convinced in their own mind.

This principle explains why Scripture never issues a blanket condemnation of associations, guilds, or brotherhoods.

Conclusion:

Jesus did not reject disciplined brotherhood. He formed one. He called twelve men to live together, learn together, submit to instruction, and undergo testing.

Modern fraternities are voluntary, non-religious associations centered on leadership, service, and community. They do not promise salvation, spiritual power, or divine favor.

The biblical question is not "Is there ritual or structure?" but "Who is being worshiped?"

Scripture condemns idolatry. It does not condemn brotherhood.`;

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  sacred: {
    bg: 'bg-sacred/10',
    border: 'border-sacred/30',
    text: 'text-sacred',
    icon: 'from-sacred to-blue-600'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: 'from-amber-500 to-orange-600'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'from-blue-500 to-indigo-600'
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-700 dark:text-green-400',
    icon: 'from-green-500 to-emerald-600'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-700 dark:text-purple-400',
    icon: 'from-purple-500 to-violet-600'
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-700 dark:text-pink-400',
    icon: 'from-pink-500 to-rose-600'
  }
};

export function JesusPaulBrotherhoodArticle({ className, defaultOpen = false }: { className?: string; defaultOpen?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <Card className={`border-sacred/30 overflow-hidden ${className}`}>
      <CardHeader 
        className="bg-gradient-to-r from-sacred/10 to-amber-500/10 pb-4 cursor-pointer hover:bg-sacred/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-amber-600 flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Jesus, Paul, and the Brotherhood Question
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  What Ancient Guilds and Fraternities Really Mean
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30">
              Featured Article
            </Badge>
          </div>

          {/* TTS Button - always visible */}
          <div className="flex items-center gap-2 pt-2 border-t border-sacred/20" onClick={(e) => e.stopPropagation()}>
            <Volume2 className="w-4 h-4 text-sacred" />
            <span className="text-sm text-muted-foreground">Listen to article:</span>
            <ListenButton
              text={ttsText}
              itemId="jesus-paul-brotherhood-article"
              title="Brotherhood Article"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CardContent className="p-6 space-y-6">
              {/* Article Sections */}
              {articleSections.map((section, idx) => {
                const IconComponent = section.icon;
                const colors = colorClasses[section.color];
                
                return (
                  <div key={section.id} className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center text-white flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${colors.text}`}>{section.title}</h3>
                        {section.scripture && (
                          <p className="text-xs text-muted-foreground italic mt-1">
                            {section.scripture}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                );
              })}

              {/* Scholarly References */}
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-foreground" />
                  <h4 className="font-semibold text-foreground">Scholarly & Historical References</h4>
                </div>
                <div className="space-y-2">
                  {scholarlyReferences.map((ref, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{ref.author}</span> — <em>{ref.title}</em>. {ref.publication}.
                    </p>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Scripture References:</strong> {scriptureReferences.join('; ')}
                  </p>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="p-4 bg-gradient-to-r from-sacred/10 to-amber-500/10 rounded-lg border border-sacred/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Key Takeaway:</strong> The biblical question is not "Is there ritual or structure?" but "Who is being worshiped?" Scripture condemns idolatry. It does not condemn brotherhood.
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}