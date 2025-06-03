// ClientAdminWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import TopBar from './TopBar';
import AdminLogin from './FacebookLogin';
import '@/app/globals.css';


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: Change after admin login is implemented
  const [loggedIn, setLoggedIn] = useState(true);

  

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <AdminLogin setLoggedIn={setLoggedIn} />
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminNav />
        <main className="flex-1 overflow-y-auto px-6 ml-20 md:ml-64 pt-16">
          {children}
        </main>
      </div>
    </>
  );
}
