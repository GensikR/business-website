"use client";
import React, { useEffect, useState } from "react";
import {
  startOfWeek,
  addDays,
  addWeeks,
  format,
  isSameDay,
} from "date-fns";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/lib/fb_config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Appointment = {
  id: string;
  date: string;
  time: string;
  createdAt: any;
};

const Calendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment[] | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
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
    const dayStr = format(day, "yyyy-MM-dd");
    const appts = appointments.filter((appt) => appt.date === dayStr);
    setSelected(appts);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100 p-6">
      {/* Calendar Section */}
      <div className="lg:w-3/4 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Appointment Calendar</h1>
          <div className="space-x-2">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setWeekOffset((prev) => prev - 5)}
            >
              ← Previous 5 Weeks
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setWeekOffset((prev) => prev + 5)}
            >
              Next 5 Weeks →
            </button>
          </div>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold text-gray-600">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {getWeeks().map((day) => {
            const dayStr = format(day, "yyyy-MM-dd");
            const dayAppointments = appointments.filter((a) => a.date === dayStr);
            return (
              <div
                key={dayStr}
                className={`rounded-lg p-3 border h-28 shadow transition duration-200 cursor-pointer flex flex-col justify-between ${
                  dayAppointments.length > 0
                    ? "bg-green-100 border-green-300 hover:shadow-lg"
                    : "bg-white border-gray-300 hover:shadow"
                }`}
                onClick={() => handleDayClick(day)}
              >
                <div className="text-sm font-bold text-gray-700">{format(day, "MMM d")}</div>
                {dayAppointments.length > 0 && (
                  <div className="text-xs text-green-700">
                    {dayAppointments.length} appointment{dayAppointments.length > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-1/4 w-full bg-white shadow-lg mt-6 lg:mt-0 lg:ml-6 rounded-xl p-5">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Appointment Details</h2>
        {selected && selected.length > 0 ? (
          <div className="space-y-4">
            {selected.map((appt) => (
              <div key={appt.id} className="border p-3 rounded shadow-sm bg-gray-50">
                <div><span className="font-medium">Date:</span> {appt.date}</div>
                <div><span className="font-medium">Time:</span> {appt.time}</div>
                <div className="text-xs text-gray-400">
                  Booked {appt.createdAt?.toDate && format(appt.createdAt.toDate(), "PPpp")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Click a day to see its appointments.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
