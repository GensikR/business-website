import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin SDK using service account credentials
const serviceAccount = require(path.join(__dirname, 'fb_key', 'mauri-79502-firebase-adminsdk-fbsvc-446a4bdb48.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the Firestore instance
const db = admin.firestore();

export { db };
