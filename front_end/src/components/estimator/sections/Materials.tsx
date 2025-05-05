"use client";

import React from "react";
import { EstimatorSection, ServiceId } from "@/types";
import { getMaterialOptions } from "@/lib/estimators/estimate_config";
import { motion } from "framer-motion";

type MaterialsProps = {
  setMaterial: (material: string) => void;
  setCurrSection: (section: EstimatorSection) => void;
  selectedService: ServiceId;
};

export default function Materials({
  setMaterial: setMaterialOption,
  setCurrSection,
  selectedService,
}: MaterialsProps) {
  const materialOptions = getMaterialOptions(selectedService);

  const scheduleEstimateHandler = () => {
    alert("🚀 You have selected to schedule a free in-person estimate!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 to-gray-200 py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-10 drop-shadow-lg">
        ✨ Choose Your Material Option
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {materialOptions.length === 0 ? (
          <motion.div
            className="col-span-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-400 rounded-xl shadow-lg bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-medium text-gray-600">No materials available for this project.</h2>
          </motion.div>
        ) : (
          materialOptions.map((materialOption) => (
            <motion.div
              key={materialOption}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl shadow-md cursor-pointer hover:bg-blue-100 transition-all"
              onClick={() => {
                setMaterialOption(materialOption);
                setCurrSection("Result");
              }}
            >
              <h2 className="text-lg font-semibold text-blue-800">{materialOption}</h2>
            </motion.div>
          ))
        )}
      </div>

      <motion.button
        className="mt-12 py-3 px-6 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
        whileHover={{ scale: 1.05 }}
        onClick={scheduleEstimateHandler}
      >
        🚀 Schedule a Free In-Person Estimate
      </motion.button>

      <button
        onClick={() => setCurrSection("Size")}
        className="mt-6 text-blue-500 hover:underline transition"
      >
        ← Back to Size
      </button>
    </div>
  );
}
