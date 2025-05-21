"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Send, Paperclip, Smile, MoreHorizontal, Phone, Video, Info, RefreshCw, Trash2, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '@/lib/useChat';
import { useChatContext } from '@/context/ChatContext';

import type { Message as ChatMessage } from '@/lib/useChat';

type SenderType = 'user' | 'assistant' | 'system';

interface Suggestion {
  question: string;
  answer: string;
}

interface UIMessage extends Omit<ChatMessage, 'timestamp'> {
  timestamp: string;
  time?: string;
}

interface Conversation {
  id: number;
  user: string;
  messages: UIMessage[];
}

type ConversationMap = {
  [key: number]: Conversation;
};

// Sample conversation data with static timestamps
const SAMPLE_CONVERSATIONS: ConversationMap = {
  1: {
    id: 1,
    user: 'Emily Davis',
    messages: [
      {
        id: 1,
        sender: 'user' as const,
        content: 'Hello, I need help with my order',
        timestamp: '2025-05-19T10:30:00Z',
      },
      {
        id: 2,
        sender: 'assistant' as const,
        content: 'Hello! I\'d be happy to help with your order. Could you please provide your order number?',
        timestamp: '2025-05-19T10:31:00Z',
      },
    ],
  },
  2: {
    id: 2,
    user: 'David Wilson',
    messages: [
      {
        id: 1,
        sender: 'user' as const,
        content: 'How do I reset my password?',
        timestamp: '2025-05-19T11:15:00Z',
      },
      {
        id: 2,
        sender: 'assistant' as const,
        content: 'You can reset your password by clicking on "Forgot Password" on the login page.',
        timestamp: '2025-05-19T11:16:00Z',
      },
    ],
  },
  3: {
    id: 3,
    user: 'Jennifer Lee',
    messages: [
      {
        id: 1,
        sender: 'user' as const,
        content: 'Do you offer international shipping?',
        timestamp: '2025-05-19T12:30:00Z',
      }
    ],
  },
  4: {
    id: 4,
    user: 'Robert Taylor',
    messages: [
      {
        id: 1,
        sender: 'user' as const,
        content: 'I need to return an item',
        timestamp: '2025-05-19T13:45:00Z',
      }
    ],
  },
  5: {
    id: 5,
    user: 'Maria Garcia',
    messages: [
      {
        id: 1,
        sender: 'user' as const,
        content: 'What are your business hours?',
        timestamp: '2025-05-19T14:20:00Z',
      }
    ],
  },
};

const allSuggestions: Suggestion[] = [
  {
    question: 'What are your business hours?',
    answer: 'Our business hours are Monday to Friday, 9 AM to 5 PM EST.'
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order using the tracking number sent to your email.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all products.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can contact our support team via email at support@example.com or call us at (555) 123-4567.'
  },
];

export default function ChatWindow() {
  const [inputMessage, setInputMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [statusOptions, setStatusOptions] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('active');
  const [isCalling, setIsCalling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { selectedConversation } = useChatContext();
  
  // Memoize the current conversation and reset suggestions when it changes
  const currentConversation = useMemo(() => {
    if (!selectedConversation) return { messages: [], user: 'Unknown User' } as Partial<Conversation>;
    
    // First, try to find a matching conversation in sample data based on the user name
    const matchingConversationId = Object.keys(SAMPLE_CONVERSATIONS).find(id => 
      SAMPLE_CONVERSATIONS[Number(id)].user === selectedConversation.user
    );
    
    // If we found a matching conversation in sample data, use it
    if (matchingConversationId) {
      const conversation = SAMPLE_CONVERSATIONS[Number(matchingConversationId)];
      // Show suggestions when switching to a conversation with messages
      if (conversation.messages && conversation.messages.length > 0) {
        setShowSuggestions(true);
      }
      return conversation;
    }
    
    // If no matching conversation found, create a new one with the selected user's info
    setShowSuggestions(true);
    
    return { 
      id: Date.now(), // Generate a unique ID
      user: selectedConversation.user, // Always use the selected conversation's user name
      messages: [] 
    };
  }, [selectedConversation]);

  // Format messages for the chat hook
  const initialMessages = useMemo<ChatMessage[]>(() => {
    return (currentConversation.messages || []).map((msg: UIMessage) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  }, [currentConversation.messages]);

  const { messages, isLoading, error, sendMessage, setMessages, clearMessages } = useChat(currentConversation.messages || []);
  
  // Get random suggestions (3 at a time)
  const getRandomSuggestions = useCallback((): Suggestion[] => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);
  
  const [currentSuggestions, setCurrentSuggestions] = useState<Suggestion[]>(getRandomSuggestions());
  
  // Update suggestions when conversation changes or after sending a message
  useEffect(() => {
    // Always show suggestions when conversation changes
    if (selectedConversation) {
      setShowSuggestions(true);
      setCurrentSuggestions(getRandomSuggestions());
    }
  }, [selectedConversation, messages, getRandomSuggestions]);

  // Status options
  const statusList = [
    { id: 'active', label: 'Active', color: 'bg-green-500' },
    { id: 'away', label: 'Away', color: 'bg-yellow-500' },
    { id: 'offline', label: 'Offline', color: 'bg-gray-500' },
  ];

  // Handle sending a message
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;
    
    // Don't add the message here - it will be added by the useChat hook
    // This prevents duplicate messages
    setInputMessage('');
    
    try {
      await sendMessage(inputMessage);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, [inputMessage, sendMessage]);
  
  // Handle clearing all messages
  const handleClearMessages = useCallback(() => {
    clearMessages();
    // Show a system message after clearing
    setTimeout(() => {
      setMessages([{
        id: Date.now(),
        sender: 'system',
        content: 'Conversation has been cleared. How can I help you today?',
        timestamp: new Date()
      }]);
    }, 100);
  }, [clearMessages, setMessages]);

  // Handle key press for sending message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle voice call
  const handleCall = () => {
    setIsCalling(true);
    console.log('Initiating voice call to', currentConversation.user);
    // Simulate call ending after 3 seconds
    setTimeout(() => {
      setIsCalling(false);
    }, 3000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {currentConversation.user?.[0] || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{currentConversation.user || 'Unknown User'}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {statusList.find(s => s.id === currentStatus)?.label || 'Offline'}
            </p>
          </div>
        </div>
        
        {/* Desktop Actions - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-2">
          <button 
            onClick={handleCall}
            disabled={isCalling}
            className={`p-2 rounded-full ${isCalling ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            title={isCalling ? 'End Call' : 'Voice Call'}
          >
            <Phone className={`h-5 w-5 ${isCalling ? 'animate-pulse' : ''}`} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Video Call"
          >
            <Video className="h-5 w-5" />
          </button>
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setStatusOptions(!statusOptions)}
              title="Status"
            >
              <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full ${
                  currentStatus === 'active' ? 'bg-green-500' : 
                  currentStatus === 'away' ? 'bg-yellow-500' : 
                  'bg-gray-500'
                } mr-1`}></span>
                <MoreHorizontal className="h-5 w-5" />
              </div>
            </button>
            {statusOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {statusList.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => {
                      setCurrentStatus(status.id);
                      setStatusOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <span className={`h-2 w-2 rounded-full ${status.color} mr-2`}></span>
                    {status.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Info"
          >
            <Info className="h-5 w-5" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowSuggestions(!showSuggestions)}
            title="Toggle suggestions"
          >
            <RefreshCw className={`h-5 w-5 ${showSuggestions ? 'text-blue-500' : ''}`} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500"
            onClick={handleClearMessages}
            title="Clear conversation"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile Hamburger Menu Button - Only visible on mobile */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile Menu - Only visible when open on mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-wrap items-center justify-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button 
            onClick={handleCall}
            disabled={isCalling}
            className={`p-2 rounded-full ${isCalling ? 'bg-red-100 text-red-600' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'} flex items-center space-x-2`}
          >
            <Phone className={`h-5 w-5 ${isCalling ? 'animate-pulse' : ''}`} />
            <span className="text-sm">{isCalling ? 'End Call' : 'Call'}</span>
          </button>
          <button className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span className="text-sm">Video</span>
          </button>
          <button className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span className="text-sm">Info</span>
          </button>
          <button 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className={`p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 ${showSuggestions ? 'text-blue-500' : ''}`}
          >
            <RefreshCw className="h-5 w-5" />
            <span className="text-sm">Suggestions</span>
          </button>
          <button 
            onClick={handleClearMessages}
            className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-red-500 flex items-center space-x-2"
          >
            <Trash2 className="h-5 w-5" />
            <span className="text-sm">Clear</span>
          </button>
        </div>
      )}

      {/* Main Content Container */}
      <div className="flex px-3 py-2 flex-col overflow-hidden h-[calc(100vh-180px)]">
        {/* Messages - Enable scrolling to see previous messages with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide" style={{ minHeight: '50px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-3 py-1.5 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Section (Always Visible) */}
        <div className="flex-shrink-0">
          {/* Suggestions Panel - More compact */}
          {showSuggestions && (
            <div className="p-1 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Quick Replies</p>
                <button 
                  onClick={() => setShowSuggestions(false)}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Hide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(suggestion.question);
                      setShowSuggestions(false);
                    }}
                    className="px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 bg-white  dark:bg-gray-900">
            <div className="flex items-end space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '80px', resize: 'none' }}
                />
                <button className="absolute right-2 bottom-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Smile className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2 rounded-full ${!inputMessage.trim() || isLoading ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                title="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
