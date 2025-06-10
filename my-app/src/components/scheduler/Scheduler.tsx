'use client';

import React, { useState, ChangeEvent } from 'react';
import SelectService from "@/components/scheduler/SelectService";
import DescribeProject from "@/components/scheduler/DescribeProject";
import UploadImages from "@/components/scheduler/UploadImages";
import SelectTimeSlots from "@/components/scheduler/SelectTimeSlots";
import CustomerInfo from "@/components/scheduler/CustomerInfo";
import Submit from "@/components/scheduler/Submit";

const MAX_IMAGES = 3;
const todaysDate = new Date().toISOString().split('T')[0];

const Scheduler: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(todaysDate);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    consent: false,
    email: '',
    address: '',
  });

  const updateCustomerInfo = (field: string, value: string | boolean) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

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
      customerInfo,
    };

    try {
      const res = await fetch('/api/set-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Request submitted! We’ll get back to you shortly.');
        setStep(1);
        setSelectedService('');
        setDescription('');
        setImages([]);
        setImagePreviews([]);
        setSelectedSlots([]);
        setCustomerInfo({
          name: '',
          phone: '',
          consent: false,
          email: '',
          address: '',
        });
      } else {
        alert('There was an error sending your request. Please try again.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 py-20 px-4 md:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl px-10 py-12 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Schedule a Consultation</h1>
          <p className="text-gray-500 text-base">We’ll connect you with a pro at your preferred time</p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="absolute left-0 top-2 h-full w-1 bg-blue-100 rounded"></div>
          <div className="space-y-10 pl-4 md:pl-6">
            {step === 1 && <SelectService selectedService={selectedService} setSelectedService={setSelectedService} />}
            {step === 2 && <DescribeProject description={description} setDescription={setDescription} />}
            {step === 3 && <UploadImages imagePreviews={imagePreviews} handleImageUpload={handleImageUpload} />}
            {step === 4 && (
              <SelectTimeSlots
                timeSlots={timeSlots}
                selectedSlots={selectedSlots}
                toggleSlot={toggleSlot}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                todaysDate={todaysDate}
                setTimeSlots={setTimeSlots}
              />
            )}
            {step === 5 && (
              <CustomerInfo
                name={customerInfo.name}
                phone={customerInfo.phone}
                consent={customerInfo.consent}
                email={customerInfo.email}
                address={customerInfo.address}
                onChange={updateCustomerInfo}
              />
            )}
            {step === 6 && (
              <Submit
                selectedService={selectedService}
                description={description}
                selectedSlots={selectedSlots}
                images={images}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center border-t pt-8 mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              ← Back
            </button>
          ) : <span />}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className={`inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow transition ${
                (step === 1 && !selectedService) ||
                (step === 2 && !description) ||
                (step === 4 && selectedSlots.length === 0) ||
                (step === 5 && (!customerInfo.name || !customerInfo.phone))
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && !description) ||
                (step === 4 && selectedSlots.length === 0) ||
                (step === 5 && (!customerInfo.name || !customerInfo.phone))
              }
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow transition"
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
