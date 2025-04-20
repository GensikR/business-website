'use client';

import React, { useState } from 'react';
import { Chat } from '../../../../types';
import ChatList from '../../../../components/admin/inbox/ChatList';
import ChatWindow from '../../../../components/admin/inbox/ChatWindow';

const Inbox: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const chats: Chat[] = [
    {
      id: '1',
      title: 'Support Chat 1',
      messages: [
        { sender: 'user', text: 'Hello', time: '2025-04-19 10:00' },
        { sender: 'admin', text: 'Hi! How can I help?', time: '2025-04-19 10:01' }
      ]
    },
    {
      id: '2',
      title: 'Estimate Request',
      messages: [
        { sender: 'user', text: 'Can I get an estimate?', time: '2025-04-19 10:10' }
      ]
    }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust 4rem to match your top bar height */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <ChatList chats={chats} onSelectChat={setSelectedChat} />
      </div>
      <div className="w-2/3 p-4">
        {selectedChat ? (
          <div className="h-full">
            <ChatWindow chat={selectedChat} />
          </div>
        ) : (
          <div className="text-gray-500">Select a chat to view messages</div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
