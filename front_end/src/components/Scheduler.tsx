"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

// Function to generate weekdays excluding Sunday
const generateWeekdays = (count: number) => 
{
    const days: string[] = [];
    let date = new Date();

    // Start from the next day
    date.setDate(date.getDate() + 1);

    while (days.length < count) {
        if (date.getDay() !== 0) { // Exclude Sundays
        days.push(date.toISOString().split("T")[0]);
        }
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

export default function Scheduler() {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setAvailableDates(generateWeekdays(7)); // Get next 7 days excluding Sunday
  }, []);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setConfirmed(true);
    }
  };

  const handleBack = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(false);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 text-center">
        {selectedDate
          ? `Choose a time for ${formatDate(selectedDate)}:`
          : "Schedule Your In-Person Estimate 📅"}
      </h2>

      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
        {!selectedDate &&
          "Pick a date that works for you — then we’ll ask what time you'd like to meet!"}
      </p>

      {!selectedDate && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {availableDates.map((date) => (
            <motion.button
              key={date}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedDate(date);
                setConfirmed(false);
              }}
              className="px-5 py-3 rounded-2xl shadow-md border bg-white text-gray-800 border-transparent hover:border-blue-400 transition-all text-sm font-semibold"
            >
              <FaCalendarAlt className="inline mr-2 text-blue-500" />
              {new Date(date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </motion.button>
          ))}
        </div>
      )}

      {selectedDate && (
        <>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedTime(slot);
                  setConfirmed(false);
                }}
                className={`px-5 py-2.5 rounded-2xl shadow-md text-sm font-semibold transition duration-300 ${
                  selectedTime === slot
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <FaClock className="inline mr-2 text-blue-400" />
                {slot}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleBack}
            className="mb-6 px-6 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 border border-blue-200 shadow-sm transition-all duration-300 flex items-center font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Date Selection
          </motion.button>
        </>
      )}

      {selectedDate && selectedTime && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleConfirm}
          className="mt-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition"
        >
          <FaCheckCircle className="inline mr-2 mb-1" />
          Confirm Date
        </motion.button>
      )}

      {confirmed && (
        <motion.div
          className="mt-8 text-green-700 font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ✅ Booked for{" "}
          <span className="font-bold text-gray-800">
            {formatDate(selectedDate!)} at {selectedTime}
          </span>
        </motion.div>
      )}
    </div>
  );
}
