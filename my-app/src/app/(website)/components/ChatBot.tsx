'use client';
import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import Image from 'next/image';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} 
from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';
import {Message} from '@/types';
import {getBotResponse}  from '@/lib/chat/bot_brain';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ChatBot: React.FC = () => 
{
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
  
  // All existing logic remains unchanged
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
    const botMsg: Message = { sender: 'bot', text: botResponse, time: new Date().toISOString() };
    setMessages(prev => [...prev, botMsg]);
  };

  const escalateChat = async () => {
    try {
      const chatRef = await addDoc(collection(db, 'Chats'), { createdAt: serverTimestamp() });
      setChatId(chatRef.id);
      const initialMessage: Message = { sender: 'bot', text: "A Human will be with you shortly.", time: new Date().toISOString() };
      await addDoc(collection(db, 'Chats', chatRef.id, 'messages'), initialMessage);
      setMessages(prev => [...prev, initialMessage]);
    } catch (err) { console.error('Error escalating:', err); }
  };

  const sendMessageToAdmin = async (message: Message) => {
    if (!chatid) return;
    try {
      await addDoc(collection(db, 'Chats', chatid, 'messages'), { sender: message.sender, text: message.text, timestamp: serverTimestamp() });
    } catch (err) { console.error('Error sending to admin:', err); }
  };
  
  useEffect(() => {
    if (!chatid) return;
    const q = query(collection(db, 'Chats', chatid, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          if (data.sender === 'admin') {
            const newMessage: Message = { sender: data.sender || 'unknown', text: data.text || '', time: data.time || (data.timestamp?.toDate()?.toISOString() ?? new Date().toISOString()) };
            setMessages(prev => [...prev, newMessage]);
          }
        }
      });
    });
    return () => unsubscribe();
  }, [chatid]);

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMessage: Message = { sender: 'user', text: input, time: new Date().toISOString() };
      setMessages(prev => [...prev, userMessage]);
      if (escalated) { sendMessageToAdmin(userMessage); } else { sendMessageToBot(input); }
      setInput('');
    };
  
  const handleButtonClick = (payload: string) => {
      const userMessage: Message = { sender: 'user', text: payload, time: new Date().toISOString() };
      setMessages(prev => [...prev, userMessage]);
      if (escalated) { sendMessageToAdmin(userMessage); } else { sendMessageToBot(payload); }
    };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow animate-pulse hover:animate-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        <Image src="/images/team/chatbot.png" alt="Chat" width={48} height={48} className="rounded-full object-cover" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            // === RESPONSIVE FIX IS HERE ===
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl
                       bg-[#292524]/80 backdrop-blur-lg border border-white/10 shadow-2xl shadow-black/50
                       
                       // Mobile-first: Fills the screen with a margin
                       inset-4 
                       
                       // sm & up (desktop): Becomes a floating box in the corner
                       sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:w-full sm:max-w-sm"
          >
            <div className="bg-black/20 text-white px-4 py-3 flex justify-between items-center border-b border-white/10 flex-shrink-0">
              <h3 className="font-semibold text-base">Chat with Us</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 text-sm space-y-3 flex-grow overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-xl max-w-[80%] break-words ${
                      msg.sender === 'user' ? 'bg-[#4a85a0] text-white' : 
                      msg.sender === 'admin' ? 'bg-amber-800 text-white' : 
                      'bg-stone-700 text-gray-200'
                    }`}
                  >
                    <div>{msg.text}</div>
                    {msg.buttons && (
                      <div className="mt-2 space-y-2">
                        {msg.buttons.map((button, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleButtonClick(button.payload)}
                            className="bg-[#D4AF37] text-stone-900 font-bold px-3 py-1 rounded-md text-sm hover:bg-amber-400 w-full"
                          >
                            {button.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <form onSubmit={handleSend} className="px-4 py-3 border-t border-white/10 bg-[#292524] flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#D4AF37] text-stone-900 p-2 rounded-lg hover:bg-amber-400 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;