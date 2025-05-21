import React from 'react';

interface ConversationProps {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status: string;
  unread: boolean;
  index?: number;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnter?: (index: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
  onClick?: () => void;
}

export default function DraggableConversation({
  id,
  user,
  avatar,
  lastMessage,
  time,
  status,
  unread,
  index = 0,
  className = '',
  draggable = false,
  onDragStart = () => {},
  onDragEnter = () => {},
  onDragOver = () => {},
  onDragEnd = () => {},
  onClick = () => {}
}: ConversationProps) {
  return (
    <div
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => onDragStart(e, index)}
      onDragEnter={() => onDragEnter(index)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-move animate-fade-in ${className}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
          status === 'active' ? 'bg-green-100 text-green-800' : 
          status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{user}</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
          </div>
          <p className={`text-sm truncate ${unread ? 'font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
            {lastMessage}
          </p>
          <div className="flex items-center mt-1">
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              status === 'active' ? 'bg-green-100 text-green-800' : 
              status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {status}
            </span>
            {unread && (
              <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
