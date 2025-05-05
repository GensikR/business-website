"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type EstimatorResultsProps = 
{
  inputs: Record<string, any>;
  service: string;
};

interface LineItem {
  name: string;
  cost: number;
}

const buildEstimate = (inputs: Record<string, any>): LineItem[] => {
  // Build a raw list, possibly containing nulls
  const raw: (LineItem | null)[] = [
    { name: "Square Footage", cost: Number(inputs.squareFootage) * 10 },
    inputs.tileWork ? { name: "Tile Work", cost: 500 } : null,
    inputs.bathtub ? { name: "Bathtub Installation", cost: 700 } : null,
    inputs.vanity ? { name: "Vanity", cost: 300 } : null,
    // … add more based on other inputs …
  ];

  // Filter out nulls with a user-defined type guard
  const filtered = raw.filter(
    (item): item is LineItem => item !== null
  );

  return filtered;
};

export default function EstimatorResults({ inputs, service }: EstimatorResultsProps) {
  const [items, setItems] = useState<LineItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const estimateItems = buildEstimate(inputs);
    setItems(estimateItems);
    // Now TS knows estimateItems is LineItem[], so we can safely reduce
    const sum = estimateItems.reduce((acc, item) => acc + item.cost, 0);
    setTotal(sum);
  }, [inputs]);

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <motion.div
          className="relative bg-white p-8 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated paper texture */}
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 animate-pulse"></div>

          <h2 className="relative text-3xl font-bold text-center mb-6 text-gray-800">
            {service.charAt(0).toUpperCase() + service.slice(1)} Estimate
          </h2>

          <div className="relative space-y-4">
            {items.map((item) => (
              <div key={item.name} className="flex justify-between text-lg">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-gray-900">${item.cost.toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 shadow-md"
            onClick={() => alert("Recalculating...")}
          >
            <span>🔄</span>
            <span>Schedule a final estimate</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
