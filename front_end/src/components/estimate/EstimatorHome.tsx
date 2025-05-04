"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EstimatorCalculator from "./EstimatorCalculator";
import { ServiceId } from "@/types";

type Service = {
  id: ServiceId;
  name: string;
  emoji: string;
};

const services: Service[] = [
  { id: "bathroom", name: "Bathroom Remodel", emoji: "🛁" },
  { id: "kitchen", name: "Kitchen Remodel", emoji: "🍳" },
  { id: "livingRoom", name: "Living Room Remodel", emoji: "🛋️" },
  { id: "patio", name: "Patio Remodel", emoji: "🌿" },
  { id: "bedroom", name: "Bedroom Remodel", emoji: "🛏️" },
  { id: "custom", name: "Custom Project", emoji: "🛠️" },
];

export default function EstimatorHome() {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);

  return (
    <AnimatePresence mode="wait">
      {selectedService === null ? (
        <motion.div
          key="serviceSelection"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="py-20 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center leading-tight">
            Get a Free Online Estimate Today! 💰
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
            What would you like to remodel? 🛠️
          </h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
            Select a service below and start your journey to a beautifully updated home.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(service.id)}
                className="w-36 h-36 bg-white border border-gray-200 hover:border-green-500 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center text-lg font-medium transition-all"
              >
                <span className="text-4xl mb-2">{service.emoji}</span>
                <span>{service.name}</span>
              </motion.button>
            ))}
          </div>

          <p className="text-md text-gray-700 mb-4 text-center">
            Want to talk with us in person instead?
          </p>
          <a
            href="#scheduler"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
          >
            📅 Schedule Free Estimate
          </a>
        </motion.div>
      ) : (
        <motion.div key="calculator">
          <EstimatorCalculator
            service={selectedService}
            onBack={() => setSelectedService(null)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
