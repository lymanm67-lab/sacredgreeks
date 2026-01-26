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
  Landmark,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SidebarSearch } from "./SidebarSearch";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useFeaturePreferences } from "@/hooks/use-feature-preferences";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";
import { SubscriptionBadge } from "@/components/dashboard/SubscriptionBadge";
import { DemoModeControl } from "@/components/GlobalDemoIndicator";
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

// Learning Path section - items with progress tracking
const learningPathItems = [
  { title: "PROOF Course", url: "/proof-course", icon: Target, featureId: null, iconColor: "text-amber-500", hasProgress: true },
  { title: "PROOF Quiz", url: "/proof-assessment", icon: ClipboardCheck, featureId: null, iconColor: "text-emerald-500", hasProgress: true },
  { title: "Greek Life & Guild", url: "/greek-life-training", icon: Building2, featureId: null, iconColor: "text-violet-500", hasProgress: true },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, featureId: null, iconColor: "text-yellow-500", hasProgress: true },
  { title: "Faith & Authority", url: "/faith-authority", icon: BookOpen, featureId: null, iconColor: "text-amber-500", hasProgress: true },
];

// Spiritual Practices section - items with progress tracking
const spiritualPracticesItems = [
  { title: "30-Day Journey", url: "/journey", icon: Calendar, featureId: null, iconColor: "text-cyan-500", hasProgress: true },
  { title: "Bible Study", url: "/bible-study", icon: BookOpen, featureId: null, iconColor: "text-purple-500", hasProgress: true },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, featureId: null, iconColor: "text-rose-500", hasProgress: true },
];

// Community section
const communityNavItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: Heart, featureId: null, iconColor: "text-pink-500", hasProgress: false },
  { title: "Forum", url: "/forum", icon: MessageSquare, featureId: null, iconColor: "text-cyan-500", hasProgress: false },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500", hasProgress: false },
  { title: "Group Coaching", url: "/community", icon: GraduationCap, featureId: null, iconColor: "text-orange-500", hasProgress: false },
];

// Tools & Resources section
const toolsNavItems = [
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null, iconColor: "text-red-500", hasProgress: false },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Compass, featureId: null, iconColor: "text-teal-500", hasProgress: false },
  { title: "Video Library", url: "/video-library", icon: Video, featureId: null, iconColor: "text-sky-500", hasProgress: false },
  { title: "Church Leaders", url: "/church-leaders", icon: Church, featureId: null, iconColor: "text-lime-500", hasProgress: false },
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: 'achievements', iconColor: "text-amber-400", hasProgress: false },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null, iconColor: "text-fuchsia-500", hasProgress: false },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500", hasProgress: false },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();
  const { isFeatureVisible } = useFeaturePreferences();
  const { getProgressForPath } = useNavigationProgress();

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items based on feature visibility
  const filterNavItems = (items: typeof learningPathItems) => {
    return items.filter(item => {
      if (!item.featureId) return true;
      return isFeatureVisible(item.featureId);
    });
  };

  const filteredLearningPath = filterNavItems(learningPathItems);
  const filteredSpiritualPractices = filterNavItems(spiritualPracticesItems);
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

  const NavItem = ({ item, showProgress = false }: { item: { title: string; url: string; icon: React.ComponentType<{ className?: string }>; iconColor?: string; hasProgress?: boolean }; showProgress?: boolean }) => {
    const progress = showProgress && item.hasProgress ? getProgressForPath(item.url) : 0;
    
    return (
      <SidebarMenuItem className="isolate mb-1">
        <SidebarMenuButton
          asChild
          isActive={isActive(item.url)}
          tooltip={collapsed ? item.title : undefined}
        >
          <NavLink 
            to={item.url} 
            className={cn(
              "flex items-center gap-3 transition-colors py-3 px-3 -mx-3 rounded-md",
              isActive(item.url) && "text-primary font-medium"
            )}
          >
            <item.icon className={cn("h-4 w-4 shrink-0", item.iconColor)} />
            <div className="flex-1 min-w-0 overflow-hidden">
              <span className="block truncate">{item.title}</span>
              {showProgress && item.hasProgress && !collapsed && progress > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={progress} className="h-1 flex-1" />
                  <span className="text-[10px] text-muted-foreground w-7 shrink-0">{progress}%</span>
                </div>
              )}
            </div>
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
                <Badge variant="secondary" className="text-xs w-fit mt-0.5">
                  {profile.greek_organization}
                </Badge>
              )}
            </div>
          )}
        </NavLink>
        
        {/* Upgrade to Pro + Demo button */}
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
        {/* Dashboard - Always First */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem item={{ title: "Dashboard", url: "/dashboard", icon: Home, iconColor: "text-blue-500" }} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning Path Section */}
        {preferences.showMain && filteredLearningPath.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="!mb-4">Learning Path</SidebarGroupLabel>
            <SidebarGroupContent className="pt-2">
              <SidebarMenu>
                {filteredLearningPath.map((item, index) => (
                  <div key={item.url} className={item.url === '/proof-assessment' ? '!mb-2' : ''}>
                    <NavItem item={item} showProgress />
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Spiritual Practices Section */}
        {preferences.showMain && filteredSpiritualPractices.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Spiritual Practices</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredSpiritualPractices.map((item) => (
                  <NavItem key={item.url} item={item} showProgress />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Community Section */}
        {filteredCommunityNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Community</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredCommunityNav.map((item) => (
                  <NavItem key={item.url} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Tools & Resources Section */}
        {filteredToolsNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Tools & Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredToolsNav.map((item) => (
                  <NavItem key={item.url} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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
