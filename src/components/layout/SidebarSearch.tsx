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
  Library, 
  Shapes, 
  Video, 
  Trophy, 
  User,
  HandHeart,
  ClipboardList,
  HelpCircle,
  Settings,
  Bookmark,
  BarChart3,
  Shield,
  Wifi,
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, keywords: ["home", "main"] },
  { title: "Journey", url: "/journey", icon: Compass, keywords: ["progress", "spiritual"] },
  { title: "Devotional", url: "/devotional", icon: BookOpen, keywords: ["daily", "reading", "scripture"] },
  { title: "Prayer Journal", url: "/prayer-journal", icon: Heart, keywords: ["prayers", "personal"] },
  { title: "Bible Study", url: "/bible-study", icon: Book, keywords: ["scripture", "word", "search"] },
  { title: "Prayer Wall", url: "/prayer-wall", icon: HandHeart, keywords: ["community", "requests"] },
  { title: "Forum", url: "/forum", icon: MessageSquare, keywords: ["discussions", "community", "chat"] },
  { title: "Community", url: "/community", icon: Users, keywords: ["organization", "chapter"] },
  { title: "Resources", url: "/resources", icon: Library, keywords: ["documents", "pdfs", "guides"] },
  { title: "Symbol Guide", url: "/symbol-guide", icon: Shapes, keywords: ["meanings", "greek", "symbols"] },
  { title: "Video Library", url: "/video-library", icon: Video, keywords: ["watch", "training"] },
  { title: "Study Guide", url: "/study", icon: ClipboardList, keywords: ["lessons", "curriculum"] },
  { title: "Achievements", url: "/achievements", icon: Trophy, keywords: ["badges", "rewards", "points"] },
  { title: "Profile", url: "/profile", icon: User, keywords: ["account", "settings", "personal"] },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark, keywords: ["saved", "favorites"] },
  { title: "Progress", url: "/progress", icon: BarChart3, keywords: ["stats", "analytics", "growth"] },
  { title: "Prayer Guide", url: "/prayer-guide", icon: Heart, keywords: ["how to pray", "templates"] },
  { title: "FAQ", url: "/faq", icon: HelpCircle, keywords: ["help", "questions", "support"] },
  { title: "Offline Settings", url: "/offline-settings", icon: Wifi, keywords: ["download", "sync"] },
  { title: "Admin", url: "/admin", icon: Shield, keywords: ["manage", "administration"] },
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
