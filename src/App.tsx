import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Lazy load non-critical pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Devotional = lazy(() => import("./pages/Devotional"));
const PrayerJournal = lazy(() => import("./pages/PrayerJournal"));
const PrayerWall = lazy(() => import("./pages/PrayerWall"));
const AssessmentHistory = lazy(() => import("./pages/AssessmentHistory"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const Guide = lazy(() => import("./pages/Guide"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Progress = lazy(() => import("./pages/Progress"));
const SharedResult = lazy(() => import("./pages/SharedResult"));
const Install = lazy(() => import("./pages/Install"));
const BibleStudy = lazy(() => import("./pages/BibleStudy"));
const ServiceTracker = lazy(() => import("./pages/ServiceTracker"));
const StudyGuide = lazy(() => import("./pages/StudyGuide"));
const Podcast = lazy(() => import("./pages/Podcast"));
const Achievements = lazy(() => import("./pages/Achievements"));
const DidYouKnow = lazy(() => import("./pages/DidYouKnow"));
const OfflineSettings = lazy(() => import("./pages/OfflineSettings"));
const ArticleLibrary = lazy(() => import("./pages/ArticleLibrary"));
const PrayerGuide = lazy(() => import("./pages/PrayerGuide"));
const QRCodePage = lazy(() => import("./pages/QRCode"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const PodcastAppearances = lazy(() => import("./pages/PodcastAppearances"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const FamilyMinistryFallout = lazy(() => import("./pages/FamilyMinistryFallout"));
const Journey = lazy(() => import("./pages/Journey"));
const MythBuster = lazy(() => import("./pages/MythBuster"));
const SymbolGuide = lazy(() => import("./pages/SymbolGuide"));
const AskDrLyman = lazy(() => import("./pages/AskDrLyman"));
const ContentHub = lazy(() => import("./pages/ContentHub"));
const Subscription = lazy(() => import("./pages/Subscription"));
const ShatteredMasks = lazy(() => import("./pages/ShatteredMasks"));
const SharedSymbolBookmarks = lazy(() => import("./pages/SharedSymbolBookmarks"));
const VideoLibrary = lazy(() => import("./pages/VideoLibrary"));
const BetaLaunchChecklist = lazy(() => import("./pages/BetaLaunchChecklist"));
const BetaSignup = lazy(() => import("./pages/BetaSignup"));
const BetaDashboard = lazy(() => import("./pages/BetaDashboard"));
const UserGuide = lazy(() => import("./pages/UserGuide"));
const OrgCommunity = lazy(() => import("./pages/OrgCommunity"));
const Forum = lazy(() => import("./pages/Forum"));

// Loading fallback component
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
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DemoModeProvider>
            <CelebrationProvider>
              <TooltipProvider>
            <Toaster />
            <Sonner />
            <InstallPrompt />
            <OfflineIndicator />
            <AIAssistantWidget />
            <BrowserRouter>
              <BetaFeedbackWidget />
              <GlobalDemoIndicator />
              <CookieConsent />
              <AnalyticsProvider>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/install" element={<Install />} />
                    <Route path="/shared/:token" element={<SharedResult />} />
                    <Route path="/study" element={<StudyGuide />} />
                    <Route path="/podcast" element={<Podcast />} />
                    <Route path="/podcast-appearances" element={<PodcastAppearances />} />
                    <Route path="/did-you-know" element={<DidYouKnow />} />
                    <Route path="/articles" element={<ArticleLibrary />} />
                    <Route path="/qr-code" element={<QRCodePage />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/family-ministry-fallout" element={<FamilyMinistryFallout />} />
                    <Route path="/church-hurt-healing" element={<FamilyMinistryFallout />} />
                    <Route path="/journey" element={<Journey />} />
                    <Route path="/myth-buster" element={<MythBuster />} />
                    <Route path="/symbol-guide" element={<SymbolGuide />} />
                    <Route path="/ask-dr-lyman" element={<AskDrLyman />} />
                    <Route path="/content-hub" element={<ContentHub />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/pricing" element={<Subscription />} />
                    <Route path="/shattered-masks" element={<ShatteredMasks />} />
                    <Route path="/shared-symbols/:shareToken" element={<SharedSymbolBookmarks />} />
                    <Route path="/video-library" element={<VideoLibrary />} />
                    <Route path="/user-guide" element={<UserGuide />} />
                    <Route path="/beta-signup" element={<BetaSignup />} />
                    <Route
                      path="/beta-dashboard"
                      element={
                        <ProtectedRoute>
                          <BetaDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/prayer-guide"
                      element={
                        <ProtectedRoute>
                          <PrayerGuide />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/achievements"
                      element={
                        <ProtectedRoute>
                          <Achievements />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/guide" element={<Guide />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/devotional"
                      element={
                        <ProtectedRoute>
                          <Devotional />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/prayer-journal"
                      element={
                        <ProtectedRoute>
                          <PrayerJournal />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/prayer-wall"
                      element={
                        <ProtectedRoute>
                          <PrayerWall />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/assessment-history"
                      element={
                        <ProtectedRoute>
                          <AssessmentHistory />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/bookmarks"
                      element={
                        <ProtectedRoute>
                          <Bookmarks />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/bible-study"
                      element={
                        <ProtectedRoute>
                          <BibleStudy />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/offline-settings"
                      element={
                        <ProtectedRoute>
                          <OfflineSettings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/service-tracker"
                      element={
                        <ProtectedRoute>
                          <ServiceTracker />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/progress"
                      element={
                        <ProtectedRoute>
                          <Progress />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/beta-checklist"
                      element={
                        <ProtectedRoute>
                          <BetaLaunchChecklist />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/community"
                      element={
                        <ProtectedRoute>
                          <OrgCommunity />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/forum"
                      element={
                        <ProtectedRoute>
                          <Forum />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AnalyticsProvider>
            </BrowserRouter>
              </TooltipProvider>
            </CelebrationProvider>
          </DemoModeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
