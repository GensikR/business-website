"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface Project {
  title: string;
  challenge: string;
  solution: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  category: "All" | "Kitchen" | "Bathroom" | "Whole House";
}

const projects: Project[] = [
  {
    title: "Kitchen Remodel for a Family Home",
    challenge: "The client's outdated kitchen lacked functionality and style.",
    solution: "Redesigned layout, modern appliances, and efficient storage.",
    imageSrc: "/images/portfolio/kitchen-remodel.png",
    imageAlt: "Kitchen Remodel Project",
    link: "/portfolio/kitchen-remodel",
    category: "Kitchen",
  },
  {
    title: "Modern Bathroom Oasis",
    challenge: "The space felt cramped and outdated.",
    solution: "Created an open, spa-like experience with sleek finishes.",
    imageSrc: "/images/portfolio/bathroom-renovation.png",
    imageAlt: "Bathroom Renovation Project",
    link: "/portfolio/bathroom-renovation",
    category: "Bathroom",
  },
  {
    title: "Whole House Modernization",
    challenge: "Aging home needed a full makeover.",
    solution: "Blended charm with modern upgrades throughout the house.",
    imageSrc: "/images/portfolio/whole-house-renovation.png",
    imageAlt: "Whole House Renovation Project",
    link: "/portfolio/whole-house-renovation",
    category: "Whole House",
  },
  {
    title: "Contemporary Kitchen for Entertaining",
    challenge: "The kitchen wasn't functional for large gatherings.",
    solution: "Opened the layout, added an island, and updated finishes.",
    imageSrc: "/images/portfolio/kitchen-remodel.png",
    imageAlt: "Entertaining Kitchen Project",
    link: "/portfolio/kitchen-entertaining",
    category: "Kitchen",
  },
  {
    title: "Compact Bathroom Upgrade",
    challenge: "A small space needed better utility and a refresh.",
    solution: "Maximized space with clever design and fixtures.",
    imageSrc: "/images/portfolio/kitchen-remodel.png",
    imageAlt: "Compact Bathroom Project",
    link: "/portfolio/compact-bathroom",
    category: "Bathroom",
  },
  {
    title: "Whole Home Scandinavian Style",
    challenge: "The house lacked a cohesive style.",
    solution: "Applied a Scandinavian design across all living areas.",
    imageSrc: "/images/portfolio/kitchen-remodel.png",
    imageAlt: "Scandinavian Whole House Project",
    link: "/portfolio/scandinavian-home",
    category: "Whole House",
  },
];

const categories: Project["category"][] = ["All", "Kitchen", "Bathroom", "Whole House"];

const FeaturedWork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Project["category"]>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-3xl font-bold text-gray-800 flex flex-wrap gap-3.5 pl-4 mb-6">Featured Projects</h2>

        {/* Category Navigation Bar (horizontal and indented) */}
        <div className="flex flex-wrap gap-3.5 pl-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-medium rounded-full transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="transform scale-90 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative w-full h-64">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="object-center"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-600 mb-1.5">{project.title}</h3>
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-0.5">Challenge</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.challenge}</p>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-0.5">Solution</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.solution}</p>
                </div>
                <div className="mt-5">
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Read Full Project Details
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="mt-10 text-center">
          <Link
            href="/remodeling-blog"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-semibold text-sm"
          >
            View More
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
