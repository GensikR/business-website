// src/app/api/get-appointments/route.ts
import { db } from '@/lib/utils/firebase_db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const snapshot = await db.collection('appointments').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
