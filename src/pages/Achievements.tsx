import { ArrowLeft, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GamificationBar } from "@/components/GamificationBar";
import { AchievementsList } from "@/components/AchievementsList";
import { OrgAchievementsList } from "@/components/OrgAchievementsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    </div>
  );
};

export default Achievements;
