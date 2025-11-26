import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";
import { CookieConsent } from "@/components/CookieConsent";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { BetaFeedbackWidget } from "@/components/BetaFeedbackWidget";
import { AIAssistantWidget } from "@/components/AIAssistantWidget";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";
import { CelebrationProvider } from "@/contexts/CelebrationContext";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Devotional from "./pages/Devotional";
import PrayerJournal from "./pages/PrayerJournal";
import PrayerWall from "./pages/PrayerWall";
import AssessmentHistory from "./pages/AssessmentHistory";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import FAQ from "./pages/FAQ";
import Bookmarks from "./pages/Bookmarks";
import Guide from "./pages/Guide";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Progress from "./pages/Progress";
import SharedResult from "./pages/SharedResult";
import Install from "./pages/Install";
import BibleStudy from "./pages/BibleStudy";
import ServiceTracker from "./pages/ServiceTracker";
import StudyGuide from "./pages/StudyGuide";
import Podcast from "./pages/Podcast";
import Achievements from "./pages/Achievements";
import DidYouKnow from "./pages/DidYouKnow";
import OfflineSettings from "./pages/OfflineSettings";
import ArticleLibrary from "./pages/ArticleLibrary";
import PrayerGuide from "./pages/PrayerGuide";
import QRCodePage from "./pages/QRCode";
import Resources from "./pages/Resources";
import About from "./pages/About";
import PodcastAppearances from "./pages/PodcastAppearances";
import Analytics from "./pages/Analytics";
import BetaOnboarding from "./pages/BetaOnboarding";
import ReferralDashboard from "./pages/ReferralDashboard";
import FMMPAAssessment from "./pages/FMMPAAssessment";
import SharedCertificate from "./pages/SharedCertificate";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CelebrationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <InstallPrompt />
            <OfflineIndicator />
            <BetaFeedbackWidget />
            <AIAssistantWidget />
            <BrowserRouter>
              <CookieConsent />
              <AnalyticsProvider>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
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
                 <Route path="/assessment/fmmpa" element={<FMMPAAssessment />} />
                 <Route path="/certificate/share/:shareToken" element={<SharedCertificate />} />
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
              <Route
                path="/guide"
                element={
                  <ProtectedRoute>
                    <Guide />
                  </ProtectedRoute>
                }
              />
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
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/beta-onboarding"
                element={
                  <ProtectedRoute>
                    <BetaOnboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/referrals"
                element={
                  <ProtectedRoute>
                    <ReferralDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </AnalyticsProvider>
          </BrowserRouter>
        </TooltipProvider>
      </CelebrationProvider>
    </AuthProvider>
  </QueryClientProvider>
</ErrorBoundary>
);

export default App;
