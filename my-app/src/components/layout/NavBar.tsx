"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
  //TODO{ href: "/remodeling-blog", label: "Blog" },
];

// SVGs for social icons and menu icons
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.615 3.184c-1.227-.135-6.136-.135-6.136-.135s-4.902 0-6.129.135c-1.345.15-2.332 1.19-2.476 2.58-.142 1.332-.142 4.103-.142 4.103s0 2.771.142 4.103c.144 1.39 1.13 2.43 2.476 2.58 1.228.135 6.129.135 6.129.135s4.907 0 6.134-.135c1.346-.15 2.336-1.19 2.478-2.58.142-1.332.142-4.103.142-4.103s0-2.771-.142-4.103c-.142-1.39-1.132-2.43-2.478-2.58zm-9.61 7.745v-5.21l4.727 2.6-4.727 2.61z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm4.25 3a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zm5.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 8.75a3.25 3.25 0 110 6.5 3.25 3.25 0 010-6.5z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54v-2.22c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56v1.91h2.77l-.44 2.9h-2.33v7.03C18.34 21.2 22 17.07 22 12.07z" />
  </svg>
);

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const socialIcons = [
    { Icon: YoutubeIcon, href: "#" },
    { Icon: InstagramIcon, href: "#" },
    { Icon: FacebookIcon, href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div
        className="container mx-auto flex items-center justify-between h-20 px-6 md:px-12 lg:px-24
        bg-white/30 md:bg-white/30 md:backdrop-blur-md shadow-md md:shadow-md"
      >
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
          <div className="flex space-x-4 mb-6">
            {/* Facebook SVG */}
            <Link href="https://www.facebook.com/MauriIdeas" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="Facebook">
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
            <Link href="https://www.instagram.com/maurinteriors/" target="_blank" className="bg-white/50 p-2 rounded-full hover:bg-white transition" aria-label="Instagram">
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
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
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
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
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
                {socialIcons.map(({ Icon, href }, i) => (
                  <Link
                    key={i}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
                  >
                    <Icon className="w-5 h-5 text-gray-800 hover:text-blue-600" />
                  </Link>
                ))}
              </div>

              {/* Estimate button in mobile menu */}
              <Link
                href="#scheduler"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all text-sm"
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
