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
    title: "Seamless Legacy System Migration for a Healthcare Enterprise",
    challenge:
      "The client's outdated technical stack was causing inefficiencies and limiting innovation.",
    solution:
      "We architected a custom migration strategy, ensuring data integrity and minimal disruption, resulting in significant operational improvements with advanced analytics.",
    imageSrc: "/images/case-studies/healthcare.png", // Replace with actual image path
    imageAlt: "Healthcare Enterprise Case Study",
    link: "/case-studies/healthcare",
  },
  {
    title: "Accelerating MVP Development for a FinTech Startup",
    challenge: "The startup needed a scalable MVP within a tight timeframe to secure further funding.",
    solution:
      "Our agile team delivered a bug-free MVP in under three months, enabling the client to successfully secure their next round of investment.",
    imageSrc: "/images/case-studies/fintech.png", // Replace with actual image path
    imageAlt: "FinTech Startup Case Study",
    link: "/case-studies/fintech",
  },
  {
    title: "Scalable ERP Implementation for a Retail Chain",
    challenge: "The retail client struggled with fragmented systems, hindering inventory management and efficiency across locations.",
    solution:
      "We designed and implemented a unified ERP system, streamlining purchasing, sales, and finance processes, providing a comprehensive operational backbone.",
    imageSrc: "/images/case-studies/retail.png", // Replace with actual image path
    imageAlt: "Retail Chain Case Study",
    link: "/case-studies/retail",
  },
];

const FeaturedWork: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Featured Case Studies</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Discover how our tailored solutions have transformed businesses across industries.
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