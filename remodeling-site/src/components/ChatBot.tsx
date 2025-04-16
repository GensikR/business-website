'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can we help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToRasa = async (message: string) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user123', // Unique user identifier
          message: message,
        }),
      });

      const data = await response.json();
      const botMessages = data.map((msg: { text: string }) => ({
        sender: 'bot',
        text: msg.text,
      }));

      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error('Error sending message to Rasa:', error);
      const botMessage: Message = {
        sender: 'bot',
        text: 'Sorry, I could not understand that. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    sendMessageToRasa(input);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat"
      >
        <img
          src="/images/team/chatbot.png"
          alt="Logo"
          className="h-12 w-12 object-contain"
        />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Chat with Us</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 text-sm text-gray-700 space-y-2 h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
