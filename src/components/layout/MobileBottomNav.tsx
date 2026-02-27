import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, Heart, BookHeart, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home, iconColor: "text-blue-500" },
  { title: "PROOF", url: "/proof-course", icon: Target, iconColor: "text-amber-500" },
  { title: "Bible", url: "/bible-study", icon: BookOpen, iconColor: "text-blue-500" },
  { title: "Prayer", url: "/prayer-journal", icon: BookHeart, iconColor: "text-rose-500" },
  { title: "Wall", url: "/prayer-wall", icon: Heart, iconColor: "text-pink-500" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden" aria-label="Mobile navigation" role="navigation">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            aria-label={`Navigate to ${item.title}`}
            aria-current={isActive(item.url) ? 'page' : undefined}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
              isActive(item.url)
                ? "text-sacred"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
          <item.icon 
              className={cn(
                "h-5 w-5 transition-transform",
                isActive(item.url) ? "scale-110 text-sacred" : item.iconColor
              )} 
            />
            <span className={cn(
              "text-[10px] font-medium",
              isActive(item.url) && "font-semibold"
            )}>
              {item.title}
            </span>
            {isActive(item.url) && (
              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-sacred" />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
