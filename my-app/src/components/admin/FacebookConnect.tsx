'use client';

import React, { useEffect, useState, useCallback } from 'react';

// Declare global FB for TypeScript
declare global {
  interface Window {
    FB: any;
  }
}

type FacebookConnectProps = {
  onConnected: (data: { userId: string; pageId: string; posts: unknown[] }) => void;
  buttonLabel?: string;
};

export default function FacebookConnect({ onConnected, buttonLabel }: FacebookConnectProps) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Wait until FB is available on the window object
  useEffect(() => {
    const checkFB = () => {
      if (typeof window !== 'undefined' && window.FB && typeof window.FB.init === 'function') {
        setIsSdkReady(true);
      } else {
        setTimeout(checkFB, 300);
      }
    };

    checkFB();
  }, []);

  const handleFacebookConnect = useCallback(() => {
    if (!window.FB) {
      setError('Facebook SDK not initialized');
      return;
    }

    setError(null);
    setLoading(true);

    window.FB.login(
      (response: any) => {
        if (response.status === 'connected' && response.authResponse) {
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
                setError(data.message || 'Backend rejected the token');
              }
            })
            .catch((err) => {
              console.error('Error sending token to server:', err);
              setError('Failed to send token to server.');
            })
            .finally(() => setLoading(false));
        } else {
          setError('Login cancelled or not authorized');
          setLoading(false);
        }
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management',
        return_scopes: true,
      }
    );
  }, [onConnected]);

  return (
    <div className="space-y-4">
      <button
        onClick={handleFacebookConnect}
        disabled={!isSdkReady || loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading || !isSdkReady
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
