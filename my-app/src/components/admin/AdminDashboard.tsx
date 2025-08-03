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

// Section keys (string literal union)
type SectionKey = 'appointments' | 'calendar' | 'gallery' | 'inbox' | 'portfolio';

// Placeholder components for each section
const Appointments = () => <div className="text-center py-10">📋 Appointments View</div>;
const Calendar = () => <div className="text-center py-10">📆 Calendar View</div>;
const Gallery = () => <div className="text-center py-10">🖼️ Gallery Editor</div>;
const Inbox = () => <div className="text-center py-10">📨 Inbox</div>;
const Portfolio = () => <div className="text-center py-10">🗂️ Portfolio Manager</div>;

// Instead of typing the object with JSX.Element, we'll let TS infer it
const sections = {
  appointments: <Appointments />,
  calendar: <Calendar />,
  gallery: <Gallery />,
  inbox: <Inbox />,
  portfolio: <Portfolio />,
};

const options = [
  { id: 'appointments', label: 'Manage Appointments', icon: ClipboardList },
  { id: 'calendar', label: 'Calendar View', icon: CalendarCheck },
  { id: 'gallery', label: 'Edit Gallery', icon: ImagePlus },
  { id: 'inbox', label: 'Check Inbox', icon: MessageSquareText },
  { id: 'portfolio', label: 'Update Portfolio', icon: Layers },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<SectionKey | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-200 p-6">
      <div className="max-w-md mx-auto text-center space-y-6">
        {!activeTab && (
          <>
            <h1 className="text-2xl font-bold text-blue-800">
              🎮 What do you want to do today?
            </h1>
            <p className="text-gray-600 text-sm">Tap a button to manage your tasks.</p>

            <div className="space-y-4 mt-6">
              {options.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as SectionKey)}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white shadow-md border border-blue-200 hover:bg-blue-50 active:scale-95 transition text-left"
                >
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-blue-800 font-semibold text-base">{label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab && (
          <div className="text-left">
            <button
              onClick={() => setActiveTab(null)}
              className="mb-6 flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>

            <div className="bg-white rounded-xl shadow p-4">{sections[activeTab]}</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
