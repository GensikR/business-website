'use client';

import React, { useState, useEffect } from 'react';
import { Chat, Message } from '../../../../types';
import ChatList from '../../../../components/admin/inbox/ChatList';
import ChatWindow from '../../../../components/admin/inbox/ChatWindow';
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



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Inbox: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); 
  const [chats, setChats] = useState<Chat[]>([]); 

  // Fetch chats and messages
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

  // Real-time listener for chat list
  useEffect(() => {
    const chatsRef = collection(db, 'Chats');
    const unsubscribe = onSnapshot(chatsRef, () => {
      fetchChats();
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for selected chat
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
    <div className="flex h-screen">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
      </div>
      <div className="flex-1 p-4">
        <ChatWindow chat={selectedChat} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Inbox;
