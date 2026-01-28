import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FaithAuthoritySection } from "@/components/proof/FaithAuthoritySection";
import { BeliefTeachingAudio } from "@/components/proof/BeliefTeachingAudio";
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";

export default function FaithAuthority() {
  const { progressData } = useNavigationProgress();
  const progress = progressData?.faithAuthority || 0;
  const completedSections = Math.round((progress / 100) * 5);
  const isProofComplete = (progressData?.proofCourse || 0) >= 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          
          {/* Progress Widget in Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-1.5 w-20" />
              <span className="text-xs font-medium text-purple-300">{Math.round(progress)}%</span>
            </div>
            {progress >= 100 && <CheckCircle2 className="w-4 h-4 text-green-400" />}
          </motion.div>
          
          <Link to="/">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium">Power of Belief Teaching</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Faith & Authority
            </h1>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Scripture reveals a powerful truth: <strong className="text-amber-300">what you don't believe cannot hold power over you</strong>. 
              Discover how faith operates as the channel through which spiritual realities function.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white/50">Based on</span>
                <span className="text-amber-400 ml-2 font-medium">Mark 6:5-6 • Hebrews 11:6 • 1 Corinthians 8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audio Teaching */}
      <section className="py-8 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <BeliefTeachingAudio className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Faith & Authority Scripture Cards */}
      <FaithAuthoritySection className="bg-slate-900/30" />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Go Deeper?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Explore the P.R.O.O.F. Framework to understand how these principles apply to Greek life and faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isProofComplete ? (
              <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Link to="/greek-life-training">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Continue Greek Life Training
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link to="/proof-course">Explore P.R.O.O.F. Framework</Link>
              </Button>
            )}
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/myth-buster">View MythBusters</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Sacred Greeks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
