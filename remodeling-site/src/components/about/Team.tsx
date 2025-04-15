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
    name: "Timothy Franey",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder1.jpg", // Replace with actual image path
  },
  {
    name: "Carroll Keeling",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder2.jpg", // Replace with actual image path
  },
  {
    name: "Johanna Kassulke",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder3.jpg", // Replace with actual image path
  },
  {
    name: "Leslie Willms",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder4.jpg", // Replace with actual image path
  },
  {
    name: "Francis Smith",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder5.jpg", // Replace with actual image path
  },
  {
    name: "Roderick Gulgowski",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder6.jpg", // Replace with actual image path
  },
  {
    name: "Ethel Mitchell",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder7.jpg", // Replace with actual image path
  },
  {
    name: "Adam Harber",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder8.jpg", // Replace with actual image path
  },
  {
    name: "Sandy Buckridge",
    role: "Co-Founder, ABC Company",
    imageSrc: "/images/team/placeholder9.jpg", // Replace with actual image path
  },
];

const Team: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Meet Our Team</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our global team of experienced engineers, consultants, and project managers is the backbone
          of ABC Company. With a shared passion for problem-solving and innovation, we're dedicated to
          delivering exceptional results for every client.
        </p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-top" // To focus on the face
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-1">{member.name}</h3>
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