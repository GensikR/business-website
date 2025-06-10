'use client';
import React, { useEffect, useState } from 'react';
import { Service } from '@/types';
import { all_services } from '@/lib/utils/getService';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '@/lib/utils/firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ServiceViewProps {
  service_name: string;
}

const ServiceView: React.FC<ServiceViewProps> = ({ service_name }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const matchedService = all_services.find(
      (s) => s.title === service_name
    ) || null;
    setService(matchedService);
  }, [service_name]);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      const allImages: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.img_srcs)) {
          allImages.push(...data.img_srcs);
        }
      });

      // Shuffle and take up to 10 random images
      const shuffled = allImages.sort(() => 0.5 - Math.random()).slice(0, 10);
      setGalleryImages(shuffled);
    };

    fetchRandomImages();
  }, []);

  const prevImage = () =>
    setGalleryIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  const nextImage = () =>
    setGalleryIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  if (!service) {
    return <div className="text-center text-gray-600">Loading service...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-gray-900">
      <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{service.description}</p>

      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <img
          src={service.image}
          alt={service.title}
          className="w-full object-cover h-64 md:h-96"
          loading="lazy"
        />
      </div>

      <section className="mb-10 prose max-w-none text-gray-700">
        <p>{service.details}</p>
      </section>

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

      {galleryImages.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={galleryImages[galleryIndex]}
              alt={`Gallery ${galleryIndex + 1}`}
              className="w-full h-72 object-cover select-none"
              loading="lazy"
            />
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                onClick={prevImage}
                className="bg-white/70 hover:bg-white text-gray-800 font-bold py-1 px-3 rounded-full shadow"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="bg-white/70 hover:bg-white text-gray-800 font-bold py-1 px-3 rounded-full shadow"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceView;
