'use client';
import React, { useState } from 'react';

interface ChatItem {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  type: 'escalated' | 'estimate' | 'unread' | 'read';
}

interface ChatListProps {
  onSelectChat: (chat: ChatItem) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const [filter, setFilter] = useState<'all' | 'escalated' | 'estimate' | 'read'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const chats: ChatItem[] = [
    { id: '1', title: 'John Doe', lastMessage: 'Can you help with my estimate?', time: '10:30 AM', type: 'estimate' },
    { id: '2', title: 'Admin', lastMessage: 'Your estimate is ready', time: '9:45 AM', type: 'escalated' },
    { id: '3', title: 'Support', lastMessage: 'We are looking into your issue', time: '1:00 PM', type: 'unread' },
    { id: '4', title: 'Customer', lastMessage: 'Thanks!', time: '2:30 PM', type: 'read' },
  ];

  const filters: { label: string; value: typeof filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Escalated', value: 'escalated' },
    { label: 'Estimates', value: 'estimate' },
    { label: 'Read', value: 'read' },
  ];

  const filteredChats = chats.filter(chat =>
    (filter === 'all' || chat.type === filter) &&
    (!showUnreadOnly || chat.type === 'unread')
  );

  return (
    <div className="px-2">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={`px-3 py-1 rounded-md text-sm ${
              showUnreadOnly
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {showUnreadOnly ? 'Showing Unread' : 'Unread Only'}
          </button>
        </div>
      </div>

      <div>
        {filteredChats.length === 0 ? (
          <p className="text-gray-500 text-sm">No chats found.</p>
        ) : (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              className="p-3 cursor-pointer hover:bg-gray-100 rounded-md mb-2 bg-white shadow-sm"
              onClick={() => onSelectChat(chat)}
            >
              <div className="font-medium">{chat.title}</div>
              <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
              <div className="text-xs text-gray-400">{chat.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
