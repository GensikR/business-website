"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type UniversalHeaderProps = {
  backgroundImageUrl: string;
  businessCardImageUrl: string;
  description?: string;
};

const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  backgroundImageUrl,
  businessCardImageUrl,
  //description,
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image + Overlay */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImageUrl}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      )}

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Business Card Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <Image
            src={businessCardImageUrl}
            alt="Business Card"
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          <Link
            href="#scheduler"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-xl text-lg md:text-xl transition-all duration-300"
          >
            <span>Get a Free Estimate</span>
            <svg
              className="ml-3 w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-medium py-4 px-8 rounded-full backdrop-blur-md shadow-lg text-lg md:text-xl transition-all duration-300"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Optional Description */}
        {/* {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )} */}
      </div>
    </section>
  );
};

export default UniversalHeader;
