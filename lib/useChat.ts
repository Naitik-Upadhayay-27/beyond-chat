import { useState, useCallback } from 'react';

export interface Message {
  id: number | string;  // Can be number for normal messages or string for error messages
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date | string; // Allow both Date and string for flexibility
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function useChat(initialMessages: Message[] = []): UseChatReturn {
  // Ensure the first message is from the user if there are any messages
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessages.length > 0 && initialMessages[0].sender !== 'user') {
      // If first message is not from user, add a system message
      return [
        {
          id: Date.now() - 1,
          sender: 'system',
          content: 'How can I help you today?',
          timestamp: new Date()
        },
        ...initialMessages
      ];
    }
    return initialMessages;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatMessageForApi = useCallback((msg: Message) => {
    // Skip system messages when sending to API
    if (msg.sender === 'system') return null;
    
    // Ensure we're working with a Date object
    const timestamp = typeof msg.timestamp === 'string' 
      ? new Date(msg.timestamp) 
      : msg.timestamp;
    
    return {
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{
        text: msg.content
      }],
      // Include timestamp in ISO string format for consistency
      timestamp: timestamp.toISOString()
    };
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const now = new Date();
    const userMessage: Message = {
      id: now.getTime(),
      sender: 'user',
      content,
      timestamp: now,
    };

    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages
            .filter(msg => msg.sender !== 'system')
            .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content,
              timestamp: msg.timestamp,
            })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      
      // Add assistant's response
      const assistantMessage: Message = {
        id: Date.now(),
        sender: 'assistant',
        content: data.text || "I'm sorry, I couldn't generate a response. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      // Add a fallback response
      const fallbackMessage: Message = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: "I'm having trouble connecting to the AI service. Please try again in a moment.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    setMessages, // Expose setMessages for external use
  };
}
