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
      "ABC Company delivered exactly what we needed—a scalable and secure ERP system that streamlined our operations. Their team's professionalism and expertise were evident every step of the way.",
    author: "Manager",
    company: "Global Retail Company",
  },
  {
    quote:
      "As a startup, we were looking for a reliable partner to build our MVP. ABC Company exceeded our expectations, delivering a bug-free product ahead of schedule. Their team felt like an extension of ours!",
    author: "Founder",
    company: "Fintech Startup",
  },
  {
    quote:
      "The legacy system migration ABC Company handled for us was seamless. We were impressed with their attention to detail, proactive communication, and ability to complete the project with zero downtime.",
    author: "CTO",
    company: "Healthcare Enterprise",
  },
  // Add more testimonials here
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explore how we've transformed challenges into opportunities, driving success for businesses
          across industries worldwide.
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
            View Case Studies
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;