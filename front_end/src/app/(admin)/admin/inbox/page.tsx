'use client';
import React, { useState } from 'react';
import ChatList from '../../../../components/admin/inbox/ChatList';
import ChatWindow from '../../../../components/admin/inbox/ChatWindow';

const Inbox: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  return (
    <div className="flex h-screen">
      {/* Chat List on the left */}
      <div className="w-1/3 bg-gray-100 p-4">
        <ChatList onSelectChat={setSelectedChat} />
      </div>

      {/* Chat Window on the right */}
      <div className="flex-1 bg-white p-4">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="text-center text-gray-500">Select a chat to view messages</div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
