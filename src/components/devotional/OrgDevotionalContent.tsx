import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Users, BookOpen } from "lucide-react";
import { getCouncilContent, getFaithIntegrationTips } from "@/data/orgSpecificContent";

interface OrgDevotionalContentProps {
  councilId: string;
  organizationName?: string;
}

// Council-specific devotional themes and applications
const COUNCIL_DEVOTIONAL_THEMES: Record<string, {
  themes: string[];
  applicationPrompts: string[];
  prayerFocus: string[];
}> = {
  nphc: {
    themes: [
      "Service as worship in your Divine Nine organization",
      "Using Greek unity for Kingdom impact",
      "Scholarship and spiritual wisdom",
      "Uplift through faith and fellowship"
    ],
    applicationPrompts: [
      "How can your chapter's community service reflect Christ's love?",
      "What does 'uplift' mean through a biblical lens in your organization?",
      "How can step shows and strolls glorify God?",
      "Where is God calling you to lead within your Greek community?"
    ],
    prayerFocus: [
      "Pray for unity among your line brothers/sisters in Christ",
      "Ask God to use your organization's influence for His glory",
      "Seek wisdom for balancing Greek commitment with spiritual growth"
    ]
  },
  npc: {
    themes: [
      "Sisterhood rooted in Christ's love",
      "Character development through biblical principles",
      "Academic excellence as stewardship",
      "Philanthropy as Kingdom work"
    ],
    applicationPrompts: [
      "How does your sorority's philanthropy align with Matthew 25:35-40?",
      "What does godly sisterhood look like in your chapter?",
      "How can recruitment reflect Christ-like welcome?",
      "Where can you be salt and light in your Panhellenic community?"
    ],
    prayerFocus: [
      "Pray for your sisters' spiritual journeys",
      "Ask God to reveal opportunities for witness in your chapter",
      "Seek guidance for balancing sorority life with faith"
    ]
  },
  nic: {
    themes: [
      "Brotherhood built on biblical foundations",
      "Leadership through servant-hearted example",
      "Integrity in all fraternity activities",
      "Using influence for eternal impact"
    ],
    applicationPrompts: [
      "How can your chapter meetings include space for spiritual growth?",
      "What does 'iron sharpens iron' look like in your brotherhood?",
      "How can social events honor God?",
      "Where is God calling you to stand for truth in Greek life?"
    ],
    prayerFocus: [
      "Pray for your brothers' faith walks",
      "Ask God to protect your chapter from compromising situations",
      "Seek wisdom for being a spiritual leader among your brothers"
    ]
  },
  nalfo: {
    themes: [
      "Cultural heritage and Christian identity",
      "Unity across diverse backgrounds in Christ",
      "Service to Latino/a communities as ministry",
      "Bridging faith and cultural pride"
    ],
    applicationPrompts: [
      "How does your cultural heritage enrich your faith expression?",
      "What unique ministry opportunities does your organization provide?",
      "How can you honor both your cultura and your Creator?",
      "Where can you be a bridge between communities for Christ?"
    ],
    prayerFocus: [
      "Pray for your hermanos/hermanas in faith",
      "Ask God to use your cultural background for His purposes",
      "Seek wisdom for integrating faith into Latino/a Greek spaces"
    ]
  },
  napa: {
    themes: [
      "Asian heritage and Christian witness",
      "Academic excellence as offering to God",
      "Community and family honor in Christ",
      "Cultural bridge-building for the Gospel"
    ],
    applicationPrompts: [
      "How does 'honor' align with honoring God in your organization?",
      "What does Christian community look like in your chapter?",
      "How can academic achievement serve Kingdom purposes?",
      "Where can you share Christ across cultural boundaries?"
    ],
    prayerFocus: [
      "Pray for your AAPI brothers/sisters in faith",
      "Ask God to use your academic gifts for His glory",
      "Seek wisdom for honoring family while following Christ"
    ]
  },
  nmgc: {
    themes: [
      "Multicultural unity reflecting heaven's diversity",
      "Breaking barriers through Christ's love",
      "Inclusive community as Gospel witness",
      "Celebrating diversity in worship"
    ],
    applicationPrompts: [
      "How does your org's diversity reflect the body of Christ?",
      "What unique perspective does multicultural fellowship bring?",
      "How can inclusivity be a testimony to God's heart?",
      "Where can you demonstrate Christ's barrier-breaking love?"
    ],
    prayerFocus: [
      "Pray for unity amid diversity in your chapter",
      "Ask God to use your multicultural space for witness",
      "Seek wisdom for navigating different backgrounds in Christ"
    ]
  },
  professional: {
    themes: [
      "Excellence in profession as worship",
      "Networking with eternal perspective",
      "Using career success for Kingdom impact",
      "Mentoring the next generation in faith"
    ],
    applicationPrompts: [
      "How can your professional network advance God's purposes?",
      "What does faith look like in your career field?",
      "How can professional excellence glorify God?",
      "Where can you mentor others spiritually and professionally?"
    ],
    prayerFocus: [
      "Pray for integrity in your professional life",
      "Ask God to open doors for witness in your career",
      "Seek wisdom for balancing career ambition with Kingdom priorities"
    ]
  },
  honor: {
    themes: [
      "Academic gifts as stewardship",
      "Using knowledge for God's glory",
      "Servant leadership through scholarship",
      "Wisdom versus mere knowledge"
    ],
    applicationPrompts: [
      "How can your academic achievements serve others?",
      "What does biblical wisdom add to intellectual knowledge?",
      "How can honor society membership be Kingdom-focused?",
      "Where can you use your gifts to advance God's purposes?"
    ],
    prayerFocus: [
      "Pray for humility amid academic success",
      "Ask God to direct your knowledge toward His purposes",
      "Seek wisdom that goes beyond intellectual achievement"
    ]
  },
  other: {
    themes: [
      "Finding Christ in Greek community",
      "Using organizational membership for Kingdom impact",
      "Building faith-based fellowship",
      "Living out faith in Greek spaces"
    ],
    applicationPrompts: [
      "How can your organization be a space for spiritual growth?",
      "What opportunities does membership create for witness?",
      "How can you integrate faith into your Greek experience?",
      "Where is God calling you to serve through your organization?"
    ],
    prayerFocus: [
      "Pray for your fellow members' spiritual journeys",
      "Ask God to reveal His purposes for your membership",
      "Seek wisdom for being salt and light in your org"
    ]
  }
};

export function OrgDevotionalContent({ councilId, organizationName }: OrgDevotionalContentProps) {
  const councilContent = getCouncilContent(councilId);
  const faithTips = getFaithIntegrationTips(councilId);
  const devotionalThemes = COUNCIL_DEVOTIONAL_THEMES[councilId] || COUNCIL_DEVOTIONAL_THEMES.other;
  
  // Get random items for variety
  const randomTheme = devotionalThemes.themes[Math.floor(Math.random() * devotionalThemes.themes.length)];
  const randomPrompt = devotionalThemes.applicationPrompts[Math.floor(Math.random() * devotionalThemes.applicationPrompts.length)];
  const randomPrayer = devotionalThemes.prayerFocus[Math.floor(Math.random() * devotionalThemes.prayerFocus.length)];
  const randomTip = faithTips[Math.floor(Math.random() * faithTips.length)];

  return (
    <Card className="border-2 border-sacred/20 bg-gradient-to-br from-sacred/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-sacred" />
            For You: {organizationName || councilContent.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">Personalized</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Today's Theme */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <BookOpen className="w-5 h-5 text-sacred mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Today's Theme for You</p>
            <p className="text-sm text-muted-foreground">{randomTheme}</p>
          </div>
        </div>

        {/* Application Prompt */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <Heart className="w-5 h-5 text-warm-coral mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Reflection Question</p>
            <p className="text-sm text-muted-foreground italic">{randomPrompt}</p>
          </div>
        </div>

        {/* Prayer Focus */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
          <Users className="w-5 h-5 text-warm-blue mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Prayer Focus</p>
            <p className="text-sm text-muted-foreground">{randomPrayer}</p>
          </div>
        </div>

        {/* Faith Integration Tip */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">💡 Tip:</span> {randomTip}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}