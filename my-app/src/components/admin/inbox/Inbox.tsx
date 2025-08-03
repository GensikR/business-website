'use client';

import React, { useState, useEffect } from 'react';
import { Chat, Message } from '@/types';
import ChatList from '@/components/admin/inbox/ChatList';
import ChatWindow from '@/components/admin/inbox/ChatWindow';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Inbox: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); 
  const [chats, setChats] = useState<Chat[]>([]); 

  const fetchChats = async () => {
    const chatsRef = collection(db, 'Chats');
    const q = query(chatsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const chatsList: Chat[] = [];

    for (const docSnap of querySnapshot.docs) {
      const chatId = docSnap.id;
      const messagesRef = collection(db, 'Chats', chatId, 'messages');
      const messagesSnapshot = await getDocs(messagesRef);

      const messages: Message[] = messagesSnapshot.docs.map((messageDoc) => {
        const messageData = messageDoc.data() as DocumentData;
        const timestamp = messageData.timestamp?.toDate() || null;
        return {
          sender: messageData.sender || '',
          text: messageData.text || '',
          time: timestamp,
        };
      });

      chatsList.push({
        id: chatId,
        title: docSnap.id,
        messages,
      });
    }

    setChats(chatsList);
  };

  useEffect(() => {
    const chatsRef = collection(db, 'Chats');
    const unsubscribe = onSnapshot(chatsRef, () => {
      fetchChats();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedChat?.id) return;

    const messagesRef = collection(db, 'Chats', selectedChat.id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => {
        const messageData = doc.data() as DocumentData;
        const timestamp = messageData.timestamp?.toDate() || null;
        return {
          sender: messageData.sender || '',
          text: messageData.text || '',
          time: timestamp,
        };
      });

      setSelectedChat((prev) => prev ? { ...prev, messages } : null);
    });

    return () => unsubscribe();
  }, [selectedChat?.id]);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = async (message: Message) => {
    if (!selectedChat?.id) return;
    const messagesRef = collection(db, 'Chats', selectedChat.id, 'messages');
    await addDoc(messagesRef, {
      sender: message.sender,
      text: message.text,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4 h-full text-gray-800">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">📨 Inbox</h2>
      <div className="flex flex-col md:flex-row gap-4 md:h-[75vh]">
        <div className="md:w-1/3 w-full border rounded-xl shadow-sm overflow-y-auto bg-white">
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
        </div>
        <div className="md:flex-1 w-full border rounded-xl shadow-sm bg-white">
          <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
