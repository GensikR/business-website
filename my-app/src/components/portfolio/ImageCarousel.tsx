'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full max-h-[600px] rounded-lg overflow-visible shadow-lg mb-12 select-none">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[currentImageIndex]}
          src={images[currentImageIndex]}
          alt={`${title} image ${currentImageIndex + 1}`}
          className="w-full h-auto max-h-[600px] object-contain rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          draggable={false}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button onClick={prevImage} className="bg-white p-2 rounded-full shadow hover:scale-105">←</button>
          <button onClick={nextImage} className="bg-white p-2 rounded-full shadow hover:scale-105">→</button>
        </div>
      )}
    </div>
  );
}
