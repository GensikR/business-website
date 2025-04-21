'use client';

import { useState } from 'react';
import { BlogPost } from '@/types';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '@/lib/fb_config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories: BlogPost['category'][] = [
  'kitchen',
  'bathroom',
  'living room',
  'bedroom',
  'outdoor',
  'office',
];

export default function AdminBlogForm() {
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    category: 'kitchen',
    challenge: '',
    challenge_summary: '',
    challenge_content: '',
    solution: '',
    solution_summary: '',
    solution_content: '',
    conclusion_title: '',
    conclusion_content: '',
    imageSrc: '',
    imageAlt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postWithId = { ...formData, id: crypto.randomUUID() };
      await addDoc(collection(db, 'Blogposts'), postWithId);
      alert('Blog post added!');
      setFormData({
        id: '',
        title: '',
        category: 'kitchen',
        challenge: '',
        challenge_summary: '',
        challenge_content: '',
        solution: '',
        solution_summary: '',
        solution_content: '',
        conclusion_title: '',
        conclusion_content: '',
        imageSrc: '',
        imageAlt: '',
      });
    } catch (err) {
      console.error('Error adding post:', err);
      alert('Error adding post. Check console.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Challenge */}
        <textarea
          name="challenge"
          placeholder="Challenge"
          value={formData.challenge}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="challenge_summary"
          placeholder="Challenge Summary"
          value={formData.challenge_summary}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="challenge_content"
          placeholder="Challenge Content"
          value={formData.challenge_content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {/* Solution */}
        <input
          type="text"
          name="solution"
          placeholder="Solution"
          value={formData.solution}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="solution_summary"
          placeholder="Solution Summary"
          value={formData.solution_summary}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="solution_content"
          placeholder="Solution Content"
          value={formData.solution_content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {/* Conclusion */}
        <input
          type="text"
          name="conclusion_title"
          placeholder="Conclusion Title"
          value={formData.conclusion_title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="conclusion_content"
          placeholder="Conclusion Content"
          value={formData.conclusion_content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {/* Image */}
        <input
          type="text"
          name="imageSrc"
          placeholder="Image URL"
          value={formData.imageSrc}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="imageAlt"
          placeholder="Image Alt Text"
          value={formData.imageAlt}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
