import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { PageTitle } from "./PageTitle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const { preferences } = useSidebarPreferences();
  const { isDemoMode } = useDemoMode();
  const isRightSidebar = preferences.position === 'right';

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "min-h-screen flex w-full",
        isRightSidebar && "flex-row-reverse",
        isDemoMode && "pt-11"
      )}>
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <header className={cn(
            "sticky z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
            isDemoMode ? "top-11" : "top-0"
          )}>
            <SidebarTrigger className="-ml-1" />
            <PageTitle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
