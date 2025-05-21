"use client";

import React, { useState, useCallback } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import DraggableConversation from './DraggableConversation';
import { useChatContext } from '@/context/ChatContext';
import { ConversationInfo } from './UserInfoSidebar';

interface Conversation extends ConversationInfo {
  id: number;
  avatar: string;
  lastMessage: string;
  time: string;
  status: string;
  unread: boolean;
}

export default function ChatList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [draggedOverItemIndex, setDraggedOverItemIndex] = useState<number | null>(null);
  
  const filterOptions = ['All', 'Unassigned', 'Assigned to me', 'Resolved', 'Waiting'];

  const { selectedConversation, setSelectedConversation } = useChatContext();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'I need help with my account settings',
      time: '5m ago',
      status: 'active',
      unread: true,
    },
    {
      id: 2,
      user: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'How do I upgrade my plan?',
      time: '15m ago',
      status: 'active',
      unread: true,
    },
    {
      id: 3,
      user: 'Emily Davis',
      avatar: 'ED',
      lastMessage: 'The dashboard isn\'t loading correctly',
      time: '1h ago',
      status: 'resolved',
      unread: false,
    },
    {
      id: 4,
      user: 'David Wilson',
      avatar: 'DW',
      lastMessage: 'Can you help me with integration?',
      time: '2h ago',
      status: 'waiting',
      unread: false,
    },
    {
      id: 5,
      user: 'Jennifer Taylor',
      avatar: 'JT',
      lastMessage: 'Thanks for your help!',
      time: '3h ago',
      status: 'resolved',
      unread: false,
    },
    {
      id: 6,
      user: 'Robert Miller',
      avatar: 'RM',
      lastMessage: 'I\'m having trouble with the API',
      time: '5h ago',
      status: 'active',
      unread: false,
    },
    {
      id: 7,
      user: 'Jessica Anderson',
      avatar: 'JA',
      lastMessage: 'When will the new features be available?',
      time: '1d ago',
      status: 'waiting',
      unread: false,
    },
  ]);

  // Handle conversation selection
  const handleSelectConversation = useCallback((id: number) => {
    // Find the conversation by id and set it as selected
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      // Create a proper ConversationInfo object with all necessary details
      const conversationInfo: ConversationInfo = {
        user: conversation.user,
        email: `${conversation.user.toLowerCase().replace(' ', '.')}@example.com`,
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        device: 'MacBook Pro',
        os: 'macOS 12.3',
        timezone: 'America/New_York',
        lastActive: conversation.time,
        tags: [conversation.status === 'active' ? 'Active User' : 'Inactive User']
      };
      
      // Set the selected conversation with all details in the context
      setSelectedConversation(conversationInfo);
      
      // Force a re-render by updating the state
      const updatedConversations = [...conversations];
      setConversations(updatedConversations);
      
      console.log('Selected conversation:', conversation.user);
    }
  }, [conversations, setSelectedConversation]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    // Add a slight delay for visual feedback
    setTimeout(() => {
      e.currentTarget.classList.add('opacity-50');
    }, 0);
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    setDraggedOverItemIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItemIndex(null);
    setDraggedOverItemIndex(null);
  }, []);

  const handleDrop = useCallback(() => {
    if (draggedItemIndex !== null && draggedOverItemIndex !== null && draggedItemIndex !== draggedOverItemIndex) {
      const newConversations = [...conversations];
      const draggedItem = newConversations[draggedItemIndex];
      
      // Remove the item from its original position
      newConversations.splice(draggedItemIndex, 1);
      
      // Insert it at the new position
      newConversations.splice(draggedOverItemIndex, 0, draggedItem);
      
      // Update state
      setConversations(newConversations);
    }
    
    // Reset drag state
    setDraggedItemIndex(null);
    setDraggedOverItemIndex(null);
  }, [conversations, draggedItemIndex, draggedOverItemIndex]);

  const filteredConversations = conversations.filter((convo) => {
    // Filter by search query
    if (searchQuery && !convo.user.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (activeFilter !== 'All') {
      const filterMap: Record<string, string> = {
        'Unassigned': 'waiting',
        'Assigned to me': 'active',
        'Resolved': 'resolved',
        'Waiting': 'waiting'
      };
      
      if (convo.status !== filterMap[activeFilter]) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {/* Search - More compact */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-7 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filter - More compact */}
        <div className="relative mt-2">
          <button
            className="flex items-center justify-between w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <div className="flex items-center">
              <Filter className="h-3 w-3 mr-1 text-gray-400" />
              <span>{activeFilter}</span>
            </div>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </button>
          
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
            >
              {filterOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => {
                    setActiveFilter(option);
                    setFilterOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Conversation List */}
      <div 
        className="flex-1 overflow-y-auto no-scrollbar"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation, index) => (
            <DraggableConversation
              key={conversation.id}
              id={conversation.id}
              user={conversation.user}
              avatar={conversation.avatar}
              lastMessage={conversation.lastMessage}
              time={conversation.time}
              status={conversation.status}
              unread={conversation.unread}
              index={index}
              className={`cursor-pointer transition-colors ${
                selectedConversation && selectedConversation.user === conversation.user 
                  ? 'bg-blue-100 dark:bg-blue-900/40' 
                  : conversation.unread 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => handleSelectConversation(conversation.id)}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}
