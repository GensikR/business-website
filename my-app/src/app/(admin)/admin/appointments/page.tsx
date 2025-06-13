import nextDynamic from 'next/dynamic';

export const dynamic = 'force-dynamic'; // Ensure server renders fresh data

const EstimatesTable = nextDynamic(() => import('@/components/admin/EstimatesTable'), {
  ssr: false, // Ensure it's a client component
});

export default function AdminEstimatesPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Customer Appointments</h1>
      <EstimatesTable />
    </main>
  );
}
