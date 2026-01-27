import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Heart, BookMarked, ChevronRight, Headphones, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const quickLinks = [
  {
    title: "30-Day Journey",
    description: "Daily readings through P.R.O.O.F. framework",
    icon: Calendar,
    href: "/journey",
    gradient: "from-sacred to-warm-blue",
    tourId: "journey"
  },
  {
    title: "Track Your Growth",
    description: "View charts and insights about your journey",
    icon: TrendingUp,
    href: "/progress",
    gradient: "from-emerald-500 to-teal-600",
    tourId: null
  },
  {
    title: "Prayer Wall",
    description: "Share and support prayer requests",
    icon: Heart,
    href: "/prayer-wall",
    gradient: "from-pink-500 to-rose-600",
    tourId: null
  },
  {
    title: "Sacred Greeks Podcast",
    description: "Listen to faith & Greek life discussions",
    icon: Headphones,
    href: "/podcast",
    gradient: "from-purple-500 to-violet-600",
    tourId: null
  },
];

export const QuickLinksSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="space-y-4">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <BookMarked className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Explore More</h2>
                <p className="text-sm text-muted-foreground">Discover tools for your faith journey</p>
              </div>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isOpen ? "rotate-0" : "-rotate-90"
            )} />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="grid gap-4 md:grid-cols-2 pt-2">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={link.href}>
                  <motion.div
                    data-tour={link.tourId || undefined}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer h-full"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative p-5 flex items-center gap-4">
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <link.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
