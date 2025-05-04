"use client";

import { ServiceId } from "@/types";
import BathCalc from "@/components/estimate/calculators/BathCalc";
import KitchenCalc from "@/components/estimate/calculators/KitchenCalc";
import LivingCalc from "@/components/estimate/calculators/LivingCalc";
import PatioCalc from "@/components/estimate/calculators/PatioCalc";
import BedroomCalc from "@/components/estimate/calculators/BedroomCalc";
import CustomCalc from "@/components/estimate/calculators/CustomCalc";

type EstimatorCalculatorProps = {
  service: ServiceId;
  onBack: () => void;
};

export default function EstimatorCalculator({ service, onBack }: EstimatorCalculatorProps) {
  const renderCalculator = () => {
    switch (service) {
      case "bathroom":
        return <BathCalc />;
      case "kitchen":
        return <KitchenCalc />;
      case "livingRoom":
        return <LivingCalc />;
      case "patio":
        return <PatioCalc />;
      case "bedroom":
        return <BedroomCalc />;
      case "custom":
        return <CustomCalc />;
      default:
        return null;
    }
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={onBack}
        className="text-md text-blue-600 mb-6 underline hover:text-blue-800 transition"
      >
        ← Back to services
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl transition-all duration-300">
        {renderCalculator()}
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-gray-700 mb-4">Need a more accurate quote?</p>
        <a
          href="#scheduler"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
        >
          📅 Schedule Free Estimate
        </a>
      </div>
    </div>
  );
}
