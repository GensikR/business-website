import React from 'react';

interface BlogPostProps {
  post: {
    title: string;
    date: string;
    author: string;
    content: string;
    imageSrc?: string;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <header className="mb-10">
        <h1 className="text-5xl font-bold leading-tight mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500">
          By <span className="font-medium text-gray-700">{post.author}</span> on {post.date}
        </p>
        {post.imageSrc && (
          <img
            src={post.imageSrc}
            alt={post.title}
            className="w-full h-auto rounded-xl mt-6 shadow-md"
          />
        )}
      </header>

      <div
        className="space-y-6 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default BlogPost;
