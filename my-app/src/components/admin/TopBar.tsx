'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TopBar: React.FC = () => {
  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 fixed top-0 left-64 right-0 z-10">
      <button className="lg:hidden focus:outline-none" aria-label="Toggle menu">
        {/* Hamburger Menu SVG (same as before) */}
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link href="/admin" className="hidden lg:flex items-center font-semibold text-lg text-blue-600">
        Mauri
      </Link>

      <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full max-w-md">
        {/* Search Icon */}
        <svg
          className="w-5 h-5 text-gray-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none" aria-label="Notifications">
          {/* Bell Icon */}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 11-6 0v-1h6z" />
          </svg>
        </button>

        <div className="relative">
          <button className="flex items-center text-gray-700 focus:outline-none" aria-label="Language selector">
            <span className="mr-1">🇺🇸</span>
            English
            <svg
              className="w-4 h-4 ml-1 fill-current text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative rounded-full w-8 h-8 bg-gray-300 overflow-hidden mr-2">
            <Image
              src="/images/team/diana.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-right">
            <span className="block text-sm font-semibold text-gray-700">Diana Rubio</span>
            <span className="block text-xs text-gray-500">Admin</span>
          </div>
          <svg
            className="w-4 h-4 ml-1 fill-current text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
