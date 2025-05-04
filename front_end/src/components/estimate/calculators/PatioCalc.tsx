"use client";

import { useState } from "react";

export default function PatioCalc() {
  const [size, setSize] = useState<string | null>(null);
  const [flooring, setFlooring] = useState<string | null>(null);
  const [furniture, setFurniture] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Patio Remodel Estimate</h2>

      <div>
        <p className="font-semibold mb-2">Select Patio Size</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Small (<100 sq ft)", value: "small" },
            { label: "Medium (100–300 sq ft)", value: "medium" },
            { label: "Large (>300 sq ft)", value: "large" },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSize(option.value)}
              className={`px-4 py-2 rounded-lg border ${
                size === option.value ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Patio Flooring</p>
        <div className="flex gap-3 flex-wrap">
          {["Pavers", "Wood", "Concrete", "Stone"].map(floor => (
            <button
              key={floor}
              onClick={() => setFlooring(floor)}
              className={`px-4 py-2 rounded-lg border ${
                flooring === floor ? "bg-purple-500 text-white" : "bg-gray-100"
              }`}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Furniture Style</p>
        <div className="flex gap-3 flex-wrap">
          {["None", "Basic", "Premium", "Luxury"].map(furn => (
            <button
              key={furn}
              onClick={() => setFurniture(furn)}
              className={`px-4 py-2 rounded-lg border ${
                furniture === furn ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              {furn}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-medium mb-2">Ready for a more accurate in-person estimate?</p>
        <a
          href="#scheduler"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Schedule Free Estimate
        </a>
      </div>
    </div>
  );
}
