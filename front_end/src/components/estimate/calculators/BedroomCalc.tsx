"use client";

import { useState } from "react";

export default function BedroomCalc() {
  const [size, setSize] = useState<string | null>(null);
  const [flooring, setFlooring] = useState<string | null>(null);
  const [closet, setCloset] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Bedroom Remodel Estimate</h2>

      <div>
        <p className="font-semibold mb-2">Select Bedroom Size</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Small (<120 sq ft)", value: "small" },
            { label: "Medium (120–250 sq ft)", value: "medium" },
            { label: "Large (>250 sq ft)", value: "large" },
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
        <p className="font-semibold mb-2">Select Flooring Type</p>
        <div className="flex gap-3 flex-wrap">
          {["Carpet", "Wood", "Vinyl", "Laminate"].map(floor => (
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
        <p className="font-semibold mb-2">Closet Style</p>
        <div className="flex gap-3 flex-wrap">
          {["Standard", "Walk-in", "Custom Built-in", "None"].map(style => (
            <button
              key={style}
              onClick={() => setCloset(style)}
              className={`px-4 py-2 rounded-lg border ${
                closet === style ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              {style}
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
