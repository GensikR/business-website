"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface Service {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const servicesData: Service[] = [
  {
    title: "Cabinet Creation, Installation & Repair",
    description:
      "Custom-designed cabinets to suit your home’s style and function, including installation and expert repairs.",
    imageSrc: "/images/services/cabinet-creation.png", // Replace with actual image path
    imageAlt: "Cabinet Creation, Installation & Repair Illustration",
    link: "/services/cabinet-creation",
  },
  {
    title: "Kitchen & Bathroom Remodeling",
    description:
      "Transform your kitchen and bathroom into modern, functional spaces that fit your needs and aesthetic.",
    imageSrc: "/images/services/kitchen-bath-remodeling.png", // Replace with actual image path
    imageAlt: "Kitchen & Bathroom Remodeling Illustration",
    link: "/services/kitchen-bathroom-remodeling",
  },
  {
    title: "Floors & Walls",
    description:
      "Enhance your home with beautifully installed floors and walls, offering a variety of materials and finishes.",
    imageSrc: "/images/services/floors-walls.png", // Replace with actual image path
    imageAlt: "Floors & Walls Illustration",
    link: "/services/floors-walls",
  },
  {
    title: "Patio & Decks",
    description:
      "Create outdoor living spaces with custom patios and decks designed to blend style, durability, and comfort.",
    imageSrc: "/images/services/patio-decks.png", // Replace with actual image path
    imageAlt: "Patio & Decks Illustration",
    link: "/services/patio-decks",
  },
  {
    title: "Custom Furniture",
    description:
      "Bring your vision to life with custom furniture pieces tailored to your home’s unique style and needs.",
    imageSrc: "/images/services/custom-furniture.png", // Replace with actual image path
    imageAlt: "Custom Furniture Illustration",
    link: "/services/custom-furniture",
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Expertise</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          We specialize in delivering tailored solutions to address your home remodeling needs in the following areas:
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  layout="fill"
                  objectFit="contain"
                  className="p-4" // Add some padding around the image
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  Learn More
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Get a consultation Button */}
        <div className="mt-12 text-center">
          <Link
            href="/consultation"
            className="inline-flex items-center bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md text-lg space-x-2"
          >
            <span>Get a consultation</span>
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
