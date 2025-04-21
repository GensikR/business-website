'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types';
import firebaseConfig from '@/lib/fb_config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogCategories = [
  { value: 'all', label: 'All' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'living room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'office', label: 'Office' },
];

const shuffleArray = (arr: BlogPost[]) => {
  return [...arr].sort(() => 0.5 - Math.random());
};

const FeaturedProjects: React.FC = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, 'Blogposts'));
      const postsData = postsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as BlogPost)
      );
      setAllPosts(postsData);
      filterPosts('all'); // Initial load with random 6 of all categories
    };

    fetchPosts();
  }, []);

  const filterPosts = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      const randomAll = shuffleArray(allPosts).slice(0, 6);
      setFilteredPosts(randomAll);
    } else {
      const filteredByCategory = allPosts.filter((post) => post.category === category);
      const randomFiltered = shuffleArray(filteredByCategory).slice(0, 6);
      setFilteredPosts(randomFiltered);
    }
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Projects</h2>

        <div className="mb-6 flex space-x-4 overflow-x-auto">
          {blogCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => filterPosts(cat.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === cat.value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative w-full h-64">
                  {isValidImageUrl(post.imageSrc) ? (
                    <Image
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                      Image not available
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs rounded-full px-3 py-1 font-semibold">
                    {blogCategories.find(cat => cat.value === post.category)?.label || post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Challenge</h4>
                    <p className="text-gray-700 text-sm line-clamp-2">{post.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Solution</h4>
                    <p className="text-gray-700 text-sm line-clamp-2">{post.solution}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-blue-500 hover:underline text-sm font-semibold">
                      Read Full Project Details <span className="inline-block ml-1">&#8594;</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;