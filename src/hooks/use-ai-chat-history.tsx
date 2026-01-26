import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatConversation {
  id: string;
  title: string | null;
  messages_json: Message[];
  created_at: string;
  updated_at: string;
}

interface UseAiChatHistoryReturn {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  isSaving: boolean;
  loadConversations: () => Promise<void>;
  loadConversation: (id: string) => Promise<void>;
  saveMessages: (messages: Message[]) => Promise<void>;
  startNewConversation: () => void;
  deleteConversation: (id: string) => Promise<void>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function useAiChatHistory(): UseAiChatHistoryReturn {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load all conversations for the user
  const loadConversations = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Type assertion since we know the structure
      const typedData = (data || []).map(conv => ({
        ...conv,
        messages_json: conv.messages_json as unknown as Message[]
      }));

      setConversations(typedData);

      // Load most recent conversation if exists and no current conversation
      if (typedData.length > 0 && !currentConversationId) {
        setCurrentConversationId(typedData[0].id);
        setMessages(typedData[0].messages_json);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, currentConversationId]);

  // Load a specific conversation
  const loadConversation = useCallback(async (id: string) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_chat_conversations')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setCurrentConversationId(data.id);
        setMessages(data.messages_json as unknown as Message[]);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Save messages to the current conversation or create a new one
  const saveMessages = useCallback(async (newMessages: Message[]) => {
    if (!user || newMessages.length === 0) return;

    setIsSaving(true);
    try {
      // Generate a title from the first user message
      const firstUserMessage = newMessages.find(m => m.role === 'user');
      const title = firstUserMessage 
        ? firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
        : 'New Conversation';

      if (currentConversationId) {
        // Update existing conversation
        const { error } = await supabase
          .from('ai_chat_conversations')
          .update({
            messages_json: JSON.parse(JSON.stringify(newMessages)),
            title,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentConversationId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new conversation
        const { data, error } = await supabase
          .from('ai_chat_conversations')
          .insert([{
            user_id: user.id,
            messages_json: JSON.parse(JSON.stringify(newMessages)),
            title,
          }])
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setCurrentConversationId(data.id);
        }
      }

      // Refresh conversations list
      await loadConversations();
    } catch (error) {
      console.error('Error saving messages:', error);
    } finally {
      setIsSaving(false);
    }
  }, [user, currentConversationId, loadConversations]);

  // Start a new conversation
  const startNewConversation = useCallback(() => {
    setCurrentConversationId(null);
    setMessages([]);
  }, []);

  // Delete a conversation
  const deleteConversation = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ai_chat_conversations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Clear current if deleting current conversation
      if (id === currentConversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }

      // Refresh conversations list
      await loadConversations();

      toast({
        title: 'Deleted',
        description: 'Conversation deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
    }
  }, [user, currentConversationId, loadConversations, toast]);

  // Load conversations on mount
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  return {
    conversations,
    currentConversationId,
    messages,
    isLoading,
    isSaving,
    loadConversations,
    loadConversation,
    saveMessages,
    startNewConversation,
    deleteConversation,
    setMessages,
  };
}
