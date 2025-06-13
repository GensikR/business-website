import AppointmentView from '@/components/admin/AppointmentView'

export const dynamic = 'force-dynamic'; // Forces fresh data on every request

export default function AdminAppointmentsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Customer Appointments</h1>
      <AppointmentView />
    </main>
  );
}
