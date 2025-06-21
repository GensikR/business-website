'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function PhoneNumber() {
  const number = '+12144042790';
  const displayNumber = formatPhoneNumber(number);

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg text-center">
      <h2 className="text-base font-semibold text-gray-800 mb-1">Contact Us</h2>

      <p className="text-lg font-bold text-blue-600">{displayNumber}</p>

      <div className="mt-2 flex gap-2 justify-center flex-wrap">
        <a
          href={`tel:${number}`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`sms:${number}`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          <MessageCircle className="w-4 h-4" />
          Text
        </a>
      </div>
    </div>
  );
}

function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
}
