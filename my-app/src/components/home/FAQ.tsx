"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of remodeling services do you offer?",
    answer:
      "We offer complete remodeling services for bathrooms, kitchens, bedrooms, living rooms, patios, garages, and more. We also handle flooring, painting, tiling, and general repairs.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes, we provide free, no-obligation estimates. You can use the scheduler on our website to book a time that works best for you.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. We are fully licensed and insured to provide remodeling services across the area. Safety and compliance are our top priorities.",
  },
  {
    question: "How long does a typical remodeling project take?",
    answer:
      "The timeline depends on the scope of work. A small bathroom remodel might take a week, while a full kitchen could take several weeks. We provide a detailed schedule before starting any job.",
  },
  {
    question: "Can I see examples of your past work?",
    answer:
      "Yes! Our website features photo galleries on each service page with images from our previous remodeling projects.",
  },
];

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Start with the first item open

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    // The main wrapper is a simple div with padding, designed for the ComponentContainer
    <div className="py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        {/* Section Title - Styled for the dark theme */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Have questions about our remodeling services? We are here to help.
        </p>

        {/* FAQ Items - Accordion with new styling and animations */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} 
                 className="bg-[#292524]/50 backdrop-blur-sm border border-white/10 rounded-2xl 
                            overflow-hidden transition-all duration-300 shadow-lg shadow-black/40">
              <div
                className="flex items-center justify-between cursor-pointer py-5 px-6"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                {/* Chevron icon styled with gold and smooth rotation */}
                <div className="text-[#D4AF37]">
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-500 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Answer panel with smooth expand/collapse animation */}
              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-300 text-base leading-relaxed border-t border-white/10">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;