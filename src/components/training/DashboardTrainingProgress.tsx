import { Target, Landmark, BookOpen, Calendar, BookHeart } from "lucide-react";
import { TrainingProgressWidget } from "./TrainingProgressWidget";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";

export function DashboardTrainingProgress() {
  const { progressData, isLoading } = useNavigationProgress();

  if (isLoading || !progressData) {
    return null;
  }

  const trainings = [
    {
      title: "P.R.O.O.F. Course",
      description: "Biblical framework for Greek life",
      icon: <Target className="w-6 h-6 text-white" />,
      progress: progressData.proofCourse,
      totalModules: 5,
      completedModules: Math.round((progressData.proofCourse / 100) * 5),
      href: "/proof-course",
      accentColor: "amber",
    },
    {
      title: "Ancient Guild Training",
      description: "Jesus & Paul's trade associations",
      icon: <Landmark className="w-6 h-6 text-white" />,
      progress: progressData.guildTraining,
      totalModules: 10,
      completedModules: Math.round((progressData.guildTraining / 100) * 10),
      href: "/ancient-guild-training",
      accentColor: "amber",
    },
    {
      title: "Faith & Authority",
      description: "Power of belief teaching",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      progress: progressData.faithAuthority,
      totalModules: 5,
      completedModules: Math.round((progressData.faithAuthority / 100) * 5),
      href: "/faith-authority",
      accentColor: "purple",
    },
    {
      title: "30-Day Journey",
      description: "Daily spiritual growth",
      icon: <Calendar className="w-6 h-6 text-white" />,
      progress: progressData.journey,
      totalModules: 30,
      completedModules: Math.round((progressData.journey / 100) * 30),
      href: "/journey",
      accentColor: "blue",
    },
    {
      title: "Prayer Journal",
      description: "Track your prayer life",
      icon: <BookHeart className="w-6 h-6 text-white" />,
      progress: progressData.prayerJournal,
      totalModules: 10,
      completedModules: Math.min(Math.round((progressData.prayerJournal / 100) * 10), 10),
      href: "/prayer-journal",
      accentColor: "rose",
    },
  ];

  // Only show trainings with some progress or first two
  const visibleTrainings = trainings.filter((t, i) => t.progress > 0 || i < 2);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Your Training Progress</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleTrainings.map((training) => (
          <TrainingProgressWidget
            key={training.href}
            {...training}
          />
        ))}
      </div>
    </div>
  );
}
