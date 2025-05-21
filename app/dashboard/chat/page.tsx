'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, User } from 'lucide-react';
import ChatList from '../../../components/shared/ChatList';
import ChatWindow from '../../../components/shared/ChatWindow';
import UserInfoSidebar from '../../../components/shared/UserInfoSidebar';
import { useChatContext } from '../../../context/ChatContext';

import type { ConversationInfo } from '../../../components/shared/UserInfoSidebar';

export default function ChatPage() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  // On mobile, panels are closed by default, on desktop they're open by default
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [activeResizer, setActiveResizer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the shared context instead of local state
  const { selectedConversation } = useChatContext();

  const minPanelWidth = 240;
  const maxPanelWidth = 480;

  const toggleLeftPanel = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  const startResize = (resizer: 'left' | 'right') => {
    setIsResizing(true);
    setActiveResizer(resizer);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResize = () => {
    if (!isResizing) return;
    setIsResizing(false);
    setActiveResizer(null);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerWidth = containerRect.width;
    
    if (activeResizer === 'left' && isLeftPanelOpen) {
      const newWidth = e.clientX - containerLeft;
      if (newWidth >= minPanelWidth && newWidth <= maxPanelWidth) {
        setLeftPanelWidth(newWidth);
      }
    } else if (activeResizer === 'right' && isRightPanelOpen) {
      const newWidth = containerLeft + containerWidth - e.clientX;
      if (newWidth >= minPanelWidth && newWidth <= maxPanelWidth) {
        setRightPanelWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, activeResizer]);

  // Add an effect to override parent container's overflow setting
  useEffect(() => {
    // This ensures the chat page doesn't scroll but other dashboard pages can
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.classList.add('overflow-hidden');
      mainElement.classList.remove('overflow-y-auto');
    }
    
    // Check screen size and set panel visibility accordingly
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
      setIsLeftPanelOpen(!isMobile);
      setIsRightPanelOpen(!isMobile);
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Restore scrolling when navigating away from chat page
      if (mainElement) {
        mainElement.classList.remove('overflow-hidden');
        mainElement.classList.add('overflow-y-auto');
      }
      // Remove resize listener
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex h-[calc(100vh-100px)] w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      onMouseMove={(e) => isResizing && handleMouseMove(e as any)}
      onMouseUp={stopResize}
      onMouseLeave={stopResize}
    >
      {/* Chat List - Left Sidebar */}
      <div 
        className={`h-[calc(100vh-100px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden transition-all duration-200 ${isLeftPanelOpen ? 'block' : 'w-0'} ${isLeftPanelOpen ? 'md:block' : 'md:hidden'} fixed md:relative z-30`}
        style={isLeftPanelOpen ? { width: `${leftPanelWidth}px` } : {}}
      >
        <div className="h-full overflow-y-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Conversations</h2>
            <button 
              onClick={toggleLeftPanel}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Hide conversations"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <ChatList />
        </div>
      </div>
      
      {/* Left Panel Toggle Button (Collapsed) */}
      {!isLeftPanelOpen && (
        <div className="relative">
          <button
            onClick={toggleLeftPanel}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title="Show conversations"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute left-full ml-2 px-2 py-1 text-xs whitespace-nowrap bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Show conversations
            </span>
          </button>
        </div>
      )}
      
      {/* Mobile Overlay - Only shown when a panel is open on mobile */}
      {(isLeftPanelOpen || isRightPanelOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => {
            setIsLeftPanelOpen(false);
            setIsRightPanelOpen(false);
          }}
        />
      )}

      {/* Left Resizer */}
      {isLeftPanelOpen && (
        <div 
          className={`w-2 h-full cursor-col-resize hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${isResizing && activeResizer === 'left' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
          onMouseDown={() => startResize('left')}
        />
      )}
      
      {/* Chat Window - Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow />
      </div>

      {/* Right Resizer */}
      {isRightPanelOpen && (
        <div 
          className={`w-2 h-full cursor-col-resize hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors ${isResizing && activeResizer === 'right' ? 'bg-blue-200 dark:bg-blue-800' : ''}`}
          onMouseDown={() => startResize('right')}
        />
      )}
      
      {/* User Info - Right Sidebar */}
      <div 
        className={`h-[calc(100vh-100px)] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden transition-all duration-200 ${isRightPanelOpen ? 'block' : 'w-0'} ${isRightPanelOpen ? 'md:block' : 'md:hidden'} fixed md:relative right-0 z-30`}
        style={isRightPanelOpen ? { width: `${rightPanelWidth}px` } : {}}
      >
        <div className="h-full overflow-y-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Customer Details</h2>
            <button 
              onClick={toggleRightPanel}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Hide customer details"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <UserInfoSidebar conversation={selectedConversation} />
        </div>
      </div>
      
      {/* Right Panel Toggle Button (Collapsed) */}
      {!isRightPanelOpen && (
        <div className="relative">
          <button
            onClick={toggleRightPanel}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title="Show customer details"
          >
            <User className="w-5 h-5" />
            <span className="absolute right-full mr-2 px-2 py-1 text-xs whitespace-nowrap bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Show customer details
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
