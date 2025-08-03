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

export default function PortfolioAdmin() {
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

  useEffect(() => {
    const process = async () => {
      try {
        setProcessStatus('Processing');
        const chunkSize = 5;
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
    <div className="w-full px-4 py-6 max-w-xl mx-auto text-center bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📣 Portfolio Manager</h1>

      <button
        onClick={handleLogin}
        disabled={!isSdkReady || loading}
        className={`w-full py-2 text-white font-semibold rounded-md transition ${
          loading || !isSdkReady
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Connecting...' : 'Login with Facebook'}
      </button>

      <p className="mt-4 text-sm font-medium text-gray-700">
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
      </p>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {postsFetched && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Fetched {postsNumber} posts
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Processed {postsProcessed} / {postsNumber}
          </p>

          <ul className="space-y-2 max-h-64 overflow-y-auto border-t pt-2">
            {posts.map((post, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 bg-gray-50 rounded text-sm text-gray-800"
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
