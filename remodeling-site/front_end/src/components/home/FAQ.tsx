"use client";

import React, { useState } from "react";

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
      "Absolutely. We are fully licensed and insured to provide remodeling services across the area. Safety and compliance are top priorities for us.",
  },
  {
    question: "How long does a typical remodeling project take?",
    answer:
      "The timeline depends on the scope of work. A bathroom remodel might take a week, while a full kitchen could take several weeks. We provide a detailed schedule before starting any job.",
  },
  {
    question: "Can I see examples of your past work?",
    answer:
      "Yes! Our website features photo galleries on each service page with images from our previous remodeling projects.",
  },
];

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Have questions about our remodeling services? We're here to help.
        </p>

        {/* FAQ Items */}
        <div className="max-w-2xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.question}
                </h3>
                <button className="text-gray-500 focus:outline-none">
                  {expandedIndex === index ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-2 text-gray-600 text-sm">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
