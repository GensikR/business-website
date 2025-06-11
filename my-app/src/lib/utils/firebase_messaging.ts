// src/lib/utils/firebase_messaging.ts
import { getMessaging, onMessage, getToken, isSupported } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase_config';

const app = initializeApp(firebaseConfig);

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined') {
  // Only run on client side
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.warn('Firebase Messaging is not supported on this browser.');
    }
  });
}

export { messaging, onMessage, getToken };
