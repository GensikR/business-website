'use client';

import React, { useEffect, useState } from 'react';

declare namespace fb 
{
  interface AuthResponse {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  }
  interface StatusResponse 
  {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: AuthResponse;
  }
}

type FacebookLoginProps = {
  setLoggedIn: (loggedIn: boolean) => void;
};

export default function FacebookLogin({ setLoggedIn }: FacebookLoginProps)
{
  const [isSdkReady, setIsSdkReady] = useState(false);

  // Wait for FB SDK to be ready
  useEffect(() => 
  {
    const checkFB = () => 
    {
      if (window.FB) {
        setIsSdkReady(true);
      } else {
        setTimeout(checkFB, 100);
      }
    };
    checkFB();
  }, []);

  // Handle FB login response
  const handleLogin = () => 
  {
    window.FB.login(
      function (response: fb.StatusResponse ) 
      {
        if (response.status === 'connected' && response.authResponse) 
        {
          const accessToken = response.authResponse.accessToken;

          console.log('Logged in, token:', accessToken);

          // Send access token to backend
          fetch('https://37a4-129-107-192-128.ngrok-free.app/api/facebook-login', {
            method: 'POST',
            headers: 
            {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Backend response:', data);
              // Handle success, maybe redirect or update UI
              if (data.success) {
                setLoggedIn(true);
              } else {
                console.error('Login failed:', data.message);
              }
            })
            .catch((error) => {
              console.error('Error sending token to backend:', error);
            });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        scope:
          'pages_show_list,business_management,pages_read_engagement,pages_read_user_content',
        return_scopes: true,
      }
    );
  };

  if (!isSdkReady) {
    return <div>Loading Facebook SDK...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white flex-col space-y-4">
      <h1 className="text-xl font-semibold">Please log in with Facebook</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Continue with Facebook
      </button>
    </div>
  );
}
