"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectType from "@/components/estimator/sections/ProjectType";
import Size from "@/components/estimator/sections/Size";
import Materials from "@/components/estimator/sections/Materials";
import Results from "@/components/estimator/sections/Result";
import { ServiceId, ServiceButton, EstimatorSection } from "@/types";

const servicesButtons: ServiceButton[] = [
  { id: "bathroom", name: "Bathroom Remodel", emoji: "🛁" },
  { id: "kitchen", name: "Kitchen Remodel", emoji: "🍳" },
  { id: "livingRoom", name: "Living Room Remodel", emoji: "🛋️" },
  { id: "patio", name: "Patio Remodel", emoji: "🌿" },
  { id: "bedroom", name: "Bedroom Remodel", emoji: "🛏️" },
  { id: "custom", name: "Custom Project", emoji: "🛠️" },
];

export default function EstimatorHome() {
  const [currSection, setCurrSection] = useState<EstimatorSection>("Home");
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [projectType, setProjectType] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [materials, setMaterial] = useState<string>("null");
  const [results, setResults] = useState<any>(null);

  const scheduleEstimateHandler = () => {
    alert("You have selected to schedule a free in-person estimate!");
  };

  const renderServiceSelection = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow-lg"
      >
        Estimate Your Dream Project ✨
      </motion.h1>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
        {servicesButtons.map((service, i) => (
          <motion.div
            key={service.id}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:border-indigo-400 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            onClick={() => {
              setSelectedService(service.id);
              setCurrSection("ProjectType");
            }}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-200">
              {service.emoji}
            </span>
            <h2 className="text-lg font-medium text-gray-800 text-center group-hover:text-indigo-600">
              {service.name}
            </h2>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 py-3 px-6 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
        onClick={scheduleEstimateHandler}
      >
        🚀 Schedule a Free In-Person Estimate
      </motion.button>
    </div>
  );

  const renderSectionContent = () => {
    switch (currSection) {
      case "ProjectType":
        return (
          <ProjectType
            setProjectType={setProjectType}
            setCurrSection={setCurrSection}
            selectedService={selectedService!}
          />
        );
      case "Size":
        return <Size setSize={setSize} setCurrSection={setCurrSection} />;
      case "Materials":
        return (
          <Materials
            setMaterial={setMaterial}
            setCurrSection={setCurrSection}
            selectedService={selectedService!}
          />
        );
      case "Result":
        return <div>{/* TODO: Implement results */}</div>;
      default:
        return <div className="text-red-600 text-center">Error: Invalid Section</div>;
    }
  };

  return (
    <div className="relative min-h-screen">
      {currSection === "Home" ? renderServiceSelection() : renderSectionContent()}
    </div>
  );
}
