import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles, Scale, Eye, Building, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const proofSteps = [
  {
    letter: "P",
    word: "Pledge Process",
    description: "How does the intake and pledging process align with biblical values?",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
  },
  {
    letter: "R",
    word: "Rituals",
    description: "What rituals are involved and do they honor God?",
    icon: Sparkles,
    color: "from-purple-500 to-violet-600",
  },
  {
    letter: "O",
    word: "Oaths",
    description: "What oaths and vows are required of members?",
    icon: Scale,
    color: "from-amber-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Obscurity",
    description: "What is kept secret and does it conflict with walking in the light?",
    icon: Eye,
    color: "from-emerald-500 to-teal-600",
  },
  {
    letter: "F",
    word: "Founders",
    description: "What is the foundation and history of the organization?",
    icon: Building,
    color: "from-rose-500 to-pink-600",
  },
];

export function ProofFrameworkSection() {
  const [isOpen, setIsOpen] = useState(false);

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
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center border-2 border-background shadow-sm`}
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
                    A biblical approach to evaluating Greek life
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
                  
                  {proofSteps.map((step, index) => (
                    <motion.div
                      key={step.letter + step.word}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30 border border-border/30"
                    >
                      {/* Letter Badge */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}
                      >
                        <span className="text-sm font-bold text-white">
                          {step.letter}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm">
                          {step.word}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}

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
