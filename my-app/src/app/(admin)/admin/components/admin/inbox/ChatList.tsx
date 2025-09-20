'use client';

import React from 'react';
import { Chat } from '@/types';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-blue-700 mb-3 text-center">Chats</h2>
      {chats.length === 0 ? (
        <div className="text-gray-500 text-sm text-center">No chats available</div>
      ) : (
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-blue-50 transition"
            >
              <div className="font-semibold text-sm truncate">{chat.title}</div>
              <div className="text-xs text-gray-500 truncate">
                {chat.messages?.length
                  ? chat.messages[chat.messages.length - 1]?.text || 'No messages yet'
                  : 'No messages yet'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
