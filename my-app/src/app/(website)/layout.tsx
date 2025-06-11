'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import ChatBot from '../../components/ChatBot';
import '@/app/globals.css';
import UniversalHeader from '../../components/layout/UniversalHeader';
import { requestNotificationPermission } from '@/lib/utils/request_fms_permission';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [askedPermission, setAskedPermission] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  useEffect(() => {
    // Request notification permission once
    if (!askedPermission) {
      requestNotificationPermission().then(() => {
        setAskedPermission(true);
      });
    }
  }, [askedPermission]);

  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Site NavBar */}
        <NavBar />

        {/* Hero Section */}
        <UniversalHeader
          backgroundImageUrl="/images/header5.png"
          businessCardImageUrl="/images/business-card.jpg"
          description="Whether you're updating a single room or tackling a full home remodel, we bring expertise and care to every project. Explore our work, schedule a free consultation, and take the first step toward your dream home."
        />

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
