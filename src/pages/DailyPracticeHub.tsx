import { lazy, Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Journey = lazy(() => import("@/pages/Journey"));
const BibleStudy = lazy(() => import("@/pages/BibleStudy"));

const TABS = [
  { value: "journey", label: "30-Day Journey", icon: Calendar },
  { value: "study", label: "Bible Study", icon: BookOpen },
] as const;

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

export default function DailyPracticeHub() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "journey";
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-28">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Daily Practice</h1>
        <p className="text-muted-foreground">Your 30-day spiritual journey and Bible study tools — together.</p>
      </motion.div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          {TABS.map(t => (
            <TabsTrigger key={t.value} value={t.value} className="gap-2">
              <t.icon className="h-4 w-4" />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="journey">
          <Suspense fallback={<Loading />}>
            <Journey />
          </Suspense>
        </TabsContent>

        <TabsContent value="study">
          <Suspense fallback={<Loading />}>
            <BibleStudy />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
