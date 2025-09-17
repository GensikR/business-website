'use client';

import React from "react";
import Image from "next/image";
import PhoneNumber from "@/components/PhoneNumber";

type UniversalHeaderProps = {
  backgroundImageUrl: string;
};

const UniversalHeader: React.FC<UniversalHeaderProps> = ({ backgroundImageUrl }) => {
  return (
    <section className="w-full bg-white relative">
      {backgroundImageUrl && (
        <div className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src={backgroundImageUrl}
            alt="Header image"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Positioning the PhoneNumber component, let its internal styles handle appearance */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <PhoneNumber />
      </div>
    </section>
  );
};

export default UniversalHeader;