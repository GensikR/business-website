'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '@/lib/utils/firebase_config';
import Image from 'next/image';

// 🔧 Firebase Setup
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'), limit(20));
        const snapshot = await getDocs(q);

        const imgList: string[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.img_srcs)) {
            imgList.push(...data.img_srcs);
          }
        });

        const shuffled = imgList.sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 20));
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      }
    };

    fetchImages();
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="relative w-full max-w-5xl h-[300px] sm:h-[450px] mx-auto overflow-hidden rounded-xl shadow-xl">
        <Image
          src={images[currentIndex]}
          alt={`Gallery Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow transition"
        >
          ←
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow transition"
        >
          →
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
