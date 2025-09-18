"use-client";

import React from "react";
import Link from "next/link";
import { categoryList } from "@/lib/utils/getService";

const Footer: React.FC = () => {
  return (
    // 1. MAIN CONTAINER: Updated to a dark, semi-transparent "glass" theme.
    <footer className="bg-[#292524]/80 backdrop-blur-md text-gray-300 border-t border-white/10 select-none">
      <div className="container mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* Company Overview - Text colors updated for readability */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-extrabold text-white tracking-wide mb-2">Mauri Remodeling</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Passion and precision on every project — from custom cabinets to full remodels. Transform your space with expert craftsmanship you can trust.
          </p>
        </div>

        {/* Services - Links now use the gold accent color on hover */}
        <nav aria-label="Footer Services" className="flex flex-col">
          <h4 className="text-lg font-semibold mb-4 text-white tracking-wide">Our Services</h4>
          <ul className="space-y-3 text-sm">
            {categoryList.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="transition-colors hover:text-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect With Us - Social icons restyled for the dark theme */}
        <section aria-label="Social Media and Chat" className="flex flex-col">
          <h4 className="text-lg font-semibold mb-4 text-white tracking-wide">Connect With Us</h4>
          <div className="flex space-x-4">
            {/* Facebook */}
            <Link
              href="https://www.facebook.com/MauriIdeas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <svg
                className="w-6 h-6 text-gray-200"
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
              className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
               <svg
                className="w-6 h-6 text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Bottom Bar - Styled for the dark theme */}
      <div className="border-t border-white/10 py-6 text-sm text-center text-gray-400 px-6 select-text">
        &copy; {new Date().getFullYear()} Mauri Remodeling. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;