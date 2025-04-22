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
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            What We Stand For
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our values guide every remodel, ensuring your home gets the care and craftsmanship it deserves.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {valuesData.map((value, index) => (
            <div
              key={index}
              className="group bg-white bg-opacity-60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-blue-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300 text-center min-h-[350px] flex flex-col items-center justify-start"
            >
              <div className="flex items-center justify-center h-36 mb-6">
                <img
                  src={value.imageSrc}
                  alt={value.imageAlt}
                  className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-3">{value.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
