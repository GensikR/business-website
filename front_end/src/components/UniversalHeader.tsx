"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { UniversalHeaderProps } from "@/types";


const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImageUrl,
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background + Overlay */}
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          <Link
            href="/consultation"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-xl text-lg md:text-xl transition-all duration-300"
          >
            <span>Get a Free Estimate</span>
            <FaChevronRight className="ml-3 w-6 h-6" />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-blue-900 font-medium py-4 px-8 rounded-full backdrop-blur-sm shadow-lg text-lg md:text-xl transition-all duration-300"
            >
            View Our Work
          </Link>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default UniversalHeader;
