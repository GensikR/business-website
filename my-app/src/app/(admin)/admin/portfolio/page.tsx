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

  // Load and initialize the FB SDK
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
          console.log('Access Token:', accessToken);
          console.log('User ID:', userID);
        } else {
          setError('User cancelled or did not authorize app.');
        }
        setLoading(false);
      },
      {
        scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,pages_read_user_content,public_profile,email',
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

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userId && accessToken && (
        <div className="mt-6 text-sm text-green-700 max-w-lg break-all">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Access Token:</strong> {accessToken}</p>
        </div>
      )}
    </div>
  );
}
