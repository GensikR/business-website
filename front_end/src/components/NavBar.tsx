"use client";

import React from 'react';
import Link from 'next/link';
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa'; // Import social media icons

const NavBar: React.FC = () => {
  return (
    <header className="bg-white py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center h-16">
        <img src="/images/company-logo.png" alt="Logo" className="h-full w-auto object-contain" />
      </Link>


      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
        <Link href="/portfolio" className="text-gray-600 hover:text-blue-500">Portfolio</Link>
        <Link href="/services" className="text-gray-600 hover:text-blue-500">Services</Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact Us</Link>
        <Link href="/remodeling-blog" className="text-gray-600 hover:text-blue-500">Blog</Link>
      </nav>

      {/* Get a Consultation Button */}
      <Link
        href="/consultation"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hidden md:inline-flex items-center space-x-2 h-12"
      >
        {/* Added fixed height to match potential logo height */}
        <span>Get a Free Estimate</span>
        <span />
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" clipRule="evenodd" />
          </svg>
        </button>
        {/* <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md mt-1 py-2 flex flex-col items-center space-y-3">
          <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
          <Link href="/case-studies" className="text-gray-600 hover:text-blue-500">Case Studies</Link>
          <Link href="/services" className="text-gray-600 hover:text-blue-500">Services</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact Us</Link>
          <Link href="/consultation" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Get a consultation</Link>
        </div> */}
      </div>
    </header>
  );
};

export default NavBar;
