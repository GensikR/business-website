'use client';
import React from "react";
import { all_services } from "@/lib/utils/getService";
import { Sparkles } from "lucide-react";

const SelectService: React.FC<{
  selectedService: string;
  setSelectedService: (service: string) => void;
}> = ({ selectedService, setSelectedService }) => {
  const servicesWithOther = [
    ...all_services,
    {
      link: "other",
      title: "Other",
      description: "Custom service or something not listed here.",
    },
  ];

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4 sm:mb-6 flex items-center gap-2">
        <Sparkles className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
        1. Select a Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {servicesWithOther.map((service) => {
          const isSelected = selectedService === service.link;

          return (
            <button
              key={service.link}
              onClick={() => setSelectedService(service.link)}
              className={`text-left rounded-xl border shadow-sm p-4 sm:p-6 transition hover:shadow-md hover:border-blue-400 group
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 bg-white"
                }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                  {service.title}
                </h3>
                {isSelected && (
                  <span className="text-xs text-green-600 font-medium">
                    ✓
                  </span>
                )}
              </div>
              <p className="mt-1 sm:mt-2 text-gray-600 text-sm leading-snug hidden sm:block">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SelectService;
