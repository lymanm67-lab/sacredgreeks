import { Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

export const HeroSection = () => {
  const { user } = useAuth();
  const dailyScripture = scriptures[new Date().getDate() % scriptures.length];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Friend';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-4xl">
        <div className="flex items-center gap-2 mb-4 animate-slide-up">
          <Sparkles className="w-6 h-6 text-white animate-float" />
          <span className="text-white/90 font-medium">{getGreeting()}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Welcome back, {firstName}!
        </h1>
        
        <p className="text-white/80 text-lg md:text-xl mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Continue your journey of faith and fellowship with confidence.
        </p>
        
        {/* Daily Scripture */}
        <div className="glass-effect rounded-2xl p-6 animate-scale-in max-w-3xl" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-4">
            <div className="text-4xl text-foreground">"</div>
            <div className="flex-1">
              <p className="text-foreground text-base md:text-lg leading-relaxed mb-3 italic font-medium">
                {dailyScripture.text}"
              </p>
              <p className="text-sacred-dark font-semibold">
                — {dailyScripture.reference}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};