"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote:
      "Mauri Remodeling transformed our outdated kitchen into a modern, functional space. The team was professional, efficient, and exceeded our expectations in both design and execution.",
    author: "Homeowner",
    company: "Residential Project",
  },
  {
    quote:
      "We hired Mauri Remodeling to renovate our bathroom, and the results were incredible! They worked within our budget and timeline, delivering high-quality craftsmanship. Highly recommended!",
    author: "Homeowner",
    company: "Residential Project",
  },
  {
    quote:
      "Mauri Remodeling did a fantastic job with our living room remodel. The team was attentive to detail, and their design suggestions brought new life to our home. We'll definitely work with them again in the future.",
    author: "Homeowner",
    company: "Residential Project",
  },
  // Add more testimonials as needed
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover how Mauri Remodeling has transformed homes with personalized renovations and high-quality craftsmanship.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-left">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm text-blue-600 font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.company}</div>
            </div>
          ))}
        </div>

        {/* View Case Studies Link */}
        <div className="mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            View Featured Works
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
