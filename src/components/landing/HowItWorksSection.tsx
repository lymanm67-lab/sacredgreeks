import { User, BookOpen, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    title: "Choose Your Path",
    description: "Student, alumni, pastor, or parent—we meet you where you are",
    icon: User,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    title: "Start Today's Devotional",
    description: "Daily Scripture and reflection tailored to Greek life realities",
    icon: BookOpen,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    number: 3,
    title: "Track Your Growth",
    description: "See progress with the P.R.O.O.F. framework and achievements",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          How It Works
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Your daily companion for navigating faith and Greek life—in 3 simple steps
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-slate-600 to-slate-700" />
              )}
              
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all group">
                {/* Step number badge */}
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 relative",
                  "bg-gradient-to-br shadow-lg",
                  step.color
                )}>
                  <IconComponent className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 text-xs font-bold text-white flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* No download needed callout */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Use in your browser—no download needed
        </p>
      </div>
    </section>
  );
}
