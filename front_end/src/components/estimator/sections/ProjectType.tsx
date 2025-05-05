"use client";

import React from "react";
import { EstimatorSection, ServiceId } from "@/types";
import { getProjectTypes } from "@/lib/estimators/estimate_config";
import { motion } from "framer-motion";

type ProjectTypeProps = {
  setProjectType: (type: string) => void;
  setCurrSection: (section: EstimatorSection) => void;
  selectedService: ServiceId;
};

export default function ProjectType({
  setProjectType,
  setCurrSection,
  selectedService,
}: ProjectTypeProps) {
  const projectTypes = getProjectTypes(selectedService);

  const scheduleEstimateHandler = () => {
    alert("🚀 You have selected to schedule a free in-person estimate!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-white to-gray-100 py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-10 drop-shadow-lg">
        🛠️ Choose Your Project Type
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {projectTypes.map((projectId) => (
          <motion.div
            key={projectId}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl shadow-md cursor-pointer hover:bg-blue-100 transition-all"
            onClick={() => {
              setProjectType(projectId);
              setCurrSection("Size");
            }}
          >
            <h2 className="text-lg font-semibold text-blue-800">{projectId}</h2>
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

      <button
        onClick={() => setCurrSection("Home")}
        className="mt-6 text-blue-500 hover:underline transition"
      >
        ← Back to Home
      </button>
    </div>
  );
}
