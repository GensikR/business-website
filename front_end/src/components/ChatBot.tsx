// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { X } from 'lucide-react';
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// //TODO: HIDE THIS INFO IN ENV FILE
// // Firebase config setup — replace with your actual config

// // Initialize Firebase app and Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Message interface to define chat message shape
// interface Message {
//   sender: 'user' | 'bot' | 'admin';
//   text: string;
//   senderId?: string;
//   buttons?: { title: string; payload: string }[];
// }

// const ChatBot: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);           // Controls whether chat UI is visible
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: 'bot', text: 'Hello! How can we help you today?' },
//   ]);
//   const [input, setInput] = useState('');                // Current input value
//   const [loading, setLoading] = useState(false);         // Loading state during message send
//   const [escalated, setEscalated] = useState(false);     // Flag for escalation state
//   const [chatId, setChatId] = useState<string | null>(null); // Store the unique chat ID
//   const messageEndRef = useRef<HTMLDivElement>(null);    // For scrolling to the bottom of chat

//   // WebSocket setup (for communication with the admin)
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Called when escalation is triggered
//   const startWebSocketCommunication = () => {
//     const newSocket = new WebSocket('ws://localhost:5000'); // Replace with your WebSocket server URL
//     newSocket.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     newSocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.sender === 'admin') {
//         setMessages((prev) => [
//           ...prev,
//           { sender: 'admin', text: data.text, senderId: data.senderId },
//         ]);
//       }
//     };

//     setSocket(newSocket);
//   };

//   // Escalate message to Firestore (for escalation only)
//   const escalateMessageToFirestore = async (text: string) => {
//     if (!chatId) return;
//     const messagesRef = collection(db, 'escalatedMessages');
//     try {
//       await addDoc(messagesRef, {
//         chatId,
//         text,
//         sender: 'user',
//         timestamp: serverTimestamp(),
//       });
//     } catch (err) {
//       console.error('Error escalating to Firestore:', err);
//     }
//   };

//   // Send message to Rasa — only called before escalation
//   const sendMessageToRasa = async (message: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sender: 'user123',
//           message: message,
//         }),
//       });

//       const data = await response.json();

//       // Process and display Rasa's responses
//       const botMessages = data.map((msg: { text: string; buttons?: any[] }) => {
//         // Check if escalation was triggered
//         if (msg.text.toLowerCase().includes('escalated')) {
//           setEscalated(true);                  // Mark state as escalated
//           startWebSocketCommunication();       // Start WebSocket communication for admin interaction
//           setChatId(generateChatId());         // Assign a unique chat ID
//         }

//         return {
//           sender: 'bot',
//           text: msg.text,
//           buttons: msg.buttons,
//         };
//       });

//       setMessages((prevMessages) => [...prevMessages, ...botMessages]);
//     } catch (error) {
//       console.error('Error sending message to Rasa:', error);
//       const botMessage: Message = {
//         sender: 'bot',
//         text: 'Sorry, I could not understand that. Please try again later.',
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to generate a unique chat ID (this could be more sophisticated)
//   const generateChatId = () => {
//     return `chat-${Date.now()}`;
//   };

//   // Handles "Send" button click or Enter key
//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage: Message = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     if (escalated) {
//       escalateMessageToFirestore(input);   // Escalate to Firestore after escalation
//       socket?.send(JSON.stringify({ text: input, sender: 'user' })); // Send message to admin via WebSocket
//     } else {
//       sendMessageToRasa(input);        // Send to Rasa before escalation
//     }

//     setInput('');
//   };

//   // Handles Rasa buttons
//   const handleButtonClick = (payload: string) => {
//     const userMessage: Message = { sender: 'user', text: payload };
//     setMessages((prev) => [...prev, userMessage]);

//     if (escalated) {
//       escalateMessageToFirestore(payload);   // If escalated, treat button as normal message
//       socket?.send(JSON.stringify({ text: payload, sender: 'user' })); // Send to admin via WebSocket
//     } else {
//       sendMessageToRasa(payload);        // Otherwise, send payload to Rasa
//     }
//   };

//   return (
//     <>
//       {/* Floating button to open chat */}
//       <button
//         className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-md rounded-full p-2 hover:shadow-lg transition"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Open Chat"
//       >
//         <img src="/images/team/chatbot.png" alt="Chat" className="h-12 w-12 object-contain" />
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-20 right-6 z-50 w-96 h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
//           {/* Chat Header */}
//           <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
//             <h3 className="font-semibold text-sm">Chat with Us</h3>
//             <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="p-4 text-sm text-gray-700 space-y-2 h-full overflow-y-auto">
//             {messages.map((msg, index) => (
//               <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div
//                   className={`px-3 py-2 rounded-md max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : msg.sender === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
//                 >
//                   <div>{msg.text}</div>

//                   {/* Render buttons (if any) */}
//                   {msg.buttons && (
//                     <div className="mt-2 space-y-2">
//                       {msg.buttons.map((button, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => handleButtonClick(button.payload)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 w-full"
//                         >
//                           {button.title}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <div ref={messageEndRef} />
//           </div>

//           {/* Input Area */}
//           <form onSubmit={handleSend} className="px-4 py-2 border-t bg-gray-50 flex items-center space-x-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-grow px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               placeholder="Type your message..."
//             />
//             <button
//               type="submit"
//               className="text-blue-500 font-semibold hover:text-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatBot;
