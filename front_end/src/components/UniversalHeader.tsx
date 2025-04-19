"use client";

import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface UniversalHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white text-center">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 mb-6">{subtitle}</p>
        )}

        {/* CTA Buttons (Fixed) */}
        <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-4">
          <Link
            href="/consultation"
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md text-lg inline-flex items-center space-x-2"
          >
            <span>Get a Free Estimate</span>
            <FaChevronRight className="w-5 h-5" />
          </Link>

          <Link
            href="/portfolio"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md text-lg inline-flex items-center"
          >
            View Our Work
          </Link>
        </div>

        {/* Optional Description */}
        {description && (
          <p className="text-md md:text-lg text-gray-600">{description}</p>
        )}
      </div>
    </section>
  );
};

export default UniversalHeader;
