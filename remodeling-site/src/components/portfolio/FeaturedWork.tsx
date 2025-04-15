"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Kitchen Remodel for a Family Home",
    challenge:
      "The client's outdated kitchen lacked functionality, efficiency, and modern aesthetics, making it difficult for their family to enjoy cooking and dining.",
    solution:
      "We redesigned the kitchen layout with modern finishes, energy-efficient appliances, and smart storage solutions to enhance the space's functionality and aesthetic appeal.",
    imageSrc: "/images/portfolio/kitchen-remodel.png", // Replace with actual image path
    imageAlt: "Kitchen Remodel Case Study",
    link: "/portfolio/kitchen-remodel",
  },
  {
    title: "Bathroom Renovation for a Modern Living Space",
    challenge: "The client's bathroom was cramped and lacked a modern design, making it feel outdated and inefficient.",
    solution:
      "We created an open, spa-like atmosphere by redesigning the layout, installing luxurious finishes, and optimizing the space for both function and relaxation.",
    imageSrc: "/images/portfolio/bathroom-renovation.png", // Replace with actual image path
    imageAlt: "Bathroom Renovation Case Study",
    link: "/portfolio/bathroom-renovation",
  },
  {
    title: "Whole House Renovation",
    challenge:
      "The house needed extensive upgrades to modernize the structure while preserving its charm and character, making it safe and comfortable for a new family.",
    solution:
      "We carefully restored the home’s original features while integrating modern amenities, ensuring both beauty and functionality in every room.",
    imageSrc: "/images/portfolio/whole-house-renovation.png", // Replace with actual image path
    imageAlt: "Whole House Renovation Case Study",
    link: "/portfolio/whole-house-renovation",
  },
];

const FeaturedWork: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Featured Case Studies</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Discover how our customized remodeling solutions have transformed homes and spaces for our clients.
        </p>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{study.title}</h3>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Challenge</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{study.challenge}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Solution</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{study.solution}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={study.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Read Full Case Study
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-semibold text-sm"
          >
            View More
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
