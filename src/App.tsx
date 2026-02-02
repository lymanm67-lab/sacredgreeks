// Cache bust v9 - 2026-02-02 - ChapterFinder with AppLayout sidebar
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { DemoBanner } from "@/components/DemoBanner";
import { DemoModeTour } from "@/components/DemoModeTour";
import { DemoComparisonWrapper } from "@/components/demo/DemoComparisonWrapper";
import { DemoAnalyticsDashboardWrapper } from "@/components/demo/DemoAnalyticsDashboardWrapper";
import { DemoTemplateSelectorProvider } from "@/components/demo/DemoTemplateSelectorWrapper";
import { DemoOverlayWithTemplate } from "@/components/demo/DemoOverlayWithTemplate";
import { DemoFeaturesProvider } from "@/components/demo/DemoFeaturesProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { WhatsNewModal } from "@/components/WhatsNewModal";
import { GlobalSEO } from "@/components/GlobalSEO";
import { UpdateNotification } from "@/components/UpdateNotification";
import { Loader2 } from "lucide-react";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn";

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
const OathsGuide = lazy(() => import("./pages/OathsGuide"));
const BeautyOrigins = lazy(() => import("./pages/BeautyOrigins"));
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
const Legal = lazy(() => import("./pages/Legal"));
const IPDocumentation = lazy(() => import("./pages/IPDocumentation"));
const TrademarkTracking = lazy(() => import("./pages/TrademarkTracking"));
const TrademarkUsageGuide = lazy(() => import("./pages/TrademarkUsageGuide"));
const Changelog = lazy(() => import("./pages/Changelog"));
// InstallGuide removed - redirects to /install
const ShareToolkit = lazy(() => import("./pages/ShareToolkit"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const EmailAnalytics = lazy(() => import("./pages/admin/EmailAnalytics"));
const LandingAnalytics = lazy(() => import("./pages/admin/LandingAnalytics"));
const LandingABTest = lazy(() => import("./pages/LandingABTest"));
const LeadSegmentation = lazy(() => import("./pages/admin/LeadSegmentation"));
const FaithSnapshot = lazy(() => import("./pages/FaithSnapshot"));
const MarketingDashboard = lazy(() => import("./pages/admin/MarketingDashboard"));
const NotificationPreferences = lazy(() => import("./pages/NotificationPreferences"));
const CoachingApplication = lazy(() => import("./pages/CoachingApplication"));
const AntiHazing = lazy(() => import("./pages/AntiHazing"));
// MeetDrLyman removed - redirects to /about-creator
const WebinarRegister = lazy(() => import("./pages/WebinarRegister"));
const TheChallenge = lazy(() => import("./pages/TheChallenge"));
const BiblicalGuides = lazy(() => import("./pages/BiblicalGuides"));
const TheBook = lazy(() => import("./pages/TheBook"));
const Contact = lazy(() => import("./pages/Contact"));
// ToolsResources removed - redirects to /resources
const HealingResources = lazy(() => import("./pages/HealingResources"));
const OrganizationDetail = lazy(() => import("./pages/OrganizationDetail"));
const ProofCourse = lazy(() => import("./pages/ProofCourse"));
const ProofAssessment = lazy(() => import("./pages/ProofAssessment"));
const ChurchLeaders = lazy(() => import("./pages/ChurchLeaders"));
const FaithAuthority = lazy(() => import("./pages/FaithAuthority"));
const ChapterKit = lazy(() => import("./pages/ChapterKit"));
const EconomicHistory = lazy(() => import("./pages/EconomicHistory"));
const GreekLifeTraining = lazy(() => import("./pages/GreekLifeTraining"));
const GuestPanelistApplication = lazy(() => import("./pages/GuestPanelistApplication"));
const AboutCreator = lazy(() => import("./pages/AboutCreator"));
const OrderBook = lazy(() => import("./pages/OrderBook"));
const SpeakingRequest = lazy(() => import("./pages/SpeakingRequest"));
const ParentsFamily = lazy(() => import("./pages/ParentsFamily"));
const TrainingSuccessVault = lazy(() => import("./pages/TrainingSuccessVault"));
const ShouldYouStayOrLeave = lazy(() => import("./pages/ShouldYouStayOrLeave"));
const SaintsOrSellouts = lazy(() => import("./pages/SaintsOrSellouts"));
const HiddenInPlainSight = lazy(() => import("./pages/HiddenInPlainSight"));

// SEO Landing Pages
const ChristianGreekLife = lazy(() => import("./pages/seo/ChristianGreekLife"));
const DivineNineFaith = lazy(() => import("./pages/seo/DivineNineFaith"));
const GreekLifeBiblicalGuidance = lazy(() => import("./pages/seo/GreekLifeBiblicalGuidance"));
const AntiHazingChristian = lazy(() => import("./pages/seo/AntiHazingChristian"));
const SpiritualGrowthGreekLife = lazy(() => import("./pages/seo/SpiritualGrowthGreekLife"));

// New Feature Pages
const ChapterChaplainToolkit = lazy(() => import("./pages/ChapterChaplainToolkit"));
const D9BusinessDirectory = lazy(() => import("./pages/D9BusinessDirectory"));
const GreekWorshipPlaylists = lazy(() => import("./pages/GreekWorshipPlaylists"));
const EventsCalendar = lazy(() => import("./pages/EventsCalendar"));
const ChapterFinder = lazy(() => import("./pages/ChapterFinder"));
const MemberNetwork = lazy(() => import("./pages/MemberNetwork"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-sacred" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

// Protected route wrapper with AppLayout
const ProtectedPageWithLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

// Public page wrapper with AppLayout (for content pages that need sidebar but not auth)
const PageWithLayout = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
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

const App = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <DemoModeProvider>
              <DemoTemplateSelectorProvider>
                <DemoFeaturesProvider>
                  <CelebrationProvider>
                    <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <InstallPrompt />
                    <OfflineIndicator />
                    <AIAssistantWidget />
                    <BrowserRouter>
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
                    {/* Public routes - no sidebar */}
                    <Route path="/" element={<Index />} />
                    <Route path="/index" element={<Navigate to="/" replace />} />
                    <Route path="/land" element={<LandingABTest />} />
                    <Route path="/snapshot" element={<FaithSnapshot />} />
                    <Route path="/webinar/:webinarId" element={<WebinarRegister />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/login" element={<Navigate to="/signin" replace />} />
                    <Route path="/au" element={<Navigate to="/auth" replace />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/install" element={<Install />} />
                    <Route path="/shared/:token" element={<SharedResult />} />
                    <Route path="/study-guide" element={<StudyGuide />} />
                    <Route path="/study" element={<Navigate to="/study-guide" replace />} />
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
                    <Route path="/myth-buster" element={<PageWithLayout><MythBuster /></PageWithLayout>} />
                    <Route path="/symbol-guide" element={<PageWithLayout><SymbolGuide /></PageWithLayout>} />
                    <Route path="/oaths" element={<PageWithLayout><OathsGuide /></PageWithLayout>} />
                    <Route path="/beauty-origins" element={<BeautyOrigins />} />
                    <Route path="/organization/:orgId" element={<OrganizationDetail />} />
                    <Route path="/ask-dr-lyman" element={<AskDrLyman />} />
                    <Route path="/content-hub" element={<ContentHub />} />
                    <Route path="/pricing" element={<Subscription />} />
                    <Route path="/shattered-masks" element={<ShatteredMasks />} />
                    <Route path="/shared-symbols/:shareToken" element={<SharedSymbolBookmarks />} />
                    <Route path="/video-library" element={<VideoLibrary />} />
                    <Route path="/user-guide" element={<UserGuide />} />
                    <Route path="/beta-signup" element={<BetaSignup />} />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/ip-documentation" element={<IPDocumentation />} />
                    <Route path="/trademark-tracking" element={<TrademarkTracking />} />
                    <Route path="/trademark-usage-guide" element={<TrademarkUsageGuide />} />
                    <Route path="/changelog" element={<Changelog />} />
                    <Route path="/install-guide" element={<Navigate to="/install" replace />} />
                    <Route path="/share-toolkit" element={<ShareToolkit />} />
                    <Route path="/coaching-application" element={<CoachingApplication />} />
                    <Route path="/anti-hazing" element={<AntiHazing />} />
                    <Route path="/meet-dr-lyman" element={<Navigate to="/about-creator" replace />} />
                    <Route path="/challenge" element={<Navigate to="/the-challenge" replace />} />
                    <Route path="/the-challenge" element={<TheChallenge />} />
                    <Route path="/biblical-guides" element={<BiblicalGuides />} />
                    <Route path="/the-book" element={<TheBook />} />
                    <Route path="/book" element={<Navigate to="/the-book" replace />} />
                    <Route path="/greek-life" element={<Navigate to="/greek-life-training" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tools-resources" element={<Navigate to="/resources" replace />} />
                    <Route path="/healing-resources" element={<HealingResources />} />
                    <Route path="/proof-course" element={<PageWithLayout><ProofCourse /></PageWithLayout>} />
                    <Route path="/proof-assessment" element={<PageWithLayout><ProofAssessment /></PageWithLayout>} />
                    <Route path="/church-leaders" element={<PageWithLayout><ChurchLeaders /></PageWithLayout>} />
                    <Route path="/parents-family" element={<PageWithLayout><ParentsFamily /></PageWithLayout>} />
                    <Route path="/faith-authority" element={<PageWithLayout><FaithAuthority /></PageWithLayout>} />
                    <Route path="/should-you-stay-or-leave" element={<PageWithLayout><ShouldYouStayOrLeave /></PageWithLayout>} />
                    <Route path="/saints-or-sellouts" element={<SaintsOrSellouts />} />
                    <Route path="/hidden-in-plain-sight" element={<HiddenInPlainSight />} />
                    <Route path="/chapter-kit" element={<ChapterKit />} />
                    <Route path="/economic-history" element={<EconomicHistory />} />
                    <Route path="/ancient-guild-training" element={<Navigate to="/greek-life-training" replace />} />
                    <Route path="/training" element={<Navigate to="/greek-life-training" replace />} />
                    <Route path="/greek-life-training" element={<PageWithLayout><GreekLifeTraining /></PageWithLayout>} />
                    <Route path="/training-vault" element={<PageWithLayout><TrainingSuccessVault /></PageWithLayout>} />
                    <Route path="/guest-panelist-application" element={<GuestPanelistApplication />} />
                    <Route path="/about-creator" element={<AboutCreator />} />
                    <Route path="/order-book" element={<OrderBook />} />
                    <Route path="/speaking-request" element={<SpeakingRequest />} />
                    
{/* SEO Landing Pages */}
                    <Route path="/christian-greek-life" element={<ChristianGreekLife />} />
                    <Route path="/divine-nine-faith" element={<DivineNineFaith />} />
                    <Route path="/greek-life-biblical-guidance" element={<GreekLifeBiblicalGuidance />} />
                    <Route path="/anti-hazing-christian" element={<AntiHazingChristian />} />
                    <Route path="/spiritual-growth-greek-life" element={<SpiritualGrowthGreekLife />} />
                    
                    {/* New Feature Pages */}
                    <Route path="/chaplain-toolkit" element={<ChapterChaplainToolkit />} />
                    <Route path="/business-directory" element={<D9BusinessDirectory />} />
                    <Route path="/worship-playlists" element={<GreekWorshipPlaylists />} />
                    <Route path="/events" element={<EventsCalendar />} />
                    <Route path="/chapters" element={<PageWithLayout><ChapterFinder /></PageWithLayout>} />
                    <Route path="/network" element={<MemberNetwork />} />
                    
                    {/* Protected routes - with sidebar */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedPageWithLayout>
                          <Dashboard />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/beta-dashboard"
                      element={
                        <ProtectedPageWithLayout>
                          <BetaDashboard />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/prayer-guide"
                      element={
                        <ProtectedPageWithLayout>
                          <PrayerGuide />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/achievements"
                      element={
                        <ProtectedPageWithLayout>
                          <Achievements />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/devotional"
                      element={
                        <ProtectedPageWithLayout>
                          <Devotional />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/prayer-journal"
                      element={
                        <ProtectedPageWithLayout>
                          <PrayerJournal />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/prayer-wall"
                      element={
                        <ProtectedPageWithLayout>
                          <PrayerWall />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/assessment-history"
                      element={
                        <ProtectedPageWithLayout>
                          <AssessmentHistory />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedPageWithLayout>
                          <Profile />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/bookmarks"
                      element={
                        <ProtectedPageWithLayout>
                          <Bookmarks />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/bible-study"
                      element={
                        <ProtectedPageWithLayout>
                          <BibleStudy />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/offline-settings"
                      element={
                        <ProtectedPageWithLayout>
                          <OfflineSettings />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/service-tracker"
                      element={
                        <ProtectedPageWithLayout>
                          <ServiceTracker />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/progress"
                      element={
                        <ProtectedPageWithLayout>
                          <Progress />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedPageWithLayout>
                          <Admin />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/admin/email-analytics"
                      element={
                        <ProtectedPageWithLayout>
                          <EmailAnalytics />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/admin/landing-analytics"
                      element={
                        <ProtectedPageWithLayout>
                          <LandingAnalytics />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/admin/lead-segmentation"
                      element={
                        <ProtectedPageWithLayout>
                          <LeadSegmentation />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/admin/marketing"
                      element={
                        <ProtectedPageWithLayout>
                          <MarketingDashboard />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/beta-checklist"
                      element={
                        <ProtectedPageWithLayout>
                          <BetaLaunchChecklist />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/community"
                      element={
                        <ProtectedPageWithLayout>
                          <OrgCommunity />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/forum"
                      element={
                        <ProtectedPageWithLayout>
                          <Forum />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/analytics"
                      element={
                        <ProtectedPageWithLayout>
                          <AnalyticsDashboard />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route
                      path="/notification-preferences"
                      element={
                        <ProtectedPageWithLayout>
                          <NotificationPreferences />
                        </ProtectedPageWithLayout>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AnalyticsProvider>
              </BrowserRouter>
                  </TooltipProvider>
                </CelebrationProvider>
              </DemoFeaturesProvider>
            </DemoTemplateSelectorProvider>
            </DemoModeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
