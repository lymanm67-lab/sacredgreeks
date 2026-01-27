import { Sparkles, ChevronRight, Flame, Target, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WelcomeVideo } from './WelcomeVideo';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/sacred-greeks-logo.png';

const scriptures = [
  {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6"
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  }
];

const quickActions = [
  { icon: Flame, label: "Today's Devotional", href: "/devotional", color: "from-orange-500 to-red-500" },
  { icon: Target, label: "PROOF Course", href: "/proof-course", color: "from-blue-500 to-indigo-600" },
  { icon: Zap, label: "Faith Snapshot", href: "/snapshot", color: "from-purple-500 to-fuchsia-600" },
];

export const HeroSection = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const dailyScripture = scriptures[new Date().getDate() % scriptures.length];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Friend';

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-3xl shadow-2xl isolate">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,50%,12%)] via-[hsl(225,60%,18%)] to-[hsl(210,80%,25%)]" />
      
      {/* Animated orbs - clipped so blur/scale can’t create page overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none [clip-path:inset(0_round_24px)]">
        <motion.div 
          className="absolute top-4 right-4 w-32 h-32 md:w-72 md:h-72 md:top-10 md:right-10 bg-blue-500/20 rounded-full blur-2xl md:blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-40 h-40 md:w-64 md:h-64 bg-purple-500/15 rounded-full blur-2xl md:blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-cyan-500/10 rounded-full blur-2xl md:blur-3xl"
          animate={{ 
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      {/* Preview Mode Badge */}
      {(!user || isDemoMode) && (
        <div className="absolute top-4 right-4 z-20">
          <Badge variant="secondary" className="bg-amber-500/90 text-white border-amber-600/20 shadow-lg backdrop-blur-sm">
            Preview Mode
          </Badge>
        </div>
      )}

      <div className="relative z-10 p-6 md:p-8 lg:p-12">
        {/* Top section with logo and greeting */}
        <div className="flex items-start justify-between mb-8">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
              <img 
                src={logo} 
                alt="Sacred Greeks" 
                className="relative h-16 w-16 rounded-full object-cover border-2 border-white/20"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/80">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">{getGreeting()}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {firstName}
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Scripture & Quick Actions */}
          <div className="space-y-6">
            {/* Daily Scripture Card */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Today's Word</span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-4 italic">
                  "{dailyScripture.text}"
                </p>
                <p className="text-cyan-400 font-semibold">
                  — {dailyScripture.reference}
                </p>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {quickActions.map((action, index) => (
                <Link key={action.label} to={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      className={`bg-gradient-to-r ${action.color} text-white border-0 shadow-lg hover:shadow-xl hover:brightness-110 transition-all group`}
                    >
                      <action.icon className="w-4 h-4 mr-2" />
                      {action.label}
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Button>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right: Welcome Video */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <WelcomeVideo />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
