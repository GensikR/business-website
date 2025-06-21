// PhoneNumber.tsx
'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function PhoneNumber() {
  const number = '+12144042790';
  const displayNumber = formatPhoneNumber(number);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-xl text-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
      <p className="text-3xl font-bold text-blue-600 tracking-wide">{displayNumber}</p>
      <div className="flex justify-center gap-4">
        <a
          href={`tel:${number}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
        >
          <Phone className="w-5 h-5" />
          Call Us
        </a>
        <a
          href={`sms:${number}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Text Us
        </a>
      </div>
    </div>
  );
}

// Optional helper to format as +1 (214) 636-4449
function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
}
