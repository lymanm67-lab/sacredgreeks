import { 
  Home, 
  Compass, 
  BookOpen, 
  Heart, 
  Book, 
  Users, 
  MessageSquare, 
  Library, 
  Shapes, 
  Video, 
  Trophy, 
  Settings, 
  User,
  HandHeart,
  ClipboardList,
  HelpCircle,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarSearch } from "./SidebarSearch";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
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

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Journey", url: "/journey", icon: Compass },
  { title: "Devotional", url: "/devotional", icon: BookOpen },
  { title: "Prayer Journal", url: "/prayer-journal", icon: Heart },
  { title: "Bible Study", url: "/bible-study", icon: Book },
];

const communityItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: HandHeart },
  { title: "Forum", url: "/forum", icon: MessageSquare },
  { title: "Community", url: "/community", icon: Users },
];

const resourceItems = [
  { title: "Resources", url: "/resources", icon: Library },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Shapes },
  { title: "Video Library", url: "/video-library", icon: Video },
  { title: "Study Guide", url: "/study", icon: ClipboardList },
];

const footerItems = [
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "Profile", url: "/profile", icon: User },
  { title: "FAQ", url: "/faq", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();

  const isActive = (path: string) => location.pathname === path;

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

      <SidebarContent>
        {preferences.showMain && (
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <NavItem key={item.url} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {preferences.showCommunity && (
          <SidebarGroup>
            <SidebarGroupLabel>Community</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {communityItems.map((item) => (
                  <NavItem key={item.url} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {preferences.showResources && (
          <SidebarGroup>
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {resourceItems.map((item) => (
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
              {footerItems.map((item) => (
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
