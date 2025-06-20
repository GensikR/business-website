'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import Image from 'next/image';
import firebaseConfig from '@/lib/utils/firebase_config';

// ✅ Firebase setup
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  // 🔄 Fetch random images from Firestore
  const fetchImages = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'));
      const snapshot = await getDocs(q);

      const allImages: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const imgs = data.img_srcs;
        if (Array.isArray(imgs)) {
          allImages.push(...imgs);
        }
      });

      // Shuffle and pick 20
      const shuffled = allImages.sort(() => 0.5 - Math.random());
      setImages(shuffled.slice(0, 20));
    } catch (err) {
      console.error('❌ Failed to fetch gallery images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) return null;

  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="relative w-full max-w-5xl mx-auto h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={images[current]}
          alt=""
          fill
          className="object-contain bg-white transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 800px"
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
        >
          ←
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
        >
          →
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === current ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
