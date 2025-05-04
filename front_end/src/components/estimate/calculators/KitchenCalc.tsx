"use client";
import { useState } from "react";

export default function KitchenCalc() 
{
  const [size, setSize] = useState<string | null>(null);
  const [countertop, setCountertop] = useState<string | null>(null);
  const [cabinet, setCabinet] = useState<string | null>(null);
  const [appliance, setAppliance] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kitchen Remodel</h2>

      <div className="mb-4">
        <p className="font-semibold mb-2">Choose Size:</p>
        {[
          { label: "Small (<100 sqft)", value: "small" },
          { label: "Medium (100-250 sqft)", value: "medium" },
          { label: "Large (>250 sqft)", value: "large" },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setSize(opt.value)}
            className={`px-4 py-2 m-1 rounded-xl border ${size === opt.value ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Countertops:</p>
        {["Laminate", "Granite", "Quartz", "Marble", "Other"].map(opt => (
          <button
            key={opt}
            onClick={() => setCountertop(opt)}
            className={`px-4 py-2 m-1 rounded-xl border ${countertop === opt ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Cabinets:</p>
        {["Refinish", "Replace", "Custom", "Other"].map(opt => (
          <button
            key={opt}
            onClick={() => setCabinet(opt)}
            className={`px-4 py-2 m-1 rounded-xl border ${cabinet === opt ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div>
        <p className="font-semibold mb-2">Appliances:</p>
        {["Basic", "Premium", "Luxury", "Other"].map(opt => (
          <button
            key={opt}
            onClick={() => setAppliance(opt)}
            className={`px-4 py-2 m-1 rounded-xl border ${appliance === opt ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}