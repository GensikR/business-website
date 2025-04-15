"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What industries do you serve?",
    answer: "We serve clients across industries, including technology, healthcare, finance, retail, and more.",
  },
  {
    question: "Can your solutions scale with my business?",
    answer: "Yes, our solutions are designed to be scalable and adapt to the growth of your business.",
  },
  {
    question: "How do you ensure security and reliability?",
    answer: "We implement robust security measures and rigorous testing protocols to ensure the reliability of our solutions.",
  },
  {
    question: "Do you offer dedicated teams for ongoing projects?",
    answer: "Yes, we can assemble dedicated teams tailored to the specific needs and duration of your ongoing projects.",
  },
  // Add more FAQ items here
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
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">FAQs</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Find clear, concise answers about our services, processes, and how we help businesses achieve
          their goals.
        </p>

        {/* FAQ Items */}
        <div className="max-w-2xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-gray-700">{item.question}</h3>
                <button className="text-gray-500 focus:outline-none">
                  {expandedIndex === index ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-2 text-gray-600 text-sm">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;