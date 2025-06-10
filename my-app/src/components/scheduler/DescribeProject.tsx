import React from "react";
import { Sparkles } from "lucide-react"; // Optional: Replace or remove

const DescribeProject: React.FC<{
  description: string;
  setDescription: (desc: string) => void;
}> = ({ description, setDescription }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        2. Describe Your Project
      </h2>

      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="project-description">
        Project Details
      </label>
      <textarea
        id="project-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="E.g., We want to remodel our kitchen with new cabinets, countertops, and lighting..."
        className="w-full min-h-[140px] rounded-2xl border border-gray-300 shadow-sm p-5 text-gray-800 placeholder-gray-400 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
      />

      <p className="mt-2 text-sm text-gray-500">
        Include any relevant details like location, measurements, materials, or preferences.
      </p>
    </section>
  );
};

export default DescribeProject;
