'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorkPost } from '@/types';
import firebaseConfig from '@/lib/fb_config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

const shuffleArray = (arr: WorkPost[]) => [...arr].sort(() => 0.5 - Math.random());

const FeaturedWork: React.FC = () => 
{
  const [allPosts, setAllPosts] = useState<WorkPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<WorkPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch all posts from Firestore
  useEffect(() => 
  {
    const fetchPosts = async () => 
    {
      const postsSnapshot = await getDocs(collection(db, 'workPosts'));
      const postsData = postsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as WorkPost)
      );
      setAllPosts(postsData);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Filter posts when allPosts changes
  useEffect(() => {
    if (allPosts.length > 0) 
    {
      filterPosts('all');
    }
  }, [allPosts]);


  // Filter posts based on selected category
  const filterPosts = (category: string) => 
  {
    setSelectedCategory(category);
    const filtered = category === 'all'
      ? shuffleArray(allPosts)
      : shuffleArray(allPosts.filter((post) => post.category === category));
    setFilteredPosts(filtered.slice(0, 6));
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 sm:px-10 lg:px-24 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Featured Work
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {blogCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => filterPosts(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => filterPosts(selectedCategory)}
            className="px-5 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition"
          >
            🔁 Reshuffle
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading work posts...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <Link
                href={`/portfolio/${post.category}/${post.slug}`}
                key={post.id}
                passHref
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                  <div className="relative h-56 sm:h-64 md:h-72 lg:h-60 w-full overflow-hidden">
                    {/* Image Path from public folder */}
                    <Image
                      src={`/images/portfolio/${post.id}/after.png`} // Use image from public/images folder
                      alt="No Image"
                      layout="fill"
                      objectFit="cover"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full shadow-md">
                      {blogCategories.find((cat) => cat.value === post.category)?.label || post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-sm text-gray-700 mb-2 line-clamp-2">
                      <strong className="block text-gray-500 mb-1">Challenge</strong>
                      {post.challenge_title}
                    </div>
                    <div className="text-sm text-gray-700 line-clamp-2">
                      <strong className="block text-gray-500 mb-1">Solution</strong>
                      {post.solution_title}
                    </div>
                    <div className="mt-4 text-blue-600 font-medium text-sm hover:underline">
                      View full project → 
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedWork;
