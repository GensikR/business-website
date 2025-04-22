"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EstimatorResults from "./EstimatorResult";

type ServiceId = "bathroom" | "kitchen" | "livingRoom" | "patio" | "bedroom" | "custom";

const servicesInputs: Record<ServiceId, { label: string; name: string; type: string; placeholder?: string; options?: string[] }[]> = {
  bathroom: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Tile Work", name: "tileWork", type: "checkbox" },
    { label: "Bathtub", name: "bathtub", type: "checkbox" },
    { label: "Vanity", name: "vanity", type: "checkbox" },
  ],
  kitchen: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Countertops", name: "countertops", type: "select", options: ["none", "laminate", "granite", "quartz", "marble"] },
    { label: "Cabinets", name: "cabinets", type: "select", options: ["none", "refinish", "replace", "custom"] },
    { label: "Appliances", name: "appliances", type: "select", options: ["none", "basic", "premium", "luxury"] },
  ],
  livingRoom: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Lighting", name: "lighting", type: "select", options: ["none", "basic", "premium", "luxury"] },
    { label: "Flooring", name: "flooring", type: "select", options: ["none", "vinyl", "laminate", "tile", "hardwood"] },
  ],
  patio: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Patio Flooring", name: "patioFlooring", type: "select", options: ["none", "pavers", "wood", "concrete"] },
    { label: "Patio Furniture", name: "patioFurniture", type: "select", options: ["none", "basic", "premium", "luxury"] },
  ],
  bedroom: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Lighting", name: "lighting", type: "select", options: ["none", "basic", "premium", "luxury"] },
    { label: "Flooring", name: "flooring", type: "select", options: ["none", "vinyl", "laminate", "tile", "hardwood"] },
  ],
  custom: [
    { label: "Square Footage", name: "squareFootage", type: "number", placeholder: "Enter square footage" },
    { label: "Custom Input", name: "customInput", type: "text", placeholder: "Describe your custom project" },
  ]
};

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  value: any;
  options?: string[];
  onChange: (name: string, value: any) => void;
};

const InputField = ({ label, name, type, value, options, onChange }: InputFieldProps) => {
  if (type === "number" || type === "text") {
    return (
      <div className="mb-6">
        <label className="block text-xl text-gray-800 font-medium">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={label}
          className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>
    );
  } else if (type === "checkbox") {
    return (
      <div className="mb-6 flex items-center space-x-3">
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={(e) => onChange(name, e.target.checked)}
          className="h-6 w-6 text-blue-600 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-lg">{label}</label>
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="mb-6">
        <label className="block text-xl text-gray-800 font-medium">{label}</label>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return null;
};

type EstimatorCalculatorProps = {
  service: ServiceId;
  onBack: () => void;
};

export default function EstimatorCalculator({ service, onBack }: EstimatorCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const serviceInputs = servicesInputs[service];
    for (const input of serviceInputs) {
      if (input.type === "number" && (!inputs[input.name] || Number(inputs[input.name]) <= 0)) {
        setError(`Please enter a valid ${input.label}.`);
        return false;
      }
      if (input.type === "text" && !inputs[input.name]) {
        setError(`Please enter a valid ${input.label}.`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleCalculate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setShowResults(true);
    }
  };

  const serviceInputs = servicesInputs[service];

  return (
    <div className="py-16 px-8 bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300 min-h-screen">
      <button onClick={onBack} className="text-xl mb-6 text-blue-600 flex items-center space-x-2">
        <span>🔙</span>
        <span>Back</span>
      </button>
      <h2 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">{service} Remodel</h2>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {serviceInputs.map((input) => (
              <InputField
                key={input.name}
                label={input.label}
                name={input.name}
                type={input.type}
                value={inputs[input.name] || ""}
                options={input.options}
                onChange={handleInputChange}
              />
            ))}

            {error && <p className="text-red-600 text-center text-lg">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition duration-300"
            >
              <span>💡</span>
              <span>Calculate Estimate</span>
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <EstimatorResults inputs={inputs} service={service} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
