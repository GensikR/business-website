'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/fb_config';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkPost } from '@/types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PortfolioPostPage: React.FC = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<WorkPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const fetchPostBySlug = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setPost(null);
          setLoading(false);
          return;
        }
      const docData = snapshot.docs[0].data() as Omit<WorkPost, 'id'>;
      setPost({ id: snapshot.docs[0].id, ...docData });

      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      }
      setLoading(false);
    };

    fetchPostBySlug();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-gray-500 py-20 text-lg">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-center text-red-500 py-20">
        <p className="text-xl font-semibold mb-4">Post not found.</p>
        <button
          onClick={() => router.push('/portfolio')}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  const images: string[] = post.img_srcs && post.img_srcs.length > 0 ? post.img_srcs : ['/placeholder.jpg'];

  // Image carousel navigation handlers
  const prevImage = () => setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <main className="max-w-7xl mx-auto px-12 py-16 bg-white rounded-2xl shadow-xl drop-shadow-lg">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900 tracking-tight">{post.title}</h1>

      {/* Image Carousel */}
      <div className="relative w-full max-h-[600px] rounded-lg overflow-visible shadow-lg mb-12 select-none">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[currentImageIndex]}
            src={images[currentImageIndex]}
            alt={`${post.title} image ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[600px] object-contain rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            draggable={false}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60 transition"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-60 transition"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <article className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Getting Started</h3>
  <p className="text-xl mb-8">{post.intro}</p>

  <h3 className="text-2xl font-semibold mb-4 text-gray-900">The Story</h3>
  <p className="text-xl">{post.body1}</p>
  {post.body2 && <p className="text-xl mt-4">{post.body2}</p>}

  <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">Wrapping Up</h3>
  <p className="text-xl">{post.conclusion}</p>
</article>


      {/* Back Button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => router.push('/portfolio')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg text-lg font-semibold transition"
        >
          Back to Portfolio
        </button>
      </div>
    </main>
  );
};

export default PortfolioPostPage;
