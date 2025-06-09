'use client';
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/fb_config';
import { Message } from '@/types'; // Message type
import { getBotResponse } from '@/lib/chat/bot_brain';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [escalated, setEscalated] = useState(false);
  const [chatid, setChatId] = useState<string>('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! How can we help you today?',
      time: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToBot = (message: string) => {
    if (message.toLowerCase().includes('human')) {
      setEscalated(true);
      escalateChat();
      return;
    }

    const botResponse = getBotResponse(message);

    const botMsg: Message = {
      sender: 'bot',
      text: botResponse,
      time: new Date().toISOString()
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const escalateChat = async () => {
    try {
      const chatRef = await addDoc(collection(db, 'Chats'), {
        createdAt: serverTimestamp()
      });

      setChatId(chatRef.id);

      const initialMessage: Message = {
        sender: 'bot',
        text: "A human will be with you shortly.",
        time: new Date().toISOString()
      };

      await addDoc(collection(db, 'Chats', chatRef.id, 'messages'), initialMessage);

      setMessages(prev => [...prev, initialMessage]);
    } catch (err) {
      console.error('Error escalating:', err);
    }
  };

  const sendMessageToAdmin = async (message: Message) => {
    if (!chatid) return;

    try {
      await addDoc(collection(db, 'Chats', chatid, 'messages'), {
        sender: message.sender,
        text: message.text,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error('Error sending to admin:', err);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: input,
      time: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (escalated) {
      sendMessageToAdmin(userMessage);
    } else {
      sendMessageToBot(input);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        Chat
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white border rounded-lg shadow-xl w-80 max-h-[70vh] flex flex-col z-50">
          <div className="flex justify-between items-center p-3 border-b bg-blue-600 text-white">
            <h4 className="font-semibold">Chat with us</h4>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end space-x-2">
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 relative">
                      <Image
                        src="/images/bot_avatar.png"
                        alt="Bot avatar"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="p-3 border-t flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
