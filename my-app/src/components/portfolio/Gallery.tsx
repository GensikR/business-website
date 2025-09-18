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
// CORRECTED: The import path is now 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'; 
import firebaseConfig from '@/lib/utils/firebase_config';
import { all_services } from '@/lib/utils/getService';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        const allImages = snapshot.docs.map((doc) => doc.data()).filter((data) => data.url) as { url: string; category?: string }[];
        let filtered = allImages;
        if (category) {
          const serviceMatch = all_services.find(s => s.link === category);
          const title = serviceMatch?.title ?? category;
          const matching = allImages.filter((img) => img.category?.toLowerCase() === title.toLowerCase());
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
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) return null;

  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="py-20 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Project Gallery
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          A glimpse into the quality and craftsmanship we bring to every home.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full shadow-md transition-colors"
          aria-label="Previous Image"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full shadow-md transition-colors"
          aria-label="Next Image"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-[#D4AF37] scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;