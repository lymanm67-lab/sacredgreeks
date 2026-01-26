import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ListenButton } from '@/components/ListenButton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { 
  Landmark, 
  MapPin, 
  Calendar, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ZoomIn,
  Info,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import catacomb artwork images
import fishEucharist from '@/assets/catacombs/fish-eucharist.jpg';
import goodShepherd from '@/assets/catacombs/good-shepherd.jpg';
import chiRhoCeiling from '@/assets/catacombs/chi-rho-ceiling.jpg';
import anchorCross from '@/assets/catacombs/anchor-cross.jpg';
import oransFigure from '@/assets/catacombs/orans-figure.jpg';
import jonahWhale from '@/assets/catacombs/jonah-whale.jpg';
import peacockImmortality from '@/assets/catacombs/peacock-immortality.jpg';
import doveBaptism from '@/assets/catacombs/dove-baptism.jpg';

// Image map for artworks
const catacombImages: Record<string, string> = {
  'fish-eucharist': fishEucharist,
  'good-shepherd': goodShepherd,
  'chi-rho-ceiling': chiRhoCeiling,
  'anchor-cross': anchorCross,
  'orans-figure': oransFigure,
  'jonah-whale': jonahWhale,
  'peacock-immortality': peacockImmortality,
  'dove-baptism': doveBaptism,
};

interface CatacombArtwork {
  id: string;
  title: string;
  location: string;
  period: string;
  century: string;
  symbolType: string;
  description: string;
  significance: string;
  biblicalConnection: string;
  modernParallel: string;
  imageDescription: string;
  colors: {
    primary: string;
    accent: string;
  };
}

const catacombArtworks: CatacombArtwork[] = [
  {
    id: 'fish-eucharist',
    title: 'Fish and Bread - Eucharistic Symbol',
    location: 'Catacomb of San Callisto, Rome',
    period: '2nd-3rd Century',
    century: '200-300 AD',
    symbolType: 'Ichthys',
    description: 'One of the earliest known depictions of the fish symbol (ΙΧΘΥΣ) alongside bread and wine. This fresco shows fish flanking a basket of bread, representing Christ as the source of spiritual nourishment.',
    significance: 'The fish served as a secret identifier for Christians during Roman persecution. The Greek word ΙΧΘΥΣ (ichthys/fish) formed an acrostic: "Jesus Christ, Son of God, Savior."',
    biblicalConnection: 'John 6:35 - "I am the bread of life." / John 21:9-13 - Jesus provides fish and bread to His disciples.',
    modernParallel: 'Similar to how Greek organizations use symbols visible only to the initiated, early Christians used the fish to identify fellow believers without alerting Roman authorities.',
    imageDescription: 'Ancient fresco showing two fish flanking a woven basket filled with round loaves of bread, with a chalice visible below',
    colors: { primary: 'bg-blue-500', accent: 'text-blue-500' }
  },
  {
    id: 'good-shepherd',
    title: 'Christ as the Good Shepherd',
    location: 'Catacomb of Priscilla, Rome',
    period: '3rd Century',
    century: '250-300 AD',
    symbolType: 'Pastoral',
    description: 'A young, beardless shepherd carrying a lamb across his shoulders, surrounded by sheep. This image allowed Christians to venerate Christ openly, as Romans assumed it depicted the pagan god Hermes Kriophoros.',
    significance: 'Demonstrates early Christian use of visual ambiguity—an image with dual meaning that protected believers while communicating truth to insiders.',
    biblicalConnection: 'John 10:11 - "I am the good shepherd. The good shepherd lays down his life for the sheep."',
    modernParallel: 'Greek organizations often use symbols with layered meanings—public interpretations for outsiders and deeper significance for members.',
    imageDescription: 'Pastoral scene with a young man in a tunic carrying a sheep on his shoulders, standing among a flock in a garden setting',
    colors: { primary: 'bg-green-500', accent: 'text-green-500' }
  },
  {
    id: 'chi-rho-ceiling',
    title: 'Chi-Rho Christogram',
    location: 'Catacomb of Commodilla, Rome',
    period: '4th Century',
    century: '350-400 AD',
    symbolType: 'Monogram',
    description: 'The Chi-Rho (☧) formed by superimposing the first two letters of "Christ" in Greek (Χ and Ρ). Often surrounded by Alpha and Omega, indicating Christ as the beginning and end.',
    significance: 'After Constantine\'s vision at the Milvian Bridge (312 AD), this symbol moved from secret catacomb use to public display on imperial standards and churches.',
    biblicalConnection: 'Revelation 22:13 - "I am the Alpha and the Omega, the First and the Last, the Beginning and the End."',
    modernParallel: 'Like Greek letter combinations that identify specific organizations, the Chi-Rho identified Christians and communicated shared theological commitments.',
    imageDescription: 'Ornate ceiling fresco featuring the Chi-Rho symbol in gold, surrounded by radiating lines and flanked by Alpha and Omega letters',
    colors: { primary: 'bg-amber-500', accent: 'text-amber-500' }
  },
  {
    id: 'anchor-cross',
    title: 'The Hidden Cross - Anchor Symbol',
    location: 'Catacomb of Domitilla, Rome',
    period: '2nd Century',
    century: '100-200 AD',
    symbolType: 'Disguised Cross',
    description: 'An anchor with its crossbar forming a hidden cross. This maritime symbol disguised Christianity\'s central symbol while maintaining its meaning for believers.',
    significance: 'The anchor represents hope in Christ and appears on numerous catacomb epitaphs. It allowed Christians to mark graves with the cross without detection.',
    biblicalConnection: 'Hebrews 6:19 - "We have this hope as an anchor for the soul, firm and secure."',
    modernParallel: 'Demonstrates how early Christians used everyday symbols with hidden meaning—similar to recognition signals within fraternal organizations.',
    imageDescription: 'Stone carving of an anchor with an elongated vertical shaft and curved hooks, the crossbar positioned to form a subtle crucifix',
    colors: { primary: 'bg-cyan-500', accent: 'text-cyan-500' }
  },
  {
    id: 'orans-figure',
    title: 'Orans Prayer Posture',
    location: 'Catacomb of Via Latina, Rome',
    period: '4th Century',
    century: '320-350 AD',
    symbolType: 'Gesture',
    description: 'A figure standing with arms raised and palms facing outward—the ancient posture of prayer. Often depicted as a woman, representing the soul or the Church in communion with God.',
    significance: 'This posture was universally understood among early Christians and persists in liturgical traditions today. It represented both individual prayer and corporate worship.',
    biblicalConnection: '1 Timothy 2:8 - "I want the men everywhere to pray, lifting up holy hands without anger or disputing."',
    modernParallel: 'Shared gestures and postures create identity within communities—similar to recognition signs in Greek organizations.',
    imageDescription: 'Painted figure in flowing robes with arms raised in prayer, palms open toward heaven, standing between peacocks symbolizing resurrection',
    colors: { primary: 'bg-purple-500', accent: 'text-purple-500' }
  },
  {
    id: 'jonah-whale',
    title: 'Jonah and the Sea Creature',
    location: 'Catacomb of Saints Peter and Marcellinus, Rome',
    period: '3rd-4th Century',
    century: '280-320 AD',
    symbolType: 'Typology',
    description: 'A multi-scene narrative showing Jonah being thrown overboard, swallowed by the sea creature, and resting under the gourd vine. The most popular catacomb narrative, appearing in over 70 known locations.',
    significance: 'Jonah\'s three days in the whale prefigured Christ\'s death and resurrection—a powerful symbol of hope for Christians facing persecution and death.',
    biblicalConnection: 'Matthew 12:40 - "For as Jonah was three days and three nights in the belly of a huge fish, so the Son of Man will be three days and three nights in the heart of the earth."',
    modernParallel: 'Shared narratives and founding stories unite communities with common identity and purpose—foundational to both early Christianity and Greek organizations.',
    imageDescription: 'Sequential fresco panels showing a man thrown from a ship, swallowed by a large sea creature, then reclining peacefully under a vine',
    colors: { primary: 'bg-teal-500', accent: 'text-teal-500' }
  },
  {
    id: 'peacock-immortality',
    title: 'Peacock - Symbol of Immortality',
    location: 'Catacomb of Praetextatus, Rome',
    period: '3rd Century',
    century: '250-300 AD',
    symbolType: 'Resurrection',
    description: 'Elegant peacocks with spread tail feathers, often flanking Christian symbols or appearing near burial niches. Ancient Romans believed peacock flesh did not decay.',
    significance: 'Christians adopted this symbol to represent resurrection and eternal life. The "eyes" in peacock feathers also symbolized God\'s all-seeing nature.',
    biblicalConnection: '1 Corinthians 15:42 - "So will it be with the resurrection of the dead. The body that is sown is perishable, it is raised imperishable."',
    modernParallel: 'Symbols of transformation and elevated identity resonate with Greek organizational symbolism representing growth and achievement.',
    imageDescription: 'Colorful peacock mosaic with tail feathers displayed in a fan pattern, featuring the characteristic eye-spots in blue and green',
    colors: { primary: 'bg-indigo-500', accent: 'text-indigo-500' }
  },
  {
    id: 'dove-baptism',
    title: 'Dove with Olive Branch',
    location: 'Catacomb of San Sebastiano, Rome',
    period: '3rd Century',
    century: '200-280 AD',
    symbolType: 'Holy Spirit',
    description: 'A dove descending with an olive branch in its beak, representing the Holy Spirit, peace, and new life. Often appears near baptismal scenes.',
    significance: 'Combined imagery from Noah\'s ark (new creation after judgment) with Jesus\' baptism (Spirit descending like a dove), creating a rich multi-layered symbol.',
    biblicalConnection: 'Matthew 3:16 - "As soon as Jesus was baptized... he saw the Spirit of God descending like a dove and alighting on him."',
    modernParallel: 'Initiation ceremonies marking new beginnings and membership are central to both Christian baptism and Greek organizational intake.',
    imageDescription: 'Delicate painting of a white dove in flight, carrying a green olive branch, with rays of light emanating from above',
    colors: { primary: 'bg-rose-500', accent: 'text-rose-500' }
  }
];

const narrativeText = `The Roman Catacombs: Christianity's Secret Gallery

Deep beneath the streets of Rome lie miles of underground tunnels—the catacombs—where early Christians buried their dead and, during times of persecution, gathered in secret worship. These subterranean chambers preserve some of the oldest Christian art in existence, revealing how our spiritual ancestors used symbols, images, and visual codes to maintain faith and community under threat of death.

For nearly three centuries before Constantine legalized Christianity in 313 AD, believers developed a sophisticated visual language. Every image served dual purposes: to the Roman authorities, they appeared as common decorative motifs; to fellow Christians, they proclaimed the deepest truths of the faith.

This gallery presents authenticated archaeological examples from Rome's major catacombs. Each artwork demonstrates how early Christians navigated the tension between secrecy and community—challenges not unlike those faced by members of modern Greek organizations who balance private traditions with public service.

As you explore these ancient images, consider the courage required to mark one's burial chamber with symbols that could endanger surviving family members. These Christians chose identity over safety, community over anonymity. Their symbols were not empty rituals but declarations of eternal hope.

The parallels to fraternal life are striking: shared symbols creating insider recognition, layered meanings protecting sacred traditions, gestures and signs communicating belonging. The difference, of course, is that catacomb Christians faced execution—yet the human need for meaningful community transcends all eras.`;

interface CatacombArtGalleryProps {
  className?: string;
}

export function CatacombArtGallery({ className }: CatacombArtGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<CatacombArtwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? catacombArtworks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedArtwork(catacombArtworks[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === catacombArtworks.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedArtwork(catacombArtworks[newIndex]);
  };

  const openArtwork = (artwork: CatacombArtwork, index: number) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(index);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn("border-stone-500/30 bg-gradient-to-br from-stone-900/50 to-stone-800/30", className)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-muted/20 transition-colors rounded-t-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-500/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <CardTitle className="text-lg text-foreground">Catacomb Art Gallery</CardTitle>
                  <p className="text-sm text-muted-foreground">Archaeological Evidence of Early Christian Symbols</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{catacombArtworks.length} Artworks</Badge>
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Explore authenticated artwork from Rome's underground burial chambers, where early Christians developed 
              a visual language of faith under Roman persecution. Each symbol served as both art and secret code.
            </p>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-2">
            <ListenButton 
              text={narrativeText + " " + catacombArtworks.map(a => `${a.title}. ${a.description} ${a.significance}`).join(" ")}
              itemId="catacomb-gallery-overview"
              variant="outline"
              size="sm"
            />
          </div>

          <CardContent className="space-y-4">
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {catacombArtworks.map((artwork, index) => (
                <button
                  key={artwork.id}
                  onClick={() => openArtwork(artwork, index)}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border/50 bg-muted/30 hover:border-stone-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400/50"
                >
                  {/* Actual Catacomb Image */}
                  <OptimizedImage
                    src={catacombImages[artwork.id]}
                    alt={artwork.title}
                    aspectRatio="square"
                    className="w-full h-full"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                    <ZoomIn className="w-6 h-6 text-foreground mb-2" />
                    <p className="text-xs font-medium text-foreground text-center line-clamp-2">{artwork.title.split(' - ')[0]}</p>
                  </div>

                  {/* Period Badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 left-2 text-[10px] bg-background/80 backdrop-blur-sm z-10"
                  >
                    {artwork.century}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Info Card */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong className="text-foreground">Archaeological Context:</strong> These artworks are from Rome's 
                    underground catacombs, active burial sites from the 2nd-5th centuries AD. Scholars like André Grabar 
                    and Fabrizio Bisconti have documented over 60 miles of tunnels containing early Christian iconography.
                  </p>
                  <p className="text-xs">
                    Sources: Vatican Museums, Pontifical Commission for Sacred Archaeology, Cambridge Archaeological Journal
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>

        {/* Detail Modal */}
        <Dialog open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
            <ScrollArea className="max-h-[90vh]">
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <div className="flex items-center justify-between">
                    <Badge className={cn(selectedArtwork?.colors.primary, "text-white")}>
                      {selectedArtwork?.symbolType}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={handlePrevious}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground self-center px-2">
                        {currentIndex + 1} / {catacombArtworks.length}
                      </span>
                      <Button variant="ghost" size="icon" onClick={handleNext}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <DialogTitle className="text-xl mt-2">{selectedArtwork?.title}</DialogTitle>
                  <DialogDescription className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" /> {selectedArtwork?.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3 h-3" /> {selectedArtwork?.period}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                {/* Catacomb Artwork Image */}
                <div className="w-full aspect-video rounded-lg mb-4 overflow-hidden border border-border/50">
                  {selectedArtwork && (
                    <OptimizedImage
                      src={catacombImages[selectedArtwork.id]}
                      alt={selectedArtwork.title}
                      className="w-full h-full"
                      priority
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground italic text-center mb-4">
                  {selectedArtwork?.imageDescription}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedArtwork?.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">Historical Significance</h4>
                    <p className="text-sm text-muted-foreground">{selectedArtwork?.significance}</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-blue-500 flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4" /> Biblical Connection
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedArtwork?.biblicalConnection}</p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-amber-500 mb-1">Modern Parallel</h4>
                    <p className="text-sm text-muted-foreground">{selectedArtwork?.modernParallel}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <ListenButton 
                    text={`${selectedArtwork?.title}. ${selectedArtwork?.description} ${selectedArtwork?.significance} Biblical Connection: ${selectedArtwork?.biblicalConnection} Modern Parallel: ${selectedArtwork?.modernParallel}`}
                    itemId={`catacomb-artwork-${selectedArtwork?.id}`}
                    variant="outline"
                    size="sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Click arrows or swipe to explore more artifacts
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </Card>
    </Collapsible>
  );
}
