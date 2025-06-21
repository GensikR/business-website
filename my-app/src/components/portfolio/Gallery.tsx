'use client';
import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '@/lib/utils/firebase_config';
import { all_services } from '@/lib/utils/getService';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface GalleryProps {
  category?: string;
}

const Gallery: React.FC<GalleryProps> = ({ category }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'), limit(50));
        const snapshot = await getDocs(q);

        const allImages = snapshot.docs
          .map((doc) => doc.data())
          .filter((data) => data.url) as { url: string; category?: string }[];

        let filtered = allImages;

        if (category) {
          const serviceMatch = all_services.find(s => s.link === category);
          const title = serviceMatch?.title ?? category;

          const matching = allImages.filter((img) =>
            img.category?.toLowerCase() === title.toLowerCase()
          );

          // If fewer than 10, include other recent ones too
          filtered = matching.length >= 10 ? matching : [...matching, ...allImages.slice(0, 10)];
        }

        setImages(filtered.map((img) => img.url));
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      }
    };

    fetchImages();
  }, [category]);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="w-full py-16 bg-white">
      <div className="relative max-w-5xl mx-auto aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-xl">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />

        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-md"
        >
          ←
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-md"
        >
          →
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
