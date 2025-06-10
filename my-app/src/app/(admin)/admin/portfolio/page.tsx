'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

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

  // Load FB SDK once
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

  // Fetch posts after login
  useEffect(() => {
    if (loggedIn && userId && accessToken && !postsFetched) {
      fetch('/api/facebook/fetch_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, accessToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            setError(data.message || 'Failed to fetch posts.');
          } else {
            setPostsFetched(true);
            setPosts(data.posts || []);
            setPostsNumber(data.posts?.length || 0);
          }
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setError('Error fetching posts.');
        });
    }
  }, [loggedIn, userId, accessToken, postsFetched]);

  const handleLogin = () => {
    if (!window.FB) {
      setError('Facebook SDK not loaded.');
      return;
    }

    setLoading(true);
    setError(null);

    window.FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          const { accessToken, userID } = response.authResponse;
          setAccessToken(accessToken);
          setUserId(userID);
          setLoggedIn(true);
        } else {
          setError('User cancelled or did not authorize app.');
        }
        setLoading(false);
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,business_management',
        return_scopes: true,
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Facebook Business Login</h1>

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

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {postsFetched && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Fetched {postsNumber} Posts</h2>
          <ul className="space-y-2">
            {posts.map((post, index) => (
              <li key={index} className="p-2 border rounded bg-white text-sm">
                {post.message || '[No message]'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
