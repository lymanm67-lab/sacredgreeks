import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cross, ChevronDown, ChevronUp, Volume2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListenButton } from '@/components/ListenButton';

interface EarlyChristianSymbol {
  id: string;
  name: string;
  greek?: string;
  description: string;
  meaning: string;
  usage: string;
  scripture: string;
  parallel: string;
}

const symbols: EarlyChristianSymbol[] = [
  {
    id: 'ichthys',
    name: 'Ichthys (Fish)',
    greek: 'ΙΧΘΥΣ',
    description: 'The fish symbol was the original secret recognition sign of the early church during Roman persecution.',
    meaning: 'Greek acrostic: Ἰησοῦς Χριστός Θεοῦ Υἱός Σωτήρ (Jesus Christ, God\'s Son, Savior)',
    usage: 'Drawn in sand or traced in palm during secret greetings to identify fellow believers without verbal disclosure.',
    scripture: 'Matthew 4:19 ("fishers of men"); John 21:6',
    parallel: 'Greek organizations use symbols with hidden meanings known only to initiated members—identical structure.'
  },
  {
    id: 'chi-rho',
    name: 'Chi-Rho (☧)',
    greek: 'ΧΡ',
    description: 'Ancient Christian monogram combining the first two Greek letters of "Christ" (Χριστός).',
    meaning: 'Represents Christ Himself. Chi (Χ) and Rho (Ρ) overlap to form a distinctive symbol.',
    usage: 'Emperor Constantine saw this in a vision before the Battle of Milvian Bridge (312 AD). Used on shields, altars, vestments.',
    scripture: 'Colossians 3:17; Philippians 2:10-11',
    parallel: 'Uses the same Greek alphabet as fraternities and sororities. If Greek letters were "of the devil," this sacred Christian symbol would be too.'
  },
  {
    id: 'alpha-omega',
    name: 'Alpha & Omega (Α Ω)',
    greek: 'Α Ω',
    description: 'The first and last letters of the Greek alphabet, representing Christ as the beginning and end of all things.',
    meaning: 'Christ is eternal—He existed before creation and will remain after time ends.',
    usage: 'Displayed in churches, religious art, jewelry. Often combined with Chi-Rho or crosses.',
    scripture: 'Revelation 1:8; 21:6; 22:13 ("I am the Alpha and the Omega")',
    parallel: 'Christians proudly display Greek letters while condemning organizations that use the same alphabet—inconsistent standard.'
  },
  {
    id: 'anchor',
    name: 'Anchor of Hope',
    description: 'Early Christians used the anchor as a secret symbol combining the cross with a crescent moon shape.',
    meaning: 'Represents hope in Christ as steadfast and secure. The crossbar suggests the crucifixion.',
    usage: 'Found in catacomb art and early Christian tombs. Could be displayed openly without revealing Christian identity.',
    scripture: 'Hebrews 6:19 ("We have this hope as an anchor for the soul, firm and secure")',
    parallel: 'Delta Gamma and other organizations use anchor symbols with spiritual meaning—following biblical precedent.'
  },
  {
    id: 'staurogram',
    name: 'Staurogram (⳨)',
    greek: 'ΤΡ',
    description: 'Combination of Greek Tau (Τ) and Rho (Ρ) forming a visual representation of Christ on the cross.',
    meaning: 'One of the earliest visual depictions of the crucifixion, predating drawn images of Christ.',
    usage: 'Found in early Greek manuscripts as shorthand for "cross" (stauros). Used in sacred writings.',
    scripture: 'Galatians 6:14; 1 Corinthians 1:18',
    parallel: 'Christians used Greek letter combinations as sacred symbols—exactly what Greek organizations do with their letters.'
  },
  {
    id: 'ihs',
    name: 'IHS / IHC Christogram',
    greek: 'ΙΗΣ',
    description: 'First three letters of Jesus\'s name in Greek: Iota (Ι), Eta (Η), Sigma (Σ).',
    meaning: 'Abbreviation of ΙΗΣΟΥΣ (Jesus). Later Latin interpretations: "In Hoc Signo" (In This Sign) or "Iesus Hominum Salvator" (Jesus Savior of Men).',
    usage: 'Displayed on altars, vestments, communion wafers, and church architecture worldwide.',
    scripture: 'Acts 4:12 ("Salvation is found in no one else, for there is no other name...")',
    parallel: 'Greek letter abbreviations with special meanings are foundational to Christian tradition—and to Greek organizations.'
  },
  {
    id: 'dove',
    name: 'Dove of Peace',
    description: 'Symbol of the Holy Spirit, peace, and new beginnings. One of the earliest Christian symbols.',
    meaning: 'Represents the Holy Spirit descending at Jesus\'s baptism and the dove returning to Noah with the olive branch.',
    usage: 'Found in catacomb art, baptisteries, and early Christian iconography. Often depicted with olive branch.',
    scripture: 'Matthew 3:16; Genesis 8:11; John 1:32',
    parallel: 'Multiple Greek organizations (Zeta Phi Beta, others) use dove imagery—connecting to biblical symbolism.'
  },
  {
    id: 'peacock',
    name: 'Peacock of Immortality',
    description: 'Early Christians adopted the peacock as a symbol of resurrection and eternal life.',
    meaning: 'Ancient belief that peacock flesh doesn\'t decay symbolized Christ\'s incorruptible resurrection body.',
    usage: 'Found throughout catacomb art and early Christian mosaics, especially in funeral contexts.',
    scripture: '1 Corinthians 15:42-44 ("The body that is sown is perishable, it is raised imperishable")',
    parallel: 'Christians adopted pagan symbols and gave them new meaning—exactly what Greek organizations can do.'
  }
];

const ttsText = `Early Christian Recognition Symbols: A Guide to Hidden Signs of Faith

The early church, facing Roman persecution, developed an extensive visual language of secret symbols. These weren't merely decorative—they were recognition codes that determined life and death decisions.

The Ichthys, or Fish Symbol. The Greek word ΙΧΘΥΣ (ichthys, meaning fish) was an acrostic for "Jesus Christ, God's Son, Savior." Christians would draw one curved line in the sand; if the stranger completed the fish shape, both knew they shared the faith. This is exactly how Greek organizations use symbols with hidden meanings today.

The Chi-Rho. This monogram combines the first two Greek letters of "Christ"—Chi and Rho—into a single symbol. Emperor Constantine saw it in a vision before battle and made it the emblem of his army. It uses the same Greek alphabet that fraternities and sororities use.

Alpha and Omega. The first and last letters of the Greek alphabet represent Christ as the eternal beginning and end. Christians display these Greek letters in churches while sometimes criticizing organizations that use the same alphabet—an inconsistent standard.

The Anchor of Hope. Hebrews 6:19 calls hope "an anchor for the soul." Early Christians used the anchor as a secret symbol because its crossbar suggested the crucifixion while appearing innocent to Roman authorities.

The Staurogram. Combining Greek Tau and Rho, this symbol depicted Christ on the cross before Christians drew actual crucifixion images. It appears in early manuscripts as sacred shorthand.

The IHS Christogram. The first three letters of Jesus's name in Greek—Iota, Eta, Sigma—appear on altars, vestments, and communion wafers worldwide. Greek letter abbreviations with special meanings are foundational to Christian tradition.

The Dove and the Peacock. Early Christians used the dove for the Holy Spirit and the peacock for resurrection. These symbols appear throughout catacomb art.

Key insight: Christianity developed using Greek letters, secret symbols, hidden meanings, and recognition signs. The same structures appear in Greek organizations today. The question isn't whether symbols exist—it's what they point toward.`;

export function EarlyChristianSymbolsGuide({ className, defaultOpen = false }: { className?: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  return (
    <Card className={`border-sacred/30 overflow-hidden ${className}`}>
      <CardHeader 
        className="bg-gradient-to-r from-sacred/10 to-purple-500/10 pb-4 cursor-pointer hover:from-sacred/15 hover:to-purple-500/15 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred to-purple-600 flex items-center justify-center shadow-lg">
                <Cross className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Early Christian Recognition Symbols
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Chi-Rho, Alpha-Omega, Anchor, and more secret signs of faith
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-sacred/10 text-sacred border-sacred/30">
                8 Symbols
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* TTS Button */}
          <div className="flex items-center gap-2 pt-2 border-t border-sacred/20" onClick={(e) => e.stopPropagation()}>
            <Volume2 className="w-4 h-4 text-sacred" />
            <span className="text-sm text-muted-foreground">Listen to guide:</span>
            <ListenButton
              text={ttsText}
              itemId="early-christian-symbols-guide"
              title="Early Christian Symbols"
              voice="onyx"
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-0">
              {/* Key Insight */}
              <div className="p-4 bg-sacred/5 border-b border-sacred/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-sacred">Key Insight:</strong> Christianity developed using Greek letters, 
                  secret symbols, hidden meanings, and recognition signs. The same structures appear in Greek 
                  organizations today.
                </p>
              </div>

              {/* Symbols Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {symbols.map((symbol) => (
                  <motion.div
                    key={symbol.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedSymbol === symbol.id 
                        ? 'border-sacred bg-sacred/5 shadow-md' 
                        : 'border-border hover:border-sacred/50 hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedSymbol(selectedSymbol === symbol.id ? null : symbol.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{symbol.name}</h4>
                          {symbol.greek && (
                            <span className="text-lg font-serif text-sacred">{symbol.greek}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {symbol.description}
                        </p>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                          selectedSymbol === symbol.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <AnimatePresence>
                      {selectedSymbol === symbol.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 space-y-3"
                        >
                          <div>
                            <p className="text-xs font-semibold text-sacred uppercase tracking-wide">Meaning</p>
                            <p className="text-sm text-foreground mt-1">{symbol.meaning}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Historical Usage</p>
                            <p className="text-sm text-foreground mt-1">{symbol.usage}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Scripture</p>
                            <p className="text-sm text-foreground mt-1 italic">{symbol.scripture}</p>
                          </div>
                          <div className="pt-2 border-t border-dashed">
                            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Greek Organization Parallel</p>
                            <p className="text-sm text-muted-foreground mt-1">{symbol.parallel}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="p-4 bg-gradient-to-r from-sacred/5 to-purple-500/5 border-t">
                <p className="text-xs text-muted-foreground text-center italic">
                  "The question isn't whether symbols, secrets, or Greek letters exist—it's what they point toward."
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
