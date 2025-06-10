import { NextResponse } from 'next/server';
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = Twilio(accountSid, authToken);

// Your Twilio phone number (must be a valid Twilio number)
const TWILIO_NUMBER = process.env.TWILIO_PHONE_NUMBER!;

// The phone number you want to notify (your verified number)
const NOTIFY_TO_NUMBER = process.env.OWNER_PHONE_NUMBER!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { selectedService, description, selectedSlots } = body;

    // Compose message body
    const messageBody = `
New Consultation Request:
Service: ${selectedService}
Description: ${description}
Preferred Slots: ${selectedSlots.join(', ')}
    `;

    // Send SMS with Twilio
    await client.messages.create({
      body: messageBody,
      from: TWILIO_NUMBER,
      to: NOTIFY_TO_NUMBER,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Twilio notify error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
