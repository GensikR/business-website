// app/admin/estimates/page.tsx
"use client;"
import { db } from '@/lib/utils/firebase_db';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

type Appointment = {
  id: string;
  selectedService: string;
  description: string;
  selectedSlots: string[];
  selectedDay?: string;
  createdAt: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    consent: boolean;
  };
  imageUrls?: string[];
};

async function getAppointments(): Promise<Appointment[]> {
  const snapshot = await db.collection('appointments').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Appointment[];
}

export default async function AdminEstimatesPage() {
  const appointments = await getAppointments();

  return (
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">📋 Appointments Overview</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(appt => (
            <AppointmentCard key={appt.id} appt={appt} />
          ))}
        </div>
      )}
    </main>
  );
}

function AppointmentCard({ appt }: { appt: Appointment }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transition hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-blue-800">{appt.selectedService}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Submitted: {format(new Date(appt.createdAt), 'PPpp')}
          </p>
        </div>
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="text-blue-600 hover:text-blue-800"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <div>
            <strong>Description:</strong>
            <p className="text-gray-800 whitespace-pre-wrap">{appt.description}</p>
          </div>

          <div>
            <strong>Preferred Day:</strong> {appt.selectedDay || 'Not specified'}
          </div>

          <div>
            <strong>Time Slots:</strong>{' '}
            {appt.selectedSlots.length > 0 ? appt.selectedSlots.join(', ') : 'None'}
          </div>

          <div className="pt-2">
            <strong>Customer Info:</strong>
            <ul className="ml-4 list-disc text-sm mt-1">
              <li><strong>Name:</strong> {appt.customerInfo.name}</li>
              <li><strong>Phone:</strong> {appt.customerInfo.phone}</li>
              <li><strong>Email:</strong> {appt.customerInfo.email}</li>
              <li><strong>Address:</strong> {appt.customerInfo.address}</li>
              <li>
                <strong>Consent:</strong>{' '}
                {appt.customerInfo.consent ? '✅ Given' : '❌ Not Given'}
              </li>
            </ul>
          </div>

          {appt.imageUrls?.length ? (
            <div className="pt-2">
              <strong>Uploaded Images:</strong>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {appt.imageUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Upload ${idx + 1}`}
                    className="rounded-lg shadow border object-cover h-32 w-full"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="pt-2 italic text-gray-400">No images uploaded</p>
          )}
        </div>
      )}
    </div>
  );
}
