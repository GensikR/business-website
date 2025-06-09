"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/types";
import { all_services } from "@/lib/utils/getService";

interface ServiceViewProps {
  service_name: string;
}

const ServiceView: React.FC<ServiceViewProps> = ({ service_name }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const matchedService = all_services.find(
      (s) => s.title === service_name
    ) || null;
    setService(matchedService);
  }, [service_name]);

  if (!service) {
    return <div className="text-center text-gray-600">Loading service...</div>;
  }

  const prevImage = () =>
    setGalleryIndex((prev) =>
      prev === 0 && service.gallery
        ? service.gallery.length - 1
        : prev - 1
    );

  const nextImage = () =>
    setGalleryIndex((prev) =>
      service.gallery && prev === service.gallery.length - 1
        ? 0
        : prev + 1
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-gray-900">
      {/* Title & Description */}
      <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{service.description}</p>

      {/* Main Image */}
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src={service.image}
          alt={service.title}
          className="w-full object-cover h-64 md:h-96"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <section className="mb-10 prose max-w-none text-gray-700">
        <p>{service.details}</p>
      </section>

      {/* Features */}
      {service.features && service.featureDetails && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-6">
            {service.features.map((feature, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{feature}</h3>
                <p className="text-sm text-gray-700">
                  {service.featureDetails?.[index]}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gallery */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={service.gallery[galleryIndex]}
              alt={`Gallery ${galleryIndex + 1}`}
              className="w-full h-72 object-cover select-none"
              loading="lazy"
            />
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              ›
            </button>
          </div>
        </section>
      )}

      {/* CTA */}
      {service.quoteCTA && (
        <div className="mt-10 text-center">
          <p className="text-xl font-semibold mb-4">{service.quoteCTA}</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Get a Free Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceView;
