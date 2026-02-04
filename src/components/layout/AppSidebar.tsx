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
  Headphones,
  ChevronDown,
  User,
  ShoppingBag,
  Mic,
  DollarSign,
  Sparkles,
  Drama,
  History,
  Scale,
  Crown,
  Music,
  Briefcase,
  Cross,
  CalendarDays,
  MapPin,
  UserPlus,
  QrCode,
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

// Learning Path section - items with progress tracking
const learningPathItems = [
  { title: "PROOF Course", url: "/proof-course", icon: Target, featureId: null, iconColor: "text-amber-500", hasProgress: true },
  { title: "Greek Life & Guild", url: "/greek-life-training", icon: Building2, featureId: null, iconColor: "text-violet-500", hasProgress: true },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, featureId: null, iconColor: "text-yellow-500", hasProgress: true },
  { title: "Faith & Authority", url: "/faith-authority", icon: BookOpen, featureId: null, iconColor: "text-amber-500", hasProgress: true },
  { title: "Stay or Leave?", url: "/should-you-stay-or-leave", icon: Scale, featureId: null, iconColor: "text-teal-500", hasProgress: true },
  { title: "Saints or Sellouts?", url: "/saints-or-sellouts", icon: Crown, featureId: null, iconColor: "text-orange-500", hasProgress: true },
  { title: "Hidden in Plain Sight", url: "/hidden-in-plain-sight", icon: Landmark, featureId: null, iconColor: "text-rose-500", hasProgress: true },
  { title: "Sacred Money Course", url: "/sacred-money-course", icon: DollarSign, featureId: null, iconColor: "text-emerald-500", hasProgress: true },
];

// Assessments section - easy access to all quizzes and assessments for earning points
const assessmentItems = [
  { title: "Faith Snapshot", url: "/snapshot", icon: Sparkles, featureId: null, iconColor: "text-blue-500", hasProgress: true, points: "+20 pts" },
  { title: "PROOF Quiz", url: "/proof-assessment", icon: ClipboardCheck, featureId: null, iconColor: "text-emerald-500", hasProgress: true, points: "+20 pts" },
  { title: "Shattered Masks", url: "/shattered-masks", icon: Drama, featureId: null, iconColor: "text-purple-500", hasProgress: true, points: "+25 pts" },
  { title: "Assessment History", url: "/assessment-history", icon: History, featureId: null, iconColor: "text-slate-500", hasProgress: false },
];

// Spiritual Practices section - items with progress tracking
const spiritualPracticesItems = [
  { title: "30-Day Journey", url: "/journey", icon: Calendar, featureId: null, iconColor: "text-cyan-500", hasProgress: true },
  { title: "Bible Study", url: "/bible-study", icon: BookOpen, featureId: null, iconColor: "text-purple-500", hasProgress: true },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, featureId: null, iconColor: "text-rose-500", hasProgress: true },
];

// Community section - all community features merged
const communityItems = [
  { title: "Prayer Wall", url: "/prayer-wall", icon: Heart, featureId: null, iconColor: "text-pink-500", hasProgress: false },
  { title: "Forum", url: "/forum", icon: MessageSquare, featureId: null, iconColor: "text-cyan-500", hasProgress: false },
  { title: "Sacred Connections", url: "/contacts", icon: QrCode, featureId: null, iconColor: "text-sacred", hasProgress: false },
  { title: "Events Calendar", url: "/events", icon: CalendarDays, featureId: null, iconColor: "text-purple-500", hasProgress: false },
  { title: "Chapter Finder", url: "/chapters", icon: MapPin, featureId: null, iconColor: "text-blue-500", hasProgress: false },
  { title: "Member Network", url: "/network", icon: UserPlus, featureId: null, iconColor: "text-pink-500", hasProgress: false },
  { title: "Business Directory", url: "/business-directory", icon: Briefcase, featureId: null, iconColor: "text-emerald-500", hasProgress: false },
  { title: "Mentorship", url: "/coaching-application", icon: Users, featureId: null, iconColor: "text-indigo-500", hasProgress: false },
  { title: "Group Coaching", url: "/community", icon: GraduationCap, featureId: null, iconColor: "text-orange-500", hasProgress: false },
];

// About Dr. Lyman section
const aboutDrLymanItems = [
  { title: "About Creator", url: "/about-creator", icon: User, featureId: null, iconColor: "text-sacred", hasProgress: false },
  { title: "Order Book", url: "/order-book", icon: ShoppingBag, featureId: null, iconColor: "text-amber-500", hasProgress: false },
  { title: "Book Dr. Lyman", url: "/speaking-request", icon: Calendar, featureId: null, iconColor: "text-fuchsia-500", hasProgress: false },
];

// Podcast section
const podcastItems = [
  { title: "Podcast", url: "/podcast", icon: Headphones, featureId: null, iconColor: "text-purple-500", hasProgress: false },
  { title: "Be on Podcast", url: "/guest-panelist-application", icon: Mic, featureId: null, iconColor: "text-purple-500", hasProgress: false },
];

// Resources section
const resourcesItems = [
  { title: "Chaplain Toolkit", url: "/chaplain-toolkit", icon: Cross, featureId: null, iconColor: "text-sacred", hasProgress: false },
  { title: "Chapter Finance", url: "/chapter-finance", icon: DollarSign, featureId: null, iconColor: "text-emerald-500", hasProgress: false },
  { title: "Financial Stewardship", url: "/financial-stewardship", icon: Landmark, featureId: null, iconColor: "text-teal-500", hasProgress: false },
  { title: "Worship Playlists", url: "/worship-playlists", icon: Music, featureId: null, iconColor: "text-purple-500", hasProgress: false },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Compass, featureId: null, iconColor: "text-teal-500", hasProgress: false },
  { title: "Video Library", url: "/video-library", icon: Video, featureId: null, iconColor: "text-sky-500", hasProgress: false },
  { title: "Parents & Family", url: "/parents-family", icon: Heart, featureId: null, iconColor: "text-rose-500", hasProgress: false },
  { title: "Anti-Hazing", url: "/anti-hazing", icon: ShieldAlert, featureId: null, iconColor: "text-red-500", hasProgress: false },
  { title: "Church Leaders", url: "/church-leaders", icon: Church, featureId: null, iconColor: "text-lime-500", hasProgress: false },
];

// System section
const systemItems = [
  { title: "Achievements", url: "/achievements", icon: Trophy, featureId: null, iconColor: "text-amber-400", hasProgress: false },
  { title: "Training Vault", url: "/training-vault", icon: Award, featureId: null, iconColor: "text-emerald-500", hasProgress: false },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, featureId: null, iconColor: "text-fuchsia-500", hasProgress: false },
  { title: "Changelog", url: "/changelog", icon: FileText, featureId: null, iconColor: "text-sky-500", hasProgress: false },
  { title: "Settings", url: "/profile", icon: Settings, featureId: null, iconColor: "text-slate-500", hasProgress: false },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { preferences } = useSidebarPreferences();
  const { isFeatureVisible } = useFeaturePreferences();
  
  
  // Collapsible states for each section - all collapsed by default on login
  const [learningPathOpen, setLearningPathOpen] = useState(false);
  const [assessmentsOpen, setAssessmentsOpen] = useState(false);
  const [spiritualOpen, setSpiritualOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items based on feature visibility
  const filterNavItems = (items: typeof learningPathItems) => {
    return items.filter(item => {
      if (!item.featureId) return true;
      return isFeatureVisible(item.featureId);
    });
  };

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

  const NavItem = ({ item }: { item: { title: string; url: string; icon: React.ComponentType<{ className?: string }>; iconColor?: string } }) => {
    const Icon = item.icon;
    return (
      <SidebarMenuItem className="isolate">
        <SidebarMenuButton
          asChild
          isActive={isActive(item.url)}
          tooltip={collapsed ? item.title : undefined}
        >
          <NavLink 
            to={item.url} 
            className={cn(
              "flex items-center gap-2 !items-start !justify-start !text-left transition-colors py-1.5 px-2 rounded-md w-full group",
              isActive(item.url) && "text-primary font-medium"
            )}
          >
            <span className={cn(
              "flex items-center justify-center h-6 w-6 rounded-md shrink-0 transition-all",
              item.iconColor?.replace('text-', 'bg-').replace('500', '500/15'),
              "group-hover:scale-110"
            )}>
              <Icon className={cn("h-4 w-4", item.iconColor, "drop-shadow-sm")} />
            </span>
            <span className="truncate text-sm">{item.title}</span>
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

        {/* Learning Path Section - Collapsible */}
        {preferences.showMain && filteredLearningPath.length > 0 && (
          <Collapsible open={learningPathOpen} onOpenChange={setLearningPathOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>Learning Path</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    learningPathOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredLearningPath.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Assessments Section - Earn Points */}
        {filteredAssessments.length > 0 && (
          <Collapsible open={assessmentsOpen} onOpenChange={setAssessmentsOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span className="flex items-center gap-2">
                    Assessments
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary">
                      Earn Points
                    </Badge>
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    assessmentsOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredAssessments.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Spiritual Practices Section */}
        {preferences.showMain && filteredSpiritualPractices.length > 0 && (
          <Collapsible open={spiritualOpen} onOpenChange={setSpiritualOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>Spiritual Practices</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    spiritualOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredSpiritualPractices.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Community Section */}
        {filteredCommunity.length > 0 && (
          <Collapsible open={communityOpen} onOpenChange={setCommunityOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>Greek Community</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    communityOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredCommunity.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* About Dr. Lyman Section */}
        {filteredAboutDrLyman.length > 0 && (
          <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>About Dr. Lyman</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    aboutOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredAboutDrLyman.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Podcast Section */}
        {filteredPodcast.length > 0 && (
          <Collapsible open={podcastOpen} onOpenChange={setPodcastOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>Podcast</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    podcastOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredPodcast.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Resources Section */}
        {filteredResources.length > 0 && (
          <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>Resources</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    resourcesOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredResources.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* System Section */}
        {filteredSystem.length > 0 && (
          <Collapsible open={systemOpen} onOpenChange={setSystemOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:text-foreground transition-colors">
                  <span>System</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    systemOpen ? "rotate-0" : "-rotate-90"
                  )} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredSystem.map((item) => (
                      <NavItem key={item.url} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
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
