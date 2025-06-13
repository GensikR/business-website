'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, collapsed }) => (
  <Link
    href={href}
    className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
  >
    {icon}
    {!collapsed && <span className="ml-3">{label}</span>}
  </Link>
);

const AdminNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-white ${
        collapsed ? 'w-20' : 'w-64'
      } h-screen py-6 px-3 shadow-md fixed top-0 left-0 overflow-y-auto z-20 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-blue-600"
        aria-label="Toggle sidebar"
      >
        {/* Hamburger Menu SVG */}
        <svg
          className="w-6 h-6"
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

      {/* Logo or Title */}
      {!collapsed && (
        <div className="mb-8">
          <Link
            href="/admin"
            className="flex items-center justify-center py-2 font-semibold text-lg text-blue-600"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l6-6" />
            </svg>
            Remodel Admin
          </Link>
        </div>
      )}

      {/* Nav Items */}
      <nav>
        <NavItem
          href="/admin/inbox"
          label="Inbox"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6" />
              <path d="M16 17l-4 4-4-4" />
              <path d="M12 12v9" />
            </svg>
          }
          collapsed={collapsed}
        />
        <NavItem
          href="/admin/portfolio"
          label="Portfolio"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z" />
              <path d="M17 10l-4-4" />
              <path d="M12 10v4" />
            </svg>
          }
          collapsed={collapsed}
        />
        <NavItem
          href="/admin/calendar"
          label="Calendar"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          collapsed={collapsed}
        />
        <NavItem
          href="/admin/appointments"
          label="Appointments"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

export default AdminNav;
