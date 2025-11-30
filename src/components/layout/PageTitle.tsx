import { useLocation } from "react-router-dom";
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
  User,
  HandHeart,
  ClipboardList,
  HelpCircle,
  Bookmark,
  BarChart3,
  Shield,
  Wifi,
  Settings,
  type LucideIcon,
} from "lucide-react";

interface PageInfo {
  title: string;
  icon: LucideIcon;
}

const pageTitles: Record<string, PageInfo> = {
  "/dashboard": { title: "Dashboard", icon: Home },
  "/journey": { title: "Journey", icon: Compass },
  "/devotional": { title: "Daily Devotional", icon: BookOpen },
  "/prayer-journal": { title: "Prayer Journal", icon: Heart },
  "/bible-study": { title: "Bible Study", icon: Book },
  "/prayer-wall": { title: "Prayer Wall", icon: HandHeart },
  "/forum": { title: "Forum", icon: MessageSquare },
  "/community": { title: "Community", icon: Users },
  "/resources": { title: "Resources", icon: Library },
  "/symbol-guide": { title: "Symbol Guide", icon: Shapes },
  "/video-library": { title: "Video Library", icon: Video },
  "/study": { title: "Study Guide", icon: ClipboardList },
  "/achievements": { title: "Achievements", icon: Trophy },
  "/profile": { title: "Profile", icon: User },
  "/bookmarks": { title: "Bookmarks", icon: Bookmark },
  "/progress": { title: "Progress", icon: BarChart3 },
  "/prayer-guide": { title: "Prayer Guide", icon: Heart },
  "/faq": { title: "FAQ", icon: HelpCircle },
  "/offline-settings": { title: "Offline Settings", icon: Wifi },
  "/admin": { title: "Admin", icon: Shield },
  "/beta-dashboard": { title: "Beta Dashboard", icon: Home },
  "/beta-checklist": { title: "Beta Checklist", icon: ClipboardList },
  "/assessment-history": { title: "Assessment History", icon: BarChart3 },
  "/service-tracker": { title: "Service Tracker", icon: ClipboardList },
};

export function PageTitle() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname];

  if (!pageInfo) {
    return null;
  }

  const Icon = pageInfo.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <h1 className="text-lg font-semibold">{pageInfo.title}</h1>
    </div>
  );
}
