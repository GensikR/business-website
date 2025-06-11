

import React from 'react';
import Script from 'next/script';
import ClientAdminWrapper from './Layoutwrapper';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin dashboard for managing the site',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="Mauri"/>
        {/* Facebook SDK Initialization Script */}
        <Script id="facebook-sdk-init" strategy="beforeInteractive">
          {`
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                xfbml      : true,
                version    : 'v23.0'
              });
            };
          `}
        </Script>
        <Script
          strategy="beforeInteractive"
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        />
      </head>
      <body className="bg-gray-100 text-gray-900 h-screen">
        <ClientAdminWrapper>{children}</ClientAdminWrapper>
      </body>
    </html>
  );
}
