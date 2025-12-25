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
    title: 'Lesson 1: Process',
    description: 'Understanding the intake process through a biblical lens',
    duration: '10 min',
    takeaways: 4,
    isLocked: false,
    content: `The intake process in Greek organizations—commonly known as pledging or membership intake—is often the first encounter students have with the traditions and expectations of their chosen fraternity or sorority. This lesson examines how to approach this process with biblical wisdom.

**Key Biblical Principles:**

1. **Count the Cost (Luke 14:28-30)** - Before committing to any organization, carefully evaluate what will be required of you spiritually, emotionally, and physically.

2. **Guard Your Heart (Proverbs 4:23)** - The intake process often involves emotional vulnerability. Maintain spiritual boundaries that protect your relationship with God.

3. **Test the Spirits (1 John 4:1)** - Not everything presented as "tradition" aligns with biblical truth. Develop discernment to recognize what honors God.

4. **Seek Godly Counsel (Proverbs 11:14)** - Don't navigate this journey alone. Consult mature Christians who can provide perspective.

**Practical Application:**

Before beginning any intake process, create a list of non-negotiable boundaries based on Scripture. These might include:
- I will not participate in activities that mock my faith
- I will not swear allegiance to anything above God
- I will maintain my integrity regardless of pressure
- I will speak up when asked to compromise my values

**Reflection Questions:**
1. What attracted me to this organization, and does it align with my calling as a Christian?
2. Have I honestly counted the cost of membership?
3. Who are the godly counselors in my life that I can consult?
4. What are my non-negotiable boundaries?`
  },
  {
    id: 2,
    letter: 'R',
    title: 'Lesson 2: Rituals',
    description: 'Discerning ceremonial practices with biblical wisdom',
    duration: '12 min',
    takeaways: 4,
    isLocked: true,
    content: `Rituals are central to Greek letter organizations. From crossing ceremonies to initiation rites, these practices carry deep symbolic meaning. This lesson provides a framework for discerning which rituals honor God and which may conflict with Christian faith.

**Understanding Ritual in Context:**

The Bible itself contains rituals—communion, baptism, anointing with oil. The question isn't whether rituals are inherently wrong, but rather:
- What is the origin and purpose of this ritual?
- What am I being asked to affirm or invoke?
- Does participation constitute worship of anything other than God?

**Key Biblical Principles:**

1. **No Other Gods (Exodus 20:3)** - Any ritual that invokes, honors, or pays homage to deities, spirits, or entities other than the God of the Bible violates the first commandment.

2. **Worship in Spirit and Truth (John 4:24)** - Authentic worship is directed solely to God through Jesus Christ.

3. **Come Out and Be Separate (2 Corinthians 6:17)** - Some rituals may require separation from practices that contradict Christian faith.

4. **All Things for God's Glory (1 Corinthians 10:31)** - Can you participate in this ritual to the glory of God?

**Red Flags to Watch For:**
- Invocation of ancestors, spirits, or unnamed powers
- Altars, candles, or symbols associated with non-Christian spirituality
- Oaths of silence that prevent you from seeking counsel
- Practices described as "sacred" that have no Christian foundation

**Reflection Questions:**
1. What rituals have I observed or participated in?
2. Do I understand the origin and meaning of these practices?
3. Can I participate with a clear conscience before God?
4. What would I do if asked to participate in something that violates my faith?`
  },
  {
    id: 3,
    letter: 'O',
    title: 'Lesson 3: Oaths',
    description: 'Evaluating vows and pledges through Scripture',
    duration: '10 min',
    takeaways: 4,
    isLocked: true,
    content: `Oaths, vows, and pledges are foundational to Greek letter organizations. Many require members to swear lifelong allegiance, promise secrecy, or make commitments that may conflict with Christian faith. This lesson examines how Scripture guides us in evaluating oaths.

**What Scripture Says About Oaths:**

Jesus addressed oaths directly in Matthew 5:33-37, teaching His followers to let their "yes be yes" and "no be no." This doesn't prohibit all oaths, but it calls for:
- Complete honesty in all speech
- Caution about binding commitments
- Recognition that we cannot control the future

**Key Questions to Ask:**

1. **Does this oath place anything above God?** - Any oath that elevates an organization, its founders, or its traditions above God violates the first commandment.

2. **Does this oath require future actions that may conflict with Scripture?** - Promising unconditional obedience to human authorities is dangerous.

3. **Does this oath bind me to secrecy that prevents accountability?** - Christians need spiritual oversight and the ability to seek godly counsel.

4. **Can I keep this oath in good conscience?** - If you're uncomfortable before taking an oath, that discomfort is worth examining.

**Biblical Examples:**
- Jephthah's tragic vow (Judges 11) shows the danger of rash oaths
- Peter's denial reminds us that we cannot guarantee future behavior
- The Nazarite vow (Numbers 6) shows that some commitments can honor God

**Practical Guidance:**

Before taking any oath:
1. Ask to see the oath in writing beforehand
2. Consult with a pastor or mature Christian
3. Consider whether you can fulfill this oath while fully following Christ
4. Remember that no organization should demand what only God deserves

**Reflection Questions:**
1. What oaths or pledges have I already taken?
2. Are there conflicts between my Christian commitments and organizational oaths?
3. How would I respond if asked to take an oath that conflicts with my faith?`
  },
  {
    id: 4,
    letter: 'O',
    title: 'Lesson 4: Obscurity',
    description: 'Navigating secrecy as children of light',
    duration: '10 min',
    takeaways: 4,
    isLocked: true,
    content: `Secrecy is a hallmark of many Greek letter organizations. While some confidentiality is reasonable, excessive secrecy can create spiritual dangers. This lesson explores how Christians should navigate the tension between organizational secrecy and living as "children of light."

**Light vs. Darkness in Scripture:**

The Bible frequently uses light and darkness as metaphors for good and evil, truth and deception:

- "God is light; in him there is no darkness at all" (1 John 1:5)
- "You are the light of the world" (Matthew 5:14)
- "Have nothing to do with the fruitless deeds of darkness, but rather expose them" (Ephesians 5:11)

**Healthy vs. Unhealthy Secrecy:**

**Reasonable Confidentiality:**
- Protecting ritual elements as meaningful traditions
- Keeping internal discussions private
- Respecting organizational business matters

**Concerning Secrecy:**
- Practices that cannot be disclosed even to spiritual advisors
- Threats for revealing organizational information
- Activities that must be hidden because they're shameful
- Oaths of silence that override accountability relationships

**Key Biblical Principles:**

1. **Walk in the Light (1 John 1:7)** - Christians are called to transparency and honesty.

2. **Nothing Hidden That Won't Be Revealed (Luke 12:2)** - What happens in secret will eventually come to light.

3. **Accountability (James 5:16)** - We need community and oversight for spiritual health.

4. **Flee Evil (2 Timothy 2:22)** - If secrecy is protecting harmful practices, distance yourself.

**Questions to Consider:**
1. Why does this need to be secret?
2. Would I be comfortable if my pastor or parents knew about this?
3. Does this secrecy protect tradition or hide wrongdoing?
4. Can I maintain my spiritual accountability while honoring this secrecy?

**Practical Application:**

Maintain at least one relationship (pastor, mentor, parent) where you can share concerns without violating reasonable confidentiality. If an organization requires you to keep secrets from everyone who provides spiritual oversight, this is a significant red flag.`
  },
  {
    id: 5,
    letter: 'F',
    title: 'Lesson 5: Founders',
    description: 'Understanding historical context and spiritual foundations',
    duration: '12 min',
    takeaways: 4,
    isLocked: true,
    content: `Every Greek letter organization has a founding story, founding principles, and founding members. Understanding this history is essential for discerning whether an organization aligns with Christian faith. This lesson examines how to research and evaluate organizational foundations.

**Why Founders Matter:**

The spiritual beliefs, intentions, and practices of founders often shape an organization for generations. Many Greek organizations were founded in eras when:
- Christian faith was assumed but not always central
- Fraternal orders drew from multiple spiritual traditions
- Secret societies and mystical practices were popular
- Racial segregation shaped organizational development

**Key Research Questions:**

1. **What were the founders' spiritual beliefs?** - Were they Christians? Did they draw from other religious traditions?

2. **What influenced the organization's symbols and rituals?** - Many Greek organizations incorporated Egyptian symbolism, Masonic traditions, or other spiritual elements.

3. **What was the original purpose?** - Literary societies, mutual aid, religious fellowship, or something else?

4. **How has the organization evolved?** - Some organizations have become more secular; others have deepened problematic spiritual elements.

**Biblical Framework for Evaluation:**

1. **By Their Fruits (Matthew 7:16-20)** - What has this organization produced over time?

2. **Test Everything (1 Thessalonians 5:21)** - Don't accept organizational history uncritically.

3. **Truth Sets Free (John 8:32)** - Honest historical understanding leads to wise decisions.

4. **New Creations (2 Corinthians 5:17)** - Even if an organization has a problematic past, can it be reformed?

**Practical Steps:**

1. Research your organization's history from multiple sources
2. Examine the meaning behind symbols, colors, and traditions
3. Ask older members about the spiritual elements of the organization
4. Consult with knowledgeable Christians who have studied Greek life

**Conclusion:**

The P.R.O.O.F. Framework provides a comprehensive approach to evaluating Greek life participation:

- **Process**: Enter with wisdom, counting the cost
- **Rituals**: Discern what honors God
- **Oaths**: Guard your commitments carefully
- **Obscurity**: Walk in the light
- **Founders**: Understand the foundation you're building on

May God give you wisdom as you navigate these important decisions, always keeping Christ at the center of your identity and choices.`
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProofCourse;
