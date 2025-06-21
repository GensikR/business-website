'use client';

import React from "react";
import Image from "next/image";
import PhoneNumber from "@/components/PhoneNumber";

type UniversalHeaderProps = {
  backgroundImageUrl: string;
};

const UniversalHeader: React.FC<UniversalHeaderProps> = ({ backgroundImageUrl }) => {
  return (
    <section className="w-full bg-white py-8 sm:py-16">
      {backgroundImageUrl && (
        <div className="relative w-full max-w-5xl mx-auto px-4">
          <div className="relative">
            <Image
              src={backgroundImageUrl}
              alt="Header image"
              width={1600}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />

            {/* ❗ Hidden on small screens (mobile), shown only on desktop */}
            <div className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
              <PhoneNumber />
            </div>
          </div>

          {/* ❗Shown only on small screens (mobile), not on desktop */}
          <div className="block sm:hidden mt-4">
            <PhoneNumber />
          </div>
        </div>
      )}
    </section>
  );
};

export default UniversalHeader;
