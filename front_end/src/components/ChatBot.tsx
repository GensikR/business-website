'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

console.log('Firebase Config:', firebaseConfig); // Log the config to check if it's correct
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Message interface
interface Message {
  sender: 'user' | 'bot' | 'admin';
  text: string;
  time: string;
  buttons?: { title: string; payload: string }[];
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! How can we help you today?',
      time: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [chatid, setChatId] = useState<string>('');
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
          sender: 'user123',
          message
        })
      });

      const data = await response.json();

      const botMessages: Message[] = data.map((msg: any) => {
        const newMsg: Message = {
          sender: 'bot',
          text: msg.text,
          time: new Date().toISOString(),
          buttons: msg.buttons
        };

        if (msg.text.toLowerCase().includes('human was requested')) {
          setEscalated(true);
          escalateChat();
        }

        return newMsg;
      });

      setMessages(prev => [...prev, ...botMessages]);
    } catch (err) {
      console.error('Rasa error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, something went wrong.',
          time: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: input,
      time: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    if (escalated) {
      sendMessageToAdmin(userMessage);
    } else {
      sendMessageToRasa(input);
    }

    setInput('');
  };

  const handleButtonClick = (payload: string) => {
    const userMessage: Message = {
      sender: 'user',
      text: payload,
      time: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    if (escalated) {
      sendMessageToAdmin(userMessage);
    } else {
      sendMessageToRasa(payload);
    }
  };

  const escalateChat = async () => {
    try {
      const chatRef = await addDoc(collection(db, 'Chats'), {
        createdAt: serverTimestamp()
      });

      setChatId(chatRef.id);

      const initialMessage: Message = {
        sender: 'bot',
        text: "A Human will be you shortly.",
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
  //TODO: FIX THIS
  // Listen for new messages from admin
  useEffect(() => {
    if (!chatid) return;

    const q = query(
      collection(db, 'Chats', chatid, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          console.log('New message from admin:', data);
          if (data.sender === 'admin') { // Only process admin messages
            const newMessage: Message = {
              sender: data.sender || 'unknown',
              text: data.text || '',
              time: data.time || (data.timestamp?.toDate()?.toISOString() ?? new Date().toISOString()),
            };
            setMessages(prev => [...prev, newMessage]);
          }
        }
      });
    });

    return () => unsubscribe();
  }, [chatid]);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src="/images/team/chatbot.png" alt="Chat" className="h-12 w-12 object-contain" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Chat with Us</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 text-sm text-gray-700 space-y-2 h-full overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-3 py-2 rounded-md max-w-[70%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 text-blue-800'
                      : msg.sender === 'admin'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.buttons && (
                    <div className="mt-2 space-y-2">
                      {msg.buttons.map((button, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleButtonClick(button.payload)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 w-full"
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

          <form onSubmit={handleSend} className="px-4 py-2 border-t bg-gray-50 flex items-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm mr-2"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
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