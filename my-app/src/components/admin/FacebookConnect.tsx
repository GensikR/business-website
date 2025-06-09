'use client';

import React, { useEffect, useState } from 'react';
import { loadFacebookSDK, StatusResponse } from '@/lib/utils/facebook_sdk';

// Declare global FB for TypeScript
declare global {
  interface Window {
    FB: import('@/lib/utils/facebook_sdk').FacebookFB;
    fbAsyncInit: () => void;
  }
}

type FacebookConnectProps = {
  onConnected: (data: { userId: string; pageId: string; posts: unknown[] }) => void;
  buttonLabel?: string;
};

export default function FacebookConnect({ onConnected, buttonLabel }: FacebookConnectProps) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFacebook = async () => {
      try {
        await loadFacebookSDK(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
        setIsSdkReady(true);
      } catch (err) {
        console.error('Facebook SDK failed to load:', err);
        setError('Failed to load Facebook SDK');
      }
    };

    initFacebook();
  }, []);

  const handleFacebookConnect = () => {
    setError(null);

    window.FB.login(
      (response: StatusResponse) => {
        if (response.status === 'connected' && response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          fetch('/api/facebook-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                onConnected({ userId: data.userId, pageId: data.pageId, posts: data.posts });
              } else {
                setError(data.message || 'Backend rejected the token');
              }
            })
            .catch((err) => {
              console.error('Error sending token:', err);
              setError('Failed to send token to server.');
            });
        } else {
          setError('Login cancelled or not authorized');
        }
      },
      {
        scope:
          'pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management',
        return_scopes: true,
      }
    );
  };

  if (!isSdkReady) {
    return <p>Loading Facebook SDK...</p>;
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleFacebookConnect}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {buttonLabel || 'Connect Facebook'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
