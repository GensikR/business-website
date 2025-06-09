'use client';

import React, { useEffect, useState } from 'react';

// Declare global FB for TypeScript
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

type FacebookConnectProps = {
  onConnected: (data: { userId: string; accessToken: string }) => void;
  buttonLabel?: string;
};

export default function FacebookConnect({ onConnected, buttonLabel }: FacebookConnectProps) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<'connected' | 'not_authorized' | 'unknown' | null>(null);

  // Callback to handle status response
  function statusChangeCallback(response: any) {
    setLoginStatus(response.status);
    if (response.status === 'connected') {
      // User logged in and authorized
      onConnected({
        userId: response.authResponse.userID,
        accessToken: response.authResponse.accessToken,
      });
    } else {
      setError('Please login to continue');
    }
  }

  // Load FB SDK asynchronously & initialize
  useEffect(() => {
    // If already loaded, just set ready
    if (window.FB) {
      setIsSdkReady(true);
      // Check login status immediately
      window.FB.getLoginStatus(statusChangeCallback);
      return;
    }

    // Setup fbAsyncInit first
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,   // Enable cookies to allow the server to access the session
        xfbml: true,    // Parse social plugins on this webpage
        version: 'v23.0',
      });
      setIsSdkReady(true);

      // Check login status once SDK is ready
      window.FB.getLoginStatus(statusChangeCallback);
    };

    // Load SDK script asynchronously
    (function (d, s, id) {
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.async = true;
      js.defer = true;
      d.body.appendChild(js);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Handler for login button click: calls FB.login()
  const handleLogin = () => {
    setError(null);
    if (!window.FB) {
      setError('Facebook SDK not loaded');
      return;
    }

    window.FB.login(
      (response: any) => {
        statusChangeCallback(response);
      },
      { scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_read_user_content,pages_manage_posts,business_management' }
    );
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={!isSdkReady}
        className={`px-4 py-2 rounded text-white ${
          !isSdkReady ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {buttonLabel || 'Login with Facebook'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loginStatus && <p>Login Status: {loginStatus}</p>}
    </div>
  );
}
