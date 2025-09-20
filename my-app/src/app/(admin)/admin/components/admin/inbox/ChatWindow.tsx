'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '@/types';

interface ChatWindowProps {
  chat: Chat | null;
  onSendMessage: (message: Message) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendClick = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        sender: 'admin',
        text: messageText,
        time: new Date().toString(),
      };
      onSendMessage(newMessage);
      setMessageText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendClick();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-lg font-bold text-blue-700 mb-3 text-center">
        {chat?.title || 'Select a Chat'}
      </h2>

      <div className="flex-1 overflow-y-auto px-1 space-y-3">
        {chat?.messages?.length ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[75%] p-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <div className="text-[10px] text-gray-500 mt-1">
                  {message.time ? new Date(message.time).toLocaleString() : ''}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center mt-10">No messages yet</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Type your message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendClick}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
