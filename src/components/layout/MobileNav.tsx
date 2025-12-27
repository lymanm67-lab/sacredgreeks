import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Menu,
  Home, 
  Target,
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
  Bell,
  Settings, 
  LogOut,
  Church,
  Video,
  Building2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useFeaturePreferences } from "@/hooks/use-feature-preferences";
import { SubscriptionBadge } from "@/components/dashboard/SubscriptionBadge";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, featureId: null, iconColor: "text-blue-500" },
  { title: "PROOF Course", url: "/proof-course", icon: Target, featureId: null, iconColor: "text-amber-500" },
  { title: "30-Day Journey", url: "/journey", icon: Calendar, featureId: null, iconColor: "text-emerald-500" },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, featureId: null, iconColor: "text-rose-500" },
  { title: "Bible Study", url: "/bible-study", icon: BookOpen, featureId: null, iconColor: "text-purple-500" },
];

const communityNavItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: Heart, featureId: null, iconColor: "text-pink-500" },
  { title: "Forum", url: "/forum", icon: MessageSquare, featureId: null, iconColor: "text-cyan-500" },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500" },
  { title: "Group Coaching", url: "/community", icon: GraduationCap, featureId: null, iconColor: "text-orange-500" },
];

const toolsNavItems = [
  { title: "Greek Life", url: "/greek-life", icon: Building2, featureId: null, iconColor: "text-violet-500" },
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null, iconColor: "text-red-500" },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Compass, featureId: null, iconColor: "text-teal-500" },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, featureId: null, iconColor: "text-yellow-500" },
  { title: "Video Library", url: "/video-library", icon: Video, featureId: null, iconColor: "text-sky-500" },
  { title: "Church Leaders", url: "/church-leaders", icon: Church, featureId: null, iconColor: "text-lime-500" },
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: 'achievements', iconColor: "text-amber-400" },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null, iconColor: "text-fuchsia-500" },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { isFeatureVisible } = useFeaturePreferences();

  const isActive = (path: string) => location.pathname === path;

  const filterNavItems = (items: typeof mainNavItems) => {
    return items.filter(item => {
      if (!item.featureId) return true;
      return isFeatureVisible(item.featureId);
    });
  };

  const filteredMainNav = filterNavItems(mainNavItems);
  const filteredCommunityNav = filterNavItems(communityNavItems);
  const filteredToolsNav = filterNavItems(toolsNavItems);

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

  const NavSection = ({ title, items }: { title: string; items: typeof mainNavItems }) => (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
        {title}
      </h3>
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
  );

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
          <div className="mt-3">
            <SubscriptionBadge />
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-6">
            {filteredMainNav.length > 0 && (
              <NavSection title="Main" items={filteredMainNav} />
            )}
            {filteredCommunityNav.length > 0 && (
              <NavSection title="Community" items={filteredCommunityNav} />
            )}
            {filteredToolsNav.length > 0 && (
              <NavSection title="Tools & Resources" items={filteredToolsNav} />
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
