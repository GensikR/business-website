import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '@/lib/fb_config';
import { initializeApp } from 'firebase/app';
import { notFound } from 'next/navigation';
import { WorkPost } from '@/types';

// Firebase init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function WorkPostPage({ params }: PageProps) {
  const { category, slug } = params;
  const workPostsRef = collection(db, 'workPosts');
  const q = query(workPostsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const post = querySnapshot.docs[0].data() as WorkPost;

  return (
    <div className="bg-white container mx-auto px-6 sm:px-8 py-12">
      {/* Post Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 italic">{post.introduction}</p>
      </header>

      {/* Challenge Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Challenge: {post.challenge_title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{post.challenge_content}</p>
        
        {/* Before Image after Challenge Content */}
        <div className="mt-8 flex justify-center">
          <img
            src={"images/before.png"}
            alt={"No before image available"}
            className="max-w-sm w-full h-auto rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          />
        </div>
      </section>

      {/* Solution Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Solution: {post.solution_title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{post.solution_content}</p>
        
        {/* After Image after Solution Content */}
        <div className="mt-8 flex justify-center">
          <img
            src={"images/after.png"}
            alt={"No after image available"}
            className="max-w-sm w-full h-auto rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          />
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Conclusion: {post.conclusion_title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{post.conclusion_content}</p>
      </section>

    </div>
  );
}
