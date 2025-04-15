"use client";

import React from "react";

const Story: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Story</h2>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300"></div>

          {/* Timeline Events */}
          <div className="mt-8">
            {/* Event 1: The Beginning */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">The Beginning</h3>
                <p className="text-gray-600 text-sm">
                  ABC Company was founded with a vision to establish innovative engineering solutions to
                  bridge the gap, focusing on reliability and affordability.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                2017
              </div>
            </div>

            {/* Event 2: Expanding Expertise */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Expanding Expertise</h3>
                <p className="text-gray-600 text-sm">
                  We diversified our offerings to include legacy system migrations and ERP
                  implementations, catering to small and medium-sized businesses.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                2018
              </div>
            </div>

            {/* Event 3: Going Global */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Going Global</h3>
                <p className="text-gray-600 text-sm">
                  ABC Company expanded its reach by serving clients across multiple countries, building
                  strong partnerships with multinational corporations.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                2019
              </div>
            </div>

            {/* Event 4: Embracing Cybersecurity */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Embracing Cybersecurity</h3>
                <p className="text-gray-600 text-sm">
                  To address growing digital threats, we added comprehensive cybersecurity services,
                  safeguarding our clients' assets worldwide.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                2021
              </div>
            </div>

            {/* Event 5: Autonomous Teams Launched */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-orange-600 mb-2">Autonomous Teams Launched</h3>
                <p className="text-gray-600 text-sm">
                  We introduced fully autonomous development teams, enabling clients to scale their
                  projects with ease and efficiency.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">
                2022
              </div>
            </div>

            {/* Event 6: 300+ Projects Completed */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">300+ Projects Completed</h3>
                <p className="text-gray-600 text-sm">
                  With over 300 successful projects delivered globally, we solidified our reputation as a
                  leading provider of tailored engineering solutions.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                2023
              </div>
            </div>

            {/* Event 7: A Trusted Partner */}
            <div className="md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-red-600 mb-2">A Trusted Partner</h3>
                <p className="text-gray-600 text-sm">
                  ABC Company continues to innovate, serving startups, SMEs, and enterprises with a focus
                  on scalable solutions, global collaboration, and unmatched reliability.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                2024
              </div>
            </div>
          </div>
        </div>

        {/* Initial Story Text (Above the Timeline) */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            Founded on the principles of innovation and collaboration, ABC Company was created to bridge
            the gap between complex engineering challenges and simplified solutions. Over the years,
            we've grown into a global team of experts passionate about helping businesses scale,
            innovate, and thrive in an ever-changing digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;