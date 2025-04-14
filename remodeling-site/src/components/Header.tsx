"use client"; // Ensure this is a client component

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Mauri Remodeling</h1>
        </div>
        <div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-300">About</Link></li>
              <li><Link href="/services" className="hover:text-blue-300">Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
