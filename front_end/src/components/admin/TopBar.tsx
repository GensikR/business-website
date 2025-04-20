import React from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';

const TopBar: React.FC = () => {
  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 fixed top-0 left-64 right-0 z-10">
      <button className="lg:hidden focus:outline-none">
        <AiOutlineMenu className="w-6 h-6 text-gray-700" />
      </button>

      <Link href="/admin" className="hidden lg:flex items-center font-semibold text-lg text-blue-600">
        Mauri
      </Link>

      <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full max-w-md">
        <AiOutlineSearch className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none">
          <BiBell className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative">
          <button className="flex items-center text-gray-700 focus:outline-none">
            <span className="mr-1">🇺🇸</span>
            English
            <svg className="w-4 h-4 ml-1 fill-current text-gray-500" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center">
          <div className="rounded-full w-8 h-8 bg-gray-300 overflow-hidden mr-2">
            <img src="../images/team/diana.png" alt="User Avatar" className="object-cover w-full h-full" />
          </div>
          <div className="text-right">
            <span className="block text-sm font-semibold text-gray-700">Diana Rubio</span>
            <span className="block text-xs text-gray-500">Admin</span>
          </div>
          <svg className="w-4 h-4 ml-1 fill-current text-gray-500" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
