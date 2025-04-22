// app/layout.tsx
import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import '../globals.css';
import UniversalHeader from '../../components/UniversalHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Site Header */}
        <NavBar />

        {/* Hero Section */}
        <UniversalHeader
          title="Mauri Remodeling"
          subtitle="Transform Your Home with quality craftsmanship, honest pricing, and stunning results."
          description="Whether you're updating a single room or tackling a full home remodel, we bring expertise and care to every project. Explore our work, schedule a free consultation, and take the first step toward your dream home."
          backgroundImageUrl="/images/header5.png"
        />

        {/* Main Content Area with Extra‑Generous Padding */}
        <main className="flex-grow px-12 md:px-24 lg:px-48 relative">
          {/* Dots Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] bg-[length:20px_20px] z-0 pointer-events-none" />

          {/* Your Pages */}
          <div className="relative z-10">
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
