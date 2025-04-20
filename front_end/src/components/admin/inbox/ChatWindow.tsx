'use client';
import React from 'react';

interface Message {
  sender: 'user' | 'admin' | 'bot';
  text: string;
  time: string;
}

interface ChatWindowProps {
  chat: {
    id: string;
    title: string;
    messages: Message[]; // Ensure this is an array
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  return (
    <div>
      <div className="mb-4 font-semibold">{chat.title}</div>
      <div className="space-y-4">
        {/* Ensure chat.messages is not undefined and is an array */}
        {chat.messages && Array.isArray(chat.messages) && chat.messages.length > 0 ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
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
      </div>
    </div>
  );
};

export default ChatWindow;
