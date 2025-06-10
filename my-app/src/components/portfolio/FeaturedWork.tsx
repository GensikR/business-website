'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';
import { useRouter } from 'next/navigation';
import type { WorkPost } from '@/types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getRandomPosts = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const FeaturedWork: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          orderBy('created_time', 'desc'),
          limit(30) // You can tune this number
        );
        const snapshot = await getDocs(q);
        const posts: WorkPost[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<WorkPost, 'id'>),
        }));

        setFeaturedPosts(getRandomPosts(posts, 6));
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleReshuffle = () => {
    setFeaturedPosts((prev) => getRandomPosts(prev, 6));
  };

  return (
    <section className="bg-white py-12 px-6 md:px-20">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4 sm:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center sm:text-left w-full sm:w-auto">
          Featured Work
        </h2>
        <button
          onClick={handleReshuffle}
          className="mt-4 sm:mt-0 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition duration-200"
        >
          Reshuffle
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : featuredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => router.push(`/portfolio/${post.slug}`)}
            >
              <img
                src={post.img_srcs[0]}
                alt={post.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.intro}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedWork;
