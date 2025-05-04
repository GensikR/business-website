"use client";

import { useState } from "react";

export default function CustomCalc() {
  const [size, setSize] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Custom Project Estimate</h2>

      <div>
        <p className="font-semibold mb-2">Select Project Size</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Small (<150 sq ft)", value: "small" },
            { label: "Medium (150–500 sq ft)", value: "medium" },
            { label: "Large (>500 sq ft)", value: "large" },
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
        <p className="font-semibold mb-2">Describe Your Project</p>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Tell us more about what you need..."
          className="w-full p-3 border rounded-lg resize-none"
          rows={4}
        />
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
