import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import firebaseConfig from "@/lib/utils/firebase_config";

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Check if token already exists
    const tokenQuery = query(
      collection(db, "admin_tokens"),
      where("token", "==", token)
    );
    const tokenSnapshot = await getDocs(tokenQuery);

    if (!tokenSnapshot.empty) {
      return NextResponse.json({ message: "Token already registered" });
    }

    // Save new token to Firestore
    await addDoc(collection(db, "admin_tokens"), {
      token,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving token:", error);
    return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
  }
}
