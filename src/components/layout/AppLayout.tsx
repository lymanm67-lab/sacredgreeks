import { ReactNode, useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { MobileBottomNav } from "./MobileBottomNav";
import { PageTitle } from "./PageTitle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useAdminCheck } from "@/components/AdminRoute";
import { PresentationModeToggle } from "@/components/demo/PresentationModeToggle";
import { SalesDeckGenerator } from "@/components/demo/SalesDeckGenerator";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const { preferences } = useSidebarPreferences();
  const { isDemoMode, demoSettings } = useDemoMode();
  const { isAdmin } = useAdminCheck();
  const [showSalesDeck, setShowSalesDeck] = useState(false);
  const isRightSidebar = preferences.position === 'right';
  const isPresentationMode = demoSettings.presentationMode;

  // Check for ?presenter=true URL parameter (fallback access for non-admins)
  const hasPresenterParam = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('presenter') === 'true';
    }
    return false;
  }, []);

  // Show presentation toggle only for admins OR if ?presenter=true is in URL
  const canAccessPresentationMode = isAdmin || hasPresenterParam;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className={cn(
        "min-h-screen flex w-full",
        isRightSidebar && "flex-row-reverse",
        isDemoMode && "pt-11"
      )}>
        {/* Hide sidebar on mobile - use hamburger menu instead */}
        {!isMobile && <AppSidebar />}
        <SidebarInset className="flex-1 flex flex-col">
          <header className={cn(
            "sticky z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
            isDemoMode ? "top-11" : "top-0"
          )}>
            {isMobile ? <MobileNav /> : <SidebarTrigger className="-ml-1" />}
            <PageTitle />
            <div className="ml-auto flex items-center gap-2">
              {isDemoMode && canAccessPresentationMode && (
                <PresentationModeToggle onGenerateDeck={() => setShowSalesDeck(true)} />
              )}
              <ThemeToggle />
            </div>
          </header>
          <main className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden",
            isMobile && "pb-20" // Add padding for bottom nav
          )}>
            {children}
          </main>
        </SidebarInset>
      </div>
      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}
      
      {/* Sales Deck Generator Dialog */}
      <SalesDeckGenerator 
        isOpen={showSalesDeck} 
        onClose={() => setShowSalesDeck(false)} 
      />
    </SidebarProvider>
  );
}
