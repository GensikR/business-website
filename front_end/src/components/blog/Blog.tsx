'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  imageSrc: string;
  link: string; // New link field
}

const samplePosts: Post[] = [
  {
    id: 1,
    category: 'Kitchen',
    date: '05.08.2025',
    title: 'Dream Kitchen Transformation in Arlington',
    description: 'Explore how we turned a dated kitchen into a modern, functional space perfect for family gatherings and entertaining.',
    author: 'Jane Miller',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/kitchen-remodel.png',
    link: '/remodeling-blog/dream-kitchen-transformation-in-arlington',
  },
  {
    id: 2,
    category: 'Bathroom',
    date: '05.07.2025',
    title: 'Spa-Like Bathroom Renovation Project',
    description: 'Discover the details of our recent bathroom remodel, creating a relaxing and luxurious retreat for homeowners.',
    author: 'Robert Davis',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/bathroom-renovation.png',
    link: '/remodeling-blog/spa-like-bathroom-renovation-project',
  },
  {
    id: 3,
    category: 'Whole House',
    date: '05.05.2025',
    title: 'Complete Home Remodel in Grand Prairie',
    description: 'See how we revitalized an entire house, updating its style and improving its flow to meet the clients\' evolving needs.',
    author: 'Alice Brown',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/whole-house-renovation.png',
    link: '/remodeling-blog/complete-home-remodel-in-grand-prairie',
  },
  {
    id: 4,
    category: 'Living Room',
    date: '05.03.2025',
    title: 'Cozy Living Room Makeover',
    description: 'Learn about the design choices and material selections that transformed a dull living room into a warm and inviting area.',
    author: 'John Wilson',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/whole-house-renovation.png',
    link: '/remodeling-blog/cozy-living-room-makeover',
  },
  {
    id: 5,
    category: 'Kitchen',
    date: '05.01.2025',
    title: 'Modern Kitchen Design Trends',
    description: 'An inside look at the latest trends in kitchen design, featuring sleek cabinetry, innovative appliances, and stylish finishes.',
    author: 'Sarah Green',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/kitchen-remodel.png',
    link: '/remodeling-blog/modern-kitchen-design-trends',
  },
  {
    id: 6,
    category: 'Bathroom',
    date: '04.29.2025',
    title: 'Small Bathroom Remodel Ideas',
    description: 'Clever solutions and design tips for maximizing space and style in smaller bathroom renovation projects.',
    author: 'David Lee',
    authorImage: '/images/team/diana.png',
    imageSrc: '/images/portfolio/bathroom-renovation.png',
    link: '/remodeling-blog/small-bathroom-remodel-ideas',
  },
];

const PopularTopics: React.FC = () => {
  const allCategories = ['All', ...new Set(samplePosts.map((post) => post.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);

  const filterPosts = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPosts(samplePosts);
    } else {
      setFilteredPosts(samplePosts.filter((post) => post.category === category));
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Popular topics</h2>
          <button className="text-sm text-gray-600 hover:text-gray-800">View All</button>
        </div>

        <div className="mb-6 flex space-x-2 overflow-x-auto">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => filterPosts(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } focus:outline-none`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={post.link} className="block">
                  <div className="relative w-full h-48">
                    <Image src={post.imageSrc} alt={post.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 text-xs mb-1">{post.date}</p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={post.authorImage} alt={post.author} layout="fill" objectFit="cover" />
                      </div>
                      <p className="text-gray-700 text-xs">{post.author}</p>
                    </div>
                  </div>
                </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTopics;