import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GamificationBar } from "@/components/GamificationBar";
import { AchievementsList } from "@/components/AchievementsList";

const Achievements = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Achievements & Progress</h1>
            <p className="text-muted-foreground">
              Track your spiritual journey and unlock achievements
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <GamificationBar />
          <AchievementsList />
        </div>
      </div>
    </div>
  );
};

export default Achievements;
