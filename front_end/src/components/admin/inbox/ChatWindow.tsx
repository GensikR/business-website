'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '../../../types';

interface ChatWindowProps {
  chat: Chat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const [messageText, setMessageText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendClick = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        sender: 'user',
        text: messageText,
        time: new Date().toISOString(),
      };
      chat.messages.push(newMessage); // Simulated push for now
      setMessageText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 font-semibold">{chat.title}</div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {chat.messages.length > 0 ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-xs p-2 rounded-md ${
                  message.sender === 'user'
                    ? 'bg-blue-100 text-blue-700'
                    : message.sender === 'admin'
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                <div>{message.text}</div>
                <div className="text-xs text-gray-500">{message.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages to display</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - always visible */}
      <div className="flex pt-2 border-t border-gray-200">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 p-2 rounded-md"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendClick}
          className="ml-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
