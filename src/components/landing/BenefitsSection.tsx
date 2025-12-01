import { CheckCircle2, Clock, Heart, Users, Trophy, BookOpen } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: "Daily Habit Builder",
    description: "Morning devotionals & verse of the day make spiritual growth part of your routine"
  },
  {
    icon: Heart,
    title: "Org-Specific Content",
    description: "Devotionals, prayers & study guides tailored to your Greek council's values"
  },
  {
    icon: Users,
    title: "Prayer Community",
    description: "Prayer Wall & forum connect you with brothers and sisters in faith"
  },
  {
    icon: Trophy,
    title: "Track Your Growth",
    description: "Achievements, streaks & milestones celebrate your spiritual journey"
  },
  {
    icon: BookOpen,
    title: "P.R.O.O.F. Framework",
    description: "Navigate Greek life challenges with biblical guidance that works"
  }
];

export function BenefitsSection() {
  return (
    <div className="bg-gradient-to-b from-muted/30 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in-up">
            Built for Your <span className="gradient-text">Daily Walk</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to grow spiritually while honoring your Greek membership
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group flex items-start gap-4 p-5 rounded-xl bg-card/50 border border-border/50 hover-lift animate-fade-in-up hover:border-sacred/30 transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center group-hover:bg-sacred/20 transition-colors">
                  <benefit.icon className="w-5 h-5 text-sacred" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
