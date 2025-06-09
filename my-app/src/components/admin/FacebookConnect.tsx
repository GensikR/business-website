'use client';

import React, { useState } from 'react';
import useFacebookSDK from './useFacebookSDK'; // Make sure the hook correctly loads the SDK

type FacebookConnectProps = {
  onConnected: (data: { accessToken: string; userId: string }) => void;
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

    setError(null);
    setLoading(true);

    window.FB.login(
      (response: any) => {
        if (response.status === 'connected' && response.authResponse) {
          const { accessToken, userID } = response.authResponse;

          onConnected({ accessToken, userId: userID });
        } else {
          setError('Login cancelled or not authorized.');
        }
        setLoading(false);
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
