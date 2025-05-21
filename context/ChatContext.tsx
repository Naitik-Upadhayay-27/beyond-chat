"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ConversationInfo } from '@/components/shared/UserInfoSidebar';

interface ChatContextType {
  selectedConversation: ConversationInfo | null;
  setSelectedConversation: (conversation: ConversationInfo | null) => void;
  conversations: ConversationInfo[];
  setConversations: React.Dispatch<React.SetStateAction<ConversationInfo[]>>;
  selectConversationById: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedConversation, setSelectedConversation] = useState<ConversationInfo | null>(null);
  const [conversations, setConversations] = useState<ConversationInfo[]>([]);

  const selectConversationById = useCallback((id: string) => {
    const conversation = conversations.find(conv => conv.user === id);
    if (conversation) {
      setSelectedConversation(conversation);
    }
  }, [conversations]);

  return (
    <ChatContext.Provider value={{ 
      selectedConversation, 
      setSelectedConversation,
      conversations,
      setConversations,
      selectConversationById
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
