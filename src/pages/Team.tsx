import { motion } from "framer-motion";
import { Users, Mail, Newspaper, FileText, Search, Code2, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Dr. Lyman Montgomery",
    role: "Founder & Developer",
    icon: Crown,
    color: "from-sacred/20 to-sacred/5",
    border: "border-sacred/30",
    description:
      "Author of 'Sacred, Not Sinful' and visionary behind Sacred Greeks Life. Leads product development and platform strategy.",
    badge: "Leadership",
  },
  {
    name: "Mara",
    role: "Marketing Specialist",
    icon: Mail,
    color: "from-pink-500/15 to-pink-500/5",
    border: "border-pink-500/25",
    description:
      "Drives email campaigns, audience engagement, and automated marketing workflows. Powers weekly outreach to the community.",
    badge: "Email Campaigns",
  },
  {
    name: "Preston",
    role: "PR Specialist",
    icon: Newspaper,
    color: "from-blue-500/15 to-blue-500/5",
    border: "border-blue-500/25",
    description:
      "Handles press releases, media relations, and public communications. Builds brand awareness and media partnerships.",
    badge: "Press Releases",
  },
  {
    name: "Blake",
    role: "Blog Specialist",
    icon: FileText,
    color: "from-emerald-500/15 to-emerald-500/5",
    border: "border-emerald-500/25",
    description:
      "Creates SEO-optimized articles and long-form content. Publishes weekly blog posts that drive organic traffic and authority.",
    badge: "SEO Articles",
  },
  {
    name: "Sierra",
    role: "SEO Specialist",
    icon: Search,
    color: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-500/25",
    description:
      "Develops keyword strategy, on-page optimization, and search visibility. Ensures every piece of content ranks and converts.",
    badge: "Keyword Strategy",
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-sacred/10 via-background to-background" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-sacred/10 text-sacred px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              The Team
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Meet the Sacred Greeks Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A lean, AI-powered team building the #1 faith-based platform for Christians in Greek life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card
                  className={`h-full bg-gradient-to-br ${member.color} ${member.border} hover:shadow-xl transition-shadow`}
                >
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                      <span className="text-xs font-medium bg-background/80 text-muted-foreground px-2.5 py-1 rounded-full border border-border/50">
                        {member.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                      <p className="text-sm font-medium text-sacred">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* AI Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-muted/50 px-4 py-2 rounded-full">
            <Code2 className="w-4 h-4" />
            Mara, Preston, Blake & Sierra are AI agents — powered by Sacred Greeks' marketing engine.
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;
