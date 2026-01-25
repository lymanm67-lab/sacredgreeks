import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Shield, BookOpen, Sparkles, ArrowRight, Video, UserCheck, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Primary features - highest conversion potential
const primaryFeatures = [
  {
    icon: Zap,
    title: "MythBusters",
    subtitle: "Debunk Greek Life Misconceptions",
    description: "Get biblical answers to common objections about Greek life and faith compatibility.",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGlow: "bg-orange-500/20",
    highlights: ["50+ Myths Debunked", "Scripture-Based", "Shareable Cards"],
    href: "/myth-buster",
  },
  {
    icon: Shield,
    title: "Symbols & Rituals Guide",
    subtitle: "Understand Hidden Meanings",
    description: "Explore the biblical and historical context behind Greek letters, rituals, and traditions.",
    gradient: "from-violet-500 via-fuchsia-500 to-purple-600",
    bgGlow: "bg-fuchsia-500/20",
    highlights: ["100+ Symbols", "Historical Context", "Faith Connections"],
    href: "/symbols",
  },
  {
    icon: AlertTriangle,
    title: "Anti-Hazing Resources",
    subtitle: "Protect & Educate Your Chapter",
    description: "Access vital hazing prevention tools, success stories, and memorial resources to keep your organization safe.",
    gradient: "from-red-500 via-rose-600 to-pink-600",
    bgGlow: "bg-red-500/20",
    highlights: ["Prevention Tools", "Success Stories", "Memorial Wall"],
    href: "/anti-hazing",
  },
];

// Secondary features - revealed on expand
const secondaryFeatures = [
  {
    icon: BookOpen,
    title: "Greek Life Bible Study",
    subtitle: "Faith Foundations for Greeks",
    description: "Dive deep into scripture with studies designed specifically for the Greek experience.",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    highlights: ["12-Week Journey", "Group Guides", "Interactive Flashcards"],
    href: "/bible-study",
  },
  {
    icon: Video,
    title: "Video Library",
    subtitle: "Learn Through Powerful Stories",
    description: "Watch testimonies, teachings, and discussions from Greeks who've navigated faith and fraternity life.",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    bgGlow: "bg-pink-500/20",
    highlights: ["50+ Videos", "Testimonies", "Teaching Series"],
    href: "/content-hub",
  },
  {
    icon: UserCheck,
    title: "Church Leaders",
    subtitle: "Guidance From Trusted Voices",
    description: "Connect with pastors and ministry leaders who understand the unique challenges of Greek life.",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    bgGlow: "bg-purple-500/20",
    highlights: ["Expert Insights", "Ministry Resources", "Leadership Tips"],
    href: "/church-leaders",
  },
];

interface FeatureCardProps {
  feature: typeof primaryFeatures[0];
  index: number;
  baseDelay?: number;
}

const FeatureCard = ({ feature, index, baseDelay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: baseDelay + index * 0.15 }}
    className="group relative"
  >
    <Link to={feature.href} className="block h-full">
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 ${feature.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      
      <div className="relative h-full bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden cursor-pointer">
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
          <span>Explore Demo</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export function DashboardPreview() {
  const [showMore, setShowMore] = useState(false);

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

      {/* Primary Feature Cards - Always visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {primaryFeatures.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Explore More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowMore(!showMore)}
          className="gap-2 px-6 py-3 rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group"
        >
          <span className="font-medium">
            {showMore ? "Show Less" : "Explore More Tools"}
          </span>
          {showMore ? (
            <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </Button>
      </motion.div>

      {/* Secondary Feature Cards - Expandable */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
              {secondaryFeatures.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} baseDelay={0.1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
