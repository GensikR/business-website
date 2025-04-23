import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '@/lib/fb_config';
import { initializeApp } from 'firebase/app';
import { notFound } from 'next/navigation';
import { WorkPost } from '@/types';
// TODO: FIX AWAIT PROBLEM WITH PARAMS
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

  if (!querySnapshot) {
    notFound();
  }

  const post = querySnapshot.docs[0].data() as WorkPost;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-lg text-gray-600">{post.challenge_summary}</p>
      <div className="my-6">
        <h2 className="text-2xl font-semibold">Challenge</h2>
        <p>{post.challenge_content}</p>
      </div>
      <div className="my-6">
        <h2 className="text-2xl font-semibold">Solution</h2>
        <p>{post.solution_content}</p>
      </div>
      <div className="my-6">
        <h2 className="text-2xl font-semibold">{post.conclusion_title}</h2>
        <p>{post.conclusion_content}</p>
      </div>

      {/* Display images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <img src={post.image1Src} alt={post.image1Alt} className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <img src={post.image2Src} alt={post.image2Alt} className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}
