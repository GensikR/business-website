'use client';

import React from "react";
import Image from "next/image";
import PhoneNumber from "@/app/(website)/components/PhoneNumber";

type UniversalHeaderProps = {
  backgroundImageUrl: string;
};

const UniversalHeader: React.FC<UniversalHeaderProps> = ({ backgroundImageUrl }) => {
  return (
    <section className="w-full bg-white relative">
      {backgroundImageUrl && (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh]">
          <Image
            src={backgroundImageUrl}
            alt="Header image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <PhoneNumber />
      </div>
    </section>
  );
};

export default UniversalHeader;
