import { ArrowLeft, Users, Trophy, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GamificationBar } from "@/components/GamificationBar";
import { AchievementsList } from "@/components/AchievementsList";
import { OrgAchievementsList } from "@/components/OrgAchievementsList";
import { NextLevelMotivation } from "@/components/NextLevelMotivation";
import { PointsRoadmap } from "@/components/gamification/PointsRoadmap";
import { LevelUpCelebration } from "@/components/gamification/LevelUpCelebration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGamification } from "@/hooks/use-gamification";

const Achievements = () => {
  const { isShowingDemo, stats } = useGamification();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [celebratedLevel, setCelebratedLevel] = useState<number>(1);
  const previousLevelRef = useRef<number | null>(null);

  // Detect level-up from stats change
  useEffect(() => {
    if (stats?.current_level) {
      if (previousLevelRef.current !== null && stats.current_level > previousLevelRef.current) {
        setCelebratedLevel(stats.current_level);
        setShowLevelUp(true);
      }
      previousLevelRef.current = stats.current_level;
    }
  }, [stats?.current_level]);

  // Listen for level-up events from other parts of the app
  useEffect(() => {
    const handleLevelUp = (event: CustomEvent<{ newLevel: number }>) => {
      setCelebratedLevel(event.detail.newLevel);
      setShowLevelUp(true);
    };

    window.addEventListener('level-up', handleLevelUp as EventListener);
    return () => window.removeEventListener('level-up', handleLevelUp as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold">Achievements & Progress</h1>
              <p className="text-muted-foreground">
                Track your spiritual journey and unlock achievements
              </p>
            </div>
            {isShowingDemo && (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                <FlaskConical className="w-3 h-3 mr-1" />
                Demo
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <GamificationBar />
          
          {/* Points Roadmap */}
          <PointsRoadmap />
          
          <NextLevelMotivation />
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                All Achievements
              </TabsTrigger>
              <TabsTrigger value="org" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                My Organization
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <AchievementsList />
            </TabsContent>
            <TabsContent value="org" className="mt-6">
              <OrgAchievementsList />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Level Up Celebration Modal */}
      {showLevelUp && celebratedLevel > 0 && (
        <LevelUpCelebration 
          show={showLevelUp} 
          newLevel={celebratedLevel} 
          onClose={() => setShowLevelUp(false)} 
        />
      )}
    </div>
  );
};

export default Achievements;
