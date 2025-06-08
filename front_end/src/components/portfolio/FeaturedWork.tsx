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
import Image from 'next/image';

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

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetched: WorkPost[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data() as Omit<WorkPost, 'id'>;
          const post: WorkPost = { id: docSnap.id, ...data };

          // Add slug if missing
          if (!post.slug && post.title) {
            const baseSlug = slugify(post.title);
            const slugExists = snapshot.docs.some(
              (d) =>
                (d.data() as WorkPost).slug === baseSlug && d.id !== docSnap.id
            );
            const finalSlug = slugExists
              ? `${baseSlug}-${post.id.substring(0, 5)}`
              : baseSlug;

            try {
              await updateDoc(doc(db, 'posts', post.id), { slug: finalSlug });
              post.slug = finalSlug;
            } catch (err) {
              console.warn(`Failed to update slug for post ${post.id}:`, err);
            }
          }

          return post;
        })
      );

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gray-100 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/work/${post.slug}`)}
            >
              {post.img_srcs?.[0] && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.img_srcs[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {post.intro}
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
