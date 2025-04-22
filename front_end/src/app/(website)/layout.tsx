// app/layout.tsx
import React from 'react';
import NavBar from '../../components/NavBar';  // Import header for general pages
import Footer from '../../components/Footer';  // Import footer for general pages
import ChatBot from '../../components/ChatBot';  // Import chat bot for general pages
import '../globals.css';
import UniversalHeader from '../../components/UniversalHeader';  // Import header for general pages

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-800 antialiased flex flex-col min-h-screen">
        {/* Header for the entire site */}
        <NavBar />

        {/* Header Section */}
        <UniversalHeader
          title="Transform Your Home with Mauri Remodeling"
          subtitle="Quality craftsmanship, honest pricing, and stunning results."
          description="Whether you're updating a single room or tackling a full home remodel, we bring expertise and care to every project. Explore our work, schedule a free consultation, and take the first step toward your dream home."
          backgroundImageUrl="/images/header5.png"
        />
        {/* Main content for the site */}
        <main className="flex-grow px-4 md:px-8 lg:px-16 ">{children}</main>
        {/* Footer for the entire site */}
        <Footer />
        {/* Chatbot for the entire site */}
        <ChatBot />
      </body>
    </html>
  );
}
