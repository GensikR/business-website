// src/app/api/set-appointment/route.ts
import { db } from '@/lib/utils/firebase_db';
import { storage, bucket } from '@/lib/utils/firebase_storage'
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    // Use formData instead of req.json
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
      const tempFilePath = path.join(tmpdir(), `${uuidv4()}-${file.name}`);
      await writeFile(tempFilePath, buffer);

      const bucketFile = bucket.file(`appointments/${Date.now()}-${file.name}`);
      await bucketFile.save(buffer, {
        metadata: {
          contentType: file.type,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
        resumable: false,
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket().name}/o/${encodeURIComponent(bucketFile.name)}?alt=media&token=${uuidv4()}`;
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
