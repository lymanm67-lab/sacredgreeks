import { motion } from "framer-motion";
import { User, ShoppingBag, Calendar, Headphones, Mic, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "About Dr. Lyman",
    description: "Meet the founder of Sacred Greeks and learn about her mission.",
    icon: User,
    url: "/about-creator",
    gradient: "from-sacred/20 to-sacred/5",
    iconBg: "bg-sacred/15",
    iconColor: "text-sacred",
  },
  {
    title: "Order Book",
    description: "Get your copy of Sacred Not Sinful — available now.",
    icon: ShoppingBag,
    url: "/order-book",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
  },
  {
    title: "Book Dr. Lyman",
    description: "Invite Dr. Lyman to speak at your chapter, church, or event.",
    icon: Calendar,
    url: "/speaking-request",
    gradient: "from-fuchsia-500/20 to-fuchsia-500/5",
    iconBg: "bg-fuchsia-500/15",
    iconColor: "text-fuchsia-500",
  },
  {
    title: "Podcast",
    description: "Listen to episodes on faith, Greek life, and spiritual growth.",
    icon: Headphones,
    url: "/podcast",
    gradient: "from-purple-500/20 to-purple-500/5",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-500",
  },
  {
    title: "Be on the Podcast",
    description: "Apply to be a guest panelist and share your story.",
    icon: Mic,
    url: "/guest-panelist-application",
    gradient: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-500",
  },
];

export default function DrLymanHub() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Dr. Lyman</h1>
        <p className="text-muted-foreground">Learn about the founder, order her book, book a speaking engagement, or tune in to the podcast.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(card.url)}
              className={`group relative text-left rounded-xl border border-border p-5 bg-gradient-to-br ${card.gradient} hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className="flex items-start gap-4">
                <div className={`${card.iconBg} rounded-lg p-2.5 shrink-0`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    {card.title}
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
