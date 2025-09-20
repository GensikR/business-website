'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  ImagePlus,
  MessageSquareText,
  ClipboardList,
  Layers,
  ArrowLeft
} from 'lucide-react';
import Appointments from "@/components/admin/Appointments"
import Calendar from "@/components/admin/Calendar"
import GalleryAdmin from './GalleryAdmin';
import Inbox from './inbox/Inbox';
import PortfolioAdmin from './PortfolioAdmin';
import Employees from './employees/Employees';
import Jobs from './jobs/Jobs'

type SectionKey = 'appointments' | 'calendar' | 'gallery' | 'inbox' | 'portfolio' | 'employees' | 'jobs';

const sections: Record<SectionKey, React.ReactNode> = {
  appointments: <Appointments />,
  calendar: <Calendar />,
  gallery: <GalleryAdmin />,
  inbox: <Inbox />,
  portfolio: <PortfolioAdmin />,
  employees: <Employees />,
  jobs: <Jobs />,
};

const options: { id: SectionKey; label: string; icon: React.ElementType }[] = [
  { id: 'appointments', label: 'Appointments', icon: ClipboardList },
  { id: 'calendar', label: 'Calendar', icon: CalendarCheck },
  { id: 'gallery', label: 'Gallery', icon: ImagePlus },
  { id: 'inbox', label: 'Inbox', icon: MessageSquareText },
  { id: 'portfolio', label: 'Portfolio', icon: Layers },
  { id: 'employees', label: 'Employees', icon: Layers},
  { id: 'jobs', label: 'Jobs', icon: Layers},
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<SectionKey | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-200 p-4 sm:p-6">
      <div className="max-w-sm mx-auto text-center space-y-6">
        {!activeTab && (
          <>
            <h1 className="text-xl font-bold text-blue-800">
              What would you like to manage?
            </h1>
            <p className="text-gray-600 text-sm">Tap a tool below to begin</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {options.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white shadow border border-blue-200 hover:bg-blue-50 active:scale-95 transition text-xs font-medium text-blue-700"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab && (
          <div className="text-left">
            <button
              onClick={() => setActiveTab(null)}
              className="mb-4 flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>

            <div className="bg-white rounded-xl shadow p-4">{sections[activeTab]}</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
