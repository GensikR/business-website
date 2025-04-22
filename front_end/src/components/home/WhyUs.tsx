"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface WhyUsReason {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const whyUsReasons: WhyUsReason[] = [
  {
    title: "Cabinet Creation",
    description:
      "Custom-built cabinets that suit your style and maximize your storage space.",
    imageSrc: "/images/why-us/craftsmanship.png",
    imageAlt: "Illustration of Cabinet Creation",
    href: "/services/cabinet-creation",
  },
  {
    title: "Personalized Designs",
    description:
      "We collaborate with you to create personalized spaces that match your style, needs, and personality.",
    imageSrc: "/images/why-us/personalized-designs.png",
    imageAlt: "Illustration of Personalized Designs",
    href: "/services/personalized-designs",
  },
  {
    title: "Timely Project Completion",
    description:
      "We honor deadlines, providing efficient project timelines without sacrificing quality craftsmanship.",
    imageSrc: "/images/why-us/timely-completion.png",
    imageAlt: "Illustration of Timely Completion",
    href: "/our-process",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 },
  },
};

const WhyUs: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#dbeafe_1px,transparent_1px)] bg-[length:24px_24px] opacity-10" />

      <div className="container mx-auto text-center relative z-10 max-w-7xl">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Why Choose <span className="text-blue-700">Mauri Remodeling?</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
          Discover why homeowners trust us to bring style, craftsmanship, and commitment to every remodel.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {whyUsReasons.map((reason, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
                <div className="relative w-full h-48 md:h-64">
                  <Image
                    src={reason.imageSrc}
                    alt={reason.imageAlt}
                    fill
                    className="object-cover"
                    style={{ borderBottomLeftRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }}
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-3">{reason.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-base mb-4">{reason.description}</p>
                </div>

             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;