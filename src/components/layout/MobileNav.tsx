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
  Compass,
  Zap,
  Trophy,
  FileText,
  Bell,
  Settings, 
  LogOut,
  Video,
  Building2,
  Landmark,
  User,
  ShoppingBag,
  Headphones,
  DollarSign,
  Mic,
  Sparkles,
  Drama,
  Scale,
  Crown,
  CalendarDays,
  MapPin,
  UserPlus,
  Briefcase,
  Cross,
  Music,
  ChevronDown,
  QrCode,
  Bot,
  Presentation,
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

// ─── Pinned ───
const pinnedItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, featureId: null, iconColor: "text-blue-500" },
  { title: "Sacred Leaders Academy", url: "/leadership-academy", icon: GraduationCap, featureId: null, iconColor: "text-sacred" },
  { title: "Church Leaders", url: "/church-leaders", icon: Landmark, featureId: null, iconColor: "text-lime-500" },
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck, featureId: null, iconColor: "text-blue-500" },
];


// ─── PRACTICE ───
const practiceItems = [
  { title: "Daily Practice", url: "/daily-practice", icon: Calendar, featureId: null, iconColor: "text-cyan-500" },
  { title: "Prayer", url: "/prayer", icon: BookHeart, featureId: null, iconColor: "text-rose-500" },
];

// ─── CONNECT ───
const connectItems = [
  { title: "Sacred Connections", url: "/contacts", icon: QrCode, featureId: null, iconColor: "text-sacred" },
  { title: "Member Network", url: "/network", icon: UserPlus, featureId: null, iconColor: "text-pink-500" },
  { title: "Toolkit", url: "/tools", icon: Bot, featureId: null, iconColor: "text-primary" },
];

// ─── CHURCH LEADERS ───
const churchItems = [
  { title: "Church Leaders Hub", url: "/church-leaders", icon: Landmark, featureId: null, iconColor: "text-lime-500" },
  { title: "Chaplain Toolkit", url: "/chaplain-toolkit", icon: Cross, featureId: null, iconColor: "text-sacred" },
  { title: "Conversation Scripts", url: "/ai-workers", icon: MessageSquare, featureId: null, iconColor: "text-violet-500" },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500" },
];

// ─── MORE ───
const moreItems = [
  { title: "Dr. Lyman", url: "/dr-lyman", icon: User, featureId: null, iconColor: "text-sacred" },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500" },
];

const SECTIONS: { key: string; label: string; items: typeof practiceItems; badge?: string }[] = [
  { key: "practice", label: "Practice", items: practiceItems },
  { key: "connect", label: "Connect", items: [...connectItems, ...churchItems.filter(i => i.url !== "/church-leaders")] },
  { key: "more", label: "More", items: moreItems },
];
];

interface NavSectionProps {
  title: string;
  items: typeof practiceItems;
  badge?: string;
  defaultOpen?: boolean;
  currentPath: string;
  onNavClick: () => void;
}

function NavSection({ title, items, badge, defaultOpen = false, currentPath, onNavClick }: NavSectionProps) {
  const hasActiveChild = items.some(item => currentPath === item.url || currentPath.startsWith(item.url.split('?')[0]));
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveChild);
  const isActive = (path: string) => currentPath === path;
  
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
              onClick={onNavClick}
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
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { isFeatureVisible } = useFeaturePreferences();

  const filterNavItems = (items: typeof practiceItems) =>
    items.filter(item => !item.featureId || isFeatureVisible(item.featureId));

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
            {/* Pinned items — always visible, no collapse */}
            <div className="space-y-1">
              {pinnedItems.map(item => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    location.pathname === item.url
                      ? "bg-sacred/10 text-sacred font-medium"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", item.iconColor)} />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>

            {/* Collapsible sections */}
            {SECTIONS.map(section => {
              const filtered = filterNavItems(section.items);
              if (filtered.length === 0) return null;
              return (
                <NavSection
                  key={section.key}
                  title={section.label}
                  items={filtered}
                  badge={section.badge}
                  currentPath={location.pathname}
                  onNavClick={handleNavClick}
                />
              );
            })}
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
                aria-label="Sign out"
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
