import { useState } from "react";
import { BookOpen, MessageSquare, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const previews = [
  {
    id: "devotional",
    title: "Daily Devotional",
    description: "Start each day with Scripture tailored to Greek life challenges",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    mockup: {
      header: "Today's Devotional",
      date: "February 2, 2026",
      title: "Standing Firm in Your Calling",
      verse: "\"I can do all things through Christ who strengthens me.\" - Philippians 4:13",
      reflection: "As you navigate the pressures of Greek life today, remember that your identity is first in Christ. The same strength that carried early believers through persecution is available to you...",
      prompt: "How can you live out your faith authentically in your chapter this week?"
    }
  },
  {
    id: "reflection",
    title: "Guided Reflection",
    description: "Process your experiences with faith-centered prompts",
    icon: MessageSquare,
    color: "from-purple-500 to-fuchsia-500",
    mockup: {
      header: "Reflection Prompt",
      category: "Ritual Concerns",
      question: "When you feel conflicted about a ritual or practice, what Scripture verses bring you peace?",
      placeholder: "Take a moment to write your thoughts...",
      savedCount: "12 reflections saved"
    }
  },
  {
    id: "progress",
    title: "Progress Tracker",
    description: "See your spiritual growth with the P.R.O.O.F. framework",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    mockup: {
      header: "Your Growth",
      stats: [
        { label: "Day Streak", value: "14", emoji: "🔥" },
        { label: "Devotionals", value: "42", emoji: "📖" },
        { label: "Prayers", value: "28", emoji: "🙏" },
      ],
      badges: ["P.R.O.O.F. Pioneer", "7-Day Warrior", "Prayer Champion"],
      proofProgress: { completed: 3, total: 5 }
    }
  }
];

export function AppPreviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreview = previews[activeIndex];

  const goNext = () => setActiveIndex((i) => (i + 1) % previews.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + previews.length) % previews.length);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          See It In Action
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Real tools designed for real Greek life challenges
        </p>
      </div>

      {/* Preview Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {previews.map((preview, index) => {
          const IconComponent = preview.icon;
          return (
            <button
              key={preview.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                index === activeIndex
                  ? "bg-slate-700 text-white border border-slate-600"
                  : "bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-700"
              )}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:inline">{preview.title}</span>
            </button>
          );
        })}
      </div>

      {/* Preview Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all z-10 hidden sm:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all z-10 hidden sm:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Phone Mockup */}
        <div className="max-w-sm mx-auto">
          <div className="relative rounded-[2.5rem] border-[8px] border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-700 rounded-b-xl z-10" />
            
            {/* Screen content */}
            <div className="min-h-[500px] p-4 pt-10 bg-gradient-to-b from-slate-800 to-slate-900">
              {activePreview.id === "devotional" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center">
                    <p className="text-xs text-slate-500">{activePreview.mockup.date}</p>
                    <h3 className="text-lg font-bold text-white">{activePreview.mockup.title}</h3>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <p className="text-sm text-blue-300 italic text-center">
                      {activePreview.mockup.verse}
                    </p>
                  </div>
                  
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activePreview.mockup.reflection}
                  </p>
                  
                  <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                    <p className="text-xs text-slate-400 mb-2">Today's Reflection Prompt</p>
                    <p className="text-sm text-white">{activePreview.mockup.prompt}</p>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Complete Today's Devotional
                  </Button>
                </div>
              )}

              {activePreview.id === "reflection" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                      {activePreview.mockup.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {activePreview.mockup.savedCount}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white">
                    {activePreview.mockup.question}
                  </h3>
                  
                  <div className="min-h-[200px] p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                    <p className="text-sm text-slate-500">{activePreview.mockup.placeholder}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
                      Save Draft
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                      Complete
                    </Button>
                  </div>
                </div>
              )}

              {activePreview.id === "progress" && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-lg font-bold text-white text-center">
                    {activePreview.mockup.header}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {activePreview.mockup.stats.map((stat) => (
                      <div key={stat.label} className="p-3 rounded-xl bg-slate-700/50 border border-slate-600 text-center">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-slate-400">{stat.label}</p>
                        <span className="text-lg">{stat.emoji}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">P.R.O.O.F. Progress</span>
                      <span className="text-sm text-emerald-400">
                        {activePreview.mockup.proofProgress.completed}/{activePreview.mockup.proofProgress.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${(activePreview.mockup.proofProgress.completed / activePreview.mockup.proofProgress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Earned Badges</p>
                    <div className="flex flex-wrap gap-2">
                      {activePreview.mockup.badges.map((badge) => (
                        <span 
                          key={badge}
                          className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        >
                          🏆 {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold text-white mb-1">{activePreview.title}</h3>
          <p className="text-sm text-slate-400">{activePreview.description}</p>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <p className="text-xs text-slate-600 text-center mt-4 sm:hidden">
        Tap tabs above to see more previews
      </p>
    </section>
  );
}
