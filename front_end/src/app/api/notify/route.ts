// app/api/notify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const TO_PHONE = process.env.OWNER_PHONE_NUMBER!;
const FROM_PHONE = process.env.TWILIO_PHONE_NUMBER!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { selectedService, description, selectedSlots } = body;

  const messageBody = `
📅 New Appointment Scheduled!

🛠️ Service: ${selectedService}
📝 Description: ${description}
🕒 Preferred Times: ${selectedSlots.join(', ')}
`;

  try {
    await client.messages.create({
      body: messageBody,
      from: FROM_PHONE,
      to: TO_PHONE,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Twilio Error:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
