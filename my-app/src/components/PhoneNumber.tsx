'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function PhoneNumber() {
  const number = '+12144042798';

  return (
    <div className="flex gap-4 sm:gap-6">
      <a
        href={`tel:${number}`}
        className="flex items-center gap-2 px-6 py-3 text-base bg-[#4a85a0] text-white rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl"
      >
        <Phone className="w-5 h-5" />
        Call
      </a>
      <a
        href={`sms:${number}`}
        className="flex items-center gap-2 px-6 py-3 text-base bg-[#D4AF37] text-black rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl"
      >
        <MessageCircle className="w-5 h-5" />
        Text
      </a>
    </div>
  );
}