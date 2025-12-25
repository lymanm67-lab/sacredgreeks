import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Copy, Check, Users, Church, AlertTriangle, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface Script {
  id: string;
  category: 'family' | 'church' | 'peers' | 'self';
  question: string;
  context: string;
  responses: {
    brief: string;
    detailed: string;
    scripture?: string;
  };
  tips: string[];
}

const scripts: Script[] = [
  {
    id: '1',
    category: 'family',
    question: "Isn't joining a fraternity/sorority like worshipping false gods?",
    context: "Often asked by concerned parents or grandparents who have heard negative things about Greek life.",
    responses: {
      brief: "I understand your concern. My Greek letters represent a commitment to service, scholarship, and brotherhood/sisterhood - not worship. My relationship with God remains my first priority, and I've actually found many faith-based opportunities through my organization.",
      detailed: "I really appreciate you sharing your concerns with me. Let me help clarify what joining actually means. Greek letters are symbols of our organizational values - like service, scholarship, and community - not objects of worship. Many of our founders were actually devout Christians who started these organizations to create supportive communities. My faith in Christ is central to who I am, and being Greek has given me more opportunities to live out my faith through service and fellowship with other believers in my chapter.",
      scripture: "Colossians 3:17 - 'And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.'"
    },
    tips: [
      "Listen first - their concern comes from love",
      "Share specific examples of faith activities in your chapter",
      "Invite them to public service events to see your values in action"
    ]
  },
  {
    id: '2',
    category: 'church',
    question: "How can you serve two masters - your chapter and God?",
    context: "Asked by pastors, church leaders, or fellow congregation members.",
    responses: {
      brief: "I don't see it as serving two masters. My Greek organization is a platform for service, much like a job or community group. Christ remains my Lord - my chapter is simply one of the communities where I live out my faith.",
      detailed: "That's a great question, and I'm glad you asked. I don't view my Greek membership as serving another master alongside God. Jesus is my Lord and Savior - that never changes. My fraternity/sorority is a community where I can practice Christ-like service, build meaningful relationships, and often find other believers. It's similar to being part of a workplace, sports team, or civic organization - it's a context for living out my faith, not a replacement for it. In fact, many of our founders were Christians who wanted to create spaces for mutual uplift and service.",
      scripture: "Matthew 6:24 addresses serving God vs. money/mammon - organizations centered on service don't fall into this category. 1 Peter 4:10 says 'Each of you should use whatever gift you have received to serve others.'"
    },
    tips: [
      "Acknowledge the validity of their concern",
      "Distinguish between 'master' (lordship) and 'community' (belonging)",
      "Share how you integrate faith into Greek life"
    ]
  },
  {
    id: '3',
    category: 'peers',
    question: "Why do you need to join an organization to do good? Isn't that just buying friends?",
    context: "Asked by classmates or friends who may be skeptical of Greek life.",
    responses: {
      brief: "I didn't join to 'buy' friends - I joined a community of people committed to the same values I hold. Yes, there are dues, but they fund scholarships, community service, and programs that help us make a bigger impact together than I could alone.",
      detailed: "I hear this question a lot, and I get why it might seem that way from the outside. But think about it like joining a gym - you pay dues to access resources and community, not to 'buy' workout partners. My organization provides structure, resources, and a network to do service at scale. The friendships I've built are real - they're based on shared values, late-night study sessions, and community service projects side by side. The dues fund scholarships, chapter programming, and the infrastructure that lets us coordinate hundreds of service hours each semester.",
      scripture: "Ecclesiastes 4:9-10 - 'Two are better than one... If either of them falls down, one can help the other up.'"
    },
    tips: [
      "Share specific examples of impact through your organization",
      "Explain what dues actually fund",
      "Invite them to a public service event"
    ]
  },
  {
    id: '4',
    category: 'church',
    question: "What about the secret rituals? Aren't those occult practices?",
    context: "Concern about initiation ceremonies and private organizational practices.",
    responses: {
      brief: "Our rituals are private, not secret in a sinister sense. They're ceremonial traditions that reinforce our values - similar to how some churches have members-only practices. There's nothing occult about them; they typically involve pledges to uphold values like integrity, service, and scholarship.",
      detailed: "I understand why 'secret rituals' sounds concerning. Let me provide some context: our ceremonies are private traditions passed down through generations, much like how some churches have members-only communion or foot washing ceremonies. The 'secrecy' is about preserving the meaningful experience for new members, not hiding something sinister. Our rituals typically involve commitments to uphold organizational values like integrity, scholarship, and service. Many ceremonies actually include prayer and references to God. If anything specifically conflicted with my faith, I would not participate.",
      scripture: "Ephesians 5:11 tells us to 'have nothing to do with the fruitless deeds of darkness.' I can assure you our ceremonies are focused on light - on building character and commitment to positive values."
    },
    tips: [
      "Explain 'private' vs 'secret' distinction",
      "Share that you would not participate in anything contradicting your faith",
      "Mention the Christian foundations of many BGLOs"
    ]
  },
  {
    id: '5',
    category: 'self',
    question: "Am I really honoring God by being Greek?",
    context: "Internal doubt or reflection about your own Greek membership.",
    responses: {
      brief: "This is between you and God. Examine your heart: Are you using your membership to serve others and glorify God? Are you maintaining your faith practices? If yes, your Greek letters can be a powerful platform for His work.",
      detailed: "It's good that you're examining this - that self-reflection shows spiritual maturity. Here's what I'd encourage you to consider: How are you using your Greek membership? Are you serving others, mentoring younger members, and representing Christ well? Are you maintaining your personal relationship with God through prayer, worship, and Scripture? If your Greek life is helping you grow and serve, it can absolutely honor God. If you've found it's pulling you away from Him, that's worth addressing - but the organization itself isn't the issue; it's how we engage with it.",
      scripture: "1 Corinthians 10:31 - 'So whether you eat or drink or whatever you do, do it all for the glory of God.'"
    },
    tips: [
      "Regular spiritual inventory is healthy",
      "Consider journaling about how you're using your membership for God's glory",
      "Connect with a mentor or chaplain to discuss your reflections"
    ]
  },
  {
    id: '6',
    category: 'family',
    question: "I heard Greek organizations are just about partying and hazing. Is that true?",
    context: "Concern from family members who've seen negative media coverage.",
    responses: {
      brief: "Unfortunately, negative stories make headlines while the positive work rarely does. My organization has a zero-tolerance policy on hazing, and our chapter focuses on service, scholarship, and personal development. I'd be happy to share what we actually do.",
      detailed: "I appreciate you bringing this up directly with me. The media tends to highlight the worst examples, which aren't representative of most Greek organizations. My chapter has strict anti-hazing policies - hazing is actually illegal and against our national organization's values. What you don't see in the news is the thousands of service hours we complete, the scholarships we fund, the mentorship we provide, and the professional development we offer. Last semester alone, our chapter raised money for charity and completed many hours of community service. That's the reality of my Greek experience.",
      scripture: "Galatians 6:2 - 'Carry each other's burdens, and in this way you will fulfill the law of Christ.' This is what my Greek experience is actually about."
    },
    tips: [
      "Acknowledge that problems exist in some organizations",
      "Share specific positive examples from your chapter",
      "Explain your organization's anti-hazing policies"
    ]
  },
  {
    id: '7',
    category: 'peers',
    question: "Why are you so obsessed with your letters? It seems like a cult.",
    context: "Criticism from non-Greek friends or acquaintances.",
    responses: {
      brief: "I understand it might seem that way from outside. My pride in my letters reflects pride in what they represent - a commitment to values and a community that has shaped me positively. It's similar to school pride or career pride - it's about belonging, not worship.",
      detailed: "I can see why Greek pride might seem over-the-top if you haven't experienced it. But think about it like this: people wear jerseys of their favorite teams, display their college diplomas, and share their workplace achievements - all without being called cult members. My letters represent a community that has supported me, challenged me to grow, and connected me to a legacy of service. The enthusiasm you see is about celebrating that belonging, not worshipping an organization. I'm still me - just with a community that's helped me become a better version of myself.",
      scripture: "Romans 12:10 - 'Be devoted to one another in love. Honor one another above yourselves.' That's what my Greek bonds are about."
    },
    tips: [
      "Stay calm - defensiveness can reinforce their perception",
      "Use relatable analogies they can understand",
      "Invite genuine curiosity rather than debate"
    ]
  },
  {
    id: '8',
    category: 'church',
    question: "Shouldn't your identity be in Christ alone, not Greek letters?",
    context: "Challenge from church members about where your identity lies.",
    responses: {
      brief: "My identity is in Christ - that's unchanging. My Greek letters are part of how I express that identity through service and community, similar to how being a teacher, nurse, or musician might be part of someone's life without replacing their faith identity.",
      detailed: "That's a really important point, and I agree - my foundational identity is in Christ. Being Greek doesn't replace that; it's one way I live it out. Think about how Paul was a tentmaker, a Roman citizen, and from Tarsus - these were parts of his identity that he used for God's purposes, but his core identity was as a servant of Christ. My Greek letters are similar: they're a platform and community through which I serve, grow, and connect with others. When I wear my letters, I'm representing Christ first in how I treat people, serve my community, and uphold integrity.",
      scripture: "Galatians 2:20 - 'I have been crucified with Christ and I no longer live, but Christ lives in me.' My Greek membership is one context where Christ living in me becomes visible to others."
    },
    tips: [
      "Affirm their core point about identity in Christ",
      "Use biblical examples of multiple 'identities' used for God's glory",
      "Share how being Greek helps you live out your faith"
    ]
  }
];

const categoryInfo = {
  family: { label: 'Family', icon: Heart, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  church: { label: 'Church', icon: Church, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  peers: { label: 'Peers', icon: Users, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  self: { label: 'Self-Reflection', icon: AlertTriangle, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }
};

const ConversationScripts = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Response copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = filter === 'all' ? scripts : scripts.filter(s => s.category === filter);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-sacred/10">
          <MessageSquare className="w-6 h-6 text-sacred" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Conversation Scripts</h2>
          <p className="text-muted-foreground">Ready-to-use responses for common questions</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-sacred hover:bg-sacred/90' : ''}
        >
          All Questions
        </Button>
        {Object.entries(categoryInfo).map(([key, { label, icon: Icon }]) => (
          <Button
            key={key}
            variant={filter === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(key)}
            className={filter === key ? 'bg-sacred hover:bg-sacred/90' : ''}
          >
            <Icon className="w-4 h-4 mr-1" />
            {label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredScripts.map(script => {
          const { icon: CategoryIcon, color } = categoryInfo[script.category];
          
          return (
            <Card key={script.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge className={color}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {categoryInfo[script.category].label}
                    </Badge>
                    <CardTitle className="text-lg leading-snug">"{script.question}"</CardTitle>
                    <p className="text-sm text-muted-foreground">{script.context}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Brief Response */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-sacred">Quick Response</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(script.responses.brief, `${script.id}-brief`)}
                      className="h-8"
                    >
                      {copiedId === `${script.id}-brief` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{script.responses.brief}</p>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-none">
                    <AccordionTrigger className="py-2 text-sacred hover:no-underline">
                      View Detailed Response & Tips
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {/* Detailed Response */}
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">In-Depth Response</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(script.responses.detailed, `${script.id}-detailed`)}
                            className="h-8"
                          >
                            {copiedId === `${script.id}-detailed` ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{script.responses.detailed}</p>
                      </div>

                      {/* Scripture Reference */}
                      {script.responses.scripture && (
                        <div className="bg-sacred/5 border-l-4 border-sacred p-4 rounded-r-lg">
                          <span className="text-sm font-semibold text-sacred block mb-1">Scripture Support</span>
                          <p className="text-sm italic">{script.responses.scripture}</p>
                        </div>
                      )}

                      {/* Tips */}
                      <div>
                        <span className="text-sm font-semibold block mb-2">Conversation Tips</span>
                        <ul className="space-y-1">
                          {script.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-sacred mt-1">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default ConversationScripts;
