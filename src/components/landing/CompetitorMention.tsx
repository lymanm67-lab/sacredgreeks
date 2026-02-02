import { Users, BookOpen, Shield, Sparkles } from "lucide-react";

export function CompetitorMention() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Why Sacred Greeks?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Unlike generic faith apps, we're built specifically for the unique challenges of Greek life
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Purpose-Built for Greek Life</h3>
              <p className="text-sm text-slate-400">
                Not a generic devotional app. Every feature addresses real situations you face—from ritual concerns to renouncement pressure.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">P.R.O.O.F. Framework</h3>
              <p className="text-sm text-slate-400">
                Our unique theological framework helps you evaluate practices biblically—Pledge, Ritual, Oaths, Obscurity, Founders.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Community Understanding</h3>
              <p className="text-sm text-slate-400">
                Created by Dr. Lyman Montgomery, a Greek himself. We understand BGLO, Divine Nine, NPHC, and all Greek traditions.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Complete Ecosystem</h3>
              <p className="text-sm text-slate-400">
                Beyond typical campus ministry apps or general devotionals—we offer book, podcast, coaching, and community all in one journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
