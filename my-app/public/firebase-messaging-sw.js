
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA4T9N1n-z-ZOEFjX3jg9MPkH8T0OoWJ-c",
  authDomain: "mauri-79502.firebaseapp.com",
  projectId: "mauri-79502",
  storageBucket: "mauri-79502.appspot.com",
  messagingSenderId: "627902290960",
  appId: "1:627902290960:web:22ed7ea951e44c50ce3e95",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/company-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
