'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { all_services } from '@/lib/utils/getService';
import { generateTimeSlots } from '@/lib/utils/generateTimeSlots';
import { UploadCloud } from 'lucide-react';

const MAX_IMAGES = 3;
const todaysDate = new Date().toISOString().split('T')[0];

const Scheduler: React.FC = () => {
  // --- All of your original state hooks ---
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

  // --- All of your original handler functions ---
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
    if (files.length + images.length > MAX_IMAGES) {
        alert(`You can only upload a maximum of ${MAX_IMAGES} images.`);
        return;
    }
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

  // === NEW: Validation check for required fields ===
  const isFormValid = 
    customerInfo.name.trim() !== '' &&
    customerInfo.phone.trim() !== '' &&
    customerInfo.email.trim() !== '' &&
    selectedService.trim() !== '' &&
    description.trim() !== '' &&
    selectedSlots.length > 0;

  // Reusable classes for a consistent input style
  const inputClasses = "w-full bg-[#292524] border border-white/10 rounded-lg px-4 py-2.5 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition";

  return (
    <main 
      
    >
      <div className="max-w-3xl mx-auto bg-[#292524]/50 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/40 space-y-8 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">Schedule an Appointment</h1>
        
        <div className="space-y-4">
          <input type="text" value={customerInfo.name} onChange={(e) => updateCustomerInfo('name', e.target.value)} placeholder="Full Name *" className={inputClasses} />
          <input type="tel" value={customerInfo.phone} onChange={(e) => updateCustomerInfo('phone', e.target.value)} placeholder="Phone Number *" className={inputClasses} />
          <input type="email" value={customerInfo.email} onChange={(e) => updateCustomerInfo('email', e.target.value)} placeholder="Email Address *" className={inputClasses} />
          <input type="text" value={customerInfo.address} onChange={(e) => updateCustomerInfo('address', e.target.value)} placeholder="Project Address" className={inputClasses} />
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input type="checkbox" checked={customerInfo.consent} onChange={(e) => updateCustomerInfo('consent', e.target.checked)} className="h-4 w-4 rounded bg-[#292524] border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]" />
            I consent to be contacted by phone or text
          </label>
        </div>

        <div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe your project... *" rows={4} className={`${inputClasses} resize-none`} />
        </div>

        <div>
          <label className="block font-medium text-gray-300 mb-2">Upload Images (optional)</label>
          <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full cursor-pointer border-2 border-dashed border-white/20 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition">
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-300 font-medium">Click or drag to upload</p>
            <p className="text-xs text-gray-500">Up to {MAX_IMAGES} images</p>
            <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </label>
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                  <Image src={src} alt={`preview-${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className={inputClasses}>
            <option value="">Select a service *</option>
            {all_services.map((s) => (<option key={s.link} value={s.link}>{s.title}</option>))}
            <option value="other">Other</option>
          </select>
          <input type="date" value={selectedDay} min={todaysDate} onChange={(e) => { setSelectedDay(e.target.value); setTimeSlots(generateTimeSlots(e.target.value)); }} className={`${inputClasses} [color-scheme:dark]`} />
        </div>
        
        <div>
          <label className="block text-gray-300 font-medium mb-2">Pick up to 3 preferred time slots *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button key={slot} type="button" onClick={() => toggleSlot(slot)} 
                className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors duration-300 ${
                  selectedSlots.includes(slot)
                    ? 'bg-[#D4AF37] text-stone-900 border-transparent'
                    : 'bg-white/5 text-gray-300 border-white/20 hover:bg-white/10'
                }`}
              >{slot}</button>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          {/* === UPDATED: Submit button is now disabled until the form is valid === */}
          <button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-[#D4AF37] text-stone-900 text-base font-bold px-8 py-3 rounded-full 
                       shadow-lg shadow-black/30 transition-all duration-300
                       hover:bg-amber-400 hover:shadow-xl
                       disabled:bg-stone-600 disabled:text-stone-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Submit Appointment Request
          </button>
        </div>
      </div>
    </main>
  );
};

export default Scheduler;