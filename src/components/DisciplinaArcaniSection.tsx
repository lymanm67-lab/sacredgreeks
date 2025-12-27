import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eye, EyeOff, Shield, BookOpen, Cross, Users, Lock, Scroll, ChurchIcon } from "lucide-react";

export const DisciplinaArcaniSection = () => {
  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <EyeOff className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <Badge className="mb-1 bg-purple-500/10 text-purple-600 border-purple-500/20">
              Church History
            </Badge>
            <CardTitle className="text-xl">Disciplina Arcani</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              The "Discipline of the Secret" — Early Church Secrecy Doctrine
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Explanation */}
        <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            What is Disciplina Arcani?
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disciplina Arcani</strong> (Latin for "Discipline of the Secret") was the 
            early Christian practice of concealing certain rituals, doctrines, and sacred mysteries from outsiders and 
            unbaptized individuals. This was not deception—it was <em>protective revelation</em>, gradually sharing 
            sacred truths only with those prepared to receive them.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            This practice flourished from the 2nd through 5th centuries and was considered <strong>normative Christianity</strong>, 
            not a deviation from it. Major church fathers including Origen, Cyril of Jerusalem, Basil the Great, and 
            Augustine all defended and practiced it.
          </p>
        </div>

        {/* Key Elements */}
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="what-hidden" className="border border-border rounded-lg px-4 bg-muted/30">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-foreground">What Was Kept Secret?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>The Eucharist (Lord's Supper)</strong> — Non-Christians were dismissed before communion was celebrated. The exact words of institution were not written down but passed orally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Baptismal Rituals</strong> — The full baptismal formula, anointing with oil, receiving new white garments, and the laying on of hands were revealed only during initiation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>The Creed</strong> — The exact wording of the baptismal creed was memorized by catechumens but not written down. It was called the "symbol" (symbolon).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>The Lord's Prayer</strong> — Only the baptized were taught the Our Father. It was considered too sacred for the uninitiated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Deep Doctrines</strong> — The Trinity, Incarnation, and other mysteries were explained progressively, with fuller understanding revealed after baptism.</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="biblical-basis" className="border border-border rounded-lg px-4 bg-muted/30">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3">
                <Scroll className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-foreground">Biblical Basis</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                <div className="bg-purple-500/10 rounded p-3 border-l-4 border-purple-500">
                  <p className="text-sm italic text-foreground">"Do not give dogs what is holy, and do not throw your pearls before pigs, lest they trample them underfoot and turn to attack you."</p>
                  <p className="text-xs font-semibold text-purple-600 mt-1">— Matthew 7:6</p>
                </div>
                <div className="bg-purple-500/10 rounded p-3 border-l-4 border-purple-500">
                  <p className="text-sm italic text-foreground">"To you has been given the secret of the kingdom of God, but for those outside everything is in parables."</p>
                  <p className="text-xs font-semibold text-purple-600 mt-1">— Mark 4:11</p>
                </div>
                <div className="bg-purple-500/10 rounded p-3 border-l-4 border-purple-500">
                  <p className="text-sm italic text-foreground">"I still have many things to say to you, but you cannot bear them now."</p>
                  <p className="text-xs font-semibold text-purple-600 mt-1">— John 16:12</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  The early church saw progressive revelation as Jesus's own method—teaching publicly in parables 
                  while explaining mysteries privately to His disciples.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="church-fathers" className="border border-border rounded-lg px-4 bg-muted/30">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3">
                <ChurchIcon className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-foreground">Church Fathers' Testimony</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 text-sm">
                <div className="border-l-4 border-muted pl-3">
                  <p className="font-semibold text-foreground">Origen (c. 185–254 AD)</p>
                  <p className="text-muted-foreground italic">"It is not possible for those who are strangers to God's mysteries to hear them. Some things must not be disclosed to all."</p>
                </div>
                <div className="border-l-4 border-muted pl-3">
                  <p className="font-semibold text-foreground">Cyril of Jerusalem (c. 313–386 AD)</p>
                  <p className="text-muted-foreground italic">"We do not speak to the catechumens of the mysteries... Guard them in silence lest the Gentile hear."</p>
                </div>
                <div className="border-l-4 border-muted pl-3">
                  <p className="font-semibold text-foreground">Basil the Great (c. 330–379 AD)</p>
                  <p className="text-muted-foreground italic">"Of the doctrines and proclamations which are kept in the Church, some we have from written instruction, and some we have received from the tradition of the Apostles, delivered to us in mystery."</p>
                </div>
                <div className="border-l-4 border-muted pl-3">
                  <p className="font-semibold text-foreground">Augustine (354–430 AD)</p>
                  <p className="text-muted-foreground italic">"The sacrament of baptism is one thing, the sacrament of the Creed is another... The symbol is given but not explained [to catechumens]."</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="catechumenate" className="border border-border rounded-lg px-4 bg-muted/30">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-foreground">The Catechumenate: 1-3 Year Initiation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The catechumenate was the early church's formal initiation process, lasting <strong>1-3 years</strong>. 
                  This was not baptism on demand—it was rigorous preparation with progressive stages:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li><strong>Inquiry Period:</strong> Candidates were observed, questioned about motives, and assessed for sincerity.</li>
                  <li><strong>Catechumenate:</strong> Formal instruction in Scripture, ethics, and basic Christian teaching. Catechumens attended the first part of worship but were dismissed before the Eucharist.</li>
                  <li><strong>Intensive Preparation:</strong> Final weeks before baptism included daily instruction, fasting, exorcisms, and scrutinies.</li>
                  <li><strong>Baptismal Initiation:</strong> Candidates underwent night-time ceremonies including stripping of old garments, triple immersion, anointing with oil, receiving new white robes, receiving a new name, and finally participating in their first Eucharist.</li>
                  <li><strong>Mystagogy:</strong> After baptism, new Christians received deeper teaching about the mysteries they had now experienced.</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bglo-parallel" className="border border-border rounded-lg px-4 bg-muted/30">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-foreground">Parallel to Greek Organizations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Critics who condemn BGLO secrecy must reckon with the fact that the <strong>early church itself</strong> 
                  operated as a secret society with:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Progressive revelation of sacred knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Extended initiation periods with stages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Secret passwords, handshakes, and recognition signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Ritual ceremonies with symbolic elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Protection of sacred traditions from outsiders</span>
                  </li>
                </ul>
                <p className="font-medium text-foreground mt-4">
                  If the early church's secrecy was godly protective wisdom, similar practices in BGLOs cannot be 
                  automatically condemned as unchristian.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Citation */}
        <div className="text-xs text-muted-foreground border-t border-border pt-4">
          <p className="font-semibold">Sources:</p>
          <p>Montgomery, Dr. Lyman A. <em>Sacred Not Sinful: A Biblical Response to the Black Greek Letter Organizations Debate</em>.</p>
          <p>Hippolytus, <em>Apostolic Tradition</em> (c. 215 AD). Tertullian, <em>Apology</em>. Cyril of Jerusalem, <em>Catechetical Lectures</em>.</p>
        </div>
      </CardContent>
    </Card>
  );
};
