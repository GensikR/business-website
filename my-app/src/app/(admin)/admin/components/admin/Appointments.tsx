'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

type Appointment = {
  id: string;
  selectedService: string;
  description: string;
  selectedSlots: string[];
  selectedDay: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    consent: boolean;
  };
  imageUrls?: string[];
  createdAt: string;
};

export default function AppointmentView() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/get-appointments');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to load appointments:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  if (loading) {
    return <p className="text-center text-sm text-gray-500">Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p className="text-center text-sm text-gray-500">No appointments found.</p>;
  }

  return (
    <div className="space-y-6">
      {appointments.map((appt) => (
        <div
          key={appt.id}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4"
        >
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-blue-800">{appt.selectedService}</h2>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {format(new Date(appt.createdAt), 'PPPpp')}
            </span>
          </div>

          <p className="text-gray-700 text-sm whitespace-pre-line">{appt.description}</p>

          <div className="text-sm text-gray-700">
            <div>
              <strong className="block text-gray-600 font-medium mb-1">Preferred Time</strong>
              <div className="text-gray-800">
                📅 {appt.selectedDay}
                <br />
                🕒 {appt.selectedSlots.join(', ')}
              </div>
            </div>

            <div className="mt-4">
              <strong className="block text-gray-600 font-medium mb-1">Customer Info</strong>
              <div className="text-gray-800">
                👤 {appt.customerInfo.name}
                <br />
                📞 {appt.customerInfo.phone}
                <br />
                📧 {appt.customerInfo.email}
                <br />
                📍 {appt.customerInfo.address}
                <br />
                Consent: {appt.customerInfo.consent ? '✅ Yes' : '❌ No'}
              </div>
            </div>
          </div>

          {appt.imageUrls?.length ? (
            <div className="mt-4">
              <strong className="text-sm text-gray-800">Images</strong>
              <div className="mt-2 flex gap-3 overflow-x-auto">
                {appt.imageUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
