'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { all_services } from '@/lib/utils/getService';
import { generateTimeSlots } from '@/lib/utils/generateTimeSlots';
import { UploadCloud } from 'lucide-react';

const MAX_IMAGES = 3;
const todaysDate = new Date().toISOString().split('T')[0];

const Scheduler: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDay, setSelectedDay] = useState(todaysDate);
  const [timeSlots, setTimeSlots] = useState<string[]>(generateTimeSlots(todaysDate));
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    consent: false,
  });

  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : prev.length < 3
        ? [...prev, slot]
        : prev
    );
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > MAX_IMAGES) return;
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const updateCustomerInfo = (field: string, value: string | boolean) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('selectedService', selectedService);
    formData.append('selectedDay', selectedDay);
    formData.append('selectedSlots', JSON.stringify(selectedSlots));
    formData.append('description', description);

    Object.entries(customerInfo).forEach(([key, value]) => {
      formData.append(`customerInfo[${key}]`, value.toString());
    });

    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await fetch('/api/set-appointment', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Appointment submitted!');
        // Reset state
        setSelectedService('');
        setSelectedDay(todaysDate);
        setTimeSlots(generateTimeSlots(todaysDate));
        setSelectedSlots([]);
        setDescription('');
        setImages([]);
        setImagePreviews([]);
        setCustomerInfo({
          name: '',
          phone: '',
          email: '',
          address: '',
          consent: false,
        });
      } else {
        alert('Failed to submit.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 px-4 py-10 sm:px-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-8 text-sm sm:text-base">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center">Schedule Appointment</h1>

        {/* Customer Info */}
        <div className="space-y-4">
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => updateCustomerInfo('name', e.target.value)}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => updateCustomerInfo('phone', e.target.value)}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => updateCustomerInfo('email', e.target.value)}
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            value={customerInfo.address}
            onChange={(e) => updateCustomerInfo('address', e.target.value)}
            placeholder="Address or Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={customerInfo.consent}
              onChange={(e) => updateCustomerInfo('consent', e.target.checked)}
              className="accent-blue-600"
            />
            I consent to be contacted by phone or text
          </label>
        </div>

        {/* Project Description */}
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your project..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Upload Images (optional)</label>
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition"
          >
            <UploadCloud className="w-8 h-8 text-blue-400 mb-2" />
            <p className="text-blue-700 font-medium">Click or drag to upload</p>
            <p className="text-xs text-gray-500">Up to {MAX_IMAGES} images</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image src={src} alt={`preview-${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service & Time */}
        <div className="space-y-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select a service</option>
            {all_services.map((s) => (
              <option key={s.link} value={s.link}>
                {s.title}
              </option>
            ))}
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            value={selectedDay}
            min={todaysDate}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setTimeSlots(generateTimeSlots(e.target.value));
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pick up to 3 time slots</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={`rounded-full px-3 py-1 text-sm font-medium border transition ${
                    selectedSlots.includes(slot)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition"
          >
            Submit Appointment
          </button>
        </div>
      </div>
    </main>
  );
};

export default Scheduler;
