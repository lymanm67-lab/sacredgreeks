import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Quote, AlertTriangle, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PROOF_FRAMEWORK_DATA, generateShareableText } from "@/lib/proofFrameworkData";
import { toast } from "sonner";

const STORAGE_KEY = "proof-section-expanded";

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
                  {PROOF_FRAMEWORK_DATA.map((step, index) => (
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
                  
                  {PROOF_FRAMEWORK_DATA.map((step, index) => {
                    const itemKey = step.letter + step.title;
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
                                    {step.title}
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
