import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { notFound } from 'next/navigation';
import { WorkPost } from '@/types';
import firebaseConfig from '@/lib/fb_config';
import ImageCarousel from './ImageCarousel';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const revalidate = 60; // ISR 60 seconds

// generateStaticParams stays the same
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'posts'));
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug as string,
  }));
}

// Now params is a Promise<{ slug: string }>, so await it!
export default async function PortfolioPostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // <-- Notice params is a Promise now
}) {
  const { slug } = await params; // <-- Await params here!

  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const doc = snapshot.docs[0];
  const data = doc.data() as Omit<WorkPost, 'id'>;
  const post: WorkPost = { id: doc.id, ...data };

  return (
    <main className="max-w-7xl mx-auto px-12 py-16 bg-white rounded-2xl shadow-xl drop-shadow-lg">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900 tracking-tight">{post.title}</h1>
      <ImageCarousel
        images={post.img_srcs?.length ? post.img_srcs : ['/placeholder.jpg']}
        title={post.title}
      />
    </main>
  );
}
