import { motion } from "framer-motion";
import { Target, Sparkles, Scale, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const proofSteps = [
  {
    letter: "P",
    word: "Purpose",
    description: "What is the organization's core purpose and mission?",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
  },
  {
    letter: "R",
    word: "Rituals",
    description: "What rituals and practices are involved in membership?",
    icon: Sparkles,
    color: "from-purple-500 to-violet-600",
  },
  {
    letter: "O",
    word: "Obligations",
    description: "What commitments and responsibilities are required?",
    icon: Scale,
    color: "from-amber-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Outcomes",
    description: "What are the spiritual outcomes of participation?",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
  },
  {
    letter: "F",
    word: "Fellowship",
    description: "How does it affect your Christian community?",
    icon: Users,
    color: "from-rose-500 to-pink-600",
  },
];

export function ProofFrameworkSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              Our Framework
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              The{" "}
              <span className="bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">
                P.R.O.O.F.
              </span>{" "}
              Framework
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              A biblical approach to evaluating Greek life membership while maintaining your Christian faith and values.
            </p>
          </motion.div>

          {/* Framework Steps */}
          <div className="grid gap-3 sm:gap-4">
            {proofSteps.map((step, index) => (
              <motion.div
                key={step.letter + step.word}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card/80 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                {/* Letter Badge */}
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                >
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {step.letter}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      {step.word}
                    </h3>
                    <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link to="/proof-course">
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              >
                Learn More About P.R.O.O.F.
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
