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
      console.log(`✅ Slug added to "${post.title}": ${newSlug}`);
      return { ...post, slug: newSlug };
    } catch (err) {
      console.error(`❌ Failed to update slug for "${post.title}":`, err);
    }
  }
  return post;
};

const FeaturedWork: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'), limit(FETCH_LIMIT));
      const snapshot = await getDocs(q);

      const posts: WorkPost[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const post = {
            id: docSnap.id,
            ...(docSnap.data() as Omit<WorkPost, 'id'>),
          };
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReshuffle = () => {
    setFeaturedPosts((prev) => getRandomPosts(prev, 6));
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left drop-shadow-sm">
          ✨ Featured Work
        </h2>
        <button
          onClick={handleReshuffle}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          🔀 Reshuffle
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 text-lg animate-pulse">Loading creative magic...</p>
      ) : featuredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Nothing to show.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
            const canNavigate = typeof post.slug === 'string' && post.slug.trim() !== '';

            return (
              <motion.div
                key={post.id}
                className={`bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all ${
                  canNavigate ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                }`}
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.intro}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedWork;
