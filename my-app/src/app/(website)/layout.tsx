'use client';

import React from 'react';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import ChatBot from '../../components/ChatBot';
import '@/app/globals.css';
import UniversalHeader from '../../components/layout/UniversalHeader';
import ComponentContainer from '@/components/layout/ComponentContainer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Site NavBar */}
        <NavBar />

        {/* Hero Section */}
        <UniversalHeader
          backgroundImageUrl="/images/background.png"
        />

        {/* Main Content Area */}
        <main>

        <ComponentContainer>
          {children}
        </ComponentContainer>
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Chatbot */}
        <ChatBot />
      </body>
    </html>
  );
}