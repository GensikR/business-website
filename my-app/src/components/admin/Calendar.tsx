'use client';

import React, { useEffect, useState } from 'react';
import { startOfWeek, addDays, addWeeks, format } from 'date-fns';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Appointment = {
  id: string;
  date: string;
  time: string;
  createdAt: unknown;
};

const Calendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment[] | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const data: Appointment[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          date: d.date,
          time: d.time,
          createdAt: d.createdAt,
        };
      });
      setAppointments(data);
    });
    return () => unsubscribe();
  }, []);

  const getStartDate = () =>
    addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset);

  const getWeeks = () => {
    const start = getStartDate();
    return Array.from({ length: 5 * 7 }, (_, i) => addDays(start, i));
  };

  const handleDayClick = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const appts = appointments.filter((appt) => appt.date === dayStr);
    setSelected(appts);
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-10 bg-gray-100 min-h-screen text-sm">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">📆 Appointment Calendar</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-400 text-sm"
            onClick={() => setWeekOffset((prev) => prev - 5)}
          >
            ← Prev 5 Weeks
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm"
            onClick={() => setWeekOffset((prev) => prev + 5)}
          >
            Next 5 Weeks →
          </button>
        </div>
      </div>

      {/* Calendar Labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-xs">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {getWeeks().map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const dayAppointments = appointments.filter((a) => a.date === dayStr);

          return (
            <button
              key={dayStr}
              onClick={() => handleDayClick(day)}
              className={`rounded-lg p-2 h-20 sm:h-24 flex flex-col items-center justify-between border text-xs transition duration-150 ${
                dayAppointments.length > 0
                  ? 'bg-green-100 border-green-300 hover:shadow-md'
                  : 'bg-white border-gray-300 hover:shadow-sm'
              }`}
            >
              <span className="font-semibold text-gray-700">{format(day, 'MMM d')}</span>
              {dayAppointments.length > 0 && (
                <span className="text-green-700">
                  {dayAppointments.length} appt{dayAppointments.length > 1 ? 's' : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar (below calendar for mobile) */}
      <div className="bg-white rounded-xl shadow p-4 mt-6 sm:mt-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">🗒️ Appointment Details</h2>
        {selected && selected.length > 0 ? (
          <div className="space-y-3">
            {selected.map((appt) => (
              <div key={appt.id} className="border border-gray-200 p-3 rounded-lg bg-gray-50">
                <div><strong>Date:</strong> {appt.date}</div>
                <div><strong>Time:</strong> {appt.time}</div>
                <div className="text-xs text-gray-400">Booked</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Tap a day to view appointments.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
