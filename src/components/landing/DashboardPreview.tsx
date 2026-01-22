import { Zap, Shield, BookOpen, Sparkles, ArrowRight, Video, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "MythBusters",
    subtitle: "Debunk Greek Life Misconceptions",
    description: "Get biblical answers to common objections about Greek life and faith compatibility.",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGlow: "bg-amber-500/20",
    highlights: ["50+ Myths Debunked", "Scripture-Based", "Shareable Cards"],
  },
  {
    icon: Shield,
    title: "Symbols & Rituals Guide",
    subtitle: "Understand Hidden Meanings",
    description: "Explore the biblical and historical context behind Greek letters, rituals, and traditions.",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    bgGlow: "bg-purple-500/20",
    highlights: ["100+ Symbols", "Historical Context", "Faith Connections"],
  },
  {
    icon: BookOpen,
    title: "Greek Life Bible Study",
    subtitle: "Faith Foundations for Greeks",
    description: "Dive deep into scripture with studies designed specifically for the Greek experience.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGlow: "bg-emerald-500/20",
    highlights: ["12-Week Journey", "Group Guides", "Interactive Flashcards"],
  },
  {
    icon: Video,
    title: "Video Library",
    subtitle: "Learn Through Powerful Stories",
    description: "Watch testimonies, teachings, and discussions from Greeks who've navigated faith and fraternity life.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGlow: "bg-rose-500/20",
    highlights: ["50+ Videos", "Testimonies", "Teaching Series"],
  },
  {
    icon: Users,
    title: "Church Leaders",
    subtitle: "Guidance From Trusted Voices",
    description: "Connect with pastors and ministry leaders who understand the unique challenges of Greek life.",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    bgGlow: "bg-sky-500/20",
    highlights: ["Expert Insights", "Ministry Resources", "Leadership Tips"],
  },
];

export function DashboardPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Featured Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Thrive
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Powerful resources built by Greeks, for Greeks — grounded in faith and designed for your journey.
          </p>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative"
          >
            {/* Glow effect on hover */}
            <div className={`absolute -inset-1 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
            
            <div className="relative h-full bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden">
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className={`text-xs sm:text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-2`}>
                {feature.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {feature.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* CTA hint */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 sm:mt-14 text-center"
      >
        <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 rounded-full bg-muted/50 border border-border/50">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/60 to-primary border-2 border-background flex items-center justify-center"
              >
                <span className="text-[10px] sm:text-xs font-bold text-primary-foreground">
                  {["ΑΦΑ", "ΔΣΘ", "ΚΑΨ", "ΑΚΑ"][i - 1]}
                </span>
              </div>
            ))}
          </div>
          <div className="h-6 w-px bg-border" />
          <p className="text-xs sm:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">500+</span> Greeks growing in faith
          </p>
        </div>
      </motion.div>
    </div>
  );
}
