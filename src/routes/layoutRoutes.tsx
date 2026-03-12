import { lazy } from "react";
import { Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

const MythBuster = lazy(() => import("@/pages/MythBuster"));
const SymbolGuide = lazy(() => import("@/pages/SymbolGuide"));
const OathsGuide = lazy(() => import("@/pages/OathsGuide"));
const ProofCourse = lazy(() => import("@/pages/ProofCourse"));
const ProofAssessment = lazy(() => import("@/pages/ProofAssessment"));
const AssessmentsHub = lazy(() => import("@/pages/AssessmentsHub"));
const ChurchLeaders = lazy(() => import("@/pages/ChurchLeaders"));
const ParentsFamily = lazy(() => import("@/pages/ParentsFamily"));
const FaithAuthority = lazy(() => import("@/pages/FaithAuthority"));
const ShouldYouStayOrLeave = lazy(() => import("@/pages/ShouldYouStayOrLeave"));
const GreekLifeTraining = lazy(() => import("@/pages/GreekLifeTraining"));
const TrainingSuccessVault = lazy(() => import("@/pages/TrainingSuccessVault"));
const AIWorkers = lazy(() => import("@/pages/AIWorkers"));
const ChapterFinder = lazy(() => import("@/pages/ChapterFinder"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const FinancialStewardship = lazy(() => import("@/pages/FinancialStewardship"));
const SacredMoneyCourse = lazy(() => import("@/pages/SacredMoneyCourse"));
const ChapterChaplainToolkit = lazy(() => import("@/pages/ChapterChaplainToolkit"));
const D9BusinessDirectory = lazy(() => import("@/pages/D9BusinessDirectory"));
const SubmitBusiness = lazy(() => import("@/pages/SubmitBusiness"));
const GreekWorshipPlaylists = lazy(() => import("@/pages/GreekWorshipPlaylists"));
const EventsCalendar = lazy(() => import("@/pages/EventsCalendar"));
const MemberNetwork = lazy(() => import("@/pages/MemberNetwork"));
const EBoardTraining = lazy(() => import("@/pages/EBoardTraining"));
const LeadershipAcademy = lazy(() => import("@/pages/LeadershipAcademy"));
const MentorDashboard = lazy(() => import("@/pages/MentorDashboard"));
const JoinGroup = lazy(() => import("@/pages/JoinGroup"));
// Public pages with sidebar layout (no auth required)
const PageWithLayout = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

export const layoutRoutes = (
  <>
    <Route path="/myth-buster" element={<PageWithLayout><MythBuster /></PageWithLayout>} />
    <Route path="/symbol-guide" element={<PageWithLayout><SymbolGuide /></PageWithLayout>} />
    <Route path="/oaths" element={<PageWithLayout><OathsGuide /></PageWithLayout>} />
    <Route path="/proof-course" element={<PageWithLayout><ProofCourse /></PageWithLayout>} />
    <Route path="/proof-assessment" element={<PageWithLayout><ProofAssessment /></PageWithLayout>} />
    <Route path="/assessments" element={<PageWithLayout><AssessmentsHub /></PageWithLayout>} />
    <Route path="/church-leaders" element={<PageWithLayout><ChurchLeaders /></PageWithLayout>} />
    <Route path="/parents-family" element={<PageWithLayout><ParentsFamily /></PageWithLayout>} />
    <Route path="/faith-authority" element={<PageWithLayout><FaithAuthority /></PageWithLayout>} />
    <Route path="/should-you-stay-or-leave" element={<PageWithLayout><ShouldYouStayOrLeave /></PageWithLayout>} />
    <Route path="/greek-life-training" element={<PageWithLayout><GreekLifeTraining /></PageWithLayout>} />
    <Route path="/training-vault" element={<PageWithLayout><TrainingSuccessVault /></PageWithLayout>} />
    <Route path="/ai-workers" element={<PageWithLayout><AIWorkers /></PageWithLayout>} />
    <Route path="/chapters" element={<PageWithLayout><ChapterFinder /></PageWithLayout>} />
    <Route path="/contacts" element={<PageWithLayout><Contacts /></PageWithLayout>} />
    <Route path="/financial-stewardship" element={<PageWithLayout><FinancialStewardship /></PageWithLayout>} />
    <Route path="/sacred-money-course" element={<PageWithLayout><SacredMoneyCourse /></PageWithLayout>} />
    <Route path="/chaplain-toolkit" element={<PageWithLayout><ChapterChaplainToolkit /></PageWithLayout>} />
    <Route path="/business-directory" element={<D9BusinessDirectory />} />
    <Route path="/submit-business" element={<SubmitBusiness />} />
    <Route path="/worship-playlists" element={<GreekWorshipPlaylists />} />
    <Route path="/events" element={<EventsCalendar />} />
    <Route path="/network" element={<MemberNetwork />} />
    <Route path="/eboard-training" element={<PageWithLayout><EBoardTraining /></PageWithLayout>} />
    <Route path="/leadership-academy" element={<PageWithLayout><LeadershipAcademy /></PageWithLayout>} />
    <Route path="/mentor-dashboard" element={<PageWithLayout><MentorDashboard /></PageWithLayout>} />
    <Route path="/join-group" element={<PageWithLayout><JoinGroup /></PageWithLayout>} />
  </>
);
