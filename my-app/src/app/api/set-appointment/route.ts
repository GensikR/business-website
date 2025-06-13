// src/app/api/set-appointment/route.ts

import { db } from '@/lib/utils/firebase_db';
import { bucket } from '@/lib/utils/firebase_storage';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const selectedService = formData.get('selectedService')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const selectedDay = formData.get('selectedDay')?.toString() || '';
    const selectedSlots = JSON.parse(formData.get('selectedSlots')?.toString() || '[]');
    const customerInfo = {
      name: formData.get('customerInfo[name]')?.toString() || '',
      phone: formData.get('customerInfo[phone]')?.toString() || '',
      email: formData.get('customerInfo[email]')?.toString() || '',
      address: formData.get('customerInfo[address]')?.toString() || '',
      consent: formData.get('customerInfo[consent]') === 'true',
    };

    if (!selectedService || !description || !selectedSlots.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `appointments/${Date.now()}-${file.name}`;
      const token = uuidv4();

      const remoteFile = bucket.file(filename);
      const stream = remoteFile.createWriteStream({
        metadata: {
          contentType: file.type,
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        },
        resumable: false,
      });

      await new Promise<void>((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(buffer);
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${token}`;
      imageUrls.push(publicUrl);
    }

    const appointment = {
      selectedService,
      description,
      selectedDay,
      selectedSlots,
      customerInfo,
      imageUrls,
      createdAt: new Date().toISOString(),
    };

    await db.collection('appointments').add(appointment);

    return NextResponse.json({ message: 'Appointment saved with images' }, { status: 200 });
  } catch (error) {
    console.error('Error handling appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
