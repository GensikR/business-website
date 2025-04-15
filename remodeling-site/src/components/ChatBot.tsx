'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  // Controls if the chat window is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Stores all chat messages between user and bot
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can we help you today?' },
  ]);

  // Stores the current text input value
  const [input, setInput] = useState('');

  // Ref to automatically scroll to the latest message
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle submitting user message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot reply
    setTimeout(() => {
      const botMessage: Message = {
        sender: 'bot',
        text: `You said: "${userMessage.text}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat"
      >
        {/* Logo inside the button */}
        <Link href="/" className="flex items-center h-12 w-12">
          <img
            src="/images/team/chatbot.png"
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </Link>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Chat with Us</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Message Display Area */}
          <div className="p-4 text-sm text-gray-700 space-y-2 h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-md max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Section */}
          <form
            onSubmit={handleSend}
            className="px-4 py-2 border-t bg-gray-50 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="text-blue-500 font-semibold hover:text-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
