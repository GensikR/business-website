import React from 'react';
import AdminNav from '@/components/admin/AdminNav';
import TopBar from '@/components/admin/TopBar';
import '../../globals.css';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin dashboard for managing the site',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen overflow-hidden">
        {/* Top bar */}
        <TopBar />

        {/* Sidebar and main content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <AdminNav />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto px-6 ml-20 md:ml-64 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
