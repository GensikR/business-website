'use client';

import React, { useState, ChangeEvent } from 'react';
import { services } from '@/lib/utils/getService'; // reuse your services list
import Image from 'next/image';

const MAX_IMAGES = 3;

const Scheduler: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const timeSlots = [
    'Monday 10am',
    'Tuesday 2pm',
    'Wednesday 4pm',
    'Thursday 11am',
    'Friday 1pm',
    'Saturday 3pm',
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > MAX_IMAGES) return;

    const previews = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : prev.length < 3
        ? [...prev, slot]
        : prev
    );
  };

  const handleSubmit = async () => {
    const payload = {
      selectedService,
      description,
      selectedSlots,
    };

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Request submitted! We’ll get back to you shortly.');
      } else {
        alert('There was an error sending your request. Please try again.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-blue-700 text-center">Schedule a Consultation</h1>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Select a Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(service => (
                <button
                  key={service.link}
                  className={`border rounded-xl p-4 hover:bg-blue-50 transition ${
                    selectedService === service.link ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedService(service.link)}
                >
                  <h3 className="font-semibold text-blue-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">2. Describe Your Project</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 min-h-[120px]"
              placeholder="Tell us what you need..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">3. Upload Reference Images (Optional)</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="w-24 h-24 relative">
                  <Image src={src} alt="preview" fill className="object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">4. Choose Up to 3 Preferred Time Slots</h2>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => toggleSlot(slot)}
                  className={`p-3 rounded-xl border transition ${
                    selectedSlots.includes(slot)
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">5. Review & Submit</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Service:</strong> {services.find(s => s.link === selectedService)?.title}</li>
              <li><strong>Description:</strong> {description}</li>
              <li><strong>Time Slots:</strong> {selectedSlots.join(', ')}</li>
              <li><strong>Images:</strong> {images.length} uploaded</li>
            </ul>
          </div>
        )}

        {/* Step Navigation */}
        <div className="flex justify-between pt-6 border-t mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back
            </button>
          ) : <span />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full flex items-center gap-2"
              disabled={(step === 1 && !selectedService) || (step === 2 && !description)}
            >
              Next
              {/* Inline SVG arrow replacing FaArrowRight */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
            >
              Submit Request
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Scheduler;
