import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  ChevronDown, 
  Sparkles, 
  Crown, 
  Eye, 
  Scissors, 
  Flower2,
  Calendar,
  Landmark,
  BookOpen
} from "lucide-react";

interface BeautyEntry {
  id: string;
  title: string;
  category: "egyptian" | "greek" | "roman" | "medieval" | "memorial";
  deityConnection?: string;
  ancientPractice: string;
  modernUsage: string;
  doubleStandard: string;
  scriptureNote?: string;
}

const beautyEntries: BeautyEntry[] = [
  // Egyptian Origins
  {
    id: "kohl-eyeliner",
    title: "Kohl Eyeliner & Cat Eyes",
    category: "egyptian",
    deityConnection: "Horus, Ra, Isis, Hathor",
    ancientPractice: "Ancient Egyptians applied kohl around their eyes to invoke the protection of the Eye of Horus. The distinctive 'cat eye' wing represented the goddess Bastet. Both men and women wore kohl in religious ceremonies to honor Ra and Isis. Priestesses painted elaborate eye designs for temple worship.",
    modernUsage: "Eyeliner is a basic cosmetic used daily by Christians, including worship leaders, church choir members, and pastors' wives. Winged eyeliner remains one of the most popular makeup looks.",
    doubleStandard: "If kohl—originally applied specifically to invoke Egyptian deities for protection—is now acceptable in church, why are Greek letters (which were never deity worship) singled out as problematic?",
  },
  {
    id: "eye-shadow",
    title: "Eye Shadow & Face Paint",
    category: "egyptian",
    deityConnection: "Isis, Osiris, Amun-Ra",
    ancientPractice: "Egyptians used malachite (green) and galena (black) eye paints in religious rituals honoring Isis and Osiris. Blue eye shadow specifically honored Amun-Ra, the sun god. Temple priestesses painted their faces as part of deity worship. Colors carried specific spiritual meanings in Egyptian cosmology.",
    modernUsage: "Eye shadow and makeup are worn in church worship services, on praise teams, in Christian media productions, and by ministry leaders without any spiritual concern.",
    doubleStandard: "Cosmetics with explicit deity-worship origins are universally accepted in Christian culture while Greek organizational symbols are questioned.",
  },
  {
    id: "braids-locs",
    title: "Braids, Locs & Protective Styles",
    category: "egyptian",
    deityConnection: "Isis, Hathor, Osiris",
    ancientPractice: "Egyptian royalty and priestesses wore intricate braids to honor deities. Specific braid patterns were associated with Isis worship and indicated both social and spiritual status. The goddess Hathor was often depicted with elaborately braided hair. Locs have ancient African spiritual significance, often connected to vows and spiritual power. Cornrows were used in African spiritual ceremonies and rites of passage.",
    modernUsage: "Braids, locs, twists, and protective styles are celebrated in Black churches and worn by clergy, worship leaders, choir members, and entire congregations.",
    doubleStandard: "Hairstyles with deep spiritual and deity-worship origins are embraced and celebrated in Christian culture without theological debate, while Greek letters face scrutiny.",
  },
  {
    id: "wigs-hairpieces",
    title: "Wigs & Hair Pieces",
    category: "egyptian",
    deityConnection: "Various Egyptian deities, Ritual purity",
    ancientPractice: "Egyptian priests shaved their heads and wore wigs as part of ritual purity requirements for temple service. Pharaohs wore ceremonial wigs to embody divine authority—they were considered gods on earth. Wigs were actual offerings to the gods and worn specifically in temple worship. Elaborate wigs indicated closeness to the divine.",
    modernUsage: "Wigs are worn by pastors, first ladies, choir members, and everyday Christians in churches across America without any spiritual concern or theological questions.",
    doubleStandard: "If wigs—originally worn in temple worship to embody divine authority and as offerings to gods—are acceptable in church leadership, the inconsistency in critiquing Greek letters becomes clear.",
  },
  {
    id: "hoop-earrings",
    title: "Hoop Earrings",
    category: "egyptian",
    deityConnection: "Isis, Hathor, goddess worship",
    ancientPractice: "Hoop earrings originated in ancient Sumeria around 2500 BCE and became prominent in Egypt, where they symbolized status and were associated with goddess worship. Egyptian artwork shows Isis and Hathor wearing large gold hoops. In various ancient cultures, hoops were believed to ward off evil spirits entering through the ears.",
    modernUsage: "Hoop earrings are standard fashion accessories worn in churches everywhere, including by pastors, worship leaders, first ladies, and congregants of all ages.",
    doubleStandard: "Jewelry with goddess-worship and spirit-protection origins is worn without question in sacred spaces, but Greek organizational symbols face religious scrutiny.",
  },
  {
    id: "perfume-oils",
    title: "Perfume & Fragrant Oils",
    category: "egyptian",
    deityConnection: "Isis, Osiris, Ra",
    ancientPractice: "Egyptians created perfumes specifically as offerings to Isis, Osiris, and Ra. Kyphi was a sacred incense burned in temples to honor the gods. Anointing oils were used in mummification rituals and deity worship. The word 'perfume' comes from Latin 'per fumum' (through smoke)—referring to burning offerings to gods.",
    modernUsage: "Christians wear perfume daily, use anointing oil in services, and many liturgical traditions burn incense as part of worship. The fragrance industry is embraced by Christians.",
    doubleStandard: "Fragrance practices originating directly in deity worship and offerings to gods are fully integrated into Christian practice and commerce.",
  },
  {
    id: "nail-polish",
    title: "Nail Polish & Manicures",
    category: "egyptian",
    deityConnection: "Isis, royalty rituals",
    ancientPractice: "Ancient Babylonians and Egyptians painted nails to indicate class and invoke divine favor. In Egypt, red nails were reserved for royalty and associated with Isis worship. Chinese dynasties used specific nail colors in religious ceremonies. Nail adornment was part of preparing for temple rituals.",
    modernUsage: "Nail polish is worn in churches, by worship leaders and musicians, in Christian professional settings, and is a standard part of self-care culture embraced by believers.",
    doubleStandard: "Another beauty practice with deity-worship origins that is universally accepted in Christian culture while other cultural symbols face condemnation.",
  },
  // Greek Origins
  {
    id: "cosmetics-word",
    title: "The Word 'Cosmetics'",
    category: "greek",
    deityConnection: "Kosmos (divine order)",
    ancientPractice: "The word 'cosmetics' comes from the Greek 'kosmetikos,' derived from 'kosmos' meaning order, arrangement, or the universe. In Greek philosophy, 'kosmos' represented divine order and was connected to the gods' creation of universal beauty. The practice of beautification was seen as participating in cosmic harmony.",
    modernUsage: "Every Christian who uses 'cosmetics' is using a word rooted in Greek theological concepts about divine order and beauty, yet no one objects to this terminology.",
    doubleStandard: "We use Greek-derived terminology with theological origins without concern, but Greek letter organizations face criticism for their naming conventions.",
  },
  {
    id: "mirror-mythology",
    title: "Mirrors & Vanity Tables",
    category: "greek",
    deityConnection: "Aphrodite, Narcissus",
    ancientPractice: "Mirrors were sacred to Aphrodite, goddess of beauty. The mirror was her symbol, and temples to Aphrodite featured mirrors as ritual objects. The myth of Narcissus added spiritual significance to reflection. Greeks believed mirrors could capture the soul.",
    modernUsage: "Every Christian home has mirrors. Churches have mirrors in restrooms and dressing areas. No one questions the 'spiritual danger' of using mirrors.",
    doubleStandard: "Objects sacred to Greek gods are used daily without concern, demonstrating that practical use supersedes historical origin.",
  },
  {
    id: "laurel-wreaths",
    title: "Laurel Wreaths & Crowns",
    category: "greek",
    deityConnection: "Apollo, Daphne",
    ancientPractice: "Laurel wreaths were sacred to Apollo, one of the major Greek gods. The myth of Apollo and Daphne explains the laurel's significance. Victors in athletic games dedicated to gods wore laurel crowns. The laurel symbolized Apollo's patronage and blessing.",
    modernUsage: "Graduation ceremonies feature laurel imagery. 'Baccalaureate' (bachelor's laurel) is a common term. Academic honors and 'poet laureate' titles use this imagery. Christians graduate with honors without spiritual concern.",
    doubleStandard: "Academic traditions rooted in Apollo worship are celebrated in Christian education without any theological objection.",
  },
  // Roman Origins
  {
    id: "wedding-makeup",
    title: "Bridal Beauty Traditions",
    category: "roman",
    deityConnection: "Juno, Venus",
    ancientPractice: "Roman brides wore specific makeup to honor Juno, goddess of marriage. Red lips invoked Venus for passion. White face powder represented purity before the gods. The bridal beauty ritual was a religious ceremony preparing the bride for divine blessing on her marriage.",
    modernUsage: "Christian brides wear elaborate makeup, hire makeup artists, and follow beauty traditions without questioning their origins. Church weddings include all these Roman-derived beauty practices.",
    doubleStandard: "Bridal beauty traditions rooted in goddess worship are embraced as 'normal' wedding preparation in Christian ceremonies.",
  },
  {
    id: "spa-bathhouse",
    title: "Spas & Bathhouse Culture",
    category: "roman",
    deityConnection: "Hygieia, Asclepius, various deities",
    ancientPractice: "Roman bathhouses were temples to Hygieia (health) and connected to Asclepius worship. Bathing rituals included prayers to gods. Spa treatments were religious practices. The word 'spa' may derive from 'salus per aquam' (health through water), a concept tied to water deity worship.",
    modernUsage: "Christians enjoy spa days, hot springs, wellness retreats, and bath rituals as normal self-care without any religious concern.",
    doubleStandard: "Wellness practices rooted in Roman deity worship are marketed to and embraced by Christians as healthy lifestyle choices.",
  },
  // Memorial Day & Rosalia
  {
    id: "memorial-day-rosalia",
    title: "Memorial Day (from Rosalia)",
    category: "memorial",
    deityConnection: "Roman ancestor worship, Manes (spirits of the dead)",
    ancientPractice: "The Roman festival Rosalia (or Rosaria) was held in late May to honor the dead by decorating graves with roses. Romans believed the Manes (spirits of deceased ancestors) needed to be appeased with flowers, food, and libations. Failure to honor the dead could bring their wrath. The practice included communal meals at gravesites.",
    modernUsage: "Modern Memorial Day involves decorating graves with flowers, holding remembrance services, and visiting cemeteries—the same core practices of Rosalia. Churches hold Memorial Day services and encourage grave visitation.",
    doubleStandard: "Christians participate in Memorial Day traditions directly descended from Roman ancestor veneration festivals without spiritual concern, yet Greek organizational traditions face scrutiny.",
    scriptureNote: "Romans 14 reminds us that one person considers one day more sacred than another; another considers every day alike. Each one should be fully convinced in their own mind.",
  },
  {
    id: "grave-flowers",
    title: "Placing Flowers on Graves",
    category: "memorial",
    deityConnection: "Roman Rosalia, ancestor spirits",
    ancientPractice: "Romans placed roses on graves during Rosalia specifically to please the spirits of the dead and ensure their peaceful rest. The color and type of flowers carried spiritual meanings. This was not mere decoration—it was religious ritual to appease spirits and prevent hauntings.",
    modernUsage: "Christians regularly place flowers on graves of loved ones, especially on Memorial Day, Easter, and death anniversaries. Florists advertise grave arrangements to churches.",
    doubleStandard: "A practice originating as spirit appeasement has been fully embraced by Christians as honoring the dead, showing how practices can be transformed in meaning.",
  },
  {
    id: "funeral-wreaths",
    title: "Funeral Wreaths",
    category: "memorial",
    deityConnection: "Roman Rosalia, victory over death",
    ancientPractice: "Circular wreaths symbolized the eternal cycle in Roman religion. Wreaths on graves during Rosalia represented hope for the deceased's peaceful afterlife and favor with the gods of the underworld. Laurel, oak, and rose wreaths each carried different religious meanings.",
    modernUsage: "Funeral wreaths are standard in Christian funerals. Churches display wreaths. Families send wreaths to funerals without questioning the practice's origins.",
    doubleStandard: "Funeral customs with explicit Roman religious origins are universally practiced in Christian communities without theological debate.",
  },
  {
    id: "memorial-meals",
    title: "Repass & Memorial Meals",
    category: "memorial",
    deityConnection: "Roman parentalia, communion with the dead",
    ancientPractice: "Romans held communal meals at gravesites during Parentalia and Rosalia, believing the deceased joined the meal in spirit. Food was left for the dead. These meals were religious rituals to maintain connection with deceased ancestors and ensure their goodwill.",
    modernUsage: "The repass after funerals is a sacred tradition in Black church culture. Churches host meals after memorial services. The gathering to eat together after burial directly parallels Roman practice.",
    doubleStandard: "Memorial meals with roots in Roman ancestor communion are treated as beautiful Christian community care, not pagan practice.",
  },
];

const categoryInfo = {
  egyptian: {
    title: "Egyptian Origins",
    icon: <Eye className="w-5 h-5" />,
    description: "Beauty practices originating from ancient Egypt, often connected to worship of Isis, Osiris, Ra, and other deities.",
    color: "amber",
  },
  greek: {
    title: "Greek Origins",
    icon: <Landmark className="w-5 h-5" />,
    description: "Beauty concepts and practices from ancient Greece, tied to gods like Aphrodite and Apollo.",
    color: "blue",
  },
  roman: {
    title: "Roman Origins",
    icon: <Crown className="w-5 h-5" />,
    description: "Beauty and wellness traditions from ancient Rome, connected to various Roman deities.",
    color: "purple",
  },
  memorial: {
    title: "Roman Rosalia & Memorial Traditions",
    icon: <Flower2 className="w-5 h-5" />,
    description: "Memorial Day customs descended from the Roman festival Rosalia, honoring the dead with flowers and meals.",
    color: "rose",
  },
  medieval: {
    title: "Medieval Origins",
    icon: <Calendar className="w-5 h-5" />,
    description: "Beauty practices from the Middle Ages, often blending pagan and Christian traditions.",
    color: "emerald",
  },
};

function BeautyCard({ entry }: { entry: BeautyEntry }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categoryInfo[entry.category];

  const colorClasses = {
    amber: "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10",
    blue: "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
    purple: "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
    rose: "border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10",
    emerald: "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10",
  };

  const badgeClasses = {
    amber: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    blue: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    purple: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
    rose: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
    emerald: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <Card className={cn("transition-all duration-200 border", colorClasses[cat.color as keyof typeof colorClasses])}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left"
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-base flex items-center gap-2">
                {entry.title}
              </CardTitle>
              {entry.deityConnection && (
                <p className="text-xs text-muted-foreground mt-1">
                  Connected to: <span className="font-medium">{entry.deityConnection}</span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", badgeClasses[cat.color as keyof typeof badgeClasses])}>
                {cat.title.split(" ")[0]}
              </Badge>
              <ChevronDown className={cn("w-4 h-4 transition-transform text-muted-foreground", expanded && "rotate-180")} />
            </div>
          </div>
        </CardHeader>
      </button>

      {expanded && (
        <CardContent className="pt-2 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Ancient Practice
            </h4>
            <p className="text-sm leading-relaxed">{entry.ancientPractice}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Modern Usage
            </h4>
            <p className="text-sm leading-relaxed">{entry.modernUsage}</p>
          </div>

          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              The Double Standard
            </h4>
            <p className="text-sm leading-relaxed">{entry.doubleStandard}</p>
          </div>

          {entry.scriptureNote && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Scripture Note
              </h4>
              <p className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">{entry.scriptureNote}</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function CategorySection({ category, entries }: { category: keyof typeof categoryInfo; entries: BeautyEntry[] }) {
  const [expanded, setExpanded] = useState(true);
  const cat = categoryInfo[category];

  const headerColors = {
    amber: "from-amber-500/20 to-transparent border-amber-500/30",
    blue: "from-blue-500/20 to-transparent border-blue-500/30",
    purple: "from-purple-500/20 to-transparent border-purple-500/30",
    rose: "from-rose-500/20 to-transparent border-rose-500/30",
    emerald: "from-emerald-500/20 to-transparent border-emerald-500/30",
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "w-full p-4 rounded-xl border bg-gradient-to-r transition-all",
          headerColors[cat.color as keyof typeof headerColors]
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background/80">
              {cat.icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{entries.length} practices</Badge>
            <ChevronDown className={cn("w-5 h-5 transition-transform", expanded && "rotate-180")} />
          </div>
        </div>
      </button>

      {expanded && (
        <div className="grid gap-3 pl-4 border-l-2 border-muted ml-4">
          {entries.map((entry) => (
            <BeautyCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BeautyOrigins() {
  const egyptianEntries = beautyEntries.filter((e) => e.category === "egyptian");
  const greekEntries = beautyEntries.filter((e) => e.category === "greek");
  const romanEntries = beautyEntries.filter((e) => e.category === "roman");
  const memorialEntries = beautyEntries.filter((e) => e.category === "memorial");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-rose-500/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <Link to="/symbol-guide">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Symbols & Rituals Guide
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-500/30">
              <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Beauty & Fashion Origins</h1>
              <p className="text-muted-foreground">
                Tracing modern cosmetic practices to Egyptian, Greek & Roman deity worship
              </p>
            </div>
          </div>

          <Card className="bg-background/80 backdrop-blur">
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">
                Many everyday beauty practices that Christians use without question originated in ancient 
                deity worship. From eyeliner honoring Horus to perfumes offered to Isis, from bridal 
                makeup invoking Venus to Memorial Day traditions descended from Roman Rosalia—these 
                practices demonstrate that <span className="font-semibold text-primary">origin does not determine current meaning</span>. 
                If these practices can be transformed and used by believers, the same grace should extend 
                to Greek organizational traditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <CategorySection category="egyptian" entries={egyptianEntries} />
        <CategorySection category="greek" entries={greekEntries} />
        <CategorySection category="roman" entries={romanEntries} />
        <CategorySection category="memorial" entries={memorialEntries} />

        {/* Summary Card */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              The Consistent Standard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Every beauty practice listed above has direct, documented connections to ancient deity 
              worship—far more explicit than Greek letter organizations, which use an alphabet, not 
              invocations to gods. Yet Christians:
            </p>
            <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
              <li>Apply eyeliner originally used to invoke Horus</li>
              <li>Wear perfume descended from offerings to Egyptian gods</li>
              <li>Style hair in patterns used in Isis worship</li>
              <li>Place flowers on graves following Roman Rosalia traditions</li>
              <li>Hold memorial meals paralleling Roman ancestor veneration</li>
              <li>Use the word "cosmetics" derived from Greek theological concepts</li>
            </ul>
            <p className="text-sm leading-relaxed font-medium">
              The question is not whether something has ancient origins—almost everything does. 
              The question is: <span className="text-primary">Does the current practice require 
              worship of false gods or violation of Scripture?</span> If not, believers have freedom.
            </p>
            <p className="text-xs text-muted-foreground italic mt-4">
              "So whether you eat or drink or whatever you do, do it all for the glory of God." 
              — 1 Corinthians 10:31
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Link to="/symbol-guide">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Symbols & Rituals Guide
            </Button>
          </Link>
          <Link to="/oaths">
            <Button variant="outline">
              Oaths Guide
            </Button>
          </Link>
          <Link to="/did-you-know">
            <Button variant="outline">
              Did You Know?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
