import { motion } from "framer-motion";

interface DeviceMockupProps {
  screen: "dashboard" | "devotional" | "prayer";
  className?: string;
  delay?: number;
}

const screens = {
  dashboard: {
    title: "Dashboard",
    time: "9:41",
    content: (
      <div className="space-y-3 p-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-sacred/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-sacred">SG</span>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-foreground">Good Morning!</div>
            <div className="text-[8px] text-muted-foreground">Continue your journey</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-sacred/20 to-purple-500/20 rounded-lg p-2.5">
          <div className="text-[8px] text-muted-foreground mb-1">Today&apos;s Verse</div>
          <div className="text-[9px] font-medium text-foreground leading-tight">
            &quot;Trust in the Lord with all your heart...&quot;
          </div>
          <div className="text-[8px] text-sacred mt-1">Proverbs 3:5</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-sacred">7</div>
            <div className="text-[7px] text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-purple-500">12</div>
            <div className="text-[7px] text-muted-foreground">Prayers</div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
            <div className="w-6 h-6 rounded-full bg-sacred/20" />
            <div className="flex-1">
              <div className="text-[8px] font-medium">Daily Devotional</div>
              <div className="w-2/3 h-1 bg-sacred/30 rounded-full">
                <div className="w-1/2 h-full bg-sacred rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/20" />
            <div className="flex-1">
              <div className="text-[8px] font-medium">Prayer Journal</div>
              <div className="text-[7px] text-muted-foreground">3 entries today</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  devotional: {
    title: "Devotional",
    time: "9:42",
    content: (
      <div className="p-3">
        <div className="text-center mb-3">
          <div className="text-[8px] text-muted-foreground">November 30, 2024</div>
          <div className="text-[11px] font-bold text-foreground mt-1">Walking in Integrity</div>
        </div>
        <div className="bg-gradient-to-br from-sacred/10 to-purple-500/10 rounded-lg p-3 mb-3">
          <div className="text-[9px] italic text-foreground leading-relaxed">
            &quot;The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.&quot;
          </div>
          <div className="text-[8px] text-sacred mt-2 font-medium">Proverbs 11:3</div>
        </div>
        <div className="space-y-2">
          <div className="text-[8px] font-semibold text-foreground">Reflection</div>
          <div className="text-[7px] text-muted-foreground leading-relaxed">
            As members of Greek organizations, we often face situations that test our integrity...
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1 bg-sacred text-white text-[8px] py-1.5 rounded-lg text-center font-medium">
            Mark Complete
          </div>
          <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
            <span className="text-[10px]">🔊</span>
          </div>
        </div>
      </div>
    ),
  },
  prayer: {
    title: "Prayer Wall",
    time: "9:43",
    content: (
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-bold text-foreground">Prayer Requests</div>
          <div className="text-[7px] px-2 py-0.5 bg-sacred/20 text-sacred rounded-full">+ New</div>
        </div>
        <div className="space-y-2">
          {[
            { name: "Sister Taylor", prayer: "Prayers for finals week...", count: 12 },
            { name: "Brother James", prayer: "Guidance on leadership...", count: 8 },
            { name: "Anonymous", prayer: "Family healing needed...", count: 24 },
          ].map((item, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sacred/30 to-purple-500/30" />
                <div className="text-[8px] font-medium text-foreground">{item.name}</div>
              </div>
              <div className="text-[7px] text-muted-foreground">{item.prayer}</div>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-[10px]">🙏</span>
                <span className="text-[7px] text-sacred">{item.count} praying</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export function DeviceMockup({ screen, className = "", delay = 0 }: DeviceMockupProps) {
  const screenData = screens[screen];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {/* Phone frame */}
      <div className="relative w-[180px] h-[380px] bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-[32px] p-2 shadow-2xl shadow-black/30">
        {/* Screen bezel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-900 rounded-b-2xl z-10 flex items-center justify-center">
          <div className="w-12 h-3 bg-neutral-800 rounded-full" />
        </div>
        
        {/* Screen */}
        <div className="w-full h-full bg-background rounded-[24px] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-background">
            <span className="text-[10px] font-medium text-foreground">{screenData.time}</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 flex gap-[1px]">
                <div className="w-0.5 h-full bg-foreground rounded-sm" />
                <div className="w-0.5 h-3/4 bg-foreground rounded-sm self-end" />
                <div className="w-0.5 h-1/2 bg-foreground rounded-sm self-end" />
                <div className="w-0.5 h-1/4 bg-foreground/50 rounded-sm self-end" />
              </div>
              <div className="text-[8px] text-foreground">5G</div>
              <div className="w-5 h-2.5 border border-foreground rounded-sm relative">
                <div className="absolute inset-0.5 bg-green-500 rounded-sm" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
          
          {/* App header */}
          <div className="bg-sacred/10 px-3 py-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-sacred flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">SG</span>
              </div>
              <span className="text-[10px] font-semibold text-foreground">{screenData.title}</span>
            </div>
          </div>
          
          {/* Screen content */}
          {screenData.content}
        </div>
      </div>
      
      {/* Reflection/glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[32px] pointer-events-none" />
    </motion.div>
  );
}
