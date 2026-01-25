import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertCircle, Target, Sparkles, Scale, Eye, Building, ArrowRight, ChevronDown, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";

const fistSteps = [
  {
    letter: "F",
    title: "Facts",
    description: "Observable events or data points, often incomplete or taken out of context.",
    color: "bg-blue-500"
  },
  {
    letter: "I",
    title: "Interpretation",
    description: "How we explain or connect those facts based on assumptions and bias.",
    color: "bg-amber-500"
  },
  {
    letter: "S",
    title: "Stories",
    description: "Personal anecdotes and experiences that reinforce the interpretation.",
    color: "bg-purple-500"
  },
  {
    letter: "T",
    title: "Truth",
    description: "The perceived truth that becomes accepted as fact, even when flawed.",
    color: "bg-red-500"
  }
];

const classicExample = {
  myth: "Going outside without a hat causes colds",
  steps: [
    { letter: "F", text: "It's cold and raining outside." },
    { letter: "I", text: "If you go outside without an umbrella or hat, you'll catch a cold or flu." },
    { letter: "S", text: '"I remember when Tom went outside while it was cold without a hat—he caught the flu and had to be hospitalized."' },
    { letter: "T", text: "Going outside without a hat causes colds and flu." }
  ],
  reality: "Cold and wet conditions do not cause colds or flu—viruses do. But the myth persists because the F.I.S.T. cycle reinforces it."
};

const proofSteps = [
  {
    letter: "P",
    word: "Pledge Process",
    criticism: "Hazing",
    description: "Biblical guidance on navigating intake with integrity",
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community.",
    scripture: "Hebrews 10:24-25",
    scriptureText: "And let us consider how to stir up one another to love and good works...",
    example: {
      myth: "All pledging involves abusive hazing",
      truth: "True discipleship involves mentorship, not abuse. Jesus tested His disciples through teaching and experience, never through degradation."
    },
    icon: Target,
    color: "bg-blue-500",
    gradientColor: "from-blue-500 to-blue-600",
  },
  {
    letter: "R",
    word: "Rituals",
    criticism: "Demonic portals",
    description: "Discerning ceremonies through Scripture",
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption.",
    scripture: "1 Thessalonians 5:21",
    scriptureText: "Test everything; hold fast what is good.",
    example: {
      myth: "All Greek rituals are demonic or occult",
      truth: "Many rituals simply commemorate history and values. Even the early church had ceremonies. We must examine content, not just form."
    },
    icon: Sparkles,
    color: "bg-purple-500",
    gradientColor: "from-purple-500 to-purple-600",
  },
  {
    letter: "O",
    word: "Oaths",
    criticism: "Greek deity allegiance",
    description: "Understanding vows in light of Scripture",
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism.",
    scripture: "Acts 17:22-28",
    scriptureText: "For as I passed along and observed the objects of your worship...",
    example: {
      myth: "Greek letters represent worship of Greek gods",
      truth: "Greek letters are simply an alphabet. Using them is no different from using Roman numerals or Latin phrases. Paul wrote in Greek!"
    },
    icon: Scale,
    color: "bg-orange-500",
    gradientColor: "from-orange-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Obscurity",
    criticism: "Secret societies",
    description: "Addressing secrecy while walking in light",
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences.",
    scripture: "Mark 5:37",
    scriptureText: "And he allowed no one to follow him except Peter and James and John...",
    example: {
      myth: "Secret rituals mean there's something evil to hide",
      truth: "Even Jesus taught some things privately to His disciples. Privacy can protect sacred moments, not hide wickedness."
    },
    icon: Eye,
    color: "bg-green-500",
    gradientColor: "from-green-500 to-green-600",
  },
  {
    letter: "F",
    word: "Founders",
    criticism: "Masonic connections",
    description: "Examining history biblically",
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ.",
    scripture: "2 Corinthians 5:17",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation...",
    example: {
      myth: "Founders' beliefs forever define the organization",
      truth: "Many universities, hospitals, and even denominations have evolved beyond their founders' original beliefs. Transformation is biblical."
    },
    icon: Building,
    color: "bg-red-500",
    gradientColor: "from-red-500 to-red-600",
  },
];

export const FISTFramework = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setExpandedItem(prev => prev === key ? null : key);
  };

  return (
    <div className="space-y-6 mb-8">
      {/* F.I.S.T. Framework Card */}
      <Card className="border-2 border-sacred/20 bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-sacred" />
            <Badge variant="secondary" className="bg-sacred/10 text-sacred">Dr. Lyman's Framework</Badge>
          </div>
          <CardTitle className="text-xl">How Myths Become "Truth": The F.I.S.T. Framework</CardTitle>
          <p className="text-muted-foreground text-sm">
            Many accusations against Greek life follow a predictable pattern. What starts as an isolated fact gets interpreted, 
            wrapped in stories, and eventually solidifies into accepted "truth"—even when the underlying logic is flawed.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* F.I.S.T. Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fistSteps.map((step) => (
              <div key={step.letter} className="relative">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border">
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg mb-2`}>
                    {step.letter}
                  </div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Classic Example */}
          <div className="bg-muted/50 rounded-lg p-4 border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Classic Example: "{classicExample.myth}"
            </h4>
            <div className="space-y-2 mb-4">
              {classicExample.steps.map((step) => (
                <div key={step.letter} className="flex gap-3 items-start">
                  <span className="font-bold text-sacred min-w-[24px]">{step.letter} -</span>
                  <span className="text-sm text-muted-foreground">{step.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-sacred/10 rounded-lg p-3 border-l-4 border-sacred">
              <p className="text-sm font-medium">
                <strong>The Reality:</strong> {classicExample.reality}
              </p>
            </div>
          </div>

          {/* Transition to P.R.O.O.F. */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs font-medium">Now respond with biblical truth</span>
            <ArrowRight className="w-4 h-4" />
            <div className="h-px flex-1 bg-border" />
          </div>
        </CardContent>
      </Card>

      {/* P.R.O.O.F. Framework Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">Biblical Response</Badge>
          </div>
          <CardTitle className="text-xl">The P.R.O.O.F. Framework</CardTitle>
          <p className="text-muted-foreground text-sm">
            Once you recognize how myths form, use these biblical responses to address the 5 most common anti-Greek life criticisms. 
            <span className="text-primary font-medium"> Tap each card</span> to see examples.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* P.R.O.O.F. Steps - Expandable */}
          {proofSteps.map((step, index) => {
            const Icon = step.icon;
            const itemKey = step.letter + step.word;
            const isExpanded = expandedItem === itemKey;
            
            return (
              <Collapsible key={itemKey} open={isExpanded} onOpenChange={() => toggleItem(itemKey)}>
                <div className="rounded-lg bg-background border hover:border-primary/30 transition-colors overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 transition-colors">
                      <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${step.color} flex items-center justify-center shadow-sm`}>
                        <span className="text-sm font-bold text-white">{step.letter}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-foreground text-sm">{step.word}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                            {step.criticism}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="px-3 pb-3 space-y-2.5"
                        >
                          {/* Example Myth & Truth */}
                          <div className="bg-muted/30 rounded-lg p-2.5 border border-border/30 space-y-2">
                            <div>
                              <span className="text-[10px] font-medium text-destructive uppercase tracking-wide">Common Myth:</span>
                              <p className="text-xs text-muted-foreground italic">"{step.example.myth}"</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-medium text-primary uppercase tracking-wide">Biblical Truth:</span>
                              <p className="text-xs text-foreground">{step.example.truth}</p>
                            </div>
                          </div>

                          {/* Biblical Response */}
                          <div className="bg-background/80 rounded-lg p-2.5 border border-border/30">
                            <span className="text-[10px] font-medium text-foreground uppercase tracking-wide">Full Response:</span>
                            <p className="text-xs text-muted-foreground mt-1">{step.response}</p>
                          </div>

                          {/* Scripture Quote */}
                          <div className={`bg-gradient-to-r ${step.gradientColor} rounded-lg p-2.5`}>
                            <div className="flex gap-2">
                              <Quote className="w-3.5 h-3.5 text-white/80 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[11px] text-white/90 italic leading-relaxed">
                                  "{step.scriptureText}"
                                </p>
                                <p className="text-[10px] text-white/70 mt-1 font-medium">
                                  — {step.scripture}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}

          {/* CTA */}
          <div className="pt-2">
            <Link to="/proof-course">
              <Button variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                Learn Biblical Responses in P.R.O.O.F. Course
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
