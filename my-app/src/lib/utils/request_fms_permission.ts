// utils/requestPermission.ts
import { messaging } from "@/lib/utils/firebase_messaging";
import { getToken, onMessage } from "firebase/messaging";

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const m = await messaging;
    if (!m) {
      console.warn("Firebase messaging not initialized.");
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission not granted.");
      return false;
    }

    const token = await getToken(m, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (!token) {
      console.error("No FCM token retrieved.");
      return false;
    }

    // Register foreground message handler
    onMessage(m, (payload) => {
      console.log("📩 Foreground message received:", payload);

      if (payload?.notification) {
        new Notification("HELLOOOO", {
          body: payload.notification.body,
          icon: "/images/company-logo.png",
        });
      }
    });

    // Send token to server
    const response = await fetch("/api/notify/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to register token: ${errText}`);
    }

    console.log("✅ Token registered successfully");
    return true;
  } catch (err) {
    console.error("❌ Error during push setup:", err);
    return false;
  }
}
