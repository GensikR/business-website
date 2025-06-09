'use client'

import React, { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

type FacebookConnectProps = {
  onConnected: (data: { userId: string; pageId: string; posts: unknown[] }) => void;
  buttonLabel?: string;
};

export default function FacebookConnect({ onConnected, buttonLabel }: FacebookConnectProps) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load Facebook SDK once on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.FB) {
      setIsSdkReady(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: false,
        version: 'v18.0',
      });
      setIsSdkReady(true);
    };

    const scriptId = 'facebook-jssdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Call login only after SDK is ready
  const handleFacebookConnect = useCallback(() => {
    if (!window.FB || !isSdkReady) {
      setError('Facebook SDK not ready');
      return;
    }

    setLoading(true);
    setError(null);

    window.FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          const accessToken = response.authResponse.accessToken;

          fetch('/api/notify/facebook-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                onConnected({
                  userId: data.userId,
                  pageId: data.pageId,
                  posts: data.posts,
                });
              } else {
                setError(data.message || 'Backend rejected token');
              }
            })
            .catch((err) => {
              console.error(err);
              setError('Network error');
            })
            .finally(() => setLoading(false));
        } else {
          setError('Login cancelled or unauthorized');
          setLoading(false);
        }
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management',
        return_scopes: true,
      }
    );
  }, [isSdkReady, onConnected]);

  return (
    <div className="space-y-4">
      <button
        onClick={handleFacebookConnect}
        disabled={!isSdkReady || loading}
        className={`px-4 py-2 rounded text-white transition ${
          !isSdkReady || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Connecting...' : buttonLabel || 'Connect Facebook'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
