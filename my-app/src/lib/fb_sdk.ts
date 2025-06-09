// src/lib/fb_sdk.ts

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

export interface StatusResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse?: AuthResponse;
}

// ✅ Define and export the FacebookFB interface
export interface FacebookFB {
  init: (options: {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
  }) => void;

  login: (
    callback: (response: StatusResponse) => void,
    options?: {
      scope: string;
      return_scopes?: boolean;
    }
  ) => void;

  getLoginStatus?: (callback: (response: StatusResponse) => void) => void;

  AppEvents?: {
    logPageView: () => void;
  };
}

// ✅ Properly augment the global window
declare global {
  interface Window {
    FB: FacebookFB;
    fbAsyncInit: () => void;
  }
}

export const loadFacebookSDK = (appId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      return resolve();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0', // Replace with latest if needed
      });
      window.FB.AppEvents?.logPageView?.();
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
