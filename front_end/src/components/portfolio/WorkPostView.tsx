'use client';

import React from 'react';
import Image from 'next/image';
import { WorkPost } from '@/types'; // Assuming you have WorkPost interface in this path

interface WorkPostViewProps {
  post: WorkPost;
}

const WorkPostView: React.FC<WorkPostViewProps> = ({ post }) => {
  // Helper function to check if image URL is valid
  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 sm:px-10 lg:px-24 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Title and Category */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900">{post.title}</h2>
          <span className="mt-2 inline-block text-lg text-gray-600 uppercase font-semibold tracking-wide">
            {post.category}
          </span>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image 1 */}
          {isValidImageUrl(post.image1Src) ? (
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={post.image1Src}
                alt={post.image1Alt}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}

          {/* Image 2 */}
          {isValidImageUrl(post.image2Src) ? (
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={post.image2Src}
                alt={post.image2Alt}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Challenge Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Challenge</h3>
          <p className="text-lg text-gray-700">{post.challenge_content || post.challenge}</p>
        </div>

        {/* Solution Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Solution</h3>
          <p className="text-lg text-gray-700">{post.solution_content || post.solution}</p>
        </div>

        {/* Conclusion Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{post.conclusion_title}</h3>
          <p className="text-lg text-gray-700">{post.conclusion_content}</p>
        </div>
      </div>
    </section>
  );
};

export default WorkPostView;
