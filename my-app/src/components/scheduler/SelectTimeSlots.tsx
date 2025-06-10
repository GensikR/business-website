import React from "react";
import { generateTimeSlots } from "@/lib/utils/generateTimeSlots";
import { CalendarDays, Clock } from "lucide-react";

const SelectTimeSlots: React.FC<{
  timeSlots: string[];
  selectedSlots: string[];
  toggleSlot: (slot: string) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  todaysDate: string;
  setTimeSlots: (slots: string[]) => void;
}> = ({
  timeSlots,
  selectedSlots,
  toggleSlot,
  selectedDay,
  setSelectedDay,
  todaysDate,
  setTimeSlots
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-500" />
        4. Choose Up to <span className="text-blue-600">3</span> Preferred Time Slots
      </h2>

      {/* Day Picker */}
      <div className="mb-6">
        <label
          htmlFor="day-picker"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            Select a Day
          </span>
        </label>
        <input
          id="day-picker"
          type="date"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition"
          value={selectedDay}
          min={todaysDate}
          onChange={(e) => {
            const day = e.target.value;
            setSelectedDay(day);
            const newSlots = generateTimeSlots(day);
            setTimeSlots(newSlots);
          }}
        />
      </div>

      {/* Time Slot Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => toggleSlot(slot)}
            className={`p-3 rounded-xl font-medium border text-center shadow-sm transition-all duration-200 ${
              selectedSlots.includes(slot)
                ? "bg-blue-600 text-white border-blue-700 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:shadow"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SelectTimeSlots;
