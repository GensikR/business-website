// src/lib/utils/facebook_sdk.ts

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

// ✅ Exported FacebookFB interface
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

// ✅ Augment global window object
declare global {
  interface Window {
    FB: FacebookFB;
    fbAsyncInit: () => void;
  }
}

// ✅ Properly load the Facebook SDK and initialize it
export const loadFacebookSDK = (appId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Window is undefined (SSR)');
    if (window.FB) return resolve();

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0', // Or latest supported version
      });

      window.FB.AppEvents?.logPageView?.();
      resolve();
    };

    if (document.getElementById('facebook-jssdk')) return;

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => reject(new Error('Failed to load Facebook SDK'));

    document.body.appendChild(script);
  });
};
