'use client';

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/lib/utils/firebase_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('created_time', 'desc'), limit(20));
        const snapshot = await getDocs(q);

        const allImages: string[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.img_srcs)) {
            allImages.push(...data.img_srcs);
          }
        });

        setImages(allImages.slice(0, 40)); // Limit final display
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section
      style={{
        maxWidth: 1200,
        margin: '3rem auto',
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery Image ${i + 1}`}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              objectFit: 'cover',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'zoom-in',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
