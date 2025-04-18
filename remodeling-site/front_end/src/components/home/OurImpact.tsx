"use client";

import React from "react";

interface ImpactStat {
  value: string;
  label: string;
}

const impactStats: ImpactStat[] = [
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "500+", label: "Remodeling Projects Completed" },
  { value: "30%", label: "Faster Project Turnaround" },
  { value: "15+", label: "Years of Combined Expertise" },
];

const OurImpact: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover the milestones that define Mauri Remodeling's success in delivering high-quality home remodeling services.
        </p>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {impactStats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-700 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Uptime Guarantee */}
        <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
        <div className="text-sm text-gray-700">Quality Commitment Guarantee</div>
      </div>
    </section>
  );
};

export default OurImpact;
