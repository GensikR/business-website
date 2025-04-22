'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { year: '2017', title: 'The Beginning', description: 'ABC Company was founded with a vision to provide innovative engineering solutions to startups, focusing on reliability and affordability.' },
  { year: '2018', title: 'Expanding Expertise', description: 'We diversified our offerings to include legacy system migrations and ERP implementations, catering to small and medium-sized businesses.' },
  { year: '2019', title: 'Going Global', description: 'ABC Company expanded its reach by serving clients across multiple countries, building strong partnerships with multinational corporations.' },
  { year: '2020', title: 'Autonomous Teams Launched', description: 'We introduced fully autonomous development teams, enabling clients to scale their projects with ease and efficiency.' },
  { year: '2021', title: 'Embracing Cybersecurity', description: 'To address growing digital threats, we added comprehensive cybersecurity services, safeguarding our clients’ assets worldwide.' },
  { year: '2023', title: '300+ Projects Completed', description: 'With over 300 successful projects delivered globally, we solidified our reputation as a leading provider of tailored engineering solutions.' },
  { year: '2024', title: 'A Trusted Partner', description: 'ABC Company continues to innovate, serving startups, SMBs, and enterprises with a focus on scalable solutions, global collaboration, and unmatched reliability.' },
];

const Story: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16 tracking-tight">
          Our Story
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line with gradient */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 z-0" />

          <div className="space-y-24 relative z-10">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-between ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="w-full md:w-5/12 text-center md:text-right md:pr-8 lg:pr-16">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-20">
                    <div className="w-14 h-14 bg-blue-600 text-white font-bold text-sm flex items-center justify-center rounded-full shadow-xl border-4 border-white ring-2 ring-blue-300 hover:scale-105 transition-all duration-300">
                      {event.year}
                    </div>
                  </div>

                  {/* Spacer */}
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
