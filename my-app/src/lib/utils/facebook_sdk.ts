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

declare global {
  interface Window {
    FB: FacebookFB;
    fbAsyncInit: () => void;
  }
}

let sdkLoaded = false;

export const loadFacebookSDK = (appId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Not in browser');
    if (sdkLoaded && window.FB) return resolve();

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
      window.FB.AppEvents?.logPageView?.();
      sdkLoaded = true;
      resolve();
    };

    if (document.getElementById('facebook-jssdk')) return;

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => reject('Failed to load Facebook SDK');
    document.body.appendChild(script);
  });
};
