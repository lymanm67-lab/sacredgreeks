import { lazy } from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Devotional = lazy(() => import("@/pages/Devotional"));
const PrayerJournal = lazy(() => import("@/pages/PrayerJournal"));
const PrayerWall = lazy(() => import("@/pages/PrayerWall"));
const AssessmentHistory = lazy(() => import("@/pages/AssessmentHistory"));
const Profile = lazy(() => import("@/pages/Profile"));
const Bookmarks = lazy(() => import("@/pages/Bookmarks"));
const Admin = lazy(() => import("@/pages/Admin"));
const Progress = lazy(() => import("@/pages/Progress"));
const BibleStudy = lazy(() => import("@/pages/BibleStudy"));
const ServiceTracker = lazy(() => import("@/pages/ServiceTracker"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const OfflineSettings = lazy(() => import("@/pages/OfflineSettings"));
const PrayerGuide = lazy(() => import("@/pages/PrayerGuide"));
const BetaLaunchChecklist = lazy(() => import("@/pages/BetaLaunchChecklist"));
const BetaDashboard = lazy(() => import("@/pages/BetaDashboard"));
const OrgCommunity = lazy(() => import("@/pages/OrgCommunity"));
const Forum = lazy(() => import("@/pages/Forum"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));
const EmailAnalytics = lazy(() => import("@/pages/admin/EmailAnalytics"));
const LandingAnalytics = lazy(() => import("@/pages/admin/LandingAnalytics"));
const LeadSegmentation = lazy(() => import("@/pages/admin/LeadSegmentation"));
const MarketingDashboard = lazy(() => import("@/pages/admin/MarketingDashboard"));
const NotificationPreferences = lazy(() => import("@/pages/NotificationPreferences"));
const ChapterFinance = lazy(() => import("@/pages/ChapterFinance"));
const ContentAgent = lazy(() => import("@/pages/ContentAgent"));
const Present = lazy(() => import("@/pages/Present"));

const ProtectedPageWithLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

export const protectedRoutes = (
  <>
    <Route path="/dashboard" element={<ProtectedPageWithLayout><Dashboard /></ProtectedPageWithLayout>} />
    <Route path="/beta-dashboard" element={<ProtectedPageWithLayout><BetaDashboard /></ProtectedPageWithLayout>} />
    <Route path="/prayer-guide" element={<ProtectedPageWithLayout><PrayerGuide /></ProtectedPageWithLayout>} />
    <Route path="/achievements" element={<ProtectedPageWithLayout><Achievements /></ProtectedPageWithLayout>} />
    <Route path="/devotional" element={<ProtectedPageWithLayout><Devotional /></ProtectedPageWithLayout>} />
    <Route path="/prayer-journal" element={<ProtectedPageWithLayout><PrayerJournal /></ProtectedPageWithLayout>} />
    <Route path="/prayer-wall" element={<ProtectedPageWithLayout><PrayerWall /></ProtectedPageWithLayout>} />
    <Route path="/assessment-history" element={<ProtectedPageWithLayout><AssessmentHistory /></ProtectedPageWithLayout>} />
    <Route path="/profile" element={<ProtectedPageWithLayout><Profile /></ProtectedPageWithLayout>} />
    <Route path="/bookmarks" element={<ProtectedPageWithLayout><Bookmarks /></ProtectedPageWithLayout>} />
    <Route path="/bible-study" element={<ProtectedPageWithLayout><BibleStudy /></ProtectedPageWithLayout>} />
    <Route path="/offline-settings" element={<ProtectedPageWithLayout><OfflineSettings /></ProtectedPageWithLayout>} />
    <Route path="/service-tracker" element={<ProtectedPageWithLayout><ServiceTracker /></ProtectedPageWithLayout>} />
    <Route path="/chapter-finance" element={<ProtectedPageWithLayout><ChapterFinance /></ProtectedPageWithLayout>} />
    <Route path="/progress" element={<ProtectedPageWithLayout><Progress /></ProtectedPageWithLayout>} />
    <Route path="/admin" element={<ProtectedPageWithLayout><Admin /></ProtectedPageWithLayout>} />
    <Route path="/admin/email-analytics" element={<ProtectedPageWithLayout><EmailAnalytics /></ProtectedPageWithLayout>} />
    <Route path="/admin/landing-analytics" element={<ProtectedPageWithLayout><LandingAnalytics /></ProtectedPageWithLayout>} />
    <Route path="/admin/lead-segmentation" element={<ProtectedPageWithLayout><LeadSegmentation /></ProtectedPageWithLayout>} />
    <Route path="/admin/marketing" element={<ProtectedPageWithLayout><MarketingDashboard /></ProtectedPageWithLayout>} />
    <Route path="/beta-checklist" element={<ProtectedPageWithLayout><BetaLaunchChecklist /></ProtectedPageWithLayout>} />
    <Route path="/community" element={<ProtectedPageWithLayout><OrgCommunity /></ProtectedPageWithLayout>} />
    <Route path="/forum" element={<ProtectedPageWithLayout><Forum /></ProtectedPageWithLayout>} />
    <Route path="/analytics" element={<ProtectedPageWithLayout><AnalyticsDashboard /></ProtectedPageWithLayout>} />
    <Route path="/notification-preferences" element={<ProtectedPageWithLayout><NotificationPreferences /></ProtectedPageWithLayout>} />
    <Route path="/content-agent" element={<ProtectedPageWithLayout><ContentAgent /></ProtectedPageWithLayout>} />
    <Route path="/present" element={<ProtectedPageWithLayout><Present /></ProtectedPageWithLayout>} />
  </>
);
