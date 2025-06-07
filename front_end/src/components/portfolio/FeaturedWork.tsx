'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/fb_config';
import { useRouter } from 'next/navigation';
import type { WorkPost } from '@/types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const FeaturedWork: React.FC = () => {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'));
    const unsubscribe = onSnapshot(q, async snapshot => {
      const fetched: WorkPost[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data() as Omit<WorkPost, 'id'>;
        return { id: docSnap.id, ...data };
      });

      for (const post of fetched) {
        if (!post.slug && post.title) {
          const baseSlug = slugify(post.title);
          const slugExists = fetched.some(p => p.slug === baseSlug && p.id !== post.id);
          const finalSlug = slugExists ? `${baseSlug}-${post.id.substring(0, 5)}` : baseSlug;

          const postRef = doc(db, 'posts', post.id);
          await updateDoc(postRef, { slug: finalSlug });

          post.slug = finalSlug;
        }
      }

      setPosts(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setFeaturedPosts(getRandomPosts(posts, 6));
    }
  }, [posts]);

  const getRandomPosts = (arr: WorkPost[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleReshuffle = () => {
    setFeaturedPosts(getRandomPosts(posts, 6));
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPosts.map(post => (
        <motion.div
          key={post.id}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden min-w-0"
          onClick={() => router.push(`/portfolio/${post.slug}`)}
        >
          <img
            src={post.img_srcs?.[0] || '/placeholder.jpg'}
            alt={post.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {post.intro?.slice(0, 100) || post.body1?.slice(0, 100)}...
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</section>

  );
};

export default FeaturedWork;
