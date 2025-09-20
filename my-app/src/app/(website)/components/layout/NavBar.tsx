'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icon Components ---
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.334C0 23.403.597 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.588l-.467 3.622h-3.12V24h6.116c.728 0 1.325-.597 1.325-1.333V1.333C24 .597 23.403 0 22.675 0z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);
const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#292524]/80 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-gradient-to-b from-black/50 to-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              {/* === CORRECTED LOGO SIZE === */}
              <Image 
                src="/images/logo2.png"
                alt="Mauri Remodeling Logo" 
                width={80} // Smaller, more appropriate width
                height={45} // Height calculated to maintain aspect ratio
                priority 
                className="w-[68px] h-[38px] md:w-[80px] md:h-[45px]" // Responsive sizes
              />
            </Link>
            <div className="flex md:hidden items-center space-x-3 text-gray-200">
              <Link href="https://www.facebook.com/MauriIdeas" target="_blank" className="hover:text-white"><FacebookIcon /></Link>
              <Link href="https://www.instagram.com/maurinteriors/" target="_blank" className="hover:text-white"><InstagramIcon /></Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-8 text-gray-200">
              <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
              <Link href="/portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link>
              <Link href="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link>
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-3 text-gray-200">
              <Link href="https://www.facebook.com/MauriIdeas" target="_blank" className="hover:text-white"><FacebookIcon /></Link>
              <Link href="https://www.instagram.com/maurinteriors/" target="_blank" className="hover:text-white"><InstagramIcon /></Link>
            </div>
            <Link href="#scheduler" className="bg-[#D4AF37] text-stone-900 font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-amber-400 transition-colors shadow-md">
              Get a Free Estimate
            </Link>
          </div>
          
          {/* Mobile CTA & Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link href="#scheduler" className="text-white hover:text-[#D4AF37] p-2 rounded-full" aria-label="Schedule an estimate">
              <CalendarIcon />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-50" aria-label="Toggle menu">
              {isMenuOpen ? (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#1c1917]/95 backdrop-blur-lg flex flex-col p-8">
            <div className="h-20 flex-shrink-0"></div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-8">
              <Link href="/about" className="text-3xl font-bold text-gray-200 hover:text-[#D4AF37]" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/portfolio" className="text-3xl font-bold text-gray-200 hover:text-[#D4AF37]" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
              <Link href="/services" className="text-3xl font-bold text-gray-200 hover:text-[#D4AF37]" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/contact" className="text-3xl font-bold text-gray-200 hover:text-[#D4AF37]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
            <div className="flex-shrink-0 w-full text-center pb-8">
                <div className="flex items-center justify-center space-x-8 mb-8 text-gray-200">
                    <Link href="https://www.facebook.com/MauriIdeas" target="_blank" className="hover:text-white" onClick={() => setIsMenuOpen(false)}><FacebookIcon /></Link>
                    <Link href="https://www.instagram.com/maurinteriors/" target="_blank" className="hover:text-white" onClick={() => setIsMenuOpen(false)}><InstagramIcon /></Link>
                </div>
                <Link href="#scheduler" className="bg-[#D4AF37] text-stone-900 font-bold px-8 py-4 rounded-lg text-lg" onClick={() => setIsMenuOpen(false)}>
                    Get a Free Estimate
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;