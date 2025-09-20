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
    <div className="py-20 px-6 md:px-12">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          We’re a family-driven team committed to excellence, craftsmanship, and
          innovation. From hands-on construction to cutting-edge tech solutions,
          we bring heart and skill to every project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="relative rounded-2xl overflow-hidden group shadow-lg shadow-black/40">
            <Image
              src={member.imageSrc}
              alt={member.name}
              width={400}
              height={600}
              className="object-cover w-full h-96 transition-transform duration-500 ease-in-out group-hover:scale-105"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6 
                            bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              
              {/* === RESPONSIVE ANIMATION LOGIC === */}
              <div className="
                transition-all duration-500 ease-in-out 
                
                /* MOBILE STYLES: Visible by default */
                transform-none opacity-100

                /* DESKTOP STYLES (md & up): Hidden, then revealed on hover */
                md:opacity-0 md:translate-y-8
                md:group-hover:translate-y-0 md:group-hover:opacity-100
              ">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-medium text-sm uppercase tracking-wide text-[#D4AF37]">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;