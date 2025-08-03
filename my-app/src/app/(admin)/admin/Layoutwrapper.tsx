'use client';

import React, { useEffect, useState } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase';
import '@/app/globals.css';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
          <AdminLogin />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  );
}
