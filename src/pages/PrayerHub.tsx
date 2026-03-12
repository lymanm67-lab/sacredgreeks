import { lazy, Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookHeart, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const PrayerJournal = lazy(() => import("@/pages/PrayerJournal"));
const PrayerWall = lazy(() => import("@/pages/PrayerWall"));

const TABS = [
  { value: "journal", label: "My Journal", icon: BookHeart },
  { value: "wall", label: "Prayer Wall", icon: Heart },
] as const;

const Loading = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

export default function PrayerHub() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "journal";
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-28">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1">Prayer</h1>
        <p className="text-muted-foreground">Your personal journal and the community prayer wall — all in one place.</p>
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

        <TabsContent value="journal">
          <Suspense fallback={<Loading />}>
            <PrayerJournal />
          </Suspense>
        </TabsContent>

        <TabsContent value="wall">
          <Suspense fallback={<Loading />}>
            <PrayerWall />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
