// utils/requestPermission.ts
import { messaging } from "@/lib/utils/firebase_messaging";
import { getToken } from "firebase/messaging";



export async function requestNotificationPermission() {
  try {
    const m = await messaging;
    if (!m) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Permission not granted.");
      return false;
    }


    const token = await getToken(m, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });


      // Send the token to server to register it
      console.log("FCM Token:", token);
      fetch("/api/notify/register", {
        method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to register token");
          }
          return true;
          }
      )
      .then(data => {
          console.log("Token registered successfully:", data);
      })
      .catch(error => {
          console.error("Error registering token:", error);
      });

  } catch (err) {
    console.error("Error getting FCM token", err);
  }
}
