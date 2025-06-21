'use client';
import React, { useEffect, useState } from 'react';
import { Service } from '@/types';
import { all_services } from '@/lib/utils/getService';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '@/lib/utils/firebase_config';
import FeaturedWork from '@/components/portfolio/FeaturedWork';
import Scheduler from '@/components/scheduler/Scheduler';
import Gallery from '../portfolio/Gallery';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface ServiceViewProps {
  service_name: string;
}

const ServiceView: React.FC<ServiceViewProps> = ({ service_name }) => {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const matchedService = all_services.find((s) => s.title === service_name) || null;
    setService(matchedService);
  }, [service_name]);

  if (!service) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500 text-lg font-medium select-none">
        Loading service...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-16 font-sans text-gray-900">
      {/* Title and Description */}
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-gray-900 drop-shadow-sm">
          {service.title}
        </h1>
        <p className="mt-3 text-xl text-gray-600 max-w-3xl">{service.description}</p>
      </header>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 ring-1 ring-gray-200 hover:shadow-3xl transition-shadow duration-300">
        <Gallery category={service_name}/>
      </div>

      {/* Service Details */}
      <section className="mb-14 prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>{service.details}</p>
      </section>

      {/* Features */}
      {service.features && service.featureDetails && (
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 border-b-2 border-indigo-500 inline-block pb-1">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-indigo-300/30 transition-shadow duration-300"
                tabIndex={0}
                aria-label={`Feature: ${feature}`}
              >
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{feature}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.featureDetails?.[idx]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured Work & Scheduler */}
      <FeaturedWork />
      <Scheduler />
    </div>
  );
};

export default ServiceView;
