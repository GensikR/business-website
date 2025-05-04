"use client";

import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Mauricio Comar",
    role: "Founder & Master Builder",
    imageSrc: "/images/team/mauricio.png",
  },
  {
    name: "Diana Comar",
    role: "Administrative Lead",
    imageSrc: "/images/team/diana.png",
  },
  {
    name: "Gensik Rubio",
    role: "Technology Specialist",
    imageSrc: "/images/team/alejandro.png",
  },
  {
    name: "Personalized Chatbot",
    role: "Coming Soon",
    imageSrc: "/images/team/chatbot.png",
  },
];

const Team: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re a family-driven team committed to excellence, craftsmanship, and
            innovation. From hands-on construction to cutting-edge tech solutions,
            we bring heart and skill to every project.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative w-full h-72 overflow-hidden">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
