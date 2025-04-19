"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { getService, getAllServiceSlugs } from "@/lib/getService"; // Correctly importing the functions from getService.ts

interface Service {
  slug: string;
  title: string;
  description: string;
  images: string[];
}

const Services: React.FC = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);

  // Fetch all service slugs using getAllServiceSlugs and then fetch the services
  useEffect(() => {
    async function fetchServices() {
      const slugs = getAllServiceSlugs(); // Get all service slugs
      const services = slugs.map((slug) => getService(slug)); // Fetch each service based on the slug
      setServicesData(services.filter((service) => service !== undefined) as Service[]); // Filter out any undefined values
    }
    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Our Expertise
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          We specialize in delivering tailored solutions to address your home
          remodeling needs in the following areas:
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`} // Linking to the service detail page using the slug
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image for service */}
              <div className="relative w-full h-48">
                <Image
                  src={service.images[0]} // Using the first image in the array
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Service Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
                  Learn More
                  <FaArrowRight className="ml-2" />
                </div>
              </div>
            </Link>
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
