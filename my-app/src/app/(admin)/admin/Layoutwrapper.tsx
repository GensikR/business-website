'use client';

import React, { useEffect, useState } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import TopBar from '@/components/admin/TopBar';
import AdminLogin from '@/components/admin/AdminLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/utils/firebase';
import '@/app/globals.css';
import { requestNotificationPermission } from '@/lib/utils/request_fms_permission';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [askedPermission, setAskedPermission] = useState(false);

  // Check login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register service worker
  useEffect(() => {
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

  // Ask for notification permission once after login
  useEffect(() => {
    if (loggedIn && !askedPermission) {
      requestNotificationPermission().then(() => {
        setAskedPermission(true); // Prevent repeated prompts
      });
    }
  }, [loggedIn, askedPermission]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in
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

  // Logged in
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
