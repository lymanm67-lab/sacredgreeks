import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Shield, 
  FileText, 
  Zap, 
  Users, 
  Rocket,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Download,
  Share2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  critical?: boolean;
  link?: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: "security",
    title: "Security & Privacy",
    icon: <Shield className="w-5 h-5" />,
    items: [
      { id: "rls_enabled", label: "Row Level Security enabled on all tables", critical: true },
      { id: "rls_healing_stories", label: "Healing stories require consent_to_publish for public view", critical: true },
      { id: "email_protection", label: "User emails not exposed in public queries", critical: true },
      { id: "admin_roles", label: "Admin roles properly configured in user_roles table", critical: true },
      { id: "password_protection", label: "Leaked password protection enabled", link: "/admin" },
      { id: "rate_limiting", label: "Rate limiting configured for API endpoints" },
      { id: "input_validation", label: "Input validation on all forms" },
      { id: "xss_protection", label: "XSS protection in place (no dangerouslySetInnerHTML with user input)" },
    ]
  },
  {
    id: "content",
    title: "Content & Data",
    icon: <FileText className="w-5 h-5" />,
    items: [
      { id: "devotionals_populated", label: "Daily devotionals populated for launch period" },
      { id: "daily_verses", label: "Daily verses configured" },
      { id: "study_guide_content", label: "Study guide sessions complete" },
      { id: "myth_buster_content", label: "Myth buster content reviewed and approved" },
      { id: "symbol_guide_content", label: "Symbol guide content accurate" },
      { id: "journey_content", label: "30-day journey content finalized" },
      { id: "faq_updated", label: "FAQ page updated with common questions" },
      { id: "about_page", label: "About page content reviewed" },
      { id: "privacy_policy", label: "Privacy policy up to date", critical: true },
      { id: "terms_of_service", label: "Terms of service reviewed", critical: true },
    ]
  },
  {
    id: "functionality",
    title: "Core Functionality",
    icon: <Zap className="w-5 h-5" />,
    items: [
      { id: "auth_signup", label: "User signup flow working" },
      { id: "auth_signin", label: "User signin flow working" },
      { id: "auth_signout", label: "User signout flow working" },
      { id: "password_reset", label: "Password reset flow working" },
      { id: "assessment_flow", label: "Sacred Greeks assessment complete and functional" },
      { id: "shattered_masks", label: "Shattered Masks assessment working" },
      { id: "devotional_display", label: "Daily devotional displays correctly" },
      { id: "prayer_journal", label: "Prayer journal CRUD operations working" },
      { id: "prayer_wall", label: "Prayer wall functionality working" },
      { id: "gamification", label: "Points and achievements system working" },
      { id: "push_notifications", label: "Push notification subscription working" },
      { id: "offline_mode", label: "PWA offline mode functioning" },
    ]
  },
  {
    id: "ux",
    title: "User Experience",
    icon: <Users className="w-5 h-5" />,
    items: [
      { id: "mobile_responsive", label: "All pages responsive on mobile" },
      { id: "dark_mode", label: "Dark mode working correctly" },
      { id: "loading_states", label: "Loading states display properly" },
      { id: "error_handling", label: "Error messages user-friendly" },
      { id: "toast_notifications", label: "Toast notifications working" },
      { id: "navigation", label: "Navigation intuitive and consistent" },
      { id: "onboarding", label: "Onboarding flow clear for new users" },
      { id: "accessibility", label: "Basic accessibility checks passed" },
      { id: "install_prompt", label: "PWA install prompt working" },
    ]
  },
  {
    id: "launch",
    title: "Launch Readiness",
    icon: <Rocket className="w-5 h-5" />,
    items: [
      { id: "domain_configured", label: "Custom domain configured (if applicable)" },
      { id: "ssl_certificate", label: "SSL certificate active" },
      { id: "analytics_setup", label: "Analytics tracking configured" },
      { id: "error_monitoring", label: "Error logging in place" },
      { id: "backup_strategy", label: "Database backup strategy confirmed" },
      { id: "beta_testers_invited", label: "Beta testers invited" },
      { id: "feedback_mechanism", label: "Feedback submission mechanism working" },
      { id: "support_contact", label: "Support contact information visible" },
      { id: "social_sharing", label: "Social sharing features working" },
      { id: "seo_basics", label: "Basic SEO meta tags in place" },
    ]
  }
];

const STORAGE_KEY = "beta-launch-checklist";

export default function BetaLaunchChecklist() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      setIsAdmin(!!data);
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (items: Record<string, boolean>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const toggleItem = (itemId: string) => {
    const newChecked = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newChecked);
    saveProgress(newChecked);
  };

  const getSectionProgress = (section: ChecklistSection) => {
    const checkedCount = section.items.filter(item => checkedItems[item.id]).length;
    return {
      checked: checkedCount,
      total: section.items.length,
      percentage: Math.round((checkedCount / section.items.length) * 100)
    };
  };

  const getTotalProgress = () => {
    const allItems = CHECKLIST_SECTIONS.flatMap(s => s.items);
    const checkedCount = allItems.filter(item => checkedItems[item.id]).length;
    return {
      checked: checkedCount,
      total: allItems.length,
      percentage: Math.round((checkedCount / allItems.length) * 100)
    };
  };

  const getCriticalItemsStatus = () => {
    const criticalItems = CHECKLIST_SECTIONS.flatMap(s => s.items.filter(i => i.critical));
    const checkedCritical = criticalItems.filter(item => checkedItems[item.id]).length;
    return {
      checked: checkedCritical,
      total: criticalItems.length,
      allComplete: checkedCritical === criticalItems.length
    };
  };

  const resetChecklist = () => {
    setCheckedItems({});
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Checklist reset");
  };

  const exportChecklist = () => {
    const report = CHECKLIST_SECTIONS.map(section => {
      const progress = getSectionProgress(section);
      return {
        section: section.title,
        progress: `${progress.checked}/${progress.total}`,
        items: section.items.map(item => ({
          item: item.label,
          status: checkedItems[item.id] ? "✅" : "❌",
          critical: item.critical ? "⚠️ Critical" : ""
        }))
      };
    });

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `beta-launch-checklist-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Checklist exported");
  };

  const totalProgress = getTotalProgress();
  const criticalStatus = getCriticalItemsStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-sacred border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
            <p className="text-muted-foreground mb-4">
              This page is only accessible to administrators.
            </p>
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Beta Launch Checklist</h1>
                <p className="text-sm text-muted-foreground">Final review before going live</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetChecklist}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={exportChecklist}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Overall Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {totalProgress.percentage === 100 ? (
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  ) : (
                    <Rocket className="w-7 h-7 text-sacred" />
                  )}
                  {totalProgress.percentage}% Complete
                </h2>
                <p className="text-muted-foreground">
                  {totalProgress.checked} of {totalProgress.total} items checked
                </p>
              </div>
              <div className="flex items-center gap-3">
                {criticalStatus.allComplete ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    All Critical Items Complete
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {criticalStatus.total - criticalStatus.checked} Critical Items Remaining
                  </Badge>
                )}
              </div>
            </div>
            <Progress value={totalProgress.percentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Launch Ready Status */}
        {totalProgress.percentage === 100 && (
          <Card className="mb-8 border-green-500/50 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                    Ready for Beta Launch! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    All checklist items have been completed. Your app is ready to go live.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Checklist Sections */}
        <div className="space-y-6">
          {CHECKLIST_SECTIONS.map((section) => {
            const progress = getSectionProgress(section);
            return (
              <Card key={section.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sacred/10 text-sacred">
                        {section.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>
                          {progress.checked} of {progress.total} complete
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{progress.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={progress.percentage} className="h-2 mt-3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          checkedItems[item.id] 
                            ? "bg-green-500/10" 
                            : item.critical 
                              ? "bg-destructive/5" 
                              : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <Checkbox
                          id={item.id}
                          checked={checkedItems[item.id] || false}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={item.id}
                            className={`font-medium cursor-pointer ${
                              checkedItems[item.id] ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {item.label}
                            {item.critical && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                Critical
                              </Badge>
                            )}
                          </label>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(item.link!)}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          {totalProgress.percentage === 100 && (
            <Button className="bg-green-500 hover:bg-green-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share Launch Status
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}