import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  BookOpen, Mic, Loader2, List, ChevronDown, ChevronUp 
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  duration?: string;
}

const bookChapters: Chapter[] = [
  {
    id: "preface",
    title: "Preface: Reclaiming the Narrative",
    content: `The phrase "Reclaiming the Narrative" captures the heart of this work: to offer a balanced, biblically informed perspective on the cultural significance of Black Greek Letter Organizations while challenging the assumptions that often fuel denouncement rhetoric. Too often, cultural expressions and historical legacies are misinterpreted through a narrow theological lens, without adequate consideration of their social context or redemptive possibilities.

The Divine Nine organizations were created during a time when Black people were denied access to societal advancement and affirmation. They filled a vital void by offering community, scholarship, service, and leadership cultivation. Reclaiming this narrative means acknowledging that these groups have helped shape generations of Black excellence, and that their rituals and codes should be interpreted through the same discerning lens we apply to other sacred traditions.`,
    duration: "3:45"
  },
  {
    id: "introduction",
    title: "Introduction",
    content: `In recent years, a growing number of Christians have publicly renounced their affiliation with Black Greek Letter Organizations, often citing personal convictions shaped by prayer, Scripture, and discipleship. Their testimonies deserve thoughtful consideration, yet they have mainly emerged in a vacuum, one marked by the striking and persistent silence of the clergy.

This silence raises necessary questions: Are pastors hesitant to address the issue for fear of alienating congregants? Do they lack the theological or historical grounding to speak to it responsibly? Is the matter simply not worthy of pulpit discourse in light of seemingly larger ecclesial priorities?

As both a student of theological research and an ordained elder, and as a proud member of a historically Black fraternity, I write from within this tension. I do not seek to indict or defend, but to examine. This book is not a polemic, but an invitation.`,
    duration: "4:20"
  },
  {
    id: "chapter1",
    title: "Chapter 1: Reclaiming Biblical Clarity",
    content: `Before we can evaluate the spiritual implications of our affiliations, we must first understand the language that undergirds them. To engage responsibly, we begin with clarity. What do terms like "divine," "oath," "ritual," and "sacrifice" actually mean in both biblical and cultural usage?

The term "divine" refers to anything about a deity, God, or a supernatural being. In Christian theology, it is most often reserved for attributes or actions that are uniquely God's. However, in broader cultural use, particularly in African American religious and social traditions, divine can signify excellence, transcendence, or elevated status without implying literal godhood.

In the context of the Divine Nine, the term "divine" is used metaphorically to denote the exceptional contributions and impact of BGLOs, rather than suggesting they possess divinity themselves.`,
    duration: "5:15"
  },
  {
    id: "chapter2",
    title: "Chapter 2: Comparison to Modern Fraternities",
    content: `Did Jesus promote secrecy? This is a question that often surfaces in discussions about Greek Letter Organizations. Critics argue that secrecy is inherently unchristian, yet Scripture reveals a more nuanced picture.

Jesus often instructed those He healed to "tell no one" about their miracles. He taught His disciples privately and explained parables only to the inner circle. The Transfiguration was witnessed by only three disciples who were commanded to keep it secret until after the Resurrection.

These examples demonstrate that strategic confidentiality served divine purposes, not deception. Similarly, the secrecy within BGLOs is not designed to hide evil but to preserve sacred cultural knowledge and create meaningful rites of passage.`,
    duration: "4:50"
  },
  {
    id: "chapter3",
    title: "Chapter 3: Freemasonry & D9 Legacy",
    content: `The relationship between Freemasonry and Black Greek Letter Organizations is often cited by critics. While there are historical connections, particularly in organizational structure and symbolism, it's important to examine these connections fairly.

Prince Hall Freemasonry, established in 1775, was the first Black fraternal organization in America. Many founders of the Divine Nine were Prince Hall Masons, and this influenced early BGLO structures. However, influence does not equal identity. The missions, purposes, and practices of BGLOs are distinct from Masonic lodges.

The hypocrisy of selective condemnation must be addressed: many who condemn Greek letters carry cash bearing Masonic symbols without concern. Consistency in critique matters.`,
    duration: "5:30"
  },
  {
    id: "chapter4",
    title: "Chapter 4: Institutions of Resistance",
    content: `Black Greek Letter Organizations emerged as institutions of resistance and resilience during a time of systemic oppression. Their symbols, which some view with suspicion, were often chosen to represent strength, wisdom, and cultural pride.

The Biblical position on symbols and imagery is nuanced. The serpent appears both as a symbol of evil and as the bronze serpent Moses lifted for healing. Context determines meaning. Similarly, Greek symbols used by BGLOs carry meaning determined by their users and context, not by ancient pagan associations.

Modern rites of passage serve important developmental functions. Anthropologists recognize that structured transitions from one life stage to another provide psychological and social benefits that random growth cannot.`,
    duration: "6:00"
  },
  {
    id: "chapter5",
    title: "Chapter 5: Renounce or Redeem?",
    content: `The rise of the Anti-BGLO movement has created division within the Black church community. While respecting individual convictions, we must ask: What fruit has this movement produced? Has it led to greater unity or greater division?

The pledge process has evolved significantly. What once included harmful hazing practices has been reformed across most organizations. Intake processes now emphasize education, service, and character development. We must evaluate organizations based on their current practices, not historical abuses.

Rather than wholesale renunciation, redemption offers a more biblical path. Daniel served in Babylon's government without compromising his faith. Esther became queen of Persia while remaining faithful to God. Christians can transform institutions from within.`,
    duration: "5:45"
  },
  {
    id: "chapter6",
    title: "Chapter 6: Theology, Tradition, & Culture",
    content: `Wedding ceremonies contain numerous elements with pagan origins: rings, veils, bridesmaids, even the wedding cake. Yet Christians celebrate weddings without concern. Disney films feature pagan mythology openly, yet Christian children watch them freely. Sports teams bear names of pagan deities without objection.

This inconsistency reveals a troubling double standard. Why are BGLOs held to stricter scrutiny than other cultural institutions? Could unconscious bias play a role?

The early church itself adopted and transformed cultural practices. Church architecture borrowed from Roman temples. Christmas incorporated winter solstice celebrations. The key question is not origin but current meaning and use.`,
    duration: "6:15"
  },
  {
    id: "chapter7",
    title: "Chapter 7: The P.R.O.O.F. Framework",
    content: `The P.R.O.O.F. Framework provides a biblical model to help believers evaluate their participation in Greek Life with wisdom and clarity.

P is for Pledge Process: When pledging centers on discipline, mentorship, and service rather than humiliation, it mirrors biblical discipleship.

R is for Rituals: Rituals hold no power apart from the belief in them. When guided by faith, they can become reminders of service and unity.

O is for Oaths: The Bible warns against careless vows, not against commitments rooted in truth and service.

O is for Obscurity: True transparency begins in character, not exposure. Walking in the light means living with integrity.

F is for Founding: God redeems culture rather than discards it. Believers can reshape legacy into ministry.`,
    duration: "5:00"
  },
  {
    id: "chapter8",
    title: "Chapter 8: Scripture Guide for Greeks",
    content: `This chapter provides a comprehensive Scripture guide organized by theme for Greek organization members seeking to live faithfully.

Section 1 addresses Christian Identity and Calling. You are called to be salt and light in every environment, including your Greek organization.

Section 2 covers Leadership and Authority. God places His people in positions of influence for kingdom purposes.

Section 3 examines Ritual, Symbols, and Participation. Not everything with historical pagan connections is currently evil; meaning is determined by current use and intention.

Section 4 focuses on Personal Holiness and Lifestyle. Your conduct within your organization should reflect Christ.

Section 5 addresses Evangelism and Witness. Your Greek affiliation provides a unique mission field.`,
    duration: "7:00"
  },
  {
    id: "chapter9",
    title: "Chapter 9: Bridging the Divide",
    content: `Omega Chapter memorial ceremonies, funeral rituals, and post-burial traditions are often cited as concerning. Yet these practices parallel similar rituals in churches, civic organizations, and military units.

How do we discern cultural practices as Christians? First, examine the current function and meaning. Second, assess alignment with Scripture. Third, consider the fruit produced. Fourth, maintain Christian conscience and conviction.

A grace-filled approach to leaving a BGLO, for those who feel convicted to do so, should honor relationships while maintaining integrity. Renunciation need not require public denunciation or hostility toward former brothers and sisters.`,
    duration: "5:30"
  },
  {
    id: "chapter10",
    title: "Chapter 10: Looking Forward",
    content: `Looking back to move forward requires honest assessment. The hypocrisy of abandoned mission fields occurs when Christians withdraw from institutions rather than transforming them.

Navigating faithfulness within BGLOs requires theological truths that cannot be ignored: God is sovereign, culture can be redeemed, and Christians are called to be light in darkness.

Guidance for leading intake ceremonies: Incorporate prayer, emphasize service over pride, and ensure new member education includes character development.

A word to pastors and church leaders: Your silence leaves members without guidance. Engage this conversation with wisdom and grace.

Final encouragement: Be watchful and bold. Your Greek letters do not define you; Christ does. But your presence within these organizations can be a powerful witness.`,
    duration: "6:30"
  }
];

export const AudiobookPlayer = () => {
  const { user } = useAuth();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (!user) {
      toast.error("Please log in to listen to the audiobook");
      return;
    }

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to listen to the audiobook");
        return;
      }

      const chapter = bookChapters[currentChapter];
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            text: chapter.content, 
            voice: "dramatic" // Use dramatic voice for audiobook
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const data = await response.json();
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setProgress(100);
        // Auto-advance to next chapter
        if (currentChapter < bookChapters.length - 1) {
          setTimeout(() => {
            setCurrentChapter(prev => prev + 1);
            setProgress(0);
          }, 2000);
        }
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audiobook error:", error);
      toast.error("Failed to play audiobook");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentChapter > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setProgress(0);
      setCurrentChapter(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < bookChapters.length - 1) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setProgress(0);
      setCurrentChapter(prev => prev + 1);
    }
  };

  const selectChapter = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentChapter(index);
    setShowChapterList(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const chapter = bookChapters[currentChapter];

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-sacred/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-sacred/20">
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
          <div className="flex-1">
            <Badge className="mb-1 bg-sacred/10 text-sacred border-sacred/20">
              <Mic className="w-3 h-3 mr-1" />
              Audiobook with Dramatic Narration
            </Badge>
            <CardTitle className="text-lg">Sacred, Not Sinful</CardTitle>
            <CardDescription>By Dr. Lyman A. Montgomery, III</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Chapter Display */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Chapter {currentChapter + 1} of {bookChapters.length}
            </span>
            <span className="text-xs text-muted-foreground">{chapter.duration}</span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">{chapter.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {chapter.content.substring(0, 200)}...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}%</span>
            <span>{chapter.duration}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentChapter === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            size="lg"
            onClick={handlePlay}
            disabled={isLoading || !user}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-sacred hover:from-amber-700 hover:to-sacred/90"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentChapter === bookChapters.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {!user && (
          <p className="text-center text-sm text-muted-foreground">
            Please log in to listen to the audiobook
          </p>
        )}

        {/* Chapter List Toggle */}
        <Button
          variant="ghost"
          className="w-full gap-2"
          onClick={() => setShowChapterList(!showChapterList)}
        >
          <List className="w-4 h-4" />
          <span>View All Chapters</span>
          {showChapterList ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {/* Chapter List */}
        {showChapterList && (
          <ScrollArea className="h-64 rounded-lg border border-border">
            <div className="p-2 space-y-1">
              {bookChapters.map((ch, index) => (
                <button
                  key={ch.id}
                  onClick={() => selectChapter(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentChapter
                      ? "bg-sacred/10 border border-sacred/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{ch.title}</span>
                    <span className="text-xs text-muted-foreground">{ch.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
