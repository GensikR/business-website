// app/remodeling-blog/[slug]/page.tsx
import { getPost } from '@/lib/getPost'; // Make sure this is correct path
import BlogPost from '@/components/blog/BlogPost';
import { notFound } from 'next/navigation';

export default async function BlogPage({ params }: { params: { slug: string } }) {
  // Ensure `getPost` is awaited properly
  const post = await getPost(params.slug); // Await the async call

  if (!post) {
    notFound(); // Handle if post is not found
  }

  return (
    <div>
      {/*TODO: fix the await issue*/}
      <BlogPost post={post} />
    </div>
  );
}
