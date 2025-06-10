import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { notFound } from 'next/navigation';
import { WorkPost } from '@/types';
import firebaseConfig from '@/lib/utils/firebase_config';
import ImageCarousel from '../../../../components/portfolio/ImageCarousel';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'posts'));
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug as string,
  }));
}

export default async function PortfolioPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const q = query(collection(db, 'posts'), where('slug', '==', slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const doc = snapshot.docs[0];
  const data = doc.data() as Omit<WorkPost, 'id'>;

  // Omit created_time to avoid serialization issues
  const { created_time: _, ...safeData } = data;
  const post: WorkPost = { id: doc.id, ...safeData } as WorkPost;

  return (
    <main className="max-w-7xl mx-auto px-12 py-16 bg-white rounded-2xl shadow-xl drop-shadow-lg">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-900 tracking-tight">
        {post.title}
      </h1>

      <ImageCarousel
        images={post.img_srcs?.length ? post.img_srcs : ['/placeholder.jpg']}
        title={post.title}
      />

      <section className="mt-12 space-y-8 text-gray-800 text-lg leading-relaxed">
        <p className="text-2xl font-medium text-gray-700">{post.intro}</p>
        <p>{post.body1}</p>
        <p>{post.body2}</p>
        <p className="font-semibold">{post.conclusion}</p>

        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-blue-600 hover:text-blue-800 underline"
        >
          View Original Facebook Post
        </a>
      </section>
    </main>
  );
}
