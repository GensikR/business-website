// app/(admin)/layout.tsx
import React from 'react';
import AdminNav from '@/components/admin/AdminNav';
import TopBar from '@/components/admin/TopBar';
import '../../globals.css';

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard for managing the site",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <TopBar />
        <div className="flex flex-1">
          <AdminNav />
          <div>
          <main className="flex-1 p-4">
            {children}
          </main>
          </div>
        </div>
      </body>
    </html>
  );
}
