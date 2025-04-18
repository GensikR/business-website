'use client';

import React from 'react';

const Story: React.FC = () => {
  const timelineEvents = [
    { year: '2017', title: 'The Beginning', description: 'ABC Company was founded with a vision to provide innovative engineering solutions to startups, focusing on reliability and affordability.' },
    { year: '2018', title: 'Expanding Expertise', description: 'We diversified our offerings to include legacy system migrations and ERP implementations, catering to small and medium-sized businesses.' },
    { year: '2019', title: 'Going Global', description: 'ABC Company expanded its reach by serving clients across multiple countries, building strong partnerships with multinational corporations.' },
    { year: '2020', title: 'Autonomous Teams Launched', description: 'We introduced fully autonomous development teams, enabling clients to scale their projects with ease and efficiency.' },
    { year: '2023', title: '300+ Projects Completed', description: 'With over 300 successful projects delivered globally, we solidified our reputation as a leading provider of tailored engineering solutions.' },
    { year: '2021', title: 'Embracing Cybersecurity', description: 'To address growing digital threats, we added comprehensive cybersecurity services, safeguarding our clients’ assets worldwide.' },
    { year: '2024', title: 'A Trusted Partner', description: 'ABC Company continues to innovate, serving startups, SMBs, and enterprises with a focus on scalable solutions, global collaboration, and unmatched reliability.' },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">Our Story</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-blue-500"></div>

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between relative">
                {index % 2 === 0 ? (
                  <>
                    {/* Left content */}
                    <div className="w-2/5 text-right pr-6 relative">
                      <h3 className="text-blue-700 font-semibold">{event.title}</h3>
                      <p className="text-gray-700 text-sm">{event.description}</p>
                      {/* Horizontal line to year */}
                      <div className="absolute top-1/2 right-0 w-6 h-0.5 bg-blue-400 transform -translate-y-1/2"></div>
                    </div>

                    {/* Year circle */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className="bg-blue-500 text-white text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                        {event.year}
                      </div>
                    </div>

                    <div className="w-2/5"></div>
                  </>
                ) : (
                  <>
                    <div className="w-2/5"></div>

                    {/* Year circle */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className="bg-blue-500 text-white text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                        {event.year}
                      </div>
                    </div>

                    {/* Right content */}
                    <div className="w-2/5 text-left pl-6 relative">
                      {/* Horizontal line to year */}
                      <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-blue-400 transform -translate-y-1/2"></div>
                      <h3 className="text-blue-700 font-semibold">{event.title}</h3>
                      <p className="text-gray-700 text-sm">{event.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
