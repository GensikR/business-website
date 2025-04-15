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
    title: "Global Reach",
    description: "Serving clients worldwide, from startups to enterprises.",
    imageSrc: "/images/why-us/global-reach.svg", // Replace with actual image path
    imageAlt: "Illustration of Global Reach",
  },
  {
    title: "Scalable Solutions",
    description: "Flexible services tailored to businesses of all sizes.",
    imageSrc: "/images/why-us/scalable-solutions.svg", // Replace with actual image path
    imageAlt: "Illustration of Scalable Solutions",
  },
  {
    title: "Expertise You Can Trust",
    description: "Decades of experience delivering quality solutions for complex problems.",
    imageSrc: "/images/why-us/expertise.svg", // Replace with actual image path
    imageAlt: "Illustration of Expertise",
  },
];

const WhyUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose ABC Company?</h2>
        <p className="text-lg text-gray-600 mb-12">
          We provide end-to-end solutions to help businesses across industries overcome challenges,
          innovate, and scale.
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