import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Play, Clock, Lightbulb, CheckCircle2, BookOpen, Mail, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ListenButton } from '@/components/ListenButton';
import { FaithAuthoritySection } from '@/components/proof/FaithAuthoritySection';
import { BeliefTeachingAudio } from '@/components/proof/BeliefTeachingAudio';
import { ProofFrameworkAudio } from '@/components/proof/ProofFrameworkAudio';

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

1. **Count the Cost (Luke 14:28-30)** - Before joining, research the organization's actual intake practices, not just their written policies.

2. **Set Non-Negotiable Boundaries** - Determine in advance what you will and won't do:
   - I will not participate in activities that demean or harm others
   - I will not cover up abuse to "protect" the organization
   - I will speak up when I witness wrongdoing

3. **Be a Reformer, Not a Participant** - Christians in Greek life should actively work to eliminate hazing:
   - Report violations to nationals and university officials
   - Mentor new members with Christ-like servant leadership
   - Model intake processes that build up rather than tear down

4. **Guard Your Heart (Proverbs 4:23)** - If your intake experience requires compromising your faith, that's a red flag about the organization's culture.

**Practical Application:**

If you're considering membership, ask current members (privately) about actual intake practices. If you're already a member, commit to being part of the solution by refusing to perpetuate harmful traditions.

**Sample Response to Critics:**

"You're right that hazing is sinful, and I oppose it completely. That's exactly why Christians should be in these organizations—to reform them from within. I set firm boundaries during my intake, and I'm committed to ensuring future members have a dignified experience that reflects Christ's love."

**Reflection Questions:**
1. What specific boundaries will I maintain during any intake process?
2. Am I willing to walk away if those boundaries are violated?
3. How can I actively work to eliminate hazing in my organization?`
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

1. **What is the ritual's origin and purpose?**
   - Some Greek rituals have benign origins (literary societies, civic traditions)
   - Others may have borrowed from mystery religions or Freemasonry
   - Research your organization's specific history

2. **What am I being asked to invoke or affirm?**
   - Prayers to "the Supreme Being" or unnamed forces are concerning
   - Affirmations of organizational loyalty are different from worship
   - Be specific about what's actually happening vs. what critics assume

3. **Does participation constitute worship?**
   - Worship involves heart devotion, not just physical actions
   - Many rituals are symbolic traditions, not religious ceremonies
   - Apply Paul's principle from 1 Corinthians 8 about meat sacrificed to idols

**Key Biblical Principles:**

1. **No Other Gods (Exodus 20:3)** - Never invoke, honor, or worship any deity besides the God of the Bible.

2. **Greater is He (1 John 4:4)** - Christians cannot be "possessed" by demons through rituals. We're sealed by the Holy Spirit.

3. **Test the Spirits (1 John 4:1)** - Develop discernment rather than fear-based assumptions.

4. **Freedom with Wisdom (1 Corinthians 10:23-33)** - Some rituals are permissible but not beneficial.

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
1. Have I personally examined my organization's rituals, or am I relying on assumptions?
2. Can I articulate what each ritual element represents?
3. Is there anything in my organization's ceremonies I cannot do in good conscience?
4. Am I giving power to rituals through my fear rather than standing in Christ's authority?`
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

1. **Am I swearing to worship a false god?**
   - References to "Greek ideals" differ from invocations of Greek deities
   - Most organizational oaths focus on brotherhood, scholarship, and service
   - Read your actual oath carefully—what does it specifically say?

2. **Does this oath place anything above God?**
   - "I will be loyal to my organization" differs from "My organization comes before God"
   - Evaluate the hierarchy of commitments

3. **Am I promising anything I cannot biblically do?**
   - Unconditional obedience to human authorities is dangerous
   - Promises to conceal criminal activity are wrong
   - Commitments to lifelong service may conflict with divine calling

4. **Can I keep this oath with integrity?**
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
1. Have I actually read my organization's oath, or am I relying on hearsay?
2. Can I articulate what my oath commits me to?
3. Is there any conflict between my organizational vows and my baptismal vows to Christ?`
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

1. **Walk in the Light (1 John 1:7)** - This means living transparently with God and maintaining spiritual accountability—not broadcasting everything publicly.

2. **Nothing Hidden That Won't Be Revealed (Luke 12:2)** - This is a warning about hypocrisy, not confidentiality.

3. **Accountability (Hebrews 10:24-25)** - Maintain relationships where you can share concerns and receive godly counsel.

4. **Wisdom in Speech (Proverbs 11:13)** - "A gossip betrays a confidence, but a trustworthy person keeps a secret."

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
1. Can I honestly discuss my Greek involvement with my spiritual mentors?
2. Is there anything I'm keeping secret because it's shameful rather than simply confidential?
3. Do I have adequate spiritual accountability despite organizational privacy expectations?`
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
- Masonic lodges provided social mobility, networking, and community
- Many founders borrowed organizational structures from fraternal orders
- Greek-letter organizations and Masonic lodges both used similar ceremonial elements

However, having Masonic founders doesn't make an organization inherently Masonic, just as having Presbyterian founders doesn't make it a denomination.

**Key Questions for Honest Evaluation:**

1. **What was borrowed vs. what is essential?**
   - Organizational structure (officers, chapters, rituals) is common across many groups
   - Some symbolic elements may have Masonic origins
   - Core purposes (scholarship, service, brotherhood) stand independently

2. **Does the organization require or promote Freemasonry?**
   - Most BGLOs have no formal connection to Masonic lodges
   - Membership doesn't require joining the Masons
   - Many members are faithful Christians with no Masonic involvement

3. **What do the rituals actually teach?**
   - Examine content, not just format
   - Many "borrowed" elements have been given new meaning
   - Focus on what YOUR organization teaches today

**Biblical Framework:**

1. **By Their Fruits (Matthew 7:16-20)** - Judge by the organization's actual impact:
   - Community service and philanthropic giving
   - Academic achievement and mentorship
   - Lives transformed for better or worse

2. **Test Everything (1 Thessalonians 5:21)** - Research honestly:
   - Read your organization's official history
   - Consult multiple sources (favorable AND critical)
   - Don't rely solely on YouTube conspiracy videos

3. **Truth Sets Free (John 8:32)** - Embrace honest historical understanding:
   - Acknowledge problematic elements if they exist
   - Celebrate genuine contributions to society
   - Make informed decisions based on facts

4. **Redemption is Possible (2 Corinthians 5:17)** - Organizations can evolve:
   - Many groups have reformed problematic practices
   - Christians within can influence positive change
   - Past doesn't always dictate present

**Addressing Specific Concerns:**

**"Your symbols are Masonic"**
Many symbols (pyramids, all-seeing eye, clasped hands) appear across cultures and aren't inherently Masonic. Research YOUR organization's specific symbol meanings.

**"Your rituals came from the lodge"**
Ceremonial elements (candles, robes, processions) appear in churches, graduation ceremonies, weddings, and many secular contexts. Format doesn't equal meaning.

**"Founders intended it as a Masonic pipeline"**
This requires evidence, not assumption. Many founders saw Greek organizations as ALTERNATIVES to Masonic lodges—specifically designed for college students.

**Sample Response to Critics:**

"You're right that some of my organization's founders were Masons—that's documented history. But having Masonic founders doesn't make us a Masonic organization any more than having Baptist founders makes an organization a Baptist church. I've researched our actual rituals and teachings. They focus on scholarship, service, and brotherhood—not Masonic doctrine. I'm a faithful Christian who has no interest in joining the lodge, and my Greek membership doesn't require or promote that. I judge my organization by its fruits: the service hours, scholarships awarded, and community impact."

**Practical Steps:**

1. Research your organization's founding history from primary sources
2. Examine your ritual content (not just format) for concerning elements
3. Ask older members about Masonic expectations or promotion
4. Evaluate whether your organization leads people toward or away from Christ

**The P.R.O.O.F. Framework Conclusion:**

You've now examined all five common criticisms of Greek life:

- **P - Pledge Process (Hazing)**: Enter with integrity, reform harmful practices
- **R - Rituals (Demonic portals)**: Discern with Scripture, not fear
- **O - Oaths (Greek deity allegiance)**: Evaluate content, not just controversy
- **O - Obscurity (Secret societies)**: Maintain accountability, not total exposure
- **F - Founders (Masonic connections)**: Research honestly, judge by present fruits

Remember: Being Greek doesn't make you righteous, and being anti-Greek doesn't make you holy. What matters is whether you're walking faithfully with Christ in whatever context He's placed you.

**Final Reflection:**
1. Have I honestly researched my organization's history?
2. Can I articulate a biblical response to each of the five criticisms?
3. Am I committed to honoring Christ whether I remain Greek or not?`
  }
];

const ProofCourse = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter your email to unlock the course.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUnlocked(true);
    setIsLoading(false);
    toast({
      title: 'Course Unlocked!',
      description: 'You now have access to all 5 lessons. Start learning!',
    });
  };

  const startLesson = (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && (lesson.id === 1 || isUnlocked || !lesson.isLocked)) {
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

        {/* Active Lesson View */}
        {currentLesson && (
          <Card className="mb-8 border-sacred/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sacred/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-sacred">{currentLesson.letter}</span>
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

              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button variant="outline" onClick={() => setActiveLesson(null)}>
                  Back to Course
                </Button>
                <Button onClick={() => completeLesson(currentLesson.id)} className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
                const isAccessible = lesson.id === 1 || isUnlocked || !lesson.isLocked;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <Card 
                    key={lesson.id} 
                    className={`transition-all ${
                      isAccessible 
                        ? 'hover:border-sacred/50 cursor-pointer' 
                        : 'opacity-75'
                    } ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}
                    onClick={() => isAccessible && startLesson(lesson.id)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        {/* Letter Badge */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isCompleted 
                            ? 'bg-green-500/20' 
                            : isAccessible 
                              ? 'bg-sacred/10' 
                              : 'bg-muted'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          ) : (
                            <span className={`text-xl font-bold ${
                              isAccessible ? 'text-sacred' : 'text-muted-foreground'
                            }`}>
                              {lesson.letter}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold ${
                            isAccessible ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Lightbulb className="w-3 h-3" />
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
                            <Button size="sm" variant="ghost" className="gap-1.5">
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

            {/* Unlock CTA */}
            {!isUnlocked && (
              <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
                <CardContent className="py-8">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-sacred/10 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-sacred" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Unlock All 5 Lessons Free</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your email to get instant access to the complete P.R.O.O.F. Framework course 
                      and start your journey of faith-based discernment today.
                    </p>
                    <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button type="submit" disabled={isLoading} className="gap-2">
                        {isLoading ? 'Unlocking...' : 'Get Free Access Now'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            )}

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
