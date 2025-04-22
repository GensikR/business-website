"use client";

import React from "react";
import Link from "next/link";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote:
      "Mauri Remodeling transformed our outdated kitchen into a modern, functional space. The team was professional, efficient, and exceeded our expectations in both design and execution.",
    author: "Jane Doe",
    company: "Sunrise Residence",
  },
  {
    quote:
      "We hired Mauri Remodeling to renovate our bathroom, and the results were incredible! They worked within our budget and timeline, delivering high-quality craftsmanship. Highly recommended!",
    author: "John Smith",
    company: "Lakeside Villa",
  },
  {
    quote:
      "Mauri Remodeling did a fantastic job with our living room remodel. The team was attentive to detail, and their design suggestions brought new life to our home. We'll definitely work with them again!",
    author: "Emily Clark",
    company: "Maple Street House",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonials: React.FC = () => (
  <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
    {/* Decorative Dots */}
    <div className="absolute inset-0 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] bg-[length:20px_20px]" />

    <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center max-w-7xl">
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Success <span className="text-blue-600">Stories</span>
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Discover how Mauri Remodeling has brought dreams to life with world‑class craftsmanship and personalized service.
      </motion.p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialsData.map((t, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="text-blue-400 text-4xl mb-4">
              <FaQuoteLeft />
            </div>
            <p className="text-2xl text-gray-800 leading-relaxed mb-6 flex-grow">
              {t.quote}
            </p>
            <div className="mt-4">
              <p className="text-xl font-semibold text-blue-700">{t.author}</p>
              <p className="text-gray-500">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
        >
          <span>View Featured Works</span>
          <FaArrowRight />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
