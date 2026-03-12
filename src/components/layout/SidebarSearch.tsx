import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Compass, 
  BookOpen, 
  Heart, 
  Book, 
  Users, 
  MessageSquare, 
  Video, 
  Trophy, 
  User,
  HandHeart,
  ClipboardCheck,
  Settings,
  Headphones,
  Calendar,
  MapPin,
  Target,
  Zap,
  Scale,
  Crown,
  Landmark,
  DollarSign,
  Sparkles,
  Drama,
  Building2,
  GraduationCap,
  CalendarDays,
  UserPlus,
  Briefcase,
  Cross,
  Music,
  Bot,
  Presentation,
  Bell,
  FileText,
  ShoppingBag,
  Mic,
  QrCode,
  BookHeart,
} from "lucide-react";

const navigationItems = [
  // Pinned
  { title: "Dashboard", url: "/dashboard", icon: Home, keywords: ["home", "main"] },
  { title: "Sacred Leaders Academy", url: "/leadership-academy", icon: GraduationCap, keywords: ["academy", "leadership"] },
  // Learn
  { title: "PROOF Course", url: "/proof-course", icon: Target, keywords: ["proof", "pledge", "ritual", "oaths", "framework", "training"] },
  { title: "Greek Life & Guild", url: "/greek-life-training", icon: Building2, keywords: ["guild", "greek", "brotherhood", "sisterhood"] },
  { title: "Myth Busters", url: "/myth-buster", icon: Zap, keywords: ["myths", "debunk", "answers"] },
  { title: "Faith & Authority", url: "/faith-authority", icon: BookOpen, keywords: ["faith", "authority", "confession"] },
  { title: "Stay or Leave?", url: "/should-you-stay-or-leave", icon: Scale, keywords: ["stay", "leave", "decision"] },
  { title: "Saints or Sellouts?", url: "/saints-or-sellouts", icon: Crown, keywords: ["saints", "sellouts", "integration"] },
  { title: "Hidden in Plain Sight", url: "/hidden-in-plain-sight", icon: Landmark, keywords: ["hidden", "pagan", "origins"] },
  { title: "Sacred Money Course", url: "/sacred-money-course", icon: DollarSign, keywords: ["money", "financial", "course"] },
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck, keywords: ["quiz", "assessment", "snapshot", "proof", "masks", "test"] },
  // Practice
  { title: "30-Day Journey", url: "/journey", icon: Calendar, keywords: ["progress", "spiritual", "journey"] },
  { title: "Bible Study", url: "/bible-study", icon: Book, keywords: ["scripture", "word", "search"] },
  { title: "Prayer Journal", url: "/prayer-journal", icon: BookHeart, keywords: ["prayers", "personal", "journal"] },
  { title: "Prayer Wall", url: "/prayer-wall", icon: HandHeart, keywords: ["community", "requests", "prayer"] },
  // Connect
  { title: "Sacred Connections", url: "/contacts", icon: QrCode, keywords: ["contacts", "qr", "connect", "forum", "events", "chapters", "business", "directory"] },
  { title: "Member Network", url: "/network", icon: UserPlus, keywords: ["network", "members", "community", "parents", "family", "church", "leaders"] },
  { title: "Mentorship", url: "/coaching-application", icon: Users, keywords: ["mentor", "coaching", "application"] },
  // Tools
  { title: "Toolkit", url: "/tools", icon: Bot, keywords: ["tools", "ai", "finance", "chaplain", "present", "worship", "video", "symbol"] },
  // More
  { title: "Dr. Lyman", url: "/dr-lyman", icon: User, keywords: ["dr lyman", "author", "founder", "book", "podcast", "speaking", "order"] },
  { title: "Settings", url: "/profile", icon: Settings, keywords: ["account", "settings", "personal"] },
  { title: "Notifications", url: "/notification-preferences", icon: Bell, keywords: ["alerts", "notifications"] },
  { title: "Changelog", url: "/changelog", icon: FileText, keywords: ["updates", "new", "changes"] },
];

interface SidebarSearchProps {
  collapsed?: boolean;
}

export function SidebarSearch({ collapsed }: SidebarSearchProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={`relative justify-start text-muted-foreground ${
          collapsed ? "w-8 h-8 p-0" : "w-full"
        }`}
      >
        <Search className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="ml-2 flex-1 text-left">Search...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        )}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages and features..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.url}
                value={`${item.title} ${item.keywords.join(" ")}`}
                onSelect={() => handleSelect(item.url)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
