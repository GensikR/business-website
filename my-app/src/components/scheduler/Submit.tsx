'use client';
import React from "react";
import { all_services } from '@/lib/utils/getService';

const Submit: React.FC<{
  selectedService: string;
  description: string;
  selectedSlots: string[];
  images: File[];
}> = ({ selectedService, description, selectedSlots, images }) => {
  const service = all_services.find(s => s.link === selectedService);

  return (
    <section>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-4 sm:mb-6">
        6. Review & Submit
      </h2>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 px-4 py-5 sm:p-6 space-y-4 sm:space-y-5 text-sm sm:text-base">
        <div>
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1">Selected Service</h3>
          <p className="font-semibold text-gray-900">
            {service?.title || "Other / Custom Request"}
          </p>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1">Project Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{description || "—"}</p>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1">Preferred Time Slots</h3>
          {selectedSlots.length ? (
            <ul className="flex flex-wrap gap-2 mt-1">
              {selectedSlots.map((slot, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {slot}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No time slots selected</p>
          )}
        </div>

        <div>
          <h3 className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1">Uploaded Images</h3>
          <p className={images.length ? "text-gray-700" : "text-gray-400"}>
            {images.length > 0
              ? `${images.length} file${images.length > 1 ? "s" : ""} uploaded`
              : "No files uploaded"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Submit;
