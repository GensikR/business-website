"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface Service {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const servicesData: Service[] = [
  {
    title: "Product Consulting",
    description: "Strategically position your digital products for success with actionable insights and market expertise.",
    imageSrc: "/images/services/product-consulting.png", // Replace with actual image path
    imageAlt: "Product Consulting Illustration",
    link: "/services/product-consulting",
  },
  {
    title: "Legacy System Migration",
    description: "Seamlessly transform outdated systems to enhance efficiency, scalability, and performance.",
    imageSrc: "/images/services/legacy-migration.png", // Replace with actual image path
    imageAlt: "Legacy System Migration Illustration",
    link: "/services/legacy-system-migration",
  },
  {
    title: "Automated Teams",
    description: "Drive productivity with fully autonomous, high-performing development teams for scalable solutions.",
    imageSrc: "/images/services/automated-teams.png", // Replace with actual image path
    imageAlt: "Automated Teams Illustration",
    link: "/services/automated-teams",
  },
  {
    title: "Engineering Consulting",
    description: "Overcome challenges and foster innovation with expert guidance from our engineering professionals.",
    imageSrc: "/images/services/engineering-consulting.png", // Replace with actual image path
    imageAlt: "Engineering Consulting Illustration",
    link: "/services/engineering-consulting",
  },
  {
    title: "ERP Implementation",
    description: "Deploy robust, customized ERP solutions to optimize and streamline your operations.",
    imageSrc: "/images/services/erp-implementation.png", // Replace with actual image path
    imageAlt: "ERP Implementation Illustration",
    link: "/services/erp-implementation",
  },
  {
    title: "Cybersecurity Services",
    description: "Protect your digital assets with industry-leading security solutions, including comprehensive vulnerability assessments.",
    imageSrc: "/images/services/cybersecurity.png", // Replace with actual image path
    imageAlt: "Cybersecurity Services Illustration",
    link: "/services/cybersecurity",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Expertise</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          We specialize in delivering tailored solutions to address your business needs across these
          key areas:
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  layout="fill"
                  objectFit="contain"
                  className="p-4" // Add some padding around the image
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  Learn More
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Get a consultation Button */}
        <div className="mt-12 text-center">
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

export default Services;