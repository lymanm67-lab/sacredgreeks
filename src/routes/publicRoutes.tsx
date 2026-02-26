import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

// Eager load critical pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import SignIn from "@/pages/SignIn";

const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Install = lazy(() => import("@/pages/Install"));
const SharedResult = lazy(() => import("@/pages/SharedResult"));
const StudyGuide = lazy(() => import("@/pages/StudyGuide"));
const Podcast = lazy(() => import("@/pages/Podcast"));
const PodcastAppearances = lazy(() => import("@/pages/PodcastAppearances"));
const DidYouKnow = lazy(() => import("@/pages/DidYouKnow"));
const ArticleLibrary = lazy(() => import("@/pages/ArticleLibrary"));
const QRCodePage = lazy(() => import("@/pages/QRCode"));
const Resources = lazy(() => import("@/pages/Resources"));
const About = lazy(() => import("@/pages/About"));
const FamilyMinistryFallout = lazy(() => import("@/pages/FamilyMinistryFallout"));
const Journey = lazy(() => import("@/pages/Journey"));
const BeautyOrigins = lazy(() => import("@/pages/BeautyOrigins"));
const OrganizationDetail = lazy(() => import("@/pages/OrganizationDetail"));
const AskDrLyman = lazy(() => import("@/pages/AskDrLyman"));
const ContentHub = lazy(() => import("@/pages/ContentHub"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const ShatteredMasks = lazy(() => import("@/pages/ShatteredMasks"));
const SharedSymbolBookmarks = lazy(() => import("@/pages/SharedSymbolBookmarks"));
const VideoLibrary = lazy(() => import("@/pages/VideoLibrary"));
const BetaSignup = lazy(() => import("@/pages/BetaSignup"));
const UserGuide = lazy(() => import("@/pages/UserGuide"));
const Guide = lazy(() => import("@/pages/Guide"));
const Legal = lazy(() => import("@/pages/Legal"));
const IPDocumentation = lazy(() => import("@/pages/IPDocumentation"));
const TrademarkTracking = lazy(() => import("@/pages/TrademarkTracking"));
const TrademarkUsageGuide = lazy(() => import("@/pages/TrademarkUsageGuide"));
const Changelog = lazy(() => import("@/pages/Changelog"));
const ShareToolkit = lazy(() => import("@/pages/ShareToolkit"));
const LandingABTest = lazy(() => import("@/pages/LandingABTest"));
const FaithSnapshot = lazy(() => import("@/pages/FaithSnapshot"));
const CoachingApplication = lazy(() => import("@/pages/CoachingApplication"));
const AntiHazing = lazy(() => import("@/pages/AntiHazing"));
const WebinarRegister = lazy(() => import("@/pages/WebinarRegister"));
const TheChallenge = lazy(() => import("@/pages/TheChallenge"));
const BiblicalGuides = lazy(() => import("@/pages/BiblicalGuides"));
const TheBook = lazy(() => import("@/pages/TheBook"));
const Contact = lazy(() => import("@/pages/Contact"));
const HealingResources = lazy(() => import("@/pages/HealingResources"));
const SaintsOrSellouts = lazy(() => import("@/pages/SaintsOrSellouts"));
const HiddenInPlainSight = lazy(() => import("@/pages/HiddenInPlainSight"));
const ChapterKit = lazy(() => import("@/pages/ChapterKit"));
const EconomicHistory = lazy(() => import("@/pages/EconomicHistory"));
const GuestPanelistApplication = lazy(() => import("@/pages/GuestPanelistApplication"));
const AboutCreator = lazy(() => import("@/pages/AboutCreator"));
const Partner = lazy(() => import("@/pages/Partner"));
const OrderBook = lazy(() => import("@/pages/OrderBook"));
const SpeakingRequest = lazy(() => import("@/pages/SpeakingRequest"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const YouTubeCallback = lazy(() => import("@/pages/YouTubeCallback"));
const Team = lazy(() => import("@/pages/Team"));

export const publicRoutes = (
  <>
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
    <Route path="/saints-or-sellouts" element={<SaintsOrSellouts />} />
    <Route path="/hidden-in-plain-sight" element={<HiddenInPlainSight />} />
    <Route path="/chapter-kit" element={<ChapterKit />} />
    <Route path="/economic-history" element={<EconomicHistory />} />
    <Route path="/ancient-guild-training" element={<Navigate to="/greek-life-training" replace />} />
    <Route path="/training" element={<Navigate to="/greek-life-training" replace />} />
    <Route path="/guest-panelist-application" element={<GuestPanelistApplication />} />
    <Route path="/about-creator" element={<AboutCreator />} />
    <Route path="/partner" element={<Partner />} />
    <Route path="/order-book" element={<OrderBook />} />
    <Route path="/speaking-request" element={<SpeakingRequest />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/youtube-callback" element={<YouTubeCallback />} />
    <Route path="/team" element={<Team />} />
    <Route path="*" element={<NotFound />} />
  </>
);
