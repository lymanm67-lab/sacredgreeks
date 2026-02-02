import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Menu,
  Home, 
  Target,
  ClipboardCheck,
  Calendar,
  BookHeart,
  BookOpen, 
  Heart,
  MessageSquare,
  Users, 
  GraduationCap,
  ShieldAlert,
  Compass,
  Zap,
  Trophy,
  Award,
  FileText,
  Bell,
  Settings, 
  LogOut,
  Church,
  Video,
  Building2,
  Landmark,
  User,
  ShoppingBag,
  Headphones,
  Mic,
  Sparkles,
  Drama,
  History,
  Scale,
  Crown,
  CalendarDays,
  MapPin,
  UserPlus,
  Briefcase,
  Cross,
  Music,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useFeaturePreferences } from "@/hooks/use-feature-preferences";
import { SubscriptionBadge } from "@/components/dashboard/SubscriptionBadge";
import { DemoModeControl } from "@/components/GlobalDemoIndicator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// Dashboard - Always first
const dashboardItem = [
  { title: "Dashboard", url: "/dashboard", icon: Home, featureId: null, iconColor: "text-blue-500" },
];

// Learning Path section - matches AppSidebar
const learningPathItems = [
  { title: "PROOF Course", url: "/proof-course", icon: Target, featureId: null, iconColor: "text-amber-500" },
  { title: "Greek Life & Guild", url: "/greek-life-training", icon: Building2, featureId: null, iconColor: "text-violet-500" },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, featureId: null, iconColor: "text-yellow-500" },
  { title: "Faith & Authority", url: "/faith-authority", icon: BookOpen, featureId: null, iconColor: "text-amber-500" },
  { title: "Stay or Leave?", url: "/should-you-stay-or-leave", icon: Scale, featureId: null, iconColor: "text-teal-500" },
  { title: "Saints or Sellouts?", url: "/saints-or-sellouts", icon: Crown, featureId: null, iconColor: "text-orange-500" },
  { title: "Hidden in Plain Sight", url: "/hidden-in-plain-sight", icon: Landmark, featureId: null, iconColor: "text-rose-500" },
];

// Assessments section - matches AppSidebar
const assessmentItems = [
  { title: "Faith Snapshot", url: "/snapshot", icon: Sparkles, featureId: null, iconColor: "text-blue-500" },
  { title: "PROOF Quiz", url: "/proof-assessment", icon: ClipboardCheck, featureId: null, iconColor: "text-emerald-500" },
  { title: "Shattered Masks", url: "/shattered-masks", icon: Drama, featureId: null, iconColor: "text-purple-500" },
  { title: "Assessment History", url: "/assessment-history", icon: History, featureId: null, iconColor: "text-slate-500" },
];

// Spiritual Practices section - matches AppSidebar
const spiritualPracticesItems = [
  { title: "30-Day Journey", url: "/journey", icon: Calendar, featureId: null, iconColor: "text-cyan-500" },
  { title: "Bible Study", url: "/bible-study", icon: BookOpen, featureId: null, iconColor: "text-purple-500" },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, featureId: null, iconColor: "text-rose-500" },
];

// Community section - all community features merged (matches AppSidebar)
const communityItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: Heart, featureId: null, iconColor: "text-pink-500" },
  { title: "Forum", url: "/forum", icon: MessageSquare, featureId: null, iconColor: "text-cyan-500" },
  { title: "Events Calendar", url: "/events", icon: CalendarDays, featureId: null, iconColor: "text-purple-500" },
  { title: "Chapter Finder", url: "/chapters", icon: MapPin, featureId: null, iconColor: "text-blue-500" },
  { title: "Member Network", url: "/network", icon: UserPlus, featureId: null, iconColor: "text-pink-500" },
  { title: "Business Directory", url: "/business-directory", icon: Briefcase, featureId: null, iconColor: "text-emerald-500" },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500" },
  { title: "Group Coaching", url: "/community", icon: GraduationCap, featureId: null, iconColor: "text-orange-500" },
];

// About Dr. Lyman section - matches AppSidebar
const aboutDrLymanItems = [
  { title: "About Creator", url: "/about-creator", icon: User, featureId: null, iconColor: "text-sacred" },
  { title: "Order Book", url: "/order-book", icon: ShoppingBag, featureId: null, iconColor: "text-amber-500" },
  { title: "Book Dr. Lyman", url: "/speaking-request", icon: Calendar, featureId: null, iconColor: "text-fuchsia-500" },
];

// Podcast section - matches AppSidebar
const podcastItems = [
  { title: "Podcast", url: "/podcast", icon: Headphones, featureId: null, iconColor: "text-purple-500" },
  { title: "Be on Podcast", url: "/guest-panelist-application", icon: Mic, featureId: null, iconColor: "text-purple-500" },
];

// Resources section - matches AppSidebar
const resourcesItems = [
  { title: "Chaplain Toolkit", url: "/chaplain-toolkit", icon: Cross, featureId: null, iconColor: "text-sacred" },
  { title: "Worship Playlists", url: "/worship-playlists", icon: Music, featureId: null, iconColor: "text-purple-500" },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Compass, featureId: null, iconColor: "text-teal-500" },
  { title: "Video Library", url: "/video-library", icon: Video, featureId: null, iconColor: "text-sky-500" },
  { title: "Parents & Family", url: "/parents-family", icon: Heart, featureId: null, iconColor: "text-rose-500" },
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null, iconColor: "text-red-500" },
  { title: "Church Leaders", url: "/church-leaders", icon: Church, featureId: null, iconColor: "text-lime-500" },
];

// System section - matches AppSidebar
const systemItems = [
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: null, iconColor: "text-amber-400" },
  { title: "Training Vault", url: "/training-vault", icon: Award, featureId: null, iconColor: "text-emerald-500" },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null, iconColor: "text-fuchsia-500" },
  { title: "Changelog", url: "/changelog", icon: FileText, featureId: null, iconColor: "text-sky-500" },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { isFeatureVisible } = useFeaturePreferences();

  const isActive = (path: string) => location.pathname === path;

  const filterNavItems = (items: typeof dashboardItem) => {
    return items.filter(item => {
      if (!item.featureId) return true;
      return isFeatureVisible(item.featureId);
    });
  };

  const filteredDashboard = filterNavItems(dashboardItem);
  const filteredLearningPath = filterNavItems(learningPathItems);
  const filteredAssessments = filterNavItems(assessmentItems);
  const filteredSpiritualPractices = filterNavItems(spiritualPracticesItems);
  const filteredCommunity = filterNavItems(communityItems);
  const filteredAboutDrLyman = filterNavItems(aboutDrLymanItems);
  const filteredPodcast = filterNavItems(podcastItems);
  const filteredResources = filterNavItems(resourcesItems);
  const filteredSystem = filterNavItems(systemItems);

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  const NavSection = ({ title, items, badge, defaultOpen = true }: { title: string; items: typeof dashboardItem; badge?: string; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              {title}
              {badge && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary">
                  {badge}
                </Badge>
              )}
            </h3>
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen ? "rotate-0" : "-rotate-90"
            )} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-1">
            {items.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive(item.url) 
                    ? "bg-sacred/10 text-sacred font-medium" 
                    : "hover:bg-muted"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", item.iconColor)} />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="-ml-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sacred to-sacred/70 flex items-center justify-center shrink-0">
              <span className="text-white font-bold">SG</span>
            </div>
            <div className="flex flex-col">
              <SheetTitle className="text-left">Sacred Greeks</SheetTitle>
              {profile?.greek_organization && (
                <Badge variant="secondary" className="text-xs w-fit mt-0.5">
                  {profile.greek_organization}
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <SubscriptionBadge />
            <DemoModeControl />
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-2">
            {filteredDashboard.length > 0 && (
              <NavSection title="Dashboard" items={filteredDashboard} />
            )}
            {filteredLearningPath.length > 0 && (
              <NavSection title="Learning Path" items={filteredLearningPath} />
            )}
            {filteredAssessments.length > 0 && (
              <NavSection title="Assessments" items={filteredAssessments} badge="Earn Points" />
            )}
            {filteredSpiritualPractices.length > 0 && (
              <NavSection title="Spiritual Practices" items={filteredSpiritualPractices} />
            )}
            {filteredCommunity.length > 0 && (
              <NavSection title="Greek Community" items={filteredCommunity} />
            )}
            {filteredAboutDrLyman.length > 0 && (
              <NavSection title="About Dr. Lyman" items={filteredAboutDrLyman} defaultOpen={false} />
            )}
            {filteredPodcast.length > 0 && (
              <NavSection title="Podcast" items={filteredPodcast} defaultOpen={false} />
            )}
            {filteredResources.length > 0 && (
              <NavSection title="Resources" items={filteredResources} defaultOpen={false} />
            )}
            {filteredSystem.length > 0 && (
              <NavSection title="System" items={filteredSystem} defaultOpen={false} />
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-sacred/20 text-sacred text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">
                    {profile?.full_name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {user.email}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
