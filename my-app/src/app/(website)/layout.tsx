'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import ChatBot from '../../components/ChatBot';
import '@/app/globals.css';
import UniversalHeader from '../../components/layout/UniversalHeader';
import PhoneNumber from '@/components/PhoneNumber';

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
          backgroundImageUrl="/images/logo.png"
        />

        <PhoneNumber/>
        

        {/* Main Content Area */}
        <main className="flex-grow px-2 sm:px-4 md:px-6 lg:px-8 relative">
          {/* Dots Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] bg-[length:20px_20px] z-0 pointer-events-none" />

          {/* Ultra-wide white container */}
          <div className="relative z-10 bg-white mx-auto w-full rounded-lg shadow-md px-4 sm:px-6 md:px-10 lg:px-16 py-8">
            {children}
          </div>
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Chatbot */}
        <ChatBot />
      </body>
    </html>
  );
}
