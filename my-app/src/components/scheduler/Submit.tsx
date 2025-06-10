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
      <h2 className="text-2xl font-bold text-blue-800 mb-6">6. Review & Submit</h2>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Selected Service</h3>
          <p className="text-lg font-semibold text-gray-900">{service?.title || "Other / Custom Request"}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Project Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{description || "—"}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Preferred Time Slots</h3>
          <ul className="flex flex-wrap gap-2">
            {selectedSlots.length ? (
              selectedSlots.map((slot, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {slot}
                </li>
              ))
            ) : (
              <span className="text-gray-400">No time slots selected</span>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">Uploaded Images</h3>
          {images.length > 0 ? (
            <p className="text-gray-700">{images.length} file{images.length > 1 ? "s" : ""} uploaded</p>
          ) : (
            <p className="text-gray-400">No files uploaded</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Submit;
