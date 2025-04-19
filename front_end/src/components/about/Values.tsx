"use client";

import React from "react";

interface Value {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const valuesData: Value[] = [
  {
    title: "Craftsmanship",
    description: "Meticulous attention to detail and pride in every cut, tile, and finish.",
    imageSrc: "/images/values/craftsmanship.png", 
    imageAlt: "Illustration of Craftsmanship",
  },
  {
    title: "Honesty",
    description: "Clear communication, fair pricing, and dependable service from start to finish.",
    imageSrc: "/images/values/honesty.png",
    imageAlt: "Illustration of Honesty",
  },
  {
    title: "Family-Driven Service",
    description: "A family business rooted in trust, respect, and personal care for every client.",
    imageSrc: "/images/values/family.png",
    imageAlt: "Illustration of Family Values",
  },
  {
    title: "Adaptability",
    description: "Flexible solutions that meet your space, style, and budget needs.",
    imageSrc: "/images/values/adaptability.png",
    imageAlt: "Illustration of Adaptability",
  },
];

const Values: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What We Stand For</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Our values guide every remodel, ensuring your home gets the care and craftsmanship it deserves.
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
