"use client";

import React from "react";

interface Value {
  title: string;
  description: string;
  imageSrc: string; // You'll need to provide the actual image paths
  imageAlt: string;
}

const valuesData: Value[] = [
  {
    title: "Innovation",
    description: "Pioneering solutions tailored to your unique needs.",
    imageSrc: "/images/innovation.svg", // Replace with your actual image path
    imageAlt: "Illustration of Innovation",
  },
  {
    title: "Reliability",
    description: "Delivering on promises with precision and excellence.",
    imageSrc: "/images/reliability.svg", // Replace with your actual image path
    imageAlt: "Illustration of Reliability",
  },
  {
    title: "Collaboration",
    description: "Partnering with clients to achieve shared success.",
    imageSrc: "/images/collaboration.svg", // Replace with your actual image path
    imageAlt: "Illustration of Collaboration",
  },
  {
    title: "Integrity",
    description: "Building trust through transparency and accountability.",
    imageSrc: "/images/integrity.svg", // Replace with your actual image path
    imageAlt: "Illustration of Integrity",
  },
];

const Values: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What We Stand For</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Our unwavering values shape our approach to delivering impactful solutions.
        </p>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuesData.map((value, index) => (
            <div key={index} className="text-center">
              <div className="relative h-32 flex items-center justify-center mb-4">
                <img
                  src={value.imageSrc}
                  alt={value.imageAlt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;