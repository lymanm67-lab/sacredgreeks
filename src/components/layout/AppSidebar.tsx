import { 
  Home, 
  User,
  Swords,
  BookOpen, 
  BookMarked,
  Wrench,
  GraduationCap,
  Users, 
  Mail,
  Settings, 
  HelpCircle,
  LogOut,
  FlaskConical,
  Bell,
  Trophy,
  ShieldAlert
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useDemoMode, DEMO_SCENARIOS } from "@/contexts/DemoModeContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SidebarSearch } from "./SidebarSearch";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useFeaturePreferences } from "@/hooks/use-feature-preferences";
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

// Main navigation items
const mainNavItems = [
  { title: "Home", url: "/dashboard", icon: Home, featureId: null },
  { title: "Meet Dr. Lyman", url: "/meet-dr-lyman", icon: User, featureId: null },
  { title: "The Challenge", url: "/challenge", icon: Swords, featureId: null },
  { title: "Biblical Guide", url: "/biblical-guides", icon: BookOpen, featureId: null },
  { title: "The Book", url: "/the-book", icon: BookMarked, featureId: null },
  { title: "Tools & Resources", url: "/tools-resources", icon: Wrench, featureId: null },
  { title: "Greek Life", url: "/greek-life", icon: GraduationCap, featureId: null },
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null },
  { title: "Community", url: "/community", icon: Users, featureId: null },
  { title: "Contact", url: "/contact", icon: Mail, featureId: null },
];

const footerItems = [
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: 'achievements' },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null },
  { title: "Profile", url: "/profile", icon: Settings, featureId: null },
  { title: "FAQ", url: "/faq", icon: HelpCircle, featureId: null },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();
  const { isDemoMode, toggleDemoMode, currentScenario } = useDemoMode();
  const { isFeatureVisible } = useFeaturePreferences();

  const currentScenarioConfig = DEMO_SCENARIOS.find(s => s.id === currentScenario);

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items based on feature visibility
  const filterNavItems = (items: typeof mainNavItems) => {
    return items.filter(item => {
      if (!item.featureId) return true;
      return isFeatureVisible(item.featureId);
    });
  };

  const filteredMainNav = filterNavItems(mainNavItems);
  const filteredFooterNav = filterNavItems(footerItems);

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
        <SidebarSearch collapsed={collapsed} />
      </SidebarHeader>

      <SidebarSeparator />

      {/* Demo Mode Indicator */}
      {isDemoMode && (
        <>
          <div className={cn(
            "mx-3 my-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20",
            collapsed ? "p-2" : "p-3"
          )}>
            {collapsed ? (
              <div className="flex justify-center">
                <FlaskConical className="h-4 w-4 text-emerald-500 animate-pulse" />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Demo Mode</span>
                  </div>
                  <Switch
                    checked={isDemoMode}
                    onCheckedChange={toggleDemoMode}
                    className="scale-75"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{currentScenarioConfig?.icon}</span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    {currentScenarioConfig?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          <SidebarSeparator />
        </>
      )}

      <SidebarContent>
        {preferences.showMain && filteredMainNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainNav.map((item) => (
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
              {filteredFooterNav.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
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
