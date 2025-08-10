'use client';

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/utils/firebase'; // Adjust path to your firebase config

const AddJob = () =>
{
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) =>
  {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !client.trim())
    {
      setMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try
    {
      await addDoc(collection(db, 'jobs'), {
        name: name.trim(),
        location: location.trim(),
        client: client.trim(),
        createdAt: serverTimestamp(),
      });

      setMessage('Job added successfully!');
      setName('');
      setLocation('');
      setClient('');
    }
    catch (error)
    {
      console.error('Error adding job:', error);
      setMessage('Failed to add job. Please try again.');
    }
    finally
    {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Job Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job name"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job location"
            required
          />
        </div>

        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
            Client <span className="text-red-500">*</span>
          </label>
          <input
            id="client"
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Client name"
            required
          />
        </div>

        {message && (
          <p
            className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-md text-white font-semibold
            ${submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            transition`}
        >
          {submitting ? 'Adding...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
