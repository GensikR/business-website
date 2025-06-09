"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const Mission: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-70 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-gray-200">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>

          <blockquote className="text-3xl md:text-4xl font-serif text-gray-800 leading-relaxed italic relative">
            <span className="text-6xl text-blue-300 absolute -left-8 -top-6 select-none">“</span>
            At Mauri Remodeling, our mission is to turn houses into dream homes through quality craftsmanship,
            attention to detail, and a commitment to client satisfaction.
            <span className="text-6xl text-blue-300 absolute -right-8 -bottom-6 select-none">”</span>
          </blockquote>

          <div className="mt-8 text-gray-700 text-base md:text-lg">
            <div className="mb-1 font-semibold">— Mauricio Comar</div>
            <div className="text-sm text-gray-500 italic">Founder, Mauri Remodeling</div>
          </div>
        </div>
      </div>

      {/* Decorative BG Sparkles (optional flair) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/texture/noise.png')] opacity-5 pointer-events-none" />
    </section>
  );
};

export default Mission;
