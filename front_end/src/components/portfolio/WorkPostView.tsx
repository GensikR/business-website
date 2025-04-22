import Image from 'next/image';
import { WorkPost } from '@/types';

const WorkPostView = ({ post }: { post: WorkPost }) => {
  return (
    <article className="bg-white text-gray-800 px-6 sm:px-10 lg:px-36 py-16 space-y-16">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category}
        </div>
      </header>

      <div className="rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* CHALLENGE */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-red-600">The Challenge</h2>
        <p className="text-lg font-medium text-gray-700">{post.challenge_summary}</p>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{post.challenge_content}</p>
      </section>

      {/* SOLUTION */}
      <section className="space-y-6 border-t pt-12">
        <h2 className="text-3xl font-bold text-green-700">The Solution</h2>
        <p className="text-lg font-medium text-gray-700">{post.solution_summary}</p>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{post.solution_content}</p>
      </section>

      {/* CONCLUSION */}
      <section className="space-y-6 border-t pt-12">
        <h2 className="text-3xl font-bold text-blue-700">{post.conclusion_title}</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{post.conclusion_content}</p>
      </section>
    </article>
  );
};

export default WorkPostView;
