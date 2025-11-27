import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, BookOpen, MessageSquare, Shield, Heart, Video, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  { id: "headline", label: "Overview", icon: Heart },
  { id: "scripture", label: "Scripture", icon: BookOpen },
  { id: "responses", label: "Responses", icon: MessageSquare },
  { id: "proof", label: "P.R.O.O.F.", icon: Shield },
  { id: "prayer", label: "Prayer", icon: Heart },
  { id: "videos", label: "Videos", icon: Video },
  { id: "cta", label: "Resources", icon: Gift },
];

interface ResultsProgressIndicatorProps {
  limitedAccess?: boolean;
}

export function ResultsProgressIndicator({ limitedAccess = false }: ResultsProgressIndicatorProps) {
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set(["headline"]));
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filter sections for limited access users
  const availableSections = limitedAccess 
    ? sections.filter(s => ["headline", "scripture"].includes(s.id))
    : sections;

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              setViewedSections((prev) => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all section elements
    const sectionElements = document.querySelectorAll("[data-section]");
    sectionElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const progress = (viewedSections.size / availableSections.length) * 100;
  const allViewed = viewedSections.size >= availableSections.length;

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-3 -mx-4 px-4 mb-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {allViewed ? "All sections viewed!" : `${viewedSections.size} of ${availableSections.length} sections viewed`}
          </span>
          <span className="text-sm font-semibold text-sacred">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        {/* Section indicators */}
        <div className="flex justify-between mt-3">
          {availableSections.map((section) => {
            const isViewed = viewedSections.has(section.id);
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  isViewed ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isViewed
                      ? "bg-sacred text-sacred-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isViewed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block">
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
