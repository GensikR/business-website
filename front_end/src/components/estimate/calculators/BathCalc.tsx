"use client";

import { useState } from "react";

export default function BathCalc() {
  const [size, setSize] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bathroom Remodel</h2>

      <div className="mb-6">
        <p className="font-semibold mb-2">Choose Size:</p>
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Small (<50 sqft)", value: "small" },
            { label: "Medium (50-100 sqft)", value: "medium" },
            { label: "Large (>100 sqft)", value: "large" },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setSize(opt.value)}
              className={`px-4 py-2 rounded-xl border ${
                size === opt.value ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Select Features:</p>
        <div className="flex gap-4 flex-wrap">
          {["Tile Work", "Bathtub", "Vanity"].map(feature => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={`px-4 py-2 rounded-xl border ${
                features.includes(feature)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
