"use client";

import React from "react";

const Mission: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 italic">
            "At Mauri Remodeling, our mission is to turn houses into dream homes
            through quality craftsmanship, attention to detail, and a commitment
            to client satisfaction."
          </blockquote>
          <div className="text-sm text-gray-500">
            - Mauricio Comar
            <br />
            Founder, Mauri Remodeling
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
