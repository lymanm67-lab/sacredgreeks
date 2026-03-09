import { ReactNode, useState, useMemo, useEffect } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { MobileBottomNav } from "./MobileBottomNav";
import { PageTitle } from "./PageTitle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebarPreferences } from "@/hooks/use-sidebar-preferences";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { useAdminCheck } from "@/components/AdminRoute";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { PresentationModeToggle } from "@/components/demo/PresentationModeToggle";
import { PresentationModeBar } from "@/components/demo/PresentationModeBar";
import { SalesDeckGenerator } from "@/components/demo/SalesDeckGenerator";
import { PresentationSlideViewer, ReturnToPresentationButton } from "@/components/demo/presentation";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { preferences } = useSidebarPreferences();
  const { isDemoMode, demoSettings } = useDemoMode();
  const { isAdmin } = useAdminCheck();
  const [showSalesDeck, setShowSalesDeck] = useState(false);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
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

  // Allow non-layout pages (like /snapshot) to return to the slideshow via URL params.
  // Example: /dashboard?openPresentation=true&slide=2
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldOpen = params.get('openPresentation') === 'true';
    if (!shouldOpen) return;

    const slide = parseInt(params.get('slide') || '0', 10);
    const targetSlide = Number.isFinite(slide) ? slide : 0;
    
    // First set the slide, then open (order matters for the effect in PresentationSlideViewer)
    setInitialSlide(targetSlide);
    
    // Use a small delay to ensure initialSlide is set before opening
    // This ensures the PresentationSlideViewer sees the correct initialSlide
    requestAnimationFrame(() => {
      setShowSlideshow(true);
    });
    
    // Clear ONLY the presentation-open params to avoid re-triggering on navigation.
    // IMPORTANT: preserve other params like `presenter=true` so we don't lose presenter access.
    if (window.history.replaceState) {
      const nextParams = new URLSearchParams(location.search);
      nextParams.delete('openPresentation');
      nextParams.delete('slide');

      const nextSearch = nextParams.toString();
      const cleanUrl = nextSearch ? `${location.pathname}?${nextSearch}` : location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [location.search, location.pathname]);

  // Check if coming from presentation (for enhanced sidebar toggle)
  const isFromPresentation = useMemo(() => {
    return new URLSearchParams(location.search).get('fromPresentation') === 'true';
  }, [location.search]);

  return (
    <SidebarProvider defaultOpen={!isMobile && !isFromPresentation}>
      <AppLayoutContent
        isMobile={isMobile}
        isRightSidebar={isRightSidebar}
        isDemoMode={isDemoMode}
        canAccessPresentationMode={canAccessPresentationMode}
        isFromPresentation={isFromPresentation}
        showSalesDeck={showSalesDeck}
        setShowSalesDeck={setShowSalesDeck}
        showSlideshow={showSlideshow}
        setShowSlideshow={setShowSlideshow}
        initialSlide={initialSlide}
        setInitialSlide={setInitialSlide}
      >
        {children}
      </AppLayoutContent>
    </SidebarProvider>
  );
}

// Separate component to use useSidebar hook inside SidebarProvider
function AppLayoutContent({
  children,
  isMobile,
  isRightSidebar,
  isDemoMode,
  canAccessPresentationMode,
  isFromPresentation,
  showSalesDeck,
  setShowSalesDeck,
  showSlideshow,
  setShowSlideshow,
  initialSlide,
  setInitialSlide,
}: {
  children: ReactNode;
  isMobile: boolean;
  isRightSidebar: boolean;
  isDemoMode: boolean;
  canAccessPresentationMode: boolean;
  isFromPresentation: boolean;
  showSalesDeck: boolean;
  setShowSalesDeck: (show: boolean) => void;
  showSlideshow: boolean;
  setShowSlideshow: (show: boolean) => void;
  initialSlide: number;
  setInitialSlide: (slide: number) => void;
}) {
  const { state, toggleSidebar } = useSidebar();
  const isSidebarOpen = state === "expanded";
  
  // Enable Ctrl+B / ⌘+B keyboard shortcut for sidebar toggle
  useKeyboardShortcuts([], toggleSidebar);

  return (
    <>
      <PresentationModeBar />
      <div className={cn(
        "min-h-screen flex w-full max-w-[100vw] overflow-x-hidden",
        isRightSidebar && "flex-row-reverse",
        isDemoMode && "pt-11"
      )}>
        {/* Hide sidebar on mobile - use hamburger menu instead */}
        {!isMobile && <AppSidebar />}
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <header className={cn(
            "sticky z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
            isDemoMode ? "top-11" : "top-0"
          )}>
            {isMobile ? <MobileNav /> : <SidebarTrigger className="-ml-1" />}
            <PageTitle />
            <div className="ml-auto flex items-center gap-2">
              {isDemoMode && canAccessPresentationMode && (
                <PresentationModeToggle 
                  onGenerateDeck={() => setShowSalesDeck(true)} 
                  onStartSlideshow={() => {
                    setInitialSlide(0);
                    setShowSlideshow(true);
                  }}
                />
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
      
      {/* Floating Sidebar Toggle - Shows when sidebar is collapsed */}
      {!isMobile && !isSidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "fixed left-4 top-1/2 -translate-y-1/2 z-50 rounded-full shadow-lg bg-background/95 backdrop-blur border-2 hover:border-primary/50 hover:bg-primary/10 transition-all",
            isFromPresentation 
              ? "h-12 w-12 border-primary/20" 
              : "h-10 w-10 border-border/50"
          )}
        >
          <PanelLeft className={isFromPresentation ? "h-5 w-5" : "h-4 w-4"} />
          <span className="sr-only">Open sidebar (Ctrl+B)</span>
        </Button>
      )}
      
      {/* Return to Presentation Button (shown when viewing demo from presentation) */}
      <ReturnToPresentationButton />
      
      {/* Smart notification prompt */}
      <NotificationPrompt />
      
      {/* Sales Deck Generator Dialog */}
      <SalesDeckGenerator 
        isOpen={showSalesDeck} 
        onClose={() => setShowSalesDeck(false)} 
      />
      
      {/* Presentation Slideshow */}
      <PresentationSlideViewer
        isOpen={showSlideshow}
        onClose={() => setShowSlideshow(false)}
        initialSlide={initialSlide}
      />
    </>
  );
}
