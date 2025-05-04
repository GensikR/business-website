"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Service } from "@/types/index";
import { services } from "@/lib/getService";

const Services: React.FC = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);

  useEffect(() => {
    // Simulating async fetching of services
    setServicesData(services);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Craftsmanship Meets Creativity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse remodeling services designed to elevate your living space — personalized, precise, and built to last.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.images[0]}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Links */}
                <div className="mt-auto space-y-3 flex flex-col items-center">
                  <Link
                    href="/consultation"
                    className="inline-block w-full text-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2 px-4 rounded-full transition-all duration-300"
                  >
                    Get Free Estimate
                  </Link>

                  <Link
                    href={service.link}
                    className="inline-flex items-center justify-center text-blue-700 font-medium hover:text-blue-900 transition-colors"
                  >
                    Learn More <FaArrowRight className="ml-2" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Main CTA at bottom */}
        <div className="mt-20 text-center">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
          >
            Get a Free Estimate <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
