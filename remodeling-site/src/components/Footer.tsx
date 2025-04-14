"use client"; // Ensure this is a client component

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6 text-gray-600">
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
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={20} />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>

        {/* Chat Button (add `use client` to footer) */}
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
