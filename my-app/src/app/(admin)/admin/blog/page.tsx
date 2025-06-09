'use client';

import React from 'react';
import FacebookConnect from '@/components/admin/FacebookConnect';

export default function BlogAdminPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Admin</h1>

      <p className="text-gray-600 mb-4">
        Click the button below to sync your latest Facebook posts to the blog.
      </p>

      <FacebookConnect
        onConnected={(accessToken) => {
          console.log('Access token received in BlogAdminPage:', accessToken);
        }}
        buttonLabel="Sync New Facebook Posts"
      />
    </div>
  );
}
