import React from "react";
import { all_services } from "@/lib/utils/getService";
import { Sparkles } from "lucide-react"; // Optional: Replace with your preferred icon

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
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-yellow-500 w-6 h-6" />
        1. Select a Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {servicesWithOther.map((service) => {
          const isSelected = selectedService === service.link;

          return (
            <button
              key={service.link}
              onClick={() => setSelectedService(service.link)}
              className={`text-left rounded-2xl border shadow-sm p-6 transition-all duration-200 ease-in-out hover:shadow-lg hover:border-blue-400 group
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 bg-white"
                }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                  {service.title}
                </h3>
                {isSelected && (
                  <span className="text-sm text-green-600 font-medium">
                    Selected ✓
                  </span>
                )}
              </div>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
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
