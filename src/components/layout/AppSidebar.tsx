import { useState } from "react";
import { 
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
  Headphones,
  ChevronDown,
  User,
  ShoppingBag,
  Mic,
  DollarSign,
  Sparkles,
  Drama,
  Scale,
  Crown,
  Music,
  Briefcase,
  Cross,
  CalendarDays,
  MapPin,
  UserPlus,
  QrCode,
  Bot,
  Presentation,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { SidebarSearch } from "./SidebarSearch";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useFeaturePreferences } from "@/hooks/use-feature-preferences";

import { SubscriptionBadge } from "@/components/dashboard/SubscriptionBadge";
import { DemoModeControl } from "@/components/GlobalDemoIndicator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

// ─── Top-level pinned items ───
const academyItem = { title: "Sacred Leaders Academy", url: "/leadership-academy", icon: GraduationCap, featureId: null, iconColor: "text-sacred" };

// ─── ASSESS: Single hub for all assessments ───
const assessItems = [
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck, featureId: null, iconColor: "text-blue-500" },
];

// ─── PRACTICE: Daily spiritual habits ───
const practiceItems = [
  { title: "Daily Practice", url: "/daily-practice", icon: Calendar, featureId: null, iconColor: "text-cyan-500" },
  { title: "Prayer", url: "/prayer", icon: BookHeart, featureId: null, iconColor: "text-rose-500" },
];

// ─── CONNECT: Community & networking ───
const connectItems = [
  { title: "Sacred Connections", url: "/contacts", icon: QrCode, featureId: null, iconColor: "text-sacred" },
  { title: "Member Network", url: "/network", icon: UserPlus, featureId: null, iconColor: "text-pink-500" },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500" },
];

// ─── CHURCH LEADERS: Dedicated section ───
const churchItems = [
  { title: "Church Leaders", url: "/church-leaders", icon: Users, featureId: null, iconColor: "text-lime-500" },
  { title: "Toolkit", url: "/tools", icon: Bot, featureId: null, iconColor: "text-primary" },
];

// ─── MORE: Slimmed down ───
const moreItems = [
  { title: "Dr. Lyman", url: "/dr-lyman", icon: User, featureId: null, iconColor: "text-sacred" },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500" },
];

// Section definitions for DRY rendering
const SECTIONS: { key: string; label: string; items: typeof assessItems; badge?: string }[] = [
  { key: "assess", label: "Assess", items: assessItems, badge: "Quizzes" },
  { key: "practice", label: "Practice", items: practiceItems },
  { key: "connect", label: "Connect", items: connectItems },
  { key: "church", label: "Church Leaders", items: churchItems },
  { key: "more", label: "More", items: moreItems },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();
  const { isFeatureVisible } = useFeaturePreferences();

  // Track open state per section — auto-open if user is on a child route
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SECTIONS.forEach(section => {
      initial[section.key] = section.items.some(item =>
        location.pathname === item.url || location.pathname.startsWith(item.url.split('?')[0])
      );
    });
    return initial;
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const filterNavItems = (items: typeof assessItems) =>
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

  const getIconBg = (iconColor?: string, opacity = 15) => {
    if (!iconColor) return '';
    const base = iconColor.replace('text-', '');
    return `bg-${base}/${opacity}`;
  };

  const NavItem = ({ item }: { item: { title: string; url: string; icon: React.ComponentType<{ className?: string }>; iconColor?: string } }) => {
    const Icon = item.icon;
    return (
      <SidebarMenuItem className="isolate">
        <SidebarMenuButton
          asChild
          isActive={isActive(item.url)}
          tooltip={collapsed ? item.title : undefined}
          className="data-[active=true]:bg-transparent data-[active=true]:text-foreground hover:bg-muted/50"
        >
          <NavLink 
            to={item.url} 
            className={cn(
              "flex items-center gap-2 !items-start !justify-start !text-left transition-colors py-1.5 px-2 rounded-md w-full group",
              isActive(item.url) && "font-medium"
            )}
          >
            <span className={cn(
              "flex items-center justify-center h-6 w-6 rounded-md shrink-0 transition-all",
              getIconBg(item.iconColor, isActive(item.url) ? 25 : 15),
              "group-hover:scale-110"
            )}>
              <Icon className={cn("h-4 w-4 drop-shadow-sm", item.iconColor)} />
            </span>
            <span className={cn("truncate text-sm", isActive(item.url) ? "text-foreground" : "text-muted-foreground")}>{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4 space-y-4">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sacred to-sacred/70 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">SG</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">Sacred Greeks</span>
              {profile?.greek_organization && (
                <Badge variant="secondary" className="text-[10px] w-fit mt-0.5 whitespace-nowrap">
                  {profile.greek_organization}
                </Badge>
              )}
            </div>
          )}
        </NavLink>
        
        {!collapsed && (
          <div className="flex items-center gap-2">
            <SubscriptionBadge />
            <DemoModeControl />
          </div>
        )}
        
        <SidebarSearch collapsed={collapsed} />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Dashboard & Academy — always visible, no collapse */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem item={{ title: "Dashboard", url: "/dashboard", icon: Home, iconColor: "text-blue-500" }} />
              <NavItem item={academyItem} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapsible sections */}
        {SECTIONS.map(section => {
          const filtered = filterNavItems(section.items);
          if (!preferences.showMain && (section.key === "learn" || section.key === "practice")) return null;
          if (filtered.length === 0) return null;

          return (
            <Collapsible
              key={section.key}
              open={openSections[section.key]}
              onOpenChange={() => toggleSection(section.key)}
            >
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                    <span className="flex items-center gap-2">
                      {section.label}
                      {section.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary">
                          {section.badge}
                        </Badge>
                      )}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections[section.key] ? "rotate-0" : "-rotate-90"
                    )} />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filtered.map(item => (
                        <NavItem key={item.url} item={item} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => signOut()}
                  tooltip={collapsed ? "Sign Out" : undefined}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {!collapsed && user && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-sacred/20 text-sacred text-xs">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">
                  {profile?.full_name || 'User'}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
