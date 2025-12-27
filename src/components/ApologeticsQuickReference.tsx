import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Shield, Cross, Users, Scale, Heart, Gavel, Scroll } from "lucide-react";

interface ApologeticsItem {
  id: string;
  title: string;
  icon: React.ElementType;
  scripture: string;
  scriptureRef: string;
  keyPoint: string;
  defense: string;
}

const apologeticsItems: ApologeticsItem[] = [
  {
    id: "identity",
    title: "Christian Identity",
    icon: Cross,
    scripture: "You are the salt of the earth... You are the light of the world.",
    scriptureRef: "Matthew 5:13-14",
    keyPoint: "Your Greek letters do not define you—Christ does.",
    defense: "We are called to be salt and light in EVERY environment, including Greek organizations. Withdrawal is not the Great Commission."
  },
  {
    id: "secrecy",
    title: "On Secrecy",
    icon: Shield,
    scripture: "Tell no one about this vision until the Son of Man has been raised from the dead.",
    scriptureRef: "Matthew 17:9",
    keyPoint: "Jesus practiced strategic confidentiality.",
    defense: "Jesus told those He healed to 'tell no one.' The Transfiguration was kept secret. Strategic confidentiality served divine purposes, not deception."
  },
  {
    id: "oaths",
    title: "On Oaths",
    icon: Gavel,
    scripture: "I have taken an oath and confirmed it, that I will follow your righteous laws.",
    scriptureRef: "Psalm 119:106",
    keyPoint: "The Bible condemns careless vows, not sacred commitments.",
    defense: "The Psalmist took an oath to God. Nehemiah made the people take oaths. Marriage is an oath. Context and intention matter."
  },
  {
    id: "symbols",
    title: "On Symbols",
    icon: Scroll,
    scripture: "On his robe and on his thigh he has this name written: KING OF KINGS AND LORD OF LORDS.",
    scriptureRef: "Revelation 19:16",
    keyPoint: "God Himself uses symbols and marks.",
    defense: "The cross was a Roman torture device before becoming Christianity's symbol. Meaning is determined by current use, not ancient origin."
  },
  {
    id: "rituals",
    title: "On Rituals",
    icon: BookOpen,
    scripture: "Do this in remembrance of me.",
    scriptureRef: "Luke 22:19",
    keyPoint: "Christianity itself has rituals: baptism, communion, ordination.",
    defense: "Rituals become meaningful based on what they point to. When BGLOs point to service, scholarship, and brotherhood, they reflect kingdom values."
  },
  {
    id: "fellowship",
    title: "On Fellowship (Koinonia)",
    icon: Users,
    scripture: "They devoted themselves to the apostles' teaching and to fellowship (koinonia).",
    scriptureRef: "Acts 2:42",
    keyPoint: "Greek-letter organizations create exactly what Scripture commands: shared life, mutual support, common identity.",
    defense: "The word 'koinonia' appears 20+ times in the New Testament. BGLOs embody this biblical concept of covenant community."
  },
  {
    id: "judgment",
    title: "On Judging Others",
    icon: Scale,
    scripture: "Accept the one whose faith is weak, without quarreling over disputable matters.",
    scriptureRef: "Romans 14:1",
    keyPoint: "Greek membership is a disputable matter, not a salvation issue.",
    defense: "Paul teaches that in disputable matters, each person must be 'fully convinced in their own mind' (Romans 14:5)."
  },
  {
    id: "redemption",
    title: "On Redemption",
    icon: Heart,
    scripture: "Daniel so distinguished himself among the administrators and the satraps by his exceptional qualities...",
    scriptureRef: "Daniel 6:3",
    keyPoint: "Daniel served in Babylon's government without compromising his faith.",
    defense: "Esther became queen of Persia. Joseph served Pharaoh. Christians can transform institutions from within rather than abandon them."
  }
];

export const ApologeticsQuickReference = () => {
  return (
    <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sacred/10">
            <Shield className="w-6 h-6 text-sacred" />
          </div>
          <div>
            <CardTitle className="text-xl">Apologetics Quick Reference</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Biblical defenses for common objections to Greek life
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {apologeticsItems.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="border border-border rounded-lg px-4 bg-muted/30"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-sacred" />
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-3 pt-2">
                    {/* Scripture */}
                    <div className="bg-sacred/10 rounded-lg p-3 border-l-4 border-sacred">
                      <p className="text-sm italic text-foreground">"{item.scripture}"</p>
                      <p className="text-xs text-sacred font-medium mt-1">— {item.scriptureRef}</p>
                    </div>
                    
                    {/* Key Point */}
                    <div>
                      <Badge variant="outline" className="mb-2 text-xs">Key Point</Badge>
                      <p className="text-sm font-medium text-foreground">{item.keyPoint}</p>
                    </div>
                    
                    {/* Defense */}
                    <div>
                      <Badge variant="outline" className="mb-2 text-xs bg-green-500/10 text-green-700 border-green-500/30">Defense</Badge>
                      <p className="text-sm text-muted-foreground">{item.defense}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};
