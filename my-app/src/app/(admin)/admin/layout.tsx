// AdminRootLayout.tsx
import React from 'react';
import ClientAdminWrapper from './Layoutwrapper';

export const metadata = 
{
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
      <body className="bg-gray-100 text-gray-900 h-screen">
        <ClientAdminWrapper>{children}</ClientAdminWrapper>
      </body>
    </html>
  );
}
