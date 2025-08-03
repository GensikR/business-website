'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function PhoneNumber() {
  const number = '+12144042790';

  return (
    <div className="w-full flex justify-center mt-16 sm:mt-20">
      <div className="flex gap-3">
        <a
          href={`tel:${number}`}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href={`sms:${number}`}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
        >
          <MessageCircle className="w-4 h-4" />
          Text
        </a>
      </div>
    </div>
  );
}
