"use client";

import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

interface UniversalHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImageUrl?: string;
}

const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImageUrl,
}) => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-white text-center overflow-hidden">
      {/* Background Image */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImageUrl}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-0" />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 z-10">
      <h1 className="text-[#f9f9f9]
       text-5xl font-serif bg-black/30 px-6 py-3 rounded drop-shadow-xl">
      {title}
      </h1>


        {subtitle && (
          <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <Link
            href="/consultation"
            className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md text-lg inline-flex items-center space-x-2 shadow-lg transition duration-300"
          >
            <span>Get a Free Estimate</span>
            <FaChevronRight className="w-5 h-5" />
          </Link>

          <Link
            href="/portfolio"
            className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-md text-lg inline-flex items-center shadow-md transition duration-300"
          >
            View Our Work
          </Link>
        </div>

        {description && (
          <p className="text-md md:text-lg text-white/80 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default UniversalHeader;
