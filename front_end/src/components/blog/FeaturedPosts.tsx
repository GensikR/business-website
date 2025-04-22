'use client';
// TODO: Implement this
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import firebaseConfig from '@/lib/fb_config';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const blogCategories = [
//   { value: 'all', label: 'All' },
//   { value: 'diy', label: 'DIY' },
//   { value: 'design-tips', label: 'Design Tips' },
//   { value: 'product-reviews', label: 'Product Reviews' },
//   { value: 'before-after', label: 'Before & After' },
//   { value: 'how-to', label: 'How-To' },
// ];

// const subCategories = [
//   'all',
//   'Kitchen',
//   'Bathroom',
//   'Living Room',
//   'Bedroom',
//   'Floors',
//   'Patio',
//   'Office',
// ];

// const BlogShowcase = () => {
//   const [allPosts, setAllPosts] = useState<any[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const snapshot = await getDocs(collection(db, 'blogPosts'));
//       const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setAllPosts(posts);
//       applyFilters('all', 'all', posts);
//     };
//     fetchPosts();
//   }, []);

//   const applyFilters = (category: string, subcategory: string, posts = allPosts) => {
//     let filtered = [...posts];
//     if (category !== 'all') {
//       filtered = filtered.filter(post => post.category === category);
//     }
//     if (subcategory !== 'all') {
//       filtered = filtered.filter(post => post.subcategory === subcategory);
//     }
//     setFilteredPosts(filtered.slice(0, 6)); // limit for showcase
//   };

//   const handleCategory = (value: string) => {
//     setSelectedCategory(value);
//     applyFilters(value, selectedSubcategory);
//   };

//   const handleSubcategory = (value: string) => {
//     setSelectedSubcategory(value);
//     applyFilters(selectedCategory, value);
//   };

//   const isValidImage = (url: string) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   return (
//     <section className="bg-white py-16 px-6 sm:px-10 lg:px-24">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
//           Remodeling Blog Highlights
//         </h2>

//         <div className="flex flex-wrap justify-center gap-3 mb-6">
//           {blogCategories.map(cat => (
//             <button
//               key={cat.value}
//               onClick={() => handleCategory(cat.value)}
//               className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-200 ${
//                 selectedCategory === cat.value
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {subCategories.map(sub => (
//             <button
//               key={sub}
//               onClick={() => handleSubcategory(sub)}
//               className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-200 ${
//                 selectedSubcategory === sub
//                   ? 'bg-green-600 text-white border-green-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
//               }`}
//             >
//               {sub}
//             </button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filteredPosts.map(post => (
//             <Link href={`/blog/${post.id}`} key={post.id} className="group">
//               <div className="bg-white rounded-xl shadow hover:shadow-2xl border border-gray-100 transition">
//                 <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
//                   {isValidImage(post.img1) ? (
//                     <Image
//                       src={post.img1}
//                       alt={post.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
//                       No Image
//                     </div>
//                   )}
//                   <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium uppercase px-3 py-1 rounded-full">
//                     {post.category}
//                   </span>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
//                     {post.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-3">
//                     {post.summary}
//                   </p>
//                   <div className="text-xs text-gray-400">
//                     Subcategory: <strong>{post.subcategory}</strong>
//                   </div>
//                   <div className="mt-4 text-blue-600 text-sm font-medium hover:underline">
//                     Read full article →
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogShowcase;
