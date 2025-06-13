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

export default function EstimatesTable() {
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

  if (loading) return <p>Loading appointments...</p>;
  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div className="space-y-6">
      {appointments.map(appt => (
        <div key={appt.id} className="bg-white border border-gray-300 rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-blue-800">{appt.selectedService}</h2>
            <span className="text-sm text-gray-500">
              {format(new Date(appt.createdAt), 'PPPpp')}
            </span>
          </div>

          <p className="text-gray-700 mb-2">{appt.description}</p>

          <div className="mb-2 text-sm">
            <strong>Preferred Day:</strong> {appt.selectedDay}<br />
            <strong>Time Slots:</strong> {appt.selectedSlots.join(', ')}
          </div>

          <div className="mb-2 text-sm">
            <strong>Customer Info:</strong><br />
            Name: {appt.customerInfo.name}<br />
            Phone: {appt.customerInfo.phone}<br />
            Email: {appt.customerInfo.email}<br />
            Address: {appt.customerInfo.address}<br />
            Consent: {appt.customerInfo.consent ? 'Yes' : 'No'}
          </div>

          {Array.isArray(appt.imageUrls) && appt.imageUrls.length > 0 && (
            <div className="mt-2">
              <strong>Images:</strong>
              <div className="mt-1 flex gap-3 flex-wrap">
                {appt.imageUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border rounded hover:scale-105 transition-transform"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
