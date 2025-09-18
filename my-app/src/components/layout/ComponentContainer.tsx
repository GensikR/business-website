"use client";

import React, { useState } from 'react';

type ComponentContainerProps = {
  children: React.ReactNode;
};

/**
 * A full-width container that wraps content with an elegant gradient border
 * and a dynamic, interactive background.
 */
const ComponentContainer: React.FC<ComponentContainerProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    // The outermost div creates the gradient border and tracks the mouse
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        w-full relative
        p-6 bg-gradient-to-r from-[#4a85a0] to-[#D4AF37] /* <-- Changed p-2 to p-4 for a thicker border */
        rounded-3xl shadow-xl
      "
    >
      {/* The inner div holds the new background, effects, and the content */}
      <div className="relative bg-[#44403c] rounded-2xl overflow-hidden">
        
        {/* Background Effects Container */}
        <div className="absolute inset-0">
          {/* Effect 1: The interactive spotlight */}
          <div 
            className="absolute inset-0 transition-all duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.1), transparent 80%)`
            }}
          ></div>

          {/* Effect 2: The static blueprint grid */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '2.5rem 2.5rem',
            }}
          ></div>
        </div>
        
        {/* The actual content (children) is placed here, on top of the effects */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ComponentContainer;