'use client';

import React from 'react';
import { Chat } from '../../../types';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="cursor-pointer p-2 border rounded hover:bg-gray-100"
            onClick={() => onSelectChat(chat)}
          >
            <div className="font-semibold">{chat.title}</div>
            <div className="text-sm text-gray-500">
              {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
