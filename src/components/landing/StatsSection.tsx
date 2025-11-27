import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Users, BookOpen, Heart, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 2500,
    suffix: '+',
    label: 'Community Members',
    color: 'text-sacred',
  },
  {
    icon: BookOpen,
    value: 15000,
    suffix: '+',
    label: 'Devotionals Completed',
    color: 'text-warm-blue',
  },
  {
    icon: Heart,
    value: 8500,
    suffix: '+',
    label: 'Prayers Shared',
    color: 'text-warm-purple',
  },
  {
    icon: Award,
    value: 5000,
    suffix: '+',
    label: 'Assessments Taken',
    color: 'text-sacred',
  },
];

export const StatsSection = () => {
  return (
    <div className="bg-gradient-to-b from-background to-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 animate-fade-in-up">
            Trusted by <span className="gradient-text">Christians in Greek Life</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover-lift animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
