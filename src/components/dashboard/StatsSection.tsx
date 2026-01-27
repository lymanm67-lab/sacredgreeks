import { TrendingUp, FileText, BookOpen, Flame, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsSectionProps {
  stats: {
    currentStreak: number;
    assessmentCount: number;
    devotionalCompleted: boolean;
  };
  isDemoStats: boolean;
}

export const StatsSection = ({ stats, isDemoStats }: StatsSectionProps) => {
  const statCards = [
    {
      icon: Flame,
      value: stats.currentStreak,
      label: isDemoStats ? "Sample Streak" : "Day Streak",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: FileText,
      value: stats.assessmentCount,
      label: isDemoStats ? "Sample Count" : "Assessments",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: BookOpen,
      value: stats.devotionalCompleted ? '✓' : '○',
      label: isDemoStats ? "Sample Status" : stats.devotionalCompleted ? 'Devotional Done' : 'Not Yet',
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Progress</h2>
            <p className="text-sm text-muted-foreground">Track your spiritual journey</p>
          </div>
        </div>
        {isDemoStats && (
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-semibold">
            Sample Data
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 group cursor-default"
          >
            {/* Gradient accent on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            
            <div className="relative flex items-center gap-4">
              <motion.div 
                className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </motion.div>
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
