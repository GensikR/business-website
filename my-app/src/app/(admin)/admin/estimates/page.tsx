// app/admin/estimates/page.tsx
import { db } from '@/lib/utils/firebase_db';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic'; // 👈 This is key

type Appointment = {
  id: string;
  selectedService: string;
  description: string;
  selectedSlots: string[];
  createdAt: string;
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
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Customer Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(appt => (
            <div
              key={appt.id}
              className="border border-gray-300 rounded-xl p-4 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">{appt.selectedService}</h2>
              <p className="text-gray-700 mt-1">{appt.description}</p>
              <p className="text-sm mt-2">
                <strong>Preferred Time Slots:</strong>{' '}
                {appt.selectedSlots.join(', ')}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Submitted: {format(new Date(appt.createdAt), 'PPPpp')}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
