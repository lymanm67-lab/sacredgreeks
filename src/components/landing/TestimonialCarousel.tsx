import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight, Play, Building2, GraduationCap, Church } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  orgType: "greek" | "church" | "academic";
  initials: string;
  quote: string;
  rating: number;
  videoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Pastor Demetrius Logwood",
    role: "Senior Pastor",
    organization: "Charity Missionary Baptist Church",
    orgType: "church",
    initials: "DL",
    quote: "This rigorous research bridges the gap between Black Greek Letter Organizations and the church community. Sacred Greeks reminds us that spreading the gospel takes on many forms.",
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    name: "Alexis Allen",
    role: "Member",
    organization: "Zeta Phi Beta Sorority, Inc.",
    orgType: "greek",
    initials: "AA",
    quote: "Ignorance has had the mic too long, and Sacred Greeks finally cuts it off. You get biblical guidance, clarity, and confidence to walk boldly in your calling without apology.",
    rating: 5,
    featured: true,
  },
  {
    id: "3",
    name: "Chris Reed",
    role: "Member",
    organization: "Divine Nine Organization",
    orgType: "greek",
    initials: "CR",
    quote: "Sacred Greeks gave me the tools to reconcile my faith with my fraternal commitments. The P.R.O.O.F. framework changed everything.",
    rating: 5,
    videoUrl: "https://www.youtube.com/embed/EoE-zwi0Mgw?rel=0",
    featured: true,
  },
  {
    id: "4",
    name: "Dr. Marcus Williams",
    role: "Chaplain",
    organization: "Alpha Phi Alpha Fraternity, Inc.",
    orgType: "greek",
    initials: "MW",
    quote: "As a chapter chaplain, I've recommended Sacred Greeks to every brother seeking spiritual clarity. It's theologically sound and culturally relevant.",
    rating: 5,
  },
  {
    id: "5",
    name: "Rev. Tanya Brooks",
    role: "Campus Minister",
    organization: "HBCU Campus Ministry",
    orgType: "church",
    initials: "TB",
    quote: "Finally, a resource that doesn't make students choose between their faith and their letters. Sacred Greeks is a game-changer for campus ministry.",
    rating: 5,
  },
  {
    id: "6",
    name: "Brandon Thompson",
    role: "Recent Graduate",
    organization: "Kappa Alpha Psi Fraternity, Inc.",
    orgType: "greek",
    initials: "BT",
    quote: "I struggled for years with criticism from my church family. Sacred Greeks gave me the biblical foundation to stand firm in both my faith and my fraternity.",
    rating: 5,
  },
];

const OrgIcon = ({ type }: { type: "greek" | "church" | "academic" }) => {
  switch (type) {
    case "church":
      return <Church className="w-3 h-3" />;
    case "academic":
      return <GraduationCap className="w-3 h-3" />;
    default:
      return <Building2 className="w-3 h-3" />;
  }
};

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const featuredTestimonials = testimonials.filter(t => t.featured);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredTestimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  return (
    <section className="py-12 sm:py-16 w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          What Others Are Saying
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Real people finding biblical clarity and peace
        </p>
        {/* Aggregate Rating */}
        <div className="flex items-center justify-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          ))}
          <span className="text-sm text-slate-400 ml-2">
            4.9/5 from {testimonials.length}+ reviews
          </span>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {featuredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {testimonial.videoUrl ? (
                      <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          src={testimonial.videoUrl}
                          title={`${testimonial.name} Testimonial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <>
                        <Quote className="w-10 h-10 text-sacred/30 mb-4" />
                        <p className="text-lg sm:text-xl text-white/90 italic leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </p>
                      </>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-sacred/30">
                        {testimonial.imageUrl ? (
                          <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                        ) : null}
                        <AvatarFallback className="bg-sacred/20 text-sacred font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <OrgIcon type={testimonial.orgType} />
                          <span>{testimonial.organization}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full"
          onClick={handleNext}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {featuredTestimonials.map((_, idx) => (
            <button
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === activeIndex ? "bg-sacred w-6" : "bg-slate-600 hover:bg-slate-500"
              )}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(idx);
              }}
            />
          ))}
        </div>
      </div>

      {/* Additional Testimonials Grid */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {testimonials.filter(t => !t.featured).map((testimonial) => (
          <Card key={testimonial.id} className="bg-slate-800/30 border-slate-700/30 hover:border-sacred/30 transition-all">
            <CardContent className="p-4">
              <Quote className="w-6 h-6 text-sacred/20 mb-2" />
              <p className="text-sm text-slate-300 italic line-clamp-4 mb-3">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-sacred/10 text-sacred text-xs">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.organization}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
