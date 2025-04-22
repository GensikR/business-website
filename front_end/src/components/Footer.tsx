"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
            <Link href="https://www.facebook.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition">
              <FaFacebookF className="text-gray-800 w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition">
              <FaInstagram className="text-gray-800 w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition">
              <FaLinkedinIn className="text-gray-800 w-5 h-5" />
            </Link>
            <Link href="https://twitter.com/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition">
              <FaTwitter className="text-gray-800 w-5 h-5" />
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
