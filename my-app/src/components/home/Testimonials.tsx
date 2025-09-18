"use client";

import React from "react";
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

// Animation variants remain the same - they work perfectly with the new theme
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Quote Icon - Styled with the brand's gold accent color
const QuoteIcon = () => (
  <svg
    className="w-10 h-10 text-[#D4AF37]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l-3-3m0 0l3-3m-3 3h6m-9-6a9 9 0 1118 0 9 9 0 01-18 0z" />
  </svg>
);


const Testimonials: React.FC = () => (
  // The main wrapper is now a simple div with padding, designed for the ComponentContainer
  <div className="py-20 px-6 md:px-12">
    <div className="relative z-10 mx-auto text-center max-w-7xl">
      {/* Section Title - Styled for the dark theme with a gold accent */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Success <span className="text-[#D4AF37]">Stories</span>
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Discover how Mauri Remodeling has brought dreams to life with world‑class craftsmanship and personalized service.
      </motion.p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialsData.map((t, i) => (
          // Card Redesign - "Glassmorphism" effect to match the other components
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            className="bg-[#292524]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 
                       flex flex-col h-full shadow-lg shadow-black/40
                       transition-all duration-300 hover:border-white/20 hover:-translate-y-2"
          >
            <div className="mb-5">
              <QuoteIcon />
            </div>
            <p className="text-lg text-gray-200 leading-relaxed mb-6 flex-grow text-left">
              "{t.quote}"
            </p>
            <div className="mt-auto text-left">
              <p className="text-xl font-semibold text-white">{t.author}</p>
              <p className="text-gray-400">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Testimonials;