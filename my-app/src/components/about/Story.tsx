'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { year: '2000', title: 'A New Chapter in the US', description: 'Mauri, a skilled remodeler, embarked on a new journey, arriving in the United States from Argentina. He established his initial roots and began building his expertise in Los Angeles, California.' },
  { year: '2004', title: 'Founding Stage One Custom Furniture & Construction', description: 'Mauri co-founded Stage One Custom Furniture & Construction in Los Angeles, California. This marked a significant step in his career, allowing him to apply his extensive knowledge in woodworking, custom finishes, and general construction to a broader range of projects.' },
  { year: '2008', title: 'Mastering Diverse Projects', description: 'During his tenure at Stage One, Mauri gained extensive experience as a Wood Finisher & Project Manager. He worked on diverse and high-profile projects, including contributions to Swinerton Builders and collaborations for Walt Disney Concert Hall and Colburn School.' },
  { year: '2015', title: 'Broadening Expertise in Design & Healthcare', description: 'Mauri continued to expand his portfolio, engaging with various design firms and institutions. His work included projects for Gary Gibson Design, Saxony Design & Build, Robert Mahterian Architect, and healthcare facilities like UCLA Hospital and Santa Monica UCLA Hospital, showcasing his adaptability and broad skill set.' },
  { year: '2021', title: 'Venturing into Texas & Entrepreneurship', description: 'Mauri made a pivotal move to Texas. Recognizing a thriving market and seeking new challenges, he ventured to establish his own remodeling business, driven by a vision to deliver exceptional craftsmanship and client satisfaction.' },
  { year: '2022', title: 'Laying the Foundation for Growth', description: 'In its inaugural year, Mauri’s remodeling business quickly gained traction. Focusing on quality craftsmanship, personalized designs, and timely project completion, the company began to build a strong reputation within the Texas remodeling landscape.' },
  { year: '2023', title: 'Expanding Service Offerings', description: 'The business expanded its service offerings, moving beyond general remodeling to specialize in areas such as custom finishes, antiques restoration, bathroom & kitchen remodeling, and cabinet installation. This diversification allowed for a wider range of tailored solutions for clients.' },
  { year: '2024', title: 'A Portfolio of Success', description: 'Mauri\'s business continued its steady growth, undertaking successful projects in various remodeling domains, including kitchen remodels, modern bathroom oasis designs, and whole-house modernizations, showcasing a commitment to transforming homes.' },
  { year: 'Present', title: 'Committed to Excellence', description: 'Today, Mauri’s remodeling business continues to thrive, known for its proactive and efficient approach, attention to detail, and dedication to delivering high-quality, custom solutions that meet and exceed client expectations.' },
];

const Story: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 tracking-tight">
          Our Story
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline vertical line (only show on desktop) */}
          <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 z-0" />

          <div className="space-y-16 sm:space-y-20 relative z-10">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-between gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Section */}
                  <div className="w-full md:w-5/12 text-center md:text-right md:pr-8 lg:pr-16">
                    {/* Badge on top (mobile only) */}
                    <div className="md:hidden mb-4">
                      <div className="mx-auto w-12 h-12 bg-blue-600 text-white font-bold text-sm flex items-center justify-center rounded-full shadow-xl border-4 border-white ring-2 ring-blue-300">
                        {event.year}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>

                  {/* Timeline Node (desktop only) */}
                  <div className="hidden md:flex relative z-20">
                    <div className="w-14 h-14 bg-blue-600 text-white font-bold text-sm flex items-center justify-center rounded-full shadow-xl border-4 border-white ring-2 ring-blue-300 hover:scale-105 transition-all duration-300">
                      {event.year}
                    </div>
                  </div>

                  {/* Spacer (desktop only) */}
                  <div className="w-full md:w-5/12 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
