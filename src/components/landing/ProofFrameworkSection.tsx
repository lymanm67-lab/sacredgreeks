import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles, Scale, Eye, Building, ChevronDown, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const STORAGE_KEY = "proof-section-expanded";

const proofSteps = [
  {
    letter: "P",
    word: "Pledge Process",
    criticism: "Hazing concerns",
    description: "Biblical guidance on navigating intake processes with integrity",
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community.",
    scripture: "Hebrews 10:24-25",
    scriptureText: "And let us consider how to stir up one another to love and good works...",
    icon: Target,
    color: "bg-blue-500",
    gradientColor: "from-blue-500 to-blue-600",
  },
  {
    letter: "R",
    word: "Rituals",
    criticism: "Demonic portals",
    description: "Discerning ceremonial practices through a scriptural lens",
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption.",
    scripture: "1 Thessalonians 5:21",
    scriptureText: "Test everything; hold fast what is good.",
    icon: Sparkles,
    color: "bg-purple-500",
    gradientColor: "from-purple-500 to-purple-600",
  },
  {
    letter: "O",
    word: "Oaths",
    criticism: "Greek deity allegiance",
    description: "Understanding vows and commitments in light of Scripture",
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism.",
    scripture: "Acts 17:22-28",
    scriptureText: "For as I passed along and observed the objects of your worship...",
    icon: Scale,
    color: "bg-orange-500",
    gradientColor: "from-orange-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Obscurity",
    criticism: "Secret societies",
    description: "Addressing secrecy concerns while walking in the light",
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences.",
    scripture: "Mark 5:37",
    scriptureText: "And he allowed no one to follow him except Peter and James and John...",
    icon: Eye,
    color: "bg-green-500",
    gradientColor: "from-green-500 to-green-600",
  },
  {
    letter: "F",
    word: "Founders",
    criticism: "Masonic connections",
    description: "Examining organizational history and foundations biblically",
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ.",
    scripture: "2 Corinthians 5:17",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation...",
    icon: Building,
    color: "bg-red-500",
    gradientColor: "from-red-500 to-red-600",
  },
];

export function ProofFrameworkSection() {
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isOpen));
  }, [isOpen]);

  const toggleItem = (key: string) => {
    setExpandedItem(prev => prev === key ? null : key);
  };

  return (
    <section className="py-10 sm:py-12 w-full max-w-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="bg-card/80 border border-border/50 rounded-xl overflow-hidden">
          {/* Compact Header - Always Visible */}
          <CollapsibleTrigger asChild>
            <button className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Letter badges in a row */}
                <div className="flex -space-x-1">
                  {proofSteps.map((step, index) => (
                    <div
                      key={step.letter + index}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${step.color} flex items-center justify-center border-2 border-background shadow-sm`}
                    >
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {step.letter}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    The P.R.O.O.F. Framework
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Biblical responses to common Greek life criticisms
                  </p>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </button>
          </CollapsibleTrigger>

          {/* Expandable Content */}
          <CollapsibleContent>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2 sm:space-y-3"
                >
                  <div className="h-px bg-border mb-3" />
                  
                  {proofSteps.map((step, index) => {
                    const itemKey = step.letter + step.word;
                    const isItemExpanded = expandedItem === itemKey;
                    
                    return (
                      <Collapsible key={itemKey} open={isItemExpanded} onOpenChange={() => toggleItem(itemKey)}>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="rounded-lg bg-muted/30 border border-border/30 overflow-hidden"
                        >
                          <CollapsibleTrigger asChild>
                            <button className="w-full flex items-start gap-3 p-2.5 sm:p-3 hover:bg-muted/50 transition-colors text-left">
                              {/* Letter Badge */}
                              <div
                                className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${step.color} flex items-center justify-center shadow-sm`}
                              >
                                <span className="text-sm font-bold text-white">
                                  {step.letter}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-medium text-foreground text-sm">
                                    {step.word}
                                  </h4>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                    {step.criticism}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                              
                              <motion.div
                                animate={{ rotate: isItemExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              >
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                            </button>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <AnimatePresence>
                              {isItemExpanded && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="px-3 pb-3 space-y-2"
                                >
                                  {/* Response */}
                                  <div className="bg-background/50 rounded-lg p-2.5 border border-border/30">
                                    <span className="text-[10px] font-medium text-primary uppercase tracking-wide">Biblical Response:</span>
                                    <p className="text-xs text-foreground mt-1">{step.response}</p>
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
                        </motion.div>
                      </Collapsible>
                    );
                  })}

                  {/* CTA */}
                  <div className="pt-2">
                    <Link to="/proof-course" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-xs sm:text-sm"
                      >
                        Learn More About P.R.O.O.F.
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
}
