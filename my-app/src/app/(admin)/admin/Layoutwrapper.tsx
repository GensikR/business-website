'use client';

import React, { useEffect, useState } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import TopBar from '@/components/admin/TopBar';
import AdminLogin from '@/components/admin/AdminLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase';
import '@/app/globals.css';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in using Firebase auth
  useEffect(() => 
  {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <AdminLogin />
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
