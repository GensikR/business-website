"use client";

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24 text-gray-600">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mauri Remodeling</h3>
          <p className="text-sm">
          At Mauri Remodeling, we take pride in treating every project like it's our own home.
          Whether it's custom cabinets, handcrafted furniture, deep cleaning, new flooring, 
          or any other remodeling service, Mauri brings care, experience, and attention to detail to every job.
          No task is too small or too big — just quality work you can count on.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaLinkedinIn size={20} />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-blue-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-blue-500">
                Portofolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services" className="hover:text-blue-500">
                Cabinet Creation, Installation & Repair
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500">
                Kitchen & Bathroom Remodeling
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500">
                Floors & Walls
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500">
                Patio & Decks
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500">
                Custom Furniture
              </Link>
            </li>
          </ul>
        </div>

        {/* Open Chat */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Open Chat</h3>
          <p className="text-sm">
            Need immediate assistance? Click the button below to chat with our team.
          </p>
          <button
            onClick={() => alert('Chat feature coming soon!')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2"
          >
            Open Chat
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        &copy; Mauri Remodeling 2024 | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;