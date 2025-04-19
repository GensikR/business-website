// app/layout.tsx
import React from 'react';
import Header from '../../components/NavBar';  // Import header for general pages
import Footer from '../../components/Footer';  // Import footer for general pages
import ChatBot from '../../components/ChatBot';  // Import chat bot for general pages
import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Header for the entire site */}
        <Header />
        {/* Main content for the site */}
        <main className="flex-grow px-4 md:px-8 lg:px-16 py-8">{children}</main>
        {/* Footer for the entire site */}
        <Footer />
        {/* Chatbot for the entire site */}
        <ChatBot />
      </body>
    </html>
  );
}
