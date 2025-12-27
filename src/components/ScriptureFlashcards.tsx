import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, RefreshCw, Check, X, Star, Trophy, 
  ChevronLeft, ChevronRight, Shuffle, Flame, CircleDot, Layers
} from "lucide-react";
import { toast } from "sonner";

interface Flashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  wrongAnswers: string[];
  scripture: string;
  scriptureText: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

type GameMode = "flashcard" | "multiple-choice";

const flashcards: Flashcard[] = [
  // Greek Life & Faith
  {
    id: "1",
    category: "Koinonia",
    question: "What Greek word means 'fellowship' and appears 20+ times in the New Testament?",
    answer: "Koinonia (κοινωνία)",
    wrongAnswers: ["Agape (ἀγάπη)", "Ekklesia (ἐκκλησία)", "Charis (χάρις)"],
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
    wrongAnswers: ["Architekton (ἀρχιτέκτων)", "Ergates (ἐργάτης)", "Demiourgos (δημιουργός)"],
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
    wrongAnswers: ["Abba ('Father')", "Hosanna ('Save us!')", "Amen ('So be it')"],
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
    wrongAnswers: ["Shalom", "Selah", "Sabbath"],
    scripture: "Judges 12:5-6",
    scriptureText: "They said, 'Then say Shibboleth,' and he said 'Sibboleth' for he could not pronounce it right.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "5",
    category: "Early Church",
    question: "What fish symbol was used by early Christians as a secret sign?",
    answer: "Ichthys (ΙΧΘΥΣ)",
    wrongAnswers: ["Chi-Rho (☧)", "Alpha-Omega (ΑΩ)", "Staurogram (⳨)"],
    scripture: "Matthew 4:19",
    scriptureText: "Follow me, and I will make you fishers of men.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "6",
    category: "Holy Kiss",
    question: "How many times does Scripture command the 'holy kiss' greeting?",
    answer: "5 times",
    wrongAnswers: ["3 times", "7 times", "2 times"],
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
    wrongAnswers: ["His true identity as Messiah", "The Last Supper details", "Lazarus's resurrection"],
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
    wrongAnswers: ["40 days", "6 months", "7 years"],
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
    wrongAnswers: ["The Sadducees", "The Essenes", "The Zealots"],
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
    wrongAnswers: ["Adelphoi (brothers)", "Mathetes (disciples)", "Douloi (servants)"],
    scripture: "Luke 5:10",
    scriptureText: "James and John, sons of Zebedee, who were partners (koinonoi) with Simon.",
    difficulty: "medium",
    points: 20
  },
  // Faith in Secular Contexts
  {
    id: "11",
    category: "Redemption",
    question: "Which biblical figure served faithfully in a pagan king's government without compromising his faith?",
    answer: "Daniel",
    wrongAnswers: ["Moses", "Elijah", "David"],
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
    wrongAnswers: ["Separate completely from the world", "Embrace all cultural practices", "Judge others by their culture"],
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
    wrongAnswers: ["Bread and Wine", "Sheep and Shepherd", "Rock and Sand"],
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
    wrongAnswers: ["7 days of fasting", "40 days in the wilderness", "One full year only"],
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
    wrongAnswers: ["Weigh all things equally", "The rich deserve more weight", "Balance is impossible for humans"],
    scripture: "Proverbs 11:1",
    scriptureText: "A false balance is an abomination to the LORD, but a just weight is his delight.",
    difficulty: "medium",
    points: 20
  },
  // Additional cards for expanded database
  {
    id: "16",
    category: "Agape Love",
    question: "What Greek word describes unconditional, self-sacrificing love?",
    answer: "Agape (ἀγάπη)",
    wrongAnswers: ["Phileo (φιλέω)", "Eros (ἔρως)", "Storge (στοργή)"],
    scripture: "John 3:16",
    scriptureText: "For God so loved (agapao) the world that he gave his only begotten Son.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "17",
    category: "Church",
    question: "What Greek word for 'assembly' became our word 'church'?",
    answer: "Ekklesia (ἐκκλησία)",
    wrongAnswers: ["Synagoge (συναγωγή)", "Oikos (οἶκος)", "Kuriakon (κυριακόν)"],
    scripture: "Matthew 16:18",
    scriptureText: "Upon this rock I will build my church (ekklesia).",
    difficulty: "easy",
    points: 10
  },
  {
    id: "18",
    category: "Armor of God",
    question: "According to Ephesians 6, what piece of armor represents truth?",
    answer: "Belt",
    wrongAnswers: ["Breastplate", "Shield", "Helmet"],
    scripture: "Ephesians 6:14",
    scriptureText: "Stand therefore, having girded your waist with truth.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "19",
    category: "Fruit of Spirit",
    question: "How many fruits of the Spirit are listed in Galatians 5:22-23?",
    answer: "Nine",
    wrongAnswers: ["Seven", "Twelve", "Five"],
    scripture: "Galatians 5:22-23",
    scriptureText: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "20",
    category: "Discernment",
    question: "According to 1 John 4:1, what should believers test?",
    answer: "Every spirit",
    wrongAnswers: ["Every prophet only", "Only false teachers", "Their own hearts"],
    scripture: "1 John 4:1",
    scriptureText: "Beloved, do not believe every spirit, but test the spirits to see whether they are from God.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "21",
    category: "Great Commission",
    question: "What are the four commands in the Great Commission (Matthew 28:19-20)?",
    answer: "Go, make disciples, baptize, teach",
    wrongAnswers: ["Pray, fast, give, worship", "Love, serve, heal, preach", "Believe, repent, confess, follow"],
    scripture: "Matthew 28:19-20",
    scriptureText: "Go therefore and make disciples of all nations, baptizing them... teaching them to observe all that I commanded.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "22",
    category: "Beatitudes",
    question: "According to the Beatitudes, who will inherit the earth?",
    answer: "The meek",
    wrongAnswers: ["The poor in spirit", "The pure in heart", "The peacemakers"],
    scripture: "Matthew 5:5",
    scriptureText: "Blessed are the meek, for they shall inherit the earth.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "23",
    category: "Spiritual Gifts",
    question: "Which chapter is known as the 'Love Chapter' that discusses spiritual gifts in context?",
    answer: "1 Corinthians 13",
    wrongAnswers: ["Romans 12", "Ephesians 4", "1 Peter 4"],
    scripture: "1 Corinthians 13:1",
    scriptureText: "If I speak in the tongues of men and of angels, but have not love, I am a noisy gong.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "24",
    category: "Faith Definition",
    question: "How does Hebrews 11:1 define faith?",
    answer: "The substance of things hoped for, the evidence of things not seen",
    wrongAnswers: ["Believing without any doubt", "Following religious traditions", "Trusting in yourself"],
    scripture: "Hebrews 11:1",
    scriptureText: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "25",
    category: "Trinity",
    question: "At Jesus's baptism, which members of the Trinity were present?",
    answer: "All three: Father (voice), Son (Jesus), Holy Spirit (dove)",
    wrongAnswers: ["Only Jesus and the Holy Spirit", "Only Jesus", "Only the Father and Son"],
    scripture: "Matthew 3:16-17",
    scriptureText: "The Spirit of God descending like a dove... a voice from heaven said, 'This is my beloved Son.'",
    difficulty: "medium",
    points: 20
  },
  {
    id: "26",
    category: "Wisdom",
    question: "According to Proverbs, what is the beginning of wisdom?",
    answer: "The fear of the Lord",
    wrongAnswers: ["Knowledge of facts", "Academic education", "Life experience"],
    scripture: "Proverbs 9:10",
    scriptureText: "The fear of the LORD is the beginning of wisdom.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "27",
    category: "Joseph",
    question: "Which OT figure was sold into slavery but rose to power in Egypt, saying 'You meant evil against me, but God meant it for good'?",
    answer: "Joseph",
    wrongAnswers: ["Moses", "Jacob", "Benjamin"],
    scripture: "Genesis 50:20",
    scriptureText: "You meant evil against me, but God meant it for good.",
    difficulty: "easy",
    points: 10
  },
  {
    id: "28",
    category: "Nehemiah",
    question: "Who rebuilt the walls of Jerusalem despite opposition, organizing workers with tools in one hand and weapons in the other?",
    answer: "Nehemiah",
    wrongAnswers: ["Ezra", "Zerubbabel", "Joshua"],
    scripture: "Nehemiah 4:17",
    scriptureText: "Each of the builders had his sword strapped at his side while he built.",
    difficulty: "medium",
    points: 20
  },
  {
    id: "29",
    category: "Esther",
    question: "Who said 'For such a time as this' when deciding to risk her life for her people?",
    answer: "Esther",
    wrongAnswers: ["Ruth", "Deborah", "Hannah"],
    scripture: "Esther 4:14",
    scriptureText: "Who knows whether you have not come to the kingdom for such a time as this?",
    difficulty: "easy",
    points: 10
  },
  {
    id: "30",
    category: "Baptism",
    question: "What Greek word for 'baptize' literally means to immerse or dip?",
    answer: "Baptizo (βαπτίζω)",
    wrongAnswers: ["Rantizo (ῥαντίζω)", "Louo (λούω)", "Katharizo (καθαρίζω)"],
    scripture: "Matthew 3:16",
    scriptureText: "And when Jesus was baptized, immediately he went up from the water.",
    difficulty: "hard",
    points: 30
  },
  {
    id: "31",
    category: "Sanctification",
    question: "What Greek word meaning 'set apart' or 'made holy' describes the process of becoming more like Christ?",
    answer: "Hagiasmos (ἁγιασμός)",
    wrongAnswers: ["Soteria (σωτηρία)", "Dikaiosis (δικαίωσις)", "Metamorphosis (μεταμόρφωσις)"],
    scripture: "1 Thessalonians 4:3",
    scriptureText: "For this is the will of God, your sanctification.",
    difficulty: "hard",
    points: 30
  },
  {
    id: "32",
    category: "Stewardship",
    question: "What Greek word for 'steward' or 'manager' describes our role over God's resources?",
    answer: "Oikonomos (οἰκονόμος)",
    wrongAnswers: ["Doulos (δοῦλος)", "Diakonos (διάκονος)", "Episkopos (ἐπίσκοπος)"],
    scripture: "1 Peter 4:10",
    scriptureText: "As each has received a gift, use it to serve one another, as good stewards.",
    difficulty: "hard",
    points: 30
  }
];

export const ScriptureFlashcards = () => {
  const [gameMode, setGameMode] = useState<GameMode>("flashcard");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<Set<string>>(new Set());
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([...flashcards]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentCard = shuffledCards[currentIndex];
  const progress = (cardsStudied.size / flashcards.length) * 100;
  const masteryProgress = (masteredCards.size / flashcards.length) * 100;

  // Generate shuffled multiple choice options
  const multipleChoiceOptions = useMemo(() => {
    if (!currentCard) return [];
    const allOptions = [currentCard.answer, ...currentCard.wrongAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  }, [currentCard?.id]);

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
    toast.success("Cards shuffled!");
  };

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
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

  const handleMultipleChoiceSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (!cardsStudied.has(currentCard.id)) {
      setCardsStudied(new Set([...cardsStudied, currentCard.id]));
    }

    if (answer === currentCard.answer) {
      setScore(prev => prev + currentCard.points);
      setStreak(prev => prev + 1);
      setMasteredCards(new Set([...masteredCards, currentCard.id]));
      toast.success(`Correct! +${currentCard.points} points! 🎉`);
    } else {
      setStreak(0);
      toast.error("Incorrect. Keep studying!");
    }
  };

  const resetProgress = () => {
    setScore(0);
    setStreak(0);
    setCardsStudied(new Set());
    setMasteredCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setShowResult(false);
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

  const getAnswerButtonClass = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? "border-primary bg-primary/10" 
        : "border-border hover:border-primary/50 hover:bg-muted/50";
    }
    if (option === currentCard.answer) {
      return "border-green-500 bg-green-500/20 text-green-700";
    }
    if (option === selectedAnswer && option !== currentCard.answer) {
      return "border-red-500 bg-red-500/20 text-red-700";
    }
    return "border-border opacity-50";
  };

  return (
    <div className="bg-gradient-to-br from-sacred/5 to-background p-4 space-y-4">
      {/* Game Mode Toggle */}
      <Tabs value={gameMode} onValueChange={(v) => setGameMode(v as GameMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flashcard" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="multiple-choice" className="flex items-center gap-2">
            <CircleDot className="w-4 h-4" />
            Multiple Choice
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
        <Badge variant="outline" className="text-xs">
          {flashcards.length} cards
        </Badge>
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

      {gameMode === "flashcard" ? (
        /* Flashcard Mode */
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
      ) : (
        /* Multiple Choice Mode */
        <div className="space-y-4">
          <div className="rounded-xl p-6 bg-gradient-to-br from-card to-muted/50 border-2 border-sacred/20">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs">
                {currentCard.category}
              </Badge>
              <Badge className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty} • {currentCard.points}pts
              </Badge>
            </div>
            
            <p className="text-lg font-medium text-center mb-6">
              {currentCard.question}
            </p>

            {/* Multiple Choice Options */}
            <div className="grid gap-3">
              {multipleChoiceOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoiceSelect(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getAnswerButtonClass(option)}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm">{option}</span>
                    {showResult && option === currentCard.answer && (
                      <Check className="w-4 h-4 text-green-600 ml-auto" />
                    )}
                    {showResult && option === selectedAnswer && option !== currentCard.answer && (
                      <X className="w-4 h-4 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Show Scripture after answering */}
            {showResult && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm font-semibold mb-1">{currentCard.scripture}</p>
                <p className="text-sm text-muted-foreground italic">
                  "{currentCard.scriptureText}"
                </p>
              </div>
            )}
          </div>

          {showResult && (
            <Button onClick={handleNext} className="w-full">
              Next Question
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
      
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
