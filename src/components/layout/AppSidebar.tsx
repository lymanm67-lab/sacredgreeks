import { 
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

// Main section - Core features
const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, featureId: null },
  { title: "PROOF Course", url: "/proof-course", icon: Target, featureId: null },
  { title: "30-Day Journey", url: "/journey", icon: Calendar, featureId: null },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, featureId: null },
  { title: "Bible Study", url: "/bible-study", icon: BookOpen, featureId: null },
];

// Community section
const communityNavItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: Heart, featureId: null },
  { title: "Forum", url: "/forum", icon: MessageSquare, featureId: null },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null },
  { title: "Group Coaching", url: "/community", icon: GraduationCap, featureId: null },
];

// Tools & Resources section
const toolsNavItems = [
  { title: "Greek Life", url: "/greek-life", icon: Building2, featureId: null },
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Compass, featureId: null },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, featureId: null },
  { title: "Video Library", url: "/video-library", icon: Video, featureId: null },
  { title: "Church Leaders", url: "/church-leaders", icon: Church, featureId: null },
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: 'achievements' },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();
  const { isFeatureVisible } = useFeaturePreferences();

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items based on feature visibility
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

  const NavItem = ({ item }: { item: { title: string; url: string; icon: React.ComponentType<{ className?: string }> } }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.url)}
        tooltip={collapsed ? item.title : undefined}
      >
        <NavLink 
          to={item.url} 
          className={cn(
            "flex items-center gap-3 transition-colors",
            isActive(item.url) && "text-primary font-medium"
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

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
        {/* Main Section */}
        {preferences.showMain && filteredMainNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainNav.map((item) => (
                  <NavItem key={item.url} item={item} />
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
