import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Send,
  RefreshCw,
  Loader2,
  User,
  Bot
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const practiceScenarios = [
  { 
    value: "parent-concerned", 
    label: "Concerned Parent",
    systemPrompt: "You are playing the role of a loving but concerned Christian parent who has just learned that your adult child is a member of a Black Greek Letter Organization (BGLO). You've seen videos online calling these organizations 'demonic' and 'satanic'. You're worried about your child's salvation but also want to maintain your relationship. Start the conversation expressing concern but be willing to listen. Ask questions, push back on their responses (respectfully), and eventually be open to understanding their perspective if they communicate well. Keep responses to 2-3 sentences."
  },
  { 
    value: "pastor-questioning", 
    label: "Pastor Questioning Ministry Role",
    systemPrompt: "You are playing the role of a traditional Black church pastor who has discovered that a church member active in ministry is also a member of a BGLO. You've been taught that BGLOs conflict with Christianity. You're considering whether they should continue in their ministry role. Ask probing questions about their involvement, express your concerns about 'serving two masters', but be open to biblical reasoning. Keep responses to 2-3 sentences."
  },
  { 
    value: "friend-videos", 
    label: "Friend Sending Videos",
    systemPrompt: "You are playing the role of a well-meaning Christian friend who keeps sending your friend videos and articles about BGLOs being 'demonic'. You genuinely believe you're trying to save them. Be persistent in your concerns, quote scriptures (sometimes out of context), and push back when they defend their membership. Eventually be willing to agree to disagree if they handle the conversation well. Keep responses to 2-3 sentences."
  },
  { 
    value: "social-media", 
    label: "Social Media Commenter",
    systemPrompt: "You are playing the role of someone who tagged a BGLO member in a post denouncing Greek life as un-Christian. You're publicly challenging them and asking pointed questions. Be confrontational but not abusive. Ask questions like 'How can you call yourself a Christian?' and 'What about the secret rituals?' Push them to defend their position publicly. Keep responses to 2-3 sentences."
  }
];

export function ConversationPractice() {
  const { toast } = useToast();
  const [scenario, setScenario] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    clearTranscript 
  } = useVoiceToText({
    onTranscript: (text) => {
      setInputText(prev => prev + " " + text);
    },
    continuous: true
  });

  const { speak, stop: stopSpeaking, isPlaying, isLoading: isSpeaking } = useTextToSpeech();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getSelectedScenario = () => practiceScenarios.find(s => s.value === scenario);

  const startConversation = async () => {
    if (!scenario) {
      toast({
        title: "Select a scenario",
        description: "Please choose a practice scenario to begin.",
        variant: "destructive"
      });
      return;
    }

    setStarted(true);
    setMessages([]);
    setLoading(true);

    try {
      const selectedScenario = getSelectedScenario();
      const { data, error } = await supabase.functions.invoke('ai-assistant-chat', {
        body: {
          messages: [
            { role: "system", content: selectedScenario?.systemPrompt },
            { role: "user", content: "Start the conversation by expressing your initial concern or question to me." }
          ]
        }
      });

      if (error) throw error;

      const aiResponse = data?.response || "I need to talk to you about something...";
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages([newMessage]);
      
      if (autoSpeak) {
        speak(aiResponse, newMessage.id, undefined, "Practice Partner");
      }
    } catch (error: any) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start the conversation. Please try again.",
        variant: "destructive"
      });
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    clearTranscript();
    setLoading(true);

    try {
      const selectedScenario = getSelectedScenario();
      const conversationHistory = messages.map(m => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-assistant-chat', {
        body: {
          messages: [
            { role: "system", content: selectedScenario?.systemPrompt },
            ...conversationHistory,
            { role: "user", content: userMessage.content }
          ]
        }
      });

      if (error) throw error;

      const aiResponse = data?.response || "I understand what you're saying...";
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (autoSpeak) {
        speak(aiResponse, aiMessage.id, undefined, "Practice Partner");
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setStarted(false);
    setMessages([]);
    setInputText("");
    stopSpeaking();
    if (isListening) stopListening();
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-sacred" />
          Conversation Practice Mode
        </CardTitle>
        <CardDescription>
          Practice difficult conversations with an AI playing different roles. Use voice or text input.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!started ? (
          <>
            {/* Scenario Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose a practice scenario</label>
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger>
                  <SelectValue placeholder="Select who you want to practice with..." />
                </SelectTrigger>
                <SelectContent>
                  {practiceScenarios.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {scenario && (
                <p className="text-xs text-muted-foreground mt-2">
                  {scenario === "parent-concerned" && "Practice responding to a parent who has seen anti-BGLO content online and is worried about your faith."}
                  {scenario === "pastor-questioning" && "Practice discussing your membership with a pastor who is considering your role in ministry."}
                  {scenario === "friend-videos" && "Practice responding to a friend who keeps sending you videos claiming BGLOs are demonic."}
                  {scenario === "social-media" && "Practice responding to public confrontation about your membership."}
                </p>
              )}
            </div>

            {/* Audio Settings */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Auto-speak AI responses</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoSpeak(!autoSpeak)}
              >
                {autoSpeak ? (
                  <Volume2 className="w-4 h-4 text-sacred" />
                ) : (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Start Button */}
            <Button 
              onClick={startConversation}
              disabled={!scenario || loading}
              className="w-full bg-sacred hover:bg-sacred/90"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                "Start Practice Conversation"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              The AI will play the selected role and respond based on how well you communicate
            </p>
          </>
        ) : (
          <>
            {/* Conversation Header */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sacred border-sacred">
                Practicing: {getSelectedScenario()?.label}
              </Badge>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAutoSpeak(!autoSpeak)}
                >
                  {autoSpeak ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetConversation}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-sacred/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-sacred" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-sacred text-sacred-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-sacred/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-sacred" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? "Listening... speak now" : "Type your response or use voice input..."}
                  className={`flex-1 min-h-[80px] ${isListening ? "border-sacred" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVoiceInput}
                    className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-4 h-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-1" />
                        Voice
                      </>
                    )}
                  </Button>
                  {isPlaying && (
                    <Button variant="outline" size="sm" onClick={stopSpeaking}>
                      <VolumeX className="w-4 h-4 mr-1" />
                      Stop Audio
                    </Button>
                  )}
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || loading}
                  className="bg-sacred hover:bg-sacred/90"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
