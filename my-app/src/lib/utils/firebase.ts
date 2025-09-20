import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config (make sure all NEXT_PUBLIC_ env vars match your Firebase console settings)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET, // ✅ fixed naming
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase once
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Fetches documents from a Firestore collection
 * @param collection_name - Name of the collection
 * @param max - Max number of documents to fetch
 */
export const fetch_db_collection = async (collection_name: string, max: number) => 
{
  try 
  {
    const q = query(collection(db, collection_name), orderBy("uploadedAt", "desc"), limit(max));
    const snapshot = await getDocs(q);

    const all_docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return all_docs;
  } catch (err) {
    console.error("Error fetching collection:", err);
    return [];
  }
};
