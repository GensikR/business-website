"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa';

const NavBar: React.FC = () => {
  return (
    <header className="bg-white h-16 px-6 md:px-12 lg:px-24 flex items-center justify-between shadow-md sticky top-0 z-50">
  {/* Logo */}
  <Link href="/" className="flex items-center h-full">
    <div className="h-full flex items-center">
      <Image
        src="/images/company-logo.png"
        alt="Your Company Logo"
        width={150}
        height={40}
        className="max-h-full object-contain"
      />
    </div>
  </Link>


      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          About Us
        </Link>
        <Link
          href="/portfolio"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Portfolio
        </Link>
        <Link
          href="/services"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Services
        </Link>
        <Link
          href="/contact"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Contact Us
        </Link>
        <Link
          href="/remodeling-blog"
          className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Blog
        </Link>
      </nav>

      {/* Social Media Icons */}
      <div className="flex space-x-4 md:space-x-6 items-center">
        <Link href="https://www.youtube.com" target="_blank" className="text-gray-600 hover:text-red-500 transition-all duration-300">
          <FaYoutube className="h-6 w-6" />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" className="text-gray-600 hover:text-pink-500 transition-all duration-300">
          <FaInstagram className="h-6 w-6" />
        </Link>
        <Link href="https://www.facebook.com" target="_blank" className="text-gray-600 hover:text-blue-600 transition-all duration-300">
          <FaFacebookF className="h-6 w-6" />
        </Link>
      </div>

      {/* Get a Consultation Button */}
      <Link
        href="/consultation"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hidden md:inline-flex items-center space-x-2 h-12 transition-all duration-300 transform hover:scale-105"
      >
        <span>Get a Free Estimate</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
