"use client";
//TODO: Make it possible to full screen
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Service } from "@/types/index";
import { all_services } from "@/lib/utils/getService";

const ArrowRightIcon = () => (
  <svg
    className="ml-2 w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const Services: React.FC = () => 
{
  const servicesData: Service[] = all_services;

  return (
    <div className=" md:px-12">
      {/* Section Header - Styled for the dark, warm theme */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight ">
          Craftsmanship Meets Creativity
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore our diverse remodeling services designed to elevate your
          living space — personalized, precise, and built to last.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service) => (
          <div
            key={service.title}
            className="group relative bg-[#292524]/50 backdrop-blur-sm border border-white/10 
                       rounded-2xl overflow-hidden shadow-lg shadow-black/40
                       transition-all duration-300 hover:border-white/20 hover:-translate-y-2 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                {service.description}
              </p>

              {/* Links */}
              <div className="mt-auto space-y-4 flex flex-col items-center">
                <Link
                  href="#scheduler"
                  className="inline-block w-full text-center bg-[#D4AF37] hover:bg-amber-400 
                             text-stone-900 text-sm font-bold py-3 px-4 rounded-full
                             transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Free Estimate
                </Link>

                <Link
                  href={`/services/${service.link}`}
                  className="group inline-flex items-center justify-center text-gray-300 font-medium 
                             hover:text-white transition-colors duration-300"
                >
                  Learn More <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;