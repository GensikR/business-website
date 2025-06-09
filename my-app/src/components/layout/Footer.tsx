"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/30 backdrop-blur-md text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Overview */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Mauri Remodeling</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            We bring passion and precision to every project — from custom cabinets to full remodels.
            Let Mauri transform your space with the quality craftsmanship you deserve.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link href="/portfolio" className="hover:text-blue-600">Portfolio</Link></li>
            <li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-blue-600">Cabinet Installation</Link></li>
            <li><Link href="/services" className="hover:text-blue-600">Kitchen Remodeling</Link></li>
            <li><Link href="/services" className="hover:text-blue-600">Flooring</Link></li>
            <li><Link href="/services" className="hover:text-blue-600">Custom Furniture</Link></li>
          </ul>
        </div>

        {/* Social & Chat */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Connect With Us</h4>
          <div className="flex space-x-4 mb-6">
            {/* Facebook SVG */}
            <Link href="https://www.facebook.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="Facebook">
              <svg
                className="w-5 h-5 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.597 1.325-1.333V1.333C24 .597 23.403 0 22.675 0z" />
              </svg>
            </Link>

            {/* Instagram SVG */}
            <Link href="https://www.instagram.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="Instagram">
              <svg
                className="w-5 h-5 text-gray-800"
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

            {/* LinkedIn SVG */}
            <Link href="https://www.linkedin.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="LinkedIn">
              <svg
                className="w-5 h-5 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm13.25 11.25h-3v-5.5c0-1.32-.02-3-1.82-3-1.82 0-2.1 1.42-2.1 2.89v5.61h-3v-10h2.88v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v5.6z" />
              </svg>
            </Link>

            {/* Twitter SVG */}
            <Link href="https://twitter.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="Twitter">
              <svg
                className="w-5 h-5 text-gray-800"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.93 4.93 0 0 0 2.163-2.724 9.94 9.94 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.379 4.482 13.94 13.94 0 0 1-10.11-5.13 4.822 4.822 0 0 0-.664 2.475c0 1.71.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.224-.616c-.054 1.97 1.381 3.813 3.444 4.22a4.93 4.93 0 0 1-2.212.084 4.923 4.923 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.936 13.936 0 0 0 7.548 2.209c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.015-.636A10.012 10.012 0 0 0 24 4.59z" />
              </svg>
            </Link>
          </div>
          <button
            onClick={() => alert("Chat feature coming soon!")}
            className="w-full text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow transition"
          >
            Open Chat
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-6 text-sm text-center text-gray-600 px-6">
        &copy; {new Date().getFullYear()} Mauri Remodeling. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
