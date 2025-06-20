'use client';

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';
import Image from 'next/image';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FETCH_LIMIT = 20;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const fetchImages = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'), limit(FETCH_LIMIT));
      const snapshot = await getDocs(q);

      const allImages: string[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.img_srcs)) {
          allImages.push(...data.img_srcs);
        }
      });

      setImages(allImages.slice(0, 30));
    } catch (err) {
      console.error('Failed to load gallery images:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setIndex((prev) => (prev + 1) % images.length);

  if (images.length === 0) return null;

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="relative max-w-5xl mx-auto h-[300px] sm:h-[450px] overflow-hidden rounded-xl shadow-lg">
        <Image
          src={images[index]}
          alt={`Gallery Image ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />

        <button
          onClick={prev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow hover:bg-white transition"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow hover:bg-white transition"
        >
          →
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
