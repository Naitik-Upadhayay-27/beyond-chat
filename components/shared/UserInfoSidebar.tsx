"use client";

import React, { useState, useMemo } from 'react';
import { X, Tag, Mail, Phone, Globe, Clock, MapPin, Calendar, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ConversationInfo {
  user: string;
  email?: string;
  phone?: string;
  location?: string;
  device?: string;
  os?: string;
  timezone?: string;
  lastActive?: string;
  tags?: string[];
}

interface UserInfoSidebarProps {
  conversation: ConversationInfo | null;
}

export default function UserInfoSidebar({ conversation }: UserInfoSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [notes, setNotes] = useState<string[]>([
    'Customer reported issues with notification settings',
    'Prefers email communication over phone calls'
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  // Get user info from the selected conversation
  const userInfo = useMemo(() => {
    // Default values if no conversation is selected
    if (!conversation) {
      return {
        name: 'Guest User',
        email: 'No email provided',
        phone: 'No phone number',
        location: 'Location not available',
        browser: 'Chrome 112.0.5615.138',
        device: 'Device not specified',
        os: 'OS not specified',
        timezone: 'Timezone not set',
        firstSeen: '2023-01-15',
        lastActive: 'Unknown',
        tags: ['New User']
      };
    }

    // Return user info based on the selected conversation
    return {
      name: conversation.user,
      email: conversation.email || 'No email provided',
      phone: conversation.phone || 'No phone number',
      location: conversation.location || 'Location not available',
      browser: 'Chrome 112.0.5615.138',
      device: conversation.device || 'Device not specified',
      os: conversation.os || 'OS not specified',
      timezone: conversation.timezone || 'Timezone not set',
      firstSeen: '2023-01-15',
      lastActive: conversation.lastActive || 'Unknown',
      tags: conversation.tags || ['New User']
    };
  }, [conversation]);

  return (
    <div className={`h-full flex flex-col ${isOpen ? 'bg-white dark:bg-gray-900' : 'hidden'}`}>
      
      {/* Tabs - More compact */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'info' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'notes' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'actions' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('actions')}
        >
          Actions
        </button>
      </div>
      
      {/* Content - More compact */}
      <div className="flex-1 overflow-hidden p-5 max-h-[calc(100vh-150px)]">
        {activeTab === 'info' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* User Profile */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xl font-medium mr-4">
                {userInfo.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{userInfo.name}</h4>
                {conversation ? (
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Active now
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    Select a conversation
                  </span>
                )}
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {userInfo.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
                <button className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{userInfo.phone}</span>
                </div>
              </div>
            </div>
            
            {/* Browser & Device */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Browser & Device</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{userInfo.browser}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-4 w-4 mr-2 flex items-center justify-center text-gray-400">💻</div>
                  <span>{userInfo.device}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-4 w-4 mr-2 flex items-center justify-center text-gray-400">🖥️</div>
                  <span>{userInfo.os}</span>
                </div>
              </div>
            </div>
            
            {/* Time Information - More compact */}
            <div>
              <h4 className="text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">Time Information</h4>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 mr-1 text-gray-400" />
                  <span>{userInfo.timezone}</span>
                </div>
                <div className="flex items-center text-xs">
                  <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center text-xs">
                  <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                  <span>First seen: {userInfo.firstSeen}</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="h-3 w-3 mr-1 flex items-center justify-center text-gray-400">⏱️</div>
                  <span>Last active: {userInfo.lastActive}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'notes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar"
          >
            {/* Add Note */}
            <div>
              {conversation ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder={`Add a note about ${userInfo.name}...`}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className={`p-2 rounded-lg ${newNote.trim() ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30' : 'text-gray-400'}`}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">
                  Select a conversation to add notes
                </div>
              )}
            </div>
            
            {/* Notes List */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Previous Notes</h4>
              {notes.length > 0 ? (
                notes.map((note, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-sm">{note}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Added by John Doe • {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No notes yet</p>
              )}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'actions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm font-medium">Assign to team member</span>
                <Plus className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm font-medium">Send follow-up email</span>
                <Mail className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm font-medium">Schedule a call</span>
                <Phone className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm font-medium">Mark as resolved</span>
                <div className="h-4 w-4 flex items-center justify-center">✓</div>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400">
                <span className="text-sm font-medium">Ban customer</span>
                <div className="h-4 w-4 flex items-center justify-center">⚠️</div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
