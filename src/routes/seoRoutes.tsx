import { lazy } from "react";
import { Route } from "react-router-dom";

// SEO Landing Pages
const ChristianGreekLife = lazy(() => import("@/pages/seo/ChristianGreekLife"));
const DivineNineFaith = lazy(() => import("@/pages/seo/DivineNineFaith"));
const GreekLifeBiblicalGuidance = lazy(() => import("@/pages/seo/GreekLifeBiblicalGuidance"));
const AntiHazingChristian = lazy(() => import("@/pages/seo/AntiHazingChristian"));
const SpiritualGrowthGreekLife = lazy(() => import("@/pages/seo/SpiritualGrowthGreekLife"));
const ShouldILeaveMyFraternity = lazy(() => import("@/pages/seo/ShouldILeaveMyFraternity"));
const IsGreekLifeASin = lazy(() => import("@/pages/seo/IsGreekLifeASin"));
const ChristianFraternityGuide = lazy(() => import("@/pages/seo/ChristianFraternityGuide"));
const DivineNineSpiritualConcerns = lazy(() => import("@/pages/seo/DivineNineSpiritualConcerns"));
const ProofFramework = lazy(() => import("@/pages/seo/ProofFramework"));

// Entry Point Landing Pages
const GreekFinancialLeadership = lazy(() => import("@/pages/landing/GreekFinancialLeadership"));
const GreekLeadership = lazy(() => import("@/pages/landing/GreekLeadership"));
const FaithAndGreekLife = lazy(() => import("@/pages/landing/FaithAndGreekLife"));

// Beta / Founding Member
const Beta = lazy(() => import("@/pages/Beta"));

export const seoRoutes = (
  <>
    <Route path="/christian-greek-life" element={<ChristianGreekLife />} />
    <Route path="/divine-nine-faith" element={<DivineNineFaith />} />
    <Route path="/greek-life-biblical-guidance" element={<GreekLifeBiblicalGuidance />} />
    <Route path="/anti-hazing-christian" element={<AntiHazingChristian />} />
    <Route path="/spiritual-growth-greek-life" element={<SpiritualGrowthGreekLife />} />
    <Route path="/greek-financial-leadership" element={<GreekFinancialLeadership />} />
    <Route path="/greek-leadership" element={<GreekLeadership />} />
    <Route path="/faith-and-greek-life" element={<FaithAndGreekLife />} />
    <Route path="/should-i-leave-my-fraternity" element={<ShouldILeaveMyFraternity />} />
    <Route path="/is-greek-life-a-sin" element={<IsGreekLifeASin />} />
    <Route path="/christian-fraternity-guide" element={<ChristianFraternityGuide />} />
    <Route path="/divine-nine-spiritual-concerns" element={<DivineNineSpiritualConcerns />} />
    <Route path="/proof-framework" element={<ProofFramework />} />
    <Route path="/beta" element={<Beta />} />
  </>
);
