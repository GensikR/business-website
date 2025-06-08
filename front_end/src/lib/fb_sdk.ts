// Declare types for global FB object
declare global 
{
  interface Window {
    fbAsyncInit: () => void;
    FB: unknown;
  }
}

let isFBInitialized = false;

export const loadFacebookSDK = (appId: string, version: string = "v23.0"): Promise<void> => 
{
  return new Promise((resolve, reject) => 
{
    if (isFBInitialized) {
      resolve();
      return;
    }

    // Set fbAsyncInit
    window.fbAsyncInit = function () 
    {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version,
      });

      window.FB.AppEvents.logPageView();
      isFBInitialized = true;
      resolve();
    };

    // Avoid re-adding the script
    if (document.getElementById("facebook-jssdk")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.onload = () => {
      // fbAsyncInit will be called automatically
    };
    script.onerror = () => reject("Facebook SDK failed to load.");
    document.body.appendChild(script);
  });
};
