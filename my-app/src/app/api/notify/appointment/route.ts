// /app/api/notify/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin app only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // Put your service account JSON credentials here or load from env vars
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // handle multiline env var
    }),
  });
}

const db = admin.firestore();
const messaging = admin.messaging();

export async function POST(req: NextRequest) {
  try {
    const { title, body } = await req.json();

    // Get all tokens from Firestore
    // const tokensSnapshot = await db.collection('admin_tokens').get();
    // const tokens = tokensSnapshot.docs.map(doc => doc.data().token).filter(Boolean);

    // if (tokens.length === 0) {
    //   return NextResponse.json({ error: 'No tokens found' }, { status: 404 });
    // }
    const tokens = ["cUtmWxPNMJGZ1BiKrZxAnW:APA91bERvoVKBel3E4lRlWu08uwVsGUUP95TDDzZ8GObmvwJFHSCiieiVqXvgAlDJ9ePjkl4KECPjcHx721rfY8g49tbG6tjsfMJN8Il-KAqB3QAytAtyI8"];

    const results = await Promise.all(
      tokens.map(async (token) => {
        try {
          const response = await messaging.send({
            token,
            notification: {
              title: title || 'Test Notification',
              body: body || 'Hello from Firebase!',
            },
          });
          return { token, success: true, response };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error(`Failed to send to ${token}:`, message);
          return { token, success: false, error: message };
        }
      })
    );

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
