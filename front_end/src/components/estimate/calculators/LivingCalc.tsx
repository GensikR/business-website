"use client";
import { useState } from "react";

export default function LivingCalc() {
  const [size, setSize] = useState<string | null>(null);
  const [lighting, setLighting] = useState<string | null>(null);
  const [flooring, setFlooring] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Living Room Remodel</h2>

      <div className="mb-4">
        <p className="font-semibold mb-2">Choose Size:</p>
        {[
          { label: "Small (<150 sqft)", value: "small" },
          { label: "Medium (150-300 sqft)", value: "medium" },
          { label: "Large (>300 sqft)", value: "large" },
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
        <p className="font-semibold mb-2">Lighting:</p>
        {["Basic", "Premium", "Luxury", "Other"].map(opt => (
          <button
            key={opt}
            onClick={() => setLighting(opt)}
            className={`px-4 py-2 m-1 rounded-xl border ${lighting === opt ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div>
        <p className="font-semibold mb-2">Flooring:</p>
        {["Vinyl", "Laminate", "Tile", "Hardwood", "Other"].map(opt => (
          <button
            key={opt}
            onClick={() => setFlooring(opt)}
            className={`px-4 py-2 m-1 rounded-xl border ${flooring === opt ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
