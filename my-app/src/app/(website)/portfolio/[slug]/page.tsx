import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { notFound } from 'next/navigation';
import { WorkPost } from '@/types';
import firebaseConfig from '@/lib/utils/firebase_config';
import ImageCarousel from '../../components/portfolio/ImageCarousel';
import Gallery from '@/app/(website)/components/portfolio/Gallery';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔤 Converts title to URL-friendly slug
const titleToSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// ✅ Generates static paths and creates slugs in Firestore if needed
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'posts'));

  const paths = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      let slug = data.slug;

      if (!slug && data.title) {
        slug = titleToSlug(data.title);
        try {
          await updateDoc(doc(db, 'posts', docSnap.id), { slug });
          console.log(`✅ Slug created for "${data.title}": ${slug}`);
        } catch (err) {
          console.error(`❌ Failed to update slug for ${docSnap.id}:`, err);
          return null;
        }
      }

      if (!slug) return null;
      return { slug };
    })
  );

  return paths.filter(Boolean);
}

// ✅ Page Component for /portfolio/[slug]
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

  const docSnap = snapshot.docs[0];
  const data = docSnap.data() as Omit<WorkPost, 'id'>;

  const post: WorkPost = {
    id: docSnap.id,
    ...data,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 p-10
                      flex flex-col gap-12
                      transition-shadow duration-300
                      hover:shadow-3xl">
        {/* Header */}
        <header>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-prose">
            A look into our recent work and creative impact.
          </p>
        </header>

        {/* Image Carousel */}
        <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-gray-100">
          <ImageCarousel
            images={post.img_srcs?.length ? post.img_srcs : ['/placeholder.jpg']}
            title={post.title}
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-gray-800">
          {post.intro && <p className="font-semibold text-lg text-gray-700">{post.intro}</p>}
          {post.body1 && <p>{post.body1}</p>}
          {post.body2 && <p>{post.body2}</p>}
          {post.conclusion && <p className="font-semibold">{post.conclusion}</p>}
        </article>

        {/* External Link */}
        {post.permalink && (
          <div className="mt-8">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
            >
              View Original Facebook Post
            </a>
          </div>
        )}
        <Gallery/>
      </div>
    </main>
  );
}
