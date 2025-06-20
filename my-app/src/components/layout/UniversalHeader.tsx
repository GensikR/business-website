"use client";

import React from "react";
import Image from "next/image";

type UniversalHeaderProps = {
  backgroundImageUrl: string;
};

const UniversalHeader: React.FC<UniversalHeaderProps> = ({ backgroundImageUrl }) => {
  return (
    <section className="w-full flex justify-center items-center bg-white py-8 sm:py-16">
      {backgroundImageUrl && (
        <div className="relative w-full max-w-5xl px-4">
          <Image
            src={backgroundImageUrl}
            alt="Header image"
            width={1600}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}
    </section>
  );
};

export default UniversalHeader;
