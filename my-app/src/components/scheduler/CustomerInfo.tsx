'use client';

import React from 'react';
import { Mail, Phone, User, MapPin } from 'lucide-react';

interface CustomerInfoProps {
  name: string;
  phone: string;
  consent: boolean;
  email: string;
  address: string;
  onChange: (field: string, value: string | boolean) => void;
}

const InputField: React.FC<{
  label: string;
  icon: React.ReactNode;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, icon, type, value, placeholder, onChange }) => (
  <div>
    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
      {label}
    </label>
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 focus-within:ring-2 focus-within:ring-blue-500 bg-white transition">
      <span className="text-gray-500 mr-2">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-sm sm:text-base"
        autoComplete="off"
      />
    </div>
  </div>
);

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  name,
  phone,
  consent,
  email,
  address,
  onChange,
}) => {
  return (
    <section>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-5 sm:mb-6">
        5. Your Contact Information
      </h2>

      <div className="space-y-5 sm:space-y-6">
        <InputField
          label="Full Name"
          icon={<User className="w-4 h-4" />}
          type="text"
          value={name}
          placeholder="John Doe"
          onChange={(e) => onChange('name', e.target.value)}
        />

        <InputField
          label="Phone Number"
          icon={<Phone className="w-4 h-4" />}
          type="tel"
          value={phone}
          placeholder="(123) 456-7890"
          onChange={(e) => onChange('phone', e.target.value)}
        />

        <InputField
          label="Email Address"
          icon={<Mail className="w-4 h-4" />}
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => onChange('email', e.target.value)}
        />

        <InputField
          label="Address or Nearby Location"
          icon={<MapPin className="w-4 h-4" />}
          type="text"
          value={address}
          placeholder="123 Main St, or near City Hall"
          onChange={(e) => onChange('address', e.target.value)}
        />

        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => onChange('consent', e.target.checked)}
            className="mt-1 accent-blue-600 w-4 h-4 rounded"
          />
          <label htmlFor="consent" className="text-sm sm:text-base text-gray-700 leading-snug">
            I consent to be contacted via phone or text message regarding this request.
          </label>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfo;
