"use client";

import React from "react";
import Link from "next/link";
import { categoryList } from "@/lib/utils/getService";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-md text-gray-800 border-t border-gray-200 select-none">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* Company Overview */}
        <div className="flex flex-col space-y-4 px-4 max-w-md mx-auto md:mx-0">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-wide mb-2">Mauri Remodeling</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Passion and precision on every project — from custom cabinets to full remodels. Transform your space with expert craftsmanship you can trust.
          </p>
        </div>

        {/* Services */}
        <nav aria-label="Footer Services" className="flex flex-col px-4 max-w-xs mx-auto md:mx-0">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 tracking-wide">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {categoryList.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect With Us */}
        <section aria-label="Social Media and Chat" className="flex flex-col px-4 max-w-xs mx-auto md:mx-0">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 tracking-wide">Connect With Us</h4>
          <div className="flex space-x-4 mb-6 justify-center md:justify-start">
            {/* Facebook */}
            <Link
              href="https://www.facebook.com/MauriIdeas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white/50 p-3 rounded-full hover:bg-white transition-shadow shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.597 1.325-1.333V1.333C24 .597 23.403 0 22.675 0z" />
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/maurinteriors/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-white/50 p-3 rounded-full hover:bg-white transition-shadow shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-4.73-4.73 4 4 0 0 1 4.73 4.73z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-6 text-sm text-center text-gray-600 px-6 select-text">
        &copy; {new Date().getFullYear()} Mauri Remodeling. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
