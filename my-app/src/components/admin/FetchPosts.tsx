'use client';

import React, { useState } from 'react';

type Props = {
  userId: string;
  accessToken: string;
};

export default function FetchPosts({ userId, accessToken }: Props) {
  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setPostCount(null);

    try {
      const response = await fetch('/api/facebook/fetch_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, accessToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts.');
      }

      setPostCount(Array.isArray(data.posts) ? data.posts.length : 0);
      setFetched(true);
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (fetched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-xl font-semibold mb-4">Posts Fetched Successfully</h2>
        <p className="text-lg">Total Posts: {postCount}</p>
      </div>
      <ProcessPosts posts={postCount} accessToken={accessToken} userId={userId} />
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-xl font-semibold mb-4">Fetch Facebook Posts</h2>

      <button
        onClick={handleFetch}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Fetching...' : 'Fetch Facebook Posts'}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
