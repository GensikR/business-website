// lib/getPost.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export async function getPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = await marked.parse(content);

    // Ensure the returned object has all required fields
    return {
      title: data.title || 'Untitled Post', // Default title if missing
      date: data.date || 'Unknown Date', // Default date if missing
      author: data.author || 'Unknown Author', // Default author if missing
      content: htmlContent,
      imageSrc: data.imageSrc || '', // Optional field, default to empty string
    };
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    return null;
  }
}
