'use client'

import React, { useState } from 'react';
import useFacebookSDK from './useFacebookSDK'; // make sure path is correct

type FacebookConnectProps = {
  onConnected: (data: { userId: string; pageId: string; posts: unknown[] }) => void;
  buttonLabel?: string;
};

export default function FacebookConnect({ onConnected, buttonLabel }: FacebookConnectProps) {
  const isSdkReady = useFacebookSDK();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFacebookConnect = () => {
    if (!window.FB) {
      setError('Facebook SDK not available.');
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
                setError(data.message || 'Backend rejected the token.');
              }
            })
            .catch((err) => {
              console.error(err);
              setError('Error sending token to server.');
            })
            .finally(() => setLoading(false));
        } else {
          setError('Login cancelled or not authorized.');
          setLoading(false);
        }
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management',
        return_scopes: true,
      }
    );
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleFacebookConnect}
        disabled={!isSdkReady || loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading || !isSdkReady ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Connecting...' : buttonLabel || 'Connect Facebook'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
