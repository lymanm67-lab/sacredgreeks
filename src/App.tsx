// Cache bust v12 - 2026-02-16 - Provider refactor + console cleanup
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";
import { CookieConsent } from "@/components/CookieConsent";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";
import { CelebrationProvider } from "@/contexts/CelebrationContext";
import { DemoModeProvider } from "@/contexts/DemoModeContext";
import { BetaFeedbackWidget } from "@/components/BetaFeedbackWidget";
import { GlobalDemoIndicator } from "@/components/GlobalDemoIndicator";
import { DemoBanner } from "@/components/DemoBanner";
import { DemoModeTour } from "@/components/DemoModeTour";
import { DemoComparisonWrapper } from "@/components/demo/DemoComparisonWrapper";
import { DemoAnalyticsDashboardWrapper } from "@/components/demo/DemoAnalyticsDashboardWrapper";
import { DemoTemplateSelectorProvider } from "@/components/demo/DemoTemplateSelectorWrapper";
import { DemoOverlayWithTemplate } from "@/components/demo/DemoOverlayWithTemplate";
import { DemoFeaturesProvider } from "@/components/demo/DemoFeaturesProvider";
import { WhatsNewModal } from "@/components/WhatsNewModal";
import { GlobalSEO } from "@/components/GlobalSEO";
import { UpdateNotification } from "@/components/UpdateNotification";
import { Loader2 } from "lucide-react";
import { composeProviders } from "@/lib/composeProviders";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { RouteAnnouncer } from "@/components/ui/LiveRegion";

// Split route definitions
import { publicRoutes } from "@/routes/publicRoutes";
import { layoutRoutes } from "@/routes/layoutRoutes";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { seoRoutes } from "@/routes/seoRoutes";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-sacred" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst',
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// Compose context providers to avoid deep nesting
const AppProviders = composeProviders(
  ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>,
  ({ children }) => <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>,
  ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  AuthProvider,
  DemoModeProvider,
  DemoTemplateSelectorProvider,
  DemoFeaturesProvider,
  CelebrationProvider,
  TooltipProvider,
);

const App = () => (
  <AppProviders>
    <Toaster />
    <Sonner />
    <InstallPrompt />
    <OfflineIndicator />
    <AIAssistantWidget />
    <SkipToContent />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteAnnouncer />
      <GlobalSEO />
      <DemoBanner />
      <DemoOverlayWithTemplate />
      <DemoComparisonWrapper />
      <DemoAnalyticsDashboardWrapper />
      <BetaFeedbackWidget />
      <CookieConsent />
      <WhatsNewModal />
      <UpdateNotification />
      <AnalyticsProvider>
        <DemoModeTour />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {publicRoutes}
            {layoutRoutes}
            {seoRoutes}
            {protectedRoutes}
          </Routes>
        </Suspense>
      </AnalyticsProvider>
    </BrowserRouter>
  </AppProviders>
);

export default App;
