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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We’re a family-driven team committed to excellence, craftsmanship, and
          innovation. From hands-on construction to cutting-edge tech solutions,
          we bring heart and skill to every project.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-top"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
