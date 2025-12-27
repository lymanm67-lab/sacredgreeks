import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, RefreshCw, Check, X, Star, Trophy, 
  ChevronLeft, ChevronRight, Shuffle, Target, Flame 
} from "lucide-react";
import { toast } from "sonner";

interface Flashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  scripture: string;
  scriptureText: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

const flashcards: Flashcard[] = [
  {
    id: "1",
    category: "Koinonia",
    question: "What Greek word means 'fellowship' and appears 20+ times in the New Testament?",
    answer: "Koinonia (κοινωνία)",
    scripture: "Acts 2:42",
    scriptureText: "They devoted themselves to the apostles' teaching and to fellowship (koinonia).",
    difficulty: "easy",
    points: 10
  },
  {
    id: "2",
    category: "Jesus as Craftsman",
    question: "What Greek word describes Jesus's occupation, meaning 'master builder' or 'craftsman'?",
    answer: "Tekton (τέκτων)",
    scripture: "Mark 6:3",
    scriptureText: "Is not this the carpenter (tekton), the son of Mary?",
    difficulty: "medium",
    points: 20
  },
  {
    id: "3",
    category: "Secret Password",
    question: "What Aramaic word did Paul use as a 'secret password' that he didn't translate for readers?",
    answer: "Maranatha ('Our Lord, come!')",
    scripture: "1 Corinthians 16:22",
    scriptureText: "If anyone does not love the Lord, let him be accursed. Maranatha!",
    difficulty: "hard",
    points: 30
  },
  {
    id: "4",
    category: "Biblical Precedent",
    question: "In Judges 12, what word was used as a password to identify true Israelites?",
    answer: "Shibboleth",
    scripture: "Judges 12:5-6",
    scriptureText: "They said, 'Then say Shibboleth,' and he said 'Sibboleth' for he could not pronounce it right.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "5",
    category: "Early Church",
    question: "What fish symbol was used by early Christians as a secret sign?",
    answer: "Ichthys (ΙΧΘΥΣ) - acronym for 'Jesus Christ, God's Son, Savior'",
    scripture: "Matthew 4:19",
    scriptureText: "Follow me, and I will make you fishers of men.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "6",
    category: "Holy Kiss",
    question: "How many times does Scripture command the 'holy kiss' greeting?",
    answer: "5 times (Romans 16:16, 1 Cor 16:20, 2 Cor 13:12, 1 Thess 5:26, 1 Peter 5:14)",
    scripture: "Romans 16:16",
    scriptureText: "Greet one another with a holy kiss.",
    difficulty: "hard",
    points: 30
  },
  {
    id: "7",
    category: "Secrecy in Scripture",
    question: "What did Jesus instruct the three disciples to keep secret until after His resurrection?",
    answer: "The Transfiguration",
    scripture: "Matthew 17:9",
    scriptureText: "Tell no one the vision, until the Son of Man is raised from the dead.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "8",
    category: "Initiation",
    question: "How long was the early church catechumenate (initiation period) for new converts?",
    answer: "1-3 years",
    scripture: "Hebrews 5:12",
    scriptureText: "For though by this time you ought to be teachers, you need someone to teach you again.",
    difficulty: "hard",
    points: 30
  },
  {
    id: "9",
    category: "Pharisees",
    question: "Paul boasted of his membership in what religious 'fraternity' even after conversion?",
    answer: "The Pharisees",
    scripture: "Philippians 3:5",
    scriptureText: "Circumcised on the eighth day...as to the law, a Pharisee.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "10",
    category: "Partnership",
    question: "What word describes Peter, James, and John's fishing guild relationship?",
    answer: "Koinonoi (partners/sharers)",
    scripture: "Luke 5:10",
    scriptureText: "James and John, sons of Zebedee, who were partners (koinonoi) with Simon.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "11",
    category: "Redemption",
    question: "Which biblical figure served faithfully in a pagan king's government without compromising his faith?",
    answer: "Daniel",
    scripture: "Daniel 6:3",
    scriptureText: "Daniel distinguished himself...because an excellent spirit was in him.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "12",
    category: "Cultural Transformation",
    question: "What does Romans 12:2 say about culture and transformation?",
    answer: "Be transformed by renewing your mind, not conformed to the world",
    scripture: "Romans 12:2",
    scriptureText: "Do not be conformed to this world, but be transformed by the renewal of your mind.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "13",
    category: "Salt and Light",
    question: "What two metaphors did Jesus use for believers' presence in the world?",
    answer: "Salt of the earth and Light of the world",
    scripture: "Matthew 5:13-14",
    scriptureText: "You are the salt of the earth...You are the light of the world.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "14",
    category: "Essenes",
    question: "How long was the Essene initiation process according to Josephus?",
    answer: "1-3 years with progressive stages",
    scripture: "Related: Matthew 13:11",
    scriptureText: "To you it has been given to know the secrets of the kingdom of heaven.",
    difficulty: "hard",
    points: 30
  },
  {
    id: "15",
    category: "Just Weight",
    question: "What does Proverbs 11:1 say about balanced judgment?",
    answer: "A false balance is an abomination to the Lord, but a just weight is His delight",
    scripture: "Proverbs 11:1",
    scriptureText: "A false balance is an abomination to the LORD, but a just weight is his delight.",
    difficulty: "medium",
    points: 20
  }
];

export const ScriptureFlashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<Set<string>>(new Set());
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([...flashcards]);

  const currentCard = shuffledCards[currentIndex];
  const progress = (cardsStudied.size / flashcards.length) * 100;
  const masteryProgress = (masteredCards.size / flashcards.length) * 100;

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    toast.success("Cards shuffled!");
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !cardsStudied.has(currentCard.id)) {
      setCardsStudied(new Set([...cardsStudied, currentCard.id]));
    }
  };

  const handleKnewIt = () => {
    setScore(prev => prev + currentCard.points);
    setStreak(prev => prev + 1);
    setMasteredCards(new Set([...masteredCards, currentCard.id]));
    toast.success(`+${currentCard.points} points! 🎉`);
    handleNext();
  };

  const handleDidntKnow = () => {
    setStreak(0);
    handleNext();
  };

  const resetProgress = () => {
    setScore(0);
    setStreak(0);
    setCardsStudied(new Set());
    setMasteredCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
    shuffleCards();
    toast.info("Progress reset!");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "medium": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "hard": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="bg-gradient-to-br from-sacred/5 to-background p-4 space-y-4">
      {/* Stats Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1 text-amber-600">
              <Trophy className="w-4 h-4" />
              <span className="font-bold">{score}</span>
            </div>
            <span className="text-xs text-muted-foreground">Points</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="w-4 h-4" />
              <span className="font-bold">{streak}</span>
            </div>
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
        </div>
      </div>
        
      {/* Progress Bars */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span>Cards Studied</span>
          <span>{cardsStudied.size}/{flashcards.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="flex items-center justify-between text-xs mt-2">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500" />
            Mastered
          </span>
          <span>{masteredCards.size}/{flashcards.length}</span>
        </div>
        <Progress value={masteryProgress} className="h-2 bg-amber-100 dark:bg-amber-900/20" />
      </div>
      
      {/* Flashcard */}
      <div 
        className="relative h-72 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div 
          className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className={`absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col ${
            isFlipped ? "invisible" : ""
          } bg-gradient-to-br from-card to-muted/50 border-2 border-sacred/20`}>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs">
                {currentCard.category}
              </Badge>
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty} • {currentCard.points}pts
              </Badge>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg font-medium text-center">
                {currentCard.question}
              </p>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Tap to reveal answer
            </p>
          </div>
          
          {/* Back */}
          <div className={`absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col rotate-y-180 ${
            !isFlipped ? "invisible" : ""
          } bg-gradient-to-br from-sacred/10 to-card border-2 border-sacred/30`}>
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <p className="text-lg font-bold text-center text-sacred">
                {currentCard.answer}
              </p>
              
              <div className="p-3 rounded-lg bg-muted/50 border border-border w-full">
                <p className="text-sm font-semibold mb-1">{currentCard.scripture}</p>
                <p className="text-sm text-muted-foreground italic">
                  "{currentCard.scriptureText}"
                </p>
              </div>
            </div>
            
            {/* Knew It / Didn't Know Buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1 border-red-500/30 hover:bg-red-500/10"
                onClick={(e) => { e.stopPropagation(); handleDidntKnow(); }}
              >
                <X className="w-4 h-4 mr-2" />
                Study Again
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={(e) => { e.stopPropagation(); handleKnewIt(); }}
              >
                <Check className="w-4 h-4 mr-2" />
                Got It!
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {shuffledCards.length}
          </span>
          
          <Button variant="ghost" size="icon" onClick={shuffleCards}>
            <Shuffle className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={resetProgress}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Achievement */}
      {masteredCards.size === flashcards.length && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/20 to-sacred/20 border border-amber-500/30 text-center">
          <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="font-bold text-amber-600">🎉 All Cards Mastered!</p>
          <p className="text-sm text-muted-foreground">
            Final Score: {score} points
          </p>
        </div>
      )}
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
