// ClientAdminWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import TopBar from './TopBar';
import FacebookLogin from './FacebookLogin';
import { loadFacebookSDK } from '@/lib/fb_sdk';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    loadFacebookSDK(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '')
      .then(() => console.log('FB SDK ready'))
      .catch((err) => console.error('FB SDK failed to load:', err));
  }, []);

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <FacebookLogin setLoggedIn={setLoggedIn} />
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
