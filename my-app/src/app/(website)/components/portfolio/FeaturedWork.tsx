'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getFirestore,
  collection,
  orderBy,
  limit,
  getDocs,
  query,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';
import { useRouter } from 'next/navigation';
import type { WorkPost } from '@/types';

// --- Firebase and utility functions remain unchanged ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const FETCH_LIMIT = 30;

const getRandomPosts = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const titleToSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const ensureSlugForPost = async (post: WorkPost): Promise<WorkPost> => {
  if (!post.slug && post.title) {
    const newSlug = titleToSlug(post.title);
    try {
      await updateDoc(doc(db, 'posts', post.id), { slug: newSlug });
      return { ...post, slug: newSlug };
    } catch (err) {
      console.error(`❌ Failed to update slug for "${post.title}":`, err);
    }
  }
  return post;
};
// --- End of utility functions ---

const FeaturedWork: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // The fetchPosts logic and useEffect remain the same
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'), limit(FETCH_LIMIT));
        const snapshot = await getDocs(q);
        const posts: WorkPost[] = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const post = { id: docSnap.id, ...(docSnap.data() as Omit<WorkPost, 'id'>) };
            return await ensureSlugForPost(post);
          })
        );
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
    // This fetches from the initial pool of posts for faster reshuffling
    setFeaturedPosts((prev) => getRandomPosts(prev, 6));
  };
  
  return (
    // The main wrapper is now a simple div with padding, designed for the ComponentContainer
    <div className="py-20 px-6 md:px-12">
      {/* Header - Styled for the dark theme */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h2 className="text-4xl font-extrabold text-white text-center md:text-left">
          ✨ Featured Work
        </h2>
        {/* Button Redesign - A subtle, elegant "ghost" button */}
        <button
          onClick={handleReshuffle}
          className="px-5 py-2.5 text-sm font-semibold text-gray-300 bg-white/5 border border-white/20
                     rounded-lg shadow-md transition-all duration-300
                     hover:bg-white/10 hover:text-white"
        >
          🔀 Reshuffle
        </button>
      </div>
      
      {/* Loading and Empty States - Styled for the dark theme */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg animate-pulse py-16">Loading creative magic...</p>
      ) : featuredPosts.length === 0 ? (
        <p className="text-center text-gray-400 text-lg py-16">Nothing to show.</p>
      ) : (
        // Grid - The gap is slightly increased for a more spacious feel
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
            const canNavigate = typeof post.slug === 'string' && post.slug.trim() !== '';
            return (
              // Card Redesign - "Glassmorphism" effect to match the Services component
              <motion.div
                key={post.id}
                className={`bg-[#292524]/50 backdrop-blur-sm border border-white/10 rounded-2xl 
                           overflow-hidden shadow-lg shadow-black/40 transition-all duration-300
                           ${canNavigate ? 'hover:border-white/20 hover:-translate-y-2 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                whileHover={canNavigate ? { scale: 1.02 } : {}}
                onClick={() => {
                  if (canNavigate) router.push(`/portfolio/${post.slug}`);
                }}
              >
                <img
                  src={post.img_srcs?.[0] || '/placeholder.jpg'}
                  alt={post.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  {/* Text - Styled for the dark theme */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {post.intro}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturedWork;