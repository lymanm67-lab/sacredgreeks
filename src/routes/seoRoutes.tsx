import { lazy } from "react";
import { Route } from "react-router-dom";

// SEO Landing Pages
const ChristianGreekLife = lazy(() => import("@/pages/seo/ChristianGreekLife"));
const DivineNineFaith = lazy(() => import("@/pages/seo/DivineNineFaith"));
const GreekLifeBiblicalGuidance = lazy(() => import("@/pages/seo/GreekLifeBiblicalGuidance"));
const AntiHazingChristian = lazy(() => import("@/pages/seo/AntiHazingChristian"));
const SpiritualGrowthGreekLife = lazy(() => import("@/pages/seo/SpiritualGrowthGreekLife"));

// Entry Point Landing Pages
const GreekFinancialLeadership = lazy(() => import("@/pages/landing/GreekFinancialLeadership"));
const GreekLeadership = lazy(() => import("@/pages/landing/GreekLeadership"));
const FaithAndGreekLife = lazy(() => import("@/pages/landing/FaithAndGreekLife"));

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
  </>
);
