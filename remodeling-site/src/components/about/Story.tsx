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
            {/* Event 1: Humble Beginnings */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Humble Beginnings</h3>
                <p className="text-gray-600 text-sm">
                  Mauri Remodeling was born from a passion for quality craftsmanship and a vision to help families fall in love with their homes again.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                2018
              </div>
            </div>

            {/* Event 2: Building Trust */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Building Trust</h3>
                <p className="text-gray-600 text-sm">
                  Through word-of-mouth and consistent quality, Mauri became a trusted name for kitchen, bathroom, and full-home renovations.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                2019
              </div>
            </div>

            {/* Event 3: Expanding Services */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Expanding Services</h3>
                <p className="text-gray-600 text-sm">
                  From patios to living rooms and everything in between, we broadened our services to meet growing demand and diverse home styles.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                2020
              </div>
            </div>

            {/* Event 4: Weathering the Storm */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Weathering the Storm</h3>
                <p className="text-gray-600 text-sm">
                  Despite global challenges, we continued to serve our clients with the same dedication and resilience that built our foundation.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                2021
              </div>
            </div>

            {/* Event 5: Community Impact */}
            <div className="mb-10 md:flex items-center justify-between md:space-x-8">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-orange-600 mb-2">Community Impact</h3>
                <p className="text-gray-600 text-sm">
                  We started giving back to our community through local projects and charity renovations, believing in homes and hearts rebuilt together.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">
                2022
              </div>
            </div>

            {/* Event 6: Looking Ahead */}
            <div className="md:flex items-center justify-between md:space-x-8 md:flex-row-reverse">
              <div className="md:w-1/2 text-center md:text-right">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Looking Ahead</h3>
                <p className="text-gray-600 text-sm">
                  With plans to expand and innovate, we aim to continue transforming homes across the region while staying true to our values.
                </p>
              </div>
              <div className="relative w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                2024
              </div>
            </div>
          </div>
        </div>

        {/* Initial Story Text (Above the Timeline) */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            From a one-man operation to a full-service remodeling company, Mauri Remodeling has always been about heart, integrity, and the joy of turning houses into homes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
