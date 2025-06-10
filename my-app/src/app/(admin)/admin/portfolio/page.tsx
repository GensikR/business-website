'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

type ProcessStatus =
  | 'Not Logged In'
  | 'Logged In'
  | 'Fetching Posts'
  | 'Fetched Posts'
  | 'Processing'
  | 'Done';

export default function FacebookBusinessLoginPage() {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [postsFetched, setPostsFetched] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [postsNumber, setPostsNumber] = useState(0);
  const [postsProcessed, setPostsProcessed] = useState<number>(0);
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('Not Logged In');

  // Load Facebook SDK
  useEffect(() => {
    if (window.FB) {
      setIsSdkReady(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: false,
        version: 'v23.0',
      });
      setIsSdkReady(true);
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Fetch posts from server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setProcessStatus('Fetching Posts');
        const res = await fetch('/api/facebook/fetch_posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, accessToken }),
        });
        const data = await res.json();

        if (!data.success || !data.posts) {
          setError(data.message || 'Failed to fetch posts.');
          return;
        }

        setPosts(data.posts);
        setPostsNumber(data.posts.length);
        setPostsFetched(true);
        setProcessStatus('Fetched Posts');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching posts.');
      }
    };

    if (loggedIn && userId && accessToken && !postsFetched) {
      fetchPosts();
    }
  }, [loggedIn, userId, accessToken, postsFetched]);

  // Process posts in chunks
  useEffect(() => {
    const process = async () => {
      try {
        setProcessStatus('Processing');

        const chunkSize = 25;
        for (let i = 0; i < posts.length; i += chunkSize) {
          const chunk = posts.slice(i, i + chunkSize);

          const res = await fetch('/api/facebook/process_posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ posts: chunk }),
          });

          const data = await res.json();

          if (!data.success) {
            setError(data.message || `Failed to process chunk starting at index ${i}.`);
            return;
          }

          setPostsProcessed((prev) => Math.min(posts.length, prev + chunk.length));
        }

        setProcessStatus('Done');
      } catch (err) {
        console.error('Process error:', err);
        setError('Error processing posts.');
      }
    };

    if (processStatus === 'Fetched Posts' && posts.length > 0) {
      process();
    }
  }, [processStatus, posts]);

  // Facebook Login
  const handleLogin = () => {
    if (!window.FB) {
      setError('Facebook SDK not loaded.');
      return;
    }

    setLoading(true);
    setError(null);

    window.FB.login(
      (response: any) => {
        setLoading(false);
        if (response.status === 'connected') {
          const { accessToken, userID } = response.authResponse;
          setAccessToken(accessToken);
          setUserId(userID);
          setLoggedIn(true);
          setProcessStatus('Logged In');
        } else {
          setError('User cancelled or did not authorize app.');
        }
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,business_management',
        return_scopes: true,
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Facebook Business Login</h1>

      <button
        onClick={handleLogin}
        disabled={!isSdkReady || loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading || !isSdkReady
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Connecting...' : 'Login with Facebook'}
      </button>

      {/* Show process status */}
      <div className="mt-4 text-sm text-gray-700 font-medium">
        <span>Status: </span>
        <span
          className={`font-semibold ${
            processStatus === 'Done'
              ? 'text-green-600'
              : processStatus === 'Processing'
              ? 'text-yellow-600'
              : processStatus === 'Not Logged In'
              ? 'text-gray-500'
              : 'text-blue-600'
          }`}
        >
          {processStatus}
        </span>
      </div>

      {/* Show error */}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Show fetched posts */}
      {postsFetched && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">
            Fetched {postsNumber} Posts
          </h2>

          <p className="text-sm text-gray-600 mb-2">
            Processed {postsProcessed} / {postsNumber}
          </p>

          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {posts.map((post, index) => (
              <li
                key={index}
                className="p-3 border border-gray-300 rounded bg-white text-sm"
              >
                {post.message || '[No message]'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
