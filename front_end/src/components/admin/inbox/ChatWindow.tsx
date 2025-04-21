'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '../../../types';

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
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4">{chat?.title || 'Select a chat'}</h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {chat?.messages?.length ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs p-2 rounded-md ${
                  message.sender === 'user'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <div className="text-xs text-gray-500">
                  {message.time ? new Date(message.time).toLocaleString() : ''}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md"
          placeholder="Type your message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
