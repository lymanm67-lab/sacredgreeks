import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Play, Clock, Lightbulb, CheckCircle2, BookOpen, FileDown, Users, Printer, Download } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/use-subscription';
import { ListenButton } from '@/components/ListenButton';
import { FaithAuthoritySection } from '@/components/proof/FaithAuthoritySection';
import { BeliefTeachingAudio } from '@/components/proof/BeliefTeachingAudio';
import { ProofFrameworkAudio } from '@/components/proof/ProofFrameworkAudio';
import { GuildJourneyDiagram, GuildAudioPlayer, HolyKissComparisonChart, FirstCenturyGuildsSection } from '@/components/ancient-guilds';
import { GuildPracticesSection } from '@/components/ancient-guilds/GuildPracticesSection';
import { generateGuildOnePagerPDF } from '@/lib/guild-onepager-pdf';
import { generateGuildComparisonPDF } from '@/lib/guild-comparison-pdf';
import { generateJesusMasterCarpenterPDF } from '@/lib/jesus-master-carpenter-pdf';
import { generateProofLessonPDF, generateAllProofLessonsPDF } from '@/lib/proof-lesson-pdf';
import { generateEconomicHistoryPDF } from '@/lib/economic-history-pdf';
import { generateGuildWorksheetPDF } from '@/lib/guild-worksheet-pdf';
import { generateLessonWorksheetPDF, generateAllWorksheetsPDF } from '@/lib/proof-worksheet-pdf';
import { Link } from 'react-router-dom';

interface Lesson {
  id: number;
  letter: string;
  title: string;
  description: string;
  duration: string;
  takeaways: number;
  isLocked: boolean;
  content?: string;
}

// Color mapping for each PROOF letter
const PROOF_COLORS = {
  P: { bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', gradient: 'from-blue-500 to-blue-600' },
  R: { bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', gradient: 'from-purple-500 to-purple-600' },
  O1: { bg: 'bg-orange-500', bgLight: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', gradient: 'from-orange-500 to-orange-600' },
  O2: { bg: 'bg-green-500', bgLight: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', gradient: 'from-green-500 to-green-600' },
  F: { bg: 'bg-red-500', bgLight: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', gradient: 'from-red-500 to-red-600' },
};

const getColorForLesson = (id: number) => {
  switch(id) {
    case 1: return PROOF_COLORS.P;
    case 2: return PROOF_COLORS.R;
    case 3: return PROOF_COLORS.O1;
    case 4: return PROOF_COLORS.O2;
    case 5: return PROOF_COLORS.F;
    default: return PROOF_COLORS.P;
  }
};

const lessons: Lesson[] = [
  {
    id: 1,
    letter: 'P',
    title: 'Pledge Process: Responding to Hazing Accusations',
    description: 'Biblical guidance on navigating intake with integrity',
    duration: '12 min',
    takeaways: 5,
    isLocked: false,
    content: `**The Criticism:** "Greek organizations promote hazing. Christians shouldn't participate in abusive intake processes."

This is one of the most common accusations against Greek life. Critics point to news stories of hazing deaths and argue that Christians have no business joining organizations with such practices. How do we respond biblically?

**Acknowledging the Truth:**

First, we must be honest: hazing is real, harmful, and unbiblical. Scripture is clear:
- "Do to others as you would have them do to you" (Luke 6:31)
- "Do nothing out of selfish ambition... but in humility value others above yourselves" (Philippians 2:3)

Any practice that degrades, humiliates, or harms another person violates God's command to love our neighbor.

**The Biblical Response:**

• **Count the Cost (Luke 14:28-30)** - Before joining, research the organization's actual intake practices, not just their written policies.

• **Set Non-Negotiable Boundaries** - Determine in advance what you will and won't do:
   - I will not participate in activities that demean or harm others
   - I will not cover up abuse to "protect" the organization
   - I will speak up when I witness wrongdoing

• **Be a Reformer, Not a Participant** - Christians in Greek life should actively work to eliminate hazing:
   - Report violations to nationals and university officials
   - Mentor new members with Christ-like servant leadership
   - Model intake processes that build up rather than tear down

• **Guard Your Heart (Proverbs 4:23)** - If your intake experience requires compromising your faith, that's a red flag about the organization's culture.

**Practical Application:**

If you're considering membership, ask current members (privately) about actual intake practices. If you're already a member, commit to being part of the solution by refusing to perpetuate harmful traditions.

**Sample Response to Critics:**

"You're right that hazing is sinful, and I oppose it completely. That's exactly why Christians should be in these organizations—to reform them from within. I set firm boundaries during my intake, and I'm committed to ensuring future members have a dignified experience that reflects Christ's love."

**Reflection Questions:**
• What specific boundaries will I maintain during any intake process?
• Am I willing to walk away if those boundaries are violated?
• How can I actively work to eliminate hazing in my organization?`
  },
  {
    id: 2,
    letter: 'R',
    title: 'Rituals: Addressing "Demonic Portal" Accusations',
    description: 'Discerning ceremonial practices through Scripture',
    duration: '12 min',
    takeaways: 5,
    isLocked: true,
    content: `**The Criticism:** "Greek rituals are demonic portals. You're opening yourself to spiritual attack by participating in pagan ceremonies."

This accusation suggests that Greek rituals inherently invite demonic influence. Some critics claim that candles, robes, and ceremonial elements are occult practices. How do we respond biblically?

**Understanding Ritual in Context:**

First, recognize that ritual itself is not evil. Scripture contains many God-ordained rituals:
- Communion and baptism (Christian ordinances)
- Passover and temple ceremonies (Old Testament worship)
- Anointing with oil for healing (James 5:14)

The question isn't whether rituals are wrong, but rather: What is being invoked, affirmed, or worshipped?

**Biblical Discernment Framework:**

• **What is the ritual's origin and purpose?**
   - Some Greek rituals have benign origins (literary societies, civic traditions)
   - Others may have borrowed from mystery religions or Freemasonry
   - Research your organization's specific history

• **What am I being asked to invoke or affirm?**
   - Prayers to "the Supreme Being" or unnamed forces are concerning
   - Affirmations of organizational loyalty are different from worship
   - Be specific about what's actually happening vs. what critics assume

• **Does participation constitute worship?**
   - Worship involves heart devotion, not just physical actions
   - Many rituals are symbolic traditions, not religious ceremonies
   - Apply Paul's principle from 1 Corinthians 8 about meat sacrificed to idols

**Key Biblical Principles:**

• **No Other Gods (Exodus 20:3)** - Never invoke, honor, or worship any deity besides the God of the Bible.

• **Greater is He (1 John 4:4)** - Christians cannot be "possessed" by demons through rituals. We're sealed by the Holy Spirit.

• **Test the Spirits (1 John 4:1)** - Develop discernment rather than fear-based assumptions.

• **Freedom with Wisdom (1 Corinthians 10:23-33)** - Some rituals are permissible but not beneficial.

**Red Flags vs. Yellow Flags:**

**Red Flags (Exit Immediately):**
- Explicit invocation of spirits, ancestors, or deities
- Blood rituals or occult symbolism
- Practices that mock Christ or Christianity

**Yellow Flags (Proceed with Discernment):**
- Candles and robes (common in many settings, including churches)
- Greek letters and symbols (cultural, not inherently spiritual)
- Oaths of confidentiality (evaluate content, not just secrecy)

**Sample Response to Critics:**

"I understand your concern, but I've carefully examined my organization's rituals. They don't invoke demons or worship false gods—they're ceremonial traditions similar to graduation ceremonies or fraternal lodge practices. The candles represent enlightenment through education, not occult practices. I participate with a clear conscience, asking 'Can I do this for God's glory?' If the answer were no, I wouldn't participate."

**🔥 Core Principle: The Power of Belief**

This is perhaps the most important teaching to understand: Rituals, symbols, and ceremonies only hold spiritual power when the participant believes in their authority. An unrecognized deity or unbelieved ritual cannot affect you spiritually.

Scripture is clear: "We know that 'an idol is nothing at all in the world' and that 'there is no God but one'" (1 Corinthians 8:4). If you do not believe Greek letters invoke Greek gods, and you do not intend to worship them, then spiritually speaking—nothing happens. The ritual has no power over you because you have not given it power through belief.

Just as Jesus' power was limited in Nazareth because of their unbelief (Mark 6:5-6), so too spiritual forces—real or imagined—require faith to operate. Fear itself is a form of belief. When you fear that a ritual might harm you spiritually, you are granting it authority through your belief in its power.

This doesn't mean all rituals are permissible—some clearly violate Scripture. But it does mean that symbolic ceremonies rooted in academic or civic tradition, when approached with a clear conscience and without belief in false spiritual power, cannot open "demonic portals" or curse you. Your faith is in Christ alone, and His authority supersedes all else.

**Reflection Questions:**
• Have I personally examined my organization's rituals, or am I relying on assumptions?
• Can I articulate what each ritual element represents?
• Is there anything in my organization's ceremonies I cannot do in good conscience?
• Am I giving power to rituals through my fear rather than standing in Christ's authority?
• Can I explain the "power of belief" principle to someone who is afraid of rituals?`
  },
  {
    id: 3,
    letter: 'O',
    title: 'Oaths: Answering Greek Deity Allegiance Claims',
    description: 'Understanding vows in light of Scripture',
    duration: '12 min',
    takeaways: 5,
    isLocked: true,
    content: `**The Criticism:** "Greek organizations require you to swear allegiance to Greek gods like Apollo, Athena, or Zeus. You're committing idolatry."

This accusation claims that Greek letters and symbolism constitute worship of pagan deities. Critics argue that any reference to Greek mythology is inherently idolatrous. How do we respond biblically?

**Understanding Greek Symbolism:**

Most Black Greek Letter Organizations (BGLOs) chose Greek letters and symbols for academic prestige, not religious worship:
- Greek was the language of scholarship, philosophy, and the New Testament
- Early American universities emphasized classical education
- Greek letters represented intellectual ideals, not deity worship

**What Scripture Says About Oaths:**

Jesus addressed oaths in Matthew 5:33-37, calling for honest speech rather than prohibiting all vows. Consider:
- Marriage vows are oaths that honor God
- Military oaths of service are taken by Christians
- Courtroom oaths are expected in legal proceedings

The issue is content, not the concept of oath-taking.

**Key Questions for Evaluating Oaths:**

• **Am I swearing to worship a false god?**
   - References to "Greek ideals" differ from invocations of Greek deities
   - Most organizational oaths focus on brotherhood, scholarship, and service
   - Read your actual oath carefully—what does it specifically say?

• **Does this oath place anything above God?**
   - "I will be loyal to my organization" differs from "My organization comes before God"
   - Evaluate the hierarchy of commitments

• **Am I promising anything I cannot biblically do?**
   - Unconditional obedience to human authorities is dangerous
   - Promises to conceal criminal activity are wrong
   - Commitments to lifelong service may conflict with divine calling

• **Can I keep this oath with integrity?**
   - Don't take vows you don't intend to keep
   - "Let your yes be yes and your no be no" (James 5:12)

**Biblical Framework for Greek Symbolism:**

Paul addressed similar concerns in 1 Corinthians 8-10 regarding meat sacrificed to idols:
- "We know that an idol is nothing at all in the world" (8:4)
- "But not everyone possesses this knowledge" (8:7)
- Consider your own conscience AND the impact on others

The Greek letters on your paraphernalia are not prayers to Zeus. They're organizational identifiers, similar to company logos or university abbreviations.

**Sample Response to Critics:**

"I appreciate your concern for my spiritual integrity. However, wearing Greek letters isn't worshipping Greek gods any more than driving a Mercury car worships the Roman deity. My organization's oath commits me to scholarship, service, and brotherhood—values that align with my faith. I've examined the specific words of my oath, and there's no invocation of pagan deities or pledge of worship to anyone but God."

**Cautions:**

Some organizations may have problematic elements:
- If your oath explicitly invokes Greek deities, that's concerning
- If you're required to bow to symbols or treat them as sacred, evaluate carefully
- Always prioritize your commitment to Christ

**Reflection Questions:**
• Have I actually read my organization's oath, or am I relying on hearsay?
• Can I articulate what my oath commits me to?
• Is there any conflict between my organizational vows and my baptismal vows to Christ?
• Would I be comfortable reciting my oath in front of my pastor?
• Does my oath require unconditional loyalty that could conflict with following God?`
  },
  {
    id: 4,
    letter: 'O',
    title: 'Obscurity: Countering "Secret Society" Fears',
    description: 'Walking in the light while honoring confidentiality',
    duration: '12 min',
    takeaways: 5,
    isLocked: true,
    content: `**The Criticism:** "Greek organizations are secret societies. Christians should have nothing to do with hidden darkness—'what fellowship has light with darkness?'"

Critics claim that any organization with private rituals or confidential information is inherently evil. They equate Greek secrecy with occult practices. How do we respond biblically?

**Understanding "Secret Society" Claims:**

The term "secret society" conjures images of Illuminati conspiracies and occult rituals. But consider:
- Churches have private leadership meetings
- Families have confidential conversations
- Businesses protect proprietary information
- Even Jesus had private teaching for His disciples (Mark 4:10-11)

Confidentiality isn't inherently sinful. The question is: What is being kept confidential, and why?

**Light vs. Darkness in Scripture:**

The Bible does warn about darkness:
- "God is light; in him there is no darkness at all" (1 John 1:5)
- "Have nothing to do with the fruitless deeds of darkness" (Ephesians 5:11)

But notice: Scripture condemns "fruitless deeds of darkness"—sinful actions done in secret—not simply having private matters.

**Healthy vs. Concerning Secrecy:**

**Reasonable Confidentiality:**
- Protecting ritual elements as meaningful traditions (like wedding ceremonies)
- Keeping internal organizational discussions private
- Respecting pledges made to membership
- Not broadcasting your organization's business to everyone

**Concerning Secrecy:**
- Practices that cannot be disclosed to ANY spiritual advisor
- Threats of harm for revealing organizational information
- Activities that must be hidden because they're shameful
- Oaths of silence that prevent seeking help during abuse

**Key Biblical Principles:**

• **Walk in the Light (1 John 1:7)** - This means living transparently with God and maintaining spiritual accountability—not broadcasting everything publicly.

• **Nothing Hidden That Won't Be Revealed (Luke 12:2)** - This is a warning about hypocrisy, not confidentiality.

• **Accountability (Hebrews 10:24-25)** - Maintain relationships where you can share concerns and receive godly counsel.

• **Wisdom in Speech (Proverbs 11:13)** - "A gossip betrays a confidence, but a trustworthy person keeps a secret."

**The Accountability Test:**

Ask yourself: Do I have at least one spiritually mature person who knows about my Greek involvement and can provide oversight? This might be:
- A pastor or campus minister
- A godly parent or family member
- A mature Christian mentor

You don't need to reveal ritual details, but you should be able to discuss your experiences, concerns, and questions with someone who can help you discern God's will.

**Sample Response to Critics:**

"I understand the concern about secrecy, but there's a difference between 'secret society' conspiracies and organizational confidentiality. I don't broadcast my family's private conversations either—that doesn't make my family a secret society. I maintain full accountability with my pastor and parents about my Greek involvement. I can discuss anything concerning with them. What I keep confidential are traditions that are meaningful to my organization, not sinful practices that would shame me."

**Red Flags:**
- If you're told NEVER to discuss organizational matters with ANYONE
- If you're threatened for seeking spiritual counsel
- If you're uncomfortable telling your pastor you're a member

**Reflection Questions:**
• Can I honestly discuss my Greek involvement with my spiritual mentors?
• Is there anything I'm keeping secret because it's shameful rather than simply confidential?
• Do I have adequate spiritual accountability despite organizational privacy expectations?
• Would I be comfortable if my organization's practices were made public?
• Am I being secretive to protect wrongdoing or simply maintaining appropriate confidentiality?`
  },
  {
    id: 5,
    letter: 'F',
    title: 'Founders: Examining Masonic Connection Claims',
    description: 'Researching organizational history biblically',
    duration: '15 min',
    takeaways: 6,
    isLocked: true,
    content: `**The Criticism:** "Greek organizations were founded by Freemasons. You're participating in Masonic traditions and joining a pathway to the lodge."

This accusation claims that BGLO founders were Masons who incorporated lodge traditions into their organizations, making Greek membership a stepping stone to Freemasonry. How do we respond biblically?

**Understanding the Historical Context:**

Many BGLO founders were indeed Freemasons—this is historical fact, not conspiracy theory. In the early 20th century:
- Freemasonry was extremely popular, especially among educated Black men
- Masonic lodges provided social mobility, networking, community support, and essential financial services denied by mainstream institutions
- Many founders borrowed organizational structures from fraternal orders
- Greek-letter organizations and Masonic lodges both used similar ceremonial elements

However, having Masonic founders doesn't make an organization inherently Masonic, just as having Presbyterian founders doesn't make it a denomination.

**📊 The Economic History: Why Black Fraternal Organizations Were Essential**

Understanding WHY African Americans joined Masonic lodges and fraternal organizations requires examining the discriminatory economic landscape they faced:

**Insurance Discrimination:**
- White insurance companies systematically refused to sell life insurance and death benefit policies to African Americans
- When policies were offered, premiums were often 30-50% higher with reduced benefits
- Many companies used "race-rated" actuarial tables that assumed Black lives were worth less

**The Mutual Aid Solution:**
In response, African Americans created their own institutions:

- **Burial Societies & Associations**: Community-based organizations where members pooled resources to ensure dignified burials for their deceased
- **Mutual Aid Societies**: Provided sickness benefits, widow's funds, and emergency assistance
- **Fraternal Benefit Societies**: Lodges like Prince Hall Freemasonry offered life insurance, burial benefits, sick pay, and emergency loans to members

**Key Fraternal Benefits:**
• **Death Benefits**: Guaranteed burial expenses and survivor payments
• **Sick Benefits**: Weekly payments during illness or injury
• **Widow & Orphan Funds**: Ongoing support for deceased members' families
• **Emergency Loans**: Low-interest loans unavailable from white banks
• **Business Networks**: Economic opportunities and job referrals

**The Broader Impact:**
- By 1900, African American fraternal orders had over 2 million members
- These organizations became training grounds for Black leadership
- They funded schools, hospitals, and community institutions
- They provided the organizational model that BGLO founders later adapted

This context matters: African American men didn't join lodges primarily for ritual or secrecy—they joined because these organizations provided economic survival in a discriminatory system.

**Key Questions for Honest Evaluation:**

• **What was borrowed vs. what is essential?** - Organizational structure is common across many groups; core purposes (scholarship, service, brotherhood) stand independently

• **Does the organization require or promote Freemasonry?** - Most BGLOs have no formal Masonic connection; membership doesn't require joining the lodge

• **What do the rituals actually teach?** - Examine content, not just format; focus on what YOUR organization teaches today

• **By their fruits you shall know them** - Judge by actual impact: service, scholarships, lives transformed

• **Is redemption and reformation evident?** - Organizations can evolve; Christians within can influence positive change

**Sample Response to Critics:**

"You're right that some of my organization's founders were Masons—that's documented history. But context matters: African American men joined lodges because white insurance companies wouldn't sell them death benefits. Fraternal organizations provided economic survival, not just ritual. Having Masonic founders doesn't make us Masonic any more than having Baptist founders makes an organization a church. I judge my organization by its fruits: the service hours, scholarships awarded, and community impact."

**The P.R.O.O.F. Framework Conclusion:**

You've now examined all five common criticisms of Greek life:

- **P - Pledge Process (Hazing)**: Enter with integrity, reform harmful practices
- **R - Rituals (Demonic portals)**: Discern with Scripture, not fear
- **O - Oaths (Greek deity allegiance)**: Evaluate content, not just controversy
- **O - Obscurity (Secret societies)**: Maintain accountability, not total exposure
- **F - Founders (Masonic connections)**: Research honestly, judge by present fruits

Remember: Being Greek doesn't make you righteous, and being anti-Greek doesn't make you holy. What matters is whether you're walking faithfully with Christ in whatever context He's placed you.

**Reflection Questions:**
• Have I honestly researched my organization's history?
• Can I articulate a biblical response to each of the five criticisms?
• Am I committed to honoring Christ whether I remain Greek or not?`
  }
];

const ProofCourse = () => {
  const { toast } = useToast();
  const { subscribed, tier, loading: subLoading } = useSubscription();
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Check if user has premium access (Pro or Ministry tier)
  const hasPremiumAccess = subscribed && (tier === 'pro' || tier === 'ministry');

  const startLesson = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && (lesson.id === 1 || hasPremiumAccess)) {
      setActiveLesson(lessonId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast({
        title: 'Lesson Complete!',
        description: `Great job completing ${lessons.find(l => l.id === lessonId)?.title}`,
      });
    }
    setActiveLesson(null);
  };

  const progress = (completedLessons.length / lessons.length) * 100;
  const currentLesson = activeLesson ? lessons.find(l => l.id === activeLesson) : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="P.R.O.O.F. Framework Course | Sacred Greeks"
        description="Master the biblical framework for navigating Greek life with faith, wisdom, and confidence. 5 lessons with practical applications."
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">Deep Dive Course</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            P.R.O.O.F. Framework
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master the biblical framework for navigating Greek life with faith, wisdom, and confidence. 
            5 lessons, practical applications, and reflection exercises.
          </p>
        </div>

        {/* Subscription Status Indicator */}
        {!subLoading && (
          <div className={`mb-8 p-4 rounded-xl border ${
            hasPremiumAccess 
              ? 'bg-gradient-to-r from-amber-500/10 via-sacred/10 to-amber-500/10 border-amber-500/30' 
              : 'bg-muted/50 border-border'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {hasPremiumAccess ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-sacred flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {tier === 'ministry' ? 'Ministry' : 'Pro'} Member
                        <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                          Full Access
                        </Badge>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        All 5 lessons unlocked • Premium audio included
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Free Access</p>
                      <p className="text-sm text-muted-foreground">
                        First lesson available • Upgrade to unlock all content
                      </p>
                    </div>
                  </>
                )}
              </div>
              {!hasPremiumAccess && (
                <Button asChild size="sm" className="bg-sacred hover:bg-sacred/90">
                  <Link to="/subscription">
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Active Lesson View */}
        {currentLesson && (() => {
          const lessonColors = getColorForLesson(currentLesson.id);
          return (
          <Card className={`mb-8 border-2 ${lessonColors.border}`}>
            <CardHeader className={`${lessonColors.bgLight} border-b ${lessonColors.border}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${lessonColors.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl font-bold text-white">{currentLesson.letter}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentLesson.title}</CardTitle>
                    <CardDescription>{currentLesson.description}</CardDescription>
                  </div>
                </div>
                <ListenButton text={currentLesson.content || ''} itemId={`lesson-${currentLesson.id}`} variant="outline" size="sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {currentLesson.content?.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={idx} className="text-lg font-semibold mt-6 mb-3 text-foreground">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-1 my-3">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item.replace(/^- /, '').replace(/\*\*/g, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d\./)) {
                    return (
                      <ol key={idx} className="list-decimal pl-6 space-y-2 my-3">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={idx} className="text-muted-foreground my-3 leading-relaxed">
                      {paragraph.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Download Section */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Downloadable Resources for This Lesson
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      generateProofLessonPDF(currentLesson.id - 1);
                      toast({ title: 'Lesson Summary PDF downloaded!' });
                    }}
                    className={`${lessonColors.border} hover:${lessonColors.bgLight}`}
                  >
                    <FileDown className={`w-4 h-4 mr-2 ${lessonColors.text}`} />
                    Lesson Summary PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      generateLessonWorksheetPDF(currentLesson.id - 1);
                      toast({ title: 'Printable Worksheet downloaded!' });
                    }}
                    className={`${lessonColors.border} hover:${lessonColors.bgLight}`}
                  >
                    <Printer className={`w-4 h-4 mr-2 ${lessonColors.text}`} />
                    Printable Worksheet
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setActiveLesson(null)}>
                  Back to Course
                </Button>
                <Button onClick={() => completeLesson(currentLesson.id)} className={`gap-2 ${lessonColors.bg} hover:opacity-90`}>
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        })()}

        {/* Course Overview (shown when no lesson is active) */}
        {!activeLesson && (
          <>
            {/* Progress Bar */}
            {completedLessons.length > 0 && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons.length} of {lessons.length} lessons complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>
            )}

            {/* Lessons List */}
            <div className="space-y-4 mb-8">
              {lessons.map((lesson) => {
                const isAccessible = lesson.id === 1 || hasPremiumAccess;
                const isCompleted = completedLessons.includes(lesson.id);

                  const colors = getColorForLesson(lesson.id);
                  
                  return (
                    <Card 
                      key={lesson.id} 
                      className={`transition-all duration-300 ${colors.border} border-2 ${
                        isAccessible 
                          ? `hover:${colors.bgLight} hover:shadow-lg hover:shadow-${colors.text.replace('text-', '')}/20 cursor-pointer` 
                          : 'opacity-60'
                      } ${isCompleted ? 'border-green-500/50 bg-green-500/5' : ''}`}
                      onClick={() => isAccessible && startLesson(lesson.id)}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          {/* Letter Badge with Color */}
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                            isCompleted 
                              ? 'bg-green-500/20' 
                              : `bg-gradient-to-br ${colors.gradient}`
                          } shadow-lg`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-7 h-7 text-green-500" />
                            ) : (
                              <span className="text-2xl font-bold text-white drop-shadow-sm">
                                {lesson.letter}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-lg ${
                              isAccessible ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className={`flex items-center gap-1 text-xs ${colors.text}`}>
                                <Clock className="w-3.5 h-3.5" />
                                {lesson.duration}
                              </span>
                              <span className={`flex items-center gap-1 text-xs ${colors.text}`}>
                                <Lightbulb className="w-3.5 h-3.5" />
                                {lesson.takeaways} key takeaways
                              </span>
                            </div>
                          </div>

                          {/* Action */}
                          <div className="shrink-0">
                            {isCompleted ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                                Complete
                              </Badge>
                            ) : isAccessible ? (
                              <Button size="sm" className={`gap-1.5 ${colors.bg} hover:opacity-90 text-white shadow-md`}>
                                <Play className="w-4 h-4" />
                                Start
                              </Button>
                            ) : (
                              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <Lock className="w-4 h-4" />
                                Locked
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
              })}
            </div>

            {/* Ancient Guild Context Section */}
            <div className="mt-12 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Ancient Guild Context</h2>
                  <p className="text-sm text-muted-foreground">Jesus & Paul's membership in trade guilds</p>
                </div>
              </div>

              {/* Guild Journey Diagram */}
              <GuildJourneyDiagram className="mb-6" />

              {/* Guild Audio Player */}
              <GuildAudioPlayer className="mb-6" />

              {/* 1st-Century Guilds Section - Tekton & Tentmaker */}
              <FirstCenturyGuildsSection className="mb-6" />

              {/* Historical Guild Practices - Oaths, Handshakes, Phrases, Rituals */}
              <GuildPracticesSection className="mb-6" />

              {/* Holy Kiss Comparison Chart */}
              <HolyKissComparisonChart className="mb-6" />

              {/* PDF Downloads */}
              <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-amber-500" />
                    Downloadable Resources
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        generateGuildOnePagerPDF();
                        toast({ title: 'One-Pager PDF downloaded!' });
                      }}
                      className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                    >
                      <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="text-left">
                        <span className="block text-sm font-medium">One-Pager</span>
                        <span className="block text-xs text-muted-foreground">Quick Reference</span>
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        generateGuildComparisonPDF();
                        toast({ title: 'Comparison Guide downloaded!' });
                      }}
                      className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                    >
                      <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="text-left">
                        <span className="block text-sm font-medium">Full Guide</span>
                        <span className="block text-xs text-muted-foreground">Detailed Comparison</span>
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        generateJesusMasterCarpenterPDF();
                        toast({ title: 'Jesus Master Carpenter PDF downloaded!' });
                      }}
                      className="justify-start border-amber-500/30 hover:bg-amber-500/10"
                    >
                      <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="text-left">
                        <span className="block text-sm font-medium">Jesus the Tekton</span>
                        <span className="block text-xs text-muted-foreground">Carpenter Study</span>
                      </span>
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button asChild variant="ghost" className="text-amber-600 hover:text-amber-500 hover:bg-amber-500/10 justify-start">
                      <Link to="/chapter-kit">
                        📚 Chapter Resources →
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-amber-600 hover:text-amber-500 hover:bg-amber-500/10 justify-start">
                      <Link to="/economic-history">
                        📊 Economic Timeline →
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-amber-600 hover:text-amber-500 hover:bg-amber-500/10 justify-start">
                      <Link to="/faith-authority">
                        ✝️ Faith & Authority →
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-amber-600 hover:text-amber-500 hover:bg-amber-500/10 justify-start">
                      <Link to="/symbols">
                        🔍 Symbol Guide →
                      </Link>
                    </Button>
                  </div>
                    <div className="mt-4 pt-4 border-t border-amber-500/20">
                    <h4 className="font-medium text-foreground mb-3 text-sm">P.R.O.O.F. Lesson Summaries & Worksheets</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          generateAllProofLessonsPDF();
                          toast({ title: 'Complete Lesson Guide downloaded!' });
                        }}
                        className="border-sacred/30 hover:bg-sacred/10"
                      >
                        <FileDown className="w-4 h-4 mr-2 text-sacred" />
                        All Lessons PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          generateAllWorksheetsPDF();
                          toast({ title: 'All Worksheets PDF downloaded!' });
                        }}
                        className="border-sacred/30 hover:bg-sacred/10"
                      >
                        <Printer className="w-4 h-4 mr-2 text-sacred" />
                        All Worksheets PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          generateEconomicHistoryPDF();
                          toast({ title: 'Economic History PDF downloaded!' });
                        }}
                        className="border-amber-500/30 hover:bg-amber-500/10"
                      >
                        <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                        Economic History PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          generateGuildWorksheetPDF();
                          toast({ title: 'Guild Practices Worksheet downloaded!' });
                        }}
                        className="border-amber-500/30 hover:bg-amber-500/10"
                      >
                        <FileDown className="w-4 h-4 mr-2 text-amber-500" />
                        Guild Worksheet
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PROOF Framework Audio Overview */}
            <div className="mt-8 mb-8">
              <ProofFrameworkAudio className="max-w-2xl mx-auto" />
            </div>

            {/* Faith & Authority Section */}
            <FaithAuthoritySection className="mt-12 -mx-4 sm:-mx-6" />
            
            {/* Belief Teaching Audio */}
            <div className="mt-8">
              <BeliefTeachingAudio className="max-w-2xl mx-auto" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProofCourse;
