'use client';

import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '@/lib/fb_config';
import { postWorkPosts } from '@/lib/postWorkPosts';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  'kitchen',
  'bathroom',
  'living room',
  'bedroom',
  'outdoor',
  'office',
] as const;

type Category = typeof categories[number];

interface WorkPost {
  id: string;
  title: string;
  category: Category;
  challenge: string;
  challenge_summary: string;
  challenge_content: string;
  solution: string;
  solution_summary: string;
  solution_content: string;
  conclusion_title: string;
  conclusion_content: string;
  image1Src: string;
  image1Alt: string;
  image2Src: string;
  image2Alt: string;
}

export default function AdminWorkPostForm() {
  const [formData, setFormData] = useState<Omit<WorkPost, 'id'>>({
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
    image1Src: '',
    image1Alt: '',
    image2Src: '',
    image2Alt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await postWorkPosts();
    // e.preventDefault();
    // try {
    //   const postWithId: WorkPost = { ...formData, id: crypto.randomUUID() };
    //   await addDoc(collection(db, 'workPosts'), postWithId);
    //   alert('Work post successfully added!');
    //   setFormData({
    //     title: '',
    //     category: 'kitchen',
    //     challenge: '',
    //     challenge_summary: '',
    //     challenge_content: '',
    //     solution: '',
    //     solution_summary: '',
    //     solution_content: '',
    //     conclusion_title: '',
    //     conclusion_content: '',
    //     image1Src: '',
    //     image1Alt: '',
    //     image2Src: '',
    //     image2Alt: '',
    //   });
    // } catch (err) {
    //   console.error('Error adding work post:', err);
    //   alert('Error adding post. Check the console.');
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Work Post</h1>
      {/*TODO: */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Challenge */}
        <textarea
          name="challenge"
          placeholder="Challenge (overview sentence)"
          value={formData.challenge}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
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
          placeholder="Challenge Content (details)"
          value={formData.challenge_content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {/* Solution */}
        <input
          type="text"
          name="solution"
          placeholder="Solution (overview sentence)"
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
          placeholder="Solution Content (details)"
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

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="image1Src"
              placeholder="Image 1 URL"
              value={formData.image1Src}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="image1Alt"
              placeholder="Image 1 Alt Text"
              value={formData.image1Alt}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-2"
            />
          </div>

          <div>
            <input
              type="text"
              name="image2Src"
              placeholder="Image 2 URL"
              value={formData.image2Src}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="image2Alt"
              placeholder="Image 2 Alt Text"
              value={formData.image2Alt}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Publish Work Post
        </button>
      </form>
    </div>
  );
}
