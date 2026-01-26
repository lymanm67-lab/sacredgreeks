import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Sparkles, User, Loader2, X, MessageCircle, ChevronDown, ChevronUp, Mic, MicOff, History, Plus, Trash2, Save, Cloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { useVoiceInput } from '@/hooks/use-voice-input';
import { useAiChatHistory } from '@/hooks/use-ai-chat-history';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I respond to someone saying Greek life is un-Christian?",
  "What does the PROOF framework teach about rituals?",
  "How can I explain my Greek membership to my pastor?",
  "Are Greek letter organizations secret societies?",
];

export const DashboardAIAssistant = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Chat history hook
  const {
    conversations,
    currentConversationId,
    messages,
    isSaving,
    loadConversation,
    saveMessages,
    startNewConversation,
    deleteConversation,
    setMessages,
  } = useAiChatHistory();

  // Voice input hook
  const {
    isListening,
    isSupported: voiceSupported,
    transcript,
    toggleListening,
    clearTranscript,
  } = useVoiceInput({
    onResult: (result) => {
      setInput(prev => prev + result);
      clearTranscript();
    },
    onError: (error) => {
      toast({
        title: "Voice Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Update input with transcript
  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + transcript);
    }
  }, [transcript]);

  const streamChat = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Please try again in a moment.",
            variant: "destructive",
          });
          setMessages(prev => prev.slice(0, -1));
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Service Unavailable",
            description: "AI service is temporarily unavailable.",
            variant: "destructive",
          });
          setMessages(prev => prev.slice(0, -1));
          return;
        }
        throw new Error('Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let textBuffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage,
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save conversation after completion (for logged in users)
      if (user) {
        const finalMessages: Message[] = [...newMessages, { role: 'assistant', content: assistantMessage }];
        await saveMessages(finalMessages);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    setIsExpanded(true);
    streamChat(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    setIsExpanded(true);
    streamChat(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    startNewConversation();
    setIsExpanded(false);
  };

  const handleLoadConversation = async (id: string) => {
    await loadConversation(id);
    setIsExpanded(true);
    setShowHistory(false);
  };

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      {/* Animated background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                AI Assistant
                <Sparkles className="w-4 h-4 text-primary" />
              </CardTitle>
              <p className="text-sm text-muted-foreground">Ask about Greek life & faith</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Save indicator */}
            {user && isSaving && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
                <Cloud className="w-3 h-3 animate-pulse" />
                <span>Saving...</span>
              </div>
            )}

            {/* History dropdown */}
            {user && conversations.length > 0 && (
              <DropdownMenu open={showHistory} onOpenChange={setShowHistory}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <History className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="px-2 py-1.5 text-sm font-semibold">Chat History</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleNewChat}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Conversation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="max-h-48 overflow-y-auto">
                    {conversations.map((conv) => (
                      <DropdownMenuItem
                        key={conv.id}
                        className={cn(
                          "flex items-center justify-between group",
                          conv.id === currentConversationId && "bg-accent"
                        )}
                        onClick={() => handleLoadConversation(conv.id)}
                      >
                        <span className="truncate flex-1 text-sm">
                          {conv.title || 'Untitled'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-muted-foreground"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-4">
        {/* Suggested Questions - Show when no messages */}
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors text-left"
                    disabled={isLoading}
                  >
                    {question.length > 45 ? question.slice(0, 45) + '...' : question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <AnimatePresence>
          {messages.length > 0 && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ScrollArea ref={scrollAreaRef} className="h-64 rounded-lg border bg-background/50 p-3">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                          </div>
                        ) : (
                          msg.content
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Message Preview */}
        {messages.length > 0 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{messages.length} messages • Click to expand</span>
            </div>
          </button>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Ask about Greek life, rituals, or faith..."}
              disabled={isLoading}
              className={cn(
                "flex-1 bg-background pr-10",
                isListening && "border-red-500 ring-1 ring-red-500"
              )}
            />
            {/* Voice input button inside input */}
            {voiceSupported && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleListening}
                disabled={isLoading}
                className={cn(
                  "absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0",
                  isListening && "text-red-500 bg-red-500/10"
                )}
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <MicOff className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Voice listening indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center justify-center gap-2 py-1"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-3 bg-red-500 rounded-full"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
              <span className="text-xs text-red-500 font-medium">Listening... Tap mic to stop</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear Chat */}
        {messages.length > 0 && (
          <div className="flex justify-between items-center">
            {user && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Save className="w-3 h-3" />
                Auto-saved
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              className="text-xs text-muted-foreground hover:text-foreground ml-auto"
            >
              <X className="w-3 h-3 mr-1" />
              New chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
