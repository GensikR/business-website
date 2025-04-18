"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface WhyUsReason {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const whyUsReasons: WhyUsReason[] = [
  {
    title: "Quality Craftsmanship",
    description: "Our team of skilled professionals ensures every project is completed with the highest standards of quality.",
    imageSrc: "/images/why-us/craftsmanship.png", // Replace with actual image path
    imageAlt: "Illustration of Quality Craftsmanship",
  },
  {
    title: "Personalized Designs",
    description: "We work closely with clients to design spaces that reflect their unique tastes and preferences.",
    imageSrc: "/images/why-us/personalized-designs.png", // Replace with actual image path
    imageAlt: "Illustration of Personalized Designs",
  },
  {
    title: "Timely Project Completion",
    description: "We respect our clients' time, ensuring that every project is completed on schedule without compromising quality.",
    imageSrc: "/images/why-us/timely-completion.png", // Replace with actual image path
    imageAlt: "Illustration of Timely Completion",
  },
];

const WhyUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Mauri Remodeling?</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover why our clients trust us for transforming their homes with personalized, high-quality remodeling services.
        </p>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyUsReasons.map((reason, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="relative h-32 flex items-center justify-center mb-4">
                <Image
                  src={reason.imageSrc}
                  alt={reason.imageAlt}
                  layout="intrinsic"
                  width={150}
                  height={120}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Get a consultation Button */}
        <div className="mt-12">
          <Link
            href="/consultation"
            className="inline-flex items-center bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md text-lg space-x-2"
          >
            <span>Get a consultation</span>
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
