import { BookOpen, TrendingUp, Calendar, Library, MessageCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          What You'll Experience
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Your Personal Faith Dashboard
        </h2>
      </div>

      {/* Mock Dashboard Preview */}
      <div className="relative">
        {/* Gradient overlay for depth effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Dashboard mockup container */}
        <div className="bg-muted/30 rounded-xl border border-border/50 p-4 shadow-lg overflow-hidden">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">7</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Days Complete</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">✓</p>
                  <p className="text-xs text-muted-foreground">Today Done</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Row */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-2">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs font-medium text-foreground">Daily Devotions</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">Scripture & reflection</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-600" />
              <CardContent className="p-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-2">
                  <Library className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs font-medium text-foreground">Mythbuster</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">Biblical responses</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              <CardContent className="p-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-2">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs font-medium text-foreground">P.R.O.O.F. Guide</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">Handle objections</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust indicator */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Trusted by Greek Christians across 50+ organizations
      </p>
    </div>
  );
}
