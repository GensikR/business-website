"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import EstimatorCalculator from "./EstimatorCalculator";

type Service = {
  id: "bathroom" | "kitchen" | "livingRoom" | "patio" | "bedroom" | "custom"; // updated to camel case
  name: string;
  emoji: string;
};

const services: Service[] = [
  {
    id: "bathroom",
    name: "Bathroom Remodel",
    emoji: "🛁",
  },
  {
    id: "kitchen",
    name: "Kitchen Remodel",
    emoji: "🍳",
  },
  {
    id: "livingRoom", // updated to camel case
    name: "Living Room Remodel",
    emoji: "🛋️",
  },
  {
    id: "patio",
    name: "Patio Remodel",
    emoji: "🌿",
  },
  {
    id: "bedroom",
    name: "Bedroom Remodel",
    emoji: "🛏️",
  },
  {
    id: "custom",
    name: "Custom Project",
    emoji: "🛠️",
  }
];

type ServiceId = "bathroom" | "kitchen" | "livingRoom" | "patio" | "bedroom" | "custom";

export default function EstimatorHome() {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);

  if (selectedService === null) {
    return (
      <div className="py-16 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          What would you like to remodel? 🛠️
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
          Tap a service below to begin your journey to a beautiful new space.
        </p>
  
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedService(service.id)}
              className={`w-36 h-36 rounded-3xl shadow-md flex flex-col items-center justify-center text-lg font-semibold transition-all duration-300 border-2 ${
                selectedService === service.id
                  ? "bg-white border-green-500 text-green-600"
                  : "bg-white border-transparent text-gray-800"
              }`}
            >
              <span className="text-4xl mb-2">{service.emoji}</span>
              {service.name}
            </motion.button>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <EstimatorCalculator service={selectedService} onBack={() => setSelectedService(null)} />
    );
  }
}
