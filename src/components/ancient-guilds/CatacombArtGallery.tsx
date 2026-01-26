import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ListenButton } from '@/components/ListenButton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
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
  Play,
  Pause,
  RotateCcw,
  X
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
import danielLions from '@/assets/catacombs/daniel-lions.jpg';
import mosesRock from '@/assets/catacombs/moses-rock.jpg';
import lazarusRaising from '@/assets/catacombs/lazarus-raising.jpg';
import threeHebrews from '@/assets/catacombs/three-hebrews.jpg';
import baptismScene from '@/assets/catacombs/baptism-scene.jpg';
import vineGrapes from '@/assets/catacombs/vine-grapes.jpg';
import paradisePalms from '@/assets/catacombs/paradise-palms.jpg';
import epitaphInscription from '@/assets/catacombs/epitaph-inscription.jpg';

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
  'daniel-lions': danielLions,
  'moses-rock': mosesRock,
  'lazarus-raising': lazarusRaising,
  'three-hebrews': threeHebrews,
  'baptism-scene': baptismScene,
  'vine-grapes': vineGrapes,
  'paradise-palms': paradisePalms,
  'epitaph-inscription': epitaphInscription,
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
  },
  {
    id: 'daniel-lions',
    title: 'Daniel in the Lions\' Den',
    location: 'Catacomb of Saints Peter and Marcellinus, Rome',
    period: '3rd Century',
    century: '250-300 AD',
    symbolType: 'Deliverance',
    description: 'Daniel standing peacefully with arms raised in prayer between two fierce lions. One of the most frequently depicted Old Testament scenes in catacomb art.',
    significance: 'Daniel\'s deliverance from death symbolized God\'s power to save His faithful through persecution—a powerful message for Christians facing Roman execution.',
    biblicalConnection: 'Daniel 6:22 - "My God sent his angel, and he shut the mouths of the lions. They have not hurt me."',
    modernParallel: 'Standing firm in faith despite pressure reflects the courage required to maintain one\'s values in challenging social environments.',
    imageDescription: 'Young man in prayer posture standing calmly between two large roaring lions in a Roman arena setting',
    colors: { primary: 'bg-orange-500', accent: 'text-orange-500' }
  },
  {
    id: 'moses-rock',
    title: 'Moses Striking the Rock',
    location: 'Catacomb of San Callisto, Rome',
    period: '3rd Century',
    century: '200-280 AD',
    symbolType: 'Typology',
    description: 'Moses with staff striking the rock at Horeb, water flowing forth to quench the thirst of the Israelites. A prefiguration of Christ as the source of living water.',
    significance: 'Early Christians saw Moses as a type of Christ—the rock representing Christ from whom flows the water of eternal life and baptism.',
    biblicalConnection: 'John 7:38 - "Whoever believes in me, as Scripture has said, rivers of living water will flow from within them."',
    modernParallel: 'Leadership that provides for community needs mirrors the servant-leadership ideals in Greek organizational structures.',
    imageDescription: 'Bearded figure striking a rock with a staff as water pours forth, crowd of people gathering to drink',
    colors: { primary: 'bg-sky-500', accent: 'text-sky-500' }
  },
  {
    id: 'lazarus-raising',
    title: 'The Raising of Lazarus',
    location: 'Catacomb of Via Latina, Rome',
    period: '4th Century',
    century: '320-360 AD',
    symbolType: 'Resurrection',
    description: 'Jesus with raised hand commanding Lazarus to emerge from the tomb, still wrapped in burial cloths. Witnesses look on in amazement.',
    significance: 'This miracle directly prefigured Christ\'s own resurrection and promised resurrection to all believers—central to Christian hope in death.',
    biblicalConnection: 'John 11:25 - "I am the resurrection and the life. The one who believes in me will live, even though they die."',
    modernParallel: 'Transformation and new life are themes in initiation rituals that mark passage from one state to another.',
    imageDescription: 'Jesus gesturing toward a figure emerging from a tomb archway, family members witnessing the miracle',
    colors: { primary: 'bg-yellow-500', accent: 'text-yellow-500' }
  },
  {
    id: 'three-hebrews',
    title: 'Three Hebrews in the Fiery Furnace',
    location: 'Catacomb of Priscilla, Rome',
    period: '3rd Century',
    century: '250-300 AD',
    symbolType: 'Deliverance',
    description: 'Shadrach, Meshach, and Abednego standing unharmed in Nebuchadnezzar\'s furnace, often with a fourth angelic figure present.',
    significance: 'Like Daniel, this scene represented divine protection for those who refuse to worship false gods—directly relevant to Christians refusing Roman emperor worship.',
    biblicalConnection: 'Daniel 3:25 - "Look! I see four men walking around in the fire, unbound and unharmed, and the fourth looks like a son of the gods."',
    modernParallel: 'Standing together with brothers and sisters in conviction echoes the unity of purpose in fraternal bonds.',
    imageDescription: 'Three figures standing in flames with arms raised, an angelic fourth figure visible, fire burning around them',
    colors: { primary: 'bg-red-500', accent: 'text-red-500' }
  },
  {
    id: 'baptism-scene',
    title: 'Baptismal Initiation Scene',
    location: 'Catacomb of San Callisto, Rome',
    period: '3rd Century',
    century: '220-280 AD',
    symbolType: 'Initiation',
    description: 'A convert being immersed in water by a minister, with the dove of the Holy Spirit descending. Represents the sacrament of Christian initiation.',
    significance: 'Baptism marked the boundary between the uninitiated world and the Christian community—a sacred threshold crossing.',
    biblicalConnection: 'Romans 6:4 - "We were therefore buried with him through baptism into death in order that... we too may live a new life."',
    modernParallel: 'The parallels to fraternal initiation are striking—ritual marking, new identity, community membership, and sacred solemnity.',
    imageDescription: 'Figure being immersed in baptismal waters, another figure assisting, dove descending from above with cross symbol',
    colors: { primary: 'bg-blue-600', accent: 'text-blue-600' }
  },
  {
    id: 'vine-grapes',
    title: 'The True Vine - Eucharistic Symbol',
    location: 'Catacomb of Domitilla, Rome',
    period: '4th Century',
    century: '320-380 AD',
    symbolType: 'Eucharist',
    description: 'Intertwined grape vines with abundant clusters of grapes and leaves, often framing burial niches or decorating ceilings.',
    significance: 'The vine represented Christ\'s blood shed for believers, the Eucharistic wine, and the interconnected community of Christians as branches.',
    biblicalConnection: 'John 15:5 - "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit."',
    modernParallel: 'The imagery of interconnected branches reflects the bonds of brotherhood and sisterhood in fraternal organizations.',
    imageDescription: 'Decorative border with intertwined grape vines, clusters of purple grapes, and green leaves on aged plaster',
    colors: { primary: 'bg-purple-600', accent: 'text-purple-600' }
  },
  {
    id: 'paradise-palms',
    title: 'Paradise Garden - Celestial Hope',
    location: 'Catacomb of Vigna Massimo, Rome',
    period: '4th Century',
    century: '340-380 AD',
    symbolType: 'Afterlife',
    description: 'Ceiling fresco depicting palm trees against a starry night sky, representing the paradise awaiting faithful Christians after death.',
    significance: 'Palms symbolized victory and eternal rest. The starry heavens depicted the cosmic realm where souls would dwell with God.',
    biblicalConnection: 'Revelation 7:9 - "A great multitude... standing before the throne and before the Lamb, holding palm branches in their hands."',
    modernParallel: 'The hope of reward and achievement beyond present struggles motivates dedication in both faith and fraternal service.',
    imageDescription: 'Dome ceiling with deep blue sky, golden stars, and palm trees representing the eternal paradise garden',
    colors: { primary: 'bg-blue-800', accent: 'text-blue-800' }
  },
  {
    id: 'epitaph-inscription',
    title: 'ΙΧΘΥΣ Epitaph Inscription',
    location: 'Catacomb of San Sebastiano, Rome',
    period: '2nd-3rd Century',
    century: '150-250 AD',
    symbolType: 'Memorial',
    description: 'Stone burial marker featuring the Greek letters ΙΧΘΥΣ (fish), often combined with anchor-cross symbols and Latin memorial inscriptions.',
    significance: 'These epitaphs served as permanent testimony to Christian faith, marking graves with coded symbols that proclaimed hope in resurrection.',
    biblicalConnection: 'Philippians 3:20 - "Our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ."',
    modernParallel: 'Memorial traditions honoring departed members preserve organizational history and connect living members to their heritage.',
    imageDescription: 'Carved stone tablet with IXTHUS letters, fish symbol, cross, and anchor motifs, Latin inscription DIS MANIBUS',
    colors: { primary: 'bg-stone-500', accent: 'text-stone-500' }
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
  
  // Tour Mode State
  const [isTourMode, setIsTourMode] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const TOUR_INTERVAL = 8000; // 8 seconds per artwork

  // Auto-advance tour
  useEffect(() => {
    if (!isTourMode || !isPlaying) return;
    
    const timer = setInterval(() => {
      setTourIndex((prev) => {
        if (prev >= catacombArtworks.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, TOUR_INTERVAL);

    return () => clearInterval(timer);
  }, [isTourMode, isPlaying]);

  const startTour = useCallback(() => {
    setIsTourMode(true);
    setTourIndex(0);
    setIsPlaying(true);
  }, []);

  const stopTour = useCallback(() => {
    setIsTourMode(false);
    setIsPlaying(false);
    setTourIndex(0);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const tourPrevious = useCallback(() => {
    setTourIndex((prev) => (prev === 0 ? catacombArtworks.length - 1 : prev - 1));
  }, []);

  const tourNext = useCallback(() => {
    setTourIndex((prev) => (prev >= catacombArtworks.length - 1 ? 0 : prev + 1));
  }, []);

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

  const currentTourArtwork = catacombArtworks[tourIndex];

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
          <div className="px-6 pb-2 flex flex-wrap gap-2">
            <ListenButton 
              text={narrativeText + " " + catacombArtworks.map(a => `${a.title}. ${a.description} ${a.significance}`).join(" ")}
              itemId="catacomb-gallery-overview"
              variant="outline"
              size="sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={startTour}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              Start Guided Tour
            </Button>
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
                <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
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

        {/* Tour Mode Dialog */}
        <Dialog open={isTourMode} onOpenChange={(open) => !open && stopTour()}>
          <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={tourIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Tour Header */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <Badge className="bg-background/90 backdrop-blur-sm text-foreground">
                    Tour: {tourIndex + 1} of {catacombArtworks.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={stopTour}
                    className="bg-background/90 backdrop-blur-sm hover:bg-background"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Large Image Display */}
                <div className="w-full aspect-video relative">
                  <OptimizedImage
                    src={catacombImages[currentTourArtwork.id]}
                    alt={currentTourArtwork.title}
                    className="w-full h-full"
                    priority
                  />
                  {/* Progress bar */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: TOUR_INTERVAL / 1000, ease: 'linear' }}
                        key={`progress-${tourIndex}`}
                      />
                    </div>
                  )}
                </div>

                {/* Tour Content */}
                <ScrollArea className="max-h-[40vh]">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn(currentTourArtwork.colors.primary, "text-white text-xs")}>
                        {currentTourArtwork.symbolType}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {currentTourArtwork.century}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {currentTourArtwork.location.split(',')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">{currentTourArtwork.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{currentTourArtwork.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                        <h4 className="font-semibold text-sm text-primary flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4" /> Biblical Connection
                        </h4>
                        <p className="text-xs text-muted-foreground">{currentTourArtwork.biblicalConnection}</p>
                      </div>

                      <div className="bg-secondary/50 border border-border rounded-lg p-3">
                        <h4 className="font-semibold text-sm text-foreground mb-1">Modern Parallel</h4>
                        <p className="text-xs text-muted-foreground">{currentTourArtwork.modernParallel}</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Tour Controls */}
                <div className="border-t border-border p-4 flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon" onClick={tourPrevious}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="icon" 
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <Button variant="outline" size="icon" onClick={tourNext}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={() => { setTourIndex(0); setIsPlaying(true); }} className="ml-4">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Restart
                  </Button>
                </div>

                {/* Thumbnail Progress */}
                <div className="px-4 pb-4">
                  <div className="flex gap-1 overflow-x-auto py-2">
                    {catacombArtworks.map((artwork, index) => (
                      <button
                        key={artwork.id}
                        onClick={() => setTourIndex(index)}
                        className={cn(
                          "w-12 h-12 rounded-md overflow-hidden border-2 shrink-0 transition-all",
                          index === tourIndex 
                            ? "border-primary ring-2 ring-primary/50" 
                            : index < tourIndex 
                              ? "border-primary/50 opacity-70" 
                              : "border-border opacity-50"
                        )}
                      >
                        <OptimizedImage
                          src={catacombImages[artwork.id]}
                          alt={artwork.title}
                          aspectRatio="square"
                          className="w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </DialogContent>
        </Dialog>

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
