import { BookOpen, TrendingUp, Calendar, Library, MessageCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto px-0 sm:px-4 py-6 sm:py-8">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">
          What You'll Experience
        </p>
        <h2 className="text-sm sm:text-lg font-semibold text-foreground">
          Your Personal Faith Dashboard
        </h2>
      </div>

      {/* Mock Dashboard Preview */}
      <div className="relative">
        {/* Gradient overlay for depth effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Dashboard mockup container */}
        <div className="bg-muted/30 rounded-lg sm:rounded-xl border border-border/50 p-2 sm:p-4 shadow-lg overflow-hidden">
          {/* Stats Row - 3 columns on all sizes */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-2 sm:mb-4">
            <div className="bg-background rounded-md sm:rounded-lg p-2 sm:p-3 border border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground">7</p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-md sm:rounded-lg p-2 sm:p-3 border border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground">12</p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground">Days Done</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-md sm:rounded-lg p-2 sm:p-3 border border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold text-foreground">✓</p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Row - Stack on mobile, row on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3">
            {/* Mobile: Horizontal cards, Desktop: Vertical cards */}
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <CardContent className="p-2 sm:p-3">
                <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center sm:mb-2 flex-shrink-0">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-xs font-medium text-foreground">Daily Devotions</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Scripture & reflection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-violet-600" />
              <CardContent className="p-2 sm:p-3">
                <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center sm:mb-2 flex-shrink-0">
                    <Library className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-xs font-medium text-foreground">Mythbuster</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Biblical responses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-background/80 overflow-hidden">
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              <CardContent className="p-2 sm:p-3">
                <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center sm:mb-2 flex-shrink-0">
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-xs font-medium text-foreground">P.R.O.O.F. Guide</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Handle objections</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust indicator */}
      <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4">
        Trusted by Greek Christians across 50+ organizations
      </p>
    </div>
  );
}
