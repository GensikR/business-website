"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types";

type Props = {
  service: Service;
};

const ServiceInfo: React.FC<Props> = ({ service }) => {
  return (
    <section className="bg-white py-12">
      {/* Title & Description */}
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          {service.title}
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
          {service.description}
        </p>
        <div className="w-full max-w-4xl mx-auto mb-12">
          <Image
            src={service.images[0]}
            alt={service.title}
            width={1000}
            height={600}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What’s Included in This Service
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {service.details}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
