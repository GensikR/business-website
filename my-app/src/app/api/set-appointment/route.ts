// src/app/api/set-appointment/route.ts
import { db } from '@/lib/utils/firebase_db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { selectedService, description, selectedSlots } = body;

    if (!selectedService || !description || !selectedSlots?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appointmentRef = db.collection('appointments').doc();
    await appointmentRef.set({
      selectedService,
      description,
      selectedSlots,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Appointment saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
