"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
  //TODO{ href: "/remodeling-blog", label: "Blog" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-20 px-6 md:px-12 lg:px-24 
        bg-white/30 md:bg-white/30 md:backdrop-blur-md shadow-md md:shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/images/company-logo.png"
            alt="Mauri Remodeling Logo"
            width={160}
            height={48}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -2, scale: 1.05 }}
              className="relative"
            >
              <Link
                href={link.href}
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Actions (Always Visible) */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Social Icons */}
          <div className="flex space-x-3 md:space-x-4">
            {[FaYoutube, FaInstagram, FaFacebookF].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition"
              >
                <Icon className="w-5 h-5 text-gray-800 hover:text-blue-600" />
              </Link>
            ))}
          </div>

          {/* Estimate button (always visible) */}
          <Link
            href="#scheduler"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all text-sm"
          >
            Get a Free Estimate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-gray-800 p-2 focus:outline-none"
        >
          {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Off‑canvas */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-white shadow-2xl z-50 flex flex-col p-6"
          >
            <div className="flex items-center justify-end mb-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-800 p-2"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-800 font-medium py-2 hover:text-blue-600 transition"
                >
                  {link.label}
                </Link>
              ))}

              {/* Social buttons in mobile menu */}
              <div className="flex space-x-4 pt-4">
                {[FaYoutube, FaInstagram, FaFacebookF].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
                  >
                    <Icon className="w-5 h-5 text-gray-800 hover:text-blue-600" />
                  </Link>
                ))}
              </div>

              {/* Estimate button in mobile menu */}
              <Link
                href="/consultation"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full shadow transition"
              >
                Get a Free Estimate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
