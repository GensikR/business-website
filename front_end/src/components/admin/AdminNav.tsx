'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  AiOutlineMenu,
  AiOutlineInbox,
  AiOutlineCalculator,
  AiOutlineCheckSquare,
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineTool,
  AiOutlineLineChart,
  AiOutlineUsergroupAdd,
  AiOutlineProject,
  AiOutlinePieChart,
  AiOutlineBarChart,
} from 'react-icons/ai';

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
      >
        <AiOutlineMenu className="w-6 h-6" />
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
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l6-6"
              />
            </svg>
            Remodel Admin
          </Link>
        </div>
      )}

      {/* Nav Items */}
      <nav>
        <NavItem href="/admin/inbox" label="Inbox" icon={<AiOutlineInbox className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/estimates" label="Estimates" icon={<AiOutlineCalculator className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/todo" label="To-Do List" icon={<AiOutlineCheckSquare className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/blog" label="Blog" icon={<AiOutlineBook className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/calendar" label="Calendar" icon={<AiOutlineCalendar className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/services" label="Services" icon={<AiOutlineTool className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/financials" label="Financials" icon={<AiOutlineLineChart className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/clients" label="Clients" icon={<AiOutlineUsergroupAdd className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/projects" label="Projects" icon={<AiOutlineProject className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/marketing" label="Marketing" icon={<AiOutlinePieChart className="w-5 h-5" />} collapsed={collapsed} />
        <NavItem href="/admin/analytics" label="Analytics" icon={<AiOutlineBarChart className="w-5 h-5" />} collapsed={collapsed} />
      </nav>
    </aside>
  );
};

export default AdminNav;
